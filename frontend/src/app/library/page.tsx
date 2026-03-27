/**
 * Research Library — Document collection browser.
 * Matches the "Recently Saved Documents" style from the dashboard mockup.
 */
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface LibraryDoc {
  source: string;
  file_type: string;
  original_name: string;
}

const FILE_ICONS: Record<string, string> = {
  pdf: "description",
  docx: "article",
  txt: "text_snippet",
  py: "code",
  js: "javascript",
  ts: "code",
  default: "insert_drive_file",
};

export default function LibraryPage() {
  const [documents, setDocuments] = useState<LibraryDoc[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.listDocuments().then((docs) => setDocuments(docs as unknown as LibraryDoc[])).catch(() => {});
  }, []);

  const filtered = documents.filter((d) =>
    d.original_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="px-10 pb-16 pt-10 max-w-[1200px] mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-extrabold tracking-tighter mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Research Library
        </h2>
        <p className="text-lg" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>
          Browse and filter your saved research documents.
        </p>
      </header>

      {/* Search Filter */}
      <div className="relative mb-10">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input
          type="text"
          className="w-full bg-white border-none rounded-xl py-3 px-12 text-sm shadow-sm ring-1 ring-slate-100 focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none transition-all"
          placeholder="Filter documents..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>

      {/* Documents List */}
      <div className="space-y-1">
        {filtered.length > 0 ? (
          filtered.map((doc, i) => (
            <div key={i} className="flex items-center justify-between py-4 px-6 hover:bg-[var(--surface-container-low)] rounded-xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-[var(--primary)] transition-colors">
                  {FILE_ICONS[doc.file_type] || FILE_ICONS.default}
                </span>
                <div>
                  <h6 className="font-bold" style={{ fontFamily: "var(--font-display)" }}>{doc.original_name}</h6>
                  <p className="text-xs" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>
                    {doc.file_type.toUpperCase()} • {doc.source}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[var(--primary)] text-sm font-bold">Read</button>
                <button className="material-symbols-outlined text-slate-400">bookmark</button>
                <button className="material-symbols-outlined text-slate-400">more_horiz</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24">
            <span className="material-symbols-outlined text-6xl mb-6" style={{ color: "var(--outline-variant)" }}>auto_stories</span>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>No documents yet</h3>
            <p style={{ color: "var(--secondary)" }}>Upload research papers, code files, or documents to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
