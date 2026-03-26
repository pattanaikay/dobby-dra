/**
 * Data Workspace — Data analysis and visualization
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { Send, BarChart3 } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import ReactMarkdown from "react-markdown";

export default function DataPage() {
  const { messages, sendMessage, isStreaming } = useChat("data");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    setInput("");
    await sendMessage(input);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="px-8 py-6">
        <div className="flex items-center gap-3">
          <BarChart3 size={24} style={{ color: "var(--primary)" }} />
          <h1 className="text-2xl font-extrabold tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}>
            Data Workspace
          </h1>
        </div>
        <p className="text-meta mt-1">Analyze and visualize your data</p>
      </header>

      {isStreaming && <div className="ai-loading" />}

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[80%] rounded-2xl px-5 py-4"
                style={{
                  background: msg.role === "user" ? "var(--primary)" : "var(--surface-container-lowest)",
                  color: msg.role === "user" ? "var(--on-primary)" : "var(--on-surface)",
                }}>
                <ReactMarkdown>{msg.content || "..."}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-8 py-4">
        <div className="max-w-3xl mx-auto relative">
          <input type="text" className="research-bar pr-14"
            placeholder="Ask about your data..."
            value={input} onChange={(e) => setInput(e.target.value)} disabled={isStreaming} />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !p-3 !rounded-xl"
            disabled={isStreaming || !input.trim()}>
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
