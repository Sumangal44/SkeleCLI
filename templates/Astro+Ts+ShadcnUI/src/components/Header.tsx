import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { ModeToggle } from '@/components/ModeToggle';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm transition-all ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container flex h-16 items-center justify-between">
        <div>
          <a href="/" className="flex items-center space-x-2">
            <span className="inline-block text-lg font-bold sm:text-xl">Astro+Ts+ShadcnUI</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            <a
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
          </nav>
          <ModeToggle/>    
                <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-4">
                <a
                  href="/"
                  className="block px-2 py-1 text-lg hover:text-primary transition-colors"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="block px-2 py-1 text-lg hover:text-primary transition-colors"
                >
                  About
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

