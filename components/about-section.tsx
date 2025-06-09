import { Heart, Palette, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">為什麼選擇上下左右？</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">用心教學</h4>
              <p className="text-muted-foreground">以愛心與耐心陪伴孩子成長</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-brand-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">專業指導</h4>
              <p className="text-muted-foreground">豐富的教學經驗與專業技巧</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-brand-primary-500" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">小班教學</h4>
              <p className="text-muted-foreground">確保孩子能得到充分關注</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 