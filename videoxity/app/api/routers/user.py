import logging

from fastapi import APIRouter, BackgroundTasks, HTTPException, Request, status, Depends
from llama_index.core.llms import MessageRole
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func
from sqlalchemy import select
from pydantic import BaseModel

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
from app.db.models import Message as DBMessage, Chat, User  # Import the SQLAlchemy model
from typing import Optional
import json
import uuid

user_router = r = APIRouter()

logger = logging.getLogger("uvicorn")


async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close()


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


class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    avatar_url: Optional[str]
    bio: Optional[str]


@r.get("/profile/{user_id}", response_model=UserProfile)
async def get_user_profile(user_id: str, db: AsyncSession = Depends(get_db)):
    user = await db.execute(
        select(User).where(User.id == user_id)
    )
    user_data = user.scalar_one_or_none()
    if not user_data:
        raise HTTPException(status_code=404, detail="Cannot find user")
    return user_data
