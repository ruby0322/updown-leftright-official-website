import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Home, MapPin, Users } from "lucide-react";

export default function PricingSection() {
  const schedules = [
    { day: "週一", sessions: [
      { time: "11:00 - 12:30", activity: "課程內容前一週 IG 公布" },
      { time: "14:00 - 15:30", activity: "課程內容前一週 IG 公布" }
    ]},
    { day: "週二", sessions: [
      { time: "11:00 - 12:30", activity: "課程內容前一週 IG 公布" },
      { time: "14:00 - 15:30", activity: "課程內容前一週 IG 公布" }
    ]},
    { day: "週五", sessions: [
      { time: "11:00 - 12:30", activity: "課程內容前一週 IG 公布" },
      { time: "14:00 - 15:30", activity: "課程內容前一週 IG 公布" }
    ]},
    { day: "週六", sessions: [
      { time: "11:00 - 12:30", activity: "課程內容前一週 IG 公布" },
      { time: "14:00 - 15:30", activity: "課程內容前一週 IG 公布" }
    ]},
  ];

  const pricingPlans = [
    {
      title: "到府一對一",
      price: "NT$ 450／小時",
      description: "專業老師到府授課，一對一指導",
      features: [
        "每小時 450 元", 
        "交通費 200 元", 
        "可多加一位 +150 元",
        "客製化教學內容"
      ],
      badge: "個人專屬",
      icon: <Home className="w-5 h-5" />
    },
    {
      title: "多人成班 (3-4人)",
      price: "NT$ 1,500 起",
      description: "每堂課 1.5 小時，適合小團體學習",
      features: [
        "3人班：1,500 元/堂",
        "4人班：1,720 元/堂", 
        "平均每人 430-500 元",
        "可選工作室或到府"
      ],
      badge: "最受歡迎",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "多人成班 (6-8人)",
      price: "NT$ 2,100 起",
      description: "大班制教學，更優惠的價格",
      features: [
        "6人班：2,100 元/堂",
        "8人班：2,440 元/堂",
        "平均每人 305-350 元", 
        "團體互動學習"
      ],
      badge: "最優惠",
      icon: <Users className="w-5 h-5" />
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
                <div className="space-y-3">
                  {schedules.map((schedule, index) => (
                    <div key={index} className="border-b border-border/50 pb-3 last:border-b-0">
                      <div className="font-semibold text-brand-primary-600 mb-2">{schedule.day}</div>
                      <div className="space-y-2">
                        {schedule.sessions.map((session, sessionIndex) => (
                          <div key={sessionIndex} className={`flex items-center justify-between p-3 rounded-lg ${
                            session.time === "休息" 
                              ? "bg-muted/50" 
                              : "bg-brand-primary-50"
                          }`}>
                            <div className="flex items-center gap-3">
                              <Clock className={`w-4 h-4 ${
                                session.time === "休息" 
                                  ? "text-muted-foreground" 
                                  : "text-brand-primary-400"
                              }`} />
                              <span className={`text-sm ${
                                session.time === "休息" 
                                  ? "text-muted-foreground" 
                                  : "text-brand-primary-600"
                              }`}>
                                {session.time}
                              </span>
                            </div>
                            <span className={`text-sm ${
                              session.time === "休息" 
                                ? "text-muted-foreground" 
                                : "text-brand-primary-600"
                            }`}>
                              {session.activity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">上課地點</span>
                  </div>
                  <p className="text-muted-foreground">新北市新莊區頭成街 165 號 2 樓</p>
                  <p className="text-sm text-muted-foreground mt-1">※ 也提供到府教學服務</p>
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
                      <div className="flex items-center gap-2">
                        {plan.icon}
                        <span>{plan.title}</span>
                      </div>
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
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>注意事項：</strong>每堂課程時長為 1.5 小時，可選擇工作室上課或到府教學服務。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 