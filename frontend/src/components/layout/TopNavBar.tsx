/**
 * TopNavBar — Glassmorphism header from Stitch mockup.
 * Fixed position, search pill, notifications, avatar.
 */
"use client";

export default function TopNavBar() {
  return (
    <header className="fixed top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-200/50 flex justify-between items-center h-16 px-8" style={{ left: "16rem", right: 0 }}>
      {/* Left: Page Title */}
      <span
        className="text-lg font-extrabold text-teal-700 tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The Intellectual Canvas
      </span>

      {/* Right: Search + Actions */}
      <div className="flex items-center gap-6">
        {/* Search Pill */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            className="bg-[var(--surface-container-low)] border-none rounded-full py-2 px-10 text-sm w-64 focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
            placeholder="Search research..."
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:text-teal-500 transition-all flex items-center">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="hover:text-teal-500 transition-all flex items-center">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}
