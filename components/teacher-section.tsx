import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TeacherSection() {
  return (
    <section id="teacher" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-foreground mb-12">師資陣容</h3>
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <Image
                  src="/images/xiao-ca.jpg"
                  alt="小卡老師"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full border-4 border-brand-primary-200"
                />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">小卡老師</h4>
              <p className="text-brand-primary-500 font-semibold mb-4">專業兒童美術教師</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                我是小卡老師，擁有五年兒童美術教學經驗，熱愛啟發孩子的創造力。
                相信每個孩子都是天生的藝術家，只需要適當的引導和鼓勵。
                我的教學理念是讓孩子在快樂中學習，在創作中成長。
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm" className="border-brand-primary-300 text-brand-primary-500 hover:bg-brand-primary-50">
                  <Link className="flex items-center justify-center" target="_blank" href="https://www.instagram.com/upanddown.leftandright_">
                    <Instagram className="w-4 h-4 mr-2" />
                    upanddown.leftandright_
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="border-brand-primary-300 text-brand-primary-500 hover:bg-brand-primary-50">
                  <Link className="flex items-center justify-center" target="_blank" href="https://www.instagram.com/carolineee_o4o1_b">
                    <Instagram className="w-4 h-4 mr-2" />
                    carolineee_o4o1_b
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 