import type { Metadata } from "next";
import MermaidDiagram from "@/components/MermaidDiagram";

export const metadata: Metadata = {
  title: "Architecture | NightShift Docs",
  description:
    "System architecture diagrams and component breakdown for NightShift — autonomous overnight development with Claude Code.",
};

const tocItems = [
  { id: "system-overview", label: "System Overview" },
  { id: "ralph-loop", label: "Ralph-Loop Iteration Cycle" },
  { id: "agent-hierarchy", label: "Agent Hierarchy" },
  { id: "worktree-isolation", label: "Worktree Isolation Model" },
  { id: "gan-qa", label: "GAN-Inspired QA Cycle" },
  { id: "state-management", label: "State Management Flow" },
  { id: "v3-agent-teams", label: "V3 Agent Teams Architecture" },
  { id: "audit-loop", label: "Audit Loop Cycle" },
];

/* ------------------------------------------------------------------ */
/*  Mermaid chart definitions                                         */
/* ------------------------------------------------------------------ */

const systemOverviewChart = `graph TD
    User["User writes spec & sleeps"]
    Spec["Spec file (.md)"]
    Runner["night-shift.sh launcher"]
    RalphLoop["Ralph-Loop (stop hook)"]
    Orchestrator["Orchestrator (fresh context)"]
    State["NIGHT_SHIFT_STATE.md"]
    Agents["Parallel Agents (worktrees)"]
    Validate["Validate (build + test + lint)"]
    PR["Review-ready PR"]

    User --> Spec
    Spec --> Runner
    Runner --> RalphLoop
    RalphLoop -->|"start iteration"| Orchestrator
    Orchestrator -->|"read state"| State
    Orchestrator -->|"spawn"| Agents
    Agents -->|"merge back"| Validate
    Validate -->|"pass"| State
    State -->|"not done"| RalphLoop
    State -->|"all done"| PR
    Validate -->|"fail"| Fixer["night-fixer"]
    Fixer -->|"retry"| Validate

    style User fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style PR fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style RalphLoop fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style State fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
`;

const ralphLoopChart = `graph TD
    Start(["Iteration Start (fresh context)"])
    ReadState["1. Read NIGHT_SHIFT_STATE.md"]
    Collect["2. Collect all ready tasks\n(dependencies satisfied)"]
    Spawn["3. Spawn agents in parallel\n(one per task, each in worktree)"]
    Wait["4. Wait for all agents"]
    Merge["5. Merge worktrees sequentially"]
    Validate{"6. Validate\nbuild + test + lint"}
    Fixer["7. Spawn night-fixer"]
    FixRetry{"Fixed after\n3 attempts?"}
    UpdateState["8. Update NIGHT_SHIFT_STATE.md"]
    CheckDone{"9. All tasks\ncomplete?"}
    Finalize["Create PR + summary"]
    Exit(["Exit (hook re-feeds)"])

    Start --> ReadState
    ReadState --> Collect
    Collect --> Spawn
    Spawn --> Wait
    Wait --> Merge
    Merge --> Validate
    Validate -->|"pass"| UpdateState
    Validate -->|"fail"| Fixer
    Fixer --> FixRetry
    FixRetry -->|"yes"| UpdateState
    FixRetry -->|"no (3x fail)"| UpdateState
    UpdateState --> CheckDone
    CheckDone -->|"yes"| Finalize
    CheckDone -->|"no"| Exit
    Exit -->|"ralph-loop stop hook"| Start

    style Start fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Exit fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Validate fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Fixer fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style Finalize fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
`;

const agentHierarchyChart = `graph TD
    Orch["Orchestrator\n(main context)"]

    NC["night-coder\n(worktree isolation)"]
    NT["night-tester\n(worktree isolation)"]
    NQ["night-qa\n(no isolation)"]
    NF["night-fixer\n(worktree isolation)"]
    CR["code-reviewer\n(no isolation)"]
    SR["security-reviewer\n(no isolation)"]
    EX["Explore\n(no isolation, read-only)"]

    Orch --> NC
    Orch --> NT
    Orch --> NQ
    Orch --> NF
    Orch --> CR
    Orch --> SR
    Orch --> EX

    NC -.-|"implements features\n& components"| NCDesc[" "]
    NT -.-|"writes comprehensive\ntest suites"| NTDesc[" "]
    NQ -.-|"functional QA via\nPlaywright MCP"| NQDesc[" "]
    NF -.-|"diagnoses & fixes\nbuild/test failures"| NFDesc[" "]
    CR -.-|"code quality review\nbefore PR"| CRDesc[" "]
    SR -.-|"security audit\nOWASP, auth, secrets"| SRDesc[" "]
    EX -.-|"read-only research\n& codebase exploration"| EXDesc[" "]

    style Orch fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style NC fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style NT fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style NQ fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style NF fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style CR fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style SR fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style EX fill:#27272a,stroke:#71717a,color:#e4e4e7
    style NCDesc fill:none,stroke:none,color:transparent
    style NTDesc fill:none,stroke:none,color:transparent
    style NQDesc fill:none,stroke:none,color:transparent
    style NFDesc fill:none,stroke:none,color:transparent
    style CRDesc fill:none,stroke:none,color:transparent
    style SRDesc fill:none,stroke:none,color:transparent
    style EXDesc fill:none,stroke:none,color:transparent
`;

