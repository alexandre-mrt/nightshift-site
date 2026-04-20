"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Depth = "intuitive" | "technical";

const DepthContext = createContext<{
  depth: Depth;
  toggle: () => void;
}>({ depth: "intuitive", toggle: () => {} });

export function useDepth() {
  return useContext(DepthContext);
}

export function DepthProvider({ children }: { children: React.ReactNode }) {
  const [depth, setDepth] = useState<Depth>("intuitive");
  const toggle = useCallback(
    () => setDepth((d) => (d === "intuitive" ? "technical" : "intuitive")),
    []
  );

  return (
    <DepthContext.Provider value={{ depth, toggle }}>
      {children}
    </DepthContext.Provider>
  );
}

export function DepthSwitch() {
  const { depth, toggle } = useDepth();

  return (
    <div className="sticky top-[57px] z-40 -mx-4 mb-10 border-b border-zinc-800 bg-zinc-950/90 px-4 backdrop-blur-md sm:-mx-6 sm:px-6">
      <div className="flex items-center gap-3 py-2">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Depth
        </span>
        <button
          type="button"
          onClick={toggle}
          className="relative inline-flex h-7 w-[120px] items-center rounded-full border border-zinc-700 bg-zinc-900 transition-colors"
          aria-label={`Switch to ${depth === "intuitive" ? "technical" : "intuitive"} mode`}
        >
          <span
            className={`absolute h-6 w-[58px] rounded-full transition-all duration-200 ${
              depth === "intuitive"
                ? "left-0.5 bg-emerald-500/20 ring-1 ring-emerald-500/40"
                : "left-[59px] bg-orange-500/20 ring-1 ring-orange-500/40"
            }`}
          />
          <span
            className={`relative z-10 w-[60px] text-center text-xs font-medium transition-colors ${
              depth === "intuitive" ? "text-emerald-400" : "text-zinc-500"
            }`}
          >
            Intuitive
          </span>
          <span
            className={`relative z-10 w-[60px] text-center text-xs font-medium transition-colors ${
              depth === "technical" ? "text-orange-400" : "text-zinc-500"
            }`}
          >
            Technical
          </span>
        </button>
        <span className="text-xs text-zinc-600">
          {depth === "intuitive"
            ? "Analogies and visual explanations"
            : "Math, formulas, and CS notation"}
        </span>
      </div>
    </div>
  );
}

export function Intuitive({ children }: { children: React.ReactNode }) {
  const { depth } = useDepth();
  if (depth !== "intuitive") return null;
  return <>{children}</>;
}

export function Technical({ children }: { children: React.ReactNode }) {
  const { depth } = useDepth();
  if (depth !== "technical") return null;
  return <>{children}</>;
}

export function Both({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
