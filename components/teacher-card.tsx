import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeacherCardProps {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  education: string[];
  instagramLinks?: { username: string; url: string }[];
}

export default function TeacherCard({
  name,
  title,
  description,
  imageSrc,
  education,
  instagramLinks = [],
}: TeacherCardProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm h-full">
      <CardContent className="p-8 text-center h-full flex flex-col">
        <div className="w-32 h-32 mx-auto mb-6 relative">
          <Image
            src={imageSrc}
            alt={name}
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full border-4 border-brand-primary-200"
          />
        </div>
        <h4 className="text-2xl font-bold text-foreground mb-2">{name}</h4>
        <ul className="space-y-0.5 mb-4">
          {education.map((edu, index) => (
            <li key={index} className="text-sm text-muted-foreground">{edu}</li>
          ))}
        </ul>
        <p className="text-brand-primary-500 font-semibold mb-4">{title}</p>
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{description}</p>
        {instagramLinks.length > 0 && (
          <div className="flex flex-col `justify-center gap-4 mt-auto">
            {instagramLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="border-brand-primary-300 text-brand-primary-500 hover:bg-brand-primary-50"
              >
                <Link
                  className="flex items-center justify-center"
                  target="_blank"
                  href={link.url}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  {link.username}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 