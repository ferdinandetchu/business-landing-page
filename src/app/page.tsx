
import { Suspense } from 'react';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { PhilosophySection } from '@/components/philosophy-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { BusinessAdvisorTool } from '@/components/business-advisor-tool';
import { ContactSection } from '@/components/contact-section';
import { Navbar } from '@/components/layout/navbar'; // Import Navbar

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar /> {/* Navbar is rendered here, outside and before HeroSection */}
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <PhilosophySection />
        <TestimonialsSection />
        <BusinessAdvisorTool /> {/* Assuming BusinessAdvisorTool does not use useSearchParams or is already handled */}
        <Suspense fallback={<div>Loading contact form...</div>}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
