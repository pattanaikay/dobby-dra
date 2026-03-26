"""
Knowledge Graph Router — Interactive graph exploration endpoints.
New feature defined in Design.md §3.D
"""

import uuid
from fastapi import APIRouter

from backend.config import llm, embeddings, PERSIST_DIR
from backend.models.graph import GraphExpandRequest, GraphResponse, GraphNode, GraphEdge
from backend.services.graph_service import GraphService

router = APIRouter()
graph_service = GraphService(llm, embeddings, PERSIST_DIR)


@router.get("/{session_id}", response_model=GraphResponse)
async def get_graph(session_id: str):
    """
    Get the knowledge graph for a research session.
    Returns nodes (concepts) and edges (relationships) built from
    the research entities extracted during the session.
    
    Source: Design.md §3.D — Knowledge Graph View
    """
    return await graph_service.get_session_graph(session_id)


@router.post("/expand", response_model=GraphResponse)
async def expand_node(request: GraphExpandRequest):
    """
    Expand a node to discover related concepts.
    
    - Queries ChromaDB for related content
    - Uses LLM to extract entity relationships
    - Returns new nodes and edges to add to the graph
    
    Source: Design.md §3.D — "Clicking a node fetches its related entities"
    """
    return await graph_service.expand_node(
        node_id=request.node_id,
        session_id=request.session_id,
    )
