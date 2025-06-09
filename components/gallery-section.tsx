import { Button } from "@/components/ui/button";
import { type ItemWithImages } from "@/lib/supabase/actions";
import Image from "next/image";
import Link from "next/link";

interface GallerySectionProps {
  heroPhoto?: ItemWithImages;
  previewItems: {
    teaching?: ItemWithImages;
    studentWorks?: ItemWithImages;
    classPhotos?: ItemWithImages;
  };
}

export default function GallerySection({ heroPhoto, previewItems }: GallerySectionProps) {
  const previewItemsArray = [
    previewItems.teaching,
    previewItems.studentWorks,
    previewItems.classPhotos
  ];

  const titles = ['教學現場', '學生作品', '課堂花絮'];
  const descriptions = ['專業的教學環境與方法', '孩子們的創意與成長', '快樂的學習時光'];

  return (
    <section id="gallery" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-foreground mb-6">課程紀錄</h3>
        <p className="text-center text-muted-foreground mb-8">查看我們的教學現場、學生作品展示和更多課堂花絮</p>

        {heroPhoto && heroPhoto.images?.[0] && (
          <div className="relative mx-auto max-w-3xl mb-8">
            <div className="aspect-video rounded-xl overflow-hidden">
              <Image
                src={heroPhoto.images[0].image_url}
                alt={heroPhoto.images[0].alt_text || heroPhoto.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <h4 className="text-2xl font-bold mb-2">{heroPhoto.title}</h4>
                  <p className="mb-4">{heroPhoto.description}</p>
                  <Link href="/courses">
                    <Button className="bg-brand-primary hover:bg-brand-primary-500 text-white">查看全部</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {previewItemsArray.map((item, index) => {
            const image = item?.images?.[0];
            if (!item || !image) return null;

            return (
              <div key={item.id} className="aspect-square rounded-lg overflow-hidden relative">
                <Image
                  src={image.image_url}
                  alt={image.alt_text || item.title}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h5 className="font-semibold mb-1">{titles[index]}</h5>
                    <p className="text-sm opacity-90">{descriptions[index]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 