"use client";

import { useState, useEffect } from "react";

interface GuideTabSwitcherProps {
  children: [React.ReactNode, React.ReactNode];
}

export default function GuideTabSwitcher({ children }: GuideTabSwitcherProps) {
  const [tab, setTab] = useState<"generic" | "jarvis">("generic");

  /* Sync with URL hash on mount and hash changes */
  useEffect(() => {
    function onHash() {
      if (window.location.hash === "#jarvis") setTab("jarvis");
      else if (window.location.hash === "#generic") setTab("generic");
    }
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      {/* Sticky section switcher */}
      <div className="sticky top-[57px] z-40 -mx-4 mb-10 border-b border-zinc-800 bg-zinc-950/90 px-4 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex gap-1 py-2">
          <button
            type="button"
            onClick={() => {
              setTab("generic");
              window.history.replaceState(null, "", "#generic");
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "generic"
                ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40"
                : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
            }`}
          >
            Generic Guide
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("jarvis");
              window.history.replaceState(null, "", "#jarvis");
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "jarvis"
                ? "bg-purple-500/20 text-purple-400 ring-1 ring-purple-500/40"
                : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
            }`}
          >
            Jarvis Config
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className={tab === "generic" ? "block" : "hidden"}>
        {children[0]}
      </div>
      <div className={tab === "jarvis" ? "block" : "hidden"}>
        {children[1]}
      </div>
    </>
  );
}
