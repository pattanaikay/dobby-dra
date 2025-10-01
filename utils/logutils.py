"""
Logging Utilities Module
----------------------
This module handles conversation history persistence and code change logging.
It provides functions to save and load chat histories and store generated code
changes with their associated queries.
"""

import os
import json
from datetime import datetime

def save_conversation(history: list, log_file: str) -> None:
    """
    Saves the conversation history to a JSON file.
    
    Args:
        history (list): List of tuples containing (role, message) pairs
        log_file (str): Path to the file where history should be saved
        
    Note:
        The history is saved with pretty printing (indent=2) for readability
    """
    with open(log_file, "w") as f:
        json.dump(history, f, indent=2)

def load_conversation(log_file: str) -> list:
    """
    Loads the conversation history from a JSON file.
    
    Args:
        log_file (str): Path to the conversation history file
        
    Returns:
        list: The conversation history as a list of (role, message) tuples.
              Returns empty list if file doesn't exist.
    """
    try:
        with open(log_file, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def log_code_change(query: str, response: str, code_dir: str) -> str:
    """
    Saves generated code changes to a timestamped file.
    
    Args:
        query (str): The user query that triggered the code change
        response (str): The generated code or changes
        code_dir (str): Directory where code changes should be saved
        
    Returns:
        str: The path to the created file
        
    Note:
        Creates the code directory if it doesn't exist.
        Files are named with timestamp format: YYYYMMDD_HHMMSS.py
    """
    os.makedirs(code_dir, exist_ok=True)
    fname = f"{code_dir}/{datetime.now().strftime('%Y%m%d_%H%M%S')}.py"
    with open(fname, "w") as f:
        f.write(f"# Query: {query}\n\n{response}")
    return fname
