import Image from "next/image";
import { studioData } from "@/data/detailing";

export default function TransformationShowcase() {
  const [case1, case2, case3, case4] = studioData.cases;

  return (
    <section id="hasil" className="scroll-mt-24 bg-[#0B0C0E] py-24 sm:py-32 border-b border-[#22252C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Arsip Dokumentasi Pengerjaan
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl uppercase">
              Refleksi &amp; Preservasi
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#8C909A] font-light">
            Eksplorasi kurasi fotografi pengerjaan nyata unit performa tinggi di dalam ruang bay steril Apex.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {case1 && (
            <div className="group relative overflow-hidden border border-[#22252C] bg-[#121316]">
              <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden">
                <Image
                  src={case1.image}
                  alt={case1.vehicleName}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-[#0B0C0E]/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
                  <span className="border border-[#22252C] bg-[#0B0C0E]/90 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase backdrop-blur-md">
                    Plate 01 &bull; 98.4 GU High Specular
                  </span>
                  <span className="hidden sm:inline-block border border-[#22252C] bg-[#0B0C0E]/90 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur-md">
                    Bay 01 Cured
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-10 border-t border-[#22252C] bg-[#0B0C0E]/95">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                  <div>
                    <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                      <span>Feature 01 &bull; {case1.duration}</span>
                      <span>Refleksi 98 GU</span>
                    </div>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white uppercase">
                      {case1.vehicleName}
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs sm:text-sm text-[#8C909A] font-light">
                      {case1.treatmentSummary}
                    </p>
                  </div>

                  <div className="border border-[#C5A880]/50 bg-[#121316] px-5 py-3 font-mono text-xs text-[#C5A880] shrink-0">
                    {case1.packageType}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-12">
            {case2 && (
              <div className="group flex flex-col justify-between border border-[#22252C] bg-[#121316] lg:col-span-7">
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={case2.image}
                    alt={case2.vehicleName}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 border border-[#22252C] bg-[#0B0C0E]/90 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase backdrop-blur-md">
                    PPF TPU 8.5 Mil &bull; Self-Healing
                  </div>
                </div>

                <div className="p-6 sm:p-8 border-t border-[#22252C]">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                    <span>Feature 02</span>
                    <span>{case2.duration}</span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white uppercase">
                    {case2.vehicleName}
                  </h3>
                  <p className="mt-2 text-xs text-[#8C909A] font-light leading-relaxed">
                    {case2.treatmentSummary}
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-[#C5A880]">
                    &bull; {case2.highlight}
                  </p>
                </div>
              </div>
            )}

            {case3 && (
              <div className="group flex flex-col justify-between border border-[#22252C] bg-[#121316] lg:col-span-5">
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={case3.image}
                    alt={case3.vehicleName}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 border border-[#22252C] bg-[#0B0C0E]/90 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase backdrop-blur-md">
                    &theta; = 115&deg; Hydrophobic
                  </div>
                </div>

                <div className="p-6 sm:p-8 border-t border-[#22252C]">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                    <span>Feature 03</span>
                    <span>{case3.duration}</span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white uppercase">
                    {case3.vehicleName}
                  </h3>
                  <p className="mt-2 text-xs text-[#8C909A] font-light leading-relaxed">
                    {case3.treatmentSummary}
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-[#C5A880]">
                    &bull; {case3.highlight}
                  </p>
                </div>
              </div>
            )}
          </div>

          {case4 && (
            <div className="group relative overflow-hidden border border-[#22252C] bg-[#121316]">
              <div className="grid items-center lg:grid-cols-12">
                <div className="relative aspect-16/9 sm:aspect-16/10 lg:aspect-auto lg:h-full w-full overflow-hidden lg:col-span-6">
                  <Image
                    src={case4.image}
                    alt={case4.vehicleName}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 border border-[#22252C] bg-[#0B0C0E]/90 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase backdrop-blur-md">
                    pH Netral &bull; Ozonated 99.9%
                  </div>
                </div>

                <div className="p-6 sm:p-10 lg:col-span-6">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
                    Feature 04 &bull; Kabin &amp; Nappa Leather
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white uppercase sm:text-3xl">
                    {case4.vehicleName}
                  </h3>
                  <p className="mt-4 text-xs sm:text-sm text-[#8C909A] font-light leading-relaxed">
                    {case4.treatmentSummary}
                  </p>
                  <div className="mt-6 border-t border-[#22252C] pt-4 font-mono text-xs text-[#C5A880]">
                    {case4.highlight}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
