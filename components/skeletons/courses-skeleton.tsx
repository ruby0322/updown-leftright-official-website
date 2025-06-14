import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, ChevronLeft, Palette } from "lucide-react";
import Link from "next/link";

export default function CoursesSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary-50 via-white to-brand-secondary-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-brand-primary-100/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-brand-primary-300 text-brand-primary-600 hover:bg-brand-primary-50 hover:border-brand-primary-400 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                返回首頁
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Skeleton className="h-12 md:h-16 w-64 md:w-80 mx-auto mb-4 animate-shimmer" />
          <Skeleton className="h-6 w-96 max-w-full mx-auto mb-6 animate-shimmer" />
          
          {/* Usage Instructions Skeleton */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-secondary-50 to-brand-primary-50 px-6 py-3 rounded-full border border-brand-primary-200/50">
            <svg className="w-5 h-5 text-brand-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <Skeleton className="h-4 w-64 sm:w-80 animate-shimmer" />
          </div>
        </div>

        {/* Student Works Section Skeleton */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
            <div className="p-2 bg-brand-primary-100 rounded-lg">
              <Palette className="h-6 w-6 text-brand-primary-600 animate-pulse" />
            </div>
            <Skeleton className="h-8 w-48 animate-shimmer" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card 
                key={`student-${index}`}
                className="group overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-fade-in-up-delay"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Skeleton className="aspect-square w-full animate-shimmer" />
                    
                    {/* Multiple Images Indicator Skeleton */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <Skeleton className="h-3 w-3 animate-shimmer" />
                    </div>
                    
                    {/* Info Overlay Skeleton */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                      <Skeleton className="h-4 w-3/4 mb-1 animate-shimmer bg-white/20" />
                      <Skeleton className="h-3 w-1/2 mb-1 animate-shimmer bg-white/20" />
                      <Skeleton className="h-3 w-2/3 mb-2 animate-shimmer bg-white/20" />
                      <Skeleton className="h-3 w-4/5 animate-shimmer bg-white/20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Class Photos Section Skeleton */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
            <div className="p-2 bg-brand-secondary-100 rounded-lg">
              <Camera className="h-6 w-6 text-brand-secondary-600 animate-pulse" />
            </div>
            <Skeleton className="h-8 w-52 animate-shimmer" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <Card 
                key={`class-${index}`}
                className="group overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-fade-in-up-delay"
                style={{
                  animationDelay: `${(index + 8) * 100}ms`
                }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Skeleton className="aspect-square w-full animate-shimmer" />
                    
                    {/* Multiple Images Indicator Skeleton */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <Skeleton className="h-3 w-3 animate-shimmer" />
                    </div>
                    
                    {/* Info Overlay Skeleton */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                      <Skeleton className="h-4 w-3/4 mb-1 animate-shimmer bg-white/20" />
                      <Skeleton className="h-3 w-full mb-2 animate-shimmer bg-white/20" />
                      <Skeleton className="h-3 w-4/5 animate-shimmer bg-white/20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Return Home Button Section - now empty to match the actual page */}
        <div className="text-center">
          
        </div>
      </div>
    </div>
  );
} 