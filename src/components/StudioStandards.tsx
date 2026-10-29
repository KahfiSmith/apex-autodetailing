"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { studioData } from "@/data/detailing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function StudioStandards() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (listRef.current && progressLineRef.current) {
          gsap.fromTo(
            progressLineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: listRef.current,
                start: "top 72%",
                end: "bottom 65%",
                scrub: 0.4,
              },
            }
          );
        }

        const stations = gsap.utils.toArray<HTMLElement>(".standard-station");
        stations.forEach((station) => {
          const numeral = station.querySelector<HTMLElement>(".standard-numeral");
          const node = station.querySelector<HTMLElement>(".standard-node");

          gsap.fromTo(
            station,
            { opacity: 0.45, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: {
                trigger: station,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );

          if (numeral) {
            gsap.to(numeral, {
              color: "#C5A880",
              duration: 0.35,
              scrollTrigger: {
                trigger: station,
                start: "top 68%",
                end: "bottom 42%",
                toggleActions: "play reverse play reverse",
              },
            });
          }

          if (node) {
            gsap.to(node, {
              backgroundColor: "#C5A880",
              borderColor: "#DFCEB7",
              scale: 1.25,
              duration: 0.3,
              scrollTrigger: {
                trigger: station,
                start: "top 68%",
                end: "bottom 42%",
                toggleActions: "play reverse play reverse",
              },
            });
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="standar"
      className="scroll-mt-24 border-b border-[#22252C] bg-[#0B0C0E] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Standar Operasional
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
              Protokol Atelier &amp; Presisi
            </h2>
          </div>
          <p className="max-w-md text-xs font-light leading-relaxed text-[#8C909A]">
            Komitmen tanpa kompromi pada kebersihan lingkungan kerja, instrumen inspeksi optik, dan keaslian material berstandar internasional.
          </p>
        </div>

        <div ref={listRef} className="relative mt-14 pl-6 sm:mt-16 sm:pl-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-1 w-[1px] bg-[#22252C] sm:left-2"
          >
            <div
              ref={progressLineRef}
              className="h-full w-full origin-top bg-[#C5A880]"
            />
          </div>

          <div className="divide-y divide-[#22252C] border-y border-[#22252C]">
            {studioData.standards.map((item) => (
              <div
                key={item.number}
                className="standard-station relative grid items-baseline gap-5 py-10 sm:py-12 lg:grid-cols-12 lg:gap-12"
              >
                <span
                  aria-hidden="true"
                  className="standard-node pointer-events-none absolute top-14 -left-[1.55rem] h-2.5 w-2.5 border border-[#7A7F8A] bg-[#0B0C0E] sm:-left-[2.3rem]"
                />

                <div className="lg:col-span-2">
                  <span className="standard-numeral font-[family-name:var(--font-display)] text-4xl font-bold text-[#7A7F8A] transition-colors sm:text-5xl">
                    {item.number}
                  </span>
                  <span className="mt-2 block font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white uppercase sm:text-2xl">
                    {item.title}
                  </h3>
                </div>

                <div className="lg:col-span-6">
                  <p className="text-xs font-light leading-relaxed text-[#8C909A] sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
