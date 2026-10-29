"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { studioData } from "@/data/detailing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TransformationShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [case1, case2, case3, case4] = studioData.cases;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const header = sectionRef.current?.querySelector(".showcase-header");
        if (header) {
          gsap.fromTo(
            header,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: header,
                start: "top 86%",
                once: true,
              },
            }
          );
        }

        const cards = gsap.utils.toArray<HTMLElement>(".atelier-case-card");
        cards.forEach((card) => {
          const media = card.querySelector<HTMLElement>(".atelier-case-media");
          const parallaxLayer = card.querySelector<HTMLElement>(
            ".atelier-case-parallax"
          );

          gsap.fromTo(
            card,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );

          if (media) {
            gsap.fromTo(
              media,
              { clipPath: "inset(7% 0% 7% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  once: true,
                },
              }
            );
          }

          if (parallaxLayer && media) {
            gsap.fromTo(
              parallaxLayer,
              { yPercent: -4.5, scale: 1.08 },
              {
                yPercent: 4.5,
                scale: 1.03,
                ease: "none",
                scrollTrigger: {
                  trigger: media,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              }
            );
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hasil"
      className="scroll-mt-24 border-b border-[#22252C] bg-[#0B0C0E] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="showcase-header flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Arsip Dokumentasi Pengerjaan
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
              Refleksi &amp; Preservasi
            </h2>
          </div>
          <p className="max-w-md text-xs font-light leading-relaxed text-[#8C909A]">
            Eksplorasi kurasi fotografi pengerjaan nyata unit performa tinggi di dalam ruang bay steril Apex.
          </p>
        </div>

        <div className="mt-14 space-y-12 sm:mt-16">
          {case1 && (
            <article className="atelier-case-card group relative overflow-hidden border border-[#22252C] bg-[#121316] transition-colors duration-300 hover:border-[#2E333C]">
              <div className="atelier-case-media relative aspect-16/9 w-full overflow-hidden sm:aspect-21/9">
                <div className="atelier-case-parallax absolute inset-0 h-full w-full">
                  <Image
                    src={case1.image}
                    alt={case1.vehicleName}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="100vw"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-[#0B0C0E]/20 to-transparent" />

                <div className="absolute top-3 left-3 z-10 flex items-center gap-3 sm:top-4 sm:left-4">
                  <span className="border border-[#22252C] bg-[#0B0C0E]/95 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase">
                    Plate 01 &bull; 98.4 GU High Specular
                  </span>
                  <span className="hidden border border-[#22252C] bg-[#0B0C0E]/95 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white uppercase sm:inline-block">
                    Bay 01 Cured
                  </span>
                </div>
              </div>

              <div className="border-t border-[#22252C] bg-[#0B0C0E]/95 p-6 sm:p-10">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                      <span>Feature 01 &bull; {case1.duration}</span>
                      <span>Refleksi 98 GU</span>
                    </div>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white uppercase sm:text-3xl">
                      {case1.vehicleName}
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs font-light leading-relaxed text-[#8C909A] sm:text-sm">
                      {case1.treatmentSummary}
                    </p>
                  </div>

                  <div className="shrink-0 border border-[#C5A880]/50 bg-[#121316] px-5 py-3 font-mono text-xs text-[#C5A880]">
                    {case1.packageType}
                  </div>
                </div>
              </div>
            </article>
          )}

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
            {case2 && (
              <article className="atelier-case-card group flex flex-col justify-between border border-[#22252C] bg-[#121316] transition-colors duration-300 hover:border-[#2E333C] lg:col-span-7">
                <div className="atelier-case-media relative aspect-16/10 w-full overflow-hidden">
                  <div className="atelier-case-parallax absolute inset-0 h-full w-full">
                    <Image
                      src={case2.image}
                      alt={case2.vehicleName}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 border border-[#22252C] bg-[#0B0C0E]/95 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase sm:top-4 sm:left-4">
                    PPF TPU 8.5 Mil &bull; Self-Healing
                  </div>
                </div>

                <div className="border-t border-[#22252C] p-6 sm:p-8">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                    <span>Feature 02</span>
                    <span>{case2.duration}</span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white uppercase">
                    {case2.vehicleName}
                  </h3>
                  <p className="mt-2 text-xs font-light leading-relaxed text-[#8C909A]">
                    {case2.treatmentSummary}
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-[#C5A880]">
                    &bull; {case2.highlight}
                  </p>
                </div>
              </article>
            )}

            {case3 && (
              <article className="atelier-case-card group flex flex-col justify-between border border-[#22252C] bg-[#121316] transition-colors duration-300 hover:border-[#2E333C] lg:col-span-5">
                <div className="atelier-case-media relative aspect-4/3 w-full overflow-hidden">
                  <div className="atelier-case-parallax absolute inset-0 h-full w-full">
                    <Image
                      src={case3.image}
                      alt={case3.vehicleName}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 border border-[#22252C] bg-[#0B0C0E]/95 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase sm:top-4 sm:left-4">
                    &theta; = 115&deg; Hydrophobic
                  </div>
                </div>

                <div className="border-t border-[#22252C] p-6 sm:p-8">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                    <span>Feature 03</span>
                    <span>{case3.duration}</span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white uppercase">
                    {case3.vehicleName}
                  </h3>
                  <p className="mt-2 text-xs font-light leading-relaxed text-[#8C909A]">
                    {case3.treatmentSummary}
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-[#C5A880]">
                    &bull; {case3.highlight}
                  </p>
                </div>
              </article>
            )}
          </div>

          {case4 && (
            <article className="atelier-case-card group relative overflow-hidden border border-[#22252C] bg-[#121316] transition-colors duration-300 hover:border-[#2E333C]">
              <div className="grid items-stretch lg:grid-cols-12">
                <div className="atelier-case-media relative aspect-16/9 w-full overflow-hidden sm:aspect-16/10 lg:col-span-6 lg:aspect-auto lg:min-h-[340px]">
                  <div className="atelier-case-parallax absolute inset-0 h-full w-full">
                    <Image
                      src={case4.image}
                      alt={case4.vehicleName}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute top-3 left-3 border border-[#22252C] bg-[#0B0C0E]/95 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase sm:top-4 sm:left-4">
                    pH Netral &bull; Ozonated 99.9%
                  </div>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-6">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
                    Feature 04 &bull; Kabin &amp; Nappa Leather
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white uppercase sm:text-3xl">
                    {case4.vehicleName}
                  </h3>
                  <p className="mt-4 text-xs font-light leading-relaxed text-[#8C909A] sm:text-sm">
                    {case4.treatmentSummary}
                  </p>
                  <div className="mt-6 border-t border-[#22252C] pt-4 font-mono text-xs text-[#C5A880]">
                    {case4.highlight}
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
