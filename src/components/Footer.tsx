import Link from "next/link";
import { studioData } from "@/data/detailing";

export default function Footer() {
  return (
    <footer className="bg-[#0B0C0E] text-[#8C909A]">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-28 sm:px-6 sm:pb-20 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-4 lg:col-span-5">
            <span className="font-[family-name:var(--font-display)] text-2xl font-black tracking-[0.25em] text-white uppercase">
              APEX
            </span>
            <p className="max-w-sm text-xs font-light leading-relaxed text-[#8C909A]">
              Atelier spesialis preservasi cat kendaraan eksklusif di Surabaya Barat.
              Standar pengerjaan optik presisi, formula bersertifikat resmi, dan garansi digital.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-white uppercase">
              Program Preservasi
            </h3>
            <ul className="mt-4 space-y-1 font-mono text-xs">
              <li>
                <Link
                  href="#paket"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Nano Ceramic 9H
                </Link>
              </li>
              <li>
                <Link
                  href="#paket"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Self-Healing PPF
                </Link>
              </li>
              <li>
                <Link
                  href="#paket"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Paint Correction
                </Link>
              </li>
              <li>
                <Link
                  href="#paket"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Interior Atelier
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-white uppercase">
              Index Atelier
            </h3>
            <ul className="mt-4 space-y-1 font-mono text-xs">
              <li>
                <Link
                  href="#layanan"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Layanan Utama
                </Link>
              </li>
              <li>
                <Link
                  href="#kalkulator"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Kalkulator Dimensi
                </Link>
              </li>
              <li>
                <Link
                  href="#hasil"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Dokumentasi Hasil
                </Link>
              </li>
              <li>
                <Link
                  href="#standar"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Protokol Mutu
                </Link>
              </li>
              <li>
                <Link
                  href="#booking"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Reservasi Bay
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[10px] tracking-[0.25em] text-white uppercase">
              Koordinat &amp; Kontak
            </h3>
            <div className="mt-4 space-y-1 font-mono text-xs">
              <p className="py-1.5 text-[#8C909A]">
                {studioData.contact.address}, {studioData.contact.city}
              </p>
              <p>
                <a
                  href={`tel:${studioData.contact.phone}`}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  {studioData.contact.formattedPhone}
                </a>
              </p>
              <p>
                <a
                  href={`https://wa.me/${studioData.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-[#C5A880]"
                >
                  {studioData.contact.whatsappFormatted}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#22252C] pt-8 text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {studioData.name}. Hak Cipta Dilindungi.
          </p>
          <div className="flex flex-wrap gap-6">
            <span>07&deg;16&apos;48&quot;S 112&deg;41&apos;36&quot;E</span>
            <span>Surabaya Barat &bull; ID</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
