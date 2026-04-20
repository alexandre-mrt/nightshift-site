import type { Metadata } from "next";
import GuideTabSwitcher from "@/components/GuideTabSwitcher";
import MermaidDiagram from "@/components/MermaidDiagram";
import Collapsible from "@/components/Collapsible";

export const metadata: Metadata = {
  title: "Claude Code Guide | NightShift Docs",
  description:
    "Comprehensive guide to Claude Code: installation, configuration, CLAUDE.md, skills, agents, hooks, MCP servers, and advanced patterns.",
};

/* ------------------------------------------------------------------ */
/*  Reusable style constants                                          */
/* ------------------------------------------------------------------ */

const codeBlock =
  "overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-300 border border-zinc-800";
const sectionHeading =
  "text-2xl font-bold tracking-tight text-white mt-16 mb-6";
const subHeading = "text-xl font-semibold text-zinc-100 mt-10 mb-4";
const prose = "text-zinc-400 leading-relaxed";
const tableWrapper =
  "overflow-x-auto rounded-lg border border-zinc-800 text-sm";
const th =
  "border-b border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-left font-medium text-zinc-200";
const td = "border-b border-zinc-800 px-4 py-2.5 text-zinc-400";
const card =
  "rounded-xl border border-zinc-800 bg-zinc-900/50 p-5";

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Claude Code Guide
      </h1>
      <p className="mb-2 text-lg text-zinc-400">
        Everything you need to set up and master Claude Code for autonomous
        development workflows.
      </p>

      <GuideTabSwitcher>
        {/* ============================================================ */}
        {/*  TAB 1 — Generic Guide                                       */}
        {/* ============================================================ */}
        <div id="generic">
          {/* -------------------------------------------------------- */}
          {/*  Table of Contents                                        */}
          {/* -------------------------------------------------------- */}
          <nav className="mb-12 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              On this page
            </h2>
            <ol className="columns-1 gap-x-8 space-y-1.5 text-sm sm:columns-2">
              {[
                ["#installation", "Installation & Setup"],
                ["#configuration", "Configuration Hierarchy"],
                ["#claude-md", "Writing Effective CLAUDE.md"],
                ["#skills", "Custom Skills"],
                ["#agents", "Custom Agents"],
                ["#hooks", "Hooks System"],
                ["#mcp", "MCP Server Integration"],
                ["#advanced", "Advanced Patterns"],
                ["#tips", "Community Tips"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-zinc-400 transition-colors hover:text-blue-400"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* ======================================================== */}
          {/*  1. Installation & Setup                                  */}
          {/* ======================================================== */}
          <section id="installation">
            <h2 className={sectionHeading}>1. Installation &amp; Setup</h2>
            <p className={prose + " mb-6"}>
              Claude Code supports four installation methods. The{" "}
              <strong className="text-zinc-200">native installer</strong> is
              recommended — it requires no dependencies and auto-updates in the
              background.
            </p>

            {/* Installation grid */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {/* Native */}
              <div className={card}>
                <h3 className="mb-1 font-semibold text-zinc-100">
                  Native Install{" "}
                  <span className="ml-1.5 rounded bg-blue-500/20 px-1.5 py-0.5 text-xs text-blue-400">
                    Recommended
                  </span>
                </h3>
                <p className="mb-3 text-xs text-zinc-500">
                  Auto-updates, no dependencies
                </p>
                <pre className={codeBlock}>
                  <code>{`# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex`}</code>
                </pre>
              </div>

              {/* Homebrew */}
              <div className={card}>
                <h3 className="mb-1 font-semibold text-zinc-100">Homebrew</h3>
                <p className="mb-3 text-xs text-zinc-500">
                  macOS / Linux — manual updates
                </p>
                <pre className={codeBlock}>
                  <code>{`brew install --cask claude-code

# Latest channel (bleeding edge)
brew install --cask claude-code@latest`}</code>
                </pre>
              </div>

              {/* WinGet */}
              <div className={card}>
                <h3 className="mb-1 font-semibold text-zinc-100">WinGet</h3>
                <p className="mb-3 text-xs text-zinc-500">Windows native</p>
                <pre className={codeBlock}>
                  <code>{`winget install Anthropic.ClaudeCode`}</code>
                </pre>
              </div>

              {/* npm (deprecated) */}
              <div className={card + " opacity-60"}>
                <h3 className="mb-1 font-semibold text-zinc-100">
                  npm{" "}
                  <span className="ml-1.5 rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs text-yellow-400">
                    Deprecated
                  </span>
                </h3>
                <p className="mb-3 text-xs text-zinc-500">
                  Requires Node.js 18+
                </p>
                <pre className={codeBlock}>
                  <code>{`npm install -g @anthropic-ai/claude-code

# Migrate to native:
curl -fsSL https://claude.ai/install.sh | bash
npm uninstall -g @anthropic-ai/claude-code`}</code>
                </pre>
              </div>
            </div>

            {/* System Requirements */}
            <h3 className={subHeading}>System Requirements</h3>
            <div className={tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Platform</th>
                    <th className={th}>Minimum Version</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["macOS", "13.0 (Ventura) or later"],
                    ["Windows", "10 v1809+ or Server 2019+ (Git for Windows required)"],
                    ["Ubuntu", "20.04+"],
                    ["Debian", "10+"],
                    ["Alpine Linux", "3.19+ (requires libgcc, libstdc++, ripgrep)"],
                  ].map(([platform, version]) => (
                    <tr key={platform}>
                      <td className={td + " font-medium text-zinc-300"}>{platform}</td>
                      <td className={td}>{version}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={prose + " mt-3 text-sm"}>
              <strong className="text-zinc-300">Hardware:</strong> 4 GB+ RAM (8 GB
              recommended), x64 or ARM64.{" "}
              <strong className="text-zinc-300">Shell:</strong> Bash, Zsh,
              PowerShell, or CMD.
            </p>

            {/* Authentication */}
            <h3 className={subHeading}>Authentication</h3>
            <p className={prose}>
              Claude Code requires a <strong className="text-zinc-200">Pro</strong>{" "}
              ($20/month), <strong className="text-zinc-200">Max</strong>,{" "}
              <strong className="text-zinc-200">Team</strong>,{" "}
              <strong className="text-zinc-200">Enterprise</strong>, or{" "}
              <strong className="text-zinc-200">Console</strong> (API) account. The
              free Claude.ai plan does not include Claude Code access. Third-party
              providers (Amazon Bedrock, Google Vertex AI) are also supported.
            </p>
            <pre className={codeBlock + " mt-4"}>
              <code>{`claude             # Launch and follow OAuth prompts
claude --version   # Check installed version
claude doctor      # Comprehensive diagnostic check`}</code>
            </pre>
          </section>

          {/* ======================================================== */}
          {/*  2. Configuration Hierarchy                               */}
          {/* ======================================================== */}
          <section id="configuration">
            <h2 className={sectionHeading}>2. Configuration Hierarchy</h2>
            <p className={prose + " mb-6"}>
              Claude Code uses a layered settings system. Higher-priority settings
              override lower ones.
            </p>

            <MermaidDiagram
              chart={`graph TD
  A["1. Managed Policy Settings<br/><i>Organization-wide, admin-enforced</i>"] --> B["2. ~/.claude/settings.json<br/><i>Global user settings</i>"]
  B --> C["3. .claude/settings.local.json<br/><i>Machine-specific project (gitignored)</i>"]
  C --> D["4. .claude/settings.json<br/><i>Project-level (committed to git)</i>"]
  D --> E["5. Enterprise Defaults<br/><i>Fallback defaults</i>"]
  style A fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
  style B fill:#1e3a5f,stroke:#3b82f6,color:#e4e4e7
  style C fill:#27272a,stroke:#3f3f46,color:#e4e4e7
  style D fill:#27272a,stroke:#3f3f46,color:#e4e4e7
  style E fill:#27272a,stroke:#3f3f46,color:#e4e4e7`}
              className="mb-6"
            />

            <h3 className={subHeading}>Directory Structure</h3>
            <pre className={codeBlock}>
              <code>{`project-root/
├── .claude/
│   ├── settings.json          # Project settings (shared via git)
│   ├── settings.local.json    # Local overrides (gitignored)
│   ├── agents/                # Custom subagent definitions
│   ├── skills/                # Custom skills
│   ├── rules/                 # Modular instruction files
│   ├── agent-memory/          # Subagent persistent memory
│   └── hooks/                 # Hook scripts
├── CLAUDE.md                  # Project instructions (shared via git)
├── CLAUDE.local.md            # Personal project notes (gitignored)
└── .mcp.json                  # Shared MCP server configuration

~/.claude/                     # Global user configuration
├── CLAUDE.md                  # Global instructions for all projects
├── settings.json              # Global user settings
├── agents/                    # Personal subagents (all projects)
├── skills/                    # Personal skills (all projects)
└── agent-memory/              # Personal subagent memory`}</code>
            </pre>

            <h3 className={subHeading}>Key settings.json Options</h3>
            <pre className={codeBlock}>
              <code>{`{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)",
      "Bash(git status *)",
      "Edit",
      "Write"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)"
    ]
  },
  "env": {
    "NODE_ENV": "development"
  },
  "hooks": {},
  "autoUpdatesChannel": "stable"
}`}</code>
            </pre>
            <p className={prose + " mt-3 text-sm"}>
              Permission rules follow the format{" "}
              <code className="font-mono text-zinc-300">Tool</code> or{" "}
              <code className="font-mono text-zinc-300">Tool(specifier)</code>.
              Rules are evaluated: deny first, then ask, then allow. The first
              matching rule wins.
            </p>

            <h3 className={subHeading}>Permission Modes</h3>
            <div className={tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Mode</th>
                    <th className={th}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Default", "Standard prompting for each action"],
                    ["Auto", "AI classifier reviews commands, blocks only risky ones"],
                    ["Accept Edits", "Auto-accept file edits within the working directory"],
                    ["Plan", "Read-only exploration, no file modifications"],
                    ["Don't Ask", "Auto-deny permission prompts (only pre-allowed tools work)"],
                    ["Bypass Permissions", "Skip all prompts (sandboxed/CI environments only)"],
                  ].map(([mode, desc]) => (
                    <tr key={mode}>
                      <td className={td + " font-mono font-medium text-zinc-300"}>{mode}</td>
                      <td className={td}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <pre className={codeBlock + " mt-4"}>
              <code>{`claude --permission-mode auto
claude --permission-mode plan`}</code>
            </pre>
          </section>

          {/* ======================================================== */}
          {/*  3. Writing Effective CLAUDE.md                           */}
          {/* ======================================================== */}
          <section id="claude-md">
            <h2 className={sectionHeading}>3. Writing Effective CLAUDE.md</h2>
            <p className={prose + " mb-6"}>
              CLAUDE.md is a special file that Claude reads at the start of every
              conversation. It provides persistent context that cannot be inferred
              from code alone: build commands, code style, workflow rules, and
              project-specific conventions.
            </p>

            <h3 className={subHeading}>The Golden Rules</h3>
            <div className="mb-6 space-y-3">
              {[
                [
                  "Keep it under 200 lines (~2,500 tokens)",
                  "The Claude Code creator's own CLAUDE.md is approximately 100 lines. Every line must earn its place.",
                ],
                [
                  'For each line, ask: "Would removing this cause Claude to make mistakes?"',
                  "If not, cut it. Bloated files are the #1 cause of Claude ignoring rules.",
                ],
                [
                  "Don't send an LLM to do a linter's job",
                  "Use hooks and deterministic tools for formatting, linting, and type checking.",
                ],
              ].map(([title, desc], i) => (
                <div key={i} className={card}>
                  <p className="font-medium text-zinc-100">{title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{desc}</p>
                </div>
              ))}
            </div>

            <h3 className={subHeading}>What to Include vs. Exclude</h3>
            <div className={tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th + " text-green-400"}>Include</th>
                    <th className={th + " text-red-400"}>Exclude</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Bash commands Claude can't guess", "Anything Claude can figure out by reading code"],
                    ["Code style rules that differ from defaults", "Standard language conventions Claude already knows"],
                    ["Testing instructions and preferred test runners", "Detailed API docs (link to docs instead)"],
                    ["Repository etiquette (branch naming, PR conventions)", "Information that changes frequently"],
                    ["Architectural decisions specific to your project", "Long explanations or tutorials"],
                    ["Developer environment quirks (required env vars)", "File-by-file descriptions of the codebase"],
                  ].map(([inc, exc], i) => (
                    <tr key={i}>
                      <td className={td}>{inc}</td>
                      <td className={td}>{exc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={subHeading}>Example CLAUDE.md</h3>
            <pre className={codeBlock}>
              <code>{`# Code Style
- Use ES modules (import/export), not CommonJS (require)
- Destructure imports when possible
- TypeScript strict mode, named exports, Tailwind CSS

# Commands
- Build: \`npm run build\`
- Test single file: \`npm test -- path/to/test.ts\`
- Lint: \`npm run lint\`
- Type check: \`npx tsc --noEmit\`

# Workflow
- IMPORTANT: Always typecheck after making a series of code changes
- Prefer running single tests, not the whole suite
- Use conventional commits (feat:, fix:, chore:, docs:)
- Branch naming: feature/ticket-description

# Architecture
- Monorepo with packages/ directory
- API: Express + Prisma in packages/api
- Frontend: Next.js App Router in packages/web
- Shared types in packages/shared

# Gotchas
- The database migration command requires DATABASE_URL env var
- Tests use a separate test database (see .env.test)
- YOU MUST run \`npm run generate\` after changing Prisma schemas`}</code>
            </pre>

            <Collapsible title="Importing files and path-specific rules">
              <div className="space-y-4 text-sm text-zinc-400">
                <div>
                  <p className="mb-2 font-medium text-zinc-200">
                    @import syntax
                  </p>
                  <p>
                    CLAUDE.md supports{" "}
                    <code className="font-mono text-zinc-300">@path/to/file</code>{" "}
                    syntax for referencing other files:
                  </p>
                  <pre className={codeBlock + " mt-2"}>
                    <code>{`See @README.md for project overview
Git workflow: @docs/git-instructions.md
Personal overrides: @~/.claude/my-project-instructions.md`}</code>
                  </pre>
                </div>
                <div>
                  <p className="mb-2 font-medium text-zinc-200">
                    Path-specific rules via .claude/rules/
                  </p>
                  <p>
                    Break instructions into focused files. Use YAML frontmatter with
                    glob patterns for conditional loading:
                  </p>
                  <pre className={codeBlock + " mt-2"}>
                    <code>{`---
paths: "**/*.{ts,tsx}"
---

# TypeScript Rules
- Use strict mode
- Prefer interfaces over type aliases for object shapes
- Always handle null/undefined cases explicitly`}</code>
                  </pre>
                </div>
                <div>
                  <p className="mb-2 font-medium text-zinc-200">
                    The /init command
                  </p>
                  <p>
                    Run{" "}
                    <code className="font-mono text-zinc-300">/init</code>{" "}
                    to generate a starter CLAUDE.md based on your project. It
                    analyzes your codebase to detect build systems, test frameworks,
                    and code patterns.
                  </p>
                </div>
              </div>
            </Collapsible>
          </section>

          {/* ======================================================== */}
          {/*  4. Custom Skills                                         */}
          {/* ======================================================== */}
          <section id="skills">
            <h2 className={sectionHeading}>4. Custom Skills</h2>
            <p className={prose + " mb-6"}>
              Skills extend what Claude can do beyond CLAUDE.md. Unlike CLAUDE.md
              content which loads every session, a skill&apos;s body loads{" "}
              <strong className="text-zinc-200">only when invoked</strong>, so long
              reference material costs almost nothing until needed.
            </p>

            <h3 className={subHeading}>SKILL.md Format</h3>
            <p className={prose + " mb-3"}>
              Every skill needs a{" "}
              <code className="font-mono text-zinc-300">SKILL.md</code> file in its
              own directory under{" "}
              <code className="font-mono text-zinc-300">.claude/skills/</code>:
            </p>
            <pre className={codeBlock}>
              <code>{`.claude/skills/
└── deploy/
    ├── SKILL.md           # Main instructions (required)
    ├── template.md        # Template for Claude to fill in
    ├── scripts/
    │   └── validate.sh    # Script Claude can execute
    └── examples/
        └── sample.md      # Example output`}</code>
            </pre>

            <h3 className={subHeading}>YAML Frontmatter Fields</h3>
            <pre className={codeBlock}>
              <code>{`---
name: deploy                        # Becomes /deploy slash command
description: Deploy to production   # How Claude decides when to use it
argument-hint: [environment]        # Shown during autocomplete
disable-model-invocation: true      # Only manual /deploy trigger
user-invocable: true                # Show in / menu
allowed-tools: Bash(git *) Edit     # Tools allowed without prompts
model: sonnet                       # Model override (sonnet, opus, haiku)
effort: high                        # Effort level (low, medium, high, max)
context: fork                       # Run in isolated subagent context
paths: "**/*.py"                    # Only activate for matching files
---`}</code>
            </pre>

            <h3 className={subHeading}>Trigger Patterns</h3>
            <p className={prose + " mb-4"}>
              Claude reads the{" "}
              <code className="font-mono text-zinc-300">description</code> field of
              every available skill and matches it against your request. Tips for
              better triggering:
            </p>
            <ul className="mb-6 space-y-1.5 text-sm text-zinc-400">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                Front-load the key use case in the description
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                Include &quot;Use when...&quot; language
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                Include keywords users would naturally say
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                Make the description more specific if it triggers too often
              </li>
            </ul>

            <h3 className={subHeading}>Invocation Control</h3>
            <div className={tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Frontmatter</th>
                    <th className={th}>You Invoke</th>
                    <th className={th}>Claude Invokes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["(default)", "Yes", "Yes"],
                    ["disable-model-invocation: true", "Yes", "No"],
                    ["user-invocable: false", "No", "Yes"],
                  ].map(([fm, you, claude]) => (
                    <tr key={fm}>
                      <td className={td + " font-mono text-xs text-zinc-300"}>{fm}</td>
                      <td className={td}>{you}</td>
                      <td className={td}>{claude}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={subHeading}>Example: GitHub Issue Fixer</h3>
            <pre className={codeBlock}>
              <code>{`---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---

Analyze and fix the GitHub issue: $ARGUMENTS.

1. Use \`gh issue view\` to get the issue details
2. Understand the problem described in the issue
3. Search the codebase for relevant files
4. Implement the necessary changes
5. Write and run tests to verify the fix
6. Ensure code passes linting and type checking
7. Create a descriptive commit message
8. Push and create a PR`}</code>
            </pre>
            <p className={prose + " mt-2 text-sm"}>
              Invoke with:{" "}
              <code className="font-mono text-zinc-300">/fix-issue 1234</code>
            </p>

            <Collapsible title="Skill vs. CLAUDE.md — when to use which">
              <div className={tableWrapper}>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className={th}>Use CLAUDE.md for</th>
                      <th className={th}>Use Skills for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Facts that apply every session", "Procedures triggered on demand"],
                      ["Build commands, style rules", "Multi-step workflows"],
                      ["Short, universal instructions", "Long reference material"],
                      ["Things Claude must always know", "Domain knowledge needed sometimes"],
                    ].map(([md, skill], i) => (
                      <tr key={i}>
                        <td className={td}>{md}</td>
                        <td className={td}>{skill}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Collapsible>
          </section>

          {/* ======================================================== */}
          {/*  5. Custom Agents                                         */}
          {/* ======================================================== */}
          <section id="agents">
            <h2 className={sectionHeading}>5. Custom Agents</h2>
            <p className={prose + " mb-6"}>
              Subagents are specialized AI assistants that run in their{" "}
              <strong className="text-zinc-200">own context window</strong> with
              custom system prompts, specific tool access, and independent
              permissions. They keep exploration and research out of your main
              conversation.
            </p>

            <h3 className={subHeading}>Built-in Subagents</h3>
            <div className={tableWrapper + " mb-6"}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Agent</th>
                    <th className={th}>Model</th>
                    <th className={th}>Tools</th>
                    <th className={th}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Explore", "Haiku (fast)", "Read-only", "File discovery, code search"],
                    ["Plan", "Inherits", "Read-only", "Codebase research for plan mode"],
                    ["general-purpose", "Inherits", "All", "Complex research, multi-step ops"],
                  ].map(([agent, model, tools, purpose]) => (
                    <tr key={agent}>
                      <td className={td + " font-mono font-medium text-zinc-300"}>{agent}</td>
                      <td className={td}>{model}</td>
                      <td className={td}>{tools}</td>
                      <td className={td}>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={subHeading}>Agent .md Format</h3>
            <p className={prose + " mb-3"}>
              Subagent files live in{" "}
              <code className="font-mono text-zinc-300">.claude/agents/</code>{" "}
              (project) or{" "}
              <code className="font-mono text-zinc-300">~/.claude/agents/</code>{" "}
              (personal) as Markdown with YAML frontmatter:
            </p>
            <pre className={codeBlock}>
              <code>{`---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
permissionMode: plan
memory: project
effort: high
color: red
---

You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication and authorization flaws
- Secrets or credentials in code
- Insecure data handling

Provide specific line references and suggested fixes.
When done, update your agent memory with patterns found.`}</code>
            </pre>

            <h3 className={subHeading}>Model Selection Strategy</h3>
            <div className={tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Model</th>
                    <th className={th}>Best For</th>
                    <th className={th}>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Haiku", "Fast exploration, simple lookups, quick searches", "Lowest"],
                    ["Sonnet", "Balanced capability/speed, code review, analysis", "Medium"],
                    ["Opus", "Complex reasoning, security review, architecture decisions", "Highest"],
                    ["inherit", "When you want the parent's model (default)", "Same as parent"],
                  ].map(([model, best, cost]) => (
                    <tr key={model}>
                      <td className={td + " font-mono font-medium text-zinc-300"}>{model}</td>
                      <td className={td}>{best}</td>
                      <td className={td}>{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={subHeading}>When to Use Agents vs. Direct Work</h3>
            <div className={tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Use Subagents</th>
                    <th className={th}>Work Directly</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Research that reads many files", "Small, focused changes"],
                    ["Code review (fresh context, no bias)", "Quick questions"],
                    ["Tasks requiring specialized constraints", "Tasks needing full conversation history"],
                    ["Parallel investigation of different areas", "Sequential implementation steps"],
                    ["Expensive exploration you want out of main context", "Simple commands and edits"],
                  ].map(([agent, direct], i) => (
                    <tr key={i}>
                      <td className={td}>{agent}</td>
                      <td className={td}>{direct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Collapsible title="Persistent memory and CLI-defined agents">
              <div className="space-y-4 text-sm text-zinc-400">
                <div>
                  <p className="mb-2 font-medium text-zinc-200">
                    Persistent Memory Scopes
                  </p>
                  <div className={tableWrapper}>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className={th}>Scope</th>
                          <th className={th}>Location</th>
                          <th className={th}>Use When</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["user", "~/.claude/agent-memory/<name>/", "Knowledge applies across all projects"],
                          ["project", ".claude/agent-memory/<name>/", "Project-specific, shareable via git"],
                          ["local", ".claude/agent-memory-local/<name>/", "Project-specific, not in git"],
                        ].map(([scope, loc, use]) => (
                          <tr key={scope}>
                            <td className={td + " font-mono text-zinc-300"}>{scope}</td>
                            <td className={td + " font-mono text-xs"}>{loc}</td>
                            <td className={td}>{use}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <p className="mb-2 font-medium text-zinc-200">
                    CLI-defined Subagents (Session-only)
                  </p>
                  <pre className={codeBlock}>
                    <code>{`claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer",
    "prompt": "You are a senior code reviewer...",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'`}</code>
                  </pre>
                </div>
              </div>
            </Collapsible>
          </section>

          {/* ======================================================== */}
          {/*  6. Hooks System                                          */}
          {/* ======================================================== */}
          <section id="hooks">
            <h2 className={sectionHeading}>6. Hooks System</h2>
            <p className={prose + " mb-6"}>
              Hooks are user-defined scripts, HTTP endpoints, or LLM prompts that
              execute automatically at specific points in Claude Code&apos;s
              lifecycle. Unlike CLAUDE.md instructions which are advisory, hooks are{" "}
              <strong className="text-zinc-200">deterministic</strong> and guarantee
              the action happens.
            </p>

            <h3 className={subHeading}>Hook Events</h3>
            <div className={tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Event</th>
                    <th className={th}>When It Fires</th>
                    <th className={th}>Can Block?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["SessionStart", "Session begins/resumes", "No"],
                    ["SessionEnd", "Session ends", "No"],
                    ["UserPromptSubmit", "User submits a prompt", "Yes"],
                    ["Stop", "Claude finishes responding", "Yes"],
                    ["StopFailure", "Turn ends due to API error", "No"],
                    ["PreToolUse", "Before tool execution", "Yes"],
                    ["PostToolUse", "After tool completes", "No"],
                    ["PostToolUseFailure", "Tool execution fails", "No"],
                    ["PermissionRequest", "Permission dialog shown", "Yes"],
                    ["PermissionDenied", "Auto mode denies a call", "No"],
                    ["Notification", "Claude sends notification", "No"],
                    ["FileChanged", "Watched file changes", "No"],
                    ["CwdChanged", "Working directory changes", "No"],
                    ["SubagentStart", "Subagent spawned", "No"],
                    ["SubagentStop", "Subagent finishes", "No"],
                  ].map(([event, when, block]) => (
                    <tr key={event}>
                      <td className={td + " font-mono font-medium text-zinc-300"}>{event}</td>
                      <td className={td}>{when}</td>
                      <td className={td}>
                        <span
                          className={
                            block === "Yes"
                              ? "text-yellow-400"
                              : "text-zinc-600"
                          }
                        >
                          {block}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={subHeading}>Configuration Example</h3>
            <pre className={codeBlock}>
              <code>{`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/validate-bash.sh",
            "timeout": 600,
            "statusMessage": "Validating command..."
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/auto-format.sh"
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/setup-env.sh"
          }
        ]
      }
    ]
  }
}`}</code>
            </pre>

            <h3 className={subHeading}>Handler Types</h3>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className={card}>
                <p className="mb-2 font-semibold text-zinc-100">Command</p>
                <p className="mb-2 text-xs text-zinc-500">Run shell scripts</p>
                <pre className={codeBlock + " text-xs"}>
                  <code>{`{
  "type": "command",
  "command": "./hook.sh",
  "timeout": 600
}`}</code>
                </pre>
              </div>
              <div className={card}>
                <p className="mb-2 font-semibold text-zinc-100">HTTP</p>
                <p className="mb-2 text-xs text-zinc-500">Call endpoints</p>
                <pre className={codeBlock + " text-xs"}>
                  <code>{`{
  "type": "http",
  "url": "http://localhost/hook",
  "timeout": 30
}`}</code>
                </pre>
              </div>
              <div className={card}>
                <p className="mb-2 font-semibold text-zinc-100">Prompt</p>
                <p className="mb-2 text-xs text-zinc-500">LLM evaluation</p>
                <pre className={codeBlock + " text-xs"}>
                  <code>{`{
  "type": "prompt",
  "prompt": "Allow? $ARGS",
  "model": "claude-opus-4-1"
}`}</code>
                </pre>
              </div>
            </div>

            <h3 className={subHeading}>Ralph-Loop Stop Pattern</h3>
            <p className={prose + " mb-3"}>
              The Stop hook prevents Claude from finishing prematurely, creating an
              autonomous execution loop. If the hook exits with code 2, Claude
              continues working.
            </p>
            <pre className={codeBlock}>
              <code>{`#!/bin/bash
# ~/.claude/hooks/check-tasks.sh
# Check if there are remaining tasks
if grep -q "- \\[ \\]" ./tasks/todo.md 2>/dev/null; then
  echo "There are uncompleted tasks in todo.md" >&2
  exit 2  # Block stopping — Claude continues working
fi
exit 0  # Allow stopping`}</code>
            </pre>
            <pre className={codeBlock + " mt-3"}>
              <code>{`// In settings.json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/check-tasks.sh"
          }
        ]
      }
    ]
  }
}`}</code>
            </pre>

            <Collapsible title="Exit codes and matcher patterns">
              <div className="space-y-4 text-sm text-zinc-400">
                <div>
                  <p className="mb-2 font-medium text-zinc-200">Exit Codes</p>
                  <div className={tableWrapper}>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className={th}>Exit Code</th>
                          <th className={th}>Behavior</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["0", "Success. JSON output on stdout is processed"],
                          ["2", "Blocking error. Action is blocked, stderr sent to Claude"],
                          ["Other", "Non-blocking error. Logged but execution continues"],
                        ].map(([code, behavior]) => (
                          <tr key={code}>
                            <td className={td + " font-mono text-zinc-300"}>{code}</td>
                            <td className={td}>{behavior}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <p className="mb-2 font-medium text-zinc-200">Matcher Patterns</p>
                  <div className={tableWrapper}>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className={th}>Pattern</th>
                          <th className={th}>Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['"*", "" or omitted', "Match all tool calls"],
                          ["Letters/digits with |", '"Bash", "Write|Edit"'],
                          ["Contains special chars", "JavaScript regex"],
                          ["MCP tools", '"mcp__playwright__.*"'],
                        ].map(([pattern, example], i) => (
                          <tr key={i}>
                            <td className={td + " font-mono text-xs text-zinc-300"}>{pattern}</td>
                            <td className={td}>{example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Collapsible>
          </section>

          {/* ======================================================== */}
          {/*  7. MCP Server Integration                                */}
          {/* ======================================================== */}
          <section id="mcp">
            <h2 className={sectionHeading}>7. MCP Server Integration</h2>
            <p className={prose + " mb-6"}>
              The{" "}
              <strong className="text-zinc-200">
                Model Context Protocol (MCP)
              </strong>{" "}
              is an open-source standard for AI-tool integrations. MCP servers give
              Claude Code access to external tools, databases, and APIs — think of
              them as plugins that let Claude interact with the outside world.
            </p>

            <h3 className={subHeading}>Adding MCP Servers</h3>
            <pre className={codeBlock}>
              <code>{`# Remote HTTP server (recommended)
claude mcp add --transport http notion https://mcp.notion.com/mcp

# Remote HTTP with authentication
claude mcp add --transport http secure-api https://api.example.com/mcp \\
  --header "Authorization: Bearer your-token"

# Local stdio server
claude mcp add --transport stdio --env AIRTABLE_API_KEY=YOUR_KEY airtable \\
  -- npx -y airtable-mcp-server

# Management commands
claude mcp list              # List all configured servers
claude mcp get github        # Get details for a server
claude mcp remove github     # Remove a server`}</code>
            </pre>

            <h3 className={subHeading}>Installation Scopes</h3>
            <div className={tableWrapper + " mb-6"}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Scope</th>
                    <th className={th}>Loads In</th>
                    <th className={th}>Shared</th>
                    <th className={th}>Stored In</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Local (default)", "Current project", "No", "~/.claude.json"],
                    ["Project", "Current project", "Yes (via git)", ".mcp.json"],
                    ["User", "All your projects", "No", "~/.claude.json"],
                  ].map(([scope, loads, shared, stored]) => (
                    <tr key={scope}>
                      <td className={td + " font-medium text-zinc-300"}>{scope}</td>
                      <td className={td}>{loads}</td>
                      <td className={td}>{shared}</td>
                      <td className={td + " font-mono text-xs"}>{stored}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className={subHeading}>Project-Shared Configuration</h3>
            <pre className={codeBlock}>
              <code>{`// .mcp.json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.github.com/mcp"
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "\${DATABASE_URL:-postgresql://localhost:5432/mydb}"
      }
    }
  }
}`}</code>
            </pre>

            <h3 className={subHeading}>Popular MCP Servers</h3>
            <div className={tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Server</th>
                    <th className={th}>Purpose</th>
                    <th className={th}>Install Command</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["GitHub", "Issues, PRs, commits, CI/CD", "claude mcp add --transport http github https://api.github.com/mcp"],
                    ["Sentry", "Error monitoring, debugging", "claude mcp add --transport http sentry https://mcp.sentry.dev/mcp"],
                    ["Notion", "Documentation, wikis", "claude mcp add --transport http notion https://mcp.notion.com/mcp"],
                    ["Playwright", "Browser automation, testing", "claude mcp add --transport stdio playwright -- npx -y @playwright/mcp@latest"],
                    ["Brave Search", "Web search", "claude mcp add --transport http brave-search <url>"],
                    ["Sequential Thinking", "Structured reasoning", "claude mcp add --transport stdio thinking -- npx -y @anthropic/mcp-sequential-thinking"],
                    ["Filesystem", "Extended file operations", "claude mcp add --transport stdio fs -- npx -y @modelcontextprotocol/server-filesystem"],
                    ["PostgreSQL", "Database queries", "claude mcp add --transport stdio postgres -- npx -y @modelcontextprotocol/server-postgres"],
                    ["Context7", "Real-time library docs", "claude mcp add --transport http context7 https://mcp.context7.com/mcp"],
                    ["Stripe", "Payment integration", "claude mcp add --transport http stripe https://mcp.stripe.com"],
                  ].map(([server, purpose, cmd]) => (
                    <tr key={server}>
                      <td className={td + " font-medium text-zinc-300 whitespace-nowrap"}>{server}</td>
                      <td className={td + " whitespace-nowrap"}>{purpose}</td>
                      <td className={td}>
                        <code className="font-mono text-xs text-zinc-500 break-all">
                          {cmd}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={prose + " mt-3 text-sm"}>
              Claude Code uses <strong className="text-zinc-300">Tool Search</strong>{" "}
              to discover MCP tools on demand, reducing context usage by ~95%. You
              can safely connect 10+ servers without drowning Claude in tool
              descriptions.
            </p>
          </section>

          {/* ======================================================== */}
          {/*  8. Advanced Patterns                                     */}
          {/* ======================================================== */}
          <section id="advanced">
            <h2 className={sectionHeading}>8. Advanced Patterns</h2>

            <h3 className={subHeading}>Auto Mode</h3>
            <p className={prose + " mb-3"}>
              Auto mode lets an AI classifier review commands, blocking only
              genuinely risky actions while routine work proceeds without prompts:
            </p>
            <pre className={codeBlock}>
              <code>{`# Single task, autonomous execution
claude --permission-mode auto -p "fix all lint errors"

# Fully unattended CI/CD (sandboxed containers ONLY)
claude -p "Fix all lint errors" \\
  --dangerously-skip-permissions \\
  --output-format stream-json`}</code>
            </pre>

            <h3 className={subHeading}>Agent Teams (Experimental)</h3>
            <p className={prose + " mb-3"}>
              Agent teams coordinate multiple Claude Code instances with a shared
              task list. Enable with{" "}
              <code className="font-mono text-zinc-300">
                CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
              </code>
              .
            </p>
            <ul className="mb-6 space-y-1.5 text-sm text-zinc-400">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                <strong className="text-zinc-300">Team lead</strong> orchestrates
                work, assigns tasks, synthesizes results
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                <strong className="text-zinc-300">Teammates</strong> work
                independently with their own context windows
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                <strong className="text-zinc-300">Worktree isolation</strong>{" "}
                ensures each teammate gets its own git worktree
              </li>
            </ul>

            <h3 className={subHeading}>Git Worktree Isolation</h3>
            <p className={prose + " mb-3"}>
              Run multiple agents on the same repo without file conflicts:
            </p>
            <pre className={codeBlock}>
              <code>{`# Create worktrees for parallel work
git worktree add ../feature-auth feature/auth
git worktree add ../feature-ui feature/ui

# Run Claude in each worktree
cd ../feature-auth && claude
cd ../feature-ui && claude

# Or via subagent frontmatter:
# isolation: worktree`}</code>
            </pre>

            <h3 className={subHeading}>Context Window Management</h3>
            <p className={prose + " mb-4"}>
              The context window is{" "}
              <strong className="text-zinc-200">
                the most important resource to manage
              </strong>
              . Key strategies:
            </p>
            <div className="mb-6 space-y-2">
              {[
                ["/clear", "Reset context entirely between unrelated tasks"],
                ["/compact <instructions>", "Intelligently summarize while preserving key info"],
                ["/btw", "Ask side questions in overlay — never enters history"],
                ["/rewind", "Restore conversation and/or code state to checkpoints"],
              ].map(([cmd, desc]) => (
                <div key={cmd} className="flex gap-3 text-sm">
                  <code className="shrink-0 font-mono text-blue-400">{cmd}</code>
                  <span className="text-zinc-400">{desc}</span>
                </div>
              ))}
            </div>
            <p className={prose + " text-sm italic"}>
              &quot;After two failed corrections, /clear and write a better initial
              prompt incorporating what you learned.&quot; — Boris Cherny, Claude
              Code creator
            </p>

            <h3 className={subHeading}>Memory System</h3>
            <div className="mb-6 space-y-2">
              {[
                ["CLAUDE.md hierarchy", "Explicit instructions at global, project, and directory levels"],
                [".claude/rules/", "Modular, path-specific rules"],
                ["Auto memory", "Claude automatically saves build commands, debugging insights, workflow habits"],
                ["Subagent memory", "Persistent cross-session learning per agent"],
                ["Session persistence", "claude --continue / claude --resume"],
              ].map(([layer, desc]) => (
                <div key={layer} className="flex gap-3 text-sm">
                  <span className="shrink-0 font-medium text-zinc-300">{layer}</span>
                  <span className="text-zinc-500">{desc}</span>
                </div>
              ))}
            </div>

            <Collapsible title="Fan-out pattern and writer/reviewer pattern">
              <div className="space-y-4 text-sm text-zinc-400">
                <div>
                  <p className="mb-2 font-medium text-zinc-200">
                    Fan-Out Pattern (Batch Operations)
                  </p>
                  <pre className={codeBlock}>
                    <code>{`# Generate task list
claude -p "List all Python files needing migration" > files.txt

# Process in parallel
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue" \\
    --allowedTools "Edit,Bash(git commit *)" &
done
wait`}</code>
                  </pre>
                </div>
                <div>
                  <p className="mb-2 font-medium text-zinc-200">
                    Writer/Reviewer Pattern
                  </p>
                  <p>
                    Run two sessions for quality: Session A writes, Session B
                    reviews with fresh context and no bias, then Session A
                    addresses feedback.
                  </p>
                </div>
              </div>
            </Collapsible>
          </section>

          {/* ======================================================== */}
          {/*  9. Community Tips                                        */}
          {/* ======================================================== */}
          <section id="tips">
            <h2 className={sectionHeading}>9. Community Tips</h2>
            <p className={prose + " mb-6"}>
              Practical advice from the Claude Code creator (Boris Cherny, Staff
              Engineer @ Anthropic) and the community.
            </p>

            <h3 className={subHeading}>Top Tips</h3>
            <div className="mb-8 space-y-3">
              {[
                [
                  "Give Claude a way to verify its work",
                  "Tests, screenshots, expected outputs. With a feedback loop, quality improves 2-3x. This is the single highest-leverage thing you can do.",
                ],
                [
                  "Keep CLAUDE.md to ~100 lines",
                  "Cover workflow orchestration, task management, self-improvement, verification, elegance, and autonomous bug fixing.",
                ],
                [
                  "Three core principles",
                  "Simplicity First (delete rather than add), No Laziness (find root causes), Minimal Impact (only modify what's necessary).",
                ],
                [
                  "Run 10-15 parallel sessions",
                  "Use separate git worktrees. Each session works on its own feature branch without conflicts.",
                ],
                [
                  "Don't babysit",
                  'Use direct, outcome-focused prompts: "Fix", "Prove to me this works", "Grill me on these changes."',
                ],
                [
                  "Use hooks for formatting, not CLAUDE.md",
                  "PostToolUse hooks are deterministic. CLAUDE.md instructions are advisory and can be ignored.",
                ],
              ].map(([title, desc], i) => (
                <div key={i} className={card}>
                  <p className="font-medium text-zinc-100">{title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{desc}</p>
                </div>
              ))}
            </div>

            <h3 className={subHeading}>Common Anti-Patterns to Avoid</h3>
            <div className={tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th + " text-red-400"}>Anti-Pattern</th>
                    <th className={th + " text-green-400"}>Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Kitchen sink session — mixing unrelated tasks", "/clear between tasks"],
                    ["Correction spiral — 3+ failed fixes", "/clear + better initial prompt"],
                    ["Over-specified CLAUDE.md — 500+ lines", "Prune to <200 lines, move details to skills"],
                    ["Trust-then-verify gap — no verification", "Always provide tests/scripts/screenshots"],
                    ["Infinite exploration — unscoped research", "Use subagents or scope narrowly"],
                    ["Babysitting — approving every action", "Use auto mode or /permissions allowlists"],
                  ].map(([anti, fix], i) => (
                    <tr key={i}>
                      <td className={td}>{anti}</td>
                      <td className={td}>{fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Collapsible title="Useful slash commands reference">
              <div className={tableWrapper}>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className={th}>Command</th>
                      <th className={th}>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["/init", "Generate starter CLAUDE.md"],
                      ["/compact", "Summarize context to free space"],
                      ["/clear", "Reset context between tasks"],
                      ["/rewind", "Restore to checkpoint"],
                      ["/btw", "Side question (no context cost)"],
                      ["/permissions", "Manage tool allowlists"],
                      ["/mcp", "View MCP server status"],
                    ].map(([cmd, purpose]) => (
                      <tr key={cmd}>
                        <td className={td + " font-mono text-zinc-300"}>{cmd}</td>
                        <td className={td}>{purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Collapsible>
          </section>

          <div className="mt-16 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600">
            Content sourced from official Anthropic documentation and community
            resources. Last updated April 2026.
          </div>
        </div>

        {/* ============================================================ */}
        {/*  TAB 2 — Jarvis Config (placeholder for Part B agent)        */}
        {/* ============================================================ */}
        <div id="jarvis" className="space-y-16">
          {/* ---------- Intro ---------- */}
          <div>
            <div className="mb-2 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
              Real-World Setup
            </div>
            <h2 className="mb-4 text-2xl font-bold text-white">The Jarvis Configuration</h2>
            <p className="text-zinc-400 leading-relaxed">
              Jarvis is a 24/7 AI assistant running on a Mac Mini (Apple Silicon, headless). It serves
              the Mourot family via iMessage, handles overnight autonomous coding via Night Shift,
              delivers morning briefings, and manages a full ecosystem of custom skills and agents.
              This section walks through the entire setup.
            </p>
          </div>

          {/* ---------- 1. System Overview ---------- */}
          <section id="jarvis-overview">
            <h3 className="mb-4 text-xl font-semibold text-white">1. System Overview</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Hardware", value: "Mac Mini M-series", detail: "Headless, 24/7 operation" },
                { label: "OS", value: "macOS Tahoe 26.1", detail: "Apple Silicon native" },
                { label: "Runtime", value: "Claude Code CLI", detail: "With --dangerously-skip-permissions for autonomous work" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">{item.label}</div>
                  <div className="mt-1 font-semibold text-white">{item.value}</div>
                  <div className="mt-1 text-xs text-zinc-500">{item.detail}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <MermaidDiagram chart={`graph LR
    A["iMessage"] -->|"family messages"| B["Jarvis\\nMac Mini"]
    B -->|"context routing"| C["Alexandre\\nFull access"]
    B -->|"context routing"| D["Papa\\nLimited"]
    B -->|"context routing"| E["Maman\\nLimited"]
    B -->|"overnight"| F["Night Shift"]
    B -->|"daily"| G["Morning Briefing"]
    B -->|"email"| H["Gmail Integration"]
    F -->|"delivers"| I["PR Ready"]
    G -->|"delivers"| J["Daily Report"]
    style B fill:#7c3aed,stroke:#7c3aed,color:#fff
    style F fill:#3b82f6,stroke:#3b82f6,color:#fff
    style G fill:#f59e0b,stroke:#f59e0b,color:#fff`} />
            </div>
          </section>

          {/* ---------- 2. Message Routing ---------- */}
          <section id="jarvis-routing">
            <h3 className="mb-4 text-xl font-semibold text-white">2. iMessage Context Routing</h3>
            <p className="mb-4 text-zinc-400 leading-relaxed">
              Every incoming iMessage is matched against a contact table. Each family member has a
              dedicated <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-purple-400">CONTEXT.md</code> file
              that defines their permissions, interaction style, and allowed operations.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-zinc-400">
                    <th className="px-4 py-3">Sender</th>
                    <th className="px-4 py-3">Permissions</th>
                    <th className="px-4 py-3">Context File</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800/50">
                    <td className="px-4 py-3 font-medium text-white">Alexandre (owner)</td>
                    <td className="px-4 py-3"><span className="rounded bg-green-500/10 px-2 py-0.5 text-xs text-green-400">Full access</span> — shell, code, git, night-shift, system admin</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500">~/contexts/alexandre/CONTEXT.md</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="px-4 py-3 font-medium text-white">Papa (David)</td>
                    <td className="px-4 py-3"><span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">Limited</span> — no shell, no code, conversation + email + docs</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500">~/contexts/papa/CONTEXT.md</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="px-4 py-3 font-medium text-white">Maman (Carine)</td>
                    <td className="px-4 py-3"><span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">Limited</span> — no shell, no code, conversation + email + docs</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500">~/contexts/maman/CONTEXT.md</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-zinc-500">Unknown</td>
                    <td className="px-4 py-3"><span className="rounded bg-red-500/10 px-2 py-0.5 text-xs text-red-400">Rejected</span> — polite refusal in French</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-sm text-zinc-400">
                <span className="font-semibold text-zinc-300">Security model:</span> Parents have NO access to shell, code, or system commands.
                Only Alexandre can trigger night-shift, long-run, or system-level tasks. Allowed scripts for parents
                are explicitly whitelisted (transcribe.sh, send-email.py, md-to-docx.py).
              </p>
            </div>
          </section>

          {/* ---------- 3. Night Shift Deep Dive ---------- */}
          <section id="jarvis-nightshift">
            <h3 className="mb-4 text-xl font-semibold text-white">3. Night Shift — Autonomous Overnight Coding</h3>
            <p className="mb-4 text-zinc-400 leading-relaxed">
              The crown jewel of the Jarvis setup. Push a spec before bed, wake up to a review-ready PR.
              See the <a href="/architecture" className="text-blue-400 hover:underline">Architecture</a> and <a href="/how-it-works" className="text-blue-400 hover:underline">How It Works</a> pages
              for full details. Here&apos;s the operational summary:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Launch", desc: "night-shift spec.md [project-dir] — bash script sets up ralph-loop state file and launches Claude Code" },
                { title: "Pre-flight", desc: "Interactive questionnaire before user sleeps. Produces NIGHT_SHIFT_ENRICHED_SPEC.md with all clarifications." },
                { title: "Loop", desc: "Ralph-loop stop hook re-feeds the prompt on each exit, giving fresh context. NIGHT_SHIFT_STATE.md is the only memory." },
                { title: "Agents", desc: "Specialized subagents (night-coder, night-tester, night-qa, night-fixer) run in isolated git worktrees." },
                { title: "QA", desc: "GAN-inspired: night-qa evaluates against sprint contracts, night-fixer iterates. Max 5 cycles per feature." },
                { title: "Audit", desc: "3+ review loops with security, code quality, readability, and research reviewers cross-validating findings." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <div className="mb-1 font-semibold text-purple-400">{item.title}</div>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <Collapsible title="night-shift.sh launcher (key section)">
              <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-300 border border-zinc-800">
                <code>{`#!/usr/bin/env bash
# Usage: night-shift <spec-file> [project-dir] [--max-iterations N]

# The continuation prompt — re-fed each iteration
NIGHT_SHIFT_PROMPT="You are in Night Shift mode.
ORIGINAL SPEC: \${SPEC_FILE}
ENRICHED SPEC: NIGHT_SHIFT_ENRICHED_SPEC.md

1. Read NIGHT_SHIFT_STATE.md
2. IF no state: first iteration (plan + init)
3. IF state exists: continuation (next task)
4. When ALL done: final validation + PR + <promise>"

# Create ralph-loop state file
cat > .claude/ralph-loop.local.md <<STATE_EOF
---
active: true
iteration: 1
max_iterations: \${MAX_ITERATIONS}
completion_promise: "NIGHT_SHIFT_COMPLETE"
---
\${NIGHT_SHIFT_PROMPT}
STATE_EOF

# Launch Claude Code
claude --dangerously-skip-permissions "$NIGHT_SHIFT_PROMPT"`}</code>
              </pre>
            </Collapsible>
          </section>

          {/* ---------- 4. Agent Ecosystem ---------- */}
          <section id="jarvis-agents">
            <h3 className="mb-4 text-xl font-semibold text-white">4. Agent Ecosystem</h3>
            <p className="mb-4 text-zinc-400 leading-relaxed">
              Seven custom agents defined in <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-purple-400">~/.claude/agents/</code>,
              each with specific model, tools, and behavioral rules.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-zinc-400">
                    <th className="px-4 py-3">Agent</th>
                    <th className="px-4 py-3">Model</th>
                    <th className="px-4 py-3">Isolation</th>
                    <th className="px-4 py-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  {[
                    { name: "night-coder", model: "Opus", isolation: "worktree", purpose: "Implements features and components. Main workhorse." },
                    { name: "night-tester", model: "Opus", isolation: "worktree", purpose: "Writes comprehensive test suites for existing code." },
                    { name: "night-qa", model: "Opus", isolation: "none", purpose: "Functional QA via Playwright MCP. Evaluates sprint contracts." },
                    { name: "night-fixer", model: "Opus", isolation: "worktree", purpose: "Diagnoses and fixes build/test/lint failures. Deep analysis." },
                    { name: "code-reviewer", model: "Opus", isolation: "none", purpose: "Reviews code quality: DRY, types, resource leaks, edge cases." },
                    { name: "security-reviewer", model: "Opus", isolation: "none", purpose: "Security audit: secrets, injection, auth, OWASP top 10." },
                    { name: "planner", model: "Opus", isolation: "none", purpose: "Architecture planning and task decomposition." },
                  ].map((agent) => (
                    <tr key={agent.name} className="border-b border-zinc-800/50">
                      <td className="px-4 py-3 font-mono text-sm text-purple-400">{agent.name}</td>
                      <td className="px-4 py-3">{agent.model}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded px-2 py-0.5 text-xs ${agent.isolation === "worktree" ? "bg-blue-500/10 text-blue-400" : "bg-zinc-800 text-zinc-400"}`}>
                          {agent.isolation}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-400">{agent.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Collapsible title="Example agent definition: night-coder.md">
              <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-300 border border-zinc-800">
                <code>{`---
name: night-coder
description: Implement a single feature or component in an isolated worktree.
model: opus
tools: Read, Write, Edit, Grep, Glob, Bash
---

You are a Night Shift worker agent. You implement ONE feature or component.

## Rules
1. Read before writing — understand existing code first
2. Respect conventions — follow the project's CLAUDE.md
3. Stay in scope — implement ONLY what the task describes
4. Search, don't guess — Grep/Glob for real signatures
5. No hardcoded values — use constants, config, or env vars

## Workflow
1. Read relevant files from your task prompt
2. Understand interfaces, types, and patterns
3. Implement following existing patterns
4. Verify: run build + lint
5. Commit: feat(night-shift): <description>

## Do NOT
- Modify files outside your task scope
- Add abstractions for one-time use
- Install new dependencies without justification
- Guess APIs or types (search first, log if uncertain)
- Leave silent TODOs (log to NIGHT_SHIFT_PROBLEMS.md)`}</code>
              </pre>
            </Collapsible>
          </section>

          {/* ---------- 5. Skills Library ---------- */}
          <section id="jarvis-skills">
            <h3 className="mb-4 text-xl font-semibold text-white">5. Skills Library</h3>
            <p className="mb-4 text-zinc-400 leading-relaxed">
              26+ custom skills in <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-purple-400">~/.claude/skills/</code>,
              from autonomous workflows to domain-specific tools.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "night-shift", cat: "Autonomous", desc: "Overnight coding with ralph-loop" },
                { name: "night-shift-v3", cat: "Autonomous", desc: "Agent teams for audit & debug" },
                { name: "long-run", cat: "Autonomous", desc: "Multi-day sliding window work" },
                { name: "orchestrate", cat: "Autonomous", desc: "Multi-agent wave orchestration" },
                { name: "swarm", cat: "Autonomous", desc: "Coordinated agent swarm in tmux" },
                { name: "debrief", cat: "Meta", desc: "Log session observations to changelog" },
                { name: "meta-review", cat: "Meta", desc: "Periodic behavior pattern review" },
                { name: "skill-reviewer", cat: "Meta", desc: "Audit and optimize all .md files" },
                { name: "build-error-resolver", cat: "Dev", desc: "Diagnose build/compilation errors" },
                { name: "test-ts", cat: "Dev", desc: "Write & run TypeScript tests (Vitest)" },
                { name: "test-rust", cat: "Dev", desc: "Write & run Rust tests" },
                { name: "sui-move", cat: "Domain", desc: "Sui Move smart contracts" },
                { name: "blockchain-dev", cat: "Domain", desc: "Cross-chain dApp development" },
                { name: "master-thesis", cat: "Domain", desc: "Thesis context and instructions" },
                { name: "writer", cat: "Comms", desc: "Email writing and polish" },
                { name: "network", cat: "Comms", desc: "Search 140+ contact persona cards" },
                { name: "papa-assistant", cat: "Family", desc: "Papa-specific interaction rules" },
                { name: "maman-assistant", cat: "Family", desc: "Maman-specific interaction rules" },
              ].map((skill) => (
                <div key={skill.name} className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-purple-400">{skill.name}</span>
                    <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">{skill.cat}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">{skill.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- 6. Morning Briefing ---------- */}
          <section id="jarvis-morning">
            <h3 className="mb-4 text-xl font-semibold text-white">6. Morning Briefing System</h3>
            <p className="mb-4 text-zinc-400 leading-relaxed">
              When Alexandre says &quot;good morning&quot; or &quot;gm&quot;, Jarvis executes a full daily briefing
              sequence pulling data from multiple sources:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { step: "1", title: "Date & Calendar", desc: "Current date + Google Calendar events via MCP" },
                { step: "2", title: "Tasks & Schedule", desc: "Read ~/tasks/today.md and schedule files" },
                { step: "3", title: "Live News", desc: "Web search for configured topics (tech, crypto, AI)" },
                { step: "4", title: "Network Pulse", desc: "Flag contacts not reached in 30+ days from 140+ persona cards" },
                { step: "5", title: "Spanish Streak", desc: "Daily Spanish learning prompt from tracker" },
                { step: "6", title: "English Expression", desc: "New idiomatic expression (never repeated)" },
                { step: "7", title: "Meta-review Check", desc: "Check if behavior review is due" },
              ].map((item) => (
                <div key={item.step} className="flex gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-sm font-bold text-purple-400">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">{item.title}</div>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- 7. Meta & Self-Improvement ---------- */}
          <section id="jarvis-meta">
            <h3 className="mb-4 text-xl font-semibold text-white">7. Meta-Review & Self-Improvement</h3>
            <p className="mb-4 text-zinc-400 leading-relaxed">
              Jarvis has a feedback loop for continuous improvement. The debrief skill logs session
              observations, and the meta-review skill periodically analyzes behavior patterns.
            </p>
            <MermaidDiagram chart={`graph LR
    A["Session Work"] -->|"/debrief"| B["Meta Changelog\\n~/.claude/meta/changelog.md"]
    B -->|"/meta-review"| C["Pattern Analysis"]
    C -->|"findings"| D["CLAUDE.md Updates"]
    C -->|"findings"| E["Skill Refinements"]
    D --> A
    E --> A
    style B fill:#7c3aed,stroke:#7c3aed,color:#fff
    style C fill:#3b82f6,stroke:#3b82f6,color:#fff`} />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-2 font-semibold text-white text-sm">Debrief</div>
                <p className="text-xs text-zinc-400">
                  Runs automatically at the end of long sessions and after night shifts.
                  Logs what worked, what regressed, and tags entries with standard meta tags:
                  RULE_IGNORED, BAD_TRIGGER, CONTEXT_BLOWUP, QUALITY, WORKFLOW.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-2 font-semibold text-white text-sm">Meta-Review</div>
                <p className="text-xs text-zinc-400">
                  Periodic review of the meta changelog. Reads accumulated observations,
                  identifies recurring patterns, and proposes concrete fixes to skills,
                  agents, or CLAUDE.md files. Prevents regression.
                </p>
              </div>
            </div>
          </section>

          {/* ---------- 8. Gmail & Docs ---------- */}
          <section id="jarvis-integrations">
            <h3 className="mb-4 text-xl font-semibold text-white">8. Integrations</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-2 font-semibold text-white text-sm">Gmail</div>
                <p className="text-xs text-zinc-400">
                  Polls jarvis.clauded@gmail.com for incoming emails with attachments.
                  Parents can email documents for processing. Jarvis replies via iMessage
                  with a summary of what was done.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-2 font-semibold text-white text-sm">Audio Transcription</div>
                <p className="text-xs text-zinc-400">
                  Voice messages are transcribed via Groq Whisper API (French default).
                  Short messages: treated as typed text. Long recordings (&gt;5min): summarized
                  with key points and action items.
                </p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="mb-2 font-semibold text-white text-sm">Document Export</div>
                <p className="text-xs text-zinc-400">
                  Long responses for parents are converted to .docx (Word) via md-to-docx.py
                  and sent by email. Parents never receive .md or .txt files.
                </p>
              </div>
            </div>
          </section>

          {/* ---------- Closing ---------- */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6 text-center">
            <p className="text-sm text-zinc-400">
              This entire site was built in a single Night Shift session — spec to deploy — as a proof of concept.
              Check the <a href="/architecture" className="text-purple-400 hover:underline">Architecture</a> and <a href="/how-it-works" className="text-purple-400 hover:underline">How It Works</a> pages
              for the full technical deep dive.
            </p>
          </div>
        </div>
      </GuideTabSwitcher>
    </div>
  );
}
