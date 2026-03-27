/**
 * Writing Workspace — Matches Intellectual Canvas floating bar pattern.
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import ReactMarkdown from "react-markdown";

const WRITING_CHIPS = ["Write an executive summary", "Draft a literature review", "Create documentation", "Edit for clarity"];

export default function WritingPage() {
  const { messages, sendMessage, isStreaming } = useChat("writing");
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
    <div className="min-h-screen flex flex-col items-center">
      {isStreaming && (
        <div className="w-full h-1 bg-gradient-to-r from-[var(--primary-fixed)] to-[var(--primary-container)] animate-pulse opacity-20"></div>
      )}

      <div className="max-w-4xl w-full px-8 py-16 flex flex-col flex-1">
        <section className="space-y-12 mb-24">
          {messages.length === 0 && (
            <div className="py-24 flex flex-col items-center">
              <span className="material-symbols-outlined text-6xl mb-6" style={{ color: "var(--outline-variant)" }}>edit_note</span>
              <h2 className="text-3xl font-extrabold tracking-tighter text-center mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Writing Workspace
              </h2>
              <p className="text-center max-w-md" style={{ color: "var(--secondary)" }}>
                Create reports, documentation, and summaries. The Curator will help structure and refine your writing.
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "user" ? (
                <div className="flex flex-col items-end gap-3">
                  <div className="bg-white p-6 rounded-xl max-w-2xl shadow-sm border border-slate-100/10">
                    <p className="text-[0.9375rem] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{msg.content}</p>
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest opacity-50 px-2" style={{ color: "var(--secondary)" }}>User</span>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-4">
                  <div className="flex gap-4 items-start w-full">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary-container)] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-white text-[18px]">edit_note</span>
                    </div>
                    <div className="space-y-6 flex-1 prose prose-slate max-w-none">
                      <ReactMarkdown>{msg.content || "..."}</ReactMarkdown>
                      {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 rounded-sm animate-pulse" style={{ background: "var(--primary)" }}></span>}
                    </div>
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest opacity-50 px-14" style={{ color: "var(--secondary)" }}>Curator</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>
      </div>

      {/* Floating Research Bar */}
      <div className="fixed bottom-0 p-8 pointer-events-none" style={{ left: "16rem", right: 0 }}>
        <div className="max-w-3xl mx-auto w-full pointer-events-auto">
          <form onSubmit={handleSubmit}>
            <div className="bg-white shadow-2xl shadow-slate-200/50 rounded-2xl flex items-center px-6 py-4 gap-4 ring-1 ring-slate-100 transition-all focus-within:ring-[var(--primary)]/20">
              <span className="material-symbols-outlined text-slate-400">edit_note</span>
              <input type="text" className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-[0.9375rem] placeholder:text-slate-400"
                style={{ fontFamily: "var(--font-body)" }} placeholder="Describe what you'd like to write..."
                value={input} onChange={(e) => setInput(e.target.value)} disabled={isStreaming} />
              <button type="submit" className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                disabled={isStreaming || !input.trim()}>
                <span className="material-symbols-outlined">arrow_upward</span>
              </button>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-2">
              {WRITING_CHIPS.map((chip) => (
                <button key={chip} type="button" onClick={() => setInput(chip)}
                  className="bg-[var(--surface-container-low)] px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[var(--surface-container-high)] cursor-pointer transition-colors whitespace-nowrap"
                  style={{ color: "var(--secondary)" }}>{chip}</button>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
