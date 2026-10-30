"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget } from "@/lib/scroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.2,
      autoRaf: false,
      anchors: false,
      respectReducedMotion: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href === "#main-content" || href === "#") {
        return;
      }

      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) {
          event.preventDefault();
          scrollToTarget(href);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
      gsap.ticker.remove(updateLenis);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
