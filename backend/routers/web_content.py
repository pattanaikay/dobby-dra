"""
Web Content Router — URL processing endpoints.
Replaces: main.py L265-294 (web content tab)
"""

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
    
    - Fetches page content with BeautifulSoup
    - Saves to ChromaDB
    - Optionally runs PaperAnalysisAgent for research papers
    
    Source: main.py L265-294 + webutils.add_url_to_db()
    """
    try:
        add_url_to_db(request.url, lambda docs: save_to_db(docs, embeddings, PERSIST_DIR))

        result = {"url": request.url, "status": "processed", "content_type": request.content_type}

        # Run paper analysis if research paper
        if request.content_type == "research_paper":
            from utils.webutils import fetch_url_content
            from langchain.schema import Document

            text = fetch_url_content(request.url)
            paper_doc = Document(page_content=text, metadata={"source": request.url})
            paper_agent = PaperAnalysisAgent(llm)
            analysis = await paper_agent.analyze_paper(paper_doc)
            result["analysis"] = analysis

        return result
    except Exception as e:
        return {"url": request.url, "status": "error", "error": str(e)}
