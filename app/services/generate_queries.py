from anthropic import Anthropic
from fastapi.logger import logger
from app.models.profile import UserProfile
import os
from dotenv import load_dotenv
from app.services.diversify_queries import QueryDiversifier

class YouTubeQueryGenerator:
    def __init__(self, api_key: str):
        self.client = Anthropic(api_key=api_key)
    
    def _build_prompt(self, profile: UserProfile, num_queries: int) -> str:
        base_prompt = f"""
        Analyze this detailed user interest profile and generate {num_queries} diverse YouTube search queries:

        USER PROFILE:
        {profile.interest_profile}

        TASK:
        1. Extract key themes and topics from the profile
        2. Generate specific, targeted search queries that cover different aspects
        3. Ensure queries are diverse and non-redundant
        4. Assign each query a relevance score (0-1) based on how central it is to the user's interests

        EXCLUDED TOPICS:
        {', '.join(profile.excluded_topics) if profile.excluded_topics else 'None'}

        Format each response exactly as:
        query: <specific search query>
        domain: <relevant category>
        relevance: <score between 0 and 1>

        Make queries specific enough to yield focused results. Avoid generic terms.
        """
        return base_prompt

    def generate_queries(self, profile: UserProfile, num_queries: int = 8) -> dict:
        """Generate expanded YouTube search queries based on user interest profile."""
        try:
            prompt = self._build_prompt(profile, num_queries)
            logger.info(f"Generating queries for profile with {len(profile.excluded_topics)} excluded topics")
            
            response = self.client.messages.create(
                model="claude-3-5-sonnet-latest",
                max_tokens=1000,
                temperature=0.7,
                system="You are a YouTube search query generator that creates specific, targeted queries based on user interests. Focus on extracting meaningful themes and generating diverse, non-redundant queries.",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )
            
            response_text = response.content[0].text
            if not any('query:' in line for line in response_text.split('\n')):
                logger.error("Response format incorrect - no queries found")
                return {'queries': [{'query': 'Default query', 'domain': 'general', 'relevance_score': 0.5}]}
                
            query_blocks = [block.strip() for block in response_text.split('\n\n') if block.strip()]
            
            queries = []
            for block in query_blocks:
                try:
                    lines = [l.strip() for l in block.split('\n')]
                    query_line = next(l for l in lines if l.startswith('query:'))
                    domain_line = next(l for l in lines if l.startswith('domain:'))
                    relevance_line = next(l for l in lines if l.startswith('relevance:'))
                    
                    query = query_line.split(':', 1)[1].strip()
                    domain = domain_line.split(':', 1)[1].strip()
                    relevance = float(relevance_line.split(':', 1)[1].strip())
                    
                    if not any(topic.lower() in query.lower() for topic in profile.excluded_topics):
                        queries.append({
                            'query': query,
                            'domain': domain,
                            'relevance_score': relevance
                        })
                except (StopIteration, IndexError, ValueError) as e:
                    logger.error(f"Failed to parse block: {block}", exc_info=True)
                    continue
            
            if not queries:
                logger.warning("No valid queries parsed from response")
                return {'queries': [{'query': 'Default query', 'domain': 'general', 'relevance_score': 0.5}]}
            
            queries.sort(key=lambda x: x['relevance_score'], reverse=True)
            logger.info(f"Successfully generated {len(queries)} queries")
            
            return {'queries': queries[:num_queries]}
            
        except Exception as e:
            logger.error("Failed to generate queries", exc_info=True)
            return {'queries': [{'query': 'Default query', 'domain': 'general', 'relevance_score': 0.5}]}

if __name__ == "__main__":
    # Load environment variables
    load_dotenv()
    
    # Get API key from environment
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY environment variable is not set")

    # Initialize the generators
    generator = YouTubeQueryGenerator(api_key=api_key)
    diversifier = QueryDiversifier()

    # Test profiles
    test_profiles = [
        UserProfile(
            interest_profile="""
            I'm a software developer with 5 years of experience, primarily working with Python 
            and JavaScript. I'm particularly interested in machine learning and AI, especially 
            practical applications in business. Recently, I've been exploring cloud architecture 
            and DevOps practices. I'm also passionate about software testing and clean code 
            principles. Outside of pure programming, I enjoy learning about system design and 
            database optimization.
            """,
            excluded_topics=["gaming", "Java"]
        ),
        UserProfile(
            interest_profile="""
            I'm a beginner programmer just starting my journey in tech. I want to learn the 
            fundamentals of coding and software development. I'm interested in web development 
            and would like to build my own websites. I also want to understand basic computer 
            science concepts and best practices for writing good code.
            """,
            excluded_topics=["advanced algorithms", "enterprise architecture"]
        )
    ]

    # Test each profile
    for i, profile in enumerate(test_profiles, 1):
        print(f"\nTesting Profile {i}:")
        print("=" * 50)
        print(f"Profile: {profile.interest_profile.strip()}")
        print(f"Excluded topics: {profile.excluded_topics}")
        print("-" * 50)

        try:
            # Generate initial queries
            query_response = generator.generate_queries(profile, num_queries=10)
            
            print("\nInitial Queries:")
            for j, query in enumerate(query_response['queries'], 1):
                print(f"\n{j}. Query: {query['query']}")
                print(f"   Domain: {query['domain']}")
                print(f"   Relevance: {query['relevance_score']:.2f}")
            
            # Diversify the queries
            diverse_queries = diversifier.diversify_queries(query_response['queries'])
            
            print("\nDiverse Queries:")
            for j, query in enumerate(diverse_queries, 1):
                print(f"\n{j}. Query: {query['query']}")
                print(f"   Domain: {query['domain']}")
                print(f"   Relevance: {query['relevance_score']:.2f}")

        except Exception as e:
            print(f"Error processing profile {i}: {str(e)}")
            logger.error(f"Error processing profile {i}", exc_info=True)
