import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center h-[70vh] relative py-16 md:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/classroom.jpg"
          alt="教室背景"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-bg-overlay" />
      </div>
      <div className="h-full flex items-center justify-center container mx-auto px-4 text-center relative z-10">
        <div className="p-4 max-w-4xl mx-auto">
          <h2 className="drop-shadow-xl text-4xl md:text-6xl font-bold text-white mb-6">
            啟發孩子的
            <span className="text-brand-primary-300">創造力</span>
          </h2>
          <p className="italic bg-highlight-overlay-brand backdrop-blur-sm p-2 text-xl text-white mb-8 leading-relaxed">
            專業兒童美術教學，用愛心與耐心陪伴每個小朋友探索藝術世界
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-primary hover:bg-brand-primary-500">
              立即報名
            </Button>
            <Button size="lg" variant="outline" className="border-brand-primary-300 text-brand-primary-300 hover:bg-background">
              了解更多
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 