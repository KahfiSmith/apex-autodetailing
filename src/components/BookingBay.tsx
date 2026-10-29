"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { studioData } from "@/data/detailing";
import AnimatedPrice from "@/components/AnimatedPrice";
import { ATELIER_EASE, atelierSpring, panelCrossfade } from "@/lib/motion";

export default function BookingBay() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carSize, setCarSize] = useState<"S" | "M" | "L" | "XL">("M");
  const [packageId, setPackageId] = useState<string>("pkg-1");
  const [bookingDate, setBookingDate] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState<string | null>(null);

  const selectedTier =
    studioData.sizeTiers.find((t) => t.size === carSize) || studioData.sizeTiers[1];

  const selectedPackage =
    studioData.packages.find((p) => p.id === packageId) || studioData.packages[0];

  const getEstimatedPrice = () => {
    if (selectedPackage.category === "coating") {
      return selectedTier.ceramicPrice;
    }
    if (selectedPackage.category === "ppf") {
      return selectedTier.ppfPrice;
    }
    if (selectedPackage.category === "correction") {
      return selectedTier.correctionPrice;
    }
    return selectedPackage.startingPrice;
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedCar = carModel.trim();

    if (!trimmedName || !trimmedPhone || !trimmedCar) {
      setFormError(
        "Mohon lengkapi nama pemilik, nomor WhatsApp, dan merk/model kendaraan sebelum mengirim reservasi."
      );
      return;
    }

    setFormError(null);

    const text =
      `Halo Apex, saya ingin reservasi slot bay pengerjaan:\n\n` +
      `• Nama: ${trimmedName}\n` +
      `• No. WhatsApp: ${trimmedPhone}\n` +
      `• Unit Mobil: ${trimmedCar}\n` +
      `• Ukuran: Size ${carSize} (${selectedTier.name})\n` +
      `• Paket Dipilih: ${selectedPackage.name}\n` +
      `• Rencana Masuk: ${bookingDate || "Menyesuaikan jadwal bay terdekat"}\n` +
      `• Estimasi Biaya: ${getEstimatedPrice()}\n` +
      (notes.trim() ? `• Catatan Khusus: ${notes.trim()}\n` : "") +
      `\nMohon informasi ketersediaan jadwal bay pengerjaan. Terima kasih!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${studioData.contact.whatsapp}?text=${encodedText}`;
    setLastWhatsappUrl(whatsappUrl);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="booking"
      className="scroll-mt-24 border-b border-[#22252C] bg-[#0B0C0E] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: ATELIER_EASE }}
          className="border-b border-[#22252C] pb-12"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
            Reservasi Atelier
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
            YOUR CAR. <br />
            <span className="text-[#C5A880]">OUR CRAFT.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xs font-light leading-relaxed text-[#8C909A] sm:text-sm">
            Kapasitas pengerjaan dibatasi maksimum 2 unit kendaraan per hari untuk menjaga standar waktu curing dan ketelitian mikron pengerjaan di dalam ruang bay steril.
          </p>
        </motion.div>

        <div className="mt-14 grid items-start gap-14 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          <form
            noValidate
            onSubmit={handleWhatsAppBooking}
            className="space-y-8 lg:col-span-7"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="group relative">
                <label
                  htmlFor="customer-name"
                  className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase transition-colors group-focus-within:text-[#C5A880]"
                >
                  Nama Lengkap *
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Nama lengkap pemilik unit"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  className="mt-2 h-12 w-full border-b border-[#22252C] bg-transparent px-0 text-sm text-white placeholder-[#8C909A]/55 transition-colors focus:border-[#C5A880] focus-visible:outline-none"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-[#C5A880] transition-transform duration-300 group-focus-within:scale-x-100"
                />
              </div>

              <div className="group relative">
                <label
                  htmlFor="customer-phone"
                  className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase transition-colors group-focus-within:text-[#C5A880]"
                >
                  Nomor WhatsApp *
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="08xx-xxxx-xxxx"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  className="mt-2 h-12 w-full border-b border-[#22252C] bg-transparent px-0 text-sm text-white placeholder-[#8C909A]/55 transition-colors focus:border-[#C5A880] focus-visible:outline-none"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-[#C5A880] transition-transform duration-300 group-focus-within:scale-x-100"
                />
              </div>
            </div>

            <div className="group relative">
              <label
                htmlFor="car-model"
                className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase transition-colors group-focus-within:text-[#C5A880]"
              >
                Merk &amp; Model Kendaraan *
              </label>
              <input
                id="car-model"
                type="text"
                required
                placeholder="Merk, seri, dan tahun kendaraan Anda"
                value={carModel}
                onChange={(e) => {
                  setCarModel(e.target.value);
                  if (formError) setFormError(null);
                }}
                className="mt-2 h-12 w-full border-b border-[#22252C] bg-transparent px-0 text-sm text-white placeholder-[#8C909A]/55 transition-colors focus:border-[#C5A880] focus-visible:outline-none"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-[#C5A880] transition-transform duration-300 group-focus-within:scale-x-100"
              />
            </div>

            <div>
              <span
                id="car-size-label"
                className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase"
              >
                Klasifikasi Dimensi
              </span>
              <div
                role="radiogroup"
                aria-labelledby="car-size-label"
                className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
              >
                {(["S", "M", "L", "XL"] as const).map((s) => {
                  const isActive = carSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setCarSize(s)}
                      className={`relative h-11 border font-mono text-xs tracking-wider uppercase transition-colors duration-200 ${
                        isActive
                          ? "border-[#C5A880] font-bold text-[#0B0C0E]"
                          : "border-[#22252C] bg-[#121316] text-[#8C909A] hover:border-[#8C909A] hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="booking-size-pill"
                          transition={atelierSpring}
                          className="absolute inset-0 bg-[#C5A880]"
                        />
                      )}
                      <span className="relative z-10">Size {s}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] font-mono text-[#8C909A]">
                {selectedTier.name} &bull; {selectedTier.examples}
              </p>
            </div>

            <div className="group relative">
              <label
                htmlFor="service-package"
                className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase transition-colors group-focus-within:text-[#C5A880]"
              >
                Pilihan Program Preservasi
              </label>
              <select
                id="service-package"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="mt-2 h-12 w-full border-b border-[#22252C] bg-[#0B0C0E] px-0 text-sm text-white transition-colors focus:border-[#C5A880] focus-visible:outline-none"
              >
                {studioData.packages.map((pkg) => (
                  <option
                    key={pkg.id}
                    value={pkg.id}
                    className="bg-[#121316] text-white"
                  >
                    {pkg.name} ({pkg.warranty})
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-[#C5A880] transition-transform duration-300 group-focus-within:scale-x-100"
              />
            </div>

            <div className="group relative">
              <label
                htmlFor="booking-date"
                className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase transition-colors group-focus-within:text-[#C5A880]"
              >
                Rencana Tanggal Masuk Bay
              </label>
              <input
                id="booking-date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="mt-2 h-12 w-full border-b border-[#22252C] bg-transparent px-0 text-sm text-white transition-colors focus:border-[#C5A880] focus-visible:outline-none"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-[#C5A880] transition-transform duration-300 group-focus-within:scale-x-100"
              />
            </div>

            <div className="group relative">
              <label
                htmlFor="booking-notes"
                className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase transition-colors group-focus-within:text-[#C5A880]"
              >
                Catatan Kondisi Pernis / Permintaan Khusus
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                placeholder="Deskripsikan kondisi cat saat ini atau fokus inspeksi yang diinginkan"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 w-full border-b border-[#22252C] bg-transparent p-0 pb-2 text-sm text-white placeholder-[#8C909A]/55 transition-colors focus:border-[#C5A880] focus-visible:outline-none"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-1.5 left-0 h-[2px] origin-left scale-x-0 bg-[#C5A880] transition-transform duration-300 group-focus-within:scale-x-100"
              />
            </div>

            <AnimatePresence initial={false}>
              {formError && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: ATELIER_EASE }}
                  className="flex items-start gap-3 border border-[#C5A880]/70 bg-[#121316] p-4 text-xs text-[#F4F4F5]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A880]" />
                  <span>{formError}</span>
                </motion.div>
              )}

              {lastWhatsappUrl && !formError && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: ATELIER_EASE }}
                  className="flex flex-col justify-between gap-3 border border-[#C5A880]/60 bg-[#121316] p-4 text-xs text-[#F4F4F5] sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A880]" />
                    <span>
                      Ringkasan reservasi telah disiapkan untuk WhatsApp Atelier. Jika jendela belum terbuka otomatis, gunakan tautan langsung berikut.
                    </span>
                  </div>
                  <a
                    href={lastWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 shrink-0 items-center gap-1.5 border border-[#C5A880] px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wider text-[#C5A880] uppercase hover:bg-[#C5A880] hover:text-[#0B0C0E]"
                  >
                    <span>Buka WhatsApp</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.988 }}
              className="atelier-sheen mt-4 flex h-13 w-full items-center justify-center border border-[#C5A880] bg-[#C5A880] px-6 text-xs font-bold tracking-[0.2em] text-[#0B0C0E] uppercase transition-colors duration-300 hover:bg-transparent hover:text-[#C5A880]"
            >
              <span>Kirim Reservasi Bay via WhatsApp &rarr;</span>
            </motion.button>
          </form>

          <div className="flex flex-col justify-between border-t border-[#22252C] pt-10 lg:sticky lg:top-28 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-[#22252C] lg:pt-0 lg:pl-14">
            <div className="border border-[#22252C] bg-[#121316]/85 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
                  Estimasi Konfigurasi Bay
                </span>
                <span className="font-mono text-[10px] text-[#8C909A] uppercase">
                  Maks 2 Unit / Hari
                </span>
              </div>

              <div className="mt-6 space-y-5 divide-y divide-[#22252C]">
                <div className="pt-2">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                    Paket
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={selectedPackage.id}
                      variants={panelCrossfade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold text-white uppercase"
                    >
                      {selectedPackage.name}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="pt-4">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                    Dimensi &amp; Kelas
                  </span>
                  <p className="mt-1 font-mono text-sm text-[#F4F4F5]">
                    Size {selectedTier.size} &bull; {selectedTier.name}
                  </p>
                </div>

                <div className="pt-4">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                    Garansi &amp; Durasi
                  </span>
                  <p className="mt-1 font-mono text-sm text-[#C5A880]">
                    {selectedPackage.warranty} &bull; {selectedTier.durationDays}
                  </p>
                </div>

                <div className="pt-6">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                    Estimasi Biaya Mulai
                  </span>
                  <AnimatedPrice
                    value={getEstimatedPrice()}
                    className="mt-1 block font-mono text-3xl font-bold text-white"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2 border-t border-[#22252C] pt-5 text-xs font-light text-[#8C909A]">
                <p>
                  &bull; Termasuk inspeksi ketebalan pernis (paint depth gauge) sebelum pengerjaan.
                </p>
                <p>
                  &bull; Termasuk free first maintenance wash pasca-curing.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-[#22252C] pt-6">
              <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                Layanan Antar Jemput Unit / Konsultasi Langsung
              </span>
              <a
                href={`tel:${studioData.contact.phone}`}
                className="mt-2 inline-flex min-h-11 items-center font-mono text-xs text-white transition-colors hover:text-[#C5A880]"
              >
                Telepon: {studioData.contact.formattedPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
