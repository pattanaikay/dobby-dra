# Backend Implementation Prompt

> **Use this prompt to instruct an AI coding assistant to build the FastAPI backend from scratch.**

---

## Prompt

You are building the **backend** for "Synthetica Research" — an intelligent deep research and coding assistant. The backend is a **FastAPI** application that serves as the API layer between a Next.js frontend and the existing Python/LangChain agent system.

### Project Context
This is a migration from a monolithic Streamlit app. The existing **business logic is already written** in Python and must be reused as-is. Your job is to wrap it in FastAPI endpoints with proper request/response models, SSE streaming, and CORS support.

### Existing Code You Must Integrate

#### 1. Agent Classes (DO NOT MODIFY — use as-is)

**`agents/research_agents.py`** — 3 classes:
- `PaperAnalysisAgent(llm)` → `async analyze_paper(paper: Document) -> Dict` — Extracts title, abstract, key_findings, methodology, conclusions
- `LiteratureReviewAgent(llm)` → `async create_literature_review(papers) -> Dict` — Generates overview, themes, gaps, future_work
- `CitationAgent(llm)` → `format_citation(paper, style="APA") -> str`, `generate_bibliography(papers, style) -> str`

**`agents/code_agents.py`** — 3 classes:
- `CodeGenerationAgent(llm)` → `async generate_code(requirements, context=None) -> str`
- `CodeReviewAgent(llm)` → `async review_code(code) -> Dict` — Returns quality_score, issues, suggestions, security_concerns
- `DocumentationAgent(llm)` → `async generate_docs(code, style="Google") -> str`, `async generate_readme(project_path) -> str`

**`agents/writing_agents.py`** — 3 classes:
- `ReportWritingAgent(llm)` → `async create_report(research_data, template="academic") -> str`
- `TechnicalWritingAgent(llm)` → `async create_technical_doc(content, doc_type) -> str`, `async create_api_docs(code) -> str`
- `SummaryAgent(llm)` → `async summarize_paper(paper) -> Dict` — Returns brief, detailed, key_points

#### 2. Utility Modules (DO NOT MODIFY — use as-is)

**`utils/dbutils.py`**:
- `save_to_db(docs: list, embeddings, persist_dir: str)` — Chunks documents (500 chars, 50 overlap) and saves to ChromaDB
- `query_db(query: str, embeddings, persist_dir: str) -> list` — Returns top 3 similar documents using cosine similarity

**`utils/fileutils.py`**:
- `load_pdf(path) -> list` — PyPDFLoader
- `load_doc(path) -> list` — UnstructuredFileLoader
- `load_code(path) -> list` — TextLoader (UTF-8)
- `load_repo(path) -> list` — Recursively loads .py, .js, .java, .ts, .cpp files

**`utils/webutils.py`**:
- `fetch_url_content(url) -> str` — BeautifulSoup HTML → text
- `add_url_to_db(url, save_fn) -> None` — Fetches URL, wraps in Document, calls save_fn

**`utils/logutils.py`**:
- `save_conversation(history: list, log_file: str)` — JSON dump
- `load_conversation(log_file: str) -> list` — JSON load (returns [] if missing)
- `log_code_change(query, response, code_dir) -> str` — Saves timestamped .py file, returns path

**`utils/file_processing.py`**:
- `process_uploaded_file(file, temp_dir) -> List[Document]` — Handles PDF, TXT, DOCX, code files
- `is_text_file(filename) -> bool` — Extension check

> **IMPORTANT:** `process_uploaded_file()` currently uses `file.getbuffer()` (Streamlit UploadedFile). You must create an adapter for FastAPI's `UploadFile` that writes `await file.read()` to a temp file, then creates a compatible wrapper object.

#### 3. Core Agent Functions (`agentutils.py`)
- `answer_query(query, llm, embeddings, persist_dir) -> str` — Queries DB for context, builds prompt, calls `llm.invoke(prompt).content`
- `apply_code_change(query, llm, embeddings, persist_dir, code_dir) -> (response, fname)` — Similar, but saves result as code file

### Configuration
```python
MODEL = "deepseek-coder-v2:16b"
PERSIST_DIR = "./research_db"        # ChromaDB storage
LOG_FILE = "conversations.json"
CODE_DIR = "./code_changes"

llm = ChatOllama(model=MODEL, temperature=0)
embeddings = OllamaEmbeddings(model="nomic-embed-text")
```

