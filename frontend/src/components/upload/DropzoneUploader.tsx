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

        const result = await api.uploadDocuments([file], "auto");
        clearInterval(progressInterval);
        setProgress(100);
        setUploadedFiles((prev) => [...prev, file.name]);
        if (result.length > 0) {
          onUploadComplete?.({ filename: result[0].filename, analysis: "" });
        }
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal - Following "Glass & Gradient" Rule */}
      <div className="relative bg-surface-container-lowest/80 backdrop-blur-[20px] rounded-3xl p-10 max-w-lg w-full z-10 shadow-2xl">
        {/* Close */}
        <button onClick={onClose} className="absolute top-6 right-6 text-secondary hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <h3 className="text-2xl font-extrabold tracking-tighter mb-2 font-headline">
          Upload Documents
        </h3>
        <p className="text-sm mb-8 text-secondary font-body">
          Drop your research papers, code files, or documents here.
        </p>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? "border-primary bg-primary-fixed/20"
              : "border-outline-variant/30 hover:bg-surface-container-low"
          }`}
        >
          <input {...getInputProps()} />
          <span
            className="material-symbols-outlined text-5xl mb-4"
            style={{ color: isDragActive ? "var(--primary)" : "var(--outline-variant)" }}
          >
            cloud_upload
          </span>
          <p className="font-bold mb-1 font-headline">
            {isDragActive ? "Drop files here" : "Drag & drop files"}
          </p>
          <p className="text-xs text-secondary font-body">
            PDF, DOCX, TXT, Python, JavaScript, TypeScript
          </p>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-secondary font-headline">Uploading...</span>
              <span className="text-xs font-bold text-primary font-headline">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full ai-pulse rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-2">
            {uploadedFiles.map((name, i) => (
              <div key={i} className="flex items-center gap-3 py-2 px-4 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                <span className="text-sm font-medium font-body">{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
