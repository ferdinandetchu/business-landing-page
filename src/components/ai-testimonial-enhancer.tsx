"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { enhanceTestimonial, type EnhanceTestimonialInput } from '@/ai/flows/enhance-testimonial';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AiTestimonialEnhancer() {
  const [originalTestimonial, setOriginalTestimonial] = useState('');
  const [enhancedTestimonial, setEnhancedTestimonial] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!originalTestimonial.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a testimonial to enhance.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setEnhancedTestimonial('');

    try {
      const input: EnhanceTestimonialInput = { testimonial: originalTestimonial };
      const result = await enhanceTestimonial(input);
      setEnhancedTestimonial(result.enhancedTestimonial);
      toast({
        title: "Success!",
        description: "Testimonial enhanced successfully.",
      });
    } catch (error) {
      console.error("Error enhancing testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to enhance testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="enhancer" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
            <CardTitle className="font-headline text-3xl font-bold text-primary sm:text-4xl">AI Testimonial Enhancer</CardTitle>
            <CardDescription className="mt-2 text-lg leading-8 text-foreground/80">
              Rewrite client testimonials into even more impactful snippets that capture user interest.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="originalTestimonial" className="block text-sm font-medium text-primary mb-1">
                Original Testimonial
              </label>
              <Textarea
                id="originalTestimonial"
                value={originalTestimonial}
                onChange={(e) => setOriginalTestimonial(e.target.value)}
                placeholder="Enter the client's original testimonial here..."
                rows={5}
                className="shadow-sm"
              />
            </div>
            <Button onClick={handleSubmit} disabled={isLoading} className="w-full text-lg py-3">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              Enhance with AI
            </Button>
            {enhancedTestimonial && (
              <div className="mt-6 p-4 border border-green-500 bg-green-50 rounded-md shadow">
                <h3 className="text-lg font-semibold text-green-700 mb-2">Enhanced Testimonial:</h3>
                <p className="text-green-600 whitespace-pre-wrap">{enhancedTestimonial}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
