/**
 * Deep Dive Discovery — Topic Exploration ("The Spark")
 * Shows randomized research topics to explore.
 */
"use client";

import { useState, useEffect } from "react";
import { Compass, RefreshCw, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import type { TopicCard as TopicCardType } from "@/types";

export default function DiscoveryPage() {
  const [topics, setTopics] = useState<TopicCardType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const data = await api.getTopics();
      setTopics(data);
    } catch {
      setTopics([
        { title: "Quantum Computing", description: "Explore quantum frontiers", color: "#0453cd" },
        { title: "Neural Architecture", description: "AI designing AI systems", color: "#924628" },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchTopics(); }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-12 mt-8">
        <div className="flex items-center gap-3 mb-4">
          <Compass size={28} style={{ color: "var(--primary)" }} />
          <h1 className="text-4xl font-extrabold tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}>
            Deep Dive Discovery
          </h1>
        </div>
        <p className="text-meta text-lg max-w-lg">
          Discover unexpected connections. Click a topic to start a focused
          research session.
        </p>
      </header>

      {/* Loading state: pulsing gradient, NOT a spinner */}
      {loading && <div className="ai-loading mb-8" />}

      {/* Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {topics.map((topic, i) => (
          <a key={i} href="/research"
            className="research-card group relative overflow-hidden cursor-pointer"
            style={{ minHeight: "240px" }}>
            {/* Color accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
              style={{ background: topic.color }} />
            <div className="pt-6">
              <span className="source-badge">{`Topic ${i + 1}`}</span>
              <h2 className="text-2xl font-extrabold tracking-tight mt-4 mb-3"
                style={{ fontFamily: "var(--font-display)" }}>
                {topic.title}
              </h2>
              <p className="text-meta text-base mb-6">{topic.description}</p>
              <div className="flex items-center gap-2 font-semibold"
                style={{ color: topic.color }}>
                Dive In
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Discover Button */}
      <div className="text-center">
        <button onClick={fetchTopics} className="btn-secondary inline-flex items-center gap-2"
          disabled={loading}>
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Discover New Topics
        </button>
      </div>
    </div>
  );
}