const worktreeChart = `sequenceDiagram
    participant O as Orchestrator
    participant W1 as Worktree A<br/>(night-coder)
    participant W2 as Worktree B<br/>(night-coder)
    participant W3 as Worktree C<br/>(night-tester)
    participant M as Main Branch

    O->>W1: Spawn task 1 (parallel)
    O->>W2: Spawn task 2 (parallel)
    O->>W3: Spawn task 3 (parallel)

    Note over W1,W3: Each agent works in its own<br/>git worktree (isolated copy)

    W1-->>O: Task 1 complete
    W2-->>O: Task 2 complete
    W3-->>O: Task 3 complete

    O->>M: Merge worktree A (no-ff)
    O->>M: Merge worktree B (no-ff)
    O->>M: Merge worktree C (no-ff)

    Note over M: Sequential merge avoids<br/>parallel conflict resolution

    O->>M: Validate (build + test + lint)
`;

const ganQaChart = `graph TD
    Build["night-coder builds feature"]
    Static{"Static validation\nbuild + test + lint"}
    DevServer["Start dev server"]
    QA["night-qa evaluates against\nsprint contract"]
    Verdict{"QA Verdict"}
    Pass["PASS\n(score >= 4.0, 0 critical)"]
    Fix["night-fixer applies fixes"]
    Fail["FAIL\nlog to PROBLEMS"]
    Counter{"Iteration\ncount < 5?"}
    WIP["Mark as PARTIAL\ncommit WIP, move on"]
    Done["Mark task done\nnext feature"]

    Build --> Static
    Static -->|"pass"| DevServer
    Static -->|"fail"| Fix
    DevServer --> QA
    QA --> Verdict
    Verdict -->|"PASS"| Pass
    Verdict -->|"ITERATE"| Fix
    Verdict -->|"FAIL"| Fail
    Pass --> Done
    Fix --> Counter
    Counter -->|"yes"| QA
    Counter -->|"no (5 iterations)"| WIP

    style Build fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style QA fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Pass fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Fail fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style Fix fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style WIP fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style Done fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
`;

const stateManagementChart = `graph LR
    subgraph IterN["Iteration N"]
        Read1["Read state"]
        Work1["Execute tasks"]
        Write1["Write updated state"]
    end

    subgraph Hook["Ralph-Loop Stop Hook"]
        Exit1["Agent exits"]
        Hook1["Hook triggers"]
        Fresh1["New context spawned"]
    end

    subgraph IterN1["Iteration N+1"]
        Read2["Read state"]
        Work2["Execute next tasks"]
        Write2["Write updated state"]
    end

    StateFile[("NIGHT_SHIFT_STATE.md\n---\nIteration: N\nCompleted: tasks 1-5\nPending: tasks 6-10\nCheckpoint: abc123\n---")]

    Read1 --> Work1
    Work1 --> Write1
    Write1 --> StateFile
    Write1 --> Exit1
    Exit1 --> Hook1
    Hook1 --> Fresh1
    Fresh1 --> Read2
    StateFile --> Read2
    Read2 --> Work2
    Work2 --> Write2

    style StateFile fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style Hook1 fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Fresh1 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
`;

