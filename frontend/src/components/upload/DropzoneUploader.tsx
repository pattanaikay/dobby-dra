/**
 * DropzoneUploader — Drag-and-drop file upload component.
 * Glassmorphism overlay with file type icons and upload progress.
 */
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "@/lib/api";

interface DropzoneUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: (result: { filename: string; analysis: string }) => void;
}

export default function DropzoneUploader({ isOpen, onClose, onUploadComplete }: DropzoneUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setUploading(true);
    setProgress(0);

    for (const file of acceptedFiles) {
      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 90));
        }, 200);

        const result = await api.uploadDocument(file);
        clearInterval(progressInterval);
        setProgress(100);
        setUploadedFiles((prev) => [...prev, file.name]);
        onUploadComplete?.(result as { filename: string; analysis: string });
      } catch {
        // Error handled silently
      }
    }

    setUploading(false);
    setTimeout(() => setProgress(0), 1000);
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "text/x-python": [".py"],
      "application/javascript": [".js"],
      "text/typescript": [".ts"],
    },
    multiple: true,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-lg w-full mx-4 z-10">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <h3 className="text-2xl font-extrabold tracking-tighter mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Upload Documents
        </h3>
        <p className="text-sm mb-8" style={{ color: "var(--secondary)" }}>
          Drop your research papers, code files, or documents here.
        </p>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? "border-[var(--primary)] bg-[var(--primary-fixed)]/10"
              : "border-[var(--outline-variant)] hover:border-[var(--primary)]/50"
          }`}
        >
          <input {...getInputProps()} />
          <span
            className="material-symbols-outlined text-5xl mb-4"
            style={{ color: isDragActive ? "var(--primary)" : "var(--outline-variant)" }}
          >
            cloud_upload
          </span>
          <p className="font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
            {isDragActive ? "Drop files here" : "Drag & drop files"}
          </p>
          <p className="text-xs" style={{ color: "var(--secondary)" }}>
            PDF, DOCX, TXT, Python, JavaScript, TypeScript
          </p>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold" style={{ color: "var(--secondary)" }}>Uploading...</span>
              <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[var(--surface-container-high)] rounded-full overflow-hidden">
              <div className="h-full ai-pulse rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-2">
            {uploadedFiles.map((name, i) => (
              <div key={i} className="flex items-center gap-3 py-2 px-4 bg-[var(--surface-container-low)] rounded-xl">
                <span className="material-symbols-outlined text-sm" style={{ color: "#22c55e" }}>check_circle</span>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
