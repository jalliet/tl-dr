from sentence_transformers import SentenceTransformer
from typing import List, Tuple
from youtube_transcript_api import YouTubeTranscriptApi
from functools import lru_cache
import torch

def create_chunks(text: str, chunk_size: int = 200, overlap: int = 50) -> List[str]:
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks

@lru_cache(maxsize=1)
def setup_retrieval_system(model_name: str = 'all-MiniLM-L6-v2'):
    return SentenceTransformer(model_name)

def find_relevant_sections(model, query: str, text: str, 
                         top_k: int = 3) -> List[Tuple[str, float]]:
    chunks = create_chunks(text)
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    
    with torch.no_grad():
        query_embedding = model.encode([query], 
                                    convert_to_tensor=True,
                                    show_progress_bar=False)[0]
        chunk_embeddings = model.encode(chunks, 
                                      batch_size=32,
                                      convert_to_tensor=True,
                                      show_progress_bar=False)
    
    similarities = torch.nn.functional.cosine_similarity(query_embedding.unsqueeze(0), 
                                                       chunk_embeddings)
    
    top_k_values, top_indices = torch.topk(similarities, k=min(top_k, len(chunks)))
    
    return [(chunks[i], score.item()) for i, score in zip(top_indices, top_k_values)]

if __name__ == "__main__":
    video_id = "kCc8FmEb1nY" 
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript_text = " ".join([entry['text'] for entry in transcript_list])
    
    model = setup_retrieval_system()
    
    print("\nDense Passage Retrieval (DPR) Test")
    print("-" * 50)
    
    while True:
        query = input("\nEnter your query (or 'quit' to exit): ").strip()
        
        if query.lower() in ['quit', 'exit', 'q']:
            print("\nThank you for using DPR Search!")
            break
            
        if not query:
            print("Please enter a valid query.")
            continue
        
        results = find_relevant_sections(model, query, transcript_text)
        
        print("\nTop relevant sections:")
        print("-" * 50)
        for i, (text, score) in enumerate(results, 1):
            print(f"\nMatch {i} (Score: {score:.4f}):")
            print(f"Text: {text}\n")