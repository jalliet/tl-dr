from pydantic import BaseModel, Field
from typing import List

class UserProfile(BaseModel):
    interest_profile: str = Field(..., description="Natural language description of the user's interests")
    excluded_topics: List[str] = Field(default_factory=list, description="List of topics to exclude from the interest profile") 