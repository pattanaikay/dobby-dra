"""
Database Utilities Module
-----------------------
This module handles interactions with the vector database (Chroma DB).
It provides functions for storing and retrieving documents using
vector embeddings for semantic similarity search.
"""

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma

def save_to_db(docs: list, embeddings, persist_dir: str):
    """
    Saves documents to the vector database after chunking them.
    
    Args:
        docs (list): List of LangChain Document objects to save
        embeddings: Embedding model to convert text to vectors
        persist_dir (str): Directory to store the vector database
        
    Returns:
        Chroma: The Chroma DB instance
        
    Note:
        - Chunks documents into 500-character pieces with 50-char overlap
        - Persists the database to disk after adding documents
    """
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)
    db = Chroma.from_documents(chunks, embeddings, persist_directory=persist_dir)
    db.persist()
    return db

def query_db(query: str, embeddings, persist_dir: str) -> list:
    """
    Queries the vector database for similar documents.
    
    Args:
        query (str): The query text to search for
        embeddings: Embedding model to convert query to vector
        persist_dir (str): Directory where the vector database is stored
        
    Returns:
        list: Top 3 most similar documents from the database
        
    Note:
        Uses cosine similarity to find the most relevant documents
    """
    db = Chroma(persist_directory=persist_dir, embedding_function=embeddings)
    return db.similarity_search(query, k=3)
