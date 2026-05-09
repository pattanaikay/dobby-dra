/**
 * Dashboard — Research Library (Home)
 * Matches research_dashboard.html mockup exactly.
 */

const DIVE_IMAGES = [
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG8oEOHA9Bz6V1NgLwDLMtODUnF-5gX8ipHOyMmvZxip6c8_qV-LZHqbY9TdSNXHtWVpyWFJZ06VpLt1xbOqeA2sgEY1HLaO1rEiMPDc7gbgZYzavDVjcu6zwf9o4sg4kxJr-rsKBPIRsb8F4ZQO1G4Hn08xD_uACpm74XeHvWjqqXKwqaZIF3H-EDIhD5ECaeuz3eXTjFXaBXP_1y3xydUJSO_Jc80Kn_NAANHowYUP-_E0Nhp9-bouBix3bawd62SeGiwmfLQRoe", category: "ASTROPHYSICS", title: "The Paradox of Hawking Radiation" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVZe9drTHCfjZp1M3XNSKUwQA0u8TwKhlId5FBhD_Mt_CyWEBvzsAquOFIs3nUvlMJBi5bU6X7oCRkgBtxZLt8tEF-fvUjfwGGDL612sA8W6ya4NC9BlgNeu6meYBZd6-Z5VYx7XaIqd_LJcEcc5zmUfFJ7dEpKN16_8OiuE0jXf8mwTT9nd51UHIhm5J00EZVpJZJeFMBFWm_yJten3difXFxCEi3TSBhFrfq_kU4zBszu9FNpjyWFDqFsF2RyC9pnjN4mt73kjmN", category: "MATERIALS", title: "Non-Euclidean Crystal Lattices" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO4mTTspXtFAr6Ma5LBJ8t76wCYr5Bs2Ev2CWfme0DYE-c7M-wBKWOTFIgo9D1wR0OywUXb3muyIwaN6s09jaZYE6yy8XcAraHDS6HsVXHIASyTYgzOM4eo4boQ3dLu-7LnBafOMeBrI6_hTgRyOvhV70J00VTRYa_HLC_SmLg2-e8I--ZxzEg8VXo0yPNeKwtqgwl03SeOyFFKSJ41U9DH4jdpwNt8rI3KjV0SR_oY3b_JzCwb3rv9M6qEGFtaMj4jDNUveR8-UZ8", category: "PHILOSOPHY", title: "Stoic Epistemology in Modern AI" },
];

const SAVED_DOCS = [
  { icon: "description", title: "The 2024 Global Energy Transition Report", meta: "PDF • 14.2 MB • Saved 1d ago" },
  { icon: "link", title: "Ethics of Large Language Models (Nature)", meta: "Web Article • Saved 3d ago" },
  { icon: "movie", title: "Symposium: The Future of Quantum Computing", meta: "Video Transcript • Saved 5d ago" },
];

