/**
 * Knowledge Graph View — Interactive concept/entity graph
 * Placeholder page — React Flow integration to be built.
 */
"use client";

import { Network, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export default function GraphPage() {
  return (
    <div className="relative h-screen flex flex-col">
      {/* Header */}
      <header className="px-8 py-6">
        <div className="flex items-center gap-3">
          <Network size={24} style={{ color: "var(--primary)" }} />
          <h1 className="text-2xl font-extrabold tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}>
            Knowledge Graph
          </h1>
        </div>
        <p className="text-meta mt-1">
          Explore connections between concepts in your research
        </p>
      </header>

      {/* Graph Canvas Placeholder */}
      <div className="flex-1 relative"
        style={{ background: "var(--surface-container-low)" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Network size={64} className="mx-auto mb-4" style={{ color: "var(--outline-variant)" }} />
            <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--on-surface-variant)" }}>
              Knowledge Graph
            </h2>
            <p className="text-meta max-w-md">
              Upload research documents and start a session to build your knowledge graph.
              React Flow integration will render interactive nodes here.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Toolbar */}
      <div className="floating-toolbar glass">
        <button className="btn-ghost !p-2" title="Zoom In">
          <ZoomIn size={18} />
        </button>
        <button className="btn-ghost !p-2" title="Zoom Out">
          <ZoomOut size={18} />
        </button>
        <button className="btn-ghost !p-2" title="Fit to View">
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
}
