"""
Database Utilities Module
-----------------------
This module handles interactions with the vector database (Chroma DB).
It provides functions for storing and retrieving documents using
vector embeddings for semantic similarity search.
"""

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from typing import List, Optional
from langchain_core.documents import Document

# Global cache for Chroma instance to avoid re-initializing
_DB_INSTANCE: Optional[Chroma] = None

def get_db(embeddings, persist_dir: str) -> Chroma:
    """Get or initialize the Chroma DB singleton."""
    global _DB_INSTANCE
    if _DB_INSTANCE is None:
        _DB_INSTANCE = Chroma(
            persist_directory=persist_dir, 
            embedding_function=embeddings
        )
    return _DB_INSTANCE

def save_to_db(docs: List[Document], embeddings, persist_dir: str):
    """
    Saves documents to the vector database after chunking them.
    """
    global _DB_INSTANCE
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)
    
    # from_documents initializes a NEW collection usually, 
    # but we want to add to the existing one if it exists.
    if _DB_INSTANCE is None:
        _DB_INSTANCE = Chroma.from_documents(
            chunks, 
            embeddings, 
            persist_directory=persist_dir
        )
    else:
        _DB_INSTANCE.add_documents(chunks)
    
    return _DB_INSTANCE

def query_db(query: str, embeddings, persist_dir: str, k: int = 3) -> List[Document]:
    """
    Queries the vector database for similar documents.
    """
    db = get_db(embeddings, persist_dir)
    return db.similarity_search(query, k=k)
