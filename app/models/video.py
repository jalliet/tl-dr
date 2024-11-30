from pydantic import BaseModel
from typing import Optional, Dict

class VideoCandidate(BaseModel):
    video_id: str
    title: str
    description: str
    duration: int
    # Transcript is a dictionary with timestamp (seconds) as keys and text as values
    transcript: Optional[Dict[int, str]] = None
    channel_id: str
    channel_title: str
    published_at: str
