import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Target } from 'lucide-react';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#enhancer', label: 'AI Enhancer' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Target className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-semibold text-primary">Verity Solutions</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="font-medium text-foreground/70 transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-4">
            <Link href="#contact">Request Quote</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 p-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="font-medium text-foreground/70 transition-colors hover:text-foreground text-lg">
                    {link.label}
                  </Link>
                ))}
                <Button asChild size="lg" className="mt-4">
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
