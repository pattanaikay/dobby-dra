# Backend-Frontend Integration Prompt

> **Use this prompt to instruct an AI coding assistant to wire the Next.js frontend to the FastAPI backend.**

---

## Prompt

You are integrating the **Next.js frontend** with a **FastAPI backend** for "Synthetica Research" — an intelligent deep research assistant. The frontend consumes REST and SSE endpoints from the backend running at `http://localhost:8000`. You need to build the API client layer, SSE streaming hooks, and connect every UI component to its corresponding backend endpoint.

### Architecture Overview
```
Next.js (:3000)                    FastAPI (:8000)
┌────────────────┐                ┌──────────────────┐
│ pages/routes    │◄── REST/SSE ──►│ routers/         │
│ components/     │                │ services/         │
│ hooks/          │                │ agents/           │
│ lib/api.ts      │                │ utils/            │
│ lib/sse.ts      │                │ ChromaDB          │
│ providers/      │                │ Ollama LLM        │
└────────────────┘                └──────────────────┘
```

---

### 1. API Client (`lib/api.ts`)

Create a typed API client with these methods:

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  // Chat
  chatQuery: (body: ChatRequest) => sseStream(`${API_BASE}/api/chat/query`, body),
  chatCode: (body: CodeRequest) => fetchJSON<CodeResponse>(`${API_BASE}/api/chat/code`, { method: 'POST', body }),

  // Documents
  uploadDocuments: (files: File[], processType: string) => uploadFiles(`${API_BASE}/api/documents/upload`, files, processType),
  listDocuments: () => fetchJSON<Document[]>(`${API_BASE}/api/documents/list`),

  // Repositories
  analyzeRepo: (body: RepoRequest) => sseStream(`${API_BASE}/api/repositories/analyze`, body),

  // Web Content
  processUrl: (body: WebContentRequest) => fetchJSON<ProcessResult>(`${API_BASE}/api/web/process`, { method: 'POST', body }),

  // Conversations
  listConversations: () => fetchJSON<Conversation[]>(`${API_BASE}/api/conversations`),
  getConversation: (id: string) => fetchJSON<Message[]>(`${API_BASE}/api/conversations/${id}`),
  createConversation: () => fetchJSON<Conversation>(`${API_BASE}/api/conversations`, { method: 'POST' }),
  updateConversation: (id: string, messages: Message[]) => fetchJSON(`${API_BASE}/api/conversations/${id}`, { method: 'PUT', body: { messages } }),

  // Knowledge Graph
  getGraph: (sessionId: string) => fetchJSON<GraphData>(`${API_BASE}/api/graph/${sessionId}`),
  expandNode: (body: GraphExpandRequest) => fetchJSON<GraphData>(`${API_BASE}/api/graph/expand`, { method: 'POST', body }),

  // Discovery
  getTopics: () => fetchJSON<Topic[]>(`${API_BASE}/api/discovery/topics`),
};
```

### 2. SSE Streaming Consumer (`lib/sse.ts`)

```typescript
export async function* sseStream(url: string, body: object): AsyncGenerator<SSEEvent> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const event: SSEEvent = JSON.parse(line.slice(6));
        yield event;
      }
    }
  }
}

type SSEEvent = 
  | { type: 'thinking' }
  | { type: 'token'; content: string }
  | { type: 'done'; full_response: string };
