import { studioData } from "@/data/detailing";

export default function CustomerReviews() {
  return (
    <section className="bg-[#0B0C0E] py-24 sm:py-32 border-b border-[#22252C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-[#22252C] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] text-[#C5A880] uppercase">
              Ulasan Koleksi Unit
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl uppercase">
              Suara Pemilik Kendaraan
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#8C909A] font-light">
            Pengalaman nyata para antusias otomotif yang mempercayakan perawatannya pada atelier kami.
          </p>
        </div>

        <div className="mt-16 divide-y divide-[#22252C] border-y border-[#22252C]">
          {studioData.reviews.map((rev) => (
            <div
              key={rev.id}
              className="grid items-baseline gap-6 py-12 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-3 font-mono">
                <span className="block text-xs font-bold text-white uppercase tracking-wider">
                  {rev.customerName}
                </span>
                <span className="mt-1 block text-[11px] text-[#C5A880]">
                  {rev.carModel}
                </span>
                <span className="mt-1 block text-[10px] text-[#8C909A]">
                  {rev.packageName} &bull; {rev.date}
                </span>
              </div>

              <div className="lg:col-span-9">
                <blockquote className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-medium leading-relaxed text-[#F4F4F5]">
                  &ldquo;{rev.comment}&rdquo;
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
