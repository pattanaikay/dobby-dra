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
  const categoryColors: Record<string, string> = {
    physics: "var(--primary)",
    biology: "#22c55e",
    history: "var(--tertiary)",
    philosophy: "#8b5cf6",
    default: "var(--secondary)",
  };
  const color = categoryColors[nodeData.category] || categoryColors.default;

  return (
    <>
      <Handle type="target" position={Position.Top} style={{ background: color, border: "none", width: 8, height: 8 }} />
      <div
        className="px-5 py-4 rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${color}33`,
          minWidth: 160,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${color}15` }}
          >
            <span className="material-symbols-outlined text-sm" style={{ color }}>{nodeData.icon}</span>
          </div>
          <div>
            <p className="font-bold text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--on-surface)" }}>
              {nodeData.label}
            </p>
            <p className="text-[10px]" style={{ color: "var(--secondary)" }}>
              {nodeData.weight} connections
            </p>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: color, border: "none", width: 8, height: 8 }} />
    </>
  );
}
