
"use client";

import { testimonials, type Testimonial } from '@/data/testimonials';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { InteractiveGradientBackground } from '@/components/interactive-gradient-background';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import type React from 'react';

const AnimatedSentimentCard = ({ children }: { children: React.ReactNode }) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, delay: 200 });
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out transform",
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      {children}
    </div>
  );
};

const AnimatedTestimonialWrapper = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, triggerOnce: false, staggerDelay: 150, index });
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out transform h-full",
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      {children}
    </div>
  );
};

const AnimatedClientLogo = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, staggerDelay: 100, index });
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

export function TestimonialsSection() {
  const clientLogos = [
    { id: 'logo1', src: 'https://placehold.co/150x60.png', alt: 'Client Logo 1', dataAiHint: 'company logo' },
    { id: 'logo2', src: 'https://placehold.co/150x60.png', alt: 'Client Logo 2', dataAiHint: 'tech company' },
    { id: 'logo3', src: 'https://placehold.co/150x60.png', alt: 'Client Logo 3', dataAiHint: 'finance logo' },
    { id: 'logo4', src: 'https://placehold.co/150x60.png', alt: 'Client Logo 4', dataAiHint: 'startup logo' },
    { id: 'logo5', src: 'https://placehold.co/150x60.png', alt: 'Client Logo 5', dataAiHint: 'global firm' },
  ];

  return (
    <InteractiveGradientBackground
      as="section"
      id="testimonials"
      className="py-16 sm:py-24 bg-primary"
      randomIdle={true}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 text-lg leading-8 text-primary-foreground/90">
            Real stories from satisfied partners who achieved their goals with our help.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="basis-full sm:basis-1/2 lg:basis-1/3 p-2">
                <AnimatedTestimonialWrapper index={index}>
                    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background text-foreground">
                      <CardContent className="pt-6 flex-grow flex flex-col">
                        <Quote className="h-8 w-8 text-accent mb-4" />
                        <p className="text-foreground/70 italic flex-grow">"{testimonial.quote}"</p>
                        <div className="mt-6 flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.clientName} data-ai-hint={testimonial.dataAiHint} />
                            <AvatarFallback>{testimonial.clientName.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-primary">{testimonial.clientName}</p>
                            {testimonial.clientRole && testimonial.company && (
                              <p className="text-sm text-muted-foreground">{testimonial.clientRole}, {testimonial.company}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                </AnimatedTestimonialWrapper>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        <div className="mt-16 pt-12 border-t border-primary-foreground/20">
          <h3 className="font-headline text-2xl font-semibold text-primary-foreground text-center mb-8">
            Trusted By Leading Organizations
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {clientLogos.map((logo, index) => (
              <AnimatedClientLogo key={logo.id} index={index}>
                <div className="relative h-12 w-36 filter grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    layout="fill"
                    objectFit="contain"
                    data-ai-hint={logo.dataAiHint}
                  />
                </div>
              </AnimatedClientLogo>
            ))}
          </div>
        </div>

        <AnimatedSentimentCard>
          <div className="mt-16 text-center">
              <Card className="max-w-md mx-auto p-6 shadow-lg bg-background text-foreground">
                <h3 className="font-headline text-xl font-semibold text-primary mb-2">Overall Client Sentiment</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-6 w-6 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-lg font-medium text-foreground/80">(4.8 / 5.0)</span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">Based on aggregated client feedback.</p>
                <Progress value={96} className="w-full h-2" />
                <p className="text-sm text-accent font-medium mt-2">96% Positive Feedback</p>
              </Card>
          </div>
        </AnimatedSentimentCard>
      </div>
    </InteractiveGradientBackground>
  );
}
