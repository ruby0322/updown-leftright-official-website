import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import PricingSection from "@/components/pricing-section";
import TeacherSection from "@/components/teacher-section";
import GallerySkeleton from "./gallery-skeleton";
import TestimonialsSkeleton from "./testimonials-skeleton";

export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <TestimonialsSkeleton />
      <GallerySkeleton />
      <PricingSection />
      <TeacherSection />
      <Footer />
    </div>
  );
} 