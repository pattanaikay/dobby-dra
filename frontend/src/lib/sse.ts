/**
 * Synthetica Research — SSE Stream Consumer
 * Async generator that reads Server-Sent Events from the FastAPI backend.
 */

import type { SSEEvent } from "@/types";

/**
 * Opens an SSE connection to the given URL and yields parsed events.
 *
 * Usage:
 * ```ts
 * for await (const event of sseStream('/api/chat/query', body)) {
 *   if (event.type === 'token') appendToMessage(event.content);
 *   if (event.type === 'done') finalize(event.full_response);
 * }
 * ```
 */
export async function* sseStream(
  url: string,
  body: object
): AsyncGenerator<SSEEvent> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`SSE Error: ${response.status} ${response.statusText}`);
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("data: ")) {
          try {
            const event: SSEEvent = JSON.parse(trimmed.slice(6));
            yield event;
          } catch {
            // Skip malformed events
          }
        }
      }
    }

    // Process any remaining buffer
    if (buffer.trim().startsWith("data: ")) {
      try {
        const event: SSEEvent = JSON.parse(buffer.trim().slice(6));
        yield event;
      } catch {
        // Skip
      }
    }
  } finally {
    reader.releaseLock();
  }
}
