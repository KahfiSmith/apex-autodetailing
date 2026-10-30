"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { studioData } from "@/data/detailing";
import AnimatedMetric from "@/components/AnimatedMetric";
import {
  ATELIER_EASE,
  SPECULAR_EASE,
  fadeUpItem,
  staggerContainer,
} from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bayFrameRef = useRef<HTMLDivElement>(null);
  const bayImageWrapRef = useRef<HTMLDivElement>(null);
  const bayHudRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (bayFrameRef.current && bayImageWrapRef.current) {
          gsap.fromTo(
            bayImageWrapRef.current,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: bayFrameRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (bayFrameRef.current && bayHudRef.current) {
          gsap.fromTo(
            bayHudRef.current,
            { y: 12 },
            {
              y: -8,
              ease: "none",
              scrollTrigger: {
                trigger: bayFrameRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[#22252C] bg-[#0B0C0E] pt-10 pb-24 lg:pt-16 lg:pb-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(62% 48% at 72% 28%, rgba(197, 168, 128, 0.11) 0%, rgba(244, 244, 245, 0.03) 38%, rgba(11, 12, 14, 0) 76%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ATELIER_EASE }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-[#22252C] pb-6 text-[11px] font-mono tracking-[0.25em] text-[#8C909A] uppercase"
        >
          <span>Surabaya Barat &bull; Jawa Timur</span>
          <span className="hidden sm:inline">
            07&deg;16&apos;48&quot;S 112&deg;41&apos;36&quot;E
          </span>
          <span>Atelier Preservasi Eksterior</span>
        </motion.div>

        <div className="mt-10 lg:mt-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: ATELIER_EASE }}
            className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase"
          >
            The Standard of Perfection
          </motion.p>

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.05rem,8.4vw,5.75rem)] font-extrabold tracking-[-0.03em] text-white leading-[0.95]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.68, delay: 0.08, ease: SPECULAR_EASE }}
                className="block"
              >
                DETAILING,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.16, ease: SPECULAR_EASE }}
                className="block text-[#C5A880]"
              >
                REFINED.
              </motion.span>
            </span>
          </h1>
        </div>

        <div className="mt-10 grid items-start gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <motion.p
                variants={fadeUpItem}
                className="text-sm font-light leading-relaxed text-[#8C909A] sm:text-base"
              >
                Preservasi cat eksklusif untuk kendaraan performa dan koleksi.
                Menggabungkan teknologi Nano Ceramic 9H, Self-Healing TPU Film,
                dan koreksi cat optik di dalam ruang steril berpendingin 22&deg;C.
              </motion.p>

              <motion.div
                variants={fadeUpItem}
                className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6"
              >
                <motion.a
                  href="#kalkulator"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="atelier-sheen inline-flex h-12 items-center justify-center border border-[#C5A880] bg-[#C5A880] px-7 text-xs font-bold tracking-[0.2em] text-[#0B0C0E] uppercase transition-colors duration-300 hover:bg-transparent hover:text-[#C5A880]"
                >
                  Cek Biaya Mobil &rarr;
                </motion.a>

                <motion.a
                  href={`https://wa.me/${studioData.contact.whatsapp}?text=Halo%20Apex,%20saya%20ingin%20konsultasi%20proteksi%20cat%20mobil%20saya.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.985 }}
                  className="group inline-flex min-h-12 items-center gap-2 px-2 text-xs font-semibold tracking-[0.2em] text-[#F4F4F5] uppercase transition-colors hover:text-[#C5A880]"
                >
                  <span>Konsultasi WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUpItem}
              className="mt-14 grid grid-cols-3 gap-4 border-t border-[#22252C] pt-8 font-mono sm:mt-16 sm:gap-6"
            >
              <div>
                <AnimatedMetric
                  target={5}
                  suffix=" THN"
                  className="block font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl"
                />
                <span className="mt-1 block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Garansi PPF
                </span>
              </div>
              <div>
                <AnimatedMetric
                  target={9}
                  suffix="H+"
                  className="block font-[family-name:var(--font-display)] text-2xl font-bold text-[#C5A880] sm:text-3xl"
                />
                <span className="mt-1 block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Kekerasan
                </span>
              </div>
              <div>
                <AnimatedMetric
                  target={98}
                  suffix=" GU"
                  className="block font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl"
                />
                <span className="mt-1 block text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Wet Gloss
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.14, ease: ATELIER_EASE }}
            className="relative lg:col-span-7"
          >
            <div
              ref={bayFrameRef}
              className="group relative aspect-16/10 w-full overflow-hidden border border-[#22252C] bg-[#121316]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-3 left-3 z-20 h-3 w-3 border-t border-l border-[#C5A880]/70"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-3 right-3 z-20 h-3 w-3 border-t border-r border-[#C5A880]/70"
              />

              <div
                ref={bayImageWrapRef}
                className="atelier-parallax-layer absolute inset-0 h-full w-full"
              >
                <Image
                  src="/images/hero.jpg"
                  alt="Supercar detailing finish at Apex"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/92 via-[#0B0C0E]/20 to-transparent" />

              <div
                ref={bayHudRef}
                className="absolute right-4 bottom-4 left-4 z-10 border border-[#22252C] bg-[#0B0C0E]/92 p-4 sm:right-6 sm:bottom-6 sm:left-6 sm:p-5"
              >
                <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase">
                  <span>Atelier Bay 01</span>
                  <span className="text-[#C5A880]">22&deg;C Steril</span>
                </div>
                <p className="mt-1.5 font-[family-name:var(--font-display)] text-xs font-semibold tracking-wider text-white uppercase sm:text-sm">
                  Pencahayaan Spektrum 5000K Daylight
                </p>
                <p className="mt-1 hidden text-xs text-[#8C909A] sm:block">
                  Ruang isolasi partikel debu untuk aplikasi coating dan film optik presisi.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div id="layanan" className="mt-24 scroll-mt-24 border-t border-[#22252C] pt-16 lg:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: ATELIER_EASE }}
            className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
          >
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
          </motion.div>

          <div className="mt-12 grid divide-y divide-[#22252C] border-y border-[#22252C]">
            {studioData.quickServices.map((qs, idx) => (
              <motion.a
                key={qs.id}
                href="#paket"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: ATELIER_EASE,
                }}
                className="group relative grid items-center gap-5 px-4 py-7 transition-colors duration-300 hover:bg-[#121316]/90 sm:px-6 sm:py-8 lg:grid-cols-12 lg:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 bottom-0 left-0 h-[1.5px] origin-left scale-x-0 bg-[#C5A880] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />

                <div className="flex min-w-0 items-center gap-4 lg:col-span-4">
                  <span className="shrink-0 font-mono text-sm font-bold text-[#8C909A] transition-colors duration-300 group-hover:text-[#C5A880]">
                    0{idx + 1}
                  </span>
                  <h3 className="min-w-0 font-[family-name:var(--font-display)] text-lg font-bold tracking-wide text-white uppercase transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#C5A880]">
                    {qs.title}
                  </h3>
                </div>

                <p className="min-w-0 text-xs font-light leading-relaxed text-[#8C909A] lg:col-span-4">
                  {qs.desc}
                </p>

                <div className="flex min-w-0 items-center justify-between gap-4 lg:col-span-4 lg:justify-end">
                  <div className="text-left lg:text-right">
                    <span className="block text-[10px] font-mono tracking-[0.2em] text-[#8C909A] uppercase">
                      {qs.badge}
                    </span>
                    <span className="font-mono text-xs font-semibold text-white">
                      {qs.startingPrice}
                    </span>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#22252C] text-[#8C909A] transition-all duration-300 group-hover:border-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#0B0C0E]">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
