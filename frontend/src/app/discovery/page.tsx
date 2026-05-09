/**
 * Deep Dive Discovery — Matches deep_dive_discovery.html mockup exactly.
 */
"use client";

const DISCOVERY_PATHS = [
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAarhAC2qQbt4qwYps-fufNmIB5AmAm1PjzLrm9UcoYsf0UXfaAfjTHuffWPy2lEoeNOlzQOkA8wThVbSXp8JKu5bdJiNElXoH61bK8fYzNOghpEy__XI1-yuVKiC8ALHXoY9sQp0gLsyoQHSE75nDEk37_cfdTsIUEEEWSjpZXly5f3CfGmc6l7bucz72wSczN6jtC2OLhr22QxkIU7jRD2CIdoNXAPml3pmKRQ-ijOTSDOTA4q8r2PJwPGyx6jymfHoXAaR7cDm43",
    category: "Theoretical Physics",
    categoryIcon: "query_stats",
    title: "Quantum Entanglement",
    desc: 'Explore the "spooky action at a distance" that Einstein questioned and how it\'s shaping the future of computing.',
    readTime: "8 min deep read",
    btnColor: "#0453cd", // Primary
    categoryColor: "#dae2ff", // Primary fixed
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH2v1P4-4dfhcMQ_3dYFGrx2At1JOBKkuEy9CWhT_U0ZYHTe_0lM2aaDMxtb1GLh9d-egca_kW5SumnlFUR4d2AGcAzcvmbZCfCQqurKamzJ7OtS7i0F8G2RnYhJz_hlkNeeIOy94brvx4r-PvjYNc3jFaleacgXi1KC5vv4A75HOE48CfLykkGTFPZoC-t4P9Ykg8IqcvtB4k_PbKSynu1SDzOAxt4I8OOQENL-iaL0EpAzFn12hksjINyFA4E6mNuTBts_1TQN8e",
    category: "Global History",
    categoryIcon: "sailing",
    title: "Ancient Maritime Routes",
    desc: "Trace the spice routes that connected empires and the lost technologies of ancient seafaring navigation.",
    readTime: "12 min deep read",
    btnColor: "#924628", // Tertiary
    categoryColor: "#ffdbce", // Tertiary fixed
  },
];

