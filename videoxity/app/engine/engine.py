import os
from typing import List

from llama_index.core.agent import AgentRunner
from llama_index.core.callbacks import CallbackManager
from llama_index.core.settings import Settings
from llama_index.core.tools import BaseTool, FunctionTool

from app.engine.index import IndexConfig, get_index
from app.engine.tools import ToolFactory
from app.engine.tools.query_engine import get_query_engine_tool
from app.engine.youtube import YouTubeQueryEngine


def get_chat_engine(params=None, event_handlers=None, **kwargs):
    system_prompt = """### Context: 
    You are the main assistant for a futuristic youtube search engine app, where users can search for videos, get the good parts, and ask questions about the videos. 
    
    ### Instructions: 
    Given the user's message, decide whether to call the 'search_youtube' tool to search for videos for the user, or the 'talk_to_videos' tool to ask a question to a specific youtube video (you can get the video ids from the youtube url).
    
    Before calling the tools, if the user is not specific about what they want to search for, let them know that you only work well with more details, and try asking for more details along with some questions to help you understand what they want, usually one follow up question is enough. In short, if you think its general, ask for more details, otherwise, use the tools.
    
    The tools will return either a structured response or a message to the user, you just have to relay them back to the user a readable way using markdown. Other than that, you can just talk to the user about videos and not wasting time binge watching. Do not use bullet points when showing video urls.
    """
    tools: List[BaseTool] = []
    callback_manager = CallbackManager(handlers=event_handlers or [])

    # Add query tool if index exists
    index_config = IndexConfig(callback_manager=callback_manager, **(params or {}))
    
    index = get_index(index_config)
    if index is not None:
        query_engine_tool = get_query_engine_tool(index, **kwargs)
        tools.append(query_engine_tool)

    # Build our own index
    # Fetch the youtube videos using youtube search api
    # Embed and index and retrieve the right chunks with timestamps and urls
    youtube_retriever = YouTubeQueryEngine()
    youtube_search_tool = FunctionTool.from_defaults(fn=youtube_retriever.search_youtube, name="search_youtube", description="Search youtube for videos using a search query and returns a report with the results")
    
    # Ask questions on a specific youtube video
    youtube_talk_tool = FunctionTool.from_defaults(fn=youtube_retriever.talk_to_videos, name="talk_to_videos", description="Specify a list of youtube video ids and a question to ask about one or many of the videos. You can get the video ids from the youtube url.")
    
    tools.append(youtube_search_tool)
    tools.append(youtube_talk_tool)
    
    # Add additional tools
    configured_tools: List[BaseTool] = ToolFactory.from_env()
    tools.extend(configured_tools)

    return AgentRunner.from_llm(
        llm=Settings.llm,
        tools=tools,
        system_prompt=system_prompt,
        callback_manager=callback_manager,
        verbose=True,
    )
