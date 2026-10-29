"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ATELIER_EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef(false);
  const introTweenRef = useRef<gsap.core.Timeline | null>(null);

  const stopIntroCalibration = useCallback(() => {
    userInteractedRef.current = true;
    if (introTweenRef.current) {
      introTweenRef.current.kill();
      introTweenRef.current = null;
    }
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!containerRef.current) {
          return;
        }

        const proxy = { pos: 50 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 76%",
            once: true,
          },
          onUpdate: () => {
            if (!userInteractedRef.current) {
              setSliderPosition(proxy.pos);
            }
          },
        });

        tl.to(proxy, { pos: 28, duration: 0.55, ease: "power2.out" })
          .to(proxy, { pos: 68, duration: 0.7, ease: "power2.inOut" })
          .to(proxy, { pos: 50, duration: 0.5, ease: "power3.out" });

        introTweenRef.current = tl;
      });
    },
    { scope: sectionRef }
  );

  const updateFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / Math.max(rect.width, 1)) * 100));
    setSliderPosition(position);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    stopIntroCalibration();
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }
    updateFromClientX(event.clientX);
  };

  const handlePointerRelease = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 3;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      stopIntroCalibration();
      setSliderPosition((prev) => Math.max(0, prev - step));
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      stopIntroCalibration();
      setSliderPosition((prev) => Math.min(100, prev + step));
    } else if (event.key === "Home") {
      event.preventDefault();
      stopIntroCalibration();
      setSliderPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      stopIntroCalibration();
      setSliderPosition(100);
    }
  };

  const currentGloss = Math.round(52 + ((100 - sliderPosition) / 100) * (98.4 - 52));

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-24 border-b border-[#22252C] bg-[#0B0C0E] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: ATELIER_EASE }}
          className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end"
        >
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Inspeksi Refleksi Optik
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
              Komparasi Sebelum &amp; Sesudah
            </h2>
          </div>
          <p className="max-w-md text-xs font-light leading-relaxed text-[#8C909A]">
            Tarik garis inspeksi atau gunakan tombol panah untuk membandingkan pernis kusam ber-swirl mark dengan hasil restorasi cat optik 9H.
          </p>
        </motion.div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              role="slider"
              tabIndex={0}
              aria-label="Komparasi sebelum dan sesudah restorasi cat"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuetext={`Posisi pembanding ${Math.round(
                sliderPosition
              )} persen, pantulan ${currentGloss} Gloss Units`}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerRelease}
              onPointerCancel={handlePointerRelease}
              className="group relative aspect-16/10 w-full cursor-ew-resize overflow-hidden border border-[#22252C] bg-[#121316] select-none touch-pan-y"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1400&auto=format&fit=crop"
                  alt="Sesudah restorasi cat optik Apex"
                  fill
                  className="pointer-events-none object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>

              <div
                className="absolute inset-0 bg-[#121316]"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1400&auto=format&fit=crop"
                  alt="Sebelum restorasi cat swirl mark"
                  fill
                  className="pointer-events-none object-cover brightness-75 contrast-125 saturate-50"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>

              <div className="pointer-events-none absolute top-3 left-3 z-20 border border-[#22252C] bg-[#0B0C0E]/95 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-[#8C909A] uppercase sm:top-4 sm:left-4 sm:px-3">
                Kondisi Awal (Swirl &amp; Jamur)
              </div>

              <div className="pointer-events-none absolute top-3 right-3 z-20 border border-[#C5A880]/50 bg-[#0B0C0E]/95 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-[#C5A880] uppercase sm:top-4 sm:right-4 sm:px-3">
                Restorasi 9H (Mirror Gloss)
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 bottom-0 z-10 w-[2px] -ml-[1px] bg-[#C5A880]"
                style={{ left: `${sliderPosition}%` }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#DFCEB7] bg-[#C5A880] text-[#0B0C0E] shadow-xl transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-110"
                style={{ left: `${sliderPosition}%` }}
              >
                <span className="font-mono text-xs font-black tracking-widest">
                  &lang;&rang;
                </span>
              </div>

              <div className="pointer-events-none absolute right-3 bottom-3 left-3 z-20 flex items-center justify-between border border-[#22252C] bg-[#0B0C0E]/92 px-3.5 py-2 text-[10px] font-mono tracking-[0.18em] text-[#8C909A] uppercase sm:right-4 sm:bottom-4 sm:left-4 sm:px-4">
                <span className="tabular-nums">Inspeksi Spekular: {currentGloss} GU</span>
                <span className="hidden text-[#C5A880] sm:inline">
                  Ketebalan: 138 <span className="normal-case">&mu;m</span> Aman
                </span>
                <span>Geser Untuk Inspeksi</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6 font-mono text-xs lg:col-span-4">
            <div className="space-y-4 border border-[#22252C] bg-[#121316] p-6">
              <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
                Telemetri Pengukuran
              </span>

              <div className="border-t border-[#22252C] pt-4">
                <span className="block text-[10px] text-[#8C909A] uppercase">
                  Tingkat Pantulan Kilau (Gloss Units)
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="tabular-nums font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                    {currentGloss}
                  </span>
                  <span className="text-[10px] text-[#C5A880]">GU (Max 100 GU)</span>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden bg-[#22252C]">
                  <div
                    className="h-full origin-left bg-gradient-to-r from-[#7A7F8A] via-[#C5A880] to-[#F4F4F5] transition-transform duration-150"
                    style={{ transform: `scaleX(${currentGloss / 100})` }}
                  />
                </div>
              </div>

              <div className="border-t border-[#22252C] pt-4">
                <span className="block text-[10px] text-[#8C909A] uppercase">
                  Konservasi Ketebalan Pernis
                </span>
                <p className="mt-1 text-sm font-semibold text-white">
                  138 &mu;m (Terkikis &lt; 4 &mu;m)
                </p>
                <p className="mt-1 text-[11px] font-light leading-relaxed text-[#8C909A]">
                  Kami mengukur tiap panel bodi dengan ultrasonic gauge guna memastikan pernis asli tidak tergerus berlebihan.
                </p>
              </div>

              <div className="border-t border-[#22252C] pt-4">
                <span className="block text-[10px] text-[#8C909A] uppercase">
                  Status Pengujian
                </span>
                <p className="mt-1 text-xs font-bold text-[#C5A880]">
                  TERUJI BEBAS SWIRL MARK 95%+
                </p>
              </div>
            </div>

            <div>
              <motion.a
                href="#booking"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                className="atelier-sheen flex h-12 w-full items-center justify-center border border-[#C5A880] bg-[#C5A880] px-4 text-center text-xs font-bold tracking-[0.2em] text-[#0B0C0E] uppercase transition-colors duration-300 hover:bg-transparent hover:text-[#C5A880]"
              >
                Jadwalkan Inspeksi Cat Anda &rarr;
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
