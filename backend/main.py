"""
Synthetica Research — FastAPI Application
-----------------------------------------
Main entry point for the backend API server.
Replaces the monolithic Streamlit main.py.

Run: uvicorn backend.main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import CORS_ORIGINS
from backend.routers import chat, documents, repositories, web_content, conversations, graph, discovery

# ─── Application ───
app = FastAPI(
    title="Synthetica Research API",
    description="Backend API for the Synthetica deep research assistant",
    version="1.0.0",
)

# ─── CORS Middleware ───
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Router Registration ───
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(repositories.router, prefix="/api/repositories", tags=["Repositories"])
app.include_router(web_content.router, prefix="/api/web", tags=["Web Content"])
app.include_router(conversations.router, prefix="/api/conversations", tags=["Conversations"])
app.include_router(graph.router, prefix="/api/graph", tags=["Knowledge Graph"])
app.include_router(discovery.router, prefix="/api/discovery", tags=["Discovery"])


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "synthetica-research"}
