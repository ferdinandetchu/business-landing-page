
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, Lightbulb, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import type React from 'react';

const AnimatedPhilosophyItem = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, staggerDelay: 150, index });
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out transform",
        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10' // Changed to slide from left
      )}
    >
      {children}
    </div>
  );
};

const AnimatedImage = ({ children }: { children: React.ReactNode }) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2, delay: 200 });
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out transform",
        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10' // Slide from right
      )}
    >
      {children}
    </div>
  );
};


export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-16 sm:py-24 bg-secondary/30 lg:min-h-screen lg:flex lg:items-center">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedPhilosophyItem index={0}>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
                Our Guiding Philosophy
              </h2>
            </AnimatedPhilosophyItem>
            <AnimatedPhilosophyItem index={1}>
              <p className="text-lg text-foreground/80 mb-6">
                At FYCARD Consulting and Outsourcing, we believe in a client-centric approach, rooted in integrity, innovation, and a relentless pursuit of excellence. Our philosophy guides every project, ensuring we deliver not just solutions, but lasting value and strategic advantage.
              </p>
            </AnimatedPhilosophyItem>
            <div className="space-y-6 mb-8">
              <AnimatedPhilosophyItem index={2}>
                <div className="flex items-start gap-4">
                  <Target className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary text-xl">Client-Centricity</h3>
                    <p className="text-foreground/70">Your goals are our priority. We tailor solutions to your unique needs, ensuring strategies are aligned with your vision for success.</p>
                  </div>
                </div>
              </AnimatedPhilosophyItem>
              <AnimatedPhilosophyItem index={3}>
                <div className="flex items-start gap-4">
                  <Lightbulb className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary text-xl">Innovation & Insight</h3>
                    <p className="text-foreground/70">We leverage cutting-edge methodologies and deep industry knowledge to provide forward-thinking solutions and actionable insights.</p>
                  </div>
                </div>
              </AnimatedPhilosophyItem>
              <AnimatedPhilosophyItem index={4}>
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary text-xl">Collaborative Partnership</h3>
                    <p className="text-foreground/70">We work as an extension of your team, fostering open communication and building strong relationships to achieve shared success.</p>
                  </div>
                </div>
              </AnimatedPhilosophyItem>
            </div>
            <AnimatedPhilosophyItem index={5}>
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="#contact">Partner With Us</Link>
              </Button>
            </AnimatedPhilosophyItem>
          </div>
          <AnimatedImage>
            <div className="relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team collaborating in a modern office setting"
                layout="fill"
                objectFit="cover"
                data-ai-hint="team collaboration office"
                className="transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
            </div>
          </AnimatedImage>
        </div>
      </div>
    </section>
  );
}

