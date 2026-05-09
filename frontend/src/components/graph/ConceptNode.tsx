/**
 * ConceptNode — Custom React Flow node for Knowledge Graph.
 * Glassmorphism card with icon, label, and connection count.
 */
import { Handle, Position, type NodeProps } from "@xyflow/react";

export interface ConceptNodeData {
  label: string;
  icon: string;
  weight: number;
  category: string;
  [key: string]: unknown;
}

export default function ConceptNode({ data }: NodeProps) {
  const nodeData = data as ConceptNodeData;
  const isCentral = nodeData.weight > 7;

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-brand-teal-600 !border-none !w-2 !h-2" />
      <div
        className={`px-6 py-5 rounded-xl bg-white transition-all hover:scale-105 border border-slate-100/50 ${
          isCentral ? "ring-2 ring-brand-teal-600 ring-offset-2 shadow-lg" : "shadow-sm"
        }`}
        style={{
          minWidth: 180,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-brand-teal-400/10"
          >
            <span className="material-symbols-outlined text-brand-teal-700 text-xl">{nodeData.icon}</span>
          </div>
          <div>
            <p className="font-extrabold text-sm tracking-tighter text-slate-900 font-headline">
              {nodeData.label}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-headline">
              {nodeData.weight} connections
            </p>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-brand-teal-600 !border-none !w-2 !h-2" />
    </>
  );
}
