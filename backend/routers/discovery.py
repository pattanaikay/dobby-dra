"""
Discovery Router — Deep Dive Discovery topic randomizer.
Source: Design.md §3.C
"""

from typing import List
from fastapi import APIRouter

from backend.config import llm, embeddings, PERSIST_DIR
from backend.models.graph import TopicCard
from backend.services.discovery_service import DiscoveryService

router = APIRouter()
discovery_service = DiscoveryService(llm, embeddings, PERSIST_DIR)


@router.get("/topics", response_model=List[TopicCard])
async def get_discovery_topics():
    """
    Get 2 random distinct research topics for the Deep Dive Discovery page.
    
    - Picks topics from the document collection in ChromaDB
    - Each topic includes title, description, and color
    - "Discover" button triggers a re-fetch for new topics
    
    Source: Design.md §3.C — "Randomizer function that picks two distinct topics"
    """
    return await discovery_service.get_random_topics(count=2)
