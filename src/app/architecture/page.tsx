import type { Metadata } from "next";
import MermaidDiagram from "@/components/MermaidDiagram";

export const metadata: Metadata = {
  title: "Architecture | NightShift Docs",
  description:
    "V5 system architecture: ralph-loop, ground truth, test-first, model tiering, pipelining, audit wrapper, GAN-QA, doom-loop detection, cost tracking.",
};

const tocItems = [
  { id: "system-overview", label: "System Overview" },
  { id: "iteration-flow", label: "19-Step Iteration Flow" },
  { id: "agent-roster", label: "Agent Roster & Model Tiering" },
  { id: "error-escalation", label: "3-Tier Error Escalation" },
  { id: "state-management", label: "State Management" },
  { id: "audit-wrapper", label: "Audit Wrapper (6 Personas)" },
  { id: "gan-qa", label: "GAN-QA Pattern" },
  { id: "cache-optimization", label: "Cache Optimization" },
];

/* ------------------------------------------------------------------ */
/*  Mermaid chart definitions — v5                                     */
/* ------------------------------------------------------------------ */

const systemOverviewChart = `graph TD
    RL["Ralph-Loop<br/>(fresh context each iter)"]
    State["STATE.json + ERRORS.json<br/>(persistent memory)"]
    GT["Ground Truth Docs<br/>(immutable)"]
    TF["Test-First Flow<br/>(red before green)"]
    MT["Model Tiering<br/>(opus / sonnet / haiku)"]
    PL["Pipelining<br/>(prefetch next iter)"]
    EX["Execution<br/>(parallel agents + worktrees)"]
    EA["Early Abort<br/>(on critical failure)"]
    ESC["3-Tier Escalation<br/>(retry / rollback / blocked)"]
    CR["Critic Agent<br/>(GAN pattern)"]
    QA["QA Cycle<br/>(UI only, Playwright)"]
    AW["Audit Wrapper<br/>(6 personas, 3 clean passes)"]
    DL["Doom-Loop Detection<br/>(file edits, err hashes, diff hashes)"]
    CT["Cost Tracking<br/>(budget alert 70%, halt 100%)"]
    PR["Review-Ready PR"]

    RL -->|"read"| State
    State --> GT
    GT --> TF
    TF --> MT
    MT --> PL
    PL --> EX
    EX --> EA
    EA --> ESC
    ESC --> CR
    CR --> QA
    QA --> AW
    AW --> DL
    DL --> CT
    CT -->|"all done"| PR
    CT -->|"not done"| RL

    style RL fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style State fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style GT fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style TF fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style MT fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style EX fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style EA fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style ESC fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style CR fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style QA fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style AW fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style DL fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style CT fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style PR fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
`;

const iterationFlowChart = `flowchart TD
    S1["1. Read STATE.json<br/>(compact, max 50 lines)"]
    S2["2. Read ERRORS.json<br/>(unresolved only)"]
    S3["3. Read LEARNINGS.md<br/>+ TODO.md"]
    S4["4. Read prefetch<br/>(from prev iteration)"]
    S5["5. Run init.sh"]
    S6["6. git log --oneline -5"]
    S7{"7. Doom-loop<br/>detection"}
    S8{"8. Idle<br/>detection"}
    S9["9. Check tests exist<br/>(red before green)"]
    S10["10. Spawn ALL ready tasks<br/>parallel (worktree)"]
    S11["11. Pipelining: prefetch<br/>next while current runs"]
    S12{"12. Collect results<br/>early abort on critical"}
    S13["13. Merge worktrees<br/>+ validate"]
    S14["14. 3-tier escalation<br/>on failures"]
    S15["15. Critic agent<br/>(GAN pattern)"]
    S16["16. QA cycle<br/>(UI tasks only)"]
    S17["17. Update state<br/>+ cost tracking"]
    S18["18. WIP commit"]
    S19{"19. All done?"}
    Gate["Stability Gate<br/>(audit wrapper)"]
    Exit(["Exit iteration<br/>ralph-loop re-feeds"])

    S1 --> S2 --> S3 --> S4 --> S5 --> S6
    S6 --> S7
    S7 -->|"doom detected"| S14
    S7 -->|"clear"| S8
    S8 -->|"idle detected"| S14
    S8 -->|"active"| S9
    S9 --> S10
    S10 --> S11
    S11 --> S12
    S12 -->|"critical failure"| S14
    S12 -->|"ok"| S13
    S13 --> S14
    S14 --> S15
    S15 --> S16
    S16 --> S17
    S17 --> S18
    S18 --> S19
    S19 -->|"yes"| Gate
    S19 -->|"no"| Exit
    Exit -->|"ralph-loop"| S1

    style S1 fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style S2 fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style S7 fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style S8 fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style S10 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style S11 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style S12 fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style S15 fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style S16 fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style S19 fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Gate fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Exit fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
`;

