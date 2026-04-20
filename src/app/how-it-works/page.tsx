import type { Metadata } from "next";
import MermaidDiagram from "@/components/MermaidDiagram";
import Collapsible from "@/components/Collapsible";

export const metadata: Metadata = {
  title: "How It Works | NightShift Docs",
  description:
    "Step-by-step walkthrough of a typical NightShift session from trigger to delivery.",
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
  active,
}: {
  number: number;
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
          active
            ? "bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/40"
            : "bg-zinc-800 text-zinc-400"
        }`}
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
      <p className="mb-12 text-lg text-zinc-400">
        A complete walkthrough of a NightShift session &mdash; from the moment
        you say &ldquo;night shift&rdquo; to the pull request waiting for you in
        the morning.
      </p>

      {/* ============================================================ */}
      {/*  1. Overview Timeline                                        */}
      {/* ============================================================ */}
      <SectionHeading id="overview">1. Overview Timeline</SectionHeading>
      <Prose>
        <p>
          Every NightShift session follows five phases. The user is present for
          Phase 0 and Phase 1, then goes to sleep while the system autonomously
          executes Phases 2 through 4.
        </p>
      </Prose>

      {/* Visual timeline */}
      <div className="relative my-8 ml-4 space-y-6 border-l-2 border-zinc-800 pl-8">
        <PhaseCard
          number={0}
          title="Pre-flight"
          subtitle="Domain research + interactive questionnaire"
          active
        />
        <PhaseCard
          number={1}
          title="Plan"
          subtitle="Context analysis, documentation research, task breakdown, user approval"
          active
        />
        <div className="absolute -left-[5px] top-[108px] h-3 w-3 rounded-full border-2 border-blue-500 bg-zinc-950" />
        <div className="ml-[-32px] mr-[-16px] rounded-lg border border-dashed border-zinc-700 bg-zinc-900/30 px-8 py-1 text-center text-xs text-zinc-500">
          User goes to sleep &mdash; fully autonomous from here
        </div>
        <PhaseCard
          number={2}
          title="Execute (The Loop)"
          subtitle="ralph-loop iterates: spawn agents, merge, validate, QA"
        />
        <PhaseCard
          number={3}
          title="Audit"
          subtitle="Minimum 3 review cycles with 5 parallel reviewers"
        />
        <PhaseCard
          number={4}
          title="Finalize"
          subtitle="Validation suite, summary, PR creation, debrief"
        />
      </div>

      <MermaidDiagram
        className="my-6"
        chart={`flowchart LR
  P0[Phase 0\\nPre-flight] --> P1[Phase 1\\nPlan]
  P1 --> SLEEP((User sleeps))
  SLEEP --> P2[Phase 2\\nExecute Loop]
  P2 --> P3[Phase 3\\nAudit]
  P3 --> P4[Phase 4\\nFinalize]
  P4 --> PR[PR Ready]

  style SLEEP fill:#3b82f6,stroke:#2563eb,color:#fff
  style PR fill:#22c55e,stroke:#16a34a,color:#fff`}
      />

      {/* ============================================================ */}
      {/*  2. Phase 0: Pre-flight                                      */}
      {/* ============================================================ */}
      <SectionHeading id="phase-0">2. Phase 0: Pre-flight Questionnaire</SectionHeading>
      <Prose>
        <p>
          The user is about to sleep. Any ambiguity left unresolved becomes a
          hallucination or a wrong decision at 3 AM. Phase 0 eliminates that
          risk.
        </p>
      </Prose>

      <SubHeading>Step 0a: Domain Research (before asking questions)</SubHeading>
      <Prose>
        <p>
          Before asking a single question, NightShift launches background
          research agents to build domain context. This makes questions sharper
          and more relevant.
        </p>
      </Prose>

      <div className="my-4 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "WebSearch",
            desc: "Research the spec's domain, key libraries, latest versions, common pitfalls",
          },
          {
            label: "Context7",
            desc: "Fetch up-to-date docs for each library and framework mentioned in the spec",
          },
          {
            label: "Explore agents",
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

      <Prose>
        <p>
          For example, if the spec mentions &ldquo;Sui Move&rdquo;, NightShift
          researches the latest Sui Move patterns and known issues{" "}
          <em>before</em> asking about specific architectural choices rather than
          generic &ldquo;which blockchain?&rdquo; questions.
        </p>
      </Prose>

      <SubHeading>Step 0b: Question Categories</SubHeading>
      <Prose>
        <p>
          Questions are asked in batches of 2-3 related items, adapted to the
          project. Obvious answers from the spec are skipped.
        </p>
      </Prose>

      <div className="my-4 space-y-2">
        {[
          {
            cat: "1. Scope boundaries",
            examples: [
              '"The spec mentions X. Should I also handle Y, or is that out of scope?"',
              '"Are there parts of the codebase I should NOT touch?"',
              '"If I finish early, should I tackle stretch goals or stop?"',
            ],
          },
          {
            cat: "2. Technical decisions",
            examples: [
              '"The spec doesn\'t specify a database. Do you have a preference?"',
              '"Should I use existing patterns from the codebase, or is a new approach OK?"',
              '"For [ambiguous tech choice], I\'d go with [A]. OK, or prefer [B]?"',
            ],
          },
          {
            cat: "3. Edge cases & error handling",
            examples: [
              '"How should the app behave when [edge case]?"',
              '"What should happen if [external dependency] is unavailable?"',
            ],
          },
          {
            cat: "4. Testing expectations",
            examples: [
              '"What level of test coverage? (unit only / unit + integration / full E2E)"',
              '"Should I test error paths and edge cases, or just happy paths?"',
            ],
          },
          {
            cat: "5. UI/UX expectations",
            examples: [
              '"Do you have a design/mockup, or should I use my judgment?"',
              '"Mobile responsive? Dark mode? Accessibility level?"',
            ],
          },
          {
            cat: "6. Priorities & tradeoffs",
            examples: [
              '"If I can\'t finish everything, what are the must-haves vs nice-to-haves?"',
              '"Speed vs quality: fewer features done perfectly, or get everything done?"',
            ],
          },
          {
            cat: "7. What NOT to do",
            examples: [
              '"Is there anything you explicitly do NOT want me to do?"',
              '"Any recent changes or WIP I should be careful not to break?"',
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

      <SubHeading>Output: NIGHT_SHIFT_ENRICHED_SPEC.md</SubHeading>
      <Prose>
        <p>
          After the questionnaire, all answers are merged with the original spec
          into an enriched spec document. This is what the autonomous loop works
          from &mdash; not the original spec.
        </p>
      </Prose>

      <CodeBlock title="NIGHT_SHIFT_ENRICHED_SPEC.md">
        {`# Night Shift Enriched Spec — 2026-04-13

## Original spec
<paste the original spec content>

## Clarifications from pre-flight
- Scope: <boundaries defined>
- Tech decisions: <choices confirmed>
- Priorities: <must-haves vs nice-to-haves>
- Testing: <expectations>
- Do NOT: <explicit exclusions>
- Edge cases: <decided behaviors>`}
      </CodeBlock>

      {/* ============================================================ */}
      {/*  3. Phase 1: Plan                                            */}
      {/* ============================================================ */}
      <SectionHeading id="phase-1">3. Phase 1: Plan Phase</SectionHeading>
      <Prose>
        <p>
          With the enriched spec in hand, NightShift produces a detailed plan
          and gets user approval before autonomous execution begins.
        </p>
      </Prose>

      <SubHeading>1a. Context Analysis</SubHeading>
      <div className="my-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="mb-2 text-sm font-semibold text-zinc-200">
            From scratch
          </p>
          <ul className="space-y-1 text-xs text-zinc-400">
            <li>Scaffold the project structure</li>
            <li>Init git, create branch{" "}
              <code className="font-mono text-zinc-300">
                feat/night-shift-&lt;date&gt;
              </code>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="mb-2 text-sm font-semibold text-zinc-200">
            Continue (existing repo)
          </p>
          <ul className="space-y-1 text-xs text-zinc-400">
            <li>
              Launch 2-3{" "}
              <code className="font-mono text-zinc-300">Explore</code> agents
              in parallel to scan structure, types, dependencies, patterns
            </li>
            <li>Create branch from current HEAD</li>
          </ul>
        </div>
      </div>

      <SubHeading>1b. Documentation Research</SubHeading>
      <Prose>
        <p>
          Runs in parallel with context analysis.{" "}
          <span className="font-mono text-xs text-blue-400">Context7</span>{" "}
          fetches up-to-date docs for each library/framework in the spec.{" "}
          <strong>One agent per library, all in parallel.</strong>
        </p>
      </Prose>

      <SubHeading>1c. Plan Production</SubHeading>
      <Prose>
        <p>
          From exploration results, NightShift creates the following files at the
          project root:
        </p>
      </Prose>

      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
              <th className="py-2 pr-4 font-medium">File</th>
              <th className="py-2 font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            <tr className="border-b border-zinc-800/50">
              <td className="py-2 pr-4 font-mono text-xs text-zinc-300">
                NIGHT_SHIFT_LOG.md
              </td>
              <td className="py-2 text-xs">
                Full plan: objective, architecture, task list with
                dependency/parallelism flags, pre-made decisions
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-2 pr-4 font-mono text-xs text-zinc-300">
                NIGHT_SHIFT_STATE.md
              </td>
              <td className="py-2 text-xs">
                The only memory between iterations &mdash; task status,
                checkpoints, validation results
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-2 pr-4 font-mono text-xs text-zinc-300">
                NIGHT_SHIFT_CONTRACTS.md
              </td>
              <td className="py-2 text-xs">
                Sprint contracts for UI tasks (acceptance criteria for
                QA evaluation)
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-2 pr-4 font-mono text-xs text-zinc-300">
                NIGHT_SHIFT_PROBLEMS.md
              </td>
              <td className="py-2 text-xs">
                Morning review file &mdash; uncertainties, assumptions, blocked
                tasks, failed fixes
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Collapsible title="State file template (NIGHT_SHIFT_STATE.md)">
        <CodeBlock>
          {`## Night Shift State

### Timing
- Started: <ISO 8601 timestamp>
- Finished: (in progress)

### Spec
<path to spec file>

### Current Phase
Execution

### Tasks
- [ ] T1: <description> | agent: code | parallel: yes | has_ui: yes | contract: yes
- [ ] T2: <description> | agent: test | parallel: no (depends: T1) | has_ui: no | contract: no
- ...

### Last Checkpoint
<none>

### Last Validation
Build: N/A | Tests: N/A | Lint: N/A

### Last QA
Feature: N/A | Score: N/A | Verdict: N/A | Iterations: 0

### Completed This Session
(none yet)`}
        </CodeBlock>
      </Collapsible>

      <Collapsible title="Problems file template (NIGHT_SHIFT_PROBLEMS.md)">
        <CodeBlock>
          {`# Night Shift Problems — <date>

> Items that need your attention. Run \`grep -r "NIGHT-SHIFT-REVIEW" .\` to find marked code.

## Summary
- X uncertainties logged
- X tasks blocked
- X fixes failed
- X assumptions made

## Problems

### ASSUMPTION: chose PostgreSQL over SQLite for the database
- **Iteration**: 2
- **File**: src/db/connection.ts:15
- **What I needed**: spec says "database" but doesn't specify which
- **What I did**: chose PostgreSQL (more common for production, existing docker-compose has pg)
- **Confidence**: MEDIUM
- **User action needed**: confirm PostgreSQL is the right choice, or switch to SQLite`}
        </CodeBlock>
      </Collapsible>

      <SubHeading>1c-bis. Setup Script</SubHeading>
      <Prose>
        <p>
          NightShift creates an{" "}
          <code className="font-mono text-zinc-300">init.sh</code> script at the
          project root. This script is reused by every fresh context window to
          bootstrap the environment quickly:
        </p>
      </Prose>
      <CodeBlock title="init.sh">
        {`#!/bin/bash
# Install dependencies
bun install

# Start dev server if needed
bun run dev &

# Run test suite
bun test

# Run lint
bunx biome check --write .`}
      </CodeBlock>

      <SubHeading>1d. User Approval Checkpoint</SubHeading>
      <div className="my-4 rounded-lg border border-yellow-800/50 bg-yellow-950/20 p-4">
        <p className="mb-1 text-sm font-semibold text-yellow-400">
          Last checkpoint before sleep
        </p>
        <p className="text-xs leading-relaxed text-yellow-200/70">
          The complete plan is presented to the user: task list with
          dependencies, architecture decisions, sprint contracts summary, and
          any assumptions. The user must explicitly approve before autonomous
          execution begins. This is the last chance to course-correct &mdash;
          the user will not be available again until morning.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  4. Phase 2: Execute (The Loop)                              */}
      {/* ============================================================ */}
      <SectionHeading id="phase-2">
        4. Phase 2: Execute (The Loop)
      </SectionHeading>

      <SubHeading>How ralph-loop Works</SubHeading>
      <Prose>
        <p>
          NightShift runs inside a <strong>ralph-loop</strong>: when Claude
          finishes or exits, a stop hook re-feeds the same prompt, giving it a
          fresh context window. This creates an iteration mechanism where:
        </p>
      </Prose>

      <div className="my-4 grid gap-3 sm:grid-cols-2">
        {[
          {
            title: "No memory between iterations",
            desc: "NIGHT_SHIFT_STATE.md is the only memory",
          },
          {
            title: "Maximize throughput",
            desc: "Each iteration runs ALL ready tasks in parallel",
          },
          {
            title: "Keep orchestrator lean",
            desc: "Heavy work goes to subagents",
          },
          {
            title: "Clean exit",
            desc: "Loop stops on NIGHT_SHIFT_COMPLETE promise or max iterations",
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
        chart={`flowchart TD
  A[Read NIGHT_SHIFT_STATE.md] --> B[Collect ALL ready tasks\\nwith satisfied dependencies]
  B --> C[Spawn one Agent per task\\nall in parallel, worktree isolation]
  C --> D[Wait for all agents]
  D --> E[Merge worktree branches\\nsequentially]
  E --> F[Run validation\\nbuild + test + lint]
  F -->|Pass| G{QA needed?}
  F -->|Fail| H[Spawn night-fixer agents]
  H --> F
  G -->|Yes| I[Run QA cycle]
  G -->|No| J[Update NIGHT_SHIFT_STATE.md]
  I --> J
  J --> K{All tasks done?}
  K -->|Yes| L[Proceed to Audit]
  K -->|No| M[Exit - hook re-feeds\\nfresh context]
  M --> A`}
      />

      <SubHeading>Task Selection</SubHeading>
      <Prose>
        <p>
          At the start of each iteration, the orchestrator reads{" "}
          <code className="font-mono text-zinc-300">NIGHT_SHIFT_STATE.md</code>{" "}
          and identifies all pending tasks whose dependencies are satisfied.
          Every task that <em>can</em> run in parallel <em>does</em> run in
          parallel. One agent = one task = one worktree.
        </p>
        <p>
          Trivial tasks (single config edit, one-line fix) are handled directly
          by the orchestrator rather than spawning an agent &mdash; the overhead
          is not worth it.
        </p>
      </Prose>

      <SubHeading>Agent Spawning</SubHeading>
      <Prose>
        <p>
          All ready tasks launch in a{" "}
          <strong>single message with multiple Agent calls</strong>. Every
          code-writing agent gets{" "}
          <code className="font-mono text-zinc-300">
            isolation: &quot;worktree&quot;
          </code>{" "}
          for git-level isolation. All run in background.
        </p>
      </Prose>

      <CodeBlock title="Spawning pattern (4 ready tasks = 4 parallel agents)">
        {`Agent(subagent_type: "night-coder", isolation: "worktree", run_in_background: true, prompt: <T1>)
Agent(subagent_type: "night-coder", isolation: "worktree", run_in_background: true, prompt: <T2>)
Agent(subagent_type: "night-tester", isolation: "worktree", run_in_background: true, prompt: <T3>)
Agent(subagent_type: "night-coder", isolation: "worktree", run_in_background: true, prompt: <T4>)`}
      </CodeBlock>

      <SubHeading>Agent Types</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
              <th className="py-2 pr-4 font-medium">Task type</th>
              <th className="py-2 pr-4 font-medium">Agent</th>
              <th className="py-2 pr-4 font-medium">Isolation</th>
              <th className="py-2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              {
                task: "New feature / component",
                agent: "night-coder",
                iso: "worktree",
                note: "Main workhorse. Give it file paths, interfaces, conventions",
              },
              {
                task: "Tests for existing code",
                agent: "night-tester",
                iso: "worktree",
                note: "Source files to test + existing test patterns",
              },
              {
                task: "Functional QA (UI)",
                agent: "night-qa",
                iso: "none",
                note: "Evaluates running app via Playwright MCP",
              },
              {
                task: "Config / scaffolding",
                agent: "night-coder",
                iso: "worktree",
                note: "Even small tasks get worktrees to avoid conflicts",
              },
              {
                task: "Build/test/lint failure",
                agent: "night-fixer",
                iso: "worktree",
                note: "Full error output + relevant file paths",
              },
              {
                task: "Research / exploration",
                agent: "Explore",
                iso: "none",
                note: "Read-only, used to gather info before decisions",
              },
              {
                task: "Code review",
                agent: "code-reviewer",
                iso: "none",
                note: "After a batch of features, before PR",
              },
              {
                task: "Security audit",
                agent: "security-reviewer",
                iso: "none",
                note: "For auth, crypto, input handling",
              },
            ].map((row) => (
              <tr key={row.task} className="border-b border-zinc-800/50">
                <td className="py-2 pr-4 text-xs text-zinc-300">
                  {row.task}
                </td>
                <td className="py-2 pr-4 font-mono text-xs text-blue-400">
                  {row.agent}
                </td>
                <td className="py-2 pr-4 font-mono text-xs">{row.iso}</td>
                <td className="py-2 text-xs">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Collapsible title="Agent prompt template">
        <Prose>
          <p>
            Each agent prompt must be <strong>self-contained</strong> &mdash; the
            agent has no memory of previous iterations. The agent&apos;s system
            prompt (in its <code className="font-mono text-zinc-300">.md</code>{" "}
            definition) already contains coding rules, so only task-specific
            context goes here.
          </p>
        </Prose>
        <CodeBlock>
          {`## Task
<task description from the plan>

## Context
- Project: <brief 1-line description>
- Stack: <technologies>
- Branch: feat/night-shift-<date>

## Relevant files
<list of files the agent needs to read or modify — be specific>

## Interfaces to respect
<any type definitions, API contracts, or patterns the code must follow>

## Build/test/lint commands
- Build: <command>
- Test: <command>
- Lint: <command>

## Reminders
- Write general-purpose solutions. Do not hard-code values.
- Before committing, verify: run build + test + lint.
- Clean up any temporary files or scripts.
- Log any uncertainty to NIGHT_SHIFT_PROBLEMS.md.
- Use NIGHT-SHIFT-REVIEW comments for greppable markers.`}
        </CodeBlock>
      </Collapsible>

      <SubHeading>Merge and Validation</SubHeading>
      <Prose>
        <p>
          After all agents complete, worktree branches merge{" "}
          <strong>one by one</strong> into the night-shift branch (in dependency
          order when possible). Then the full validation suite runs:
        </p>
      </Prose>
      <CodeBlock>
        {`# Mandatory after every merge batch
BUILD  → bun run build / cargo build
TEST   → bun test / cargo test (ALL tests)
LINT   → bunx biome check --write .`}
      </CodeBlock>
      <Prose>
        <p>
          If validation fails, a{" "}
          <code className="font-mono text-zinc-300">night-fixer</code> agent is
          spawned with the error output. It has a built-in 3-attempt workflow.
          After 3 failures: the code is committed with a{" "}
          <code className="font-mono text-zinc-300">[WIP]</code> tag and the
          system moves on.
        </p>
      </Prose>

      <SubHeading>QA Cycle (GAN-inspired)</SubHeading>
      <Prose>
        <p>
          This is the core quality mechanism. After static validation passes,
          NightShift runs a functional QA cycle for any task that has a{" "}
          <strong>sprint contract</strong> in{" "}
          <code className="font-mono text-zinc-300">
            NIGHT_SHIFT_CONTRACTS.md
          </code>
          . Non-UI tasks skip straight to state update.
        </p>
      </Prose>

      <MermaidDiagram
        className="my-6"
        chart={`flowchart TD
  A[night-coder builds feature] --> B[Static validation\\nbuild + test + lint]
  B --> C[Start dev server]
  C --> D[night-qa evaluates\\nagainst sprint contract]
  D -->|PASS: score >=4.0\\n0 critical issues| E[Mark done\\nnext feature]
  D -->|ITERATE| F[night-fixer\\nfixes issues]
  F --> D
  D -->|FAIL after 5 iterations| G[Log to PROBLEMS\\nmark NEEDS-REWORK]`}
      />

      <Collapsible title="Sprint contract format">
        <CodeBlock title="NIGHT_SHIFT_CONTRACTS.md (example)">
          {`## T1: User Dashboard

### Acceptance Criteria
1. User can view their profile and sees correct data
2. Form validates email and shows error on invalid input
3. Data persists after save (visible on page reload)
4. Empty state displays a helpful message

### How to Test
- URL: http://localhost:3000/dashboard
- Steps: navigate -> click edit -> fill fields -> submit -> verify
- Edge cases: empty input, invalid email, rapid clicks

### Pass Threshold
- All acceptance criteria met
- Weighted QA score >= 4.0/5
- Zero critical issues`}
        </CodeBlock>
      </Collapsible>

      <Prose>
        <p>
          The QA cycle uses a <strong>GAN-inspired adversarial pattern</strong>:
          the builder (<code className="font-mono text-zinc-300">night-coder</code>)
          and the evaluator (<code className="font-mono text-zinc-300">night-qa</code>)
          are separate agents with opposing objectives. The builder tries to
          satisfy the contract; the QA agent tries to find violations.
          Maximum 5 QA iterations per feature before marking it{" "}
          <code className="font-mono text-zinc-300">[PARTIAL]</code> and moving
          on.
        </p>
      </Prose>

      <SubHeading>State Updates</SubHeading>
      <Prose>
        <p>
          After each completed task (including QA), the state file is updated:
        </p>
      </Prose>
      <ul className="my-3 space-y-1 pl-4 text-sm text-zinc-400">
        <li className="list-disc">
          Task marked as{" "}
          <code className="font-mono text-xs text-zinc-300">[x]</code>,{" "}
          <code className="font-mono text-xs text-zinc-300">[PARTIAL]</code>, or{" "}
          <code className="font-mono text-xs text-zinc-300">[NEEDS-REWORK]</code>
        </li>
        <li className="list-disc">Last Checkpoint updated with commit hash</li>
        <li className="list-disc">
          Last Validation updated with build/test/lint results
        </li>
        <li className="list-disc">
          Last QA updated with score and verdict (if QA ran)
        </li>
        <li className="list-disc">
          Autonomous decisions logged to{" "}
          <code className="font-mono text-xs text-zinc-300">
            NIGHT_SHIFT_LOG.md
          </code>
        </li>
      </ul>

      <SubHeading>Mid-course Re-evaluation</SubHeading>
      <Prose>
        <p>
          At approximately 50% task completion, the system pauses to re-read the
          original spec, compare it against current implementation, and check
          whether remaining tasks are still relevant. The plan is updated if
          needed with a{" "}
          <code className="font-mono text-zinc-300">
            ### Mid-course re-evaluation
          </code>{" "}
          section in the log.
        </p>
      </Prose>

      {/* ============================================================ */}
      {/*  5. Phase 3: Audit Loops                                     */}
      {/* ============================================================ */}
      <SectionHeading id="phase-3">5. Phase 3: Audit Loops</SectionHeading>
      <Prose>
        <p>
          When all implementation tasks are marked{" "}
          <code className="font-mono text-zinc-300">[x]</code> or{" "}
          <code className="font-mono text-zinc-300">[PARTIAL]</code>, NightShift
          runs <strong>at least 3 full audit loops</strong> before finalizing.
          Since each feature was already QA&apos;d individually during build,
          audit loops focus on cross-feature integration, security, and code
          quality.
        </p>
      </Prose>

      <SubHeading>5 Parallel Reviewers Per Loop</SubHeading>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
              <th className="py-2 pr-4 font-medium">Agent</th>
              <th className="py-2 pr-4 font-medium">Type</th>
              <th className="py-2 font-medium">Focus</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              {
                agent: "Security reviewer",
                type: "security-reviewer",
                focus: "Secrets, injection, auth, input validation, OWASP",
              },
              {
                agent: "Code reviewer",
                type: "code-reviewer",
                focus: "Quality, DRY, type safety, resource leaks, dead code, edge cases",
              },
              {
                agent: "Readability reviewer",
                type: "code-simplifier",
                focus: "Complexity, naming, patterns, simplification opportunities",
              },
              {
                agent: "Research agent",
                type: "Explore",
                focus: "Known issues with deps, missing features, production best practices",
              },
              {
                agent: "Full-app QA",
                type: "night-qa",
                focus: "End-to-end walkthrough of ALL features together",
              },
            ].map((row) => (
              <tr key={row.agent} className="border-b border-zinc-800/50">
                <td className="py-2 pr-4 text-xs text-zinc-300">
                  {row.agent}
                </td>
                <td className="py-2 pr-4 font-mono text-xs text-blue-400">
                  {row.type}
                </td>
                <td className="py-2 text-xs">{row.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeading>Loop Cycle</SubHeading>
      <MermaidDiagram
        className="my-6"
        chart={`flowchart TD
  A[Launch 5 reviewers\\nin parallel] --> B[Consolidate findings\\nby severity]
  B --> C{Critical or High\\nfindings?}
  C -->|Yes| D[Fix all critical + high]
  D --> E[Commit + push fixes]
  E --> F[Re-run validation]
  F --> A
  C -->|No| G{Completed >= 3 loops?}
  G -->|No| A
  G -->|Yes| H[Exit audit\\nproceed to finalize]`}
      />

      <Prose>
        <p>
          After all 5 agents return, findings are consolidated by severity (
          critical &gt; high &gt; medium &gt; low). All critical and high issues
          are fixed, then validation runs again and the next loop begins.
        </p>
      </Prose>

      <div className="my-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="mb-2 text-sm font-semibold text-zinc-200">
          Exit condition
        </p>
        <p className="text-xs text-zinc-400">
          A full loop returns <strong>zero</strong> critical or high findings
          across all 5 agents. Minimum 3 loops even if clean &mdash; the first
          loop almost always finds issues.
        </p>
      </div>

      <Collapsible title="Full-app QA prompt (audit mode)">
        <CodeBlock>
          {`## Full Application QA

Test the complete application end-to-end. This is not per-feature testing
(already done). Focus on:
- Cross-feature integration (does data from feature A show correctly in feature B?)
- Navigation flow (can you reach every page? Does back button work?)
- Overall consistency (same design language everywhere?)
- State management (does the app behave correctly after multiple actions?)

## All Features Built
<list of all completed features with their URLs/entry points>

## Dev Server
URL: http://localhost:<port>

## Known Issues (from per-feature QA)
<list any [PARTIAL] or [NEEDS-REWORK] items>`}
        </CodeBlock>
      </Collapsible>

      {/* ============================================================ */}
      {/*  6. Phase 4: Finalization                                    */}
      {/* ============================================================ */}
      <SectionHeading id="phase-4">6. Phase 4: Finalization</SectionHeading>

      <div className="my-6 space-y-4">
        {[
          {
            step: "3a",
            title: "Final validation suite",
            desc: "Full build + all tests + lint. Not just the last component — the entire project.",
          },
          {
            step: "3b",
            title: "Visual verification (if frontend)",
            desc: "Start dev server, screenshot all pages with Puppeteer, check for broken layouts, missing elements, cross-feature consistency. Kill dev server when done.",
          },
          {
            step: "3c",
            title: "Summary writing",
            desc: "Append a comprehensive summary to NIGHT_SHIFT_LOG.md with timing, completed tasks, decisions made, issues encountered, final validation results, and stats.",
          },
          {
            step: "3e",
            title: "Timestamp update",
            desc: "Set the Finished timestamp and duration in NIGHT_SHIFT_STATE.md. This is the first thing the user sees in the morning.",
          },
          {
            step: "3f",
            title: "PR creation",
            desc: 'Create a pull request with the night-shift label containing the session summary.',
          },
          {
            step: "3g",
            title: "Auto-debrief",
            desc: "Run /debrief to log session observations: what worked, what regressed, tagged with RULE_IGNORED, BAD_TRIGGER, CONTEXT_BLOWUP, QUALITY, WORKFLOW.",
          },
          {
            step: "3h",
            title: "Completion signal",
            desc: "Output the NIGHT_SHIFT_COMPLETE promise to stop the ralph-loop.",
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

      <Collapsible title="Summary template (NIGHT_SHIFT_LOG.md)">
        <CodeBlock>
          {`## Night Shift Summary — <date>

### Timing
- Started: 2026-04-13T22:30:00+01:00
- Finished: 2026-04-14T06:15:00+01:00
- Duration: 7h 45m

### Completed
- [x] Task 1 — status
- [x] Task 2 — status

### Decisions made
- Decision 1: short reason
- ...

### Not completed / Needs review
- What remains (if any)
- What requires human decision

### Issues encountered
- Bugs, blockers, surprises

### Final validation
- Build: pass/fail
- Tests: X pass / Y fail
- Lint: pass/fail
- Visual: pass/fail/N/A

### Stats
- Iterations used: X
- Files created: X
- Files modified: X
- Commits: X`}
        </CodeBlock>
      </Collapsible>

      <Collapsible title="PR creation command">
        <CodeBlock title="Shell">
          {`gh pr create \\
  --title "feat: <short summary from spec>" \\
  --body "$(cat NIGHT_SHIFT_LOG.md | tail -n +<summary section>)" \\
  --label "night-shift"`}
        </CodeBlock>
      </Collapsible>

      {/* ============================================================ */}
      {/*  7. Anti-Hallucination Protocol                              */}
      {/* ============================================================ */}
      <SectionHeading id="anti-hallucination">
        7. Anti-Hallucination Protocol
      </SectionHeading>
      <Prose>
        <p>
          The user is asleep. They cannot answer questions. Hallucinated code is
          worse than no code &mdash; it creates hidden bugs that waste hours to
          debug. Every NightShift agent enforces these rules.
        </p>
      </Prose>

      <div className="my-6 grid gap-3 sm:grid-cols-2">
        <RuleCard number={0} title="Investigate before answering">
          Never speculate about code you have not opened. Before writing or
          modifying any file, read the relevant source code, types, and
          interfaces. Give grounded answers based on what you actually see in
          the codebase.
        </RuleCard>

        <RuleCard number={1} title="Never guess">
          <strong>APIs</strong>: do not invent function signatures or endpoints.
          Search the codebase or fetch docs. <strong>Types</strong>: read the
          actual <code className="font-mono text-xs">.d.ts</code> or interface.{" "}
          <strong>Library usage</strong>: check existing usage or read docs.{" "}
          <strong>Business logic</strong>: read the source or spec.
        </RuleCard>

        <RuleCard number={2} title="Never leave silent traces">
          Forbidden without a{" "}
          <code className="font-mono text-xs">NIGHT_SHIFT_PROBLEMS.md</code>{" "}
          entry:{" "}
          <code className="font-mono text-xs">// TODO</code>,{" "}
          <code className="font-mono text-xs">it.skip()</code>, empty function
          bodies, <code className="font-mono text-xs">any</code> type escape
          hatches, debug markers.
        </RuleCard>

        <RuleCard number={3} title="When uncertain, log and move on">
          Every uncertainty is logged to{" "}
          <code className="font-mono text-xs">NIGHT_SHIFT_PROBLEMS.md</code>{" "}
          with category, file, what was needed, what was done, confidence level,
          and user action needed. Categories: UNCERTAINTY, ASSUMPTION, BLOCKED,
          UNFIXED, TEST GAP, DEPENDENCY.
        </RuleCard>

        <RuleCard number={4} title="Mark uncertain code">
          Any code written with uncertainty gets a greppable marker:{" "}
          <code className="font-mono text-xs">
            // NIGHT-SHIFT-REVIEW: &lt;reason&gt;
          </code>
          . The user runs{" "}
          <code className="font-mono text-xs">
            grep -r &quot;NIGHT-SHIFT-REVIEW&quot; .
          </code>{" "}
          in the morning.
        </RuleCard>

        <RuleCard number={5} title="Blocked > Broken">
          If a task requires information you do not have: log it, mark the task
          as <code className="font-mono text-xs">[BLOCKED]</code>, move to the
          next independent task. A blocked task the user finishes in 10 minutes
          is better than a hallucinated implementation that takes 2 hours to
          debug.
        </RuleCard>
      </div>

      <div className="my-4 rounded-lg border border-red-800/50 bg-red-950/20 p-4">
        <p className="mb-2 text-sm font-semibold text-red-400">
          Agent enforcement
        </p>
        <p className="text-xs leading-relaxed text-red-200/70">
          All night-shift agents have these rules built into their system
          prompts. The orchestrator also includes this in every agent prompt:{" "}
          <code className="font-mono text-red-300/70">
            &quot;Log any uncertainty to NIGHT_SHIFT_PROBLEMS.md. Use
            NIGHT-SHIFT-REVIEW comments for greppable markers. Never guess APIs
            or types.&quot;
          </code>
        </p>
      </div>

      {/* ============================================================ */}
      {/*  8. Error Recovery                                           */}
      {/* ============================================================ */}
      <SectionHeading id="error-recovery">8. Error Recovery</SectionHeading>
      <Prose>
        <p>
          If an iteration starts and the state looks inconsistent, NightShift
          follows these recovery steps:
        </p>
      </Prose>

      <div className="my-4 space-y-3">
        {[
          {
            problem: "Uncommitted changes",
            solution: "git stash or commit as [WIP]",
          },
          {
            problem: "Merge conflict in progress",
            solution: "Resolve it and commit",
          },
          {
            problem: "Task marked in_progress but not done",
            solution:
              "Previous iteration likely ran out of context. Reset task to pending and retry.",
          },
          {
            problem: "Build broken",
            solution:
              "Fix before starting new tasks. Spawn a dedicated night-fixer agent.",
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

      <Prose>
        <p>
          The general principle: <strong>never start new tasks on top of a
          broken state</strong>. Stabilize first, then proceed. Max 3 retries
          per error &mdash; after 3 attempts, log to{" "}
          <code className="font-mono text-zinc-300">
            NIGHT_SHIFT_PROBLEMS.md
          </code>
          , skip, and move on.
        </p>
      </Prose>

      {/* ============================================================ */}
      {/*  9. Context Management                                       */}
      {/* ============================================================ */}
      <SectionHeading id="context-management">
        9. Context Management
      </SectionHeading>
      <Prose>
        <p>
          Each iteration has a fresh context window. Context is automatically
          compacted as it approaches its limit, allowing indefinite work. These
          rules keep the orchestrator lean and effective.
        </p>
      </Prose>

      <SubHeading>Fresh Context Startup</SubHeading>
      <Prose>
        <p>
          On each new iteration, state is discovered from the filesystem rather
          than relying on memory:
        </p>
      </Prose>
      <ol className="my-3 space-y-1 pl-4 text-sm text-zinc-400">
        <li className="list-decimal">
          Read{" "}
          <code className="font-mono text-xs text-zinc-300">
            NIGHT_SHIFT_STATE.md
          </code>{" "}
          (the only memory between iterations)
        </li>
        <li className="list-decimal">
          Run{" "}
          <code className="font-mono text-xs text-zinc-300">init.sh</code> if
          environment needs setup
        </li>
        <li className="list-decimal">
          Check git log for recent commits (what was done)
        </li>
        <li className="list-decimal">
          Read only what the current task needs
        </li>
      </ol>

      <SubHeading>Keeping Context Lean</SubHeading>
      <div className="my-4 grid gap-3 sm:grid-cols-2">
        {[
          {
            title: "Delegate heavy work",
            desc: "The orchestrator reads state, spawns agents, merges, validates. Agents do the coding.",
          },
          {
            title: "Focused agent prompts",
            desc: "Only files and context relevant to that specific task. No project-wide dumps.",
          },
          {
            title: "Extract, don't keep",
            desc: "Don't keep verbose test output in context. Extract only the error line.",
          },
          {
            title: "Maximize batch size",
            desc: "All ready tasks per iteration, each in its own worktree agent.",
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
    S[State file] --> D[Dispatch]
    D --> M[Merge]
    M --> V[Validate]
  end
  subgraph Agents
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

      <Prose>
        <p>
          The state file is the single source of truth. Agent prompts are
          self-contained. The orchestrator stays lean. This architecture allows
          NightShift to run for 6-8 hours across dozens of iterations without
          running out of context.
        </p>
      </Prose>

      {/* ============================================================ */}
      {/*  Critical Rules (footer callout)                             */}
      {/* ============================================================ */}
      <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="mb-4 text-lg font-bold text-white">
          Critical Rules
        </h3>
        <div className="grid gap-x-6 gap-y-2 text-xs text-zinc-400 sm:grid-cols-2">
          {[
            "Never put secrets in code — use .env",
            "Never force push",
            "Commit regularly — every validated task gets a commit",
            "Log every decision — user must understand every choice by morning",
            "Quality > Quantity — 3 well-built features > 10 buggy ones",
            "Every commit must compile and pass lint at minimum",
            "Feature N+1 doesn't start if Feature N is broken (unless independent)",
            "Max 3 retries per error — then log, skip, move on",
            "Update NIGHT_SHIFT_STATE.md after EVERY task",
            "Keep orchestrator context lean — heavy work goes to agents",
            "Never guess, never hallucinate — if you can't find it, log and skip",
            "NIGHT_SHIFT_PROBLEMS.md is mandatory — user reviews it first thing",
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
