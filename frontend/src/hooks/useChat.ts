/**
 * Synthetica Research — useChat Hook
 * Manages chat state, SSE streaming, and conversation persistence.
 */
"use client";

import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { ChatMessage, WorkspaceMode, SSEEvent } from "@/types";

export function useChat(mode: WorkspaceMode, conversationId: string = "main") {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsStreaming(true);

      try {
        const stream = api.chatQuery({
          query: content,
          mode,
          conversation_id: conversationId,
        });

        let fullResponse = "";

        for await (const event of stream) {
          if (event.type === "token") {
            fullResponse += event.content;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsg.id
                  ? { ...msg, content: fullResponse }
                  : msg
              )
            );
          } else if (event.type === "done") {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsg.id
                  ? { ...msg, content: event.full_response, isStreaming: false }
                  : msg
              )
            );
          } else if (event.type === "error") {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsg.id
                  ? {
                      ...msg,
                      content: `Error: ${event.content}`,
                      isStreaming: false,
                    }
                  : msg
              )
            );
          }
        }
      } catch (error) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsg.id
              ? {
                  ...msg,
                  content: `Connection error. Please try again.`,
                  isStreaming: false,
                }
              : msg
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [mode, conversationId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, sendMessage, isStreaming, clearMessages };
}
