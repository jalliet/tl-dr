from typing import List, Optional, Set
from openai import AsyncOpenAI
import random

class QueryGenerator:
    def __init__(self):
        self.used_queries: Set[str] = set()
        self.query_history_limit = 100  # Reset after this many queries

    async def generate_search_queries(
        self,
        interest_profile: str,
        excluded_topics: Optional[List[str]] = None,
        num_queries: int = 3
    ) -> List[str]:
        """
        Generate YouTube search queries based on user interests using Claude
        """
        client = AsyncOpenAI()
        
        # Reset history if too large to prevent memory bloat
        if len(self.used_queries) > self.query_history_limit:
            self.used_queries.clear()
        
        # Generate more queries than needed to allow for filtering and selection
        prompt = f"""
        Generate {num_queries * 2} different YouTube search queries based on these interests:
        {interest_profile}
        
        Excluded topics to avoid: {', '.join(excluded_topics) if excluded_topics else 'None'}
        
        Format: Return only the queries, one per line.
        Make queries specific and varied to discover diverse content.
        """

        response = await client.chat.completions.create(
            model="claude-3.5-sonnet-latest",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates relevant YouTube search queries."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=200
        )

        # Clean and filter queries
        all_queries = [
            q.strip() for q in response.choices[0].message.content.split('\n')
            if q.strip() and q.strip() not in self.used_queries
        ]
        
        # Randomly select from the new queries
        selected_queries = []
        if all_queries:
            num_to_select = min(num_queries, len(all_queries))
            selected_queries = random.sample(all_queries, num_to_select)
            self.used_queries.update(selected_queries)
            
        return selected_queries
