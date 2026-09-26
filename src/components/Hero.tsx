import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { studioData } from "@/data/detailing";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0C0E] pt-12 pb-24 lg:pt-16 lg:pb-32 border-b border-[#22252C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#22252C] pb-6 text-[11px] font-mono tracking-[0.25em] text-[#8C909A] uppercase">
          <span>Surabaya Barat &bull; Jawa Timur</span>
          <span className="hidden sm:inline">07&deg;16&apos;48&quot;S 112&deg;41&apos;36&quot;E</span>
          <span>Atelier Preservasi Eksterior</span>
        </div>

        <div className="mt-12 lg:mt-16">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
            The Standard of Perfection
          </span>

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">
            DETAILING, <br />
            <span className="text-[#C5A880]">REFINED.</span>
          </h1>
        </div>

        <div className="mt-12 lg:mt-16 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-sm leading-relaxed text-[#8C909A] sm:text-base font-light">
                Preservasi cat eksklusif untuk kendaraan performa dan koleksi.
                Menggabungkan teknologi Nano Ceramic 9H, Self-Healing TPU Film,
                dan koreksi cat optik di dalam ruang steril berpendingin 22&deg;C.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="#kalkulator"
                  className="inline-flex h-12 items-center justify-center border border-[#C5A880] bg-[#C5A880] px-7 text-xs font-bold tracking-[0.2em] text-[#0B0C0E] uppercase transition-all duration-300 hover:bg-transparent hover:text-[#C5A880]"
                >
                  Cek Biaya Mobil &rarr;
                </a>

                <a
                  href={`https://wa.me/${studioData.contact.whatsapp}?text=Halo%20Apex,%20saya%20ingin%20konsultasi%20proteksi%20cat%20mobil%20saya.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#F4F4F5] uppercase transition-colors hover:text-[#C5A880]"
                >
                  <span>Konsultasi WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-[#22252C] pt-8 font-mono">
              <div>
                <span className="block font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                  5 THN
                </span>
                <span className="mt-1 block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Garansi PPF
                </span>
              </div>
              <div>
                <span className="block font-[family-name:var(--font-display)] text-2xl font-bold text-[#C5A880] sm:text-3xl">
                  9H+
                </span>
                <span className="mt-1 block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Kekerasan
                </span>
              </div>
              <div>
                <span className="block font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                  98 GU
                </span>
                <span className="mt-1 block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Wet Gloss
                </span>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative aspect-16/10 w-full overflow-hidden border border-[#22252C] bg-[#121316]">
              <Image
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1400&auto=format&fit=crop"
                alt="Supercar detailing finish at Apex"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 border border-[#22252C] bg-[#0B0C0E]/85 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase">
                  <span>Atelier Bay 01</span>
                  <span className="text-[#C5A880]">22&deg;C Steril</span>
                </div>
                <p className="mt-2 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wider text-white uppercase">
                  Pencahayaan Spektrum 5000K Daylight
                </p>
                <p className="mt-1 text-xs text-[#8C909A]">
                  Ruang isolasi partikel debu untuk aplikasi coating dan film optik presisi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="layanan" className="mt-28 scroll-mt-24 border-t border-[#22252C] pt-16">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
                Portofolio Layanan
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
                SPESIALISASI ATELIER
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-[#8C909A]">
              Setiap prosedur dirancang dengan toleransi mikron untuk mengembalikan dan mengunci kilau orisinal cat kendaraan Anda.
            </p>
          </div>

          <div className="mt-12 grid divide-y divide-[#22252C] border-y border-[#22252C]">
            {studioData.quickServices.map((qs, idx) => (
              <a
                key={qs.id}
                href="#paket"
                className="group grid items-center gap-6 py-8 transition-colors duration-300 hover:bg-[#121316] lg:grid-cols-12 lg:gap-8 px-4 sm:px-6"
              >
                <div className="flex items-center gap-4 lg:col-span-3">
                  <span className="font-mono text-sm font-bold text-[#8C909A] group-hover:text-[#C5A880] transition-colors">
                    0{idx + 1}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-wide text-white uppercase group-hover:text-[#C5A880] transition-colors">
                    {qs.title}
                  </h3>
                </div>

                <p className="text-xs leading-relaxed text-[#8C909A] lg:col-span-5 font-light">
                  {qs.desc}
                </p>

                <div className="flex items-center justify-between gap-4 lg:col-span-4 lg:justify-end">
                  <div className="text-right">
                    <span className="block text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase">
                      {qs.badge}
                    </span>
                    <span className="font-mono text-xs font-semibold text-white">
                      {qs.startingPrice}
                    </span>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center border border-[#22252C] text-[#8C909A] transition-all duration-300 group-hover:border-[#C5A880] group-hover:text-[#C5A880] group-hover:translate-x-1">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
