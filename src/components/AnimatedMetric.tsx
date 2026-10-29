"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { SPECULAR_EASE } from "@/lib/motion";

interface AnimatedMetricProps {
  target: number;
  suffix: string;
  className?: string;
}

export default function AnimatedMetric({
  target,
  suffix,
  className,
}: AnimatedMetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();
  const [current, setCurrent] = useState<number>(target);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || prefersReduced || hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;
    const controls = animate(0, target, {
      duration: 1.05,
      ease: SPECULAR_EASE,
      onUpdate: (latest) => {
        setCurrent(Math.round(latest));
      },
    });

    return () => {
      controls.stop();
    };
  }, [isInView, prefersReduced, target]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {current}
      {suffix}
    </span>
  );
}
