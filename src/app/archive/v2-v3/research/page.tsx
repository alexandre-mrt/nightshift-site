import type { Metadata } from "next";
import MermaidDiagram from "@/components/MermaidDiagram";
import Collapsible from "@/components/Collapsible";

export const metadata: Metadata = {
  title: "Research & Improvements | NightShift Docs",
  description:
    "Comprehensive research on autonomous coding agents, multi-agent orchestration, and concrete improvement proposals for NightShift.",
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

function SubHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      id={id}
      className="mb-3 mt-8 scroll-mt-24 text-lg font-semibold text-zinc-200"
    >
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

function Badge({
  level,
  label,
}: {
  level: "high" | "medium" | "low";
  label: string;
}) {
  const colors = {
    high: "bg-red-500/20 text-red-400 ring-red-500/30",
    medium: "bg-amber-500/20 text-amber-400 ring-amber-500/30",
    low: "bg-green-500/20 text-green-400 ring-green-500/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[level]}`}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Agent profile data                                                 */
/* ------------------------------------------------------------------ */

const agents = [
  {
    name: "Devin",
    org: "Cognition Labs",
    color: "border-purple-500/40 bg-purple-500/5",
    accent: "text-purple-400",
    approach:
      "Fully autonomous AI software engineer operating in sandboxed cloud environments with shell, editor, and browser access.",
    strengths: [
      "Full autonomy end-to-end",
      "Cloud-native sandboxing",
      "Integrated browser for web tasks",
      "Enterprise-ready (Goldman Sachs pilot)",
      "Multi-agent: parallel Devins in separate IDEs",
    ],
    weaknesses: [
      "High cost for heavy use",
      "Cloud-only (no local mode)",
      "Limited reasoning transparency",
      "Closed-source",
    ],
    architecture: "Cloud IDE + multi-agent",
    isolation: "Cloud VM",
    context: "Long-term context window",
    qa: "Iterative self-correction",
    openSource: false,
    swebench: "13.86% (v1)",
  },
  {
    name: "SWE-Agent",
    org: "Princeton / Stanford",
    color: "border-blue-500/40 bg-blue-500/5",
    accent: "text-blue-400",
    approach:
      "Agent-Computer Interface (ACI) with LM-centric commands for structured code navigation and editing. Model-agnostic.",
    strengths: [
      "Open-source with academic rigor",
      "ACI concept widely influential",
      "Model-agnostic (any LLM)",
      "mini-SWE-agent: 65%+ in 100 lines of Python",
    ],
    weaknesses: [
      "Research-oriented, not production-packaged",
      "Requires setup expertise",
      "No built-in multi-agent coordination",
    ],
    architecture: "ACI + any LLM",
    isolation: "Local",
    context: "Per-task context",
    qa: "External validation",
    openSource: true,
    swebench: "12.5% (v1), 65%+ (mini)",
  },
  {
    name: "OpenHands",
    org: "AllHands AI",
    color: "border-emerald-500/40 bg-emerald-500/5",
    accent: "text-emerald-400",
    approach:
      "Open-source platform with event-sourced state model, workspace abstraction, and SDK/CLI/Cloud interfaces.",
    strengths: [
      "Open-source with $18.8M Series A",
      "Model-agnostic, modular SDK",
      "Event-sourced deterministic replay",
      "Sandboxed runtimes with MCP integration",
    ],
    weaknesses: [
      "Heavier setup than simpler tools",
      "SDK complexity for custom agents",
      "Still maturing in production",
    ],
    architecture: "Event-sourced SDK",
    isolation: "Container / Cloud",
    context: "Event-sourced state",
    qa: "Built-in review pipeline",
    openSource: true,
    swebench: "50%+ issues",
  },
  {
    name: "Cursor",
    org: "Cursor Inc.",
    color: "border-sky-500/40 bg-sky-500/5",
    accent: "text-sky-400",
    approach:
      "AI-native IDE (VS Code fork) with Agent Mode for autonomous multi-step tasks and Background Agents for cloud execution.",
    strengths: [
      "Fast iteration loop, excellent UX",
      "Background Agents for long tasks",
      "Composer Model: 250 tok/s MoE",
      "Cursor 3: new Agents Window interface",
    ],
    weaknesses: [
      "Closed-source, $20/month",
      "Background Agents limited in multi-repo work",
    ],
    architecture: "IDE fork + Background Agents",
    isolation: "Cloud VM / local",
    context: "IDE-integrated context",
    qa: "In-loop error correction",
    openSource: false,
    swebench: "N/A",
  },
  {
    name: "Windsurf",
    org: "Cognition (ex-Codeium)",
    color: "border-teal-500/40 bg-teal-500/5",
    accent: "text-teal-400",
    approach:
      "AI-native IDE built from scratch with Cascade dual-agent system: background planner + active executor with real-time awareness.",
    strengths: [
      "Purpose-built IDE (not a fork)",
      "1M+ users, 4K+ enterprise customers",
      "Real-time awareness of user actions",
      "FedRAMP High authorized",
    ],
    weaknesses: [
      "Acquired by Cognition, future unclear",
      "May lose independent identity",
    ],
    architecture: "Cascade dual-agent",
    isolation: "Local",
    context: "Real-time awareness tracking",
    qa: "Linter integration + checkpoints",
    openSource: false,
    swebench: "N/A",
  },
  {
    name: "OpenAI Codex",
    org: "OpenAI",
    color: "border-green-500/40 bg-green-500/5",
    accent: "text-green-400",
    approach:
      "Cloud-based agent with isolated sandbox environments. Subagent system decomposes tasks into parallel workers.",
    strengths: [
      "Strong sandbox security",
      "Subagents GA (March 2026)",
      "Multi-platform (Windows support)",
      "GPT-5.3-Codex-Spark: 15x faster",
    ],
    weaknesses: [
      "Cloud-only for full features",
      "Vendor lock-in to OpenAI",
      "Opaque pricing at scale",
    ],
    architecture: "Cloud sandbox + subagents",
    isolation: "Cloud sandbox",
    context: "Per-sandbox context",
    qa: "Manager validation + assembly",
    openSource: false,
    swebench: "~85% (GPT-5.3)",
  },
  {
    name: "Amazon Q",
    org: "Amazon Web Services",
    color: "border-orange-500/40 bg-orange-500/5",
    accent: "text-orange-400",
    approach:
      "Autonomous agent with deep AWS integration for feature implementation, code transformations, and language upgrades.",
    strengths: [
      "Deep AWS ecosystem integration",
      "Enterprise-ready",
      "Strong Java/cloud migration automation",
      "Broad language support (15+ langs)",
    ],
    weaknesses: [
      "AWS-centric",
      "Less flexible than open-source alternatives",
      "1K interaction cap/month on free tier",
    ],
    architecture: "AWS-integrated agent",
    isolation: "AWS",
    context: "AWS-scoped context",
    qa: "Slash command workflows",
    openSource: false,
    swebench: "66%",
  },
  {
    name: "GitHub Copilot",
    org: "GitHub / Microsoft",
    color: "border-zinc-400/40 bg-zinc-400/5",
    accent: "text-zinc-300",
    approach:
      "Agent Mode for multi-step IDE tasks. Coding Agent turns GitHub issues into autonomous PRs. Spark for natural-language apps.",
    strengths: [
      "Deepest GitHub integration (issues to PRs)",
      "Massive user base",
      "Multi-IDE support",
      "Spark for non-engineers",
    ],
    weaknesses: [
      "Less autonomous for complex tasks",
      "Requires GitHub ecosystem",
      "Agent mode still maturing on multi-file reasoning",
    ],
    architecture: "GitHub-integrated agent",
    isolation: "GitHub-hosted",
    context: "Issue/PR context",
    qa: "Test loop in agent mode",
    openSource: false,
    swebench: "N/A",
  },
];

/* ------------------------------------------------------------------ */
/*  Mermaid chart definitions                                          */
/* ------------------------------------------------------------------ */

const hierarchicalChart = `graph TD
    Orch["Orchestrator"]
    Decompose["Decompose request\\ninto subtasks"]
    S1["Specialist A"]
    S2["Specialist B"]
    S3["Specialist C"]
    Synth["Synthesize results"]
    Out["Final output"]

    Orch --> Decompose
    Decompose --> S1
    Decompose --> S2
    Decompose --> S3
    S1 --> Synth
    S2 --> Synth
    S3 --> Synth
    Synth --> Out

    style Orch fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style S1 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style S2 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style S3 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style Synth fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Out fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
`;

const planAndExecuteChart = `graph TD
    Task["Task input"]
    Planner["Planner\\n(expensive model: Opus)"]
    Plan["Detailed plan"]
    E1["Executor 1\\n(cheap: Haiku)"]
    E2["Executor 2\\n(cheap: Haiku)"]
    E3["Executor 3\\n(cheap: Haiku)"]
    Merge["Merge results"]
    Out["Output\\n(83% cost reduction)"]

    Task --> Planner
    Planner --> Plan
    Plan --> E1
    Plan --> E2
    Plan --> E3
    E1 --> Merge
    E2 --> Merge
    E3 --> Merge
    Merge --> Out

    style Planner fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Plan fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style E1 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style E2 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style E3 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style Out fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
`;

const qaLoopChart = `graph TD
    Brainstorm["Brainstorm / Intake"]
    GTD["Ground Truth Document"]
    PO["Pipeline Orchestrator"]

    subgraph PlanLoop["Plan Loop (max 3 iterations)"]
        PGen["Plan Generator"]
        PReview["Plan Reviewer"]
        PApproved["PLAN_APPROVED"]
        PGen --> PReview
        PReview -->|"feedback"| PGen
        PReview -->|"approved"| PApproved
    end

    subgraph CodeLoop["Code Loop (max 3 iterations)"]
        CGen["Code Generator"]
        CReview["Code Reviewer"]
        CDone["IMPLEMENTATION_COMPLETE"]
        CGen --> CReview
        CReview -->|"feedback"| CGen
        CReview -->|"approved"| CDone
    end

    Final{"Final Review Gate\\nGO / NO-GO"}
    Ship["Ship"]
    Rework["Rework"]

    Brainstorm --> GTD
    GTD --> PO
    PO --> PlanLoop
    PO --> CodeLoop
    PApproved --> CodeLoop
    CDone --> Final
    Final -->|"GO"| Ship
    Final -->|"NO-GO"| Rework

    style Brainstorm fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style GTD fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style PO fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style PApproved fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style CDone fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Ship fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Rework fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style PlanLoop fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style CodeLoop fill:#18181b,stroke:#3f3f46,color:#e4e4e7
`;

const priorityMatrixChart = `quadrantChart
    title Impact vs Effort — Improvement Proposals
    x-axis Low Effort --> High Effort
    y-axis Low Impact --> High Impact
    quadrant-1 Do Next
    quadrant-2 Quick Wins
    quadrant-3 Consider Later
    quadrant-4 Fill Backlog
    Model Tiering: [0.25, 0.85]
    Doom-Loop Detection: [0.25, 0.80]
    Rhetorical Questions: [0.20, 0.55]
    Cost Tracking: [0.30, 0.55]
    Post-Mortem Agent: [0.25, 0.50]
    Review Personas: [0.50, 0.82]
    Ground Truth Doc: [0.50, 0.80]
    Context Compaction: [0.50, 0.55]
    Feedback Bus: [0.50, 0.55]
    Test-First Flow: [0.55, 0.80]
    Safety Tiers: [0.55, 0.78]
    Dual Cross-Validation: [0.60, 0.75]
    Shared Scratchpad: [0.75, 0.80]
    Ephemeral Env Testing: [0.80, 0.55]
    A2A Agent Discovery: [0.70, 0.30]
`;

/* ------------------------------------------------------------------ */
/*  Table of contents data                                             */
/* ------------------------------------------------------------------ */

const part1Items = [
  { id: "agent-profiles", label: "Agent Profiles" },
  { id: "comparison-table", label: "Comparison Table" },
  { id: "orchestration-patterns", label: "Multi-Agent Orchestration Patterns" },
  { id: "isolation-strategies", label: "Isolation Strategies" },
  { id: "context-management", label: "Context Window Management" },
  { id: "qa-patterns", label: "Quality Assurance Patterns" },
  { id: "academic-research", label: "Academic Research" },
  { id: "swe-bench", label: "SWE-Bench Leaderboard" },
];

const part2Items = [
  { id: "current-state", label: "Where Night Shift Stands Today" },
  { id: "priority-matrix", label: "Priority Matrix" },
  { id: "proposals-context", label: "Context Management" },
  { id: "proposals-quality", label: "Quality & Testing" },
  { id: "proposals-orchestration", label: "Orchestration & Communication" },
  { id: "proposals-safety", label: "Safety & Cost" },
  { id: "proposals-observability", label: "Observability & Learning" },
];

/* ------------------------------------------------------------------ */
/*  Improvement proposals data                                         */
/* ------------------------------------------------------------------ */

interface Proposal {
  id: string;
  title: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  category: string;
  description: string;
  howItWorks: string;
  currentState: string;
}

const proposals: Proposal[] = [
  {
    id: "model-tiering",
    title: "Adopt Model Tiering",
    impact: "high",
    effort: "low",
    category: "orchestration",
    description:
      "Use different models per agent role: Opus for orchestrator/planner, Sonnet for implementation and QA, Haiku for focused tasks like testing and fixing.",
    howItWorks:
      "Route tasks to models based on complexity. The plan-and-execute pattern achieves 83% cost reduction in production systems. Expected benefit: 50-70% cost reduction with minimal quality impact.",
    currentState: "Night Shift currently uses a single model for all agents.",
  },
  {
    id: "doom-loop",
    title: "Doom-Loop Detection",
    impact: "high",
    effort: "low",
    category: "observability",
    description:
      "Detect repeated tool call patterns across iterations to avoid infinite loops. Track same file edits, same test failures, same error messages.",
    howItWorks:
      "If a doom-loop is detected: escalate to a different agent, try an alternative approach, or halt with a detailed diagnostic. Log convergence rate and repeated action ratio.",
    currentState:
      "Ralph-loop has iteration limits but may not detect circular behavior patterns.",
  },
  {
    id: "rhetorical-questions",
    title: "Rhetorical Question Review Strategy",
    impact: "medium",
    effort: "low",
    category: "quality",
    description:
      'Train reviewer agents to ask guided reasoning questions instead of direct instructions. E.g., "What happens when the database connection drops mid-transaction?"',
    howItWorks:
      "The GAN-inspired pattern research shows rhetorical questions activate broader code examination versus mechanical patching of specific lines.",
    currentState:
      'Reviewers likely provide direct instructions ("fix line 45").',
  },
  {
    id: "cost-tracking",
    title: "Cost Tracking & Budget Enforcement",
    impact: "medium",
    effort: "low",
    category: "safety",
    description:
      "Track token usage per agent, per iteration, per phase. Set cost ceilings per night shift run with alerts and graceful shutdown.",
    howItWorks:
      "Alert at 70% budget consumption. Force graceful shutdown with status report at ceiling. Log cost/quality ratios to optimize model selection over time.",
    currentState:
      "Iteration limits exist, but per-run cost tracking may be limited.",
  },
  {
    id: "post-mortem",
    title: "Post-Mortem Analysis Agent",
    impact: "medium",
    effort: "low",
    category: "observability",
    description:
      "After each night shift, a dedicated agent reviews all iterations for patterns, identifies recurring failure modes, and suggests improvements.",
    howItWorks:
      "Reviews iteration count to convergence, recurring bug types, and produces metrics (convergence rate, cost per task, review pass rate). Updates a cumulative LESSONS_LEARNED.md.",
    currentState:
      "Debriefs exist but may not systematically feed back into the system.",
  },
  {
    id: "review-personas",
    title: "Implement Review Personas",
    impact: "high",
    effort: "medium",
    category: "quality",
    description:
      "Expand to six specialized review personas: Architect, Domain Expert, Code Expert, Performance Expert, Security Expert, and Human Advocate.",
    howItWorks:
      "Each persona reviews against specific documentation sections with a distinct system prompt. More nuanced than a single 'code reviewer' agent.",
    currentState:
      "Night Shift has night-qa, code-reviewer, and security-reviewer agents.",
  },
  {
    id: "ground-truth",
    title: "Phase-0 Ground Truth Document",
    impact: "high",
    effort: "medium",
    category: "context",
    description:
      "Before any generation begins, establish three read-only assessment documents: brainstorm.md, health-audit.md, and doc-audit.md.",
    howItWorks:
      "All subsequent agents validate against these documents, not the original user request. Ensures grounded execution with shared context about the codebase state.",
    currentState:
      "Night Shift has enriched specs and state files but no formal pre-generation audit.",
  },
  {
    id: "context-compaction",
    title: "Progressive Context Compaction",
    impact: "medium",
    effort: "medium",
    category: "context",
    description:
      "Five-stage progressive compaction from full context to emergency summarization, plus a cumulative DECISIONS.md file across iterations.",
    howItWorks:
      "Stages: full context (0-50%), summarize outputs (50-70%), compress history (70-80%), aggressive summarization (80-90%), emergency compaction (90%+). DECISIONS.md prevents repeating mistakes.",
    currentState:
      "Fresh context per iteration (Ralph loop) works well but loses inter-iteration learning.",
  },
  {
    id: "feedback-bus",
    title: "Structured Feedback Bus",
    impact: "medium",
    effort: "medium",
    category: "orchestration",
    description:
      "A structured feedback.md file with Active Feedback, Resolved Feedback, and Signals sections following the GAN-inspired pattern.",
    howItWorks:
      "Issues are filed by reviewers, assigned to agents, tracked through resolution with commit references. Signal protocol tracks phase progression (PLAN_APPROVED, QA_CYCLE: 2/3).",
    currentState:
      "State file serves as primary communication but lacks structured issue tracking.",
  },
  {
    id: "test-first",
    title: "Test-First Agent Flow",
    impact: "high",
    effort: "medium",
    category: "quality",
    description:
      "Night-tester creates extensive tests before implementation begins. Tests define expected behavior as executable specifications.",
    howItWorks:
      "Night-coder implements until tests pass. Night-qa validates test quality (no placeholder assertions). Provides objective convergence criteria for the Ralph loop.",
    currentState:
      "Tests may be written alongside or after implementation.",
  },
  {
    id: "safety-tiers",
    title: "Safety Tiers for Unattended Operation",
    impact: "high",
    effort: "medium",
    category: "safety",
    description:
      "Three safety tiers (Green/Yellow/Red) with schema-level tool filtering per agent based on the OpenDev defense-in-depth model.",
    howItWorks:
      "Green: auto-approve reads/tests. Yellow: auto-approve writes with logging. Red: block network/system commands. Schema-level filtering: night-qa never sees write tools.",
    currentState:
      "Permission management exists but may not be tiered by risk level.",
  },
  {
    id: "dual-validation",
    title: "Dual-Agent Cross-Validation",
    impact: "high",
    effort: "medium",
    category: "quality",
    description:
      "For critical changes, spawn a parallel implementation using a different model/approach and compare divergences.",
    howItWorks:
      "Night-Coder A and Night-Coder B implement the same spec independently. A diff-comparison agent identifies divergence points as likely bug candidates or specification ambiguities.",
    currentState:
      "QA cycles validate output but no parallel implementation comparison.",
  },
  {
    id: "shared-scratchpad",
    title: "Shared Scratchpad for Agent Coordination",
    impact: "high",
    effort: "high",
    category: "orchestration",
    description:
      "A real-time shared scratchpad with optimistic locking, inspired by Agent Teams' mailbox system.",
    howItWorks:
      "Agents read latest state before starting work. Orchestrator checks for conflicts before merging. Structured sections: active findings, resolved items, blocked tasks, coordination notes.",
    currentState:
      "Agents communicate through state files, but real-time coordination is limited.",
  },
  {
    id: "ephemeral-envs",
    title: "Ephemeral Environment Testing",
    impact: "medium",
    effort: "high",
    category: "quality",
    description:
      "Spin up fresh containers per test cycle to catch missing dependencies and environment-specific assumptions.",
    howItWorks:
      "Install dependencies from scratch, run full test suite in clean environment, validate that the PR would pass CI. Uses Container Use, Docker Sandbox, or E2B.",
    currentState:
      "Testing happens within the worktree using the local environment.",
  },
  {
    id: "a2a-discovery",
    title: "A2A-Style Agent Discovery",
    impact: "low",
    effort: "high",
    category: "orchestration",
    description:
      "Lightweight Agent Cards inspired by A2A protocol so the orchestrator can dynamically discover and spawn agents based on task requirements.",
    howItWorks:
      "Each agent publishes capabilities in a structured format. Orchestrator matches task requirements to agent capabilities. Enables future extensibility without modifying the orchestrator.",
    currentState: "Agent roles are hardcoded in skill definitions.",
  },
];

/* ------------------------------------------------------------------ */
/*  Proposal card component                                            */
/* ------------------------------------------------------------------ */

function ProposalCard({ proposal }: { proposal: Proposal }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h4 className="text-sm font-semibold text-zinc-100">
          {proposal.title}
        </h4>
        <Badge level={proposal.impact} label={`Impact: ${proposal.impact}`} />
        <Badge level={proposal.effort} label={`Effort: ${proposal.effort}`} />
      </div>
      <p className="mb-3 text-sm leading-relaxed text-zinc-400">
        {proposal.description}
      </p>
      <div className="space-y-2 border-t border-zinc-800 pt-3">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            How it works in Night Shift
          </span>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">
            {proposal.howItWorks}
          </p>
        </div>
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Current state
          </span>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
            {proposal.currentState}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ResearchPage() {
  const contextProposals = proposals.filter(
    (p) => p.category === "context"
  );
  const qualityProposals = proposals.filter(
    (p) => p.category === "quality"
  );
  const orchestrationProposals = proposals.filter(
    (p) => p.category === "orchestration"
  );
  const safetyProposals = proposals.filter(
    (p) => p.category === "safety"
  );
  const observabilityProposals = proposals.filter(
    (p) => p.category === "observability"
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Page header */}
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Research &amp; Improvements
      </h1>
      <p className="mb-12 text-lg text-zinc-400">
        A comprehensive survey of the autonomous coding agent landscape,
        multi-agent orchestration patterns, academic research, and concrete
        improvement proposals for Night Shift. Compiled April 2026.
      </p>

      {/* ============================================================ */}
      {/*  Table of Contents                                            */}
      {/* ============================================================ */}
      <nav className="mb-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          On this page
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
              Part 1 &mdash; The Autonomous Coding Landscape
            </h3>
            <ol className="space-y-1">
              {part1Items.map(({ id, label }, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm text-zinc-400 transition-colors hover:text-blue-400"
                  >
                    <span className="mr-2 text-zinc-600">{i + 1}.</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
              Part 2 &mdash; Improvement Proposals for Night Shift
            </h3>
            <ol className="space-y-1">
              {part2Items.map(({ id, label }, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm text-zinc-400 transition-colors hover:text-purple-400"
                  >
                    <span className="mr-2 text-zinc-600">{i + 1}.</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/*  PART 1 — THE AUTONOMOUS CODING LANDSCAPE                    */}
      {/* ============================================================ */}
      <div className="mb-12 rounded-lg border-l-4 border-blue-500 bg-blue-500/5 px-6 py-4">
        <h2 className="text-lg font-bold text-blue-400">
          Part 1 &mdash; The Autonomous Coding Landscape
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          A survey of major agents, orchestration patterns, isolation strategies,
          context management, QA loops, and academic research as of April 2026.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  1. Agent Profiles                                            */}
      {/* ============================================================ */}
      <section id="agent-profiles" className="mb-20 scroll-mt-24">
        <SectionHeading id="agent-profiles-heading">
          1. Agent Profiles
        </SectionHeading>
        <Prose>
          <p>
            Eight major autonomous coding agents define the current landscape,
            spanning fully autonomous cloud-based systems to IDE-integrated
            assistants. Each card below summarizes the agent&apos;s architecture,
            strengths, and weaknesses.
          </p>
        </Prose>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className={`rounded-lg border p-5 ${agent.color}`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className={`text-base font-bold ${agent.accent}`}>
                    {agent.name}
                  </h3>
                  <p className="text-xs text-zinc-500">{agent.org}</p>
                </div>
                {agent.openSource && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                    Open Source
                  </span>
                )}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                {agent.approach}
              </p>
              <Collapsible title="Strengths & Weaknesses">
                <div className="space-y-3">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-green-400">
                      Strengths
                    </p>
                    <ul className="space-y-1">
                      {agent.strengths.map((s) => (
                        <li
                          key={s}
                          className="text-xs leading-relaxed text-zinc-400"
                        >
                          + {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-400">
                      Weaknesses
                    </p>
                    <ul className="space-y-1">
                      {agent.weaknesses.map((w) => (
                        <li
                          key={w}
                          className="text-xs leading-relaxed text-zinc-400"
                        >
                          - {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Collapsible>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Comparison Table                                          */}
      {/* ============================================================ */}
      <section id="comparison-table" className="mb-20 scroll-mt-24">
        <SectionHeading id="comparison-table-heading">
          2. Comparison Table
        </SectionHeading>
        <Prose>
          <p>
            Side-by-side comparison of all eight agents across key dimensions.
          </p>
        </Prose>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-900">
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Agent
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Architecture
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Isolation
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Context Mgmt
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  QA Approach
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Open Source
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  SWE-bench
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {agents.map((a) => (
                <tr key={a.name} className="hover:bg-zinc-900/50">
                  <td className="whitespace-nowrap px-3 py-2.5 font-medium text-zinc-200">
                    {a.name}
                  </td>
                  <td className="px-3 py-2.5 text-zinc-400">
                    {a.architecture}
                  </td>
                  <td className="px-3 py-2.5 text-zinc-400">{a.isolation}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{a.context}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{a.qa}</td>
                  <td className="px-3 py-2.5 text-zinc-400">
                    {a.openSource ? (
                      <span className="text-emerald-400">Yes</span>
                    ) : (
                      <span className="text-zinc-600">No</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-zinc-400">
                    {a.swebench}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. Multi-Agent Orchestration Patterns                        */}
      {/* ============================================================ */}
      <section id="orchestration-patterns" className="mb-20 scroll-mt-24">
        <SectionHeading id="orchestration-patterns-heading">
          3. Multi-Agent Orchestration Patterns
        </SectionHeading>
        <Prose>
          <p>
            Five primary orchestration patterns have emerged from production
            systems and frameworks in 2025&ndash;2026.
          </p>
        </Prose>

        <div className="mt-6 space-y-4">
          {/* Pattern 1 */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-zinc-100">
              Pattern 1: Flat Routing
            </h4>
            <p className="text-xs leading-relaxed text-zinc-400">
              A classifier examines input and routes to a single specialist
              agent. Fast and cheap (~$0.001/call). Fails on multi-intent
              requests &mdash; specification failures account for ~42% of
              multi-agent failures.
            </p>
          </div>

          {/* Pattern 2 */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-zinc-100">
              Pattern 2: Sequential Pipeline
            </h4>
            <p className="text-xs leading-relaxed text-zinc-400">
              Agents operate in predetermined order, each output feeding the
              next. Predictable but latency compounds: three sequential agents
              create 6&ndash;9 seconds of wall-clock time. Cannot adapt
              mid-pipeline.
            </p>
          </div>

          {/* Pattern 3: Hierarchical — with diagram */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-2 text-sm font-semibold text-zinc-100">
              Pattern 3: Hierarchical Orchestration (Orchestrator-Worker)
            </h4>
            <p className="mb-4 text-xs leading-relaxed text-zinc-400">
              An orchestrator decomposes the request into independent subtasks,
              delegates to specialists in parallel, then synthesizes results.
              Clear accountability, debuggable traces, graceful degradation.
              Requires a capable model for decomposition.{" "}
              <strong className="text-zinc-300">
                This is Night Shift&apos;s core pattern.
              </strong>
            </p>
            <MermaidDiagram chart={hierarchicalChart} />
          </div>

          {/* Pattern 4: Plan-and-Execute — with diagram */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-2 text-sm font-semibold text-zinc-100">
              Pattern 4: Plan-and-Execute
            </h4>
            <p className="mb-4 text-xs leading-relaxed text-zinc-400">
              An expensive reasoning model creates a detailed plan; cheaper
              models execute each step. Achieves{" "}
              <strong className="text-zinc-300">83% cost reduction</strong>{" "}
              versus running everything on the strongest model. Use model
              tiering: planner on Opus, executors on Haiku (20x cheaper).
            </p>
            <MermaidDiagram chart={planAndExecuteChart} />
          </div>

          {/* Pattern 5 */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-zinc-100">
              Pattern 5: Competitive / Adversarial
            </h4>
            <p className="text-xs leading-relaxed text-zinc-400">
              Multiple agents work on the same problem independently, then
              results are compared or debated. Used for debugging (competing
              hypotheses), code review (multiple perspectives), and research
              (parallel exploration). Higher token cost but more robust results.
            </p>
          </div>
        </div>

        {/* Passing Ships Problem */}
        <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <h4 className="mb-1 text-sm font-semibold text-amber-400">
            The &ldquo;Passing Ships&rdquo; Problem
          </h4>
          <p className="text-xs leading-relaxed text-zinc-400">
            Agents operating in parallel cannot see each other&apos;s decisions.
            Solution: shared scratchpad with real-time writes, optimistic locking
            on shared state, and orchestrator conflict resolution before merging.
          </p>
        </div>

        {/* Framework Landscape */}
        <SubHeading>Framework Landscape (2026)</SubHeading>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-900">
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Framework
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Orchestration Model
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  State Management
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Best For
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                {
                  name: "LangGraph",
                  orch: "Directed graph with conditional edges",
                  state: "Checkpointed, time-travel debugging",
                  best: "Production multi-step pipelines",
                },
                {
                  name: "CrewAI",
                  orch: "Role-based crews with process types",
                  state: "Out-of-the-box coordination, built-in memory",
                  best: "Rapid prototyping",
                },
                {
                  name: "AutoGen (AG2)",
                  orch: "Conversational GroupChat + event-driven",
                  state: "Async-first, selector-based turn mgmt",
                  best: "Conversational multi-agent scenarios",
                },
                {
                  name: "OpenAI Agents SDK",
                  orch: "Code-first orchestration",
                  state: "Built-in state",
                  best: "OpenAI ecosystem",
                },
                {
                  name: "Google ADK",
                  orch: "Session-based with memory + artifacts",
                  state: "Compiled view over stateful system",
                  best: "Google Cloud integration",
                },
                {
                  name: "Anthropic Agent SDK",
                  orch: "Hub-and-spoke delegation",
                  state: "Event-sourced",
                  best: "Claude ecosystem",
                },
              ].map((f) => (
                <tr key={f.name} className="hover:bg-zinc-900/50">
                  <td className="whitespace-nowrap px-3 py-2.5 font-medium text-zinc-200">
                    {f.name}
                  </td>
                  <td className="px-3 py-2.5 text-zinc-400">{f.orch}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{f.state}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{f.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Claude Code Orchestration */}
        <SubHeading>Claude Code Orchestration</SubHeading>
        <Prose>
          <p>
            Claude Code offers three levels of multi-agent coordination:
          </p>
        </Prose>
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-purple-400">
              Subagents (Built-in)
            </h4>
            <p className="text-xs leading-relaxed text-zinc-400">
              Work within a single session &mdash; delegate focused tasks to
              isolated workers with custom system prompts and independent tool
              access. Results flow back to the main agent. Three delegation
              patterns: natural language naming, @-mention, session-wide (--agent
              flag). Cost optimization by routing to cheaper models like Haiku.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-purple-400">
              Agent Teams (Experimental, Feb 2026)
            </h4>
            <p className="text-xs leading-relaxed text-zinc-400">
              Multiple independent sessions that communicate directly. Team lead
              creates a shared task list; teammates self-claim or receive
              assigned tasks. Worktree isolation via --worktree flag. Quality
              gates via hooks: TeammateIdle, TaskCreated, TaskCompleted.
              Limitation: no session resumption, one team per session, no nested
              teams.
            </p>
          </div>
          <Collapsible title="Community Orchestrators (5 projects)">
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <strong className="text-zinc-300">ccswarm</strong> &mdash;
                Workflow automation with template-based scaffolding and git
                worktree isolation.
              </li>
              <li>
                <strong className="text-zinc-300">Agent Orchestrator</strong>{" "}
                (Composio) &mdash; Manages fleets of agents, each with its own
                worktree, branch, and PR.
              </li>
              <li>
                <strong className="text-zinc-300">Overstory</strong> &mdash;
                Spawns workers in git worktrees via tmux, coordinates through
                SQLite mail, merges with tiered conflict resolution.
              </li>
              <li>
                <strong className="text-zinc-300">Gas Town</strong> (Steve
                Yegge) &mdash; &ldquo;Kubernetes for AI agents&rdquo; &mdash;
                hierarchical &ldquo;mayor&rdquo; agent decomposes and spawns
                agents.
              </li>
              <li>
                <strong className="text-zinc-300">Multiclaude</strong> (Dan
                Lorenc) &mdash; Supervisor assigns work, singleplayer
                (auto-merge) or multiplayer (teammate review) modes.
              </li>
            </ul>
          </Collapsible>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. Isolation Strategies                                      */}
      {/* ============================================================ */}
      <section id="isolation-strategies" className="mb-20 scroll-mt-24">
        <SectionHeading id="isolation-strategies-heading">
          4. Isolation Strategies
        </SectionHeading>
        <Prose>
          <p>
            Isolating agent execution environments prevents cross-contamination
            and improves security. Three tiers have emerged:
          </p>
        </Prose>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-900">
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Tier
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Technology
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Isolation Level
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Startup Time
                </th>
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Use Case
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr className="hover:bg-zinc-900/50">
                <td className="px-3 py-2.5 font-medium text-zinc-200">
                  MicroVMs
                </td>
                <td className="px-3 py-2.5 text-zinc-400">
                  Firecracker, Kata Containers
                </td>
                <td className="px-3 py-2.5 text-zinc-400">
                  Strongest (dedicated kernel)
                </td>
                <td className="px-3 py-2.5 text-zinc-400">~125ms</td>
                <td className="px-3 py-2.5 text-zinc-400">
                  Untrusted code, production
                </td>
              </tr>
              <tr className="hover:bg-zinc-900/50">
                <td className="px-3 py-2.5 font-medium text-zinc-200">
                  gVisor
                </td>
                <td className="px-3 py-2.5 text-zinc-400">
                  User-space kernel intercept
                </td>
                <td className="px-3 py-2.5 text-zinc-400">
                  Strong (syscall filtering)
                </td>
                <td className="px-3 py-2.5 text-zinc-400">Fast</td>
                <td className="px-3 py-2.5 text-zinc-400">
                  Balanced security/performance
                </td>
              </tr>
              <tr className="hover:bg-zinc-900/50">
                <td className="px-3 py-2.5 font-medium text-zinc-200">
                  Hardened Containers
                </td>
                <td className="px-3 py-2.5 text-zinc-400">
                  Docker + seccomp
                </td>
                <td className="px-3 py-2.5 text-zinc-400">Moderate</td>
                <td className="px-3 py-2.5 text-zinc-400">Fastest</td>
                <td className="px-3 py-2.5 text-zinc-400">
                  Trusted code, development
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <SubHeading>Git Worktrees: The De Facto Standard</SubHeading>
        <Prose>
          <p>
            Git worktrees are the industry standard for parallel agent file
            isolation. Each agent gets a separate working directory sharing the
            same <code className="rounded bg-zinc-800 px-1 py-0.5 text-zinc-300">.git</code> metadata
            but maintaining independent file states. No two agents work on the
            same branch simultaneously, preventing merge conflicts during
            execution. This is Night Shift&apos;s isolation model.
          </p>
        </Prose>

        <Collapsible title="Key Isolation Tools (5 projects)">
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>
              <strong className="text-zinc-300">Container Use (Dagger)</strong>{" "}
              &mdash; Open-source MCP server giving each agent its own
              containerized sandbox and worktree. Integrates with Claude Code,
              Cursor, Zed.
            </li>
            <li>
              <strong className="text-zinc-300">Docker Sandboxes</strong>{" "}
              &mdash; Isolated microVM sandboxes with branch mode creating
              worktrees in .sbx/ for multi-agent work.
            </li>
            <li>
              <strong className="text-zinc-300">
                Kubernetes Agent Sandbox
              </strong>{" "}
              &mdash; kubernetes-sigs project for isolated, stateful, singleton
              agent workloads.
            </li>
            <li>
              <strong className="text-zinc-300">E2B</strong> &mdash; Cloud
              sandbox runtime: from 40K to ~15M sessions/month in one year. ~50%
              of Fortune 500 running agent workloads.
            </li>
            <li>
              <strong className="text-zinc-300">Isolarium</strong> &mdash; Three
              isolation flavors: Nono (lightweight), Container (moderate),
              Virtual machine (strongest).
            </li>
          </ul>
        </Collapsible>
      </section>

      {/* ============================================================ */}
      {/*  5. Context Window Management                                 */}
      {/* ============================================================ */}
      <section id="context-management" className="mb-20 scroll-mt-24">
        <SectionHeading id="context-management-heading">
          5. Context Window Management
        </SectionHeading>
        <Prose>
          <p>
            Anthropic&apos;s 2026 Agentic Coding Report introduces a critical
            distinction:{" "}
            <strong className="text-zinc-300">prompt engineering</strong> is
            about crafting the right instruction.{" "}
            <strong className="text-zinc-300">Context engineering</strong> is
            about giving the AI the right information. The bottleneck has shifted
            from &ldquo;the agent does not understand what I want&rdquo; to
            &ldquo;the agent does not have the context it needs.&rdquo;
          </p>
        </Prose>

        <SubHeading>Strategies for Long-Running Agents</SubHeading>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-900">
                <th className="whitespace-nowrap px-3 py-3 font-semibold text-zinc-200">
                  Strategy
                </th>
                <th className="px-3 py-3 font-semibold text-zinc-200">
                  How It Works
                </th>
                <th className="px-3 py-3 font-semibold text-zinc-200">
                  Trade-offs
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                {
                  name: "Full-context caching",
                  how: "Dump entire codebase into context cache; pay once",
                  tradeoff: "Expensive upfront, fast reads",
                },
                {
                  name: "RAG retrieval",
                  how: "Retrieve only relevant chunks per query",
                  tradeoff:
                    "Lower cost per query, may miss cross-file dependencies",
                },
                {
                  name: "Sliding window",
                  how: "Drop oldest messages when buffer full",
                  tradeoff:
                    'Risk of "catastrophic amnesia" on early decisions',
                },
                {
                  name: "Compaction / summarization",
                  how: "Summarize older turns when nearing limit",
                  tradeoff:
                    "Preserves critical details, discards redundant outputs",
                },
                {
                  name: "Dual-memory architecture",
                  how: "Episodic memory (full) + working memory (recent)",
                  tradeoff: "Best of both worlds but complex to implement",
                },
                {
                  name: "State files on disk",
                  how: "Write critical context to files, read back fresh",
                  tradeoff:
                    "Zero context overhead, survives restarts. Night Shift's core pattern.",
                },
                {
                  name: "System reminders",
                  how: 'Inject guidance at decision points to counter "instruction fade-out"',
                  tradeoff: "Low overhead, high impact on long sessions",
                },
              ].map((s) => (
                <tr key={s.name} className="hover:bg-zinc-900/50">
                  <td className="whitespace-nowrap px-3 py-2.5 font-medium text-zinc-200">
                    {s.name}
                  </td>
                  <td className="px-3 py-2.5 text-zinc-400">{s.how}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{s.tradeoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SubHeading>Context Degradation Thresholds</SubHeading>
        <Prose>
          <p>
            Based on real-world Claude Code usage, precision degrades
            predictably as the context window fills:
          </p>
        </Prose>
        <div className="mt-4 space-y-2">
          {[
            {
              range: "0-50%",
              color: "bg-emerald-500",
              width: "w-1/2",
              label: "Full precision",
              desc: "Work freely",
            },
            {
              range: "50-70%",
              color: "bg-yellow-500",
              width: "w-[70%]",
              label: "Pay attention",
              desc: "Consider compaction",
            },
            {
              range: "70-85%",
              color: "bg-orange-500",
              width: "w-[85%]",
              label: "Precision degrades",
              desc: "Use /compact",
            },
            {
              range: "85-90%",
              color: "bg-red-500",
              width: "w-[90%]",
              label: "Hallucinations increase",
              desc: "Significant quality drop",
            },
            {
              range: "90%+",
              color: "bg-red-700",
              width: "w-full",
              label: "Erratic responses",
              desc: "/clear is mandatory",
            },
          ].map((t) => (
            <div key={t.range} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-right font-mono text-xs text-zinc-500">
                {t.range}
              </span>
              <div className="flex-1">
                <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className={`h-full rounded-full ${t.color} opacity-40`}
                    style={{
                      width:
                        t.range === "0-50%"
                          ? "50%"
                          : t.range === "50-70%"
                            ? "70%"
                            : t.range === "70-85%"
                              ? "85%"
                              : t.range === "85-90%"
                                ? "90%"
                                : "100%",
                    }}
                  />
                </div>
              </div>
              <div className="w-48 shrink-0">
                <span className="text-xs font-medium text-zinc-300">
                  {t.label}
                </span>
                <span className="ml-2 text-xs text-zinc-500">{t.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <SubHeading>The Fresh-Context Pattern (Ralph Loop)</SubHeading>
        <Prose>
          <p>
            Instead of accumulating ever more context,{" "}
            <strong className="text-zinc-300">
              every iteration starts from zero
            </strong>
            . Only the specs and the implementation plan are in context. All work
            persists in files. Each iteration reads the current state of the
            codebase and state files rather than relying on conversation history.
            This is the foundation of Night Shift&apos;s iteration design.
          </p>
        </Prose>
      </section>

      {/* ============================================================ */}
      {/*  6. Quality Assurance Patterns                                */}
      {/* ============================================================ */}
      <section id="qa-patterns" className="mb-20 scroll-mt-24">
        <SectionHeading id="qa-patterns-heading">
          6. Quality Assurance Patterns
        </SectionHeading>

        <SubHeading>GAN-Inspired Adversarial QA</SubHeading>
        <Prose>
          <p>
            The Planner-Generator-Evaluator pattern applies adversarial machine
            learning principles to software development. Role separation is{" "}
            <strong className="text-zinc-300">enforced by the system</strong>,
            not suggested by the prompt &mdash; the generator cannot approve its
            own output. Communication flows through a filesystem-based feedback
            file.
          </p>
        </Prose>

        <MermaidDiagram className="my-6" chart={qaLoopChart} />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Key Principles
            </h4>
            <ul className="space-y-1 text-xs text-zinc-400">
              <li>
                Rhetorical questions over directives for broader examination
              </li>
              <li>3-iteration maximum per loop (major, subtle, edge cases)</li>
              <li>~50k token target, 75k hard ceiling per phase</li>
              <li>
                Phase-0 immutable conventions as shared source of truth
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              What It Catches
            </h4>
            <ul className="space-y-1 text-xs text-zinc-400">
              <li>Hallucinated file paths and task ordering deadlocks</li>
              <li>Placeholder tests lacking real assertions</li>
              <li>Architecture convention violations</li>
              <li>Missing error path coverage</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs leading-relaxed text-zinc-400">
            <strong className="text-amber-400">Trade-off:</strong> 2&ndash;3x
            higher token usage than single-pass, 30&ndash;45 minutes versus 10
            minutes &mdash; but catches critical bugs in auth, payments, and data
            integrity.
          </p>
        </div>

        <SubHeading>Multi-Agent Review Personas</SubHeading>
        <Prose>
          <p>
            Jamon Holmgren&apos;s Night Shift workflow uses six specialized
            review personas, each owning documentation sections and reviewing
            against their specialty:
          </p>
        </Prose>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Designer",
              focus: "UI/UX consistency",
              color: "text-pink-400",
            },
            {
              name: "Architect",
              focus: "System design & patterns",
              color: "text-purple-400",
            },
            {
              name: "Domain Expert",
              focus: "Business logic correctness",
              color: "text-blue-400",
            },
            {
              name: "Code Expert",
              focus: "Code quality & idioms",
              color: "text-cyan-400",
            },
            {
              name: "Performance Expert",
              focus: "Efficiency & scaling",
              color: "text-orange-400",
            },
            {
              name: "Human Advocate",
              focus: "Usability & accessibility",
              color: "text-emerald-400",
            },
          ].map((p) => (
            <div
              key={p.name}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5"
            >
              <span className={`text-sm font-semibold ${p.color}`}>
                {p.name}
              </span>
              <p className="text-xs text-zinc-500">{p.focus}</p>
            </div>
          ))}
        </div>

        <SubHeading>Closed-Loop QA Systems (2026 Trend)</SubHeading>
        <Prose>
          <p>
            Modern QA builds closed-loop AI systems where agents author, execute,
            and analyze tests autonomously with human governance. The pattern:
            one agent writes code, another critiques, another generates and runs
            tests, another validates compliance. By early 2025, 76% of
            enterprises had implemented explicit human-in-the-loop review.
            Knowledge workers spend an average of 4.3 hours/week reviewing AI
            outputs.
          </p>
        </Prose>
      </section>

      {/* ============================================================ */}
      {/*  7. Academic Research                                         */}
      {/* ============================================================ */}
      <section id="academic-research" className="mb-20 scroll-mt-24">
        <SectionHeading id="academic-research-heading">
          7. Academic Research
        </SectionHeading>
        <Prose>
          <p>
            Key academic papers advancing autonomous coding and multi-agent
            software engineering (2024&ndash;2026).
          </p>
        </Prose>

        <div className="mt-6 space-y-4">
          {/* Multi-Agent Collaboration */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-blue-400">
              Multi-Agent Collaboration
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-zinc-300">
                  &ldquo;Multi-Agent Collaboration Mechanisms: A Survey of
                  LLMs&rdquo;
                </p>
                <p className="text-xs text-zinc-500">
                  arXiv 2501.06322, Jan 2025 &mdash; 35-page survey of
                  collaboration architectures, communication protocols, and SDLC
                  applications.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-300">
                  &ldquo;ALMAS: An Autonomous LLM-based Multi-Agent
                  Framework&rdquo;
                </p>
                <p className="text-xs text-zinc-500">
                  arXiv 2510.03463 &mdash; Six agents mirroring agile teams
                  (Sprint, Supervisor, Summary, Control, Developer, Peer) with
                  Meta-RAG for change localization.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-300">
                  &ldquo;Multi-Agent Collaboration via Evolving
                  Orchestration&rdquo;
                </p>
                <p className="text-xs text-zinc-500">
                  arXiv 2505.19591, May 2025 &mdash; Puppeteer-style paradigm
                  using RL to adaptively sequence and prioritize agents with
                  reduced costs.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-300">
                  &ldquo;Cross-Team Orchestration (Croto)&rdquo;
                </p>
                <p className="text-xs text-zinc-500">
                  arXiv 2406.08979 &mdash; Scalable multi-team framework
                  enabling cross-team interaction in self-independent
                  environments.
                </p>
              </div>
            </div>
          </div>

          {/* Autonomous Debugging */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-amber-400">
              Autonomous Debugging
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-zinc-300">
                  &ldquo;SEIDR: Fully Autonomous Programming Using Iterative
                  Multi-Agent Debugging&rdquo;
                </p>
                <p className="text-xs text-zinc-500">
                  ACM TELO 2025 &mdash; Synthesize, Execute, Instruct, Debug,
                  Repair framework comparing replace-focused, repair-focused, and
                  hybrid debug strategies.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-300">
                  &ldquo;Runtime Execution Traces Guided Automated Program
                  Repair&rdquo;
                </p>
                <p className="text-xs text-zinc-500">
                  arXiv 2604.02647, Apr 2026 &mdash; Uses runtime traces for
                  multi-agent debate about bug causes, arguing with actual
                  execution data.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-300">
                  &ldquo;AGDebugger: Interactive Debugging of Multi-Agent
                  Systems&rdquo;
                </p>
                <p className="text-xs text-zinc-500">
                  CHI 2025 &mdash; UI for browsing, editing, and resetting agent
                  messages with overview visualization for complex conversation
                  histories.
                </p>
              </div>
            </div>
          </div>

          {/* Building Terminal Agents */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-emerald-400">
              Building AI Coding Agents for the Terminal
            </h4>
            <p className="mb-2 text-xs text-zinc-500">
              arXiv 2603.05344, Mar 2026 (OpenDev)
            </p>
            <div className="space-y-1 text-xs text-zinc-400">
              <p>Key architectural findings:</p>
              <ul className="ml-3 space-y-1">
                <li>
                  Six-phase execution cycle: pre-check/compaction, thinking,
                  self-critique, action, tool execution, post-processing
                </li>
                <li>
                  Dual-mode operation: Plan Mode (read-only via schema
                  filtering) vs Normal Mode (full read-write)
                </li>
                <li>
                  Adaptive five-stage progressive context compaction
                </li>
                <li>Doom-loop detection for repeated tool call patterns</li>
                <li>
                  Defense-in-depth: five independent safety layers
                </li>
                <li>
                  Key lesson: schema-level tool filtering is more robust than
                  runtime permission checks
                </li>
              </ul>
            </div>
          </div>

          {/* Communication Protocols */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h4 className="mb-1 text-sm font-semibold text-cyan-400">
              Agent Communication Protocols
            </h4>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="px-2 py-2 font-semibold text-zinc-300">
                      Protocol
                    </th>
                    <th className="px-2 py-2 font-semibold text-zinc-300">
                      By
                    </th>
                    <th className="px-2 py-2 font-semibold text-zinc-300">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="px-2 py-2 font-medium text-zinc-200">
                      MCP
                    </td>
                    <td className="px-2 py-2 text-zinc-400">
                      Anthropic / AAIF
                    </td>
                    <td className="px-2 py-2 text-zinc-400">
                      Agent-to-tools (vertical) &mdash; 97M monthly SDK
                      downloads
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 font-medium text-zinc-200">
                      A2A
                    </td>
                    <td className="px-2 py-2 text-zinc-400">Google</td>
                    <td className="px-2 py-2 text-zinc-400">
                      Agent-to-agent (horizontal) via Agent Cards
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 font-medium text-zinc-200">
                      ACP
                    </td>
                    <td className="px-2 py-2 text-zinc-400">IBM / BeeAI</td>
                    <td className="px-2 py-2 text-zinc-400">
                      Enterprise multi-agent messaging
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 font-medium text-zinc-200">
                      ANP
                    </td>
                    <td className="px-2 py-2 text-zinc-400">Community</td>
                    <td className="px-2 py-2 text-zinc-400">
                      Network-scale agent discovery
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. SWE-Bench Leaderboard                                     */}
      {/* ============================================================ */}
      <section id="swe-bench" className="mb-20 scroll-mt-24">
        <SectionHeading id="swe-bench-heading">
          8. SWE-Bench Leaderboard
        </SectionHeading>
        <Prose>
          <p>
            SWE-bench Verified is the canonical benchmark for autonomous coding.
            Top score jumped from ~65% (early 2025) to 93.9% (April 2026)
            &mdash; a 44% improvement in about 15 months.
          </p>
        </Prose>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-900">
                <th className="px-4 py-3 font-semibold text-zinc-200">Rank</th>
                <th className="px-4 py-3 font-semibold text-zinc-200">
                  Model / Agent
                </th>
                <th className="px-4 py-3 font-semibold text-zinc-200">
                  Score
                </th>
                <th className="px-4 py-3 font-semibold text-zinc-200">
                  Bar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                {
                  rank: 1,
                  name: "Claude Mythos Preview",
                  score: 93.9,
                  highlight: true,
                },
                { rank: 2, name: "GPT-5.3 Codex", score: 85.0 },
                { rank: 3, name: "Claude Opus 4.5", score: 80.9 },
                { rank: 4, name: "Claude Opus 4.6", score: 80.8 },
                { rank: 5, name: "Gemini 3.1 Pro", score: 80.6 },
                { rank: 6, name: "MiniMax M2.5", score: 80.2 },
                { rank: 7, name: "GPT-5.2", score: 80.0 },
                { rank: 8, name: "Claude Sonnet 4.6", score: 79.6 },
              ].map((m) => (
                <tr
                  key={m.rank}
                  className={
                    m.highlight
                      ? "bg-purple-500/5"
                      : "hover:bg-zinc-900/50"
                  }
                >
                  <td className="px-4 py-3 font-mono text-zinc-500">
                    #{m.rank}
                  </td>
                  <td
                    className={`px-4 py-3 font-medium ${m.highlight ? "text-purple-300" : "text-zinc-200"}`}
                  >
                    {m.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-300">
                    {m.score}%
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className={`h-full rounded-full ${m.highlight ? "bg-purple-500" : "bg-blue-500"}`}
                        style={{ width: `${m.score}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-xs leading-relaxed text-zinc-400">
            <strong className="text-zinc-300">Key industry data points:</strong>{" "}
            Engineers use AI in ~60% of work but can only fully delegate 0-20%
            of tasks (Anthropic 2026 Report). MCP has 97M monthly SDK downloads.
            E2B processes ~15M sandbox sessions/month. 40-62% of AI-generated
            code contains security vulnerabilities. 76% of enterprises have
            human-in-the-loop review processes.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PART 2 — IMPROVEMENT PROPOSALS                              */}
      {/* ============================================================ */}
      <div className="mb-12 mt-20 rounded-lg border-l-4 border-purple-500 bg-purple-500/5 px-6 py-4">
        <h2 className="text-lg font-bold text-purple-400">
          Part 2 &mdash; Improvement Proposals for Night Shift
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          15 concrete proposals derived from the research above, grouped by
          category with impact/effort ratings and an actionable priority matrix.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  Where Night Shift Stands Today                               */}
      {/* ============================================================ */}
      <section id="current-state" className="mb-20 scroll-mt-24">
        <SectionHeading id="current-state-heading">
          Where Night Shift Stands Today
        </SectionHeading>
        <Prose>
          <p>
            Night Shift already implements several patterns identified in the
            research. Here is what exists versus what is proposed:
          </p>
        </Prose>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
            <h4 className="mb-3 text-sm font-semibold text-emerald-400">
              Already Implemented
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>
                <span className="mr-1 text-emerald-400">&#10003;</span>{" "}
                Hierarchical orchestration (orchestrator-worker)
              </li>
              <li>
                <span className="mr-1 text-emerald-400">&#10003;</span>{" "}
                Ralph-loop fresh-context pattern
              </li>
              <li>
                <span className="mr-1 text-emerald-400">&#10003;</span>{" "}
                Git worktree isolation per agent
              </li>
              <li>
                <span className="mr-1 text-emerald-400">&#10003;</span>{" "}
                State files on disk for persistence
              </li>
              <li>
                <span className="mr-1 text-emerald-400">&#10003;</span>{" "}
                Multi-agent QA (night-qa, code-reviewer, security-reviewer)
              </li>
              <li>
                <span className="mr-1 text-emerald-400">&#10003;</span>{" "}
                Iteration limits and debrief reports
              </li>
              <li>
                <span className="mr-1 text-emerald-400">&#10003;</span>{" "}
                V3 Agent Teams for audit phase
              </li>
              <li>
                <span className="mr-1 text-emerald-400">&#10003;</span>{" "}
                Enriched spec generation (Phase 0)
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
            <h4 className="mb-3 text-sm font-semibold text-blue-400">
              Proposed Improvements
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>
                <span className="mr-1 text-blue-400">&#9679;</span> Model
                tiering (different models per agent role)
              </li>
              <li>
                <span className="mr-1 text-blue-400">&#9679;</span> Expanded
                review personas (6 specialties)
              </li>
              <li>
                <span className="mr-1 text-blue-400">&#9679;</span>{" "}
                Doom-loop detection and pattern analysis
              </li>
              <li>
                <span className="mr-1 text-blue-400">&#9679;</span>{" "}
                Test-first agent flow
              </li>
              <li>
                <span className="mr-1 text-blue-400">&#9679;</span>{" "}
                Phase-0 ground truth documents
              </li>
              <li>
                <span className="mr-1 text-blue-400">&#9679;</span> Safety
                tiers with schema-level tool filtering
              </li>
              <li>
                <span className="mr-1 text-blue-400">&#9679;</span> Cost
                tracking and budget enforcement
              </li>
              <li>
                <span className="mr-1 text-blue-400">&#9679;</span>{" "}
                Post-mortem analysis agent with LESSONS_LEARNED.md
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Priority Matrix                                              */}
      {/* ============================================================ */}
      <section id="priority-matrix" className="mb-20 scroll-mt-24">
        <SectionHeading id="priority-matrix-heading">
          Priority Matrix
        </SectionHeading>
        <Prose>
          <p>
            All 15 proposals mapped on an impact vs. effort quadrant. Quick Wins
            (high impact, low effort) should be implemented first.
          </p>
        </Prose>
        <MermaidDiagram className="my-6" chart={priorityMatrixChart} />

        {/* Text fallback summary */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
            <h4 className="mb-2 text-sm font-semibold text-emerald-400">
              Quick Wins (High Impact, Low Effort)
            </h4>
            <ul className="space-y-1 text-xs text-zinc-400">
              <li>Model Tiering</li>
              <li>Doom-Loop Detection</li>
            </ul>
          </div>
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
            <h4 className="mb-2 text-sm font-semibold text-blue-400">
              Do Next (High Impact, Medium-High Effort)
            </h4>
            <ul className="space-y-1 text-xs text-zinc-400">
              <li>Review Personas</li>
              <li>Ground Truth Document</li>
              <li>Test-First Flow</li>
              <li>Safety Tiers</li>
              <li>Dual-Agent Cross-Validation</li>
              <li>Shared Scratchpad</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
            <h4 className="mb-2 text-sm font-semibold text-amber-400">
              Fill Backlog (Medium Impact, Low-Medium Effort)
            </h4>
            <ul className="space-y-1 text-xs text-zinc-400">
              <li>Rhetorical Question Review Strategy</li>
              <li>Cost Tracking &amp; Budget Enforcement</li>
              <li>Post-Mortem Analysis Agent</li>
              <li>Progressive Context Compaction</li>
              <li>Structured Feedback Bus</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
            <h4 className="mb-2 text-sm font-semibold text-zinc-400">
              Consider Later (Lower Priority)
            </h4>
            <ul className="space-y-1 text-xs text-zinc-500">
              <li>Ephemeral Environment Testing</li>
              <li>A2A-Style Agent Discovery</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Proposals by Category: Context Management                    */}
      {/* ============================================================ */}
      <section id="proposals-context" className="mb-16 scroll-mt-24">
        <SectionHeading id="proposals-context-heading">
          Context Management
        </SectionHeading>
        <div className="space-y-4">
          {contextProposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Proposals by Category: Quality & Testing                     */}
      {/* ============================================================ */}
      <section id="proposals-quality" className="mb-16 scroll-mt-24">
        <SectionHeading id="proposals-quality-heading">
          Quality &amp; Testing
        </SectionHeading>
        <div className="space-y-4">
          {qualityProposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Proposals by Category: Orchestration & Communication         */}
      {/* ============================================================ */}
      <section id="proposals-orchestration" className="mb-16 scroll-mt-24">
        <SectionHeading id="proposals-orchestration-heading">
          Orchestration &amp; Communication
        </SectionHeading>
        <div className="space-y-4">
          {orchestrationProposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Proposals by Category: Safety & Cost                         */}
      {/* ============================================================ */}
      <section id="proposals-safety" className="mb-16 scroll-mt-24">
        <SectionHeading id="proposals-safety-heading">
          Safety &amp; Cost
        </SectionHeading>
        <div className="space-y-4">
          {safetyProposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Proposals by Category: Observability & Learning              */}
      {/* ============================================================ */}
      <section id="proposals-observability" className="mb-16 scroll-mt-24">
        <SectionHeading id="proposals-observability-heading">
          Observability &amp; Learning
        </SectionHeading>
        <div className="space-y-4">
          {observabilityProposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
