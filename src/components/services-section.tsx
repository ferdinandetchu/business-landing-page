import { services, type Service } from '@/data/services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Core Services</h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            Empowering you with tailored solutions to meet your unique needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <service.icon className="h-10 w-10 text-accent" aria-hidden="true" />
                <CardTitle className="font-headline text-xl text-primary">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/70">{service.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`#contact?service=${encodeURIComponent(service.name)}`}>Request This Service</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
