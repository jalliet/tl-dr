import logging

from fastapi import APIRouter, BackgroundTasks, HTTPException, Request, status, Depends
from llama_index.core.llms import MessageRole
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func

from app.api.routers.events import EventCallbackHandler
from app.api.routers.models import (
    ChatData,
    Message,
    Result,
    SourceNodes,
)
from app.api.routers.vercel_response import VercelStreamResponse
from app.engine.engine import get_chat_engine
from app.engine.query_filter import generate_filters
from app.db.database import AsyncSessionLocal
from app.db.models import Message as DBMessage, Chat  # Import the SQLAlchemy model
from typing import Optional
import json
import uuid
chat_router = r = APIRouter()

logger = logging.getLogger("uvicorn")


async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close()


# streaming endpoint - delete if not needed
@r.post("")
async def chat(
    request: Request,
    data: ChatData,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    try:
        params = data.data or {}
        # Get or create chat
        chat_id = data.id
        user_id = data.userId
        print(f"chat_id: {chat_id}, user_id: {user_id}")
        
        # Check if chat exists
        chat = await db.get(Chat, chat_id)
        if not chat:
            chat = Chat(
                id=chat_id,
                user_id=user_id,
                title=data.messages[-1].content[:50] if data.messages else "New Chat",
                created_at=func.now()
            )
            db.add(chat)
        
        # Save user message
        user_message = DBMessage(
            id=str(uuid.uuid4()),
            chat_id=chat_id,
            role="user",
            content=data.messages[-1].content if data.messages else "",
            created_at=func.now()
        )
        db.add(user_message)
        await db.commit()

        # Your existing chat logic
        last_message_content = data.get_last_message_content()
        messages = data.get_history_messages()
        doc_ids = data.get_chat_document_ids()
        filters = generate_filters(doc_ids)
        
        event_handler = EventCallbackHandler()
        chat_engine = get_chat_engine(
            filters=filters, 
            params=params, 
            event_handlers=[event_handler]
        )
        response = chat_engine.astream_chat(last_message_content, messages)

        return VercelStreamResponse(
            request, event_handler, response, data, background_tasks
        )
    except Exception as e:
        logger.exception("Error in chat engine", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error in chat engine: {e}",
        ) from e


# non-streaming endpoint - delete if not needed
@r.post("/request")
async def chat_request(
    data: ChatData,
) -> Result:
    last_message_content = data.get_last_message_content()
    messages = data.get_history_messages()

    doc_ids = data.get_chat_document_ids()
    filters = generate_filters(doc_ids)
    params = data.data or {}
    logger.info(
        f"Creating chat engine with filters: {str(filters)}",
    )

    chat_engine = get_chat_engine(filters=filters, params=params)

    response = await chat_engine.achat(last_message_content, messages)
    return Result(
        result=Message(role=MessageRole.ASSISTANT, content=response.response),
        nodes=SourceNodes.from_source_nodes(response.source_nodes),
    )
