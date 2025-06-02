
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const catchyPhrases = [
  "FYCARD Consulting and Outsourcing",
  "Your Strategic Growth Partner",
  "Insightful Solutions, Tangible Results",
  "Navigating Complexity, Delivering Clarity",
  "Expertise You Can Trust"
];

const staticHeroDescription = "Expert Solutions for Complex Challenges. We specialize in scientific research rewriting, data analysis, business consulting, and project management.";

const TYPING_SPEED = 100; // Milliseconds per character
const DELETING_SPEED = 70; // Milliseconds per character
const PAUSE_DURATION = 2000; // Milliseconds to pause after typing, before deleting

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (subIndex > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(catchyPhrases[phraseIndex].substring(0, subIndex - 1));
          setSubIndex(subIndex - 1);
        }, DELETING_SPEED);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % catchyPhrases.length);
        // subIndex will reset to 0 naturally via the other branch
      }
    } else { // Typing
      if (subIndex < catchyPhrases[phraseIndex].length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(catchyPhrases[phraseIndex].substring(0, subIndex + 1));
          setSubIndex(subIndex + 1);
        }, TYPING_SPEED);
      } else { // Finished typing
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_DURATION);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [subIndex, isDeleting, phraseIndex]);


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
            className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl min-h-[1.2em]" // min-h to prevent collapse, adjust as needed
          >
            {displayedText || <>&nbsp;</>}
            <span className="animate-blink text-accent ml-1">|</span>
          </h1>
          <p
            className="mt-4 max-w-3xl mx-auto text-lg leading-8 text-neutral-200 sm:text-xl"
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
