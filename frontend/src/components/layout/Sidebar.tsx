/**
 * Sidebar — Matches "The Curator" mockup.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DropzoneUploader from "@/components/upload/DropzoneUploader";

const NAV_ITEMS = [
  { href: "/research", label: "New Research", icon: "explore" },
  { href: "/", label: "Library", icon: "auto_stories" },
  { href: "/discovery", label: "History", icon: "history" },
  { href: "/graph", label: "Collections", icon: "folder_open" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [uploaderOpen, setUploaderOpen] = useState(false);

  return (
    <>
      <aside className="bg-slate-50 h-screen w-64 fixed left-0 top-0 border-none flex flex-col py-8 px-6 z-50">
        {/* Brand */}
        <div className="mb-12">
          <h1 className="text-xl font-bold tracking-tighter text-brand-teal-700 font-headline">
            The Curator
          </h1>
          <p className="font-headline text-sm font-medium tracking-tight text-slate-500">
            Deep Research Agent
          </p>
        </div>

        {/* Upload Document Button — Primary Blue */}
        <button
          onClick={() => setUploaderOpen(true)}
          className="w-full flex items-center space-x-3 p-3 rounded-xl bg-primary text-on-primary font-bold shadow-sm mb-6 transition-all active:opacity-80"
        >
          <span className="material-symbols-outlined">add_notes</span>
          <span className="font-headline text-sm font-medium tracking-tight">Upload Document</span>
        </button>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-brand-teal-700 font-bold border-r-2 border-brand-teal-600 bg-slate-200/50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                <span className="material-symbols-outlined">{icon}</span>
                <span className="font-headline text-sm font-medium tracking-tight">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="mt-auto pt-8 space-y-2">
          <a href="#" className="flex items-center space-x-3 p-3 rounded-xl text-slate-500 hover:bg-slate-200/50 transition-colors duration-200">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-headline text-sm font-medium tracking-tight">Settings</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-xl text-slate-500 hover:bg-slate-200/50 transition-colors duration-200">
            <span className="material-symbols-outlined">help</span>
            <span className="font-headline text-sm font-medium tracking-tight">Help</span>
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