export default function DashboardPage() {
  return (
    <section className="pt-24 px-16 pb-16 max-w-[1400px] mx-auto">
      {/* Hero Heading */}
      <div className="mb-16">
        <h2 className="font-headline font-extrabold text-5xl tracking-tighter text-on-surface mb-4">Research Library</h2>
        <p className="font-body text-secondary text-lg max-w-2xl leading-relaxed">Your digital repository for synthesized insights, deep dives, and architectural knowledge projects.</p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Main Featured Project (Large) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-10 group relative overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-outline-variant/20 shadow-sm">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider font-headline">ACTIVE AGENT</span>
                <div className="h-1 w-24 ai-pulse rounded-full"></div>
              </div>
              <h3 className="font-headline font-bold text-3xl text-on-surface mb-4">The Architecture of Quantum Biology</h3>
              <p className="font-body text-secondary text-base leading-relaxed max-w-xl">Investigating how non-trivial quantum effects like coherence and tunneling influence photosynthetic energy transfer and olfactory sensing.</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-4xl group-hover:text-primary transition-colors">science</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-50 pt-8">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtyMt4_nNYT8ljn8xnCi_935Ds-RsB5uU21TZjbthsdEHlzk0ehuI_8OBSCRreq7L6xWo-4TWMILKbKqjz_0OI-Mm3IZ8kgq4D_805UEfj_GqOE54e96pAF4MAc9KJ6aC3G6C-V9pLT7_GsoMOncjDVW_9AaTbYGPscwGsrxeiDW36-STzvShH2Ul82bmZVgz_dqoE4ZmFJndcfI-MEQyEH7EWaAOmz5ZH-P3oX2Ag5_UDu5gZC2Pq3mzHfZUJkXOpGSkQbhvmD8xj" alt="Contributor" />
              <img className="w-10 h-10 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK7zfpvZww2RWMEDTG3IqDxOY_yk4nmD3TZ9C8sW_XOL9NX0J4FsaL24ef6_R_K08mcFeRuoeuCrbkMeSxtE4SspEXD9UxPEEpB6k-SI6FoySdonRL9uDuRzPB2U-Z6pB6XrNcTOoH3YFTrmT6SXFa2m6DjZUZZcB1IDv1ryRXYvEZmgPeFcUMfqy739mmFPrZTwo_DtZiErXZp2dbiUApJ4P1zmMeH8nKkJzoIWC5jMzWAxJHSiP6XaQkcbR7_Fnj_060IvEiWavr" alt="Contributor" />
              <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[10px] font-bold">+4</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-body text-secondary flex items-center gap-1"><span className="material-symbols-outlined text-sm">history</span> Updated 2h ago</span>
              <span className="text-primary font-bold text-sm cursor-pointer hover:underline underline-offset-4">Open Project</span>
            </div>
          </div>
        </div>

        {/* Secondary Card */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-3xl p-8 transition-all hover:bg-surface-container-high">
          <div className="bg-surface-container-lowest w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
          </div>
          <h4 className="font-headline font-bold text-xl text-on-surface mb-3">Urban Sprawl & Microbiomes</h4>
          <p className="font-body text-sm text-secondary leading-relaxed mb-8">Analyzing the correlation between city density and soil microbial diversity across major global metropolises.</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-tertiary px-2 py-1 bg-tertiary-fixed rounded">Ready</span>
            <span className="material-symbols-outlined text-secondary hover:text-primary cursor-pointer">more_horiz</span>
          </div>
        </div>

        {/* Horizontal Summary Cards */}
        {[
          { status: "RESEARCHING...", statusPulse: true, title: "Medieval Financial Instruments", desc: "Exploring the evolution of the bill of exchange during the 13th-century commercial revolution." },
          { status: "READY", statusPulse: false, title: "Deep Sea Mineral Policy", desc: "Summary of the International Seabed Authority's latest regulatory framework proposals." },
          { status: "READY", statusPulse: false, title: "Aesthetic Neural Processing", desc: "Recent findings in neuroaesthetics regarding symmetry and the human reward system." },
        ].map((card, i) => (
          <div key={i} className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-3xl p-8 transition-all hover:ring-1 hover:ring-outline-variant/20 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              {card.statusPulse && <div className="w-2 h-2 rounded-full bg-primary ai-pulse"></div>}
              <span className="text-[10px] font-bold tracking-widest text-secondary uppercase">{card.status}</span>
            </div>
            <h4 className="font-headline font-bold text-lg text-on-surface mb-2">{card.title}</h4>
            <p className="font-body text-sm text-secondary line-clamp-2">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Suggested Deep Dives */}
      <div className="mt-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h3 className="font-headline font-extrabold text-3xl tracking-tight mb-2">Suggested Deep Dives</h3>
            <p className="font-body text-secondary">Serendipitous directions for your next research session.</p>
          </div>
          <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
            Refresh Suggestions <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DIVE_IMAGES.map((dive, i) => (
            <div key={i} className="relative group h-64 rounded-3xl overflow-hidden cursor-pointer shadow-lg">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={dive.src} alt={dive.title} />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="text-[10px] font-bold text-white/80 bg-white/10 backdrop-blur-md px-2 py-1 rounded mb-3 inline-block uppercase tracking-wider">{dive.category}</span>
                <h5 className="text-white font-headline font-bold text-xl leading-tight">{dive.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Saved Documents */}
      <div className="mt-24 mb-16">
        <h3 className="font-headline font-extrabold text-2xl tracking-tight mb-8">Recently Saved Documents</h3>
        <div className="space-y-1">
          {SAVED_DOCS.map((doc, i) => (
            <div key={i} className="flex items-center justify-between py-4 px-6 hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">{doc.icon}</span>
                <div>
                  <h6 className="font-headline font-bold text-on-surface">{doc.title}</h6>
                  <p className="text-xs text-secondary font-body">{doc.meta}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-primary text-sm font-bold">Read</button>
                <button className="material-symbols-outlined text-slate-400">bookmark</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
