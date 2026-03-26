"""
Repositories Router — Local repository analysis endpoints.
Replaces: main.py L221-263 (repository analysis tab)
"""

import json
import os
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from backend.config import llm, embeddings, PERSIST_DIR
from backend.models.documents import RepoAnalysisRequest
from agents.code_agents import CodeReviewAgent
from utils.fileutils import load_repo
from utils.dbutils import save_to_db

router = APIRouter()


@router.post("/analyze")
async def analyze_repository(request: RepoAnalysisRequest):
    """
    Analyze a local code repository.
    
    - Loads all code files recursively
    - Runs CodeReviewAgent for quality assessment
    - Stores in ChromaDB for RAG
    - Streams results via SSE
    
    Source: main.py L221-263
    """

    async def event_stream():
        yield f"data: {json.dumps({'type': 'status', 'content': 'Loading repository...'})}\n\n"

        if not os.path.isdir(request.path):
            yield f"data: {json.dumps({'type': 'error', 'content': f'Directory not found: {request.path}'})}\n\n"
            return

        try:
            docs = load_repo(request.path)
            yield f"data: {json.dumps({'type': 'status', 'content': f'Loaded {len(docs)} files. Analyzing...'})}\n\n"

            # Run code review
            code_review_agent = CodeReviewAgent(llm)
            combined_code = "\n".join([d.page_content for d in docs])
            review = await code_review_agent.review_code(combined_code)

            # Save to DB
            save_to_db(docs, embeddings, PERSIST_DIR)

            yield f"data: {json.dumps({'type': 'result', 'content': review})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'content': str(e)})}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")
