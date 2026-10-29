"use client";

import { motion } from "motion/react";
import { studioData } from "@/data/detailing";
import { ATELIER_EASE } from "@/lib/motion";

function RatingPips({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`Penilaian ${rating} dari 5`}
      className="flex items-center gap-1.5"
    >
      {Array.from({ length: 5 }).map((_, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          className={`h-1.5 w-3.5 ${
            idx < rating ? "bg-[#C5A880]" : "bg-[#22252C]"
          }`}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  const [featuredReview, ...secondaryReviews] = studioData.reviews;

  return (
    <section className="border-b border-[#22252C] bg-[#0B0C0E] py-20 sm:py-32">
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
              Ulasan Koleksi Unit
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
              Suara Pemilik Kendaraan
            </h2>
          </div>
          <p className="max-w-md text-xs font-light leading-relaxed text-[#8C909A]">
            Pengalaman nyata para antusias otomotif yang mempercayakan perawatannya pada atelier kami.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:gap-10">
          {featuredReview && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: ATELIER_EASE }}
              className="flex flex-col justify-between border border-[#22252C] bg-[#121316] p-7 sm:p-10 lg:col-span-6"
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-[#22252C] pb-5">
                  <RatingPips rating={featuredReview.rating} />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                    {featuredReview.date}
                  </span>
                </div>

                <blockquote className="mt-7 font-[family-name:var(--font-display)] text-xl font-medium leading-relaxed text-[#F4F4F5] sm:text-2xl">
                  &ldquo;{featuredReview.comment}&rdquo;
                </blockquote>
              </div>

              <div className="mt-10 border-t border-[#22252C] pt-5 font-mono">
                <span className="block text-xs font-bold tracking-wider text-white uppercase">
                  {featuredReview.customerName}
                </span>
                <span className="mt-1 block text-xs text-[#C5A880]">
                  {featuredReview.carModel}
                </span>
                <span className="mt-1 block text-[10px] tracking-wider text-[#8C909A] uppercase">
                  {featuredReview.packageName}
                </span>
              </div>
            </motion.article>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:col-span-6 lg:grid-cols-1">
            {secondaryReviews.map((rev, idx) => (
              <motion.article
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: (idx + 1) * 0.08,
                  ease: ATELIER_EASE,
                }}
                className="flex flex-col justify-between border border-[#22252C] bg-[#0B0C0E] p-6 transition-colors duration-300 hover:border-[#2E333C] hover:bg-[#121316]/60 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <RatingPips rating={rev.rating} />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                      {rev.date}
                    </span>
                  </div>

                  <blockquote className="mt-5 font-[family-name:var(--font-display)] text-base font-medium leading-relaxed text-[#F4F4F5] sm:text-lg">
                    &ldquo;{rev.comment}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t border-[#22252C] pt-4 font-mono">
                  <div>
                    <span className="block text-xs font-bold tracking-wider text-white uppercase">
                      {rev.customerName}
                    </span>
                    <span className="text-[11px] text-[#C5A880]">
                      {rev.carModel}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8C909A]">
                    {rev.packageName}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
