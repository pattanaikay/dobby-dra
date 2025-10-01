"""
Deep Research & Coding Agent
---------------------------
This is a Streamlit application that serves as an intelligent research and coding assistant.
It can process various document types (PDF, Doc, Code), ingest repositories, and handle web content.
The agent uses LangChain with Ollama for processing and responding to queries.
"""

import os
import streamlit as st
from langchain_ollama import ChatOllama, OllamaEmbeddings

# Import utility functions for file operations, web handling, logging, and database management
from utils.fileutils import load_code, load_doc, load_pdf, load_repo  # File handling utilities
from utils.webutils import add_url_to_db                              # Web content processing
from utils.logutils import save_conversation, load_conversation, log_code_change  # Conversation logging
from utils.dbutils import save_to_db, query_db                        # Database operations
from agentutils import answer_query, apply_code_change                # Core agent functionalities

# -----------------------------
# Configuration Settings
# -----------------------------
# Model configuration for code generation and embeddings
MODEL = "deepseek-coder-v2:16b"      # Main language model for code generation and chat
PERSIST_DIR = "./research_db"         # Directory for storing vectorized documents
LOG_FILE = "conversations.json"       # File to store conversation history
CODE_DIR = "./code_changes"          # Directory for storing generated code changes

# Initialize LangChain components
llm = ChatOllama(model=MODEL, temperature=0)  # Zero temperature for deterministic outputs
embeddings = OllamaEmbeddings(model="nomic-embed-text")  # Model for text embeddings

# -----------------------------
# Streamlit User Interface
# -----------------------------
st.title("📚 Deep Research & Coding Agent")

# Initialize or load conversation history from session state
if "history" not in st.session_state:
    st.session_state.history = load_conversation(LOG_FILE)

# File Upload Section
# Supports multiple file types: PDF, text files, documents, and code files
uploaded_file = st.file_uploader("Upload PDF/Doc/Code", type=["pdf", "txt", "docx", "py", "js", "java"])
if uploaded_file:
    # Save the uploaded file temporarily
    with open(uploaded_file.name, "wb") as f:
        f.write(uploaded_file.getbuffer())

    # Process different file types using appropriate loaders
    if uploaded_file.name.endswith(".pdf"):
        docs = load_pdf(uploaded_file.name)  # Process PDF files
    elif uploaded_file.name.endswith((".txt", ".docx")):
        docs = load_doc(uploaded_file.name)  # Process text and Word documents
    else:
        docs = load_code(uploaded_file.name)  # Process source code files

    # Save processed documents to vector database
    save_to_db(docs, embeddings, PERSIST_DIR)
    st.success(f"Added {uploaded_file.name} to research DB ✅")

# Repository Ingestion Section
# Allows users to add entire code repositories for analysis
repo_path = st.text_input("Path to local repo")
if repo_path and os.path.isdir(repo_path):
    docs = load_repo(repo_path)  # Process all files in the repository
    save_to_db(docs, embeddings, PERSIST_DIR)  # Save to vector database
    st.success(f"Ingested repo {repo_path} ✅")

# URL Content Ingestion Section
# Allows users to add web content to the knowledge base
url_input = st.text_input("Paste a URL")
if url_input:
    # Process and save web content to the database
    add_url_to_db(url_input, lambda docs: save_to_db(docs, embeddings, PERSIST_DIR))
    st.success(f"Fetched {url_input} ✅")

# Mode Selection
# Toggle between chat mode for queries and code editing mode for code generation/modification
mode = st.radio("Choose Mode", ["Chat", "Code Editing"])

# User Input and Response Section
user_input = st.chat_input("Ask your question or code request...")
if user_input:
    if mode == "Chat":
        # Process general queries using the research database
        response = answer_query(user_input, llm, embeddings, PERSIST_DIR)
        # Add interaction to conversation history
        st.session_state.history.append(("user", user_input))
        st.session_state.history.append(("assistant", response))
    else:
        # Generate or modify code based on user request
        response, fname = apply_code_change(user_input, llm, embeddings, PERSIST_DIR, CODE_DIR)
        # Add code changes to conversation history
        st.session_state.history.append(("user", user_input))
        st.session_state.history.append(("assistant", f"Code changes saved to {fname}\n\n{response}"))

    # Persist conversation history to file
    save_conversation(st.session_state.history, LOG_FILE)

# Conversation History Display
for role, msg in st.session_state.history:
    st.chat_message(role).write(msg)
