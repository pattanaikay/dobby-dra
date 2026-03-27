/**
 * Deep Research Chat — Matches deep_research_chat.html mockup.
 * Centered prose layout, floating research bar, suggestion chips, Live Context panel.
 */
"use client";

import { useState, useRef, useEffect } from "react";
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
    <div className="min-h-screen flex flex-col items-center">
      {/* AI Progress Indicator */}
      {isStreaming && (
        <div className="w-full h-1 bg-gradient-to-r from-[var(--primary-fixed)] to-[var(--primary-container)] animate-pulse opacity-20"></div>
      )}

      <div className="max-w-4xl w-full px-8 py-16 flex flex-col flex-1">
        {/* Message Thread */}
        <section className="space-y-12 mb-24">
          {/* Empty State */}
          {messages.length === 0 && (
            <div className="py-24 flex flex-col items-center">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-40" style={{ color: "var(--secondary)", fontFamily: "var(--font-display)" }}>
                New Research Thread
              </p>
              <h2 className="text-3xl font-extrabold tracking-tighter text-center mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Begin Your Deep Dive
              </h2>
              <p className="text-center max-w-md" style={{ color: "var(--secondary)" }}>
                Ask a question to start your research session. The Curator will synthesize insights from your documents.
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "user" ? (
                /* User Message — right aligned, minimal */
                <div className="flex flex-col items-end gap-3">
                  <div className="bg-white p-6 rounded-xl max-w-2xl shadow-sm border border-slate-100/10">
                    <p className="text-[0.9375rem] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                      {msg.content}
                    </p>
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest opacity-50 px-2" style={{ color: "var(--secondary)" }}>
                    User
                  </span>
                </div>
              ) : (
                /* AI Message — left aligned with avatar and structured content */
                <div className="flex flex-col items-start gap-4">
                  <div className="flex gap-4 items-start w-full">
                    {/* AI Avatar */}
                    <div className="w-8 h-8 rounded-full bg-[var(--primary-container)] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-white text-[18px]">bolt</span>
                    </div>
                    {/* Content */}
                    <div className="space-y-6 flex-1 prose prose-slate max-w-none">
                      <ReactMarkdown>{msg.content || "..."}</ReactMarkdown>
                      {msg.isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 rounded-sm animate-pulse" style={{ background: "var(--primary)" }}></span>
                      )}
                    </div>
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest opacity-50 px-14" style={{ color: "var(--secondary)" }}>
                    Curator
                  </span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>
      </div>

      {/* Floating Action Area (Bottom Fixed) */}
      <div className="fixed bottom-0 p-8 pointer-events-none" style={{ left: "16rem", right: 0 }}>
        <div className="max-w-3xl mx-auto w-full pointer-events-auto">
          <form onSubmit={handleSubmit}>
            {/* The Research Bar */}
            <div className="bg-white shadow-2xl shadow-slate-200/50 rounded-2xl flex items-center px-6 py-4 gap-4 ring-1 ring-slate-100 transition-all focus-within:ring-[var(--primary)]/20">
              <span className="material-symbols-outlined text-slate-400">attachment</span>
              <input
                type="text"
                className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-[0.9375rem] placeholder:text-slate-400"
                style={{ fontFamily: "var(--font-body)" }}
                placeholder="Synthesize new findings or ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isStreaming}
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                disabled={isStreaming || !input.trim()}
              >
                <span className="material-symbols-outlined">arrow_upward</span>
              </button>
            </div>
            {/* Suggestion Chips */}
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-2">
              {["Compare with Baltic data", "Export citations (APA)", "Generate trend chart", "Search JSTOR"].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setInput(chip)}
                  className="bg-[var(--surface-container-low)] px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[var(--surface-container-high)] cursor-pointer transition-colors whitespace-nowrap"
                  style={{ color: "var(--secondary)" }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>

      {/* Contextual Insight Panel (Right side, hidden on small screens) */}
      <aside className="fixed top-24 right-8 w-64 hidden 2xl:block space-y-8">
        <div className="bg-[var(--surface-container-low)] p-6 rounded-2xl border border-white/50">
          <h5 className="text-[10px] uppercase tracking-widest mb-4 font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--secondary)" }}>Live Context</h5>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold">Primary Sources</span>
              <span className="text-[11px]" style={{ color: "var(--secondary)" }}>IEA World Energy Outlook 2023</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold">Confidence Score</span>
              <div className="w-full h-1 bg-[var(--surface-container-highest)] rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-teal-500"></div>
              </div>
              <span className="text-[10px] text-teal-600 font-bold self-end">92%</span>
            </div>
          </div>
        </div>
        {/* Visual Inspiration Card */}
        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group cursor-pointer shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Visual Inspiration" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Visual Inspiration</span>
            <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "var(--font-display)" }}>Architecture of Energy: The Research Pivot</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
