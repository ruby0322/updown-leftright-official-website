import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CoursesSkeleton() {
  return (
    <div className="min-h-screen bg-brand-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="mr-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">上下左兒童美術教室</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-9 w-40 mx-auto mb-12" />

        {/* Teaching Photos Skeleton */}
        <section className="mb-16">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="relative mx-auto max-w-4xl px-12">
            <div className="aspect-video rounded-lg overflow-hidden relative">
              <Skeleton className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
            </div>
            {/* Carousel controls skeleton */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            {/* Indicators skeleton */}
            <div className="flex justify-center mt-4 gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-2 h-2 rounded-full" />
              ))}
            </div>
          </div>
        </section>

        {/* Student Works Skeleton */}
        <section className="mb-16">
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="relative mx-auto max-w-4xl px-12">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Skeleton className="h-64 rounded-lg" />
                  <div className="flex flex-col justify-center space-y-4">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Carousel controls skeleton */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            {/* Indicators skeleton */}
            <div className="flex justify-center mt-4 gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-2 h-2 rounded-full" />
              ))}
            </div>
          </div>
        </section>

        {/* More Photos Skeleton */}
        <section>
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-lg" />
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Skeleton className="h-10 w-24 mx-auto" />
        </div>
      </div>
    </div>
  );
} 