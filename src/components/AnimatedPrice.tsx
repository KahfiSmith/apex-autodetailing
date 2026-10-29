"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { ATELIER_EASE } from "@/lib/motion";

interface AnimatedPriceProps {
  value: string;
  className?: string;
}

function parsePriceParts(raw: string): {
  prefix: string;
  numeric: number | null;
  suffix: string;
} {
  const match = raw.match(/^(.*?)(\d[\d.]*)(.*)$/);
  if (!match) {
    return { prefix: raw, numeric: null, suffix: "" };
  }
  const digitsOnly = match[2].replace(/\./g, "");
  const parsed = Number.parseInt(digitsOnly, 10);
  if (Number.isNaN(parsed)) {
    return { prefix: raw, numeric: null, suffix: "" };
  }
  return {
    prefix: match[1],
    numeric: parsed,
    suffix: match[3],
  };
}

function formatIndonesianInteger(num: number): string {
  return Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function AnimatedPrice({ value, className }: AnimatedPriceProps) {
  const prefersReduced = useReducedMotion();
  const parsed = parsePriceParts(value);
  const [displayNumber, setDisplayNumber] = useState<number>(parsed.numeric ?? 0);
  const previousRef = useRef<number>(parsed.numeric ?? 0);

  useEffect(() => {
    if (parsed.numeric === null) {
      return;
    }

    const from = previousRef.current;
    const to = parsed.numeric;
    previousRef.current = to;

    if (prefersReduced || from === to) {
      const frame = requestAnimationFrame(() => setDisplayNumber(to));
      return () => cancelAnimationFrame(frame);
    }

    const controls = animate(from, to, {
      duration: 0.52,
      ease: ATELIER_EASE,
      onUpdate: (latest) => {
        setDisplayNumber(latest);
      },
    });

    return () => {
      controls.stop();
    };
  }, [parsed.numeric, prefersReduced]);

  if (parsed.numeric === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={`tabular-nums ${className ?? ""}`}>
      {parsed.prefix}
      {formatIndonesianInteger(displayNumber)}
      {parsed.suffix}
    </span>
  );
}
