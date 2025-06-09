import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";

export default function PricingSection() {
  const schedules = [
    { name: "週六上午班", time: "09:00 - 11:00" },
    { name: "週六下午班", time: "14:00 - 16:00" },
    { name: "週日上午班", time: "10:00 - 12:00" },
  ];

  const pricingPlans = [
    {
      title: "單堂體驗",
      price: "NT$ 800",
      description: "適合初次體驗的小朋友",
      features: ["2小時完整課程", "包含所有材料費", "作品可帶回家"],
      badge: "最受歡迎",
    },
    {
      title: "月繳方案",
      price: "NT$ 2,800",
      description: "每月4堂課 (平均每堂700元)",
      features: ["固定時段保證有位", "系統性學習規劃", "學習進度追蹤"],
    },
    {
      title: "季繳優惠",
      price: "NT$ 7,800",
      description: "三個月12堂課 (平均每堂650元)",
      features: ["最優惠的價格", "免費補課服務", "期末作品展示"],
    },
  ];

  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-foreground mb-12">課程時間表與收費方案</h3>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Schedule */}
          <div>
            <h4 className="text-2xl font-semibold text-foreground mb-6">每週課程時間</h4>
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {schedules.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-brand-primary-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-brand-primary-400" />
                        <span className="font-semibold text-brand-primary-400">{schedule.name}</span>
                      </div>
                      <span className="text-brand-primary-400">{schedule.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">上課地點</span>
                  </div>
                  <p className="text-muted-foreground">台北市大安區和平東路二段123號2樓</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing */}
          <div>
            <h4 className="text-2xl font-semibold text-foreground mb-6">收費方案</h4>
            <div className="space-y-4">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className="bg-card/90 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{plan.title}</span>
                      {plan.badge && (
                        <Badge variant="secondary" className="bg-brand-primary-100 text-brand-primary-600">
                          {plan.badge}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">{plan.price}</div>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>• {feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 