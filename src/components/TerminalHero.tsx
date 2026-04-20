"use client";

import { useEffect, useState, useRef } from "react";

const lines = [
  { prompt: "$ ", text: "nightshift run --spec feature-auth.md", delay: 40 },
  { prompt: "", text: "  Loading spec... done", delay: 20 },
  { prompt: "", text: "  Spawning 7 agents across worktrees", delay: 25 },
  { prompt: "", text: "  night-coder    ██████████ ready", delay: 15 },
  { prompt: "", text: "  night-tester   ██████████ ready", delay: 15 },
  { prompt: "", text: "  night-qa       ██████████ ready", delay: 15 },
  { prompt: "", text: "  night-fixer    ██████████ ready", delay: 15 },
  { prompt: "", text: "  code-reviewer  ██████████ ready", delay: 15 },
  { prompt: "", text: "  sec-reviewer   ██████████ ready", delay: 15 },
  { prompt: "", text: "", delay: 0 },
  { prompt: "", text: "  ✓ Iteration 1/8 complete — 14 tests pass", delay: 20 },
  { prompt: "", text: "  ✓ Iteration 2/8 complete — 31 tests pass", delay: 20 },
  { prompt: "", text: "  ✓ Iteration 3/8 complete — 47 tests pass", delay: 20 },
  { prompt: "", text: "  ✓ QA audit passed — 0 regressions", delay: 20 },
  { prompt: "", text: "  ✓ Security review passed", delay: 20 },
  { prompt: "", text: "", delay: 0 },
  { prompt: "", text: "  PR #142 ready for review", delay: 30 },
  { prompt: "", text: "  You slept 7h. NightShift shipped auth.", delay: 30 },
];

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<
    { prompt: string; text: string; typed: string }[]
  >([]);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;

    async function animate() {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const line = lines[i];

        if (line.text === "") {
          // Empty line — just add it
          setVisibleLines((prev) => [
            ...prev,
            { prompt: "", text: "", typed: "" },
          ]);
          await sleep(100);
          continue;
        }

        // Add the line with empty typed text
        setVisibleLines((prev) => [
          ...prev,
          { prompt: line.prompt, text: line.text, typed: "" },
        ]);

        // Type out character by character
        for (let c = 0; c <= line.text.length; c++) {
          if (cancelled) return;
          const partial = line.text.slice(0, c);
          setVisibleLines((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              typed: partial,
            };
            return updated;
          });
          await sleep(line.delay);
        }

        await sleep(80);
      }

      if (!cancelled) setDone(true);
    }

    animate();

    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Terminal window chrome */}
      <div className="rounded-t-lg border border-zinc-700/60 bg-zinc-800/80 px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="block h-3 w-3 rounded-full bg-red-500/70" />
          <span className="block h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="block h-3 w-3 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 text-xs text-zinc-500 font-mono">
          nightshift
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="h-[340px] overflow-y-auto rounded-b-lg border border-t-0 border-zinc-700/60 bg-zinc-950/90 p-4 font-mono text-sm leading-relaxed backdrop-blur-sm"
      >
        {visibleLines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line.typed === "" && line.text === "" ? (
              <br />
            ) : (
              <>
                {line.prompt && (
                  <span className="text-blue-400">{line.prompt}</span>
                )}
                <span
                  className={
                    line.typed.includes("✓")
                      ? "text-emerald-400"
                      : line.typed.includes("PR #")
                        ? "text-amber-300 font-semibold"
                        : line.typed.includes("You slept")
                          ? "text-violet-400"
                          : line.typed.includes("ready")
                            ? "text-zinc-400"
                            : "text-zinc-300"
                  }
                >
                  {line.typed}
                </span>
                {/* Blinking cursor on last line if not done */}
                {i === visibleLines.length - 1 && !done && (
                  <span className="animate-pulse text-blue-400">▌</span>
                )}
              </>
            )}
          </div>
        ))}
        {done && (
          <div className="whitespace-pre">
            <span className="text-blue-400">$ </span>
            <span className="animate-pulse text-blue-400">▌</span>
          </div>
        )}
      </div>
    </div>
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
