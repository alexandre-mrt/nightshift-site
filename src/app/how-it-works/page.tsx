import type { Metadata } from "next";
import MermaidDiagram from "@/components/MermaidDiagram";
import Collapsible from "@/components/Collapsible";

export const metadata: Metadata = {
  title: "How It Works | NightShift Docs",
  description:
    "Step-by-step walkthrough of a NightShift v5 session: pre-flight, planning, execution loop, stability gate, and finalization.",
};

/* ------------------------------------------------------------------ */
/*  Reusable primitives                                                */
/* ------------------------------------------------------------------ */

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mb-4 mt-16 scroll-mt-24 text-2xl font-bold tracking-tight text-white"
    >
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-8 text-lg font-semibold text-zinc-200">
      {children}
    </h3>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
      {children}
    </div>
  );
}

function CodeBlock({
  children,
  title,
}: {
  children: string;
  title?: string;
}) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-zinc-800">
      {title && (
        <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-500">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-300">
        {children}
      </pre>
    </div>
  );
}

function PhaseCard({
  number,
  title,
  subtitle,
  color = "blue",
}: {
  number: number;
  title: string;
  subtitle: string;
  color?: "blue" | "green" | "amber" | "purple" | "red";
}) {
  const colorMap = {
    blue: "bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/40 border-l-blue-500",
    green:
      "bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/40 border-l-emerald-500",
    amber:
      "bg-amber-500/20 text-amber-400 ring-2 ring-amber-500/40 border-l-amber-500",
    purple:
      "bg-purple-500/20 text-purple-400 ring-2 ring-purple-500/40 border-l-purple-500",
    red: "bg-red-500/20 text-red-400 ring-2 ring-red-500/40 border-l-red-500",
  };
  const ringClass = colorMap[color].split(" ").slice(0, 4).join(" ");

  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${ringClass}`}
      >
        {number}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-zinc-200">{title}</p>
        <p className="text-xs text-zinc-500">{subtitle}</p>
      </div>
    </div>
  );
}

function RuleCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 font-mono text-xs font-bold text-red-400">
          {number}
        </span>
        <span className="text-sm font-semibold text-zinc-200">{title}</span>
      </div>
      <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Page header */}
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        How It Works
      </h1>
      <p className="mb-2 text-lg text-zinc-400">
        A complete walkthrough of a NightShift v5 session &mdash; from the
        moment you say &ldquo;night shift&rdquo; to the pull request waiting
        for you in the morning.
      </p>
      <p className="mb-12 text-sm text-zinc-500">
        v5 introduces ground truth documents, test-first flow, compact JSON
        state, cache-optimized prompts, doom-loop detection, pipelining, a
        6-persona audit wrapper, and 3-tier error escalation with Reflexion.
      </p>

      {/* ============================================================ */}
      {/*  1. Overview Timeline                                        */}
      {/* ============================================================ */}
      <SectionHeading id="overview">Overview Timeline</SectionHeading>
      <Prose>
        <p>
          Every NightShift session follows five phases. The user is present for
          Phase 0 and Phase 1, then goes to sleep while the system autonomously
          executes Phases 2 through 4.
        </p>
      </Prose>

      <div className="relative my-8 ml-4 space-y-6 border-l-2 border-zinc-800 pl-8">
        <PhaseCard
          number={0}
          title="Pre-flight"
          subtitle="Domain research, questionnaire, ground truth documents, budget init"
          color="blue"
        />
        <PhaseCard
          number={1}
          title="Plan"
          subtitle="Context analysis, skill creation, state files, test specs, user approval"
          color="purple"
        />
        <div className="absolute -left-[5px] top-[108px] h-3 w-3 rounded-full border-2 border-blue-500 bg-zinc-950" />
        <div className="ml-[-32px] mr-[-16px] rounded-lg border border-dashed border-zinc-700 bg-zinc-900/30 px-8 py-1 text-center text-xs text-zinc-500">
          User goes to sleep &mdash; fully autonomous from here
        </div>
        <PhaseCard
          number={2}
          title="Execution Loop (19 steps)"
          subtitle="ralph-loop iterates: spawn agents, merge, validate, doom-loop detection, pipelining"
          color="amber"
        />
        <PhaseCard
          number={3}
          title="Stability Gate"
          subtitle="Single audit wrapper agent, 6 personas, 3 consecutive clean passes"
          color="red"
        />
        <PhaseCard
          number={4}
          title="Finalization"
          subtitle="Functional verification, visual check, PR, debrief, post-mortem, cleanup"
          color="green"
        />
      </div>

      <MermaidDiagram
        className="my-6"
        chart={`flowchart LR
  P0[Phase 0\\nPre-flight] --> P1[Phase 1\\nPlan]
  P1 --> SLEEP((User sleeps))
  SLEEP --> P2[Phase 2\\nExecution Loop]
  P2 --> P3[Phase 3\\nStability Gate]
  P3 --> P4[Phase 4\\nFinalize]
  P4 --> PR[PR Ready]

  style SLEEP fill:#3b82f6,stroke:#2563eb,color:#fff
  style PR fill:#22c55e,stroke:#16a34a,color:#fff`}
      />

      {/* ============================================================ */}
      {/*  Phase 0: Pre-flight                                         */}
      {/* ============================================================ */}
      <SectionHeading id="phase-0">Phase 0: Pre-flight</SectionHeading>
      <Prose>
        <p>
          The user is about to sleep. Any ambiguity left unresolved becomes a
          hallucination or a wrong decision at 3 AM. Phase 0 eliminates that
          risk by gathering context and answers before autonomous work begins.
          Skipped entirely if STATE.json already exists (resumption).
        </p>
      </Prose>

      {/* 0a */}
      <SubHeading>0a. Domain Research (background agents)</SubHeading>
      <Prose>
        <p>
          Before asking a single question, NightShift launches background
          research agents to build domain context. This makes the questionnaire
          sharper and more relevant.
        </p>
      </Prose>

      <div className="my-4 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "WebSearch",
            desc: "Research the spec domain, key libraries, latest versions, common pitfalls",
          },
          {
            label: "Context7",
            desc: "Fetch up-to-date docs for each library and framework mentioned in the spec",
          },
          {
            label: "Explore",
            desc: "Scan the existing codebase in background to understand structure and patterns",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
          >
            <p className="mb-1 font-mono text-xs font-semibold text-blue-400">
              {item.label}
            </p>
            <p className="text-xs text-zinc-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 0b */}
      <SubHeading>0b. Questionnaire (AskUserQuestion)</SubHeading>
      <Prose>
        <p>
          Questions are asked in batches of 2-3 related items using the{" "}
          <code className="font-mono text-zinc-300">AskUserQuestion</code>{" "}
          tool. Obvious answers from the spec are skipped. All answers are
          saved to{" "}
          <code className="font-mono text-zinc-300">
            NIGHT_SHIFT_ENRICHED_SPEC.md
          </code>
          .
        </p>
      </Prose>

      <div className="my-4 space-y-2">
        {[
          {
            cat: "1. Scope boundaries",
            examples: [
              "What is in/out of scope? What should NOT be touched?",
            ],
          },
          {
            cat: "2. Technical decisions",
            examples: ["DB, ORM, framework preferences not in the spec"],
          },
          {
            cat: "3. Edge cases & error handling",
            examples: [
              "How should the app behave when external deps are unavailable?",
            ],
          },
          {
            cat: "4. Testing expectations",
            examples: ["Unit only? Integration? Full E2E? Error paths?"],
          },
          {
            cat: "5. UI/UX expectations",
            examples: ["Design/mockup? Mobile? Dark mode? Accessibility?"],
          },
          {
            cat: "6. Priorities & tradeoffs",
            examples: [
              "Must-haves vs nice-to-haves. Speed vs quality tradeoff.",
            ],
          },
          {
            cat: "7. What NOT to do",
            examples: [
              "Explicit exclusions, recent WIP to avoid breaking",
            ],
          },
        ].map((item) => (
          <Collapsible key={item.cat} title={item.cat}>
            <ul className="space-y-1.5">
              {item.examples.map((ex) => (
                <li
                  key={ex}
                  className="text-xs leading-relaxed text-zinc-400"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </Collapsible>
        ))}
      </div>

      {/* 0c */}
      <SubHeading>0c. Permission Gate</SubHeading>
      <Prose>
        <p>
          A sentinel file is created to signal that a night-shift session is
          active. Other processes (hooks, monitoring) check for this file.
        </p>
      </Prose>
      <CodeBlock title="Shell">
        {`touch /tmp/.claude-night-shift-active`}
      </CodeBlock>

      {/* 0d */}
      <SubHeading>0d. Ground Truth Documents</SubHeading>
      <Prose>
        <p>
          Before any code generation, three <strong>immutable</strong>{" "}
          documents are created. All agents validate against these, not the
          original request. They are never modified after creation.
        </p>
      </Prose>

      <div className="my-4 space-y-3">
        {[
          {
            file: "GROUND_TRUTH_BRAINSTORM.md",
            desc: "Explore all possible approaches. List pros/cons. Orchestrator picks one; alternatives stay for mid-course re-evaluation.",
            color: "border-l-blue-500",
          },
          {
            file: "GROUND_TRUTH_HEALTH.md",
            desc: "Audit current codebase: file structure, key modules, test coverage, known tech debt, fragile areas, dependency versions.",
            color: "border-l-amber-500",
          },
          {
            file: "GROUND_TRUTH_DOCS.md",
            desc: "Audit existing types, interfaces, API contracts, config files, env vars, naming/error handling/auth patterns.",
            color: "border-l-emerald-500",
          },
        ].map((item) => (
          <div
            key={item.file}
            className={`rounded-lg border border-zinc-800 border-l-4 ${item.color} bg-zinc-900/50 p-4`}
          >
            <p className="mb-1 font-mono text-sm font-semibold text-zinc-200">
              {item.file}
            </p>
            <p className="text-xs text-zinc-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 0e */}
      <SubHeading>0e. Cost Budget Initialization</SubHeading>
      <Prose>
        <p>
          A cost budget is initialized in state. The system alerts at 70%
          usage and halts at 100%. When budget exceeds 70%, non-critical agents
          switch to haiku to conserve resources.
        </p>
      </Prose>

      {/* ============================================================ */}
      {/*  Phase 1: Plan                                               */}
      {/* ============================================================ */}
      <SectionHeading id="phase-1">Phase 1: Plan</SectionHeading>
      <Prose>
        <p>
          With the enriched spec and ground truth documents in hand, NightShift
          produces a detailed plan and gets user approval before autonomous
          execution begins.
        </p>
      </Prose>

      {/* 1a */}
      <SubHeading>1a. Analyze Context</SubHeading>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="mb-2 text-sm font-semibold text-zinc-200">
            From scratch
          </p>
          <ul className="space-y-1 text-xs text-zinc-400">
            <li>Scaffold the project structure</li>
            <li>
              Git init, branch{" "}
              <code className="font-mono text-zinc-300">
                feat/night-shift-&lt;date&gt;
              </code>
            </li>
            <li>Create GitHub repo and push</li>
          </ul>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="mb-2 text-sm font-semibold text-zinc-200">
            Existing repo
          </p>
          <ul className="space-y-1 text-xs text-zinc-400">
            <li>
              Launch 2-3{" "}
              <code className="font-mono text-zinc-300">Explore</code> agents
              in parallel
            </li>
            <li>Branch from current HEAD</li>
          </ul>
        </div>
      </div>

      {/* 1b */}
      <SubHeading>1b. Domain Skill Creation (skill-forge)</SubHeading>
      <Prose>
        <p>
          Runs in parallel with context analysis. NightShift scans{" "}
          <code className="font-mono text-zinc-300">~/.claude/skills/</code>{" "}
          and the generated skill registry. If a needed domain is missing, a{" "}
          <code className="font-mono text-zinc-300">skill-forge</code> agent
          (model: opus) creates it. The skill is injected into all agent
          prompts via a{" "}
          <code className="font-mono text-zinc-300">## Domain reference</code>{" "}
          section.
        </p>
      </Prose>

      {/* 1c */}
      <SubHeading>1c. Initialize State Files</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
              <th className="py-2 pr-4 font-medium">File</th>
              <th className="py-2 font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              {
                file: "NIGHT_SHIFT_STATE.json",
                purpose:
                  "Compact JSON state with budget, doom-loop counters, ground truth refs, prefetch. Only memory between iterations.",
              },
              {
                file: "NIGHT_SHIFT_ERRORS.json",
                purpose:
                  "Structured error log with Reflexion self-critiques and model tier tracking.",
              },
              {
                file: "NIGHT_SHIFT_LOG.md",
                purpose:
                  "Plan, architecture, task list. Append-only log of decisions.",
              },
              {
                file: "NIGHT_SHIFT_PROBLEMS.md",
                purpose:
                  "Morning review file: uncertainties, assumptions, blocked tasks. User reads this first.",
              },
              {
                file: "LEARNINGS.md",
                purpose:
                  "Reusable lessons: what worked, what failed, patterns discovered. Human-curated between sessions.",
              },
            ].map((row) => (
              <tr key={row.file} className="border-b border-zinc-800/50">
                <td className="py-2 pr-4 font-mono text-xs text-zinc-300">
                  {row.file}
                </td>
                <td className="py-2 text-xs">{row.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Collapsible title="STATE.json format (compact field names)">
        <CodeBlock title="NIGHT_SHIFT_STATE.json">
          {`{
  "spec": "NIGHT_SHIFT_ENRICHED_SPEC.md",
  "phase": "execution",
  "iter": 3,
  "tasks": [
    { "id": "T1", "t": "Auth module", "s": "done", "p": 1, "grp": "A" },
    { "id": "T2", "t": "Dashboard UI", "s": "in_progress", "p": 1, "grp": "A" },
    { "id": "T3", "t": "API routes", "s": "pending", "p": 2, "grp": "B" }
  ],
  "budget": { "used": 4.20, "limit": 15.00, "alert": 0.7 },
  "doom": {
    "file_edits": { "src/auth.ts": 2 },
    "err_hashes": {},
    "convergence": 0.66
  },
  "ground_truth": [
    "GROUND_TRUTH_BRAINSTORM.md",
    "GROUND_TRUTH_HEALTH.md",
    "GROUND_TRUTH_DOCS.md"
  ],
  "prefetch": "src/db/schema.ts, src/types/api.ts, bun run build",
  "gate": { "prev_hashes": [] },
  "log": [
    "iter2: T1 done, T2 partial (CSS layout issue)",
    "iter3: T2 retry with opus upgrade"
  ]
}`}
        </CodeBlock>
        <Prose>
          <p>
            Compact field names (<code className="font-mono text-zinc-300">t</code>,{" "}
            <code className="font-mono text-zinc-300">s</code>,{" "}
            <code className="font-mono text-zinc-300">p</code>,{" "}
            <code className="font-mono text-zinc-300">grp</code>) save ~25%
            tokens per iteration read. The log array auto-trims to the last 5
            entries.
          </p>
        </Prose>
      </Collapsible>

      {/* 1d */}
      <SubHeading>1d. TODO.md Attention Anchor</SubHeading>
      <Prose>
        <p>
          A concise task checklist (one line per task, checkbox format).
          Re-read at every iteration start to prevent task drift. Checkboxes
          update as tasks complete.
        </p>
      </Prose>

      {/* 1e */}
      <SubHeading>1e. Setup Script (init.sh)</SubHeading>
      <Prose>
        <p>
          A bootstrap script at the project root, reused every iteration to
          ensure the environment is ready:
        </p>
      </Prose>
      <CodeBlock title="init.sh">
        {`#!/bin/bash
bun install          # Install dependencies
bun test             # Run test suite
bunx biome check .   # Run lint`}
      </CodeBlock>

      {/* 1f */}
      <SubHeading>1f. Generate Test Specs (test-first: red then green)</SubHeading>
      <Prose>
        <p>
          For each task, a{" "}
          <code className="font-mono text-zinc-300">night-tester</code> agent
          (model: sonnet) writes comprehensive tests based on the spec. Tests
          define expected behavior as executable specifications. They must fail
          initially (red phase). If they pass, the spec may be wrong or the
          feature already exists.
        </p>
        <p>
          This gives every iteration an objective convergence criterion:{" "}
          <strong>are the tests green?</strong>
        </p>
      </Prose>

      {/* 1g */}
      <SubHeading>1g. Present Plan for User Approval</SubHeading>
      <div className="my-4 rounded-lg border border-yellow-800/50 bg-yellow-950/20 p-4">
        <p className="mb-1 text-sm font-semibold text-yellow-400">
          Last checkpoint before sleep
        </p>
        <p className="text-xs leading-relaxed text-yellow-200/70">
          The complete plan is presented via{" "}
          <code className="font-mono text-yellow-300/70">AskUserQuestion</code>:
          task list with dependencies and parallelism, architecture decisions,
          sprint contracts (if UI), trade-offs, and budget estimate. The user
          must explicitly approve before autonomous execution begins.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  Phase 2: Execution Loop                                     */}
      {/* ============================================================ */}
      <SectionHeading id="phase-2">
        Phase 2: Execution Loop
      </SectionHeading>
      <Prose>
        <p>
          NightShift runs inside a <strong>ralph-loop</strong>: when Claude
          finishes or exits, a stop hook re-feeds the same prompt with a fresh
          context window. The only memory between iterations is{" "}
          <code className="font-mono text-zinc-300">STATE.json</code> +{" "}
          <code className="font-mono text-zinc-300">ERRORS.json</code> on disk.
        </p>
      </Prose>

      <CodeBlock title="Loop invocation">
        {`Skill(skill: "ralph-loop:ralph-loop", args: "Read NIGHT_SHIFT_STATE.json.
  Execute next pending tasks. Update state.
  --max-iterations 100 --completion-promise 'NIGHT_SHIFT_COMPLETE'")`}
      </CodeBlock>

      <SubHeading>The 19-Step Iteration Flow</SubHeading>
      <Prose>
        <p>
          Each iteration of the ralph-loop follows this exact sequence:
        </p>
      </Prose>

      <CodeBlock title="Iteration flow (19 steps)">
        {` 1. Read STATE.json (compact, max 50 lines with trimming)
 2. Read ERRORS.json (only unresolved + last 5 resolved)
 3. Read LEARNINGS.md + TODO.md (attention anchors)
 4. Read prefetch from previous iteration (if any)
 5. Run init.sh if needed
 6. git log --oneline -5
 7. Doom-loop detection
 8. Idle detection
 9. Check tests exist (test-first: red before green)
10. Spawn ALL ready tasks in parallel (worktree isolation)
11. Pipelining: while agents run, prefetch next iteration
12. Collect results - early abort on critical failure
13. Merge worktrees -> validate (build+test+lint with timeouts)
14. Failures -> 3-tier escalation
15. Critic agent (post-merge, information-isolated)
16. QA cycle (UI tasks only)
17. Update state (auto-trim log to last 5) + cost tracking
18. WIP commit
19. All done? -> Stability Gate. Else -> exit -> ralph-loop re-feeds`}
      </CodeBlock>

      <MermaidDiagram
        className="my-6"
        chart={`flowchart TD
  A[1. Read STATE.json] --> B[2-4. Read ERRORS + LEARNINGS + prefetch]
  B --> C[5-6. init.sh + git log]
  C --> D[7-8. Doom-loop + idle detection]
  D --> E[9. Check tests exist]
  E --> F[10. Spawn ALL ready tasks\\nin parallel with worktrees]
  F --> G[11. Pipelining: prefetch\\nnext iteration while agents run]
  G --> H[12. Collect results\\nearly abort on critical failure]
  H --> I[13. Merge + validate\\nbuild + test + lint]
  I -->|Pass| J[15-16. Critic + QA]
  I -->|Fail| K[14. 3-tier escalation]
  K --> I
  J --> L[17-18. Update state + WIP commit]
  L --> M{19. All done?}
  M -->|Yes| N[Stability Gate]
  M -->|No| O[Exit: ralph-loop\\nre-feeds fresh context]
  O --> A`}
      />

      {/* Agent spawning */}
      <SubHeading>Agent Spawn Pattern</SubHeading>
      <Prose>
        <p>
          All ready tasks launch in a{" "}
          <strong>single message with multiple Agent calls</strong>. Every
          code-writing agent gets worktree isolation. All run in background.
        </p>
      </Prose>

      <CodeBlock title="Spawning pattern (parallel agents)">
        {`Agent(subagent_type: "night-coder", model: "sonnet",
  isolation: "worktree", run_in_background: true, prompt: <T1>)
Agent(subagent_type: "night-coder", model: "sonnet",
  isolation: "worktree", run_in_background: true, prompt: <T2>)
Agent(subagent_type: "night-tester", model: "sonnet",
  isolation: "worktree", run_in_background: true, prompt: <T3>)`}
      </CodeBlock>

      {/* Agent roster */}
      <Collapsible title="Agent roster and model tiering">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
                <th className="py-2 pr-4 font-medium">Task</th>
                <th className="py-2 pr-4 font-medium">Agent</th>
                <th className="py-2 pr-4 font-medium">Model</th>
                <th className="py-2 font-medium">Isolation</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              {[
                { task: "Feature / component", agent: "night-coder", model: "sonnet", iso: "worktree" },
                { task: "Tests", agent: "night-tester", model: "sonnet", iso: "worktree" },
                { task: "QA (UI)", agent: "night-qa", model: "opus (4.7)", iso: "none" },
                { task: "Fix failure (Tier 1)", agent: "night-fixer", model: "haiku", iso: "worktree" },
                { task: "Fix failure (Tier 2+)", agent: "night-fixer", model: "sonnet/opus", iso: "worktree" },
                { task: "Review / critic", agent: "code-reviewer", model: "opus", iso: "none" },
                { task: "Security", agent: "security-reviewer", model: "sonnet", iso: "none" },
                { task: "Research", agent: "Explore", model: "haiku", iso: "none" },
                { task: "Domain skill", agent: "skill-forge", model: "opus", iso: "none" },
              ].map((row) => (
                <tr key={`${row.task}-${row.agent}`} className="border-b border-zinc-800/50">
                  <td className="py-2 pr-4 text-xs text-zinc-300">{row.task}</td>
                  <td className="py-2 pr-4 font-mono text-xs text-blue-400">{row.agent}</td>
                  <td className="py-2 pr-4 font-mono text-xs">{row.model}</td>
                  <td className="py-2 font-mono text-xs">{row.iso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          <p>
            Model upgrade rule: if sonnet fails 2x on the same task, retry
            with opus. UI/design tasks always use opus (4.7) for visual
            quality.
          </p>
        </Prose>
      </Collapsible>

      {/* Cache-optimized prompt */}
      <Collapsible title="Cache-optimized agent prompt template">
        <Prose>
          <p>
            Prompt structure places stable content first, variable content
            last. This maximizes KV-cache hit rate across agents of the same
            type (10x cost reduction on cached tokens).
          </p>
        </Prose>
        <CodeBlock title="Prompt structure">
          {`--- STABLE PREFIX (identical across all agents of this type) ---
## Role
<agent role + general instructions>

## Anti-hallucination rules
Never guess APIs/types. Log uncertainty.

## Output format
<result task="TX" agent="<type>" status="done|partial|blocked|failed">
summary: one-line what was done
files: path1.ts path2.ts
commits: abc1234
issues: none | brief description
confidence: high|medium|low
</result>

## Concurrency rules
Read/Grep/Glob: parallel (safe). Write/Edit: sequential. Bash(git): sequential.

## Commands
build: <cmd> (120s) | test: <cmd> (300s) | lint: <cmd> (60s)

--- SEMI-STABLE (changes per project, not per task) ---
## Domain reference
Read ~/.claude/skills/generated/<domain>/skill.md

## Ground truth
Read GROUND_TRUTH_DOCS.md before modifying any interface.

--- VARIABLE (changes per task) ---
## Task
<description + acceptance criteria>

## Files
<list of files to read/modify>

## Lessons (from ERRORS.json)
<filter by task/file overlap: failed strategies to NOT repeat>`}
        </CodeBlock>
      </Collapsible>

      {/* Doom-loop detection */}
      <SubHeading>Doom-Loop Detection (step 7)</SubHeading>
      <Prose>
        <p>
          At every iteration start, the orchestrator checks for 6 doom-loop
          signals. If any trigger fires, a forced strategy change kicks in.
        </p>
      </Prose>

      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
              <th className="py-2 pr-4 font-medium">Signal</th>
              <th className="py-2 font-medium">Response</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              {
                signal: "Same file edited 3+ times",
                response: "Revert to checkpoint, different approach",
              },
              {
                signal: "Same error hash 3+ times",
                response: "Upgrade model tier (haiku -> sonnet -> opus)",
              },
              {
                signal: "Same test failing 3+ times",
                response: "Re-examine the test itself (might be wrong)",
              },
              {
                signal: "No completions for 5+ iterations",
                response: "Forced mid-course re-evaluation",
              },
              {
                signal: "Convergence rate < 0.1",
                response: "Pause and reassess entire plan",
              },
              {
                signal: "Diff hash reappears (A->B->A)",
                response: "Revert to earliest clean state, fundamentally different architecture",
              },
            ].map((row) => (
              <tr key={row.signal} className="border-b border-zinc-800/50">
                <td className="py-2 pr-4 text-xs text-zinc-300">{row.signal}</td>
                <td className="py-2 text-xs">{row.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Prose>
        <p>
          If the strategy change also fails, the task is marked{" "}
          <code className="font-mono text-zinc-300">[BLOCKED]</code>, the
          trajectory is logged, and the system moves to the next independent
          task.
        </p>
      </Prose>

      {/* Pipelining */}
      <SubHeading>Pipelining (step 11)</SubHeading>
      <Prose>
        <p>
          While agents run in the background, the orchestrator overlaps with
          the next iteration by:
        </p>
      </Prose>
      <ol className="my-3 space-y-1 pl-4 text-sm text-zinc-400">
        <li className="list-decimal">
          Pre-reading files for the next batch of tasks (Explore agent,
          background)
        </li>
        <li className="list-decimal">
          Pre-computing merge order from the dependency graph
        </li>
        <li className="list-decimal">
          Storing prefetch in STATE.json (3 lines max: key files, interfaces,
          build commands)
        </li>
        <li className="list-decimal">
          Next iteration reads prefetch and skips exploration, going straight
          to execution
        </li>
      </ol>

      {/* Early abort */}
      <SubHeading>Early Abort on Critical Failure (step 12)</SubHeading>
      <Prose>
        <p>
          If any agent returns{" "}
          <code className="font-mono text-zinc-300">
            status=&quot;failed&quot;
          </code>{" "}
          with a critical error (build broken, type error cascade, merge
          conflict):
        </p>
      </Prose>
      <ol className="my-3 space-y-1 pl-4 text-sm text-zinc-400">
        <li className="list-decimal">Do NOT merge remaining agents</li>
        <li className="list-decimal">
          Fix the critical error first (night-fixer)
        </li>
        <li className="list-decimal">
          Re-evaluate which remaining results are still valid
        </li>
        <li className="list-decimal">Only merge valid results</li>
        <li className="list-decimal">
          Log aborted agents for retry in next iteration
        </li>
      </ol>

      {/* 3-tier escalation */}
      <SubHeading>3-Tier Error Escalation with Reflexion (step 14)</SubHeading>

      <div className="my-4 space-y-4">
        <div className="rounded-lg border border-zinc-800 border-l-4 border-l-emerald-500 bg-zinc-900/50 p-4">
          <p className="mb-2 text-sm font-semibold text-emerald-400">
            Tier 1: Normal retry (attempts 1-3)
          </p>
          <p className="text-xs text-zinc-400">
            Spawn{" "}
            <code className="font-mono text-zinc-300">night-fixer</code>{" "}
            (model: haiku) with error + files + ERRORS.json lessons.{" "}
            <strong>Reflexion:</strong> before each retry, fixer writes
            self-critique: &ldquo;Previous approach failed because X. Root
            cause is Y. Trying Z.&rdquo; Each retry reformulates the prompt
            slightly to avoid pattern lock-in.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 border-l-4 border-l-amber-500 bg-zinc-900/50 p-4">
          <p className="mb-2 text-sm font-semibold text-amber-400">
            Tier 2: Rollback + agent team debugging (attempts 4-6)
          </p>
          <p className="text-xs text-zinc-400">
            Revert to last clean commit. Escalate to an agent team: 3-5
            teammates investigating different hypotheses, challenging each
            other. The prompt includes all previously failed strategies with
            the instruction: &ldquo;use fundamentally different
            architecture.&rdquo;
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 border-l-4 border-l-red-500 bg-zinc-900/50 p-4">
          <p className="mb-2 text-sm font-semibold text-red-400">
            Tier 3: Blocked (7+ attempts)
          </p>
          <p className="text-xs text-zinc-400">
            Mark task{" "}
            <code className="font-mono text-zinc-300">[BLOCKED]</code>. Log
            full trajectory to ERRORS.json + PROBLEMS.md. Commit{" "}
            <code className="font-mono text-zinc-300">[WIP]</code>, move to
            next independent task.
          </p>
        </div>
      </div>

      {/* Merge + validate */}
      <SubHeading>Merge and Validation (step 13)</SubHeading>
      <Prose>
        <p>
          After all agents complete, worktree branches merge one by one in
          dependency order. Then the full validation suite runs with timeouts:
        </p>
      </Prose>
      <CodeBlock title="Validation suite">
        {`BUILD  -> bun run build / cargo build      (timeout: 120s)
TEST   -> bun test / cargo test             (timeout: 300s)
LINT   -> bunx biome check --write .        (timeout: 60s)`}
      </CodeBlock>
      <Prose>
        <p>
          &ldquo;Tests pass&rdquo; means tests actually{" "}
          <strong>RAN</strong>. Skipped, crashed, or timed-out counts as
          failure.
        </p>
      </Prose>

      {/* Mid-course re-evaluation */}
      <SubHeading>Mid-course Re-evaluation (~50% completion)</SubHeading>
      <Prose>
        <p>
          At approximately 50% task completion, the system pauses to re-read
          the original spec and GROUND_TRUTH_BRAINSTORM.md, compare against
          current implementation, and check whether alternative approaches
          would be better. The plan is updated if needed.
        </p>
      </Prose>

      {/* ============================================================ */}
      {/*  Phase 3: Stability Gate                                     */}
      {/* ============================================================ */}
      <SectionHeading id="phase-3">Phase 3: Stability Gate</SectionHeading>
      <Prose>
        <p>
          When all tasks are done, NightShift spawns a{" "}
          <strong>single audit wrapper agent</strong> (model: opus) that handles
          the entire stability gate internally. This keeps the
          orchestrator&apos;s context clean (it reads only ~20 lines of result
          instead of accumulating 50+ agent reports).
        </p>
      </Prose>

      <SubHeading>6 Audit Personas</SubHeading>
      <div className="my-4 grid gap-3 sm:grid-cols-2">
        {[
          {
            persona: "Architect",
            focus: "System design, module boundaries, dependency direction. Validates against GROUND_TRUTH_BRAINSTORM.md.",
          },
          {
            persona: "Domain Expert",
            focus: "Business logic, edge cases from spec. Validates against ENRICHED_SPEC.md.",
          },
          {
            persona: "Code Expert",
            focus: "DRY, type safety, resource leaks, dead code, naming conventions.",
          },
          {
            persona: "Performance Expert",
            focus: "Allocations, N+1 queries, indexes, bundle size, lazy loading.",
          },
          {
            persona: "Security Expert",
            focus: "OWASP top 10, secrets, injection, auth, input validation.",
          },
          {
            persona: "Human Advocate",
            focus: "Usability, accessibility, error messages, mobile experience.",
          },
        ].map((item) => (
          <div
            key={item.persona}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
          >
            <p className="mb-1 text-sm font-semibold text-zinc-200">
              {item.persona}
            </p>
            <p className="text-xs text-zinc-500">{item.focus}</p>
          </div>
        ))}
      </div>

      <SubHeading>Cross-Validation Pairs</SubHeading>
      <Prose>
        <p>
          Personas are cross-validated in pairs to catch issues that span
          domains:
        </p>
      </Prose>
      <ul className="my-3 space-y-1 pl-4 text-sm text-zinc-400">
        <li className="list-disc">
          <strong>Architect + Code Expert</strong> on module boundaries
        </li>
        <li className="list-disc">
          <strong>Security + Performance</strong> on rate limiting
        </li>
        <li className="list-disc">
          <strong>Domain + Human Advocate</strong> on error messages
        </li>
        <li className="list-disc">
          <strong>Performance + Security</strong> on caching behavior
        </li>
      </ul>

      <SubHeading>Gate Loop</SubHeading>
      <MermaidDiagram
        className="my-6"
        chart={`flowchart TD
  A[Create fresh agent team\\nwith 6 personas] --> B[Run audit\\ncritical/high/medium/low]
  B --> C{Critical or High\\nfindings?}
  C -->|Yes| D[Fix with night-fixer]
  D --> E[Increment loop counter]
  E --> A
  C -->|No| F[Clean pass recorded]
  F --> G{3 consecutive\\nclean passes?}
  G -->|No| A
  G -->|Yes| H[Stability gate PASSED]
  E --> I{10 loops reached?}
  I -->|Yes| J[Safety cap: exit with WIP]`}
      />

      <div className="my-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
          <p className="mb-1 text-sm font-semibold text-zinc-200">
            Pass condition
          </p>
          <p className="text-xs text-zinc-500">
            3 consecutive loops with 0 critical/high findings across all 6
            personas.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
          <p className="mb-1 text-sm font-semibold text-zinc-200">
            Safety cap
          </p>
          <p className="text-xs text-zinc-500">
            10 loops maximum. If reached, exit with WIP status.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
          <p className="mb-1 text-sm font-semibold text-zinc-200">
            Repetition detection
          </p>
          <p className="text-xs text-zinc-500">
            If criticism is {">"}70% the same as the previous loop, accept and
            log to PROBLEMS.
          </p>
        </div>
      </div>

      <Collapsible title="Audit wrapper output format">
        <CodeBlock title="NIGHT_SHIFT_AUDIT_RESULT.md">
          {`<audit-gate status="passed" loops="5" clean="3/3">
summary: Fixed 2 security issues (XSS in form, missing auth check),
  1 performance issue (N+1 in dashboard query). All critical/high resolved.
remaining: 3 medium (naming conventions), 2 low (accessibility hints)
</audit-gate>`}
        </CodeBlock>
      </Collapsible>

      {/* ============================================================ */}
      {/*  Phase 4: Finalization                                       */}
      {/* ============================================================ */}
      <SectionHeading id="phase-4">Phase 4: Finalization</SectionHeading>

      <div className="my-6 space-y-4">
        {[
          {
            step: "4a",
            title: "Functional verification gate (BLOCKS PR)",
            desc: "Start the application, run happy path E2E, 3+ failure scenarios. Max 5 attempts. Build+lint alone is insufficient: the app must actually run.",
          },
          {
            step: "4b",
            title: "Visual verification (Playwright screenshots)",
            desc: "Screenshot ALL pages, check for broken layouts, missing elements, cross-feature consistency.",
          },
          {
            step: "4c",
            title: "PR creation",
            desc: "gh pr create with the night-shift label. Body includes the session summary from LOG.md.",
          },
          {
            step: "4d",
            title: "LEARNINGS.md update",
            desc: "Append 3-5 reusable lessons: what worked, what failed, patterns discovered.",
          },
          {
            step: "4e",
            title: "Debrief + dream",
            desc: "Run /debrief to log session observations. Run /dream to consolidate memory files.",
          },
          {
            step: "4f",
            title: "Post-mortem agent",
            desc: "Haiku agent reads STATE.json, ERRORS.json, PROBLEMS.md, git log. Produces NIGHT_SHIFT_POSTMORTEM.md with metrics and patterns. Appends to orchestration playbooks.",
          },
          {
            step: "4g",
            title: "Metrics logging",
            desc: "Session metrics (date, project, iterations, tasks completed/blocked, duration) appended to ~/.claude/metrics/sessions.jsonl.",
          },
          {
            step: "4h",
            title: "Cleanup + completion signal",
            desc: "Remove sentinel file. Output NIGHT_SHIFT_COMPLETE promise to stop the ralph-loop.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 font-mono text-xs text-zinc-400">
              {item.step}
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-200">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Collapsible title="Pre-completion checklist">
        <ul className="space-y-1.5 text-xs text-zinc-400">
          <li>Functional verification gate passed (real code ran)</li>
          <li>
            Stability gate: 3 consecutive clean passes (or WIP if safety cap
            hit)
          </li>
          <li>Debrief logged</li>
          <li>Post-mortem written</li>
          <li>No AI mentions in any commit, PR, or public content</li>
          <li>Budget not exceeded (or WIP if it was)</li>
          <li>Ground truth docs preserved (not modified during execution)</li>
        </ul>
      </Collapsible>

      <Collapsible title="Metrics output format">
        <CodeBlock title="~/.claude/metrics/sessions.jsonl">
          {`{
  "date": "2026-04-20",
  "project": "nightshift-site",
  "iterations": 12,
  "tasks_completed": 8,
  "tasks_blocked": 1,
  "duration_min": 340
}`}
        </CodeBlock>
      </Collapsible>

      {/* ============================================================ */}
      {/*  Anti-Hallucination Protocol                                 */}
      {/* ============================================================ */}
      <SectionHeading id="anti-hallucination">
        Anti-Hallucination Protocol
      </SectionHeading>
      <Prose>
        <p>
          The user is asleep. They cannot answer questions. Hallucinated code
          is worse than no code. Every NightShift agent enforces these rules.
        </p>
      </Prose>

      <div className="my-6 grid gap-3 sm:grid-cols-2">
        <RuleCard number={0} title="Investigate before answering">
          Never speculate about code you have not opened. Before writing or
          modifying any file, read the relevant source code, types, and
          interfaces.
        </RuleCard>

        <RuleCard number={1} title="Never guess">
          <strong>APIs</strong>: do not invent function signatures.{" "}
          <strong>Types</strong>: read the actual .d.ts or interface.{" "}
          <strong>Library usage</strong>: check existing usage or docs.
        </RuleCard>

        <RuleCard number={2} title="Never leave silent traces">
          Forbidden without a PROBLEMS.md entry:{" "}
          <code className="font-mono text-xs">// TODO</code>,{" "}
          <code className="font-mono text-xs">it.skip()</code>, empty
          function bodies,{" "}
          <code className="font-mono text-xs">any</code> type escape hatches.
        </RuleCard>

        <RuleCard number={3} title="When uncertain, log and move on">
          Every uncertainty goes to PROBLEMS.md with: category, file, what was
          needed, what was done, confidence level, user action needed.
        </RuleCard>

        <RuleCard number={4} title="Mark uncertain code">
          Greppable marker:{" "}
          <code className="font-mono text-xs">
            // NIGHT-SHIFT-REVIEW: &lt;reason&gt;
          </code>
        </RuleCard>

        <RuleCard number={5} title="Blocked > Broken">
          A blocked task the user finishes in 10 minutes is better than a
          hallucinated implementation that takes 2 hours to debug.
        </RuleCard>
      </div>

      {/* ============================================================ */}
      {/*  Context & State Management                                  */}
      {/* ============================================================ */}
      <SectionHeading id="context-management">
        Context and State Management
      </SectionHeading>
      <Prose>
        <p>
          Each iteration has a fresh context window. These rules keep the
          orchestrator lean and allow NightShift to run for 6-8 hours across
          dozens of iterations.
        </p>
      </Prose>

      <div className="my-4 grid gap-3 sm:grid-cols-2">
        {[
          {
            title: "Delegate ALL heavy work",
            desc: "Orchestrator reads state, spawns agents, merges, validates. Agents do the coding.",
          },
          {
            title: "Discard raw agent output",
            desc: "After merging, keep only task status + issues from the <result> block. Never accumulate full conversations.",
          },
          {
            title: "Auto-trim state",
            desc: "Log array: last 5 entries. Completed tasks: strip tries/blocked fields. Prefetch: overwrite each iteration.",
          },
          {
            title: "Selective ERRORS.json reads",
            desc: "Use jq to count unresolved errors. Read full file only when spawning a fixer for a specific error.",
          },
          {
            title: "Context budget rule",
            desc: "If 5+ agent results processed OR 3+ large files read, commit state and exit. Ralph-loop gives fresh context.",
          },
          {
            title: "KV-cache optimization",
            desc: "Frozen prefix (system + tools), append-only dynamic content. Never re-read unchanged files. Same template structure for all agents.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
          >
            <p className="mb-1 text-sm font-semibold text-zinc-200">
              {item.title}
            </p>
            <p className="text-xs text-zinc-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <MermaidDiagram
        className="my-6"
        chart={`flowchart LR
  subgraph Orchestrator
    S[STATE.json] --> D[Dispatch]
    D --> M[Merge]
    M --> V[Validate]
  end
  subgraph "Parallel Agents (worktrees)"
    A1[night-coder\\nTask 1]
    A2[night-coder\\nTask 2]
    A3[night-tester\\nTask 3]
  end
  D --> A1
  D --> A2
  D --> A3
  A1 --> M
  A2 --> M
  A3 --> M`}
      />

      {/* ============================================================ */}
      {/*  Error Recovery                                              */}
      {/* ============================================================ */}
      <SectionHeading id="error-recovery">Error Recovery</SectionHeading>
      <Prose>
        <p>
          If an iteration starts and the state looks inconsistent, NightShift
          follows these recovery steps:
        </p>
      </Prose>

      <div className="my-4 space-y-3">
        {[
          { problem: "Uncommitted changes", solution: "git stash or WIP commit" },
          { problem: "Merge conflict", solution: "Resolve and commit" },
          {
            problem: "Task in_progress but not done",
            solution: "Reset to pending and retry (previous iteration ran out of context)",
          },
          {
            problem: "Build broken",
            solution: "Fix before new tasks. Spawn dedicated night-fixer.",
          },
          {
            problem: "Orphaned agent team",
            solution: "Shut down teammates, clean up",
          },
          {
            problem: "Agent teams fail to create",
            solution: "Fall back to parallel subagent audit",
          },
        ].map((item) => (
          <div
            key={item.problem}
            className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-yellow-500" />
            <div>
              <p className="text-sm font-semibold text-zinc-200">
                {item.problem}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{item.solution}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/*  Critical Rules (footer callout)                             */}
      {/* ============================================================ */}
      <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="mb-4 text-lg font-bold text-white">
          Critical Rules
        </h3>
        <div className="grid gap-x-6 gap-y-2 text-xs text-zinc-400 sm:grid-cols-2">
          {[
            "Never put secrets in code. Use .env.",
            "Never force push",
            "Ground truth documents are IMMUTABLE after creation",
            "Test-first mandatory: red before green",
            "\"Tests pass\" means tests actually RAN (skipped/crashed = failure)",
            "Functional verification BLOCKS PR (build+lint alone is insufficient)",
            "Update STATE.json after EVERY task + auto-trim",
            "Doom-loop detection every iteration",
            "Budget cap enforced (alert 70%, halt 100%)",
            "Quality > Quantity. 3 well-built features > 10 buggy ones.",
            "Never guess, never hallucinate. If uncertain: log and skip.",
            "PROBLEMS.md is mandatory. User reads it first in the morning.",
            "Keep orchestrator lean. Heavy work goes to agents.",
            "Audit in wrapper agent, never in orchestrator context",
            "Commit regularly. Every validated task gets a commit.",
            "Log every decision. User must understand every choice by morning.",
          ].map((rule) => (
            <div key={rule} className="flex items-start gap-2 py-1">
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
