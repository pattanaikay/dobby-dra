/**
 * TopNavBar — Glassmorphism header.
 */
"use client";

export default function TopNavBar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-200/50 flex justify-between items-center h-16 px-8">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-extrabold text-brand-teal-700 font-headline tracking-tight">The Intellectual Canvas</span>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text" 
            className="bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all" 
            placeholder="Explore concepts..."
          />
        </div>
        
        <button className="text-slate-500 hover:text-brand-teal-600 transition-all">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-slate-500 hover:text-brand-teal-600 transition-all">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
