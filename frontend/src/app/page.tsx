/**
 * Dashboard — Research Library (Home)
 * Matches research_dashboard.html Stitch mockup:
 * Bento grid, featured project, deep dive image cards, document list.
 */

// Unsplash images from VisualAssetsGuide.md
const DIVE_IMAGES = [
  { src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000", category: "ASTROPHYSICS", title: "The Paradox of Hawking Radiation" },
  { src: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000", category: "MATERIALS", title: "Non-Euclidean Crystal Lattices" },
  { src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000", category: "PHILOSOPHY", title: "Stoic Epistemology in Modern AI" },
];

const SAVED_DOCS = [
  { icon: "description", title: "The 2024 Global Energy Transition Report", meta: "PDF • 14.2 MB • Saved 1d ago" },
  { icon: "link", title: "Ethics of Large Language Models (Nature)", meta: "Web Article • Saved 3d ago" },
  { icon: "movie", title: "Symposium: The Future of Quantum Computing", meta: "Video Transcript • Saved 5d ago" },
];

export default function DashboardPage() {
  return (
    <section className="px-16 pb-16 pt-8 max-w-[1400px] mx-auto">
      {/* Hero Heading */}
      <div className="mb-16">
        <h2 className="text-5xl font-extrabold tracking-tighter mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Research Library
        </h2>
        <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>
          Your digital repository for synthesized insights, deep dives, and architectural knowledge projects.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Main Featured Project (Large) */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-10 group relative overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-[var(--outline-variant)]/20">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-bold tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
                  ACTIVE AGENT
                </span>
                <div className="h-1 w-24 ai-pulse rounded-full"></div>
              </div>
              <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                The Architecture of Quantum Biology
              </h3>
              <p className="text-base leading-relaxed max-w-xl" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>
                Investigating how non-trivial quantum effects like coherence and tunneling influence photosynthetic energy transfer and olfactory sensing.
              </p>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-4xl group-hover:text-[var(--primary)] transition-colors">
              science
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-50 pt-8">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-[var(--surface-container-high)] border-2 border-white flex items-center justify-center text-[10px] font-bold">+4</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm flex items-center gap-1" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>
                <span className="material-symbols-outlined text-sm">history</span>
                Updated 2h ago
              </span>
              <span className="text-[var(--primary)] font-bold text-sm cursor-pointer hover:underline underline-offset-4">Open Project</span>
            </div>
          </div>
        </div>

        {/* Secondary Card */}
        <div className="col-span-12 lg:col-span-4 bg-[var(--surface-container-low)] rounded-xl p-8 transition-all hover:bg-[var(--surface-container-high)] border-none">
          <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[var(--primary)]">auto_awesome</span>
          </div>
          <h4 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Urban Sprawl &amp; Microbiomes
          </h4>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>
            Analyzing the correlation between city density and soil microbial diversity across major global metropolises.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2 py-1 rounded" style={{ color: "var(--tertiary)", background: "var(--tertiary-fixed)" }}>Ready</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-[var(--primary)] transition-colors" style={{ color: "var(--secondary)" }}>more_horiz</span>
          </div>
        </div>

        {/* Three Row Cards */}
        {[
          { status: "RESEARCHING...", statusPulse: true, title: "Medieval Financial Instruments", desc: "Exploring the evolution of the bill of exchange during the 13th-century commercial revolution." },
          { status: "READY", statusPulse: false, title: "Deep Sea Mineral Policy", desc: "Summary of the International Seabed Authority's latest regulatory framework proposals." },
          { status: "READY", statusPulse: false, title: "Aesthetic Neural Processing", desc: "Recent findings in neuroaesthetics regarding symmetry and the human reward system." },
        ].map((card, i) => (
          <div key={i} className="col-span-12 lg:col-span-4 bg-white rounded-xl p-8 transition-all hover:ring-1 hover:ring-[var(--outline-variant)]/20">
            <div className="flex items-center gap-4 mb-4">
              {card.statusPulse && <div className="w-2 h-2 rounded-full ai-pulse"></div>}
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--secondary)" }}>{card.status}</span>
            </div>
            <h4 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{card.title}</h4>
            <p className="text-sm line-clamp-2" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Suggested Deep Dives */}
      <div className="mt-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight mb-2" style={{ fontFamily: "var(--font-display)" }}>Suggested Deep Dives</h3>
            <p style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>Serendipitous directions for your next research session.</p>
          </div>
          <button className="text-[var(--primary)] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
            Refresh Suggestions <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DIVE_IMAGES.map((dive, i) => (
            <div key={i} className="relative group h-64 rounded-xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={dive.src} alt={dive.title} />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="text-[10px] font-bold text-white/80 bg-white/10 backdrop-blur-md px-2 py-1 rounded mb-3 inline-block">{dive.category}</span>
                <h5 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>{dive.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Saved Documents */}
      <div className="mt-24 mb-16">
        <h3 className="text-2xl font-extrabold tracking-tight mb-8" style={{ fontFamily: "var(--font-display)" }}>Recently Saved Documents</h3>
        <div className="space-y-1">
          {SAVED_DOCS.map((doc, i) => (
            <div key={i} className="flex items-center justify-between py-4 px-6 hover:bg-[var(--surface-container-low)] rounded-xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-[var(--primary)] transition-colors">{doc.icon}</span>
                <div>
                  <h6 className="font-bold" style={{ fontFamily: "var(--font-display)" }}>{doc.title}</h6>
                  <p className="text-xs" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>{doc.meta}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[var(--primary)] text-sm font-bold">Read</button>
                <button className="material-symbols-outlined text-slate-400">bookmark</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
