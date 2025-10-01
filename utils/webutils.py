"""
Web Utilities Module
-------------------
This module provides functionality for fetching and processing web content.
It includes functions for retrieving webpage content and preparing it for
storage in the vector database.
"""

import requests
from bs4 import BeautifulSoup
from langchain.schema import Document

def fetch_url_content(url: str) -> str:
    """
    Fetches and extracts text content from a webpage.
    
    Args:
        url (str): The URL of the webpage to fetch
        
    Returns:
        str: The extracted text content with newlines as separators
        
    Note:
        Uses BeautifulSoup to parse HTML and extract clean text content
    """
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    return soup.get_text(separator="\n")

def add_url_to_db(url: str, save_fn) -> None:
    """
    Processes a webpage and saves its content to the vector database.
    
    Args:
        url (str): The URL of the webpage to process
        save_fn (callable): Function to save the document to the database
            Expected signature: save_fn(docs: List[Document]) -> None
            
    Returns:
        The result of the save_fn execution
        
    Note:
        Creates a LangChain Document with the webpage content and metadata
    """
    text = fetch_url_content(url)
    docs = [Document(page_content=text, metadata={"source": url})]
    return save_fn(docs)
