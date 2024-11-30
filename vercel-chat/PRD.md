# YouTube Time Saver - Product Requirements Document (PRD)

## Objective
Streamline the YouTube search experience by providing highly relevant, summarized video content with time-stamped highlights, enabling users to save time and enhance productivity.

---

## Target Audience
- Knowledge seekers who want quick, summarized insights from YouTube videos.  
- Professionals and students conducting research or learning via video content.  
- Individuals looking to maximize the efficiency of video-based searches.

---

## Key Features

### 1. Enhanced Video Search and Ranking
- **Input:** User searches for a video query.  
- **Process:**
  - Use **Apify** to scrape transcripts from the top video search results.  
  - Apply a **reranker model** to reorder videos based on transcript relevance to the query.

### 2. Summarization and Embedding
- Select the top **5 most relevant videos** after reranking.  
- Embed all the transcripts using **LlamaIndex** to create a retriever.  
- Use the retriever to extract the **most relevant transcript chunks** and their corresponding timestamps.

### 3. Conversational Chat Interface
- **Summary Presentation:**
  - Display quick summaries of relevant sections from each video.  
  - Include embedded YouTube videos in the chat, starting at relevant timestamps.  
  - Interleave **embeds** (text summaries or insights) within the response text.
- **Follow-Up Questions:**
  - Allow the user to ask follow-up questions to refine or explore specific parts of the video content.  
  - Enable additional searches if the chatbot cannot provide sufficient information.

### 4. Timestamped Playback
- Videos linked in the response start at the relevant timestamp for quick access to the desired section.

### 5. Interactive Video Exploration
- Embed the video player and allow users to navigate timestamps directly from the chat interface.  
- Provide snippets of transcript text around timestamps for context.

---

## User Workflow

1. **Search:** User enters a query into the app.  
2. **Transcript Fetching:** Transcripts of relevant videos are scraped using Apify.  
3. **Re-ranking:** Videos are reranked using a custom relevance model on the transcripts.  
4. **Summary Generation:**
   - Top 5 transcripts are embedded.
   - Summarized responses with timestamps and embedded videos are displayed in the chat interface.  
5. **Follow-Up:**
   - User can refine the search or ask for deeper insights.  
   - Chatbot responds with new summaries or triggers another search if needed.  
6. **Direct Playback:** Embedded videos start playing at the specified timestamp when clicked.

---

## Non-Functional Requirements

### 1. Performance
- Response time for generating summaries should be under 10 seconds.  
- Search results should be refined and presented within 15 seconds of the query.

### 2. Scalability
- Support concurrent searches with minimal latency.  
- Handle transcript processing efficiently using batch requests.

### 3. Accuracy
- Use state-of-the-art reranking models and embedding techniques for optimal transcript relevance and summary accuracy.

### 4. Usability
- Intuitive chat interface for non-technical users.  
- Smooth integration of timestamps and videos for seamless navigation.

---

## Tech Stack

### Frontend
- React.js or Next.js for an interactive chat-based UI.

### Backend
- **Python (FastAPI)** or Node.js for handling search queries and integrating APIs.

### AI Models
- **Reranker Model:** For transcript-based relevance ranking.  
- **LlamaIndex:** For embedding transcripts and creating the retriever.

### Data Handling
- **Apify:** To scrape YouTube transcripts.  
- **Database:** A lightweight database like SQLite or MongoDB for storing temporary transcript data.

### APIs and Integrations
- YouTube API for video metadata and search.  
- Apify API for transcript scraping.  
- LlamaIndex for embedding and retrieval.

---

## Milestones

### Phase 1: MVP Development (4 weeks)
- Implement search, transcript fetching, reranking, and chat interface.

### Phase 2: Embedding and Summarization (2 weeks)
- Add embedding and summary generation with interactive timestamps.

### Phase 3: Follow-Up Questions (2 weeks)
- Implement follow-up questioning and iterative search refinement.

### Phase 4: Optimization and Deployment (2 weeks)
- Optimize performance and deploy a scalable version.

---

## Success Metrics

- **Time Saved:** Quantifiable reduction in time users spend searching for relevant video content.  
- **User Satisfaction:** Positive feedback on the accuracy and relevance of summaries.  
- **Engagement:** High frequency of follow-up questions and timestamped playback usage.
