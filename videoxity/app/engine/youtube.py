from youtube_transcript_api import YouTubeTranscriptApi
from typing import List, Dict, Any
from googleapiclient.discovery import build
from llama_index.core import Document
from llama_index.core.schema import NodeWithScore
from llama_index.core.storage import StorageContext
from llama_index.core import VectorStoreIndex
from llama_index.llms.openai import OpenAI
from llama_index.postprocessor.cohere_rerank import CohereRerank
import os

from app.settings import Settings

SYSTEM_PROMPT = """
You are a youtube report generation assistant tasked with producing a well-formatted context given parsed context, to help users save time from watching all clickbait videos, and you just get to the good parts.

You will be given context from one or more youtube videos that take the form of parsed text.

You are responsible for producing a report with interleaving text and videos - in the format of interleaving text and "video" blocks.
Since you cannot directly produce a video, the video block takes in a video url instead.

How do you know which video to generate? Each context chunk will contain metadata including a video render of the source chunk, given as a video url. 
Include ONLY the videos from the chunks that have heavy visual elements (you can get a hint of this if the parsed text contains a lot of tables).
You MUST include at least two video blocks in the output.

We can follow this structure, first, give the user a quick summary of the content you've seen, then show the most relevant few videos with narration surrounding them, then towards the end, you can recommend from the search results something that might be cool from what you have found from your results.

You MUST output your response as a tool call in order to adhere to the required output format. Do NOT give back normal text.
"""

from pydantic import BaseModel, Field
from typing import List


class TextBlock(BaseModel):
    """Text block."""

    text: str = Field(..., description="The text for this block.")


class VideoBlock(BaseModel):
    """Video block."""

    video_url: str = Field(..., description="URL to the video.")


class ReportOutput(BaseModel):
    """Data model for a report.

    Can contain a mix of text and image blocks. MUST contain at least one image block.

    """

    blocks: List[TextBlock | VideoBlock] = Field(
        ..., description="A list of text and video blocks."
    )
                
