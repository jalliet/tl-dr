from sqlalchemy import Column, String, DateTime, ForeignKey, JSON, Text, Boolean, Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from .database import Base
import uuid

class User(Base):
    __tablename__ = "User"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    email = Column(String(64), nullable=False)
    password = Column(String(64))

class Chat(Base):
    __tablename__ = "Chat"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    created_at = Column('createdAt', DateTime(timezone=True), nullable=False, server_default=func.now())  # Add server_default
    title = Column(Text, nullable=False)
    user_id = Column('userId', UUID, ForeignKey('User.id'), nullable=False)

class Message(Base):
    __tablename__ = "Message"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    chat_id = Column('chatId', UUID, ForeignKey('Chat.id'), nullable=False)
    role = Column(String, nullable=False)
    content = Column(JSON, nullable=False)
    created_at = Column('createdAt', DateTime(timezone=True), nullable=False, server_default=func.now())
