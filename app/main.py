import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.profile import UserProfile

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

# Add your routes below