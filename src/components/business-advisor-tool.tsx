
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getBusinessAdvice, type BusinessAdvisorInput, type BusinessAdvisorOutput } from '@/ai/flows/business-advisor-flow';
import { Loader2, Lightbulb, Brain, ListChecks } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import type React from 'react';

const formSchema = z.object({
  problemDescription: z.string().min(10, { message: "Problem description must be at least 10 characters." }).max(2000, {message: "Problem description must be at most 2000 characters."}),
  businessContext: z.string().max(1000, {message: "Business context must be at most 1000 characters."}).optional(),
});

type BusinessAdvisorFormValues = z.infer<typeof formSchema>;

const AnimatedToolCard = ({ children }: { children: React.ReactNode }) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, delay: 100 });
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

const AnimatedResultCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, delay: 100 + index * 100 });
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

export function BusinessAdvisorTool() {
  const [advice, setAdvice] = useState<string | null>(null);
  const [nextSteps, setNextSteps] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<BusinessAdvisorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemDescription: "",
      businessContext: "",
    },
  });

  const handleSubmit = async (data: BusinessAdvisorFormValues) => {
    setIsLoading(true);
    setAdvice(null);
    setNextSteps(null);

    try {
      const input: BusinessAdvisorInput = { 
        problemDescription: data.problemDescription,
        businessContext: data.businessContext || undefined, 
      };
      const result: BusinessAdvisorOutput = await getBusinessAdvice(input);
      setAdvice(result.advice);
      setNextSteps(result.potentialNextSteps);
      toast({
        title: "Advice Generated!",
        description: "Your business advice has been successfully generated.",
      });
    } catch (error) {
      console.error("Error getting business advice:", error);
      let errorMessage = "Failed to get business advice. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="advisor" className="py-16 sm:py-24 bg-background lg:min-h-screen lg:flex lg:items-center">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedToolCard>
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="font-headline text-3xl font-bold text-primary sm:text-4xl">AI Business Advisor</CardTitle>
              <CardDescription className="mt-2 text-lg leading-8 text-foreground/80">
                Describe your business challenge or question and get AI-powered insights and recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="problemDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary">Business Problem/Question</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Clearly describe the business problem, challenge, or question you need advice on..."
                            rows={5}
                            className="shadow-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessContext"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary">Business Context (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide any relevant context about your business (e.g., industry, size, target market, current situation)..."
                            rows={3}
                            className="shadow-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full text-lg py-3">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Lightbulb className="mr-2 h-5 w-5" />
                    )}
                    Get AI Advice
                  </Button>
                </form>
              </Form>

              {(advice || (nextSteps && nextSteps.length > 0)) && (
                <div className="mt-8 space-y-6">
                  {advice && (
                    <AnimatedResultCard index={0}>
                      <Card className="border-primary/50 bg-primary/5">
                        <CardHeader>
                          <CardTitle className="text-xl text-primary flex items-center">
                            <Lightbulb className="mr-2 h-6 w-6" /> AI Generated Advice
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground/90 whitespace-pre-wrap">{advice}</p>
                        </CardContent>
                      </Card>
                    </AnimatedResultCard>
                  )}
                  {nextSteps && nextSteps.length > 0 && (
                    <AnimatedResultCard index={advice ? 1 : 0}>
                      <Card className="border-accent/50 bg-accent/5">
                        <CardHeader>
                          <CardTitle className="text-xl text-accent flex items-center">
                            <ListChecks className="mr-2 h-6 w-6" /> Potential Next Steps
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-2 text-foreground/90">
                            {nextSteps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </AnimatedResultCard>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedToolCard>
      </div>
    </section>
  );
}
