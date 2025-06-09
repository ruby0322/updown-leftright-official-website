import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";
import GallerySection from "@/components/gallery-section";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import PricingSection from "@/components/pricing-section";
import GallerySkeleton from "@/components/skeletons/gallery-skeleton";
import TestimonialsSkeleton from "@/components/skeletons/testimonials-skeleton";
import TeacherSection from "@/components/teacher-section";
import TestimonialsSection from "@/components/testimonials-section";
import {
  getFeaturedClassPhotos,
  getFeaturedStudentWorks,
  getFeaturedTeachingPhotos,
  getTestimonials
} from "@/lib/supabase/actions";
import { Suspense } from "react";

// Component for testimonials data fetching
async function TestimonialsData() {
  const testimonials = await getTestimonials();
  return <TestimonialsSection testimonials={testimonials || []} />;
}

// Component for gallery data fetching
async function GalleryData() {
  const [
    featuredTeachingPhotos,
    featuredStudentWorks,
    featuredClassPhotos
  ] = await Promise.all([
    getFeaturedTeachingPhotos(3),
    getFeaturedStudentWorks(3),
    getFeaturedClassPhotos(3)
  ]);

  // Safely get the first item from each array
  const heroPhoto = featuredTeachingPhotos?.[0] || undefined;
  const previewItems = {
    teaching: featuredTeachingPhotos?.[0] || undefined,
    studentWorks: featuredStudentWorks?.[0] || undefined,
    classPhotos: featuredClassPhotos?.[0] || undefined
  };

  return (
    <GallerySection 
      heroPhoto={heroPhoto}
      previewItems={previewItems}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsData />
      </Suspense>
      
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryData />
      </Suspense>
      
      <PricingSection />
      <TeacherSection />
      <Footer />
    </div>
  );
}
