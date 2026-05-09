/**
 * Knowledge Graph View — Interactive concept/entity graph using React Flow.
 * Renders sample nodes until backend connection is established.
 */
"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
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
    <main className="ml-0 h-[calc(100vh-4rem)] relative overflow-hidden bg-surface">
      {/* Header Overlay */}
      <div className="absolute top-6 left-8 z-50">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-mockup flex items-center gap-4">
          <span className="text-lg font-extrabold text-brand-teal-700 font-headline">The Intellectual Canvas</span>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Knowledge Graph</span>
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
          position="bottom-left"
          className="ml-8 mb-8"
          style={{ 
            background: "rgba(255, 255, 255, 0.7)", 
            backdropFilter: "blur(20px)",
            borderRadius: "9999px", 
            border: "1px solid rgba(255, 255, 255, 0.5)", 
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
            padding: "4px"
          }}
        />
      </ReactFlow>

      {/* Right Side Panel: Node Details (Entity Profile from Mockup) */}
      <aside className="absolute top-8 right-8 bottom-8 w-80 glass-panel rounded-3xl shadow-2xl border border-white/40 flex flex-col overflow-hidden z-40">
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold tracking-widest uppercase">Entity Profile</span>
            <button className="text-slate-400 hover:text-slate-900 transition-all">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <h2 className="text-2xl font-extrabold font-headline text-on-background leading-tight mb-2">Helen of Troy</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">In Greek mythology, said to have been the most beautiful woman in the world.</p>
        </div>
        <div className="flex-1 overflow-y-auto px-6 space-y-8 pb-8 scrollbar-hide">
          {/* Historical Snippets */}
          <section>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">history_edu</span>
              Historical Context
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-white/50 rounded-2xl border border-slate-100 hover:bg-white transition-all">
                <p className="text-xs text-on-surface leading-relaxed italic">&quot;The face that launched a thousand ships and burnt the topless towers of Ilium.&quot;</p>
                <span className="block mt-2 text-[10px] font-bold text-slate-400">— Christopher Marlowe</span>
              </div>
            </div>
          </section>
          {/* Linked Sources */}
          <section>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Referenced Collections</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary-container group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-lg">article</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">Homers Iliad (Analysis)</p>
                  <p className="text-[10px] text-slate-400">PDF • 12.4 MB</p>
                </div>
              </div>
            </div>
          </section>
          {/* Action Button */}
          <div className="pt-4">
            <button className="w-full bg-on-background text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all">
              <span className="material-symbols-outlined text-sm">edit_note</span>
              Open Research Workspace
            </button>
          </div>
        </div>
      </aside>

      {/* Asymmetric Background Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>
    </main>
  );
}

