"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const currentGloss = Math.round(52 + (sliderPosition / 100) * (98.4 - 52));

  return (
    <section className="scroll-mt-24 bg-[#0B0C0E] py-24 sm:py-32 border-b border-[#22252C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Inspeksi Refleksi Optik
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl uppercase">
              Komparasi Sebelum & Sesudah
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#8C909A] font-light">
            Tarik slider horizontal untuk membandingkan pernis kusam ber-swirl mark dengan hasil restorasi cat optik 9H.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-16/10 w-full overflow-hidden border border-[#22252C] bg-[#121316] select-none cursor-ew-resize group"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1400&auto=format&fit=crop"
                  alt="Sesudah restorasi cat optik Apex"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>

              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[#C5A880] bg-[#121316]"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1400&auto=format&fit=crop"
                    alt="Sebelum restorasi cat swirl mark"
                    fill
                    className="object-cover brightness-75 contrast-125 saturate-50"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                  />
                </div>
              </div>

              <div className="absolute top-4 left-4 z-10 border border-[#22252C] bg-[#0B0C0E]/90 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase backdrop-blur-md">
                Kondisi Awal (Swirl &amp; Jamur)
              </div>

              <div className="absolute top-4 right-4 z-10 border border-[#C5A880]/40 bg-[#0B0C0E]/90 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase backdrop-blur-md">
                Restorasi 9H (Mirror Gloss)
              </div>

              <div
                className="absolute top-0 bottom-0 z-20 flex items-center justify-center -ml-5 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="flex h-10 w-10 items-center justify-center border border-[#DFCEB7] bg-[#C5A880] text-[#0B0C0E] shadow-2xl transition-transform group-hover:scale-110">
                  <span className="font-mono text-xs font-black tracking-widest">&lang;&rang;</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between border border-[#22252C] bg-[#0B0C0E]/85 px-4 py-2 text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase backdrop-blur-md">
                <span>Inspeksi Spekular: {currentGloss} GU</span>
                <span className="hidden sm:inline text-[#C5A880]">Ketebalan: 138 &mu;m Aman</span>
                <span>Geser Untuk Inspeksi</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6 lg:col-span-4 font-mono text-xs">
            <div className="border border-[#22252C] bg-[#121316] p-6 space-y-4">
              <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
                Telemetri Pengukuran
              </span>

              <div className="border-t border-[#22252C] pt-4">
                <span className="block text-[10px] text-[#8C909A] uppercase">
                  Tingkat Pantulan Kilau (Gloss Units)
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                    {currentGloss}
                  </span>
                  <span className="text-[10px] text-[#C5A880]">GU (Max 100 GU)</span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-[#22252C] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-zinc-600 via-[#C5A880] to-white transition-all duration-150"
                    style={{ width: `${(currentGloss / 100) * 100}%` }}
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
                <p className="mt-1 text-[11px] text-[#8C909A] font-light leading-relaxed">
                  Kami mengukur tiap panel bodi dengan ultrasonic gauge guna memastikan pernis asli tidak tergerus berlebihan.
                </p>
              </div>

              <div className="border-t border-[#22252C] pt-4">
                <span className="block text-[10px] text-[#8C909A] uppercase">
                  Status Pengujian
                </span>
                <p className="mt-1 text-xs text-[#C5A880] font-bold">
                  TERUJI BEBAS SWIRL MARK 95%+
                </p>
              </div>
            </div>

            <div className="p-2">
              <a
                href="#booking"
                className="flex h-12 w-full items-center justify-center border border-[#C5A880] bg-[#C5A880] text-xs font-bold tracking-[0.2em] text-[#0B0C0E] uppercase transition-all duration-300 hover:bg-transparent hover:text-[#C5A880]"
              >
                Jadwalkan Inspeksi Cat Anda &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
