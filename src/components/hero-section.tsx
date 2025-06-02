
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const catchyPhrases = [
  "FYCARD Consulting and Outsourcing",
  "Your Strategic Growth Partner",
  "Insightful Solutions, Tangible Results",
  "Navigating Complexity, Delivering Clarity",
  "Expertise You Can Trust"
];

const staticHeroDescription = "Expert Solutions for Complex Challenges. We specialize in scientific research rewriting, data analysis, business consulting, and project management.";

export function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const phraseChangeInterval = 5000; // Change phrase every 5 seconds
    const fadeDuration = 500; // 0.5 second fade

    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % catchyPhrases.length);
        setIsFading(false);
      }, fadeDuration);
    }, phraseChangeInterval);

    return () => {
      clearInterval(timer);
      // Clear any pending timeouts if component unmounts
      // This might require storing the setTimeout id if more complex logic is needed
    };
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
          <h1
            className={cn(
              "font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl transition-opacity duration-500 ease-in-out",
              isFading ? "opacity-0" : "opacity-100"
            )}
            style={{ minHeight: '3em' }} // Add min-height to prevent layout shift, adjust as needed
          >
            {catchyPhrases[currentPhraseIndex]}
          </h1>
          <p
            className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-neutral-200 sm:text-xl"
          >
            {staticHeroDescription}
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
