/**
 * Synthetica Research — API Client
 * Typed fetch wrappers for all FastAPI backend endpoints.
 */

import type {
  ChatRequest,
  CodeRequest,
  CodeResponse,
  Conversation,
  DocumentInfo,
  GraphData,
  GraphExpandRequest,
  RepoAnalysisRequest,
  SSEEvent,
  TopicCard,
  WebContentRequest,
} from "@/types";
import { sseStream } from "./sse";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ─── Helper: JSON fetch ───
async function fetchJSON<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// ─── Helper: File upload ───
async function uploadFiles(
  url: string,
  files: File[],
  processType: string
): Promise<DocumentInfo[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${url}?process_type=${processType}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`Upload Error: ${res.status}`);
  return res.json();
}

// ─── API Methods ───
export const api = {
  // Chat
  chatQuery: (body: ChatRequest) =>
    sseStream(`${API_BASE}/api/chat/query`, body),

  chatCode: (body: CodeRequest) =>
    fetchJSON<CodeResponse>(`${API_BASE}/api/chat/code`, {
      method: "POST",
      body: body as unknown as BodyInit,
    }),

  // Documents
  uploadDocuments: (files: File[], processType: string = "auto") =>
    uploadFiles(`${API_BASE}/api/documents/upload`, files, processType),

  listDocuments: () =>
    fetchJSON<DocumentInfo[]>(`${API_BASE}/api/documents/list`),

  // Repositories
  analyzeRepo: (body: RepoAnalysisRequest) =>
    sseStream(`${API_BASE}/api/repositories/analyze`, body),

  // Web Content
  processUrl: (body: WebContentRequest) =>
    fetchJSON<Record<string, unknown>>(`${API_BASE}/api/web/process`, {
      method: "POST",
      body: body as unknown as BodyInit,
    }),

  // Conversations
  listConversations: () =>
    fetchJSON<Conversation[]>(`${API_BASE}/api/conversations`),

  getConversation: (id: string) =>
    fetchJSON<Record<string, unknown>>(`${API_BASE}/api/conversations/${id}`),

  createConversation: (mode: string = "research") =>
    fetchJSON<Conversation>(`${API_BASE}/api/conversations?mode=${mode}`, {
      method: "POST",
    }),

  updateConversation: (id: string, messages: unknown[]) =>
    fetchJSON(`${API_BASE}/api/conversations/${id}`, {
      method: "PUT",
      body: messages as unknown as BodyInit,
    }),

  // Knowledge Graph
  getGraph: (sessionId: string) =>
    fetchJSON<GraphData>(`${API_BASE}/api/graph/${sessionId}`),

  expandNode: (body: GraphExpandRequest) =>
    fetchJSON<GraphData>(`${API_BASE}/api/graph/expand`, {
      method: "POST",
      body: body as unknown as BodyInit,
    }),

  // Discovery
  getTopics: () =>
    fetchJSON<TopicCard[]>(`${API_BASE}/api/discovery/topics`),

  // Health
  health: () => fetchJSON<{ status: string }>(`${API_BASE}/api/health`),
};
