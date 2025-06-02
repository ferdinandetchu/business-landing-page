
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import type React from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  service: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const AnimatedContactCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, staggerDelay: 150, index, triggerOnce: true });
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

export function ContactSection() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  useEffect(() => {
    const serviceQueryParam = searchParams.get('service');
    if (serviceQueryParam) {
      form.setValue('service', serviceQueryParam);
    }
  }, [searchParams, form]);


  async function onSubmit(data: ContactFormValues) {
    console.log("Form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <section 
      id="contact" 
      className="py-16 sm:py-24 bg-radial-primary-accent" 
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-lg leading-8 text-primary-foreground/90">
            Have questions or ready to start a project? Contact us today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <AnimatedContactCard index={0}>
            <Card className="shadow-xl h-full bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Send Us a Message</CardTitle>
                <CardDescription>Fill out the form and we'll respond as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="shadow-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} className="shadow-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service of Interest (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Data Analysis" {...field} className="shadow-sm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project or inquiry..."
                              rows={5}
                              {...field}
                              className="shadow-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full text-lg py-3" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimatedContactCard>

          <AnimatedContactCard index={1}>
            <div className="space-y-8 h-full"> 
              <Card className="shadow-xl h-full bg-card/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary">Direct Contact</CardTitle>
                  <CardDescription>Reach out to us directly through these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-accent" />
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <a href="mailto:info@fycardconsulting.com" className="text-muted-foreground hover:text-primary transition-colors">
                        info@fycardconsulting.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-accent" />
                    <div>
                      <h4 className="font-semibold text-foreground">Phone</h4>
                      <a href="tel:+237671097299" className="text-muted-foreground hover:text-primary transition-colors">
                        +237671097299
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-accent" />
                    <div>
                      <h4 className="font-semibold text-foreground">Office</h4>
                      <p className="text-muted-foreground">CM Buea, Sosoliso</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedContactCard>
        </div>
      </div>
    </section>
  );
}
