from typing import List, Dict
import logging
import googleapiclient.discovery
import isodate
from youtube_transcript_api import YouTubeTranscriptApi
from app.models.video import VideoCandidate

logger = logging.getLogger(__name__)

class YouTubeService:
    def __init__(self, api_key: str):
        self.youtube = googleapiclient.discovery.build(
            "youtube", "v3", developerKey=api_key
        )
        
    async def search_videos(self, queries: List[str]) -> List[VideoCandidate]:
        """Search for videos matching the given queries."""
        video_candidates = []
        
        for query in queries:
            try:
                # Search for videos
                search_response = self.youtube.search().list(
                    q=query,
                    part="id,snippet",
                    maxResults=5,
                    type="video"
                ).execute()
                
                # Get video IDs from search results
                video_ids = [item["id"]["videoId"] for item in search_response["items"]]
                
                # Get detailed information for each video
                for video_id in video_ids:
                    try:
                        video = await self._get_video_details(video_id)
                        if video:
                            video_candidates.append(video)
                    except Exception as e:
                        logger.error(f"Error getting video details for {video_id}: {str(e)}")
                        continue
                        
            except Exception as e:
                logger.error(f"Error searching for query '{query}': {str(e)}")
                continue
                
        return video_candidates
    
    async def _get_video_details(self, video_id: str) -> VideoCandidate:
        """Get detailed information about a specific video, including its transcript."""
        # Get video details from YouTube API
        video_response = self.youtube.videos().list(
            part="snippet,contentDetails",
            id=video_id
        ).execute()
        
        if not video_response["items"]:
            raise ValueError(f"No video found with ID {video_id}")
            
        video_data = video_response["items"][0]
        duration = isodate.parse_duration(video_data["contentDetails"]["duration"]).total_seconds()
        
        # Get transcript using youtube_transcript_api
        transcript = await self._get_transcript(video_id)
        
        return VideoCandidate(
            video_id=video_id,
            title=video_data["snippet"]["title"],
            description=video_data["snippet"]["description"],
            duration=int(duration),
            transcript=transcript,
            channel_id=video_data["snippet"]["channelId"],
            channel_title=video_data["snippet"]["channelTitle"],
            published_at=video_data["snippet"]["publishedAt"]
        )
    
    async def _get_transcript(self, video_id: str) -> Dict[int, str]:
        """Get video transcript using youtube_transcript_api."""
        try:
            transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
            
            # Transform the transcript into the required format
            transcript_data = {}
            for item in transcript_list:
                start_time = int(float(item["start"]))
                transcript_data[start_time] = item["text"]
                
            return transcript_data
            
        except Exception as e:
            logger.error(f"Error getting transcript for video {video_id}: {str(e)}")
            return None

if __name__ == "__main__":
    import os
    import asyncio
    from dotenv import load_dotenv
    
    # Load environment variables from .env file
    load_dotenv()
    
    async def test_youtube_service():
        # Initialize the service with API key
        youtube_service = YouTubeService(
            api_key=os.getenv("YOUTUBE_API_KEY")
        )
        
        # Test search with a sample query
        queries = ["Python programming tutorial"]
        try:
            results = await youtube_service.search_videos(queries)
            print(f"\nFound {len(results)} videos:")
            for video in results:
                print(f"\nTitle: {video.title}")
                print(f"Channel: {video.channel_title}")
                print(f"Duration: {video.duration} seconds")
                if video.transcript:
                    print(f"Transcript length: {len(video.transcript)} segments")
                else:
                    print("No transcript available")
                print("-" * 50)
        except Exception as e:
            print(f"Error during test: {str(e)}")

    # Run the test
    asyncio.run(test_youtube_service())