const agentRosterChart = `graph LR
    subgraph Coders["Code Agents (worktree)"]
        NC["night-coder<br/>sonnet / opus 4.7 UI"]
        NT["night-tester<br/>sonnet"]
        NF["night-fixer<br/>haiku &rarr; sonnet &rarr; opus"]
    end

    subgraph Reviewers["Review Agents (read-only)"]
        CR["code-reviewer<br/>sonnet"]
        SR["security-reviewer<br/>sonnet"]
    end

    subgraph Quality["Quality Agents"]
        NQ["night-qa<br/>opus 4.7"]
    end

    subgraph Support["Support Agents"]
        EXP["Explore<br/>haiku"]
        SF["skill-forge<br/>opus"]
    end

    Orch["Orchestrator<br/>opus"] --> Coders
    Orch --> Reviewers
    Orch --> Quality
    Orch --> Support

    style Orch fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style NC fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style NT fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style NF fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style CR fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style SR fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style NQ fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style EXP fill:#27272a,stroke:#71717a,color:#e4e4e7
    style SF fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Coders fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style Reviewers fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style Quality fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style Support fill:#18181b,stroke:#3f3f46,color:#e4e4e7
`;

const errorEscalationChart = `flowchart LR
    Fail["Task Failure"]

    subgraph T1["Tier 1: Retry (1-3)"]
        H1["night-fixer<br/>(haiku)"]
        R1["Reflexion:<br/>self-critique before retry"]
        PV["Prompt variation:<br/>reframe each attempt"]
    end

    subgraph T2["Tier 2: Rollback (4-6)"]
        RB["git stash + checkout<br/>last clean commit"]
        AT["Agent team:<br/>3-5 competing hypotheses"]
        AD["Adversarial debate<br/>different architecture"]
    end

    subgraph T3["Tier 3: Blocked (7+)"]
        BL["Mark BLOCKED"]
        LG["Log full trajectory<br/>ERRORS.json + PROBLEMS.md"]
        WIP["Commit WIP<br/>move to next task"]
    end

    Fail --> T1
    T1 -->|"still failing"| T2
    T2 -->|"still failing"| T3

    style Fail fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style H1 fill:#27272a,stroke:#71717a,color:#e4e4e7
    style R1 fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style PV fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style RB fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style AT fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style AD fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style BL fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style LG fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style WIP fill:#27272a,stroke:#71717a,color:#e4e4e7
    style T1 fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style T2 fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style T3 fill:#18181b,stroke:#3f3f46,color:#e4e4e7
`;