const v3AgentTeamsChart = `graph TD
    subgraph Execution["Execution Phase (same as v2)"]
        RL["Ralph-Loop"]
        Sub["Subagents + Worktrees"]
        State["NIGHT_SHIFT_STATE.md"]
        RL --> Sub
        Sub --> State
    end

    subgraph Audit["Audit Phase (Agent Teams)"]
        Lead["Team Lead (orchestrator)"]
        Sec["Security Reviewer"]
        Code["Code Quality Reviewer"]
        Read2["Readability Reviewer"]
        Res["Research Reviewer"]
        Lead --> Sec
        Lead --> Code
        Lead --> Read2
        Lead --> Res
        Sec <-->|"challenge findings"| Code
        Code <-->|"cross-validate"| Read2
        Read2 <-->|"verify impact"| Sec
        Res <-->|"known issues"| Code
    end

    subgraph Debug["Debugging Fallback (Agent Teams)"]
        Trigger["night-fixer fails 3x"]
        Team["3-5 teammates"]
        H1["Hypothesis A"]
        H2["Hypothesis B"]
        H3["Hypothesis C"]
        Consensus["Adversarial debate\nthen consensus fix"]
        Trigger --> Team
        Team --> H1
        Team --> H2
        Team --> H3
        H1 --> Consensus
        H2 --> Consensus
        H3 --> Consensus
    end

    State -->|"all tasks done"| Lead
    State -->|"fixer failed 3x"| Trigger

    style Execution fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style Audit fill:#18181b,stroke:#a855f7,color:#e4e4e7
    style Debug fill:#18181b,stroke:#ef4444,color:#e4e4e7
    style Lead fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Consensus fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Trigger fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
`;

