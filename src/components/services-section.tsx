
import { services, type Service } from '@/data/services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InteractiveGradientBackground } from '@/components/interactive-gradient-background';

export function ServicesSection() {
  return (
    <InteractiveGradientBackground
      as="section"
      id="services"
      className="py-16 sm:py-24 bg-primary"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">Our Core Services</h2>
          <p className="mt-4 text-lg leading-8 text-primary-foreground/90">
            Empowering you with tailored solutions to meet your unique needs. Hover over a service to see more details.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="group flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-primary text-primary-foreground border-0 overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <service.icon className="h-10 w-10 text-primary-foreground" aria-hidden="true" />
                <CardTitle className="font-headline text-xl text-primary-foreground">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-primary-foreground/80">{service.description}</p>
                {service.longDescription && (
                  <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-primary-foreground/70 hidden group-hover:block">
                    {service.longDescription.map((detail, index) => (
                      <li key={index}>{detail}</li>
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
          ))}
        </div>
      </div>
    </InteractiveGradientBackground>
  );
}
