from pydantic import BaseModel, Field
from typing import List

class SearchQuery(BaseModel):
    query: str = Field(..., min_length=3, max_length=200)
    domain: str = Field(..., min_length=2, max_length=50)
    relevance_score: float = Field(..., ge=0, le=1)
    
class SearchQueryResponse(BaseModel):
    queries: List[SearchQuery] = Field(..., min_items=1, max_items=20)