```

### 3. Custom Hooks — Page-to-Endpoint Mapping

#### `hooks/useChat.ts` — Connects `ChatContainer` ↔ `POST /api/chat/query`
```typescript
// Manages: message list, streaming state, sending messages
// On send: 
//   1. Append user message to local state
//   2. Start SSE stream via api.chatQuery({ query, mode, conversation_id })
//   3. As "token" events arrive, append to streaming message
//   4. On "done" event, finalize message and save conversation
//   5. Update TanStack Query cache for conversation history
```

#### `hooks/useFileUpload.ts` — Connects `DropzoneUploader` ↔ `POST /api/documents/upload`
```typescript
// Manages: upload progress, processing status per file
// On files dropped:
//   1. Create FormData with files + process_type param
//   2. Use XMLHttpRequest for upload progress tracking
//   3. On response, update file status cards
//   4. Invalidate TanStack Query cache for document list
```

#### `hooks/useKnowledgeGraph.ts` — Connects `KnowledgeGraph` ↔ `/api/graph/*`
```typescript
// Manages: React Flow nodes/edges state
// On mount: Fetch initial graph via api.getGraph(sessionId)
// On node click: Call api.expandNode({ node_id, session_id })
//   → Merge new nodes/edges into React Flow state
//   → Auto-layout using dagre or elkjs
```

#### `hooks/useWorkspaceHistory.ts` — Connects `Sidebar` ↔ `/api/conversations/*`
```typescript
// Manages: conversation list, current conversation
// Uses TanStack Query for caching and auto-refetch
// On "New Chat" click: api.createConversation() → switch to new conversation
```

---

### 4. Page-Level Integration Map

| Page / Screen | Components | Backend Endpoints | Events |
|---|---|---|---|
| **Dashboard** (`/`) | `ResearchCard[]`, `ConversationList` | `GET /api/documents/list`, `GET /api/conversations` | On card click → navigate to research/chat |
| **Deep Research Chat** (`/research`) | `ChatContainer`, `ChatInput`, `StreamingResponse`, `LiveContextPanel` | `POST /api/chat/query` (SSE), `GET /api/conversations/{id}` | `useChat` hook manages all streaming |
| **Code Workspace** (`/code`) | `ChatContainer`, `ChatInput`, `CodeBlock` | `POST /api/chat/query` (mode="code"), `POST /api/chat/code` | Code generation adds syntax highlighting |
| **Writing Workspace** (`/writing`) | `ChatContainer`, `ChatInput` | `POST /api/chat/query` (mode="writing") | Same chat hook, different mode |
| **Data Workspace** (`/data`) | `ChatContainer`, `ChatInput` | `POST /api/chat/query` (mode="data") | Same pattern |
| **Deep Dive Discovery** (`/discovery`) | `TopicCard[]`, `TopicRandomizer` | `GET /api/discovery/topics` | "Discover" button → refetch topics |
| **Research Library** (`/library`) | `ResearchCard[]`, filter controls | `GET /api/documents/list` | Filter by date/type client-side |
| **Knowledge Graph** (`/graph`) | `KnowledgeGraph`, `ConceptNode`, `GraphToolbar`, `EntityPanel` | `GET /api/graph/{sessionId}`, `POST /api/graph/expand` | Node click → expand |

---

### 5. File Upload Flow (End-to-End)

```
User drops files → DropzoneUploader.onDrop()
  → useFileUpload.upload(files, processType)
    → FormData with files + processType
    → POST /api/documents/upload (multipart)
      → Backend: process_uploaded_file() → save_to_db()
      → Backend: PaperAnalysisAgent or CodeReviewAgent (if applicable)
    ← Response: { filename, status, analysis? }
  → Update FileProcessingCard status
  → Invalidate documents list query
```

---

### 6. Chat Streaming Flow (End-to-End)

```
User types message → ChatInput.onSubmit()
  → useChat.sendMessage(message)
    → Append { role: 'user', content: message } to messages
    → Append { role: 'assistant', content: '', isStreaming: true }
    → POST /api/chat/query (SSE) { query, mode, conversation_id }
      ← Event: { type: 'thinking' }  → Show pulsing gradient loader
      ← Event: { type: 'token', content: '...' } → Append to assistant message
      ← Event: { type: 'token', content: '...' } → Append to assistant message
      ...
      ← Event: { type: 'done', full_response: '...' }
    → Set { isStreaming: false }
    → PUT /api/conversations/{id} (save history)
```

---

### 7. TanStack Query Configuration (`providers/QueryProvider.tsx`)

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Query keys:
// ['conversations'] — conversation list
// ['conversations', id] — specific conversation
// ['documents'] — document list
// ['graph', sessionId] — graph data
// ['topics'] — discovery topics
```

---

### 8. Error Handling

```typescript
// Global error boundary in app/layout.tsx
// Per-component error states:
// - Chat: "Failed to connect to research engine. Retrying..."
// - Upload: Per-file error status with retry button
// - Graph: "Could not load knowledge graph" with manual refresh
// All errors use the tertiary color (#924628) for alerts per design system
```

---

### 9. Environment Variables

```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

### 10. Design System Integration Checklist

When wiring up components, ensure these design rules are followed:
- [ ] Chat input: `surface-container-lowest` bg, 4rem height, `surface-tint` glow on focus
- [ ] Streaming indicator: Pulsing gradient (`primary-fixed` ↔ `primary-container`), NOT a spinner
- [ ] File processing cards: No divider lines, use `space-8` (2.75rem) vertical whitespace
- [ ] Error alerts: Use `tertiary` (#924628) color, not red
- [ ] Loading states: Use `primary-fixed` (#dae2ff) pulsing, not skeleton loaders
- [ ] All API error toasts: Glassmorphism overlay with `backdrop-blur: 20px`
