/**
 * Research Library — Document collection browser
 */
"use client";

import { useEffect, useState } from "react";
import { Library, FileText, Search } from "lucide-react";
import { api } from "@/lib/api";

interface LibraryDoc {
  source: string;
  file_type: string;
  original_name: string;
}

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
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10 mt-8">
        <div className="flex items-center gap-3 mb-4">
          <Library size={28} style={{ color: "var(--primary)" }} />
          <h1 className="text-3xl font-extrabold tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}>
            Research Library
          </h1>
        </div>
        <p className="text-meta">Browse and filter your saved research documents.</p>
      </header>

      {/* Filter */}
      <div className="relative mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--outline)" }} />
        <input type="text" className="research-bar pl-12 !h-12"
          placeholder="Filter documents..."
          value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? filtered.map((doc, i) => (
          <div key={i} className="research-card">
            <FileText size={20} style={{ color: "var(--primary)" }} className="mb-3" />
            <h3 className="font-semibold text-sm mb-1">{doc.original_name}</h3>
            <span className="source-badge">{doc.file_type.toUpperCase()}</span>
          </div>
        )) : (
          <div className="col-span-full text-center py-16">
            <p className="text-meta text-lg">No documents yet. Upload files to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
