"""Pydantic models for chat-related requests and responses."""

from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    """Request body for chat queries."""
    query: str
    mode: str = "research"  # "research" | "code" | "writing" | "data"
    conversation_id: str = "main"


class CodeRequest(BaseModel):
    """Request body for code generation/modification."""
    query: str
    conversation_id: str = "main"


class CodeResponse(BaseModel):
    """Response body for code operations."""
    response: str
    file_path: Optional[str] = None


class ChatMessage(BaseModel):
    """A single chat message."""
    role: str  # "user" | "assistant"
    content: str
