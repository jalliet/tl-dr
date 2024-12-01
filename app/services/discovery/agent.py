from typing import List, Set
import logging
import asyncio
from app.models.profile import UserProfile
from app.models.video import VideoCandidate
from app.services.youtube import YouTubeService
from app.services.discovery.generate_queries import QueryGenerator
from app.services.extract import setup_retrieval_system, find_relevant_sections

logger = logging.getLogger(__name__)

class DiscoveryAgent:
    def __init__(self, youtube_service: YouTubeService):
        self.youtube_service = youtube_service
        self.retrieval_model = setup_retrieval_system()
        self.candidate_pool: List[VideoCandidate] = []
        self.seen_video_ids: Set[str] = set()
        self.query_generator = QueryGenerator()
        self._discovery_task = None
        self._is_exploring = False
        self.max_seen_history = 1000  # Limit for seen videos history
    
    async def start_continuous_discovery(self, user_profile: UserProfile):
        """Start continuous background discovery process"""
        if self._discovery_task is None:
            self._is_exploring = True
            self._discovery_task = asyncio.create_task(
                self._continuous_discovery(user_profile)
            )
    
    async def stop_continuous_discovery(self):
        """Stop the continuous discovery process"""
        self._is_exploring = False
        if self._discovery_task:
            self._discovery_task.cancel()
            self._discovery_task = None
    
    async def next_n_recommendations(self, n: int = 5) -> List[VideoCandidate]:
        """
        Get the next N best recommendations from the candidate pool
        """
        if not self.candidate_pool:
            return []
            
        recommendations = []
        while len(recommendations) < n and self.candidate_pool:
            video = self.candidate_pool.pop(0)
            if video.video_id not in self.seen_video_ids:
                recommendations.append(video)
                self.seen_video_ids.add(video.video_id)
                
        return recommendations
    
    async def _continuous_discovery(self, user_profile: UserProfile):
        """
        Continuously discover and maintain a pool of candidate videos
        """
        MIN_POOL_SIZE = 20
        
        while self._is_exploring:
            try:
                if len(self.candidate_pool) < MIN_POOL_SIZE:
                    new_candidates = await self.discover_content(user_profile)
                    
                    # Filter out already seen videos
                    new_candidates = [
                        video for video in new_candidates 
                        if video.video_id not in self.seen_video_ids
                    ]
                    
                    self.candidate_pool.extend(new_candidates)
                    
                # Wait before next discovery cycle
                await asyncio.sleep(300)  # 5 minutes between discovery cycles
                
            except Exception as e:
                logger.error(f"Error in continuous discovery: {e}")
                await asyncio.sleep(60)  # Wait 1 minute on error before retrying
    
    async def _prune_history(self):
        """Prune the seen videos history if it gets too large"""
        if len(self.seen_video_ids) > self.max_seen_history:
            # Keep the most recent half of the history
            sorted_history = sorted(
                self.seen_video_ids,
                key=lambda x: x.timestamp if hasattr(x, 'timestamp') else 0,
                reverse=True
            )
            self.seen_video_ids = set(sorted_history[:self.max_seen_history // 2])
    
    async def discover_content(self, user_profile: UserProfile) -> List[VideoCandidate]:
        """
        Main discovery method that finds relevant content based on user profile
        """
        try:
            await self._prune_history()
            
            # Generate search queries based on user profile
            queries = await self.query_generator.generate_search_queries(
                user_profile.interest_profile,
                user_profile.excluded_topics
            )
            
            if not queries:  # If we couldn't generate new queries
                return []
                
            # Search for videos using the YouTube service
            candidates = await self.youtube_service.search_videos(queries)
            
            # Pre-filter candidates before expensive ranking
            filtered_candidates = [
                video for video in candidates 
                if video.video_id not in self.seen_video_ids
            ]
            
            if not filtered_candidates:
                return []
                
            # Filter and rank candidates
            ranked_candidates = await self._rank_candidates(
                filtered_candidates,
                user_profile.interest_profile
            )
            
            return ranked_candidates[:5]  # Return top 5 matches
            
        except Exception as e:
            logger.error(f"Error in content discovery: {e}")
            return []
    
    async def _rank_candidates(
        self,
        candidates: List[VideoCandidate],
        interest_profile: str
    ) -> List[VideoCandidate]:
        """
        Rank video candidates based on relevance to user interests
        """
        ranked_videos = []
        
        for video in candidates:
            if not video.transcript:
                continue
                
            # Convert transcript to analyzable text
            transcript_text = " ".join([
                f"{text}" for _, text in video.transcript.items()
            ])
            
            # Use the retrieval model to score relevance
            matches = find_relevant_sections(
                self.retrieval_model,
                interest_profile,
                transcript_text,
                top_k=1
            )
            
            if matches:
                # Use the best match score as the video's relevance score
                score = matches[0][1]
                ranked_videos.append((score, video))
        
        # Sort by score and return just the videos
        ranked_videos.sort(reverse=True, key=lambda x: x[0])
        return [video for _, video in ranked_videos]