"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { studioData } from "@/data/detailing";
import { DetailingPackage } from "@/types/detailing";
import AnimatedPrice from "@/components/AnimatedPrice";
import { ATELIER_EASE, atelierSpring } from "@/lib/motion";

const CATEGORIES = [
  { id: "all", label: "Semua Paket" },
  { id: "coating", label: "Ceramic Coating" },
  { id: "ppf", label: "PPF Self-Healing" },
  { id: "correction", label: "Paint Correction" },
  { id: "interior", label: "Interior Atelier" },
];

export default function PackagesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeViews, setActiveViews] = useState<{
    [pkgId: string]: "full" | "macro";
  }>({});

  const filteredPackages =
    activeCategory === "all"
      ? studioData.packages
      : studioData.packages.filter((pkg) => pkg.category === activeCategory);

  const toggleView = (pkgId: string, view: "full" | "macro") => {
    setActiveViews((prev) => ({ ...prev, [pkgId]: view }));
  };

  return (
    <section
      id="paket"
      className="scroll-mt-24 border-b border-[#22252C] bg-[#0B0C0E] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: ATELIER_EASE }}
          className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 lg:flex-row lg:items-end"
        >
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Katalog Preservasi
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
              Paket &amp; Spesifikasi Atelier
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter kategori paket preservasi"
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono tracking-[0.14em] uppercase"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative inline-flex min-h-11 items-center px-1 transition-colors duration-200 ${
                    isSelected ? "text-white" : "text-[#8C909A] hover:text-white"
                  }`}
                >
                  <span>{cat.label}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="package-category-underline"
                      transition={atelierSpring}
                      className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#C5A880]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div layout className="mt-14 space-y-20 sm:mt-16 sm:space-y-24">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredPackages.map((pkg: DetailingPackage, index: number) => {
              const currentView = activeViews[pkg.id] || "full";
              const displayImage =
                currentView === "macro" && pkg.macroImage
                  ? pkg.macroImage
                  : pkg.image;

              return (
                <motion.article
                  layout="position"
                  key={pkg.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.48, ease: ATELIER_EASE }}
                  className="grid items-center gap-10 border-b border-[#22252C] pb-16 last:border-b-0 sm:pb-20 lg:grid-cols-12 lg:gap-16"
                >
                  <div
                    className={`group relative aspect-16/10 w-full overflow-hidden border border-[#22252C] bg-[#121316] lg:col-span-7 ${
                      index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={currentView}
                        initial={{ opacity: 0, scale: 1.035 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.42, ease: ATELIER_EASE }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={displayImage}
                          alt={`${pkg.name} (${
                            currentView === "macro" ? "Detail Makro" : "Bodi Penuh"
                          })`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 55vw"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/92 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 z-10 border border-[#22252C] bg-[#0B0C0E]/95 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase sm:top-4 sm:left-4">
                      {pkg.badge}
                    </div>

                    {pkg.macroImage && (
                      <div
                        role="group"
                        aria-label={`Mode tampilan foto ${pkg.name}`}
                        className="absolute top-3 right-3 z-10 flex border border-[#22252C] bg-[#0B0C0E]/95 p-1 font-mono text-[10px] tracking-wider uppercase sm:top-4 sm:right-4"
                      >
                        {(["full", "macro"] as const).map((viewMode) => {
                          const isActiveView = currentView === viewMode;
                          return (
                            <button
                              key={viewMode}
                              type="button"
                              aria-pressed={isActiveView}
                              onClick={() => toggleView(pkg.id, viewMode)}
                              className={`relative inline-flex min-h-9 items-center px-3 py-1.5 transition-colors sm:min-h-10 ${
                                isActiveView
                                  ? "font-bold text-[#0B0C0E]"
                                  : "text-[#8C909A] hover:text-white"
                              }`}
                            >
                              {isActiveView && (
                                <motion.span
                                  layoutId={`pkg-lens-${pkg.id}`}
                                  transition={atelierSpring}
                                  className="absolute inset-0 bg-[#C5A880]"
                                />
                              )}
                              <span className="relative z-10">
                                {viewMode === "full" ? "Bodi Penuh" : "Detail Makro"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {pkg.telemetry && (
                      <div className="absolute right-3 bottom-3 left-3 z-10 flex items-center justify-between border border-[#22252C] bg-[#0B0C0E]/92 px-3.5 py-2 font-mono text-[10px] tracking-[0.18em] uppercase sm:right-4 sm:bottom-4 sm:left-4 sm:px-4">
                        <span className="text-[#8C909A]">{pkg.telemetry.label}:</span>
                        <span className="font-bold text-[#C5A880]">
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

                      <p className="mt-4 text-xs font-light leading-relaxed text-[#8C909A] sm:text-sm">
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
                        <ul className="mt-3 space-y-2.5 text-xs text-[#8C909A]">
                          {pkg.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3">
                              <span className="font-mono text-[#C5A880]">&bull;</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#22252C] pt-6">
                      <div>
                        <span className="block text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase">
                          Estimasi Mulai
                        </span>
                        <AnimatedPrice
                          value={pkg.startingPrice}
                          className="font-mono text-lg font-bold text-[#C5A880]"
                        />
                      </div>

                      <motion.a
                        href="#booking"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.985 }}
                        className="atelier-sheen group inline-flex min-h-11 items-center gap-2 border border-[#C5A880] px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-[#C5A880] uppercase transition-colors duration-300 hover:bg-[#C5A880] hover:text-[#0B0C0E]"
                      >
                        <span>Konfigurasi Paket</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
