"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { studioData } from "@/data/detailing";
import { ATELIER_EASE } from "@/lib/motion";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldShow = latest > 260;
    setVisible((prev) => (prev === shouldShow ? prev : shouldShow));
  });

  const defaultMessage = encodeURIComponent(
    "Halo Apex, saya ingin berkonsultasi mengenai reservasi bay dan paket proteksi mobil."
  );

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
    >
      <AnimatePresence initial={false}>
        {visible && (
          <motion.a
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: ATELIER_EASE }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/${studioData.contact.whatsapp}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi Apex melalui WhatsApp"
            className="atelier-sheen group flex h-11 items-center gap-2.5 border border-[#C5A880]/75 bg-[#0B0C0E]/95 px-3.5 text-white shadow-2xl transition-colors duration-300 hover:border-[#DFCEB7] hover:bg-[#C5A880] hover:text-[#0B0C0E]"
          >
            <MessageCircle className="h-4 w-4 text-[#C5A880] transition-colors group-hover:text-[#0B0C0E]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase">
              WhatsApp Atelier &rarr;
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </aside>
  );
}
