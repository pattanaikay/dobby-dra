"""
Web Content Router — URL processing endpoints.
Replaces: main.py L265-294 (web content tab)
"""

import asyncio
from fastapi import APIRouter

from backend.config import llm, embeddings, PERSIST_DIR
from backend.models.documents import WebContentRequest
from agents.research_agents import PaperAnalysisAgent
from utils.webutils import add_url_to_db
from utils.dbutils import save_to_db

router = APIRouter()


@router.post("/process")
async def process_web_content(request: WebContentRequest):
    """
    Fetch and process web content from a URL.
    """
    try:
        # Wrap the synchronous add_url_to_db in to_thread
        # The callback also needs to be wrapped if it's sync
        def db_callback(docs):
            save_to_db(docs, embeddings, PERSIST_DIR)

        await asyncio.to_thread(add_url_to_db, request.url, db_callback)

        result = {"url": request.url, "status": "processed", "content_type": request.content_type}

        # Run paper analysis if research paper
        if request.content_type == "research_paper":
            from utils.webutils import fetch_url_content
            from langchain.schema import Document

            text = await asyncio.to_thread(fetch_url_content, request.url)
            paper_doc = Document(page_content=text, metadata={"source": request.url})
            paper_agent = PaperAnalysisAgent(llm)
            analysis = await paper_agent.analyze_paper(paper_doc)
            result["analysis"] = analysis

        return result
    except Exception as e:
        return {"url": request.url, "status": "error", "error": str(e)}
