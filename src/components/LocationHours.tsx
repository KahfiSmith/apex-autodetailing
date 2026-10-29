"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { studioData } from "@/data/detailing";
import { ATELIER_EASE } from "@/lib/motion";

export default function LocationHours() {
  const [mapInteractive, setMapInteractive] = useState(false);

  return (
    <section
      id="lokasi"
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
              Atelier &amp; Koordinat
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
              Lokasi &amp; Kunjungan
            </h2>
          </div>
          <p className="max-w-md text-xs font-light leading-relaxed text-[#8C909A]">
            Akses langsung jalan protokol Mayjen HR. Muhammad dengan area parkir tertutup berpengawas 24 jam.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: ATELIER_EASE }}
            className="flex flex-col justify-between border-b border-[#22252C] pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:border-[#22252C] lg:pr-12"
          >
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
                <div className="mt-3 space-y-2.5">
                  {studioData.operatingHours.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center"
                    >
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
                <div className="mt-2 flex flex-col gap-1">
                  <a
                    href={`tel:${studioData.contact.phone}`}
                    className="inline-flex min-h-11 items-center text-[#F4F4F5] transition-colors hover:text-[#C5A880]"
                  >
                    Telepon: {studioData.contact.formattedPhone}
                  </a>
                  <a
                    href={`https://wa.me/${studioData.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-[#F4F4F5] transition-colors hover:text-[#C5A880]"
                  >
                    WhatsApp: {studioData.contact.whatsappFormatted}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-4">
              <motion.a
                href={studioData.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                className="group inline-flex h-12 w-full items-center justify-center border border-[#22252C] bg-[#121316] px-4 text-xs font-bold tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:border-[#C5A880] hover:text-[#C5A880]"
              >
                <span>Buka Petunjuk Arah Google Maps</span>
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: ATELIER_EASE }}
            className="relative h-[400px] min-h-[400px] overflow-hidden border border-[#22252C] bg-[#121316] sm:h-[440px] lg:col-span-7 lg:h-full"
          >
            <div className="pointer-events-none absolute top-3 left-3 z-20 border border-[#22252C] bg-[#0B0C0E]/95 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#C5A880] uppercase sm:top-4 sm:left-4">
              HR. Muhammad 108 &bull; Surabaya Barat
            </div>

            <button
              type="button"
              aria-pressed={mapInteractive}
              onClick={() => setMapInteractive((prev) => !prev)}
              className="absolute right-3 bottom-3 z-20 inline-flex min-h-11 items-center border border-[#C5A880]/70 bg-[#0B0C0E]/95 px-3.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#C5A880] uppercase transition-colors hover:bg-[#C5A880] hover:text-[#0B0C0E] sm:right-4 sm:bottom-4"
            >
              {mapInteractive ? "Kunci Scroll Peta" : "Interaksi Peta"}
            </button>

            <iframe
              src={studioData.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Apex Surabaya"
              className={`h-full w-full contrast-115 transition-all duration-500 ${
                mapInteractive
                  ? "pointer-events-auto grayscale-0"
                  : "pointer-events-none grayscale"
              }`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
