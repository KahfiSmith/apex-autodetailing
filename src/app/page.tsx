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
    <div className="min-h-screen bg-[#0B0C0E] text-[#F4F4F5] flex flex-col font-sans selection:bg-[#C5A880] selection:text-[#0B0C0E]">
      <Navbar />
      <main className="flex-1">
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
  );
}
