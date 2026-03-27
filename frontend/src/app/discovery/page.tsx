/**
 * Deep Dive Discovery — Matches deep_dive_discovery.html mockup.
 * Full-bleed image cards, hover animations, cross-pollination bento grid.
 */
"use client";

const DISCOVERY_PATHS = [
  {
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000",
    category: "Theoretical Physics",
    categoryIcon: "query_stats",
    title: "Quantum Entanglement",
    desc: 'Explore the "spooky action at a distance" that Einstein questioned and how it\'s shaping the future of computing.',
    readTime: "8 min deep read",
    btnColor: "var(--primary)",
    categoryColor: "var(--primary-fixed-dim)",
  },
  {
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000",
    category: "Global History",
    categoryIcon: "sailing",
    title: "Ancient Maritime Routes",
    desc: "Trace the spice routes that connected empires and the lost technologies of ancient seafaring navigation.",
    readTime: "12 min deep read",
    btnColor: "var(--tertiary)",
    categoryColor: "var(--tertiary-fixed)",
  },
];

export default function DiscoveryPage() {
  return (
    <div className="px-16 pb-16 pt-8 min-h-screen">
      {/* Header Section */}
      <header className="max-w-4xl mb-16">
        <div
          className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-6 uppercase tracking-wider"
          style={{
            background: "var(--tertiary-fixed)",
            color: "var(--on-tertiary-fixed-variant)",
            fontFamily: "var(--font-display)",
          }}
        >
          Deep Dive Discovery
        </div>
        <h2 className="text-5xl font-extrabold leading-tight tracking-tighter mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Choose Your <span style={{ color: "var(--primary)" }}>Intellectual</span> Frontier.
        </h2>
        <p className="text-lg max-w-2xl" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)" }}>
          The Curator has synthesized two distinct paths of inquiry. Where will your curiosity lead you today?
        </p>
      </header>

      {/* The Split Discovery Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12" style={{ height: "665px" }}>
        {DISCOVERY_PATHS.map((path, i) => (
          <div key={i} className="relative group overflow-hidden rounded-[2rem] bg-[var(--surface-container-low)] transition-all duration-700 hover:translate-y-[-8px]">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e]/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={path.image} alt={path.title} />
            {/* Content */}
            <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
              <div className="mb-4 flex items-center space-x-2">
                <span className="material-symbols-outlined" style={{ color: path.categoryColor }}>{path.categoryIcon}</span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: path.categoryColor, fontFamily: "var(--font-display)" }}>
                  {path.category}
                </span>
              </div>
              <h3 className="text-white text-4xl font-extrabold mb-4 leading-none" style={{ fontFamily: "var(--font-display)" }}>
                {path.title}
              </h3>
              <p className="text-slate-300 text-sm max-w-sm mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0"
                style={{ fontFamily: "var(--font-body)" }}>
                {path.desc}
              </p>
              <div className="flex items-center space-x-4 translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-200">
                <button
                  className="text-white px-8 py-3 rounded-full font-bold text-sm flex items-center space-x-2 active:scale-95 transition-transform"
                  style={{ background: path.btnColor, fontFamily: "var(--font-display)", boxShadow: `0 10px 25px -5px ${path.btnColor}33` }}
                >
                  <span>Dive In</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <span className="text-white/60 text-xs font-medium">{path.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Cross-Pollination Section */}
      <section className="mt-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h4 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Cross-Pollination</h4>
            <p className="text-sm mt-1" style={{ color: "var(--secondary)" }}>AI-generated connections between your active paths</p>
          </div>
          <button className="text-[var(--primary)] text-sm font-bold flex items-center space-x-1 group">
            <span>View Network Graph</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">schema</span>
          </button>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {/* Large Asymmetric Card */}
          <div className="col-span-12 md:col-span-8 bg-[var(--surface-container-low)] rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center border border-[var(--outline-variant)]/10">
            <div className="md:w-1/2">
              <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--secondary)" }}>The Paradox Connection</div>
              <h5 className="text-2xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Quantum Mechanics in Biological Navigation?
              </h5>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--on-surface-variant)" }}>
                Recent studies suggest that ancient migratory species may have utilized quantum radical pairs for magnetoreception—navigating those very same maritime routes.
              </p>
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[var(--primary)] text-white flex items-center justify-center text-[10px] font-bold">+12</div>
              </div>
            </div>
            <div className="md:w-1/2 h-full min-h-[200px] w-full bg-[var(--surface-container)] rounded-2xl overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src="https://images.unsplash.com/photo-1501166617713-a1b9d0e72f98?q=80&w=1000" alt="Quantum Biology" />
            </div>
          </div>

          {/* AI Synthesis Card */}
          <div className="col-span-12 md:col-span-4 bg-[var(--primary)] text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
              <div className="h-full bg-white/60 w-1/3"></div>
            </div>
            <div className="z-10">
              <span className="material-symbols-outlined text-4xl mb-4">auto_awesome</span>
              <h5 className="text-xl font-bold mb-2 leading-tight" style={{ fontFamily: "var(--font-display)" }}>AI Synthesis in Progress...</h5>
              <p className="text-white/80 text-sm">Finding intersections between trade economics and wave-particle duality.</p>
            </div>
            <div className="mt-8 z-10">
              <button className="bg-white/10 hover:bg-white/20 py-2 px-4 rounded-lg text-xs font-bold transition-all w-full text-center">Notify me when ready</button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl"></div>
          </div>

          {/* Three Small Info Cards */}
          {[
            { icon: "book", title: "Source: The Silk Sea", desc: "Historical record of Monsoon-driven trade.", action: "Read Excerpt", actionIcon: "open_in_new" },
            { icon: "science", title: "Dataset: Planck's Scale", desc: "Live telemetry from CERN simulation labs.", action: "Explore Data", actionIcon: "bar_chart" },
            { icon: "podcasts", title: "Audio: Infinite Monkey Cage", desc: "Discussion on the reality of time.", action: "Listen Now", actionIcon: "play_circle" },
          ].map((card, i) => (
            <div key={i} className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6 border border-[var(--outline-variant)]/5">
              <span className="material-symbols-outlined mb-3" style={{ color: "var(--secondary)" }}>{card.icon}</span>
              <h6 className="font-bold text-sm mb-1">{card.title}</h6>
              <p className="text-xs mb-4" style={{ color: "var(--on-surface-variant)" }}>{card.desc}</p>
              <a className="text-[var(--primary)] text-xs font-bold inline-flex items-center" href="#">
                {card.action} <span className="material-symbols-outlined text-xs ml-1">{card.actionIcon}</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