class YouTubeQueryEngine():
    def __init__(
        self,
        top_k_rerank: int = 15,
        top_k_search: int = 6,
        time_chunk_interval: int = 60,
        time_chunk_overlap: int = 30,
    ):
        google_api_key = os.getenv("GOOGLE_API_KEY")
        if not google_api_key:
            raise ValueError("GOOGLE_API_KEY is not set")   
        self.youtube = build('youtube', 'v3', developerKey=google_api_key)
        self.embedding_model = Settings.embed_model
        self.top_k_rerank = top_k_rerank
        self.top_k_search = top_k_search
        self.time_chunk_interval = time_chunk_interval
        self.time_chunk_overlap = time_chunk_overlap
        cohere_api_key = os.getenv("COHERE_API_KEY")    
        if not cohere_api_key:
            raise ValueError("COHERE_API_KEY is not set")
        self.reranker = CohereRerank(api_key=cohere_api_key, top_n=5)

    def search_videos(self, query: str, max_results: int = 15) -> List[str]:
        """Search YouTube videos and return video IDs."""
        request = self.youtube.search().list(
            q=query,
            part='id',
            maxResults=max_results,
            type='video'
        )
        response = request.execute()
        return [item['id']['videoId'] for item in response['items']]

    def get_transcript(self, video_id: str) -> Dict[str, Any]:
        """Get transcript with timestamps for a video."""
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            return {
                'video_id': video_id,
                'transcript': transcript
            }
        except:
            return None

    def rerank_transcripts(self, transcripts: List[Dict[str, Any]], query: str) -> List[Dict[str, Any]]:
        """Rerank transcripts based on relevance to a query."""
        # Create nodes with all metadata
        transcript_nodes = [
            NodeWithScore(
                node=Document(
                    text=t['text'], 
                    metadata={
                        'idx': i,
                        'video_id': t['data']['video_id'],
                        'transcript_data': t['data']['transcript']
                    },
                    excluded_llm_metadata_keys=["transcript_data"]
                ), 
                score=1.0
            ) for i, t in enumerate(transcripts)
        ]

        reranked_transcripts = self.reranker.postprocess_nodes(
            transcript_nodes,
            query_str=query
        )[:self.top_k_rerank]
        return reranked_transcripts
    
    def _create_time_chunks(self, transcript_data: List[Dict], interval_seconds: int = 60, overlap_seconds: int = 30) -> List[Dict]:
        """Group transcript entries into overlapping time intervals."""
        chunks = []
        current_start_time = transcript_data[0]['start']
        last_entry_time = transcript_data[-1]['start'] + transcript_data[-1]['duration']
        
        # Create chunks with overlapping windows
        while current_start_time < last_entry_time:
            chunk_entries = []
            chunk_end_time = current_start_time + interval_seconds
            
            # Collect entries for this chunk
            for entry in transcript_data:
                if current_start_time <= entry['start'] < chunk_end_time:
                    chunk_entries.append(entry)
            
            if chunk_entries:
                chunks.append({
                    'entries': chunk_entries,
                    'start_time': current_start_time,
                    'end_time': chunk_end_time
                })
            
            # Move window forward by (interval - overlap)
            current_start_time += (interval_seconds - overlap_seconds)
    
        return chunks
    
    def prepare_transcripts_for_retrieval(self, reranked_transcripts: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Prepare transcripts for retrieval by creating time chunks."""
        documents = []
        for node in reranked_transcripts:
            video_id = node.node.metadata['video_id']
            transcript_data = node.node.metadata['transcript_data']
            
            # Create overlapping time-based chunks
            time_chunks = self._create_time_chunks(
                transcript_data=transcript_data, 
                interval_seconds=self.time_chunk_interval, 
                overlap_seconds=self.time_chunk_overlap
            )
            
            # Create a document for each time chunk
            for chunk in time_chunks:
                text = " ".join([entry['text'] for entry in chunk['entries']])
                doc = Document(
                    text=text,
                    metadata={
                        'video_id': video_id,
                        'start_time': chunk['start_time'],
                        'end_time': chunk['end_time'],
                        'url': f"https://youtube.com/embed/{video_id}?start={int(chunk['start_time'])}",
                        "text": text
                    },
                    excluded_embed_metadata_keys=["video_id", "start_time", "end_time", "url"],
                    excluded_llm_metadata_keys=["text"],
                    metadata_template="{key}=>{value}",
                    text_template="Metadata: {metadata_str}\n-----\nContent: {content}"
                )
                documents.append(doc)
        return documents
    
    def ingest_documents(self, documents: List[Document]):
        storage_context = StorageContext.from_defaults()
        index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
        return index
    
    def get_query_engine(self, search_query: str):
        video_ids = self.search_videos(search_query)
        
        # Get transcripts and do initial reranking of full transcripts
        transcripts = []
        for video_id in video_ids:
            transcript_data = self.get_transcript(video_id)
            if transcript_data:
                full_text = " ".join([entry['text'] for entry in transcript_data['transcript']])
                transcripts.append({
                    'text': full_text,
                    'data': transcript_data
                })
        
        reranked_transcripts = self.rerank_transcripts(transcripts, search_query)
        
        documents = self.prepare_transcripts_for_retrieval(reranked_transcripts)
        
        index = self.ingest_documents(documents)
        
        llm = OpenAI(model="gpt-4o", system_prompt=SYSTEM_PROMPT)
        structured_llm = llm.as_structured_llm(output_cls=ReportOutput)
        
        query_engine = index.as_query_engine(
            similarity_top_k=self.top_k_search,
            llm=structured_llm,
        )

        return query_engine
                
if __name__ == "__main__":
    from dotenv import load_dotenv
    from time import time
    load_dotenv()
    engine = YouTubeQueryEngine()
    start = time()
    response = engine.process_query("What is the best way to learn python?")
    print(response)
    end = time()
    print(f"Time taken: {end - start} seconds")
