"""Pydantic models for document upload and processing."""

from pydantic import BaseModel
from typing import Optional, Dict, Any


class DocumentInfo(BaseModel):
    """Information about a processed document."""
    filename: str
    status: str  # "processing" | "complete" | "error"
    file_type: str
    analysis: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


class WebContentRequest(BaseModel):
    """Request body for web content processing."""
    url: str
    content_type: str = "article"  # "research_paper" | "documentation" | "article" | "blog"


class RepoAnalysisRequest(BaseModel):
    """Request body for repository analysis."""
    path: str
    branch: str = "main"
