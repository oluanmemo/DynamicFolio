"use client";
import { useEffect, useRef } from "react";
import { TyperGroup } from "./standalone/typer";
import "./standalone/typer.css";

export function TyperHeroTitle({
  line1,
  line2,
  className,
}: {
  line1: string;
  line2: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const lines = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>("[data-typer]")
    );
    // reduced motion check
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      lines.forEach((el) => {
        el.dataset.typerType = "done";
        el.style.opacity = "1";
      });
      return;
    }

    const group = new TyperGroup(lines, { fps: 20, cycles: 3 }, 0.15);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          group.in();
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(containerRef.current);

    return () => {
      io.disconnect();
      group.destroy();
    };
  }, [line1, line2]);

  const typerStyles = {
    "--typer-fg": "var(--ink)",
    "--typer-bg": "var(--bg)",
    "--typer-accent": "var(--contact)",
    "--typer-accent-ink": "var(--ink)",
    display: "block",
    animation: "none",
  } as React.CSSProperties;

  return (
    <h1 ref={containerRef} className={className}>
      <span
        data-typer
        data-typer-type="initial"
        style={typerStyles}
      >
        {line1}
      </span>
      <em
        data-typer
        data-typer-type="initial"
        style={{ ...typerStyles, "--typer-settled-fg": "transparent" } as React.CSSProperties}
      >
        {line2}
      </em>
    </h1>
  );
}
