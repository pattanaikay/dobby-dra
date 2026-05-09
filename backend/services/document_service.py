"""
Document Service — File processing and analysis pipeline.
Replaces: main.py L159-215 document processing logic
Adapts: utils/file_processing.py for FastAPI UploadFile
"""

import os
import tempfile
import asyncio
from typing import Optional, Dict, Any, List
from fastapi import UploadFile

from agents.research_agents import PaperAnalysisAgent
from agents.code_agents import CodeReviewAgent
from utils.file_processing import process_uploaded_file, is_text_file
from utils.dbutils import save_to_db
from backend.models.documents import DocumentInfo


class FastAPIFileAdapter:
    """
    Adapter to make FastAPI UploadFile compatible with process_uploaded_file().
    
    The original function expects Streamlit's UploadedFile which has .getbuffer().
    FastAPI's UploadFile uses .read() instead. This adapter bridges the gap.
    
    Source: utils/file_processing.py L39 — file.getbuffer()
    """

    def __init__(self, filename: str, content: bytes):
        self.name = filename
        self._content = content

    def getbuffer(self):
        return self._content


class DocumentService:
    """Handles file upload, processing, analysis, and storage."""

    def __init__(self, llm, embeddings, persist_dir: str):
        self.llm = llm
        self.embeddings = embeddings
        self.persist_dir = persist_dir

    async def process_and_analyze(
        self,
        upload_file: UploadFile,
        temp_dir: str,
        process_type: str = "auto",
    ) -> DocumentInfo:
        """
        Process a single uploaded file: parse → analyze → store.
        
        Source: main.py L167-201 (per-file processing loop)
        """
        try:
            # Read file content and create adapter
            content = await upload_file.read()
            adapter = FastAPIFileAdapter(upload_file.filename, content)

            # Process file into Documents
            docs = process_uploaded_file(adapter, temp_dir)

            # Run analysis based on type (graceful fallback)
            analysis = None
            filename = upload_file.filename or "unknown"
            
            try:
                if process_type == "research" or (
                    process_type == "auto" and filename.endswith(".pdf")
                ):
                    paper_agent = PaperAnalysisAgent(self.llm)
                    analysis = await paper_agent.analyze_paper(docs[0])

                elif process_type == "code" or (
                    process_type == "auto" and is_text_file(filename)
                ):
                    code_agent = CodeReviewAgent(self.llm)
                    analysis = await code_agent.review_code(docs[0].page_content)
            except Exception:
                analysis = {"status": "Analysis deferred — LLM unavailable"}

            # Save to ChromaDB (graceful fallback)
            try:
                await asyncio.to_thread(save_to_db, docs, self.embeddings, self.persist_dir)
            except Exception:
                pass  # ChromaDB may not be initialized yet

            return DocumentInfo(
                filename=filename,
                status="complete",
                file_type=os.path.splitext(filename)[1].lstrip("."),
                analysis=analysis,
            )

        except Exception as e:
            return DocumentInfo(
                filename=upload_file.filename or "unknown",
                status="error",
                file_type="",
                error=str(e),
            )

    async def list_documents(self) -> List[DocumentInfo]:
        """
        List all documents stored in ChromaDB.
        Used by the Research Library page.
        """
        try:
            from langchain_chroma import Chroma

            db = Chroma(
                persist_directory=self.persist_dir,
                embedding_function=self.embeddings,
            )
            collection = db._collection
            results = collection.get(include=["metadatas"])

            # Deduplicate by source filename
            seen_sources = set()
            documents = []
            for metadata in results.get("metadatas", []):
                source = metadata.get("source", "unknown")
                if source not in seen_sources:
                    seen_sources.add(source)
                    documents.append(
                        DocumentInfo(
                            filename=metadata.get("original_name", source),
                            status="complete",
                            file_type=metadata.get("file_type", ""),
                        )
                    )

            return documents
        except Exception:
            return []
