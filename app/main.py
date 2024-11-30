import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models.profile import UserProfile
from openai import OpenAI
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

# Load environment variables
load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Your API",
    description="Your API Description",
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

@app.post("/chat")
async def chat_endpoint(chat_request: ChatRequest):
    """Process chat messages and return responses"""
    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        system_prompt = """You are a helpful AI assistant that provides clear and concise responses to user questions."""

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                *[{"role": msg.role, "content": msg.content} for msg in chat_request.conversationHistory],
                {"role": "user", "content": chat_request.message}
            ],
            max_tokens=1500
        )

        response_text = response.choices[0].message.content
        
        # For now, we'll just return the response as a single text section
        response_sections = [
            MessageSection(
                type=MessageType.text,
                content=response_text
            )
        ]
        
        return {"response": response_sections}

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Add your routes below

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)