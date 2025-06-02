import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { AiTestimonialEnhancer } from '@/components/ai-testimonial-enhancer';
import { ContactSection } from '@/components/contact-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <AiTestimonialEnhancer />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
