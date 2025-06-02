import { testimonials, type Testimonial } from '@/data/testimonials';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            Real stories from satisfied partners who achieved their goals with our help.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
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
          ))}
        </div>

        <div className="mt-16 text-center">
            <Card className="max-w-md mx-auto p-6 shadow-lg">
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
      </div>
    </section>
  );
}
