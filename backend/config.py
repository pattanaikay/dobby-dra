"""
Synthetica Research — Backend Configuration
-------------------------------------------
Centralized configuration for LLM, embeddings, and storage paths.
"""

import os
from dotenv import load_dotenv
from langchain_ollama import ChatOllama, OllamaEmbeddings

load_dotenv()

# ─── Model Configuration ───
MODEL = os.getenv("LLM_MODEL", "deepseek-coder-v2:16b")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "nomic-embed-text")
TEMPERATURE = float(os.getenv("LLM_TEMPERATURE", "0"))

# ─── Storage Paths ───
PERSIST_DIR = os.getenv("PERSIST_DIR", "./research_db")
LOG_FILE = os.getenv("LOG_FILE", "./conversations.json")
CODE_DIR = os.getenv("CODE_DIR", "./code_changes")

# ─── LLM & Embeddings Singletons ───
llm = ChatOllama(model=MODEL, temperature=TEMPERATURE)
embeddings = OllamaEmbeddings(model=EMBEDDING_MODEL)

# ─── Server Configuration ───
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
