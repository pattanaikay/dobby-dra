/**
 * Research Library — Document collection browser.
 * Matches the "Recently Saved Documents" style from the dashboard mockup.
 */
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { DocumentInfo } from "@/types";

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
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.listDocuments().then((docs) => setDocuments(docs)).catch(() => {});
  }, []);

  const filtered = documents.filter((d) =>
    d.filename.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="px-16 pb-16 pt-24 max-w-[1400px] mx-auto">
      <header className="mb-12">
        <h2 className="text-5xl font-extrabold tracking-tighter mb-4 font-headline text-on-surface">
          Research Library
        </h2>
        <p className="text-lg text-secondary font-body max-w-2xl leading-relaxed">
          Browse and filter your saved research documents, synthesized insights, and architectural knowledge projects.
        </p>
      </header>

      {/* Search Filter */}
      <div className="relative mb-10">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input
          type="text"
          className="w-full bg-surface-container-low border-none rounded-xl py-3 px-12 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all font-body"
          placeholder="Filter documents..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Documents List */}
      <div className="space-y-1">
        {filtered.length > 0 ? (
          filtered.map((doc, i) => (
            <div key={i} className="flex items-center justify-between py-4 px-6 hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                  {FILE_ICONS[doc.file_type] || FILE_ICONS.default}
                </span>
                <div>
                  <h6 className="font-headline font-bold text-on-surface">{doc.filename}</h6>
                  <p className="text-xs text-secondary font-body">
                    {doc.file_type.toUpperCase()} • {doc.status.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-primary text-sm font-bold">Read</button>
                <button className="material-symbols-outlined text-slate-400">bookmark</button>
                <button className="material-symbols-outlined text-slate-400">more_horiz</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24">
            <span className="material-symbols-outlined text-6xl mb-6 text-outline-variant">auto_stories</span>
            <h3 className="text-xl font-bold mb-2 font-headline">No documents yet</h3>
            <p className="text-secondary font-body">Upload research papers, code files, or documents to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
