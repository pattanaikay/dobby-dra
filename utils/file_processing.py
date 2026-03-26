"""
File processing utilities for the research agent.
"""
import os
import tempfile
from typing import List, Optional
from pathlib import Path
from langchain_core.documents import Document
from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    UnstructuredWordDocumentLoader,
    UnstructuredFileLoader
)

def process_uploaded_file(
    file,
    temp_dir: Optional[str] = None
) -> List[Document]:
    """
    Process an uploaded file and return a list of documents.
    
    Args:
        file: The uploaded file object from Streamlit
        temp_dir: Optional temporary directory to save the file
    
    Returns:
        List[Document]: List of processed documents
    """
    if temp_dir is None:
        temp_dir = tempfile.mkdtemp()
    
    # Create safe filename
    safe_filename = "".join(c for c in file.name if c.isalnum() or c in (' ', '-', '_', '.'))
    file_path = os.path.join(temp_dir, safe_filename)
    
    # Save uploaded file
    with open(file_path, "wb") as f:
        f.write(file.getbuffer())
    
    try:
        # Process based on file type
        if file.name.lower().endswith('.pdf'):
            loader = PyPDFLoader(file_path)
        elif file.name.lower().endswith('.txt'):
            loader = TextLoader(file_path)
        elif file.name.lower().endswith(('.docx', '.doc')):
            loader = UnstructuredWordDocumentLoader(file_path)
        elif file.name.lower().endswith(('.py', '.js', '.java', '.cpp', '.h', '.cs')):
            loader = TextLoader(file_path)
        else:
            # Try unstructured loader for other file types
            loader = UnstructuredFileLoader(file_path)
        
        documents = loader.load()
        
        # Add metadata
        for doc in documents:
            doc.metadata.update({
                "source": file.name,
                "file_path": file_path,
                "file_type": Path(file.name).suffix[1:],
                "original_name": file.name
            })
        
        return documents
    
    except Exception as e:
        raise Exception(f"Error processing file {file.name}: {str(e)}")
    
    finally:
        # Clean up temporary file
        try:
            os.remove(file_path)
        except:
            pass

def is_text_file(filename: str) -> bool:
    """Check if a file is a text file based on its extension."""
    text_extensions = {
        '.txt', '.py', '.js', '.java', '.cpp', '.h', '.cs', '.html',
        '.css', '.json', '.xml', '.yaml', '.yml', '.md', '.rst'
    }
    return Path(filename).suffix.lower() in text_extensions