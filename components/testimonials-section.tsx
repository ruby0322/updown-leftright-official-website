import { Card, CardContent } from "@/components/ui/card";
import { type Testimonial } from "@/lib/supabase/actions";
import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-foreground mb-12">家長與學生的真心推薦</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card/90 backdrop-blur-sm shadow-[5px_5px_0px_0px_#8fa8fa]">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-secondary text-brand-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${testimonial.bg_color} rounded-full flex items-center justify-center`}>
                    <span className={`${testimonial.text_color} font-semibold`}>{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-brand-secondary-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 