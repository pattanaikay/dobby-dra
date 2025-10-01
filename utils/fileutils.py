"""
File Utilities Module
-------------------
This module provides functions for loading different types of files into
LangChain Document format. It supports PDFs, general documents, code files,
and entire code repositories.
"""

import os
from langchain_community.document_loaders import PyPDFLoader, UnstructuredFileLoader, TextLoader

def load_pdf(path: str) -> list:
    """
    Loads a PDF file and converts it to LangChain Documents.
    
    Args:
        path (str): Path to the PDF file
        
    Returns:
        list: List of LangChain Document objects, one per page
    """
    return PyPDFLoader(path).load()

def load_doc(path: str) -> list:
    """
    Loads a general document file (txt, docx, etc.) into LangChain Documents.
    
    Args:
        path (str): Path to the document file
        
    Returns:
        list: List of LangChain Document objects
        
    Note:
        Uses UnstructuredFileLoader which supports multiple document formats
    """
    return UnstructuredFileLoader(path).load()

def load_code(path: str) -> list:
    """
    Loads a source code file into LangChain Documents.
    
    Args:
        path (str): Path to the code file
        
    Returns:
        list: List of LangChain Document objects
        
    Note:
        Uses UTF-8 encoding to properly handle source code files
    """
    return TextLoader(path, encoding="utf-8").load()

def load_repo(path: str) -> list:
    """
    Recursively loads all supported code files from a repository.
    
    Args:
        path (str): Path to the repository root directory
        
    Returns:
        list: List of LangChain Document objects for all code files
        
    Note:
        Supported extensions: .py, .js, .java, .ts, .cpp
        Walks through all subdirectories to find code files
    """
    docs = []
    for root, _, files in os.walk(path):
        for file in files:
            if file.endswith((".py", ".js", ".java", ".ts", ".cpp")):
                docs.extend(load_code(os.path.join(root, file)))
    return docs
