/**
 * Knowledge Graph View — Interactive concept/entity graph using React Flow.
 * Renders sample nodes until backend connection is established.
 */
"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ConceptNode from "@/components/graph/ConceptNode";

// Sample data — will be replaced by api.getGraphData() calls
const SAMPLE_NODES: Node[] = [
  { id: "1", type: "concept", position: { x: 400, y: 50 }, data: { label: "Quantum Biology", icon: "science", weight: 8, category: "physics" } },
  { id: "2", type: "concept", position: { x: 150, y: 200 }, data: { label: "Photosynthesis", icon: "eco", weight: 5, category: "biology" } },
  { id: "3", type: "concept", position: { x: 650, y: 200 }, data: { label: "Entanglement", icon: "blur_on", weight: 6, category: "physics" } },
  { id: "4", type: "concept", position: { x: 100, y: 400 }, data: { label: "Chloroplasts", icon: "local_florist", weight: 3, category: "biology" } },
  { id: "5", type: "concept", position: { x: 400, y: 400 }, data: { label: "Coherence", icon: "waves", weight: 4, category: "physics" } },
  { id: "6", type: "concept", position: { x: 700, y: 400 }, data: { label: "Spooky Action", icon: "link", weight: 2, category: "physics" } },
  { id: "7", type: "concept", position: { x: 250, y: 550 }, data: { label: "Maritime Navigation", icon: "sailing", weight: 3, category: "history" } },
  { id: "8", type: "concept", position: { x: 550, y: 550 }, data: { label: "Magnetoreception", icon: "explore", weight: 4, category: "biology" } },
];

const SAMPLE_EDGES: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "var(--primary)", strokeWidth: 2 } },
  { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "var(--primary)", strokeWidth: 2 } },
  { id: "e2-4", source: "2", target: "4", style: { stroke: "#22c55e", strokeWidth: 1.5 } },
  { id: "e2-5", source: "2", target: "5", style: { stroke: "var(--primary)", strokeWidth: 1.5 } },
  { id: "e3-5", source: "3", target: "5", style: { stroke: "var(--primary)", strokeWidth: 1.5 } },
  { id: "e3-6", source: "3", target: "6", style: { stroke: "var(--primary)", strokeWidth: 1.5 } },
  { id: "e5-7", source: "5", target: "7", style: { stroke: "var(--tertiary)", strokeWidth: 1 } },
  { id: "e5-8", source: "5", target: "8", style: { stroke: "#22c55e", strokeWidth: 1.5 } },
  { id: "e7-8", source: "7", target: "8", animated: true, style: { stroke: "var(--tertiary)", strokeWidth: 2 } },
];

export default function GraphPage() {
  const [nodes, , onNodesChange] = useNodesState(SAMPLE_NODES);
  const [edges, , onEdgesChange] = useEdgesState(SAMPLE_EDGES);

  const nodeTypes = useMemo(() => ({ concept: ConceptNode }), []);

  const proOptions = { hideAttribution: true };

  return (
    <div className="h-[calc(100vh-4rem)] relative">
      {/* Header Overlay */}
      <div className="absolute top-6 left-8 z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--primary)]">hub</span>
            <div>
              <h1 className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Knowledge Graph
              </h1>
              <p className="text-xs" style={{ color: "var(--secondary)" }}>
                {nodes.length} concepts • {edges.length} connections
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        fitView
        attributionPosition="bottom-left"
        style={{ background: "var(--surface)" }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="var(--outline-variant)" />
        <Controls
          position="bottom-right"
          style={{ background: "white", borderRadius: "0.75rem", border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
        />
        <MiniMap
          position="top-right"
          style={{ background: "rgba(255,255,255,0.85)", borderRadius: "0.75rem", border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
          nodeColor={(n) => {
            const cat = (n.data as { category?: string })?.category;
            if (cat === "physics") return "#0453cd";
            if (cat === "biology") return "#22c55e";
            if (cat === "history") return "#924628";
            return "#515f74";
          }}
        />
      </ReactFlow>

      {/* Floating Info Panel */}
      <div className="absolute bottom-8 left-8 z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-lg max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-sm" style={{ color: "var(--primary)" }}>auto_awesome</span>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--secondary)" }}>AI Insight</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
            Strong cross-domain link detected between <strong>Magnetoreception</strong> and <strong>Maritime Navigation</strong> — 
            quantum biological mechanisms may explain ancient wayfinding techniques.
          </p>
        </div>
      </div>
    </div>
  );
}
