"""
Documents Router — File upload and processing endpoints.
Replaces: main.py L137-219 (document processing tab)
"""

import tempfile
import shutil
from typing import List
from fastapi import APIRouter, UploadFile, File, Query

from backend.config import llm, embeddings, PERSIST_DIR
from backend.models.documents import DocumentInfo
from backend.services.document_service import DocumentService

router = APIRouter()
document_service = DocumentService(llm, embeddings, PERSIST_DIR)


@router.post("/upload", response_model=List[DocumentInfo])
async def upload_documents(
    files: List[UploadFile] = File(...),
    process_type: str = Query("auto", description="auto | research | code | data"),
):
    """
    Upload and process one or more files.
    
    - Saves files temporarily, processes them into Documents
    - Runs analysis (PaperAnalysisAgent or CodeReviewAgent) based on process_type
    - Stores in ChromaDB for RAG retrieval
    
    Source: main.py L159-215
    """
    temp_dir = tempfile.mkdtemp()
    results = []

    try:
        for upload_file in files:
            result = await document_service.process_and_analyze(
                upload_file=upload_file,
                temp_dir=temp_dir,
                process_type=process_type,
            )
            results.append(result)
    finally:
        try:
            shutil.rmtree(temp_dir)
        except OSError:
            pass

    return results


@router.get("/list")
async def list_documents():
    """
    List all processed documents from ChromaDB metadata.
    Used by the Research Library page.
    """
    return await document_service.list_documents()
