"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Image
                src="/images/icons/circle.png"
                alt="上下左兒童美術教室"
                width={40}
                height={40}
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">上下左兒童美術教室</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                關於我們
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                成功案例
              </a>
              <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors">
                課程紀錄
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                課程方案
              </a>
              <a href="#teacher" className="text-muted-foreground hover:text-primary transition-colors">
                師資陣容
              </a>
            </nav>
            {/* <ThemeSwitcher /> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* <ThemeSwitcher /> */}
            <button
              onClick={toggleMenu}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 pt-4">
              <a 
                href="#about" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                關於我們
              </a>
              <a 
                href="#testimonials" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                成功案例
              </a>
              <a 
                href="#gallery" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                課程紀錄
              </a>
              <a 
                href="#pricing" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                課程方案
              </a>
              <a 
                href="#teacher" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                師資陣容
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}