const stateManagementChart = `graph TD
    subgraph StateJSON["STATE.json (compact fields)"]
        V["v: 5.0"]
        Tasks["tasks: id, t, s, p, deps, grp,<br/>agent, model, iso, tests_w, tests_p"]
        Gate["gate: on, loops, clean, max"]
        Budget["budget: max, cur, alert,<br/>opus, sonnet, haiku, calls"]
        Doom["doom: file_edits, err_hashes,<br/>diff_hashes, test_fails"]
        Pre["prefetch: tasks, files, ifaces"]
        Log["log: last 5 entries only"]
    end

    subgraph Trimming["Auto-Trimming Rules"]
        TR1["log: keep last 5, delete older"]
        TR2["completed tasks: strip tries/blocked"]
        TR3["doom counters: reset on resolution"]
        TR4["gate.prev_hashes: last loop only"]
        TR5["prefetch: overwrite each iter"]
    end

    subgraph Reads["Selective Reads"]
        SR1["STATE.json: full read<br/>(max 50 lines post-trim)"]
        SR2["ERRORS.json: jq filter<br/>unresolved only"]
        SR3["Full ERRORS.json: only<br/>when spawning fixer"]
    end

    StateJSON --> Trimming
    Trimming --> Reads

    style V fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style Tasks fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style Gate fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Budget fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style Doom fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style Pre fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Log fill:#27272a,stroke:#71717a,color:#e4e4e7
    style StateJSON fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style Trimming fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style Reads fill:#18181b,stroke:#3f3f46,color:#e4e4e7
`;

const auditWrapperChart = `flowchart TD
    Trigger["All tasks done<br/>enter Stability Gate"]
    Wrapper["Single Audit Wrapper Agent<br/>(opus)"]

    subgraph Personas["6 Audit Personas (fresh each loop)"]
        P1["Architect<br/>system design, boundaries"]
        P2["Domain Expert<br/>business logic, edge cases"]
        P3["Code Expert<br/>DRY, types, leaks, naming"]
        P4["Performance Expert<br/>allocations, N+1, bundle"]
        P5["Security Expert<br/>OWASP, secrets, injection"]
        P6["Human Advocate<br/>usability, a11y, mobile"]
    end

    subgraph Cross["Cross-Validation Matrix"]
        XV1["Architect + Code<br/>on boundaries"]
        XV2["Security + Performance<br/>on rate limiting"]
        XV3["Domain + Human<br/>on error messages"]
        XV4["Performance + Security<br/>on caching"]
    end

    Findings{"Critical or high<br/>findings?"}
    Fix["night-fixer"]
    Clean["Clean pass<br/>consecutive_clean += 1"]
    Check{"3 consecutive<br/>clean passes?"}
    RepCheck{"Findings repeat<br/>over 70%?"}
    Done["Gate PASSED"]
    Cap{"Loop count<br/>over 10?"}
    WIP["Gate CAPPED<br/>WIP PR"]

    Trigger --> Wrapper
    Wrapper --> Personas
    Personas --> Cross
    Cross --> Findings
    Findings -->|"yes"| Fix
    Fix -->|"re-audit"| Wrapper
    Findings -->|"no"| Clean
    Clean --> Check
    Check -->|"yes"| Done
    Check -->|"no"| RepCheck
    RepCheck -->|"yes"| Done
    RepCheck -->|"no"| Cap
    Cap -->|"yes"| WIP
    Cap -->|"no"| Wrapper

    style Trigger fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style Wrapper fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style Fix fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style Done fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style WIP fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style Personas fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style Cross fill:#18181b,stroke:#3f3f46,color:#e4e4e7
    style P1 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style P2 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style P3 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style P4 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style P5 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
    style P6 fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
`;

const ganQaChart = `sequenceDiagram
    participant Spec as Enriched Spec
    participant Coder as night-coder<br/>(generator)
    participant Build as Build + Test + Lint
    participant Critic as code-reviewer<br/>(critic / opus)
    participant QA as night-qa<br/>(opus 4.7)
    participant Fixer as night-fixer

    Note over Spec,Critic: GAN pattern: critic sees ONLY spec + output code
    Note over Spec,Critic: Never share generator reasoning or conversation

    Spec->>Coder: task + acceptance criteria
    Coder->>Build: implementation
    Build-->>Build: validate

    Build->>Critic: spec + changed files only
    Critic-->>Critic: adversarial review

    alt Critic finds critical/high
        Critic->>Fixer: audit findings
        Fixer->>Build: fix + re-validate
        Build->>Critic: re-review (max 3 cycles)
    end

    Note over QA: UI tasks only

    Build->>QA: start dev server
    QA-->>QA: evaluate against sprint contract
    alt QA verdict = ITERATE
        QA->>Fixer: issues list
        Fixer->>Build: targeted repairs
        Build->>QA: re-evaluate (max 5 cycles)
    end

    QA-->>Spec: PASS or mark PARTIAL
`;

