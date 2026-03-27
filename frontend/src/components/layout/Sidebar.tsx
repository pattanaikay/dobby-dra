/**
 * Sidebar — Matches Stitch "The Curator" mockup.
 * Teal accents, 4 nav items, Upload Document button with DropzoneUploader.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DropzoneUploader from "@/components/upload/DropzoneUploader";

const NAV_ITEMS = [
  { href: "/research", label: "New Research", icon: "add_notes" },
  { href: "/", label: "Library", icon: "auto_stories" },
  { href: "/discovery", label: "History", icon: "history" },
  { href: "/graph", label: "Collections", icon: "folder_open" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [uploaderOpen, setUploaderOpen] = useState(false);

  return (
    <>
      <aside className="bg-slate-50 h-screen w-64 fixed left-0 top-0 border-r-0 flex flex-col py-8 px-6 z-40">
        {/* Brand */}
        <div className="mb-10">
          <h1 className="text-xl font-bold tracking-tighter text-teal-700" style={{ fontFamily: "var(--font-display)" }}>
            The Curator
          </h1>
          <p className="text-xs text-slate-500 font-medium" style={{ fontFamily: "var(--font-display)" }}>
            Deep Research Agent
          </p>
        </div>

        {/* Upload Document Button */}
        <button
          onClick={() => setUploaderOpen(true)}
          className="mb-8 w-full py-3 px-4 bg-[var(--primary)] text-white rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="material-symbols-outlined text-lg">add_notes</span>
          Upload Document
        </button>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium tracking-tight ${
                  isActive
                    ? "text-teal-700 font-bold border-r-2 border-teal-600 bg-slate-200/50"
                    : "text-slate-500 hover:bg-slate-200/50"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="material-symbols-outlined">{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="pt-6 border-t border-slate-200/50 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-200/50 transition-all text-sm font-medium"
            style={{ fontFamily: "var(--font-display)" }}>
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-200/50 transition-all text-sm font-medium"
            style={{ fontFamily: "var(--font-display)" }}>
            <span className="material-symbols-outlined">help</span>
            Help
          </a>
        </div>
      </aside>

      {/* Upload Modal */}
      <DropzoneUploader
        isOpen={uploaderOpen}
        onClose={() => setUploaderOpen(false)}
        onUploadComplete={(result) => {
          console.log("Upload complete:", result);
        }}
      />
    </>
  );
}
