import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        {/* Subtle background pattern or abstract shapes if desired */}
      </div>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
          FYCARD Consulting and Outsourcing
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-foreground/80 sm:text-xl">
          Expert Solutions for Complex Challenges. We specialize in scientific research rewriting, data analysis, business consulting, and project management.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="#services">Our Services</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
