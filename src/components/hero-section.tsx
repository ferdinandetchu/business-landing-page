
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Navbar } from '@/components/layout/navbar'; // Import Navbar

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-visible" // Added overflow-visible
    >
      <Navbar /> {/* Render Navbar here, it will stick to the top */}

      {/* Background Image and Overlay - covers the entire section */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Modern dining room with wooden table and chairs, minimalist decor"
          layout="fill"
          objectFit="cover"
          className="filter blur-sm animate-zoom-in-out"
          priority
          data-ai-hint="modern dining room"
        />
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay for text readability */}
      </div>

      {/* Container for the hero text content, centered in the remaining space */}
      <div className="relative flex-grow flex flex-col justify-center items-center z-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
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
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow bg-transparent border-neutral-300 text-neutral-100 hover:bg-white/10 hover:text-white">
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
