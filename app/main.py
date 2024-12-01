import logging
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.models.profile import UserProfile
from openai import OpenAI
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum
from app.services.youtube import YouTubeService
from app.services.extract import setup_retrieval_system, find_relevant_sections
from app.services.speech_api import transcribe_audio, text_to_speech
import re
import uvicorn

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Tldr API",
    description="Tldr API Description",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Recommendation endpoint
@app.get("/recommend")
async def get_recommendations(user: UserProfile):
    """Return a list of recommended URLs"""
    recommendations = [
        "https://fastapi.tiangolo.com/",
        "https://docs.python.org/",
        "https://www.python.org/",
        # Add more URLs as needed
    ]
    return {"recommendations": recommendations}

class MessageType(str, Enum):
    text = "text"
    video = "video"

class MessageSection(BaseModel):
    type: MessageType
    content: str
    videoId: Optional[str] = None
    startTime: Optional[int] = None

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    conversationHistory: List[ChatMessage] = []

class VideoSearchRequest(BaseModel):
    query: str
    max_results: int = 3

async def search_and_extract_relevant_clips(
    youtube_service: YouTubeService, 
    query: str,
    model
) -> List[MessageSection]:
    """Search YouTube and find relevant clips based on query"""
    # Generate search queries based on the user's message
    search_queries = [query]  # Could be expanded with query reformulation
    
    # Search for videos
    video_candidates = await youtube_service.search_videos(search_queries)
    
    relevant_clips = []
    for video in video_candidates:
        if not video.transcript:
            continue
            
        # Convert transcript dict to text format with timestamps
        transcript_text = " ".join([
            f"[{int(start//3600):02d}:{int((start%3600)//60):02d}:{start%60:05.2f}] {text}"
            for start, text in video.transcript.items()
        ])
        
        # Find relevant sections in the transcript
        matches = find_relevant_sections(model, query, transcript_text, top_k=2)
        
        for text, score in matches:
            if score < 0.3:  # Relevance threshold
                continue
                
            # Extract timestamp from the matched text
            timestamp_match = re.match(r'\[(\d{2}):(\d{2}):(\d{2}\.\d{2})\]', text)
            if timestamp_match:
                hours, minutes, seconds = timestamp_match.groups()
                start_time = int(float(hours) * 3600 + float(minutes) * 60 + float(seconds))
                
                # Create a dict that matches the MessageSection interface exactly
                relevant_clips.append({
                    "type": "video",
                    "content": text.split('] ', 1)[1],  # Remove timestamp from content
                    "videoId": video.video_id,
                    "startTime": start_time
                })
    
    return relevant_clips

@app.post("/chat")
async def chat_endpoint(chat_request: ChatRequest):
    """Process chat messages and return responses with relevant video clips"""
    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        youtube_service = YouTubeService(api_key=os.getenv("YOUTUBE_API_KEY"))
        retrieval_model = setup_retrieval_system()
        
        # First, search for relevant video clips
        relevant_clips = await search_and_extract_relevant_clips(
            youtube_service,
            chat_request.message,
            retrieval_model
        )
        
        # Prepare context with relevant clips for GPT
        clips_context = "\n\n".join([
            f"Video clip ({clip['videoId']} at {clip['startTime']}s): {clip['content']}"
            for clip in relevant_clips
        ])
        
        system_prompt = """You are a helpful AI assistant that prioritizes showing relevant video content first. 
        Structure your responses using these tags, leading with the most relevant video clips when possible:

        <video id="VIDEO_ID" time="START_TIME">Brief explanation of relevance: CONTENT</video>
        <text>Short, concise text to connect or explain concepts</text>

        Guidelines:
        - Lead with relevant video clips whenever possible
        - Keep text sections brief and focused
        - Use text mainly to connect videos or explain what to look for
        - Only include the most relevant videos
        
        Example response format:
        <video id="abc123" time="45">This clip perfectly demonstrates the concept you asked about with a visual breakdown</video>
        <text>Notice how the visualization shows the key points. Let's look at another example:</text>
        <video id="xyz789" time="120">This follow-up clip shows a practical application of the concept</video>
        <text>These two examples together cover the core aspects of your question.</text>"""

        messages = [
            {"role": "system", "content": system_prompt},
            *[{"role": msg.role, "content": msg.content} for msg in chat_request.conversationHistory]
        ]
        
        if clips_context:
            messages.append({
                "role": "system",
                "content": f"Relevant video clips found:\n{clips_context}"
            })
            
        messages.append({"role": "user", "content": chat_request.message})

        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            max_tokens=1500
        )

        response_text = response.choices[0].message.content
        
        # Parse the response into sections
        response_sections = []

        # Add text sections
        text_segments = re.findall(r'<text>(.*?)</text>', response_text, re.DOTALL)
        for segment in text_segments:
            response_sections.append({
                "type": "text",
                "content": segment.strip()
            })

        # Add video sections
        video_segments = re.findall(r'<video id="(.*?)" time="(.*?)">(.*?)</video>', response_text, re.DOTALL)
        for video_id, start_time, content in video_segments:
            response_sections.append({
                "type": "video",
                "content": content.strip(),
                "videoId": video_id,
                "startTime": int(start_time)
            })

        logger.info(f"Returning response: {response_sections}")
        return {"response": response_sections}

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/stt")
async def stt_endpoint(audio_file: UploadFile = File(...)):
    """Transcribe an audio file to text"""
    try:
        temp_path = None
        # Create temporary file to store audio
        tmp_path = os.path.join(os.path.dirname(__file__), "speech_input/temp.webm")
        with open(tmp_path, 'wb') as temp_file:
            # Write uploaded file content to temp file
            content = await audio_file.read()
            temp_file.write(content)
            temp_path = temp_file.name
        logger.info(f"Temp file created: {temp_path}")
        
        # Transcribe audio using existing function
        transcription = transcribe_audio(temp_path)

        # Clean up temp file
        os.remove(temp_path)

        return {"transcription": transcription}
    except Exception as e:
        logger.error(f"Error in stt endpoint: {e}")
        # Clean up temp file if exists
        # if temp_path:
        #     os.remove(temp_path)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/tts/{text}")
async def tts_endpoint(text: str):
    """Test the text-to-speech functionality"""
    try:
        speech_file_path = text_to_speech(text)
        return FileResponse(
            speech_file_path,
            media_type="audio/mpeg",
            filename=os.path.basename(speech_file_path)
        )
    except Exception as e:
        logger.error(f"Error in test_tts endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))
# Add your routes below

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)