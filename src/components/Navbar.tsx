"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { studioData } from "@/data/detailing";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Layanan", href: "#layanan" },
    { label: "Paket", href: "#paket" },
    { label: "Kalkulator", href: "#kalkulator" },
    { label: "Portofolio", href: "#hasil" },
    { label: "Standar", href: "#standar" },
    { label: "Lokasi", href: "#lokasi" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#22252C] bg-[#0B0C0E]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          className="group flex items-center transition-opacity hover:opacity-80"
        >
          <span className="font-[family-name:var(--font-display)] text-2xl font-black tracking-[0.25em] text-white uppercase">
            APEX
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-[0.12em] text-[#8C909A] uppercase whitespace-nowrap transition-colors hover:text-[#F4F4F5]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={`tel:${studioData.contact.phone}`}
            className="hidden text-xs font-mono tracking-wider text-[#8C909A] transition-colors hover:text-white xl:inline-block"
          >
            {studioData.contact.formattedPhone}
          </a>
          <a
            href="#booking"
            className="inline-flex h-10 items-center justify-center rounded-none border border-[#C5A880]/60 px-5 text-xs font-semibold tracking-[0.2em] text-[#C5A880] uppercase transition-all duration-300 hover:border-[#DFCEB7] hover:bg-[#C5A880] hover:text-[#0B0C0E]"
          >
            Reservasi Bay &rarr;
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#booking"
            className="inline-flex h-9 items-center justify-center border border-[#C5A880]/60 px-3 text-[11px] font-semibold tracking-wider text-[#C5A880] uppercase hover:bg-[#C5A880] hover:text-[#0B0C0E]"
          >
            Reservasi
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center border border-[#22252C] text-[#8C909A] transition-colors hover:border-[#C5A880] hover:text-white"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-b border-[#22252C] bg-[#0B0C0E] px-6 py-6 lg:hidden animate-in fade-in duration-150">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold tracking-[0.15em] text-[#8C909A] uppercase hover:text-[#C5A880] py-2 border-b border-[#22252C]/50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 pt-3">
              <a
                href={`tel:${studioData.contact.phone}`}
                className="text-xs font-mono text-[#8C909A] hover:text-white"
              >
                Telepon: {studioData.contact.formattedPhone}
              </a>
              <a
                href="#booking"
                onClick={() => setIsOpen(false)}
                className="flex h-11 items-center justify-center border border-[#C5A880] text-xs font-bold tracking-[0.2em] text-[#C5A880] uppercase hover:bg-[#C5A880] hover:text-[#0B0C0E]"
              >
                Reservasi Bay &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
