
"use client";

import { services, type Service } from '@/data/services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InteractiveGradientBackground } from '@/components/interactive-gradient-background';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const AnimatedServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, staggerDelay: 100, index });
  return (
    <Card
      ref={ref}
      className={cn(
        'group flex flex-col shadow-lg hover:shadow-2xl transition-all duration-700 ease-out transform',
        'bg-primary text-primary-foreground border-0 overflow-hidden',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <service.icon className="h-10 w-10 text-primary-foreground" aria-hidden="true" />
        <CardTitle className="font-headline text-xl text-primary-foreground">{service.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-primary-foreground/80">{service.description}</p>
        {service.longDescription && (
          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-primary-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {service.longDescription.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        )}
      </CardContent>
      <div className="p-6 pt-0 mt-auto">
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link href={`#contact?service=${encodeURIComponent(service.name)}`}>Request This Service</Link>
        </Button>
      </div>
    </Card>
  );
};

export function ServicesSection() {
  return (
    <InteractiveGradientBackground
      as="section"
      id="services"
      className="py-16 sm:py-24 bg-primary"
      randomIdle={true}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">Our Core Services</h2>
          <p className="mt-4 text-lg leading-8 text-primary-foreground/90">
            Empowering you with tailored solutions to meet your unique needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          {services.map((service, index) => (
            <AnimatedServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </InteractiveGradientBackground>
  );
}
