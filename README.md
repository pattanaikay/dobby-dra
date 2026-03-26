# Dobby - Deep Research & Coding Assistant 🧙‍♂️

Synthetica Research (formerly Dobby) is an intelligent research and coding assistant powered by specialized agents for research paper analysis, code generation, technical writing, and data analysis. The project is being migrated from a Streamlit monolith to a modern **Next.js + FastAPI** architecture, leveraging the deepseek-coder-v2:16b model via Ollama.

## Features

- **Specialized Agents**
  - Research Agents: Paper analysis, literature review, citation management
  - Code Agents: Code generation, review, documentation
  - Writing Agents: Report creation, technical documentation, summarization
  - Data Analysis Agents: Data processing and visualization

- **Multi-Format Document Processing**
  - PDF documents and research papers
  - Text and Word documents (.txt, .docx)
  - Source code files (.py, .js, .java, .ts, .cpp, etc.)
  - Web content and URLs
  - Complete code repositories

- **Multiple Workspace Modes**
  - Research Workspace: Literature analysis and paper review
  - Code Workspace: Code generation and modification
  - Writing Workspace: Documentation and report creation
  - Data Analysis Workspace: Data processing tools
  - Main Workspace: Integrated environment for all tasks

- **Smart Context Management**
  - Vector database storage with efficient retrieval
  - Conversation history tracking per workspace
  - Persistent code change logging
  - Intelligent context switching between workspaces

- **Knowledge Graph**
  - Interactive node/edge mapping of research concepts
  - Dynamic entity extraction and relationship discovery
  - Visual exploration of connected topics

- **Deep Dive Discovery**
  - Randomized topic exploration to spark new research directions
  - Themed research sessions with smooth transitions

## Technical Stack

