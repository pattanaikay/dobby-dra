/**
 * Deep Research Chat — Matches deep_research_chat.html mockup exactly.
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
    <div className="min-h-screen flex flex-col items-center bg-surface scrollbar-hide">
      {/* AI Progress Indicator */}
      <div className={`w-full h-1 bg-gradient-to-r from-primary-fixed to-primary-container transition-opacity duration-500 ${isStreaming ? 'opacity-20 animate-pulse' : 'opacity-0'}`}></div>

      <div className="max-w-4xl w-full px-8 py-16 flex flex-col flex-1">
        {/* Message Thread */}
        <section className="space-y-12 mb-24">
          {messages.length === 0 && (
            <div className="py-24 flex flex-col items-center">
              <p className="text-secondary/40 font-headline text-xs tracking-widest uppercase mb-8">New Research Thread</p>
              <h2 className="text-3xl font-extrabold font-headline tracking-tighter text-center mb-4">Choose Your Intellectual Frontier.</h2>
              <p className="text-center max-w-md text-secondary font-body">Ask a question to begin synthesizing insights from your knowledge library.</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "user" ? (
                <div className="flex flex-col items-end gap-3">
                  <div className="bg-surface-container-lowest p-6 rounded-xl max-w-2xl text-on-surface shadow-sm border border-slate-100/10">
                    <p className="font-body text-[0.9375rem] leading-relaxed">{msg.content}</p>
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-secondary opacity-50 px-2 font-headline">User • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-4">
                  <div className="flex gap-4 items-start w-full">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-white text-[18px]">bolt</span>
                    </div>
                    <div className="space-y-6 flex-1">
                      <div className="prose prose-slate max-w-none">
                        <div className="font-body text-on-surface-variant leading-relaxed">
                          <ReactMarkdown>{msg.content || "..."}</ReactMarkdown>
                        </div>
                      </div>
                      
                      {!msg.isStreaming && (
                        <div className="pt-4">
                          <button className="group flex items-center gap-3 bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface px-6 py-4 rounded-full transition-all duration-300 shadow-sm">
                            <span className="material-symbols-outlined group-hover:rotate-45 transition-transform">auto_awesome</span>
                            <span className="font-headline font-bold text-sm">Deep Dive: Generate Structural Model</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-secondary opacity-50 px-14 font-headline">Curator • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>
      </div>

      {/* Floating Action Area */}
      <div className="fixed bottom-0 right-0 w-[calc(100%-16rem)] p-8 pointer-events-none z-50">
        <div className="max-w-3xl mx-auto w-full pointer-events-auto">
          <div className="relative">
            <form onSubmit={handleSubmit} className="bg-surface-container-lowest shadow-2xl shadow-slate-200/50 rounded-2xl flex items-center px-6 py-4 gap-4 ring-1 ring-slate-100 transition-all focus-within:ring-primary/20">
              <span className="material-symbols-outlined text-slate-400">attachment</span>
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-slate-400 font-body text-[0.9375rem]" 
                placeholder="Synthesize new findings or ask a question..." 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isStreaming}
              />
              <button 
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined">arrow_upward</span>
              </button>
            </form>
            
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-2">
              {["Compare with Baltic data", "Export citations (APA)", "Generate trend chart", "Search JSTOR"].map(chip => (
                <span 
                  key={chip}
                  onClick={() => setInput(chip)}
                  className="bg-surface-container-low px-4 py-1.5 rounded-full text-xs font-medium text-secondary hover:bg-surface-container-high cursor-pointer transition-colors whitespace-nowrap font-body"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Insight Panel */}
      <aside className="fixed top-24 right-8 w-64 hidden xl:block space-y-8">
        <div className="bg-surface-container-low p-6 rounded-2xl border border-white/50 shadow-sm">
          <h5 className="font-headline text-[10px] uppercase tracking-widest text-secondary mb-4">Live Context</h5>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-on-surface font-headline">Primary Sources</span>
              <span className="text-[11px] text-secondary font-body">IEA World Energy Outlook 2023</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-on-surface font-headline">Confidence Score</span>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-teal-500"></div>
              </div>
              <span className="text-[10px] text-teal-600 font-bold self-end font-headline">92%</span>
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group cursor-pointer shadow-lg">
          <img className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd9rcK_rKW5mzMiFbHQdSKK-MQ29mAQxxic_fxA2NC4jdmaz-ZalTMshzz_mhenA5wcfrRrPUze0btYYH9wQ4NmaOyjZLjFELGnqytM2lXHRUxC9pNfVoWf77XGbX4GUkPzl3Sxzme3M_QpcQnU8Jao5g_QkTAVnSHgvDLzwS1oRVmMQ9ZxdF4_-hk82ByKXIA3fOWHoys3fMbW260stEwF1ZK3dYXZNhLMRuvVm4pt4eLNjPthyEQ9ayMLKVgF9KQbGeE7FJ8Nua2" alt="Visual Inspiration" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1 font-headline">Visual Inspiration</span>
            <p className="text-white font-headline font-bold text-sm leading-tight">Architecture of Energy: The Offshore Pivot</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
