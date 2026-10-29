"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { studioData } from "@/data/detailing";
import { ATELIER_EASE, atelierSpring } from "@/lib/motion";

const NAV_LINKS = [
  { id: "layanan", label: "Layanan", href: "#layanan" },
  { id: "paket", label: "Paket", href: "#paket" },
  { id: "kalkulator", label: "Kalkulator", href: "#kalkulator" },
  { id: "hasil", label: "Portofolio", href: "#hasil" },
  { id: "standar", label: "Standar", href: "#standar" },
  { id: "lokasi", label: "Lokasi", href: "#lokasi" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextScrolled = latest > 36;
    setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
  });

  useEffect(() => {
    const sectionIds = [...NAV_LINKS.map((item) => item.id), "booking"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.05, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        isScrolled
          ? "border-[#2E333C] bg-[#0B0C0E]/95 backdrop-blur-md"
          : "border-[#22252C] bg-[#0B0C0E]/88 backdrop-blur-md"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothProgress }}
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#9F835E] via-[#C5A880] to-[#DFCEB7]"
      />

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 transition-[height] duration-300 sm:px-6 lg:px-12 ${
          isScrolled ? "h-16 lg:h-[4.5rem]" : "h-20"
        }`}
      >
        <Link
          href="/"
          className="group inline-flex min-h-11 min-w-0 shrink items-center gap-2 transition-opacity hover:opacity-90"
        >
          <span className="h-2 w-2 shrink-0 border border-[#C5A880] bg-[#C5A880]/25 transition-colors duration-300 group-hover:bg-[#C5A880]" />
          <span className="font-[family-name:var(--font-display)] text-lg font-black tracking-[0.22em] text-white uppercase sm:text-2xl sm:tracking-[0.25em]">
            APEX
          </span>
        </Link>

        <nav aria-label="Navigasi Utama" className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex min-h-11 items-center text-xs font-medium tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-white" : "text-[#8C909A] hover:text-[#F4F4F5]"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    transition={atelierSpring}
                    className="absolute right-0 bottom-2 left-0 h-[1.5px] bg-[#C5A880]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={`tel:${studioData.contact.phone}`}
            className="hidden min-h-11 items-center text-xs font-mono tracking-wider text-[#8C909A] transition-colors hover:text-white xl:inline-flex"
          >
            {studioData.contact.formattedPhone}
          </a>
          <motion.a
            href="#booking"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            className={`atelier-sheen inline-flex h-11 items-center justify-center rounded-none border px-5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
              activeSection === "booking"
                ? "border-[#C5A880] bg-[#C5A880] text-[#0B0C0E]"
                : "border-[#C5A880]/60 text-[#C5A880] hover:border-[#DFCEB7] hover:bg-[#C5A880] hover:text-[#0B0C0E]"
            }`}
          >
            Reservasi Bay &rarr;
          </motion.a>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <a
            href="#booking"
            className="hidden h-11 items-center justify-center border border-[#C5A880]/60 px-3.5 text-[11px] font-semibold tracking-wider text-[#C5A880] uppercase transition-colors hover:bg-[#C5A880] hover:text-[#0B0C0E] active:bg-[#C5A880] active:text-[#0B0C0E] sm:inline-flex"
          >
            Reservasi
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-11 min-w-11 items-center justify-center gap-2 border border-[#22252C] px-3 text-[#F4F4F5] transition-colors hover:border-[#C5A880] hover:text-[#C5A880] active:border-[#C5A880]"
            aria-expanded={isOpen}
            aria-controls="mobile-atelier-nav"
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase">
              {isOpen ? "Tutup" : "Menu"}
            </span>
            {isOpen ? <X className="h-4 w-4 shrink-0" /> : <Menu className="h-4 w-4 shrink-0" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-atelier-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: ATELIER_EASE }}
            className="overflow-hidden border-t border-[#22252C] bg-[#0B0C0E] lg:hidden"
          >
            <div className="flex flex-col px-6 py-5">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.24,
                      delay: idx * 0.035,
                      ease: ATELIER_EASE,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex min-h-11 items-center justify-between border-b border-[#22252C]/60 text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${
                        isActive
                          ? "text-[#C5A880]"
                          : "text-[#8C909A] hover:text-[#F4F4F5] active:text-[#C5A880]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-[10px] text-[#7A7F8A]">
                        0{idx + 1}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-4 flex flex-col gap-3 pt-2">
                <a
                  href={`tel:${studioData.contact.phone}`}
                  className="inline-flex min-h-11 items-center text-xs font-mono text-[#8C909A] transition-colors hover:text-white"
                >
                  Telepon: {studioData.contact.formattedPhone}
                </a>
                <a
                  href="#booking"
                  onClick={() => setIsOpen(false)}
                  className="flex h-12 items-center justify-center border border-[#C5A880] bg-[#C5A880] text-xs font-bold tracking-[0.2em] text-[#0B0C0E] uppercase transition-colors hover:bg-transparent hover:text-[#C5A880]"
                >
                  Reservasi Bay &rarr;
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
