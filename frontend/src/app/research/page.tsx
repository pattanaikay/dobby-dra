/**
 * Deep Research Chat — The "Zen" Workspace
 * Chat interface with SSE streaming and live context panel.
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import ReactMarkdown from "react-markdown";

export default function ResearchPage() {
  const { messages, sendMessage, isStreaming } = useChat("research");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    const query = input;
    setInput("");
    await sendMessage(query);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="px-8 py-6" style={{ background: "var(--surface)" }}>
        <h1
          className="text-2xl font-extrabold tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Deep Research
        </h1>
        <p className="text-meta">Ask questions about your research data</p>
      </header>

      {/* AI Loading Bar */}
      {isStreaming && <div className="ai-loading" />}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {messages.length === 0 && (
          <div className="text-center py-20">
            <h2
              className="text-3xl font-extrabold tracking-tighter mb-3"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--on-surface)",
              }}
            >
              Begin Your Research
            </h2>
            <p className="text-meta text-lg">
              Ask a question to start your deep dive session.
            </p>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[80%] rounded-2xl px-5 py-4"
                style={{
                  background:
                    msg.role === "user"
                      ? "var(--primary)"
                      : "var(--surface-container-lowest)",
                  color:
                    msg.role === "user"
                      ? "var(--on-primary)"
                      : "var(--on-surface)",
                  boxShadow:
                    msg.role === "assistant"
                      ? "var(--shadow-ambient)"
                      : "none",
                }}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content || "..."}</ReactMarkdown>
                ) : (
                  <p>{msg.content}</p>
                )}
                {msg.isStreaming && (
                  <span className="inline-block w-2 h-4 ml-1 rounded-sm animate-pulse"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-8 py-4">
        <div className="max-w-3xl mx-auto relative">
          <input
            type="text"
            className="research-bar pr-14"
            placeholder="Ask your research question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !p-3 !rounded-xl"
            disabled={isStreaming || !input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
