from typing import List, Dict
from sklearn.feature_extraction.text import TfidfVectorizer
from fastapi.logger import logger

class QueryDiversifier:
    def __init__(self, similarity_threshold: float = 0.6):
        self.vectorizer = TfidfVectorizer()
        self.similarity_threshold = similarity_threshold

    def calculate_similarity(self, query1: str, query2: str) -> float:
        """Calculate cosine similarity between two queries."""
        tfidf = self.vectorizer.fit_transform([query1, query2])
        return (tfidf * tfidf.T).A[0, 1]

    def diversify_queries(self, queries: List[Dict]) -> List[Dict]:
        """
        Filter out similar queries while maintaining diversity.
        Returns queries ordered by relevance score with similar queries removed.
        
        Args:
            queries: List of query dictionaries with 'query', 'domain', and 'relevance_score' keys
        """
        if not queries:
            logger.warning("Received empty query list for diversification")
            return []

        logger.info(f"Starting diversification of {len(queries)} queries")
        diverse_queries = [queries[0]]  # Start with the highest relevance query
        
        for query in queries[1:]:
            # Check similarity with all accepted queries
            similarities = [
                self.calculate_similarity(query['query'], dq['query'])
                for dq in diverse_queries
            ]
            
            # Add query if it's sufficiently different from all accepted queries
            if all(sim < self.similarity_threshold for sim in similarities):
                diverse_queries.append(query)

        logger.info(f"Diversification complete. Reduced from {len(queries)} to {len(diverse_queries)} queries")
        return diverse_queries 