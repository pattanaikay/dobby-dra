# Dobby - Deep Research & Coding Assistant 🧙‍♂️

Dobby is an intelligent research and coding assistant powered by specialized agents for research paper analysis, code generation, technical writing, and data analysis. Built with Streamlit and LangChain, it leverages the powerful deepseek-coder-v2:16b model to provide comprehensive assistance across multiple domains.

## Features 📚

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

## Technical Stack 🛠️

- **Core Components**
  - [Streamlit](https://streamlit.io/) - Interactive multi-workspace UI
  - [LangChain](https://www.langchain.com/) - LLM Framework & Agent System
  - [Ollama](https://ollama.ai/) - Local Model Integration
  - [Chroma DB](https://www.trychroma.com/) - Vector Storage
  - [BeautifulSoup4](https://www.crummy.com/software/BeautifulSoup/) - Web Content Processing
  - [PyPDF](https://pypi.org/project/pypdf/) - PDF Processing
  - [DuckDuckGo-Search](https://pypi.org/project/duckduckgo-search/) - Web Search Integration

- **Models & Embeddings**
  - deepseek-coder-v2:16b - Main language model for code and analysis
  - nomic-embed-text - Text embeddings for semantic search
  
- **Agent Framework**
  - Research Agents: PaperAnalysisAgent, LiteratureReviewAgent, CitationAgent
  - Code Agents: CodeGenerationAgent, CodeReviewAgent, DocumentationAgent
  - Writing Agents: ReportWritingAgent, TechnicalWritingAgent, SummaryAgent

## Project Structure 📁

```
.
├── main.py                 # Main Streamlit application with workspace management
├── agentutils.py          # Core agent functionality and utilities
├── requirements.txt       # Project dependencies
├── agents/               # Specialized agent implementations
│   ├── research_agents.py  # Research paper analysis agents
│   ├── code_agents.py     # Code generation and review agents
│   └── writing_agents.py  # Documentation and report agents
├── utils/                # Utility modules
│   ├── dbutils.py        # Vector database operations
│   ├── fileutils.py      # File handling utilities
│   ├── logutils.py       # Logging and history management
│   ├── file_processing.py # File processing and analysis
│   └── webutils.py       # Web content processing
├── research_db/          # Vector database storage
├── code_changes/         # Generated code modifications
└── conversations.json    # Workspace-specific conversation history
```

## Installation 🚀

1. Clone the repository:
\`\`\`bash
git clone [your-repo-url]
cd [your-repo-name]
\`\`\`

2. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Install Ollama and required models:
\`\`\`bash
# Install Ollama (follow instructions at https://ollama.ai/)
ollama pull deepseek-coder-v2:16b
ollama pull nomic-embed-text
\`\`\`

## Usage 💡

1. Start the application:
\`\`\`bash
streamlit run main.py
\`\`\`

2. Choose your workspace:
   - 🏠 Main Workspace: Integrated environment for all tasks
   - 📑 Research Workspace: Paper analysis and literature review
   - 💻 Code Workspace: Code generation and review
   - ✍️ Writing Workspace: Documentation and report creation
   - 📊 Data Workspace: Data analysis and visualization

3. Use the interface features:
   - Upload and analyze documents (PDF, Doc, Code files)
   - Process local code repositories
   - Analyze web content and research papers
   - Interact with specialized agents
   - Switch between different modes based on your task

## Features in Detail 🔍

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

### Workspace Management
- Independent conversation tracking per workspace
- Context-aware responses based on workspace type
- Seamless switching between workspaces
- Persistent history across sessions
- Timestamped code change logging

## Contributing 🤝

Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests with improvements
- Share feedback on model performance

## Licenses 📄

### Project License
```
MIT License

Copyright (c) 2025 Dobby - Deep Research & Coding Assistant

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
This project uses several open-source packages that are distributed under their own licenses:

- **Streamlit** - Apache 2.0 License
  - [License Link](https://github.com/streamlit/streamlit/blob/develop/LICENSE)
  - Used for creating the interactive web interface

- **LangChain** - MIT License
  - [License Link](https://github.com/langchain-ai/langchain/blob/master/LICENSE)
  - Used for LLM integration and chain operations

- **Ollama** - MIT License
  - [License Link](https://github.com/ollama/ollama/blob/main/LICENSE)
  - Used for local model integration

- **ChromaDB** - Apache 2.0 License
  - [License Link](https://github.com/chroma-core/chroma/blob/main/LICENSE)
  - Used for vector storage

Additional dependencies and their licenses:
- BeautifulSoup4 - MIT License
- PyPDF - BSD License
- DuckDuckGo-Search - BSD License
- Requests - Apache 2.0 License

---