---

### What You Must Build

#### A. `backend/main.py` — FastAPI App
- Create FastAPI app with CORS middleware (allow `http://localhost:3000`)
- Include all routers
- Startup event: Initialize LLM and embeddings as app state

#### B. `routers/chat.py` — Chat Endpoints
1. **`POST /api/chat/query`** — Accept: `{ query: str, mode: str, conversation_id: str }`. Return SSE stream of tokens.
   - Mode determines which agent to use: "research" → PaperAnalysisAgent, "code" → CodeGenerationAgent, "writing" → ReportWritingAgent, "data" → answer_query
   - Stream tokens using `llm.astream(prompt)` wrapped in SSE format: `data: {"type": "token", "content": "..."}\n\n`
   - First event: `data: {"type": "thinking"}\n\n`
   - Final event: `data: {"type": "done", "full_response": "..."}\n\n`
   - Save to conversation history after completion

2. **`POST /api/chat/code`** — Accept: `{ query: str, conversation_id: str }`. Uses `apply_code_change()`. Returns `{ response: str, file_path: str }`.

#### C. `routers/documents.py` — File Upload
1. **`POST /api/documents/upload`** — Accept: `UploadFile` (multipart). Query param: `process_type: str` (auto/research/code/data).
   - Save to temp dir, process with `process_uploaded_file()` adapter
   - Run analysis based on process_type (PaperAnalysisAgent or CodeReviewAgent)
   - Save to DB with `save_to_db()`
   - Return: `{ filename: str, status: str, analysis?: Dict }`

2. **`GET /api/documents/list`** — Return list of all processed documents from ChromaDB metadata.

#### D. `routers/repositories.py`
1. **`POST /api/repositories/analyze`** — Accept: `{ path: str, branch?: str }`. Uses `load_repo()` + `CodeReviewAgent.review_code()`. Streams results via SSE.

#### E. `routers/web_content.py`
1. **`POST /api/web/process`** — Accept: `{ url: str, content_type: str }`. Uses `add_url_to_db()`. If research paper, also runs `PaperAnalysisAgent`.

#### F. `routers/conversations.py`
1. **`GET /api/conversations`** — List all conversations
2. **`GET /api/conversations/{id}`** — Get specific conversation history
3. **`POST /api/conversations`** — Create new conversation
4. **`PUT /api/conversations/{id}`** — Update conversation history

#### G. `routers/graph.py` — Knowledge Graph
1. **`GET /api/graph/{session_id}`** — Return `{ nodes: [{id, label, type, ...}], edges: [{source, target, label}] }` built from research entities in the session.
2. **`POST /api/graph/expand`** — Accept: `{ node_id: str, session_id: str }`. Query DB for related concepts, use LLM to extract entity relationships, return new nodes/edges.

#### H. `services/discovery_service.py`
1. **`GET /api/discovery/topics`** — Return 2 random distinct research topics from the DB's document collection. Each topic includes: `{ title, description, color, image_url? }`.

---

### Pydantic Models to Define

```python
class ChatRequest(BaseModel):
    query: str
    mode: str  # "research" | "code" | "writing" | "data"
    conversation_id: str

class CodeRequest(BaseModel):
    query: str
    conversation_id: str

class WebContentRequest(BaseModel):
    url: str
    content_type: str  # "research_paper" | "documentation" | "article" | "blog"

class RepoAnalysisRequest(BaseModel):
    path: str
    branch: str = "main"

class GraphNode(BaseModel):
    id: str
    label: str
    type: str  # "concept" | "paper" | "author" | "method"
    metadata: dict = {}

class GraphEdge(BaseModel):
    source: str
    target: str
    label: str  # "cites" | "uses" | "related_to" | "authored_by"

class GraphExpandRequest(BaseModel):
    node_id: str
    session_id: str

class GraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]
```

---

### Testing Plan
1. Start Ollama with required models
2. Run `uvicorn backend.main:app --reload --port 8000`
3. Test each endpoint with `curl` or the FastAPI auto-docs at `/docs`
4. Test SSE streaming with: `curl -N http://localhost:8000/api/chat/query -d '...'`
5. Verify ChromaDB persistence at `./research_db/`
