# Dobby - Deep Research & Coding Assistant 🧙‍♂️

Dobby is an intelligent research and coding assistant that helps solve programming problems using the powerful deepseek-coder-v2:16b model. Built with Streamlit and LangChain, it can analyze documents, code repositories, and web content to provide context-aware coding assistance.

## Features 📚

- **Multi-Format Document Processing**
  - PDF documents
  - Text and Word documents (.txt, .docx)
  - Source code files (.py, .js, .java, .ts, .cpp)
  - Web content via URLs
  - Entire code repositories

- **Dual Operation Modes**
  - Chat Mode: Ask questions about your codebase and documents
  - Code Editing Mode: Generate and modify code with context awareness

- **Smart Context Management**
  - Vector database storage for efficient retrieval
  - Conversation history tracking
  - Persistent code change logging

## Technical Stack 🛠️

- **Core Components**
  - [Streamlit](https://streamlit.io/) - Interactive UI
  - [LangChain](https://www.langchain.com/) - LLM Framework
  - [Ollama](https://ollama.ai/) - Local Model Integration
  - [Chroma DB](https://www.trychroma.com/) - Vector Storage

- **Models**
  - deepseek-coder-v2:16b - Main coding model
  - nomic-embed-text - Text embeddings

## Project Structure 📁

```
.
├── main.py                 # Main Streamlit application
├── agentutils.py          # Core agent functionality
├── requirements.txt       # Project dependencies
├── utils/
│   ├── dbutils.py        # Database operations
│   ├── fileutils.py      # File handling utilities
│   ├── logutils.py       # Logging and history management
│   └── webutils.py       # Web content processing
├── research_db/          # Vector database storage
├── code_changes/         # Generated code modifications
└── conversations.json    # Conversation history
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

2. Use the interface to:
   - Upload documents (PDF, Doc, Code files)
   - Add local code repositories
   - Input URLs for web content analysis
   - Toggle between Chat and Code Editing modes
   - Ask questions or request code changes

## Features in Detail 🔍

### Document Processing
- PDF files are processed page by page
- Code files are parsed with proper UTF-8 encoding
- Web content is cleaned and extracted using BeautifulSoup
- Repositories are recursively scanned for supported code files

### Vector Storage
- Documents are chunked into 500-character segments with 50-character overlap
- Efficient similarity search for relevant context retrieval
- Persistent storage for long-term knowledge retention

### Conversation Management
- Complete conversation history tracking
- Timestamped code change logging
- JSON-based persistent storage

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

*Built with ❤️ using Streamlit and LangChain*