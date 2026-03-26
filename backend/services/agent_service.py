"""
Agent Service — Core orchestration layer for LLM agent calls.
Replaces: agentutils.py (answer_query, apply_code_change)
Adds: async streaming, mode-based agent routing
"""

import asyncio
from typing import AsyncGenerator

from agents.research_agents import PaperAnalysisAgent, LiteratureReviewAgent
from agents.code_agents import CodeGenerationAgent, CodeReviewAgent
from agents.writing_agents import ReportWritingAgent
from utils.dbutils import query_db
from utils.logutils import log_code_change


class AgentService:
    """
    Orchestrates agent calls with RAG context from ChromaDB.
    Converts synchronous llm.invoke() to async streaming via llm.astream().
    """

    def __init__(self, llm, embeddings, persist_dir: str, code_dir: str):
        self.llm = llm
        self.embeddings = embeddings
        self.persist_dir = persist_dir
        self.code_dir = code_dir

    async def stream_query(
        self,
        query: str,
        mode: str,
        conversation_id: str,
    ) -> AsyncGenerator[str, None]:
        """
        Stream a query response token-by-token via the appropriate agent.

        This is the async streaming replacement for agentutils.answer_query(),
        which previously used synchronous llm.invoke().

        Args:
            query: The user's question
            mode: "research" | "code" | "writing" | "data"
            conversation_id: ID of the conversation for history tracking
        """
        # Get RAG context from ChromaDB
        results = query_db(query, self.embeddings, self.persist_dir)
        context = "\n".join([r.page_content for r in results])

        # Build mode-specific prompt
        prompt = self._build_prompt(query, context, mode)

        # Stream tokens from LLM
        async for chunk in self.llm.astream(prompt):
            if chunk.content:
                yield chunk.content

    def _build_prompt(self, query: str, context: str, mode: str) -> str:
        """Build a mode-specific prompt with RAG context."""
        base = f"Context:\n{context}\n\n"

        if mode == "research":
            return (
                base
                + "You are a research assistant specializing in academic paper analysis. "
                + f"Question: {query}\nAnswer:"
            )
        elif mode == "code":
            return (
                base
                + "You are a coding assistant. Provide clean, well-documented code. "
                + f"Request: {query}\nAnswer:"
            )
        elif mode == "writing":
            return (
                base
                + "You are a technical writing assistant. "
                + f"Task: {query}\nAnswer:"
            )
        else:  # data
            return base + f"Question: {query}\nAnswer:"

    async def apply_code_change(self, query: str, conversation_id: str) -> tuple:
        """
        Generate code changes and save to a timestamped file.
        Source: agentutils.apply_code_change()
        
        Returns:
            Tuple of (response_text, file_path)
        """
        results = query_db(query, self.embeddings, self.persist_dir)
        context = "\n".join([r.page_content for r in results])
        prompt = (
            f"You are a coding assistant. Here is some code:\n{context}\n"
            f"User request: {query}\n"
            f"Provide the modified code ONLY."
        )
        response = self.llm.invoke(prompt)
        content = response.content
        fname = log_code_change(query, content, self.code_dir)
        return content, fname
