/**
 * Dashboard Page — Research Dashboard (Home)
 * Landing page with recent research, conversations, and quick actions.
 */
import { Search, ArrowRight, FileText, Globe, FolderGit2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Hero */}
      <section className="mb-16 mt-8">
        <h1
          className="text-5xl font-extrabold tracking-tighter mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Choose Your
          <br />
          Intellectual Frontier
        </h1>
        <p className="text-meta text-lg max-w-xl">
          Begin a deep dive into any topic. Upload papers, explore knowledge
          graphs, or continue where you left off.
        </p>
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: FileText,
            title: "Upload Documents",
            desc: "PDF, DOCX, code files",
            href: "/research",
          },
          {
            icon: Globe,
            title: "Web Research",
            desc: "Analyze URLs and papers",
            href: "/research",
          },
          {
            icon: FolderGit2,
            title: "Analyze Repository",
            desc: "Code review & docs",
            href: "/code",
          },
        ].map(({ icon: Icon, title, desc, href }) => (
          <a
            key={title}
            href={href}
            className="research-card group flex flex-col gap-4 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div
                className="p-3 rounded-xl"
                style={{ background: "var(--surface-container-low)" }}
              >
                <Icon size={24} style={{ color: "var(--primary)" }} />
              </div>
              <ArrowRight
                size={18}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-meta">{desc}</p>
            </div>
          </a>
        ))}
      </section>

      {/* Research Bar */}
      <section className="mb-16">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2"
            style={{ color: "var(--outline)" }}
          />
          <input
            type="text"
            className="research-bar pl-14"
            placeholder="Start a new research session..."
          />
        </div>
      </section>

      {/* Placeholder for recent research cards */}
      <section>
        <h2
          className="text-2xl font-extrabold tracking-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Recent Research
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="research-card">
              <div className="source-badge mb-4">No recent sessions</div>
              <p className="text-meta">
                Start a research session to see it here.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
