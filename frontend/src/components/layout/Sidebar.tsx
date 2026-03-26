/**
 * Synthetica Research — Sidebar Navigation
 * Glassmorphism sidebar with mode selector and conversation list.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Code2,
  PenTool,
  BarChart3,
  Compass,
  Library,
  Network,
  Plus,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: Search },
  { href: "/research", label: "Research", icon: Search },
  { href: "/code", label: "Code", icon: Code2 },
  { href: "/writing", label: "Writing", icon: PenTool },
  { href: "/data", label: "Data", icon: BarChart3 },
  { href: "/discovery", label: "Discovery", icon: Compass },
  { href: "/library", label: "Library", icon: Library },
  { href: "/graph", label: "Graph", icon: Network },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1
          className="text-xl font-extrabold tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Synthetica
        </h1>
        <p className="text-meta text-sm mt-1">Research Assistant</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-[var(--surface-container-lowest)] text-[var(--primary)] shadow-sm"
                  : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* New Chat Button */}
      <button className="btn-primary flex items-center justify-center gap-2 w-full mt-4">
        <Plus size={16} />
        New Chat
      </button>

      {/* Settings */}
      <button className="btn-ghost flex items-center gap-3 mt-2 text-sm">
        <Settings size={16} />
        Settings
      </button>
    </aside>
  );
}