const cacheOptimizationChart = `graph LR
    subgraph Frozen["Frozen Prefix<br/>(identical across agents of same type)"]
        R["Role + instructions"]
        AH["Anti-hallucination rules"]
        OF["Output format template"]
        CC["Concurrency rules"]
        CMD["Build / test / lint commands"]
    end

    subgraph Semi["Semi-Stable<br/>(changes per project, not per task)"]
        DS["Domain skill reference"]
        GTD["Ground truth docs"]
    end

    subgraph Variable["Variable Suffix<br/>(changes per task)"]
        T["Task description +<br/>acceptance criteria"]
        F["File list to read/modify"]
        I["Interfaces + type defs"]
        L["Lessons from ERRORS.json<br/>(filtered by overlap)"]
    end

    KV["KV-Cache<br/>Hit Rate"]

    Frozen -->|"100% cached"| KV
    Semi -->|"high hit rate"| KV
    Variable -->|"always recomputed"| KV

    style Frozen fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style Semi fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style Variable fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style KV fill:#3b1f5e,stroke:#a855f7,color:#e4e4e7
    style R fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style AH fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style OF fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style CC fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style CMD fill:#1a3a2a,stroke:#22c55e,color:#e4e4e7
    style DS fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style GTD fill:#3b2f1a,stroke:#f59e0b,color:#e4e4e7
    style T fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style F fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style I fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
    style L fill:#5f1e1e,stroke:#ef4444,color:#e4e4e7
`;

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Header */}
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Architecture{" "}
        <span className="text-lg font-normal text-zinc-500">v5</span>
      </h1>
      <p className="mb-12 text-lg text-zinc-400">
        Night Shift v5 is a unified autonomous pipeline: test-first development,
        immutable ground truth documents, compact JSON state, model tiering
        across 8 agent types, pipelining for overlapping iterations, a GAN-inspired
        critic pattern, 6-persona audit wrapper, doom-loop detection, and cost
        tracking with budget enforcement. Every iteration runs in a fresh context
        window via ralph-loop, with{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">
          STATE.json
        </code>{" "}
        and{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">
          ERRORS.json
        </code>{" "}
        as the only persistent memory.
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
          The v5 pipeline chains 14 architectural components in a single loop.
          Ralph-loop provides fresh context each iteration. State and error files
          persist across iterations as the sole memory bridge. Ground truth
          documents (brainstorm, health audit, docs audit) are created once and
          never modified, giving every agent an immutable reference frame.
          Test-first flow ensures every task has failing tests before
          implementation begins. Model tiering assigns opus, sonnet, or haiku by
          cognitive demand. Pipelining overlaps the current iteration with
          prefetching for the next. The audit wrapper runs a single agent that
          spawns 6 expert personas and requires 3 consecutive clean passes before
          the PR is created.
        </p>
        <MermaidDiagram chart={systemOverviewChart} />
      </section>

      {/* 2. 19-Step Iteration Flow */}
      <section id="iteration-flow" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          2. 19-Step Iteration Flow
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          Each ralph-loop iteration follows a strict 19-step sequence. Steps 1-6
          load context: state, errors (unresolved only via{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">
            jq
          </code>
          ), learnings, prefetch cache, init script, and recent git history.
          Steps 7-8 run doom-loop and idle detection to catch oscillating edits,
          repeated errors, or stalled progress. Step 9 enforces test-first by
          verifying tests exist and fail. Steps 10-11 execute tasks in parallel
          worktrees while pipelining prefetches the next iteration. Steps 12-14
          collect results with early abort on critical failures and escalate
          through 3 tiers. Steps 15-16 run the critic (information-isolated) and
          QA cycle (UI only). Steps 17-18 update state with auto-trimming and
          commit. Step 19 either enters the stability gate or exits for the next
          ralph-loop iteration.
        </p>
        <MermaidDiagram chart={iterationFlowChart} />
      </section>

      {/* 3. Agent Roster & Model Tiering */}
      <section id="agent-roster" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          3. Agent Roster & Model Tiering
        </h2>
        <p className="mb-4 leading-relaxed text-zinc-400">
          V5 uses 8 specialized agent types. Each is assigned a model tier based
          on cognitive demand, achieving an estimated 83% cost reduction compared
          to running everything on opus. Code-writing agents run in isolated git
          worktrees. Reviewers and QA agents are read-only on the main branch.
          Safety tiers enforce tool filtering at the schema level: reviewers
          never write, QA never edits, research never executes.
        </p>
        <div className="mb-6 overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="px-4 py-3 font-semibold text-zinc-300">Agent</th>
                <th className="px-4 py-3 font-semibold text-zinc-300">Model</th>
                <th className="px-4 py-3 font-semibold text-zinc-300">Isolation</th>
                <th className="px-4 py-3 font-semibold text-zinc-300">Role</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr className="border-b border-zinc-800/50">
                <td className="px-4 py-2.5 font-mono text-blue-400">night-coder</td>
                <td className="px-4 py-2.5">sonnet <span className="text-zinc-600">/</span> opus 4.7 <span className="text-xs text-zinc-500">(UI)</span></td>
                <td className="px-4 py-2.5">worktree</td>
                <td className="px-4 py-2.5">Feature implementation</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="px-4 py-2.5 font-mono text-blue-400">night-tester</td>
                <td className="px-4 py-2.5">sonnet</td>
                <td className="px-4 py-2.5">worktree</td>
                <td className="px-4 py-2.5">Test spec generation (red phase)</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="px-4 py-2.5 font-mono text-green-400">night-qa</td>
                <td className="px-4 py-2.5">opus 4.7</td>
                <td className="px-4 py-2.5">none</td>
                <td className="px-4 py-2.5">UI evaluation via Playwright</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="px-4 py-2.5 font-mono text-red-400">night-fixer</td>
                <td className="px-4 py-2.5">haiku → sonnet → opus</td>
                <td className="px-4 py-2.5">worktree</td>
                <td className="px-4 py-2.5">Diagnose and fix failures</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="px-4 py-2.5 font-mono text-yellow-400">code-reviewer</td>
                <td className="px-4 py-2.5">sonnet</td>
                <td className="px-4 py-2.5">none</td>
                <td className="px-4 py-2.5">Post-merge adversarial review</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="px-4 py-2.5 font-mono text-yellow-400">security-reviewer</td>
                <td className="px-4 py-2.5">sonnet</td>
                <td className="px-4 py-2.5">none</td>
                <td className="px-4 py-2.5">OWASP, auth, secrets audit</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="px-4 py-2.5 font-mono text-zinc-500">Explore</td>
                <td className="px-4 py-2.5">haiku</td>
                <td className="px-4 py-2.5">none</td>
                <td className="px-4 py-2.5">Read-only research</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-purple-400">skill-forge</td>
                <td className="px-4 py-2.5">opus</td>
                <td className="px-4 py-2.5">none</td>
                <td className="px-4 py-2.5">Domain skill generation</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-6 text-sm text-zinc-500">
          Override rule: if a sonnet agent fails 2x on the same task, it retries
          with opus. The upgrade is logged in ERRORS.json.
        </p>
        <MermaidDiagram chart={agentRosterChart} />
      </section>

      {/* 4. 3-Tier Error Escalation */}
      <section id="error-escalation" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          4. 3-Tier Error Escalation
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          Failures escalate through three tiers. <strong className="text-zinc-300">Tier 1</strong> (attempts
          1-3) spawns night-fixer on haiku with Reflexion: before each retry, the
          fixer writes a self-critique explaining why the previous approach
          failed, identifies the root cause, and proposes a different strategy.
          Prompt variation reformulates each attempt to avoid pattern lock-in.{" "}
          <strong className="text-zinc-300">Tier 2</strong> (attempts 4-6) rolls back to the last clean
          commit and spawns an agent team of 3-5 teammates investigating
          competing hypotheses through adversarial debate.{" "}
          <strong className="text-zinc-300">Tier 3</strong> (7+) marks the task as blocked, logs the
          full trajectory to ERRORS.json and PROBLEMS.md, commits a WIP, and
          moves to the next independent task.
        </p>
        <MermaidDiagram chart={errorEscalationChart} />
      </section>

      {/* 5. State Management */}
      <section id="state-management" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          5. State Management
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          V5 uses JSON for STATE and ERRORS (enabling{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">
            jq
          </code>{" "}
          selective reads) with compact field names ({" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">
            t, s, p, grp
          </code>{" "}
          instead of title, status, priority, parallel_group) saving ~25% tokens
          per read. Auto-trimming keeps state under ~50 lines: the log array
          retains only the last 5 entries, completed tasks have their retry
          metadata stripped, doom counters reset on resolution, and prefetch is
          overwritten each iteration. ERRORS.json is read selectively by default
          (unresolved count only), with a full read triggered only when spawning
          a fixer for a specific error hash. A hard context budget rule forces
          early iteration exit if 5+ agent results were processed or 3+ large
          files were read.
        </p>
        <MermaidDiagram chart={stateManagementChart} />
      </section>

      {/* 6. Audit Wrapper */}
      <section id="audit-wrapper" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          6. Audit Wrapper (6 Personas)
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          The stability gate is handled by a single wrapper agent (opus) that
          keeps the orchestrator's context clean. Internally, each audit loop
          creates a fresh team of 6 expert personas: Architect (validates against
          ground truth brainstorm), Domain Expert (validates against enriched
          spec), Code Expert (DRY, types, leaks), Performance Expert
          (allocations, N+1, bundle), Security Expert (OWASP top 10), and Human
          Advocate (usability, a11y, mobile). Cross-validation pairs overlap:
          Architect+Code on boundaries, Security+Performance on rate limiting,
          Domain+Human on error messages, Performance+Security on caching.
          Personas use rhetorical questions over directives. Only critical and
          high findings trigger fixes between loops. The gate requires 3
          consecutive clean passes, exits on 70%+ finding repetition, and caps at
          10 loops.
        </p>
        <MermaidDiagram chart={auditWrapperChart} />
      </section>

      {/* 7. GAN-QA Pattern */}
      <section id="gan-qa" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          7. GAN-QA Pattern
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          V5 enforces information isolation between generator and critic to
          prevent confirmation bias. The critic (code-reviewer on opus) receives
          only the spec and the output code. It never sees the generator's
          reasoning, task description, or conversation history. If the critic
          finds critical or high issues, night-fixer applies targeted repairs and
          the critic re-reviews (max 3 cycles). Criticism repetition above 70%
          triggers acceptance with a PROBLEMS.md log. For UI tasks, night-qa
          (opus 4.7) evaluates the running application against a sprint contract
          via Playwright, looping up to 5 times with targeted fixes between each
          evaluation.
        </p>
        <MermaidDiagram chart={ganQaChart} />
      </section>

      {/* 8. Cache Optimization */}
      <section id="cache-optimization" className="mb-20 scroll-mt-24">
        <h2 className="mb-3 text-2xl font-bold text-white">
          8. Cache Optimization
        </h2>
        <p className="mb-6 leading-relaxed text-zinc-400">
          Agent prompts use a 3-tier structure to maximize KV-cache hit rates
          (10x cost reduction on cached tokens). The <strong className="text-zinc-300">frozen prefix</strong>{" "}
          is identical across all agents of the same type: role, anti-hallucination
          rules, output format, concurrency rules, and build commands. The{" "}
          <strong className="text-zinc-300">semi-stable layer</strong> changes per project but not per
          task: domain skill references and ground truth documents. The{" "}
          <strong className="text-zinc-300">variable suffix</strong> changes per task: task description,
          file list, interfaces, and lessons filtered from ERRORS.json by
          task/file overlap. Dynamic content (state files, agent results) is
          always appended at the end of context, never inserted in the middle.
          Unchanged files are never re-read between iterations.
        </p>
        <MermaidDiagram chart={cacheOptimizationChart} />
      </section>
    </div>
  );
}
