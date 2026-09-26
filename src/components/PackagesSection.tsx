"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { studioData } from "@/data/detailing";
import { DetailingPackage } from "@/types/detailing";

export default function PackagesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeViews, setActiveViews] = useState<{ [pkgId: string]: "full" | "macro" }>({});

  const categories = [
    { id: "all", label: "Semua Paket" },
    { id: "coating", label: "Ceramic Coating" },
    { id: "ppf", label: "PPF Self-Healing" },
    { id: "correction", label: "Paint Correction" },
    { id: "interior", label: "Interior Atelier" },
  ];

  const filteredPackages =
    activeCategory === "all"
      ? studioData.packages
      : studioData.packages.filter((pkg) => pkg.category === activeCategory);

  const toggleView = (pkgId: string, view: "full" | "macro") => {
    setActiveViews((prev) => ({ ...prev, [pkgId]: view }));
  };

  return (
    <section id="paket" className="scroll-mt-24 bg-[#0B0C0E] py-24 sm:py-32 border-b border-[#22252C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Katalog Preservasi
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl uppercase">
              Paket &amp; Spesifikasi Atelier
            </h2>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-mono tracking-[0.15em] uppercase">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`pb-2 transition-all ${
                  activeCategory === cat.id
                    ? "border-b-2 border-[#C5A880] text-white"
                    : "text-[#8C909A] hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-24">
          {filteredPackages.map((pkg: DetailingPackage, index: number) => {
            const currentView = activeViews[pkg.id] || "full";
            const displayImage = currentView === "macro" && pkg.macroImage ? pkg.macroImage : pkg.image;

            return (
              <article
                key={pkg.id}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16 border-b border-[#22252C] pb-20 last:border-b-0"
              >
                <div
                  className={`relative aspect-16/10 w-full overflow-hidden border border-[#22252C] bg-[#121316] lg:col-span-7 group ${
                    index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={displayImage}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 border border-[#22252C] bg-[#0B0C0E]/90 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase backdrop-blur-md">
                    {pkg.badge}
                  </div>

                  {pkg.macroImage && (
                    <div className="absolute top-4 right-4 z-10 flex border border-[#22252C] bg-[#0B0C0E]/90 p-0.5 font-mono text-[9px] tracking-wider uppercase backdrop-blur-md">
                      <button
                        type="button"
                        onClick={() => toggleView(pkg.id, "full")}
                        className={`px-2.5 py-1 transition-colors ${
                          currentView === "full"
                            ? "bg-[#C5A880] text-[#0B0C0E] font-bold"
                            : "text-[#8C909A] hover:text-white"
                        }`}
                      >
                        Bodi Penuh
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleView(pkg.id, "macro")}
                        className={`px-2.5 py-1 transition-colors ${
                          currentView === "macro"
                            ? "bg-[#C5A880] text-[#0B0C0E] font-bold"
                            : "text-[#8C909A] hover:text-white"
                        }`}
                      >
                        Detail Makro
                      </button>
                    </div>
                  )}

                  {pkg.telemetry && (
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border border-[#22252C] bg-[#0B0C0E]/85 px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase backdrop-blur-md">
                      <span className="text-[#8C909A]">{pkg.telemetry.label}:</span>
                      <span className="text-[#C5A880] font-bold">
                        {pkg.telemetry.value} ({pkg.telemetry.unit})
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className={`flex flex-col justify-between lg:col-span-5 ${
                    index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#22252C] pb-4">
                      <span className="font-mono text-sm font-bold text-[#C5A880]">
                        SERIES 0{index + 1}
                      </span>
                      <span className="font-mono text-xs text-[#8C909A]">
                        {pkg.duration}
                      </span>
                    </div>

                    <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
                      {pkg.name}
                    </h3>

                    <p className="mt-4 text-xs leading-relaxed text-[#8C909A] sm:text-sm font-light">
                      {pkg.shortDesc}
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#22252C] pt-6 font-mono text-xs">
                      <div>
                        <span className="block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                          Garansi Resmi
                        </span>
                        <span className="mt-1 block font-semibold text-white">
                          {pkg.warranty}
                        </span>
                      </div>
                      {pkg.layerCount && (
                        <div>
                          <span className="block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                            Spesifikasi Lapisan
                          </span>
                          <span className="mt-1 block font-semibold text-white">
                            {pkg.layerCount}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 border-t border-[#22252C] pt-6">
                      <span className="block text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase">
                        Protokol Pengerjaan
                      </span>
                      <ul className="mt-3 space-y-2 text-xs text-[#8C909A]">
                        {pkg.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3">
                            <span className="text-[#C5A880] font-mono">&bull;</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-[#22252C] pt-6">
                    <div>
                      <span className="block text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase">
                        Estimasi Mulai
                      </span>
                      <span className="font-mono text-lg font-bold text-[#C5A880]">
                        {pkg.startingPrice}
                      </span>
                    </div>

                    <a
                      href="#booking"
                      className="inline-flex items-center gap-2 border border-[#C5A880] px-4 py-2 text-xs font-semibold tracking-[0.15em] text-[#C5A880] uppercase transition-all duration-300 hover:bg-[#C5A880] hover:text-[#0B0C0E]"
                    >
                      <span>Konfigurasi Paket</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
