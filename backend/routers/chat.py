"""
Chat Router — SSE streaming chat and code endpoints.
Replaces: main.py L367-433 (main chat), L296-366 (workspace chats), agentutils.py
"""

import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from backend.config import llm, embeddings, PERSIST_DIR, CODE_DIR
from backend.models.chat import ChatRequest, CodeRequest, CodeResponse
from backend.services.agent_service import AgentService

router = APIRouter()
agent_service = AgentService(llm, embeddings, PERSIST_DIR, CODE_DIR)


@router.post("/query")
async def chat_query(request: ChatRequest):
    """
    Send a chat message and receive a streamed SSE response.
    
    The mode determines which agent handles the query:
    - "research" → PaperAnalysisAgent + RAG context
    - "code"     → CodeGenerationAgent
    - "writing"  → ReportWritingAgent
    - "data"     → RAG-only answer_query
    """

    async def event_stream():
        yield f"data: {json.dumps({'type': 'thinking', 'content': ''})}\n\n"
        full_response = ""
        try:
            async for chunk in agent_service.stream_query(
                query=request.query,
                mode=request.mode,
                conversation_id=request.conversation_id,
            ):
                full_response += chunk
                yield f"data: {json.dumps({'type': 'token', 'content': chunk})}\n\n"

            yield f"data: {json.dumps({'type': 'done', 'full_response': full_response})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'content': str(e)})}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")


@router.post("/code", response_model=CodeResponse)
async def chat_code(request: CodeRequest):
    """
    Generate or modify code based on a query.
    Returns the full response and the file path where code was saved.
    Source: agentutils.apply_code_change()
    """
    response, file_path = await agent_service.apply_code_change(
        query=request.query,
        conversation_id=request.conversation_id,
    )
    return CodeResponse(response=response, file_path=file_path)
