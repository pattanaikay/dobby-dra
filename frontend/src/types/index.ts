/**
 * Synthetica Research — Shared TypeScript Types
 */

// ─── Chat ───
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface ChatRequest {
  query: string;
  mode: WorkspaceMode;
  conversation_id: string;
}

export interface CodeRequest {
  query: string;
  conversation_id: string;
}

export interface CodeResponse {
  response: string;
  file_path: string | null;
}

// ─── SSE Events ───
export type SSEEvent =
  | { type: "thinking"; content?: string }
  | { type: "token"; content: string }
  | { type: "done"; full_response: string }
  | { type: "error"; content: string }
  | { type: "status"; content: string };

// ─── Documents ───
export interface DocumentInfo {
  filename: string;
  status: "processing" | "complete" | "error";
  file_type: string;
  analysis?: Record<string, unknown>;
  error?: string;
}

export interface WebContentRequest {
  url: string;
  content_type: "research_paper" | "documentation" | "article" | "blog";
}

export interface RepoAnalysisRequest {
  path: string;
  branch?: string;
}

// ─── Conversations ───
export interface Conversation {
  id: string;
  message_count: number;
  mode: WorkspaceMode;
}

// ─── Knowledge Graph ───
export interface GraphNode {
  id: string;
  label: string;
  type: "concept" | "paper" | "author" | "method";
  metadata?: Record<string, unknown>;
}

export interface GraphEdge {
  source: string;
  target: string;
  label: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphExpandRequest {
  node_id: string;
  session_id: string;
}

// ─── Discovery ───
export interface TopicCard {
  title: string;
  description: string;
  color: string;
  image_url?: string;
}

// ─── Workspace ───
export type WorkspaceMode = "research" | "code" | "writing" | "data";

export const WORKSPACE_CONFIG: Record<
  WorkspaceMode,
  { label: string; icon: string; path: string }
> = {
  research: { label: "Research", icon: "📑", path: "/research" },
  code: { label: "Code", icon: "💻", path: "/code" },
  writing: { label: "Writing", icon: "✍️", path: "/writing" },
  data: { label: "Data", icon: "📊", path: "/data" },
};
