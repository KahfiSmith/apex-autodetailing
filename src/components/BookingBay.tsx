"use client";

import { useState } from "react";
import { studioData } from "@/data/detailing";

export default function BookingBay() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carSize, setCarSize] = useState<"S" | "M" | "L" | "XL">("M");
  const [packageId, setPackageId] = useState<string>("pkg-1");
  const [bookingDate, setBookingDate] = useState("");
  const [notes, setNotes] = useState("");

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

    const text =
      `Halo Apex, saya ingin reservasi slot bay pengerjaan:\n\n` +
      `• Nama: ${name || "-"}\n` +
      `• No. WhatsApp: ${phone || "-"}\n` +
      `• Unit Mobil: ${carModel || "-"}\n` +
      `• Ukuran: Size ${carSize} (${selectedTier.name})\n` +
      `• Paket Dipilih: ${selectedPackage.name}\n` +
      `• Rencana Masuk: ${bookingDate || "-"}\n` +
      `• Estimasi Biaya: ${getEstimatedPrice()}\n` +
      (notes ? `• Catatan Khusus: ${notes}\n` : "") +
      `\nMohon informasi ketersediaan jadwal bay pengerjaan. Terima kasih!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${studioData.contact.whatsapp}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="booking" className="scroll-mt-24 bg-[#0B0C0E] py-24 sm:py-32 border-b border-[#22252C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="border-b border-[#22252C] pb-12">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
            Reservasi Atelier
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[0.95]">
            YOUR CAR. <br />
            <span className="text-[#C5A880]">OUR CRAFT.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xs sm:text-sm text-[#8C909A] font-light leading-relaxed">
            Kapasitas pengerjaan dibatasi maksimum 2 unit kendaraan per hari untuk menjaga standar waktu curing dan ketelitian mikron pengerjaan di dalam ruang bay steril.
          </p>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <form
            onSubmit={handleWhatsAppBooking}
            className="space-y-8 lg:col-span-7"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="customer-name" className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Nama Lengkap *
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 h-12 w-full border-b border-[#22252C] bg-transparent px-0 text-sm text-white placeholder-[#8C909A]/50 focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="customer-phone" className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                  Nomor WhatsApp *
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-3 h-12 w-full border-b border-[#22252C] bg-transparent px-0 text-sm text-white placeholder-[#8C909A]/50 focus:border-[#C5A880] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="car-model" className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                Merk & Model Kendaraan *
              </label>
              <input
                id="car-model"
                type="text"
                required
                placeholder="Contoh: Porsche 911 / BMW M3 / Honda Civic"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="mt-3 h-12 w-full border-b border-[#22252C] bg-transparent px-0 text-sm text-white placeholder-[#8C909A]/50 focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                Klasifikasi Dimensi
              </label>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {(["S", "M", "L", "XL"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setCarSize(s)}
                    className={`h-11 border font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                      carSize === s
                        ? "border-[#C5A880] bg-[#C5A880] text-[#0B0C0E] font-bold"
                        : "border-[#22252C] bg-[#121316] text-[#8C909A] hover:border-[#8C909A] hover:text-white"
                    }`}
                  >
                    Size {s}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[10px] font-mono text-[#8C909A]">
                {selectedTier.name} &bull; {selectedTier.examples}
              </p>
            </div>

            <div>
              <label htmlFor="service-package" className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                Pilihan Program Preservasi
              </label>
              <select
                id="service-package"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="mt-3 h-12 w-full border-b border-[#22252C] bg-[#0B0C0E] px-0 text-sm text-white focus:border-[#C5A880] focus:outline-none"
              >
                {studioData.packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id} className="bg-[#121316] text-white">
                    {pkg.name} ({pkg.warranty})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="booking-date" className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                Rencana Tanggal Masuk Bay
              </label>
              <input
                id="booking-date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="mt-3 h-12 w-full border-b border-[#22252C] bg-transparent px-0 text-sm text-white focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="booking-notes" className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                Catatan Kondisi Pernis / Permintaan Khusus
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                placeholder="Deskripsikan kondisi pernis saat ini atau area fokus yang ingin diperhatikan"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-3 w-full border-b border-[#22252C] bg-transparent p-0 text-sm text-white placeholder-[#8C909A]/50 focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-6 flex h-13 w-full items-center justify-center border border-[#C5A880] bg-[#C5A880] text-xs font-bold tracking-[0.2em] text-[#0B0C0E] uppercase transition-all duration-300 hover:bg-transparent hover:text-[#C5A880]"
            >
              <span>Kirim Reservasi Bay via WhatsApp &rarr;</span>
            </button>
          </form>

          <div className="flex flex-col justify-between border-t border-[#22252C] pt-12 lg:border-t-0 lg:border-l lg:border-[#22252C] lg:pl-16 lg:col-span-5">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
                Estimasi Konfigurasi Bay
              </span>

              <div className="mt-8 space-y-6 divide-y divide-[#22252C]">
                <div className="pt-2">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                    Paket
                  </span>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold text-white uppercase">
                    {selectedPackage.name}
                  </p>
                </div>

                <div className="pt-4">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                    Dimensi & Model
                  </span>
                  <p className="mt-1 font-mono text-sm text-[#F4F4F5]">
                    Size {selectedTier.size} &bull; {selectedTier.name}
                  </p>
                </div>

                <div className="pt-4">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                    Garansi & Durasi
                  </span>
                  <p className="mt-1 font-mono text-sm text-[#C5A880]">
                    {selectedPackage.warranty} &bull; {selectedTier.durationDays}
                  </p>
                </div>

                <div className="pt-6">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                    Estimasi Biaya Mulai
                  </span>
                  <p className="mt-1 font-mono text-3xl font-bold text-white">
                    {getEstimatedPrice()}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-[#22252C] pt-6 text-xs text-[#8C909A] font-light space-y-2">
                <p>&bull; Termasuk inspeksi ketebalan pernis (paint depth gauge) sebelum pengerjaan.</p>
                <p>&bull; Termasuk free first maintenance wash pasca-curing.</p>
              </div>
            </div>

            <div className="mt-12 border-t border-[#22252C] pt-8">
              <span className="block font-mono text-[10px] tracking-[0.2em] text-[#8C909A] uppercase">
                Layanan Antar Jemput Unit / Konsultasi Langsung
              </span>
              <a
                href={`tel:${studioData.contact.phone}`}
                className="mt-2 block font-mono text-xs text-white hover:text-[#C5A880] transition-colors"
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
