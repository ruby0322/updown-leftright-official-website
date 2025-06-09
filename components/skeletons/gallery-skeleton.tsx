import { Skeleton } from "@/components/ui/skeleton";

export default function GallerySkeleton() {
  return (
    <section id="gallery" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <Skeleton className="h-9 w-40 mx-auto mb-6" />
        <Skeleton className="h-5 w-96 mx-auto mb-8" />

        {/* Hero photo skeleton */}
        <div className="relative mx-auto max-w-3xl mb-8">
          <div className="aspect-video rounded-xl overflow-hidden">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6 space-y-4">
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-4 w-64 mx-auto" />
                <Skeleton className="h-10 w-24 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Preview items skeleton */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden relative">
              <Skeleton className="w-full h-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4 space-y-2">
                  <Skeleton className="h-5 w-20 mx-auto" />
                  <Skeleton className="h-3 w-32 mx-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 