export default function DiscoveryPage() {
  return (
    <main className="pt-24 pb-16 px-16 min-h-screen max-w-[1400px] mx-auto">
      {/* Header Section with Editorial Impact */}
      <header className="max-w-4xl mb-16">
        <div className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold rounded-full mb-6 font-headline tracking-wider uppercase">
          Deep Dive Discovery
        </div>
        <h2 className="text-5xl font-extrabold font-headline leading-tight tracking-tighter text-on-background mb-4">
          Choose Your <span className="text-primary">Intellectual</span> Frontier.
        </h2>
        <p className="text-lg text-secondary font-body max-w-2xl leading-relaxed">
          The Curator has synthesized two distinct paths of inquiry. Where will your curiosity lead you today?
        </p>
      </header>

      {/* The Split Discovery Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[665px]">
        {DISCOVERY_PATHS.map((path, i) => (
          <div key={i} className="relative group overflow-hidden rounded-[2rem] bg-surface-container-low transition-all duration-700 hover:translate-y-[-8px] shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={path.image} alt={path.title} />
            <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
              <div className="mb-4 flex items-center space-x-2">
                <span className="material-symbols-outlined" style={{ color: path.categoryColor }}>{path.categoryIcon}</span>
                <span className="text-xs font-bold font-headline uppercase tracking-widest" style={{ color: path.categoryColor }}>{path.category}</span>
              </div>
              <h3 className="text-white text-4xl font-extrabold font-headline mb-4 leading-none tracking-tighter">{path.title}</h3>
              <p className="text-slate-300 text-sm font-body max-w-sm mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                {path.desc}
              </p>
              <div className="flex items-center space-x-4 translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-200">
                <button 
                  className="px-8 py-3 rounded-full font-headline font-bold text-sm flex items-center space-x-2 shadow-xl active:scale-95 transition-transform"
                  style={{ backgroundColor: path.btnColor, color: "white" }}
                >
                  <span>Dive In</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider">{path.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Cross-Pollination Bento Grid */}
      <section className="mt-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h4 className="text-2xl font-bold font-headline text-on-background tracking-tight">Cross-Pollination</h4>
            <p className="text-secondary text-sm mt-1">AI-generated connections between your active paths</p>
          </div>
          <button className="text-primary text-sm font-bold flex items-center space-x-1 group">
            <span>View Network Graph</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">schema</span>
          </button>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 bg-surface-container-low rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center border border-outline-variant/10 shadow-sm">
            <div className="md:w-1/2">
              <div className="text-xs font-bold text-secondary mb-3 uppercase tracking-widest">The Paradox Connection</div>
              <h5 className="text-2xl font-bold font-headline mb-4 leading-tight tracking-tight">Quantum Mechanics in Biological Navigation?</h5>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-body">
                Recent studies suggest that ancient migratory species may have utilized quantum radical pairs for magnetoreception—navigating those very same maritime routes.
              </p>
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold">+12</div>
              </div>
            </div>
            <div className="md:w-1/2 h-full min-h-[200px] w-full bg-surface-container rounded-2xl overflow-hidden relative">
              <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3RO-Xk0rbo97teUCmKTuBRPtrVuRHFHr0d6Pavxy7mOZf8C0gtRkOYcoc7zo84AFryVtxOcv89VvXTGPKNB-0dFlysWD0KwZxiJBTypQZQGK1giFkr24VWJBbXaRYZfSjwcDAwbzwUgHmCHCIphNqUjUcqDfl2k-0SXc6LIhT72gF5Amg8BD7dbyjXlum_WJXOKC5DXyQWKLWK5nhQ8Z_GRY3Py2GfSVnpZiOrhaKDbillLThUOXNckjN0ymt62hBY_7EMJtwuYnM" alt="Quantum Biology" />
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-4 bg-primary text-on-primary rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
              <div className="h-full bg-white/60 w-1/3"></div>
            </div>
            <div className="z-10">
              <span className="material-symbols-outlined text-4xl mb-4">auto_awesome</span>
              <h5 className="text-xl font-bold font-headline mb-2 leading-tight">AI Synthesis in Progress...</h5>
              <p className="text-on-primary/80 text-sm font-body">Finding intersections between trade economics and wave-particle duality.</p>
            </div>
            <div className="mt-8 z-10">
              <button className="bg-white/10 hover:bg-white/20 py-2 px-4 rounded-lg text-xs font-bold transition-all w-full text-center">Notify me when ready</button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl"></div>
          </div>
          
          {[
            { icon: "book", title: "Source: The Silk Sea", desc: "Historical record of Monsoon-driven trade.", action: "Read Excerpt", actionIcon: "open_in_new" },
            { icon: "science", title: "Dataset: Planck's Scale", desc: "Live telemetry from CERN simulation labs.", action: "Explore Data", actionIcon: "bar_chart" },
            { icon: "podcasts", title: "Audio: Infinite Monkey Cage", desc: "Discussion on the reality of time.", action: "Listen Now", actionIcon: "play_circle" },
          ].map((card, i) => (
            <div key={i} className="col-span-12 md:col-span-4 bg-surface-container-lowest shadow-sm rounded-2xl p-6 border border-outline-variant/5 hover:bg-surface-container-low transition-all">
              <span className="material-symbols-outlined text-secondary mb-3">{card.icon}</span>
              <h6 className="font-headline font-bold text-sm mb-1">{card.title}</h6>
              <p className="text-on-surface-variant text-xs mb-4 font-body">{card.desc}</p>
              <a className="text-primary text-xs font-bold inline-flex items-center hover:underline" href="#">
                {card.action} <span className="material-symbols-outlined text-xs ml-1">{card.actionIcon}</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
