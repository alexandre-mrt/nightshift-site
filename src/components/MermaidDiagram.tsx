"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({
  chart,
  className,
}: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        // Dynamic import to avoid SSR issues
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#3b82f6",
            primaryTextColor: "#e4e4e7",
            primaryBorderColor: "#3f3f46",
            lineColor: "#71717a",
            secondaryColor: "#27272a",
            tertiaryColor: "#18181b",
            background: "#09090b",
            mainBkg: "#18181b",
            nodeBorder: "#3f3f46",
            clusterBkg: "#18181b",
            clusterBorder: "#3f3f46",
            titleColor: "#e4e4e7",
            edgeLabelBackground: "#18181b",
          },
          fontFamily: "var(--font-geist-sans), sans-serif",
        });

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: rendered } = await mermaid.render(id, chart);

        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to render diagram"
          );
          setSvg("");
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div
        className={`rounded-lg border border-red-800 bg-red-950/50 p-4 text-sm text-red-400 ${className ?? ""}`}
      >
        <p className="mb-1 font-semibold">Diagram render error</p>
        <pre className="whitespace-pre-wrap text-xs">{error}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`flex justify-center overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 [&_svg]:max-w-full ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
