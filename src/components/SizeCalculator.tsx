"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { studioData } from "@/data/detailing";
import { VehicleSizeTier } from "@/types/detailing";

export default function SizeCalculator() {
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | "XL">("M");

  const currentTier: VehicleSizeTier =
    studioData.sizeTiers.find((tier) => tier.size === selectedSize) ||
    studioData.sizeTiers[1];

  return (
    <section id="kalkulator" className="scroll-mt-24 bg-[#0B0C0E] py-24 sm:py-32 border-b border-[#22252C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Matriks Dimensi & Tarif
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl uppercase">
              Klasifikasi Kendaraan
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#8C909A] font-light">
            Biaya dihitung secara objektif berdasarkan luas area permukaan pernis, kontur panel bodi, dan durasi curing film.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-b border-[#22252C] pb-8">
          {studioData.sizeTiers.map((tier) => {
            const isSelected = tier.size === selectedSize;
            return (
              <button
                key={tier.size}
                type="button"
                onClick={() => setSelectedSize(tier.size)}
                className={`flex h-12 items-center gap-3 border px-6 font-mono text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  isSelected
                    ? "border-[#C5A880] bg-[#C5A880] text-[#0B0C0E] font-bold"
                    : "border-[#22252C] bg-[#121316] text-[#8C909A] hover:border-[#8C909A] hover:text-white"
                }`}
              >
                <span>SIZE {tier.size}</span>
                <span className="hidden sm:inline text-[10px] opacity-80">
                  ({tier.name.split(" ")[0]})
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between border-b border-[#22252C] pb-8 lg:border-b-0 lg:border-r lg:border-[#22252C] lg:pr-12 lg:col-span-5">
            <div>
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
            </div>

            <div className="mt-10 pt-6">
              <a
                href="#booking"
                className="inline-flex h-12 w-full items-center justify-center border border-[#C5A880] px-6 text-xs font-bold tracking-[0.2em] text-[#C5A880] uppercase transition-all duration-300 hover:bg-[#C5A880] hover:text-[#0B0C0E]"
              >
                <span>Reservasi Bay Size {currentTier.size}</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center divide-y divide-[#22252C] lg:col-span-7">
            <div className="py-6">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase">
                    Tahap 01 &bull; Restorasi Optik
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-white uppercase">
                    Multi-Stage Paint Correction
                  </h4>
                  <p className="text-xs text-[#8C909A] font-light mt-1">
                    Compound, polish, dan finishing ultra-fine untuk menghilangkan hingga 95% swirl mark.
                  </p>
                </div>
                <div className="text-left sm:text-right mt-2 sm:mt-0 font-mono">
                  <span className="block text-xl font-bold text-white">
                    {currentTier.correctionPrice}
                  </span>
                  <span className="text-[10px] tracking-wider text-[#8C909A]">
                    Bebas Swirl Garansi
                  </span>
                </div>
              </div>
            </div>

            <div className="py-8 bg-[#121316]/50 px-4 -mx-4 sm:px-6 sm:-mx-6 border-l-2 border-[#C5A880]">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#C5A880] uppercase font-bold">
                      Tahap 02 &bull; Proteksi Permanen
                    </span>
                    <span className="border border-[#C5A880]/40 px-2 py-0.5 text-[9px] font-mono uppercase text-[#C5A880]">
                      Rekomendasi Utama
                    </span>
                  </div>
                  <h4 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-white uppercase">
                    Titanium Nano Ceramic 9H
                  </h4>
                  <p className="text-xs text-[#F4F4F5] font-light mt-1 max-w-md">
                    Wet-look gloss abadi dengan 3 lapisan pelindung ceramic tahan cuaca tropis ekstrem dan hydrophobic daun talas.
                  </p>
                </div>
                <div className="text-left sm:text-right mt-3 sm:mt-0 font-mono">
                  <span className="block text-2xl font-bold text-[#C5A880]">
                    {currentTier.ceramicPrice}
                  </span>
                  <span className="text-[10px] tracking-wider text-[#8C909A]">
                    Garansi Resmi 3 Tahun
                  </span>
                </div>
              </div>
            </div>

            <div className="py-6">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase">
                    Tahap 03 &bull; Proteksi Fisik Tertinggi
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-white uppercase">
                    Full Body PPF Self-Healing TPU
                  </h4>
                  <p className="text-xs text-[#8C909A] font-light mt-1">
                    Film optical clear 8.5 mil anti-stone chip dengan kemampuan perbaikan baret mandiri saat terkena panas matahari.
                  </p>
                </div>
                <div className="text-left sm:text-right mt-2 sm:mt-0 font-mono">
                  <span className="block text-xl font-bold text-white">
                    {currentTier.ppfPrice}
                  </span>
                  <span className="text-[10px] tracking-wider text-[#8C909A]">
                    Garansi Resmi 5 Tahun
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
