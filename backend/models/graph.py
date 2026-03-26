"""Pydantic models for the Knowledge Graph."""

from pydantic import BaseModel
from typing import List, Dict, Any, Optional


class GraphNode(BaseModel):
    """A node in the knowledge graph."""
    id: str
    label: str
    type: str = "concept"  # "concept" | "paper" | "author" | "method"
    metadata: Dict[str, Any] = {}


class GraphEdge(BaseModel):
    """An edge connecting two nodes in the knowledge graph."""
    source: str
    target: str
    label: str = "related_to"  # "cites" | "uses" | "related_to" | "authored_by"


class GraphExpandRequest(BaseModel):
    """Request to expand a node and discover related entities."""
    node_id: str
    session_id: str


class GraphResponse(BaseModel):
    """Full graph data response."""
    nodes: List[GraphNode]
    edges: List[GraphEdge]


class TopicCard(BaseModel):
    """A discovery topic for the Deep Dive screen."""
    title: str
    description: str
    color: str = "#0453cd"
    image_url: Optional[str] = None
