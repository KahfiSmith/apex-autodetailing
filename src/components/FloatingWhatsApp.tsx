import { MessageCircle } from "lucide-react";
import { studioData } from "@/data/detailing";

export default function FloatingWhatsApp() {
  const defaultMessage = encodeURIComponent(
    "Halo Apex, saya ingin berkonsultasi mengenai reservasi bay dan paket proteksi mobil."
  );

  return (
    <aside aria-label="Kontak Cepat WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${studioData.contact.whatsapp}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Apex melalui WhatsApp"
        className="group flex h-12 items-center gap-3 border border-[#C5A880]/60 bg-[#0B0C0E]/95 px-4 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#DFCEB7] hover:bg-[#C5A880] hover:text-[#0B0C0E]"
      >
        <MessageCircle className="h-4 w-4 text-[#C5A880] transition-colors group-hover:text-[#0B0C0E]" />
        <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          WhatsApp Atelier &rarr;
        </span>
      </a>
    </aside>
  );
}
