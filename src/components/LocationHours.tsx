import { ArrowUpRight } from "lucide-react";
import { studioData } from "@/data/detailing";

export default function LocationHours() {
  return (
    <section id="lokasi" className="scroll-mt-24 bg-[#0B0C0E] py-24 sm:py-32 border-b border-[#22252C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Atelier & Koordinat
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl uppercase">
              Lokasi & Kunjungan
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#8C909A] font-light">
            Akses langsung jalan protokol Mayjen HR. Muhammad dengan area parkir tertutup berpengawas 24 jam.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between border-b border-[#22252C] pb-8 lg:border-b-0 lg:border-r lg:border-[#22252C] lg:pr-12 lg:col-span-5">
            <div className="space-y-8 font-mono text-xs">
              <div>
                <span className="block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Alamat Workshop
                </span>
                <p className="mt-2 font-[family-name:var(--font-display)] text-base font-bold text-white uppercase">
                  {studioData.name}
                </p>
                <p className="mt-1 leading-relaxed text-[#8C909A]">
                  {studioData.contact.fullAddress}
                </p>
              </div>

              <div className="border-t border-[#22252C] pt-6">
                <span className="block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Jadwal Operasional
                </span>
                <div className="mt-3 space-y-2">
                  {studioData.operatingHours.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-[#8C909A]">{item.days}</span>
                      <span className="font-semibold text-white">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#22252C] pt-6">
                <span className="block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Saluran Komunikasi
                </span>
                <div className="mt-3 space-y-2">
                  <a
                    href={`tel:${studioData.contact.phone}`}
                    className="block text-[#F4F4F5] hover:text-[#C5A880] transition-colors"
                  >
                    Telepon: {studioData.contact.formattedPhone}
                  </a>
                  <a
                    href={`https://wa.me/${studioData.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#F4F4F5] hover:text-[#C5A880] transition-colors"
                  >
                    WhatsApp: {studioData.contact.whatsappFormatted}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6">
              <a
                href={studioData.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center border border-[#22252C] bg-[#121316] text-xs font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-[#C5A880] hover:text-[#C5A880]"
              >
                <span>Buka Petunjuk Arah Google Maps</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden border border-[#22252C] bg-[#121316] lg:col-span-7 h-[420px] lg:h-full min-h-[420px]">
            <div className="absolute top-4 left-4 z-10 border border-[#22252C] bg-[#0B0C0E]/95 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase backdrop-blur-md shadow-lg pointer-events-none">
              HR. Muhammad 108 &bull; Surabaya Barat
            </div>

            <iframe
              src={studioData.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Apex Surabaya"
              className="h-full w-full grayscale contrast-115 hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
