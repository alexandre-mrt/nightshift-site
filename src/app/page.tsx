import Link from "next/link";
import TerminalHero from "@/components/TerminalHero";
import MermaidDiagram from "@/components/MermaidDiagram";

/* ─── Stats ─── */
const stats = [
  { value: "6-8h", label: "Autonomous runtime" },
  { value: "7", label: "Specialized agents" },
  { value: "3+", label: "Audit cycles" },
  { value: "Zero", label: "Hallucination tolerance" },
];

/* ─── Features ─── */
const features = [
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-1.053M18 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM10.5 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
    title: "Specialized Agents",
    description:
      "Seven purpose-built agents — coder, tester, QA, fixer, code reviewer, security reviewer — each with focused system prompts and isolated contexts.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
        />
      </svg>
    ),
    title: "GAN-Inspired QA",
    description:
      "night-qa evaluates against sprint contracts while night-fixer iterates on issues — an adversarial loop that drives quality up each cycle.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
        />
      </svg>
    ),
    title: "Worktree Isolation",
    description:
      "Each agent works in its own git worktree. No merge conflicts, no stepping on each other's code. Parallel execution without interference.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
    title: "Anti-Hallucination Protocol",
    description:
      "Never guess, always verify. Every agent logs uncertainties, cross-references outputs, and flags anything it cannot confirm from source.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
    title: "Persistent State via Ralph-Loop",
    description:
      "Fresh Claude context each iteration, but state persists in NIGHT_SHIFT_STATE.md. The loop reads, works, writes — never loses progress.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
    title: "Multi-Pass Audit",
    description:
      "Three or more review cycles with cross-validation before any PR is opened. Code review, security review, and adversarial debugging in V3.",
  },
];

/* ─── Mermaid chart ─── */
const pipelineChart = `graph LR
  A["Spec"] --> B["Plan"]
  B --> C["Code"]
  C --> D["Test"]
  D --> E["QA"]
  E -->|issues| F["Fix"]
  F --> C
  E -->|pass| G["Audit"]
  G --> H["PR"]

  style A fill:#3b82f6,stroke:#2563eb,color:#fff
  style B fill:#6366f1,stroke:#4f46e5,color:#fff
  style C fill:#18181b,stroke:#3f3f46,color:#e4e4e7
  style D fill:#18181b,stroke:#3f3f46,color:#e4e4e7
  style E fill:#18181b,stroke:#3f3f46,color:#e4e4e7
  style F fill:#f59e0b,stroke:#d97706,color:#18181b
  style G fill:#8b5cf6,stroke:#7c3aed,color:#fff
  style H fill:#10b981,stroke:#059669,color:#fff
`;

export default function Home() {
  return (
    <div>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden">
        {/* Background: subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%),
              linear-gradient(rgba(63,63,70,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(63,63,70,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          }}
        />

        {/* Floating code fragments — decorative */}
        <div className="pointer-events-none absolute left-[10%] top-[15%] font-mono text-xs text-zinc-700/40 select-none">
          {"fn spawn_agent()"}
        </div>
        <div className="pointer-events-none absolute right-[12%] top-[25%] font-mono text-xs text-zinc-700/40 select-none">
          {"state.persist()"}
        </div>
        <div className="pointer-events-none absolute left-[8%] bottom-[20%] font-mono text-xs text-zinc-700/40 select-none">
          {"worktree.isolate()"}
        </div>
        <div className="pointer-events-none absolute right-[15%] bottom-[30%] font-mono text-xs text-zinc-700/40 select-none">
          {"audit.verify()"}
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
          {/* Tagline area */}
          <div className="mb-10 text-center sm:mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/60 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Built on Claude Code
            </div>

            <h1 className="mb-5 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="block">Ship features</span>
              <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                while you sleep.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              NightShift is an autonomous overnight coding system. Push a spec
              before bed, wake up to a review-ready PR. Seven specialized agents
              collaborate through iterative loops with multi-pass auditing.
            </p>
          </div>

          {/* Terminal animation */}
          <TerminalHero />
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="border-y border-zinc-800/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-zinc-800/60 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="group px-4 py-8 text-center transition-colors hover:bg-zinc-900/40 sm:px-6 sm:py-10"
            >
              <div className="mb-1 font-mono text-3xl font-bold text-white transition-colors group-hover:text-blue-400 sm:text-4xl">
                {value}
              </div>
              <div className="text-sm text-zinc-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS (DIAGRAM) ═══════════════ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Pipeline
          </h2>
          <p className="mx-auto max-w-xl text-zinc-400">
            From spec to PR in one overnight session. The loop iterates until QA
            passes, then runs multi-pass audit before opening the pull request.
          </p>
        </div>

        <MermaidDiagram chart={pipelineChart} className="mx-auto max-w-3xl" />

        <div className="mt-8 text-center">
          <p className="font-mono text-sm text-zinc-600">
            Spec &rarr; Plan &rarr; [Code &rarr; Test &rarr; QA &rarr; Fix]
            &times; n &rarr; Audit &times; 3+ &rarr; PR
          </p>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="border-t border-zinc-800/60 bg-zinc-900/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineered for Reliability
            </h2>
            <p className="mx-auto max-w-xl text-zinc-400">
              Every component is designed to reduce failure modes in autonomous
              overnight execution — from isolated worktrees to adversarial QA.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon, title, description }) => (
              <div
                key={title}
                className="group rounded-xl border border-zinc-800/60 bg-zinc-950/50 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="mb-4 inline-flex rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-400 transition-colors group-hover:border-blue-500/30 group-hover:text-blue-400">
                  {icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="border-t border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 px-6 py-14 text-center sm:px-12 sm:py-20">
            {/* Subtle gradient accent */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)",
              }}
            />

            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Dive Deeper
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-zinc-400">
                Understand the architecture behind autonomous overnight
                development, or follow a step-by-step walkthrough of a real
                NightShift session.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/architecture"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  Architecture
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/80 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                >
                  How It Works
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