const auditLoopChart = `graph TD
    Start(["Audit Loop Start"])
    Spawn["Spawn audit team\n(4 reviewers in parallel)"]

    subgraph Team["Audit Team"]
        S["Security\nReviewer"]
        C["Code Quality\nReviewer"]
        R["Readability\nReviewer"]
        Re["Research\nReviewer"]
        S <-->|"message"| C
        C <-->|"message"| R
        R <-->|"message"| Re
        Re <-->|"message"| S
    end

    Investigate["Investigate codebase"]
    Challenge["Challenge each other's findings"]
    Consensus["Reach consensus\nrate: critical / high / medium / low"]
    HasIssues{"Critical or high\nfindings?"}
    Fix["Fix critical + high issues\n(night-fixer agents)"]
    Validate{"Validate\nbuild + test + lint"}
    Count{"Loop count\n>= 3?"}
    Clean["All clear\n0 critical/high findings"]
    NextLoop["Next audit loop\n(fresh team)"]
    Finalize["Proceed to finalization"]

    Start --> Spawn
    Spawn --> Team
    Team --> Investigate
    Investigate --> Challenge
    Challenge --> Consensus
    Consensus --> HasIssues
    HasIssues -->|"yes"| Fix
    HasIssues -->|"no"| Count
    Fix --> Validate
    Validate -->|"pass"| NextLoop
    Validate -->|"fail"| Fix
    Count -->|"< 3 loops"| NextLoop
    Count -->|">= 3 and clean"| Finalize
    NextLoop --> Start

    style Start fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Clean fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Fix fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style Finalize fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Team fill:#18181b,stroke:#3f3f46,color:#e4e4e7
`;

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Header */}
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Architecture
      </h1>
      <p className="mb-12 text-lg text-zinc-400">
        System design, component diagrams, and data flow of the NightShift
        pipeline. Each section below details a key architectural concept with an
        interactive Mermaid diagram.
      </p>

      {/* Table of Contents */}
      <nav className="mb-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          On this page
        </h2>
        <ol className="grid gap-2 sm:grid-cols-2">
          {tocItems.map(({ id, label }, i) => (
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
      </nav>

      {/* 1. System Overview */}
      <section id="system-overview" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          1. System Overview
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          NightShift transforms a user-written spec into a review-ready pull
          request overnight. The user triggers the process via{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">
            night-shift.sh
          </code>
          , which sets up a ralph-loop stop hook and launches Claude Code. The
          orchestrator reads persisted state, spawns parallel agents in isolated
          worktrees, validates their output, and loops until all tasks are
          complete. The stop hook is the key mechanism: every time the
          orchestrator exits, it re-feeds the same prompt into a fresh context
          window, creating an indefinite iteration cycle bounded only by task
          completion or a max-iteration cap.
        </p>
        <MermaidDiagram chart={systemOverviewChart} />
      </section>

      {/* 2. Ralph-Loop Iteration Cycle */}
      <section id="ralph-loop" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          2. Ralph-Loop Iteration Cycle
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          Each iteration follows a strict nine-step pipeline. The orchestrator
          reads the state file to discover what was done in previous iterations
          (it has no memory), collects all tasks whose dependencies are
          satisfied, then spawns one agent per task in parallel. After all agents
          finish, their worktree branches are merged sequentially, and the
          combined result is validated. Failures trigger the night-fixer agent
          for up to three repair attempts. Finally, state is updated and the
          orchestrator either finalizes the PR (all done) or exits so the stop
          hook can start the next iteration with a fresh context window.
        </p>
        <MermaidDiagram chart={ralphLoopChart} />
      </section>

      {/* 3. Agent Hierarchy */}
      <section id="agent-hierarchy" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          3. Agent Hierarchy
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          The orchestrator delegates all heavy work to specialized agents,
          keeping its own context lean. Code-writing agents (night-coder,
          night-tester, night-fixer) run in isolated git worktrees to avoid
          conflicts during parallel execution. Non-code agents (night-qa,
          code-reviewer, security-reviewer, Explore) run directly on the main
          branch since they either produce reports or perform read-only
          operations. Each agent type has a dedicated system prompt defining its
          role, coding rules, and workflow.
        </p>
        <MermaidDiagram chart={agentHierarchyChart} />
      </section>

      {/* 4. Worktree Isolation Model */}
      <section id="worktree-isolation" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          4. Worktree Isolation Model
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          Parallel agents need isolation to avoid stepping on each other's
          changes. NightShift achieves this through git worktrees: each agent
          gets its own working directory backed by a separate branch. Agents
          work simultaneously without conflicts. Once all agents complete, the
          orchestrator merges each worktree branch back into the night-shift
          branch one at a time. Sequential merging ensures that any rare
          conflicts (e.g., two agents touching a shared file) are resolved in a
          deterministic order rather than racing.
        </p>
        <MermaidDiagram chart={worktreeChart} />
      </section>

      {/* 5. GAN-Inspired QA Cycle */}
      <section id="gan-qa" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          5. GAN-Inspired QA Cycle
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          For UI and interactive features, NightShift uses an adversarial
          build-evaluate-fix loop inspired by Generative Adversarial Networks.
          The night-coder builds a feature, static validation checks
          compilation, then night-qa evaluates the running application against a
          sprint contract via Playwright. If night-qa finds issues, it returns an
          ITERATE verdict and night-fixer applies targeted repairs. The loop runs
          up to five times per feature. This creates a generator (night-coder) vs
          discriminator (night-qa) dynamic that converges on quality without
          human intervention.
        </p>
        <MermaidDiagram chart={ganQaChart} />
      </section>

      {/* 6. State Management Flow */}
      <section id="state-management" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          6. State Management Flow
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          Since each iteration runs in a fresh context window with no memory of
          previous iterations,{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">
            NIGHT_SHIFT_STATE.md
          </code>{" "}
          serves as the sole persistent memory. At the end of each iteration, the
          orchestrator writes the current task status, last commit checkpoint,
          and validation results to this file. When the ralph-loop stop hook
          spawns a new context, the first thing the fresh orchestrator does is
          read this file to understand what has been accomplished and what
          remains. This file-as-memory pattern allows indefinite execution across
          unlimited context windows.
        </p>
        <MermaidDiagram chart={stateManagementChart} />
      </section>

      {/* 7. V3 Agent Teams Architecture */}
      <section id="v3-agent-teams" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          7. V3 Agent Teams Architecture
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          Night Shift v3 extends v2 with Claude Code Agent Teams for two
          specific phases. The execution phase remains unchanged: ralph-loop,
          worktree-isolated subagents, and state-file memory. The audit phase
          replaces isolated parallel reviewers with an Agent Team where four
          reviewers can message each other to challenge findings and cross-
          validate in real time. The debugging fallback activates when
          night-fixer fails three times: instead of logging and skipping, a team
          of 3-5 agents tests competing hypotheses through adversarial debate to
          find the root cause.
        </p>
        <MermaidDiagram chart={v3AgentTeamsChart} />
      </section>

      {/* 8. Audit Loop Cycle */}
      <section id="audit-loop" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          8. Audit Loop Cycle
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          After all implementation tasks are complete, NightShift runs a minimum
          of three full audit loops. Each loop spawns a fresh team of four
          reviewers (security, code quality, readability, research) who
          investigate the codebase, challenge each other's findings through
          inter-agent messaging, and converge on a consensus severity rating. All
          critical and high findings are fixed immediately by night-fixer agents,
          then validated. The loop repeats with a brand-new team each time for
          fresh perspective. Auditing exits only when a full loop produces zero
          critical or high findings and at least three loops have completed.
        </p>
        <MermaidDiagram chart={auditLoopChart} />
      </section>
    </div>
  );
}
