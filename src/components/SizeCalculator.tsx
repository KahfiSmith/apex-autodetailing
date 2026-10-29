"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { studioData } from "@/data/detailing";
import { VehicleSizeTier } from "@/types/detailing";
import AnimatedPrice from "@/components/AnimatedPrice";
import { ATELIER_EASE, atelierSpring, panelCrossfade } from "@/lib/motion";

const SURFACE_INDEX_MAP: Record<VehicleSizeTier["size"], number> = {
  S: 0.56,
  M: 0.72,
  L: 0.86,
  XL: 1,
};

export default function SizeCalculator() {
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | "XL">("M");
  const [selectedStage, setSelectedStage] = useState<"correction" | "ceramic" | "ppf">(
    "ceramic"
  );

  const currentTier: VehicleSizeTier =
    studioData.sizeTiers.find((tier) => tier.size === selectedSize) ||
    studioData.sizeTiers[1];

  const stages = [
    {
      id: "correction" as const,
      step: "Tahap 01",
      tag: "Restorasi Optik",
      recommended: false,
      title: "Multi-Stage Paint Correction",
      desc: "Compound, polish, dan finishing ultra-fine untuk menghilangkan hingga 95% swirl mark.",
      price: currentTier.correctionPrice,
      warranty: "Bebas Swirl Garansi",
    },
    {
      id: "ceramic" as const,
      step: "Tahap 02",
      tag: "Proteksi Permanen",
      recommended: true,
      title: "Titanium Nano Ceramic 9H",
      desc: "Wet-look gloss abadi dengan 3 lapisan pelindung ceramic tahan cuaca tropis ekstrem dan hydrophobic daun talas.",
      price: currentTier.ceramicPrice,
      warranty: "Garansi Resmi 3 Tahun",
    },
    {
      id: "ppf" as const,
      step: "Tahap 03",
      tag: "Proteksi Fisik Tertinggi",
      recommended: false,
      title: "Full Body PPF Self-Healing TPU",
      desc: "Film optical clear 8.5 mil anti-stone chip dengan kemampuan perbaikan baret mandiri saat terkena panas matahari.",
      price: currentTier.ppfPrice,
      warranty: "Garansi Resmi 5 Tahun",
    },
  ];

  const activeStageMeta = stages.find((s) => s.id === selectedStage) || stages[1];

  return (
    <section
      id="kalkulator"
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
              Matriks Dimensi &amp; Tarif
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
              Klasifikasi Kendaraan
            </h2>
          </div>
          <p className="max-w-md text-xs font-light leading-relaxed text-[#8C909A]">
            Biaya dihitung secara objektif berdasarkan luas area permukaan pernis, kontur panel bodi, dan durasi curing film.
          </p>
        </motion.div>

        <div
          role="radiogroup"
          aria-label="Pilih ukuran dimensi kendaraan"
          className="mt-10 grid grid-cols-2 gap-3 border-b border-[#22252C] pb-8 sm:mt-12 sm:flex sm:flex-wrap"
        >
          {studioData.sizeTiers.map((tier) => {
            const isSelected = tier.size === selectedSize;
            return (
              <button
                key={tier.size}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedSize(tier.size)}
                className={`relative flex h-12 items-center justify-center gap-3 border px-5 font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-200 sm:px-6 ${
                  isSelected
                    ? "border-[#C5A880] font-bold text-[#0B0C0E]"
                    : "border-[#22252C] bg-[#121316] text-[#8C909A] hover:border-[#8C909A] hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="vehicle-size-pill"
                    transition={atelierSpring}
                    className="absolute inset-0 bg-[#C5A880]"
                  />
                )}
                <span className="relative z-10">SIZE {tier.size}</span>
                <span className="relative z-10 hidden text-[10px] opacity-80 sm:inline">
                  ({tier.name.split(" ")[0]})
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between border-b border-[#22252C] pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:border-[#22252C] lg:pr-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentTier.size}
                variants={panelCrossfade}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#C5A880] uppercase">
                  Kelas Terpilih &bull; Size {currentTier.size}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-white uppercase sm:text-3xl">
                  {currentTier.name}
                </h3>

                <div className="mt-6 space-y-4 font-mono text-xs">
                  <div>
                    <span className="block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                      Model Referensi
                    </span>
                    <p className="mt-1 leading-relaxed text-[#F4F4F5]">
                      {currentTier.examples}
                    </p>
                  </div>

                  <div className="border-t border-[#22252C] pt-4">
                    <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                      <span>Indeks Permukaan Panel</span>
                      <span className="text-[#C5A880]">
                        {Math.round(SURFACE_INDEX_MAP[currentTier.size] * 100)}% Skala Maks
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden bg-[#22252C]">
                      <motion.div
                        initial={false}
                        animate={{ scaleX: SURFACE_INDEX_MAP[currentTier.size] }}
                        transition={{ duration: 0.45, ease: ATELIER_EASE }}
                        className="h-full origin-left bg-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#22252C] pt-4">
                    <span className="block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                      Alokasi Waktu Pengerjaan
                    </span>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {currentTier.durationDays} di Ruang Steril
                    </p>
                  </div>

                  <div className="border-t border-[#22252C] pt-4 text-[#8C909A]">
                    <p className="text-xs font-light leading-relaxed">
                      Termasuk inspeksi digital ketebalan pernis (paint depth gauge) sebelum pengerjaan dan first maintenance wash pasca-curing.
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 pt-6">
              <motion.a
                href="#booking"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                className="atelier-sheen group inline-flex h-12 w-full items-center justify-center border border-[#C5A880] px-6 text-xs font-bold tracking-[0.2em] text-[#C5A880] uppercase transition-colors duration-300 hover:bg-[#C5A880] hover:text-[#0B0C0E]"
              >
                <span>
                  Reservasi Size {currentTier.size} ({activeStageMeta.step})
                </span>
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Pilih tahap proteksi untuk kalkulasi"
            className="flex flex-col justify-center divide-y divide-[#22252C] lg:col-span-7"
          >
            {stages.map((stage) => {
              const isStageActive = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="radio"
                  aria-checked={isStageActive}
                  onClick={() => setSelectedStage(stage.id)}
                  className="group relative w-full px-4 py-7 text-left transition-colors duration-200 hover:bg-[#121316]/60 sm:px-6"
                >
                  {isStageActive && (
                    <motion.span
                      layoutId="calculator-stage-highlight"
                      transition={atelierSpring}
                      className="pointer-events-none absolute inset-0 border-l-2 border-[#C5A880] bg-[#121316]/85"
                    />
                  )}

                  <div className="relative z-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
                            isStageActive
                              ? "font-bold text-[#C5A880]"
                              : "text-[#8C909A]"
                          }`}
                        >
                          {stage.step} &bull; {stage.tag}
                        </span>
                        {stage.recommended && (
                          <span className="border border-[#C5A880]/40 px-2 py-0.5 font-mono text-[9px] text-[#C5A880] uppercase">
                            Rekomendasi Utama
                          </span>
                        )}
                      </div>
                      <h4 className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold text-white uppercase sm:text-xl">
                        {stage.title}
                      </h4>
                      <p
                        className={`mt-1 max-w-md text-xs font-light leading-relaxed ${
                          isStageActive ? "text-[#F4F4F5]" : "text-[#8C909A]"
                        }`}
                      >
                        {stage.desc}
                      </p>
                    </div>

                    <div className="mt-2 shrink-0 text-left font-mono sm:mt-0 sm:text-right">
                      <AnimatedPrice
                        value={stage.price}
                        className={`block font-bold ${
                          isStageActive
                            ? "text-2xl text-[#C5A880]"
                            : "text-xl text-white"
                        }`}
                      />
                      <span className="text-[10px] tracking-wider text-[#8C909A]">
                        {stage.warranty}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
