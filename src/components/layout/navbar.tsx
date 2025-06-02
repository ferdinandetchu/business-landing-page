
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#advisor', label: 'AI Advisor' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoColorClass = isScrolled ? 'text-primary' : 'text-white';
  const navLinkColorClass = isScrolled ? 'text-foreground/70 hover:text-foreground' : 'text-white/90 hover:text-white';
  const mobileMenuIconColorClass = isScrolled ? 'text-foreground' : 'text-white';
  
  const requestQuoteButtonClasses = isScrolled 
    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
    : "bg-white/90 text-primary hover:bg-white";

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Target className={cn("h-7 w-7 transition-colors", logoColorClass)} />
          <span className={cn("font-headline text-base md:text-lg font-semibold transition-colors", logoColorClass)}>
            FYCARD<span className="hidden md:inline"> Consulting and Outsourcing</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className={cn("font-medium transition-colors", navLinkColorClass)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className={cn("ml-4 transition-colors", requestQuoteButtonClasses)}>
            <Link href="#contact">Request Quote</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("transition-colors", mobileMenuIconColorClass, isScrolled ? "hover:bg-accent hover:text-accent-foreground" : "hover:bg-white/20")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background text-foreground">
              <nav className="flex flex-col gap-6 p-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="font-medium text-foreground/70 transition-colors hover:text-foreground text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild size="lg" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="#contact">Request Quote</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
