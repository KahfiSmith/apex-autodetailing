import MotionProvider from "@/components/MotionProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PackagesSection from "@/components/PackagesSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import SizeCalculator from "@/components/SizeCalculator";
import TransformationShowcase from "@/components/TransformationShowcase";
import StudioStandards from "@/components/StudioStandards";
import CustomerReviews from "@/components/CustomerReviews";
import BookingBay from "@/components/BookingBay";
import LocationHours from "@/components/LocationHours";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <MotionProvider>
      <SmoothScrollProvider>
        <div className="min-h-screen bg-[#0B0C0E] text-[#F4F4F5] flex flex-col font-sans selection:bg-[#C5A880] selection:text-[#0B0C0E]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:border focus:border-[#C5A880] focus:bg-[#0B0C0E] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-[#C5A880] focus:uppercase"
          >
            Lewati ke konten utama
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            <Hero />
            <PackagesSection />
            <BeforeAfterSlider />
            <SizeCalculator />
            <TransformationShowcase />
            <StudioStandards />
            <CustomerReviews />
            <BookingBay />
            <LocationHours />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </SmoothScrollProvider>
    </MotionProvider>
  );
}
