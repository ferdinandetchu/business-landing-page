import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full py-20 md:py-32 lg:py-40">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Diverse professionals collaborating in a modern office"
          layout="fill"
          objectFit="cover"
          className="filter blur-sm" 
          data-ai-hint="professionals collaboration"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay for text readability */}
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          FYCARD Consulting and Outsourcing
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-neutral-200 sm:text-xl">
          Expert Solutions for Complex Challenges. We specialize in scientific research rewriting, data analysis, business consulting, and project management.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="#services">Our Services</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow border-neutral-300 text-neutral-100 hover:bg-white/10 hover:text-white">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      {/* Gradient fade to transition smoothly to the next section */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
  );
}