- **Frontend** (Next.js — in development)
  - [Next.js](https://nextjs.org/) 16 (App Router) — React framework with SSR/SSG
  - [Tailwind CSS](https://tailwindcss.com/) 4 — Utility-first styling
  - [TypeScript](https://www.typescriptlang.org/) — Type-safe development
  - Planned: Shadcn UI, Framer Motion, React Flow, TanStack Query

- **Backend** (FastAPI — in development)
  - [FastAPI](https://fastapi.tiangolo.com/) — Async Python API server
  - [LangChain](https://www.langchain.com/) — LLM framework & agent system
  - [Ollama](https://ollama.ai/) — Local model integration
  - [ChromaDB](https://www.trychroma.com/) — Vector storage & semantic search

- **Legacy Frontend** (Streamlit — being replaced)
  - [Streamlit](https://streamlit.io/) — Interactive multi-workspace UI

- **Supporting Libraries**
  - [BeautifulSoup4](https://www.crummy.com/software/BeautifulSoup/) — Web content processing
  - [PyPDF](https://pypi.org/project/pypdf/) — PDF processing
  - [DuckDuckGo-Search](https://pypi.org/project/duckduckgo-search/) — Web search integration

- **Models & Embeddings**
  - deepseek-coder-v2:16b — Main language model for code and analysis
  - nomic-embed-text — Text embeddings for semantic search

- **Agent Framework**
  - Research Agents: PaperAnalysisAgent, LiteratureReviewAgent, CitationAgent
  - Code Agents: CodeGenerationAgent, CodeReviewAgent, DocumentationAgent
  - Writing Agents: ReportWritingAgent, TechnicalWritingAgent, SummaryAgent

## Project Structure

```
.
├── main.py                    # Legacy Streamlit application
├── agentutils.py              # Core agent functionality and utilities
├── requirements.txt           # Legacy dependencies
│
├── frontend/                  # Next.js frontend (in development)
│   ├── src/app/               # App Router pages & layouts
│   ├── package.json           # Frontend dependencies
│   ├── next.config.ts         # Next.js configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── postcss.config.mjs     # PostCSS / Tailwind config
│
├── backend/                   # FastAPI backend (in development)
│   ├── main.py                # FastAPI application entry point
│   ├── config.py              # Centralized LLM, embedding & storage config
│   ├── requirements.txt       # Backend dependencies
│   ├── routers/               # API route handlers
│   │   ├── chat.py            # Chat / conversation endpoints
│   │   ├── conversations.py   # Conversation history endpoints
│   │   ├── discovery.py       # Deep Dive Discovery endpoints
│   │   ├── documents.py       # Document upload & processing endpoints
│   │   ├── graph.py           # Knowledge Graph endpoints
│   │   ├── repositories.py    # Repository analysis endpoints
│   │   └── web_content.py     # Web content processing endpoints
│   ├── services/              # Business logic layer
│   │   ├── agent_service.py   # Agent orchestration
│   │   ├── discovery_service.py # Discovery topic generation
│   │   ├── document_service.py  # Document processing pipeline
│   │   └── graph_service.py   # Knowledge graph operations
│   └── models/                # Pydantic request/response models
│       ├── chat.py
│       ├── documents.py
│       └── graph.py
│
├── agents/                    # Specialized agent implementations
│   ├── research_agents.py     # Research paper analysis agents
│   ├── code_agents.py         # Code generation and review agents
│   └── writing_agents.py      # Documentation and report agents
│
├── utils/                     # Utility modules
│   ├── dbutils.py             # Vector database operations
│   ├── fileutils.py           # File handling utilities
│   ├── logutils.py            # Logging and history management
│   ├── file_processing.py     # File processing and analysis
│   └── webutils.py            # Web content processing
│
├── research_db/               # Vector database storage
├── code_changes/              # Generated code modifications
├── conversations.json         # Workspace-specific conversation history
└── Design.md                  # UI/UX design system & implementation roadmap
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/pattanaikay/dobby-dra.git
cd dobby-dra
```

2. Install Ollama and required models:
```bash
# Install Ollama (follow instructions at https://ollama.ai/)
ollama pull deepseek-coder-v2:16b
ollama pull nomic-embed-text
```

### Backend Setup

3. Create a virtual environment and install backend dependencies:
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### Frontend Setup

4. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Usage

### Running the New Stack (In Development)

1. Start the FastAPI backend:
```bash
cd backend
uvicorn main:app --reload
```

2. Start the Next.js frontend:
```bash
cd frontend
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running the Legacy Streamlit App

```bash
pip install -r requirements.txt
streamlit run main.py
```

## Features in Detail

### Research Capabilities
- Advanced paper analysis with key findings extraction
- Literature review generation
- Citation management in multiple formats
- Research gap identification
- Automatic paper summarization

### Code Processing
- Intelligent code generation and modification
- Automated code review and quality assessment
- Documentation generation (Google style, JSDoc, etc.)
- Repository analysis and structure understanding
- Security concern identification

### Technical Writing
- Report generation in multiple formats
- Technical documentation creation
- API documentation generation
- Executive summary creation
- Documentation formatting and style consistency

### Document Processing
- PDF files processed with page-level granularity
- Code files parsed with language-specific handling
- Web content cleaned and structured using BeautifulSoup
- Repositories scanned recursively with file type detection
- Multi-format support for various document types

### Vector Storage & Retrieval
- Documents chunked into 500-character segments with 50-character overlap
- Efficient similarity search using ChromaDB
- Persistent storage for long-term knowledge retention
- Semantic search capabilities using embeddings

### Knowledge Graph
- Interactive concept mapping with node/edge visualization
- Entity extraction powered by LangChain
- Dynamic graph expansion on node selection
- Floating toolbar for graph manipulation (fit, zoom, undo/redo)

### Workspace Management
- Independent conversation tracking per workspace
- Context-aware responses based on workspace type
- Seamless switching between workspaces
- Persistent history across sessions
- Timestamped code change logging

## Contributing

Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests with improvements
- Share feedback on model performance

## Licenses

### Project License
```
MIT License

Copyright (c) 2025 Synthetica Research (formerly Dobby)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Dependencies Licenses
This project uses several open-source packages distributed under their own licenses:

- **Next.js** — MIT License
- **Tailwind CSS** — MIT License
- **FastAPI** — MIT License
- **Streamlit** — Apache 2.0 License
- **LangChain** — MIT License
- **Ollama** — MIT License
- **ChromaDB** — Apache 2.0 License
- **BeautifulSoup4** — MIT License
- **PyPDF** — BSD License
- **DuckDuckGo-Search** — BSD License
- **Requests** — Apache 2.0 License

---