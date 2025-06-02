
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const heroDescriptions = [
  "Expert Solutions for Complex Challenges. We specialize in scientific research rewriting, data analysis, business consulting, and project management.",
  "Driving Innovation Through Insightful Data Analysis and Strategic Business Consulting.",
  "Your Partner in Scientific Advancement, Business Growth, and Project Excellence.",
  "Transforming Ideas into Impactful Results with Our Comprehensive Suite of Services."
];

export function HeroSection() {
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const textChangeInterval = 4000; // Time each text is visible
    const fadeDuration = 500; // Duration of the fade animation

    const intervalId = setInterval(() => {
      setIsFading(true); // Start fade out

      setTimeout(() => {
        setCurrentDescriptionIndex((prevIndex) => (prevIndex + 1) % heroDescriptions.length);
        setIsFading(false); // Start fade in
      }, fadeDuration);
    }, textChangeInterval + fadeDuration); // Total cycle time

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-visible -mt-14"
    >
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
      <div className="relative flex-grow flex flex-col justify-center items-center z-10 pt-14"> {/* Added pt-14 to offset navbar height */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            FYCARD Consulting and Outsourcing
          </h1>
          <p
            className={cn(
              "mt-6 max-w-3xl mx-auto text-lg leading-8 text-neutral-200 sm:text-xl transition-opacity duration-500 ease-in-out",
              isFading ? "opacity-0" : "opacity-100"
            )}
          >
            {heroDescriptions[currentDescriptionIndex]}
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
