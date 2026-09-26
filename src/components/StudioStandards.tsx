import { studioData } from "@/data/detailing";

export default function StudioStandards() {
  return (
    <section id="standar" className="scroll-mt-24 bg-[#0B0C0E] py-24 sm:py-32 border-b border-[#22252C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Standar Operasional
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl uppercase">
              Protokol Atelier & Presisi
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#8C909A] font-light">
            Komitmen tanpa kompromi pada kebersihan lingkungan kerja, instrumen inspeksi optik, dan keaslian material berstandar internasional.
          </p>
        </div>

        <div className="mt-16 divide-y divide-[#22252C] border-y border-[#22252C]">
          {studioData.standards.map((item) => (
            <div
              key={item.number}
              className="grid items-baseline gap-6 py-12 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-2">
                <span className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-[#2E333C]">
                  {item.number}
                </span>
                <span className="mt-2 block font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase">
                  {item.badge}
                </span>
              </div>

              <div className="lg:col-span-4">
                <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>

              <div className="lg:col-span-6">
                <p className="text-xs sm:text-sm text-[#8C909A] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
