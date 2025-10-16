"""
Dobby: Deep Research & Coding Assistant
-------------------------------------
An intelligent research assistant powered by specialized agents for:
- Research paper analysis and literature review
- Code generation and review
- Technical writing and documentation
- Data analysis and visualization
"""

import os
import asyncio
import tempfile
import shutil
import streamlit as st
from langchain_ollama import ChatOllama, OllamaEmbeddings
from agents.research_agents import PaperAnalysisAgent, LiteratureReviewAgent, CitationAgent
from agents.code_agents import CodeGenerationAgent, CodeReviewAgent, DocumentationAgent
from agents.writing_agents import ReportWritingAgent, TechnicalWritingAgent, SummaryAgent
from utils.file_processing import process_uploaded_file, is_text_file

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

# Configure page settings for a cleaner look
st.set_page_config(
    page_title="Dobby Research Assistant",
    page_icon="📚",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Sidebar for navigation and settings
with st.sidebar:
    st.title("🧙‍♂️ Dobby")
    st.subheader("Research Assistant")
    
    # Mode selection in sidebar
    mode = st.selectbox(
        "Choose Work Mode",
        ["Research", "Code", "Writing", "Data Analysis"],
        format_func=lambda x: {
            "Research": "📑 Research",
            "Code": "💻 Code",
            "Writing": "✍️ Writing",
            "Data Analysis": "📊 Data"
        }[x]
    )
    
    # Model settings
    st.subheader("🛠️ Settings")
    selected_model = st.selectbox("Language Model", ["deepseek-coder:16b", "llama2:70b", "mistral:7b"])
    temperature = st.slider("Temperature", 0.0, 1.0, 0.2)

# Initialize session state
if "conversations" not in st.session_state:
    st.session_state.conversations = {"Main": load_conversation(LOG_FILE)}
if "current_conversation" not in st.session_state:
    st.session_state.current_conversation = "Main"
if "active_workspaces" not in st.session_state:
    st.session_state.active_workspaces = {
        "Main": {"mode": "Research", "history": []},
        "Research": {"mode": "Research", "history": []},
        "Code": {"mode": "Code", "history": []},
        "Writing": {"mode": "Writing", "history": []},
        "Data": {"mode": "Data Analysis", "history": []}
    }

# Add New Chat button in sidebar
with st.sidebar:
    st.divider()
    if st.button("🆕 New Chat"):
        # Create new conversation with timestamp
        new_chat_name = f"Chat {len(st.session_state.conversations) + 1}"
        st.session_state.conversations[new_chat_name] = []
        st.session_state.current_conversation = new_chat_name
        st.rerun()
    
    # Conversation selector
    st.sidebar.selectbox(
        "Select Conversation",
        list(st.session_state.conversations.keys()),
        key="conversation_selector",
        on_change=lambda: setattr(st.session_state, "current_conversation", st.session_state.conversation_selector)
    )

# Main title with dynamic icon based on mode
icons = {
    "Research": "📑",
    "Code": "💻",
    "Writing": "✍️",
    "Data Analysis": "📊"
}
st.title(f"{icons[mode]} {mode} Assistant - {st.session_state.current_conversation}")

# Create workspace container
workspace_container = st.container()

# Create parallel workspace tabs
workspace_tabs = st.tabs([
    "🏠 Main Workspace",
    "📑 Research Workspace",
    "💻 Code Workspace",
    "✍️ Writing Workspace",
    "📊 Data Workspace"
])

# Initialize workspace state if not exists
if "active_workspaces" not in st.session_state:
    st.session_state.active_workspaces = {"Main": {"mode": mode, "history": []}}

with workspace_tabs[0]:
    # Create tabs for different functionalities in main workspace
    tab1, tab2, tab3 = st.tabs(["📑 Documents", "💾 Repository", "🌐 Web Content"])

with tab1:
    st.subheader("Document Processing")
    
    # Create columns for upload options
    col1, col2 = st.columns([3, 1])
    
    with col1:
        # Multi-file upload with drag & drop
        uploaded_files = st.file_uploader(
            "Upload Research Papers/Documents/Code",
            type=["pdf", "txt", "docx", "py", "js", "java", "ipynb", "cpp", "h", "cs", "json", "yaml", "xml"],
            accept_multiple_files=True,
            help="Drag and drop multiple files here"
        )
    
    with col2:
        process_type = st.radio(
            "Processing Type",
            ["Auto", "Research", "Code", "Data"],
            help="Choose how to process the uploaded files"
        )

    if uploaded_files:
        # Create a temporary directory for processing
        temp_dir = tempfile.mkdtemp()
        
        try:
            progress = st.progress(0)
            processed_files = []
            
            for idx, uploaded_file in enumerate(uploaded_files):
                # Create a status container for each file
                with st.status(f"Processing {uploaded_file.name}...", expanded=False) as status:
                    try:
                        # Process file using the new utility
                        docs = process_uploaded_file(uploaded_file, temp_dir)
                        
                        # Perform specialized analysis based on file type and process_type
                        if process_type == "Research" or (process_type == "Auto" and uploaded_file.name.endswith(".pdf")):
                            status.update(label="Analyzing research paper...", state="running")
                            paper_agent = PaperAnalysisAgent(llm)
                            analysis = asyncio.run(paper_agent.analyze_paper(docs[0]))
                            
                            # Display analysis in expander
                            with st.expander(f"📑 Analysis: {uploaded_file.name}", expanded=False):
                                st.json(analysis)
                        
                        elif process_type == "Code" or (process_type == "Auto" and is_text_file(uploaded_file.name)):
                            status.update(label="Analyzing code...", state="running")
                            code_agent = CodeReviewAgent(llm)
                            review = asyncio.run(code_agent.review_code(docs[0].page_content))
                            
                            # Display code review in expander
                            with st.expander(f"💻 Review: {uploaded_file.name}", expanded=False):
                                st.json(review)

                        # Save to database with proper metadata
                        save_to_db(docs, embeddings, PERSIST_DIR)
                        processed_files.append(uploaded_file.name)
                        status.update(label=f"✅ Successfully processed {uploaded_file.name}", state="complete")
                        
                    except Exception as e:
                        status.update(label=f"❌ Error processing {uploaded_file.name}: {str(e)}", state="error")
                        st.error(f"Error details: {str(e)}")
                        continue

                progress.progress((idx + 1) / len(uploaded_files))
            
            # Show success message with processed files
            if processed_files:
                st.success(f"Successfully processed {len(processed_files)} files:")
                st.write("- " + "\n- ".join(processed_files))
                
        finally:
            # Clean up temporary directory
            try:
                shutil.rmtree(temp_dir)
            except:
                pass

            # Update progress bar
            progress.progress((idx + 1) / len(uploaded_files))

# Repository tab content
with tab2:
    st.subheader("Repository Analysis")
    repo_col1, repo_col2 = st.columns(2)
    
    with repo_col1:
        repo_path = st.text_input("Path to local repository")
    with repo_col2:
        repo_branch = st.text_input("Branch (optional)", value="main")
    
    if repo_path and os.path.isdir(repo_path):
        with st.status("Processing repository...", expanded=True) as status:
            try:
                # Load and process repository
                docs = load_repo(repo_path)
                
                # Initialize code agents
                code_review_agent = CodeReviewAgent(llm)
                doc_agent = DocumentationAgent(llm)
                
                # Analyze repository
                status.update(label="Analyzing code quality...", state="running")
                code_review = asyncio.run(code_review_agent.review_code("\n".join([d.page_content for d in docs])))
                
                # Save to database
                save_to_db(docs, embeddings, PERSIST_DIR)
                
                # Display results in expandable sections
                with st.expander("📊 Repository Analysis", expanded=True):
                    st.markdown("### Code Quality Score")
                    st.progress(code_review["quality_score"] / 100)
                    
                    st.markdown("### Key Findings")
                    for issue in code_review["issues"]:
                        st.warning(issue)
                    
                    st.markdown("### Suggestions")
                    for suggestion in code_review["suggestions"]:
                        st.info(suggestion)
                
                status.update(label=f"✅ Successfully analyzed repository: {repo_path}", state="complete")
            except Exception as e:
                status.update(label=f"❌ Error processing repository: {str(e)}", state="error")

# Web content tab
with tab3:
    st.subheader("Web Content Integration")
    
    # URL input with validation
    url_input = st.text_input("Enter URL (Research Paper/Documentation/Article)")
    url_type = st.selectbox("Content Type", ["Research Paper", "Documentation", "Article", "Blog Post"])
    
    if url_input:
        with st.status("Processing web content...", expanded=True) as status:
            try:
                # Process and save web content
                add_url_to_db(url_input, lambda docs: save_to_db(docs, embeddings, PERSIST_DIR))
                
                # If it's a research paper, analyze it
                if url_type == "Research Paper":
                    status.update(label="Analyzing research paper...", state="running")
                    paper_agent = PaperAnalysisAgent(llm)
                    analysis = asyncio.run(paper_agent.analyze_paper(docs[0]))
                    
                    with st.expander("📑 Paper Analysis", expanded=True):
                        st.markdown(f"### {analysis['title']}")
                        st.markdown("**Abstract**")
                        st.markdown(analysis['abstract'])
                        st.markdown("**Key Findings**")
                        for finding in analysis['key_findings']:
                            st.markdown(f"- {finding}")
                
                status.update(label=f"✅ Successfully processed URL: {url_input}", state="complete")
            except Exception as e:
                status.update(label=f"❌ Error processing URL: {str(e)}", state="error")

# Workspace-specific chat interfaces
for idx, workspace_type in enumerate(["Main", "Research", "Code", "Writing", "Data"]):
    with workspace_tabs[idx]:
        if workspace_type == "Main":
            continue  # Skip main workspace as it's handled separately
            
        # Initialize workspace if not exists
        if workspace_type not in st.session_state.active_workspaces:
            st.session_state.active_workspaces[workspace_type] = {
                "mode": workspace_type,
                "history": []
            }
        
        # Chat interface for this workspace
        st.divider()
        workspace_chat = st.container()
        
        with workspace_chat:
            # Display workspace-specific chat history
            for msg in st.session_state.active_workspaces[workspace_type]["history"]:
                with st.chat_message(msg[0]):
                    st.markdown(msg[1])
            
            # User input for this workspace
            user_input = st.chat_input(
                f"Ask your {workspace_type.lower()} related question...",
                key=f"chat_input_{workspace_type}"
            )
            
            if user_input:
                # Show user message
                with st.chat_message("user"):
                    st.markdown(user_input)
                
                # Show typing indicator
                with st.chat_message("assistant"):
                    message_placeholder = st.empty()
                    message_placeholder.markdown("🤔 Thinking...")
                    
                    try:
                        # Process based on workspace type
                        if workspace_type == "Research":
                            paper_agent = PaperAnalysisAgent(llm)
                            lit_review_agent = LiteratureReviewAgent(llm)
                            response = asyncio.run(paper_agent.analyze_paper({"query": user_input}))
                            
                        elif workspace_type == "Code":
                            code_gen_agent = CodeGenerationAgent(llm)
                            response = asyncio.run(code_gen_agent.generate_code(user_input))
                            
                        elif workspace_type == "Writing":
                            report_agent = ReportWritingAgent(llm)
                            response = asyncio.run(report_agent.create_report({"query": user_input}))
                            
                        else:  # Data Analysis
                            response = answer_query(user_input, llm, embeddings, PERSIST_DIR)
                        
                        # Update placeholder
                        message_placeholder.markdown(response)
                        
                        # Add to workspace history
                        st.session_state.active_workspaces[workspace_type]["history"].append(
                            ("user", user_input)
                        )
                        st.session_state.active_workspaces[workspace_type]["history"].append(
                            ("assistant", response)
                        )
                        
                    except Exception as e:
                        message_placeholder.error(f"Error: {str(e)}")

# Main workspace chat interface
with workspace_tabs[0]:
    st.divider()
    chat_container = st.container()

    with chat_container:
        # Display chat history
        for msg in st.session_state.conversations[st.session_state.current_conversation]:
            with st.chat_message(msg[0]):
                st.markdown(msg[1])

        # User input
        user_input = st.chat_input(
            f"Ask your {mode.lower()} related question...",
            key=f"chat_input_main_{st.session_state.current_conversation}"
        )
        
        if user_input:
            # Show user message
            with st.chat_message("user"):
                st.markdown(user_input)
            
            # Show typing indicator
            with st.chat_message("assistant"):
                message_placeholder = st.empty()
                message_placeholder.markdown("🤔 Thinking...")
                
                try:
                    if mode == "Research":
                        paper_agent = PaperAnalysisAgent(llm)
                        lit_review_agent = LiteratureReviewAgent(llm)
                        response = asyncio.run(paper_agent.analyze_paper({"query": user_input}))
                        
                    elif mode == "Code":
                        code_gen_agent = CodeGenerationAgent(llm)
                        if "generate" in user_input.lower() or "create" in user_input.lower():
                            response = asyncio.run(code_gen_agent.generate_code(user_input))
                        else:
                            response, fname = apply_code_change(user_input, llm, embeddings, PERSIST_DIR, CODE_DIR)
                            response = f"Code changes saved to {fname}\n\n{response}"
                    
                    elif mode == "Writing":
                        report_agent = ReportWritingAgent(llm)
                        response = asyncio.run(report_agent.create_report({"query": user_input}))
                    
                    else:  # Data Analysis
                        response = answer_query(user_input, llm, embeddings, PERSIST_DIR)
                    
                    # Update placeholder
                    message_placeholder.markdown(response)
                    
                    # Add to conversation history
                    st.session_state.conversations[st.session_state.current_conversation].append(
                        ("user", user_input)
                    )
                    st.session_state.conversations[st.session_state.current_conversation].append(
                        ("assistant", response)
                    )
                    
                    # Save conversation
                    save_conversation(
                        st.session_state.conversations[st.session_state.current_conversation],
                        LOG_FILE
                    )
                    
                except Exception as e:
                    message_placeholder.error(f"Error: {str(e)}")
        # Show user message
        with st.chat_message("user"):
            st.markdown(user_input)
        
        # Show typing indicator
        with st.chat_message("assistant"):
            message_placeholder = st.empty()
            message_placeholder.markdown("🤔 Thinking...")
            
            try:
                if mode == "Research":
                    # Use research agents
                    paper_agent = PaperAnalysisAgent(llm)
                    lit_review_agent = LiteratureReviewAgent(llm)
                    citation_agent = CitationAgent(llm)
                    
                    response = answer_query(user_input, llm, embeddings, PERSIST_DIR)
                    
                elif mode == "Code":
                    # Use code agents
                    code_gen_agent = CodeGenerationAgent(llm)
                    code_review_agent = CodeReviewAgent(llm)
                    
                    if "generate" in user_input.lower() or "create" in user_input.lower():
                        response = asyncio.run(code_gen_agent.generate_code(user_input))
                    else:
                        response, fname = apply_code_change(user_input, llm, embeddings, PERSIST_DIR, CODE_DIR)
                        response = f"Code changes saved to {fname}\n\n{response}"
                
                elif mode == "Writing":
                    # Use writing agents
                    report_agent = ReportWritingAgent(llm)
                    tech_writing_agent = TechnicalWritingAgent(llm)
                    summary_agent = SummaryAgent(llm)
                    
                    if "summarize" in user_input.lower():
                        response = asyncio.run(summary_agent.create_summary(user_input))
                    else:
                        response = asyncio.run(report_agent.create_report({"query": user_input}))
                
                else:  # Data Analysis
                    response = answer_query(user_input, llm, embeddings, PERSIST_DIR)
                
                # Update placeholder with response
                message_placeholder.markdown(response)
                
                # Add to conversation history
                current_conv = st.session_state.conversations[st.session_state.current_conversation]
                current_conv.append(("user", user_input))
                current_conv.append(("assistant", response))
                
                # Save conversation
                save_conversation(current_conv, LOG_FILE)
                
            except Exception as e:
                message_placeholder.error(f"Error: {str(e)}")

# No need for additional conversation history display as it's already shown in the chat container
