
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import type React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// SVG Icon for WhatsApp
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.31 20.62C8.75 21.39 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM12.04 20.13C10.56 20.13 9.12 19.75 7.89 19.03L7.49 18.8L4.54 19.62L5.38 16.76L5.16 16.36C4.35 15.03 3.83 13.5 3.83 11.91C3.83 7.39 7.54 3.69 12.04 3.69C16.54 3.69 20.25 7.39 20.25 11.91C20.25 16.43 16.54 20.13 12.04 20.13ZM16.88 14.48C16.71 14.41 15.56 13.85 15.36 13.77C15.17 13.69 15.02 13.65 14.89 13.89C14.76 14.13 14.31 14.67 14.17 14.83C14.04 14.99 13.9 15.01 13.66 14.89C13.42 14.77 12.62 14.51 11.67 13.66C10.93 12.99 10.44 12.18 10.31 11.94C10.17 11.69 10.29 11.57 10.41 11.46C10.51 11.35 10.65 11.17 10.77 11.03C10.88 10.89 10.93 10.78 11.04 10.57C11.16 10.34 11.1 10.14 11.04 10.02C10.98 9.9 10.55 8.83 10.37 8.4C10.2 7.97 10.03 8.02 9.9 8.02C9.87 8.01 9.75 8.01 9.62 8.01C9.49 8.01 9.27 8.06 9.08 8.3C8.88 8.55 8.39 9.01 8.39 10.14C8.39 11.27 9.09 12.34 9.21 12.5C9.33 12.66 10.65 14.77 12.69 15.64C13.63 16.05 14.34 16.24 14.83 16.39C15.45 16.57 15.97 16.54 16.35 16.44C16.78 16.32 17.56 15.84 17.73 15.38C17.91 14.92 17.91 14.53 17.85 14.41C17.79 14.29 17.66 14.23 17.5 14.13C17.33 14.04 17.05 13.95 16.88 14.48Z"
    />
  </svg>
);

export function FloatingActionButtons() {
  const whatsappNumber = "12345678900"; 
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false);

  const aiPromptDisplayDuration = 10000; 
  const whatsAppPromptDisplayDuration = 5000; // Changed from 15000 to 5000

  const aiPromptTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const whatsAppPromptTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerWhatsAppPrompt = useCallback(() => {
    if (aiPromptTimeoutRef.current) {
      clearTimeout(aiPromptTimeoutRef.current);
      aiPromptTimeoutRef.current = null;
    }
    setShowAIPrompt(false);
    
    if (!showWhatsAppPrompt && !whatsAppPromptTimeoutRef.current) { 
        setShowWhatsAppPrompt(true);
    }
  }, [showWhatsAppPrompt]); 

  // Effect to show the AI popover initially
  useEffect(() => {
    const initialShowTimer = setTimeout(() => {
      setShowAIPrompt(true);
    }, 5000); 
    return () => clearTimeout(initialShowTimer);
  }, []);

  // Effect for AI Popover: Auto-hide and trigger WhatsApp Popover
  useEffect(() => {
    if (showAIPrompt) {
      aiPromptTimeoutRef.current = setTimeout(triggerWhatsAppPrompt, aiPromptDisplayDuration);
    }
    return () => {
      if (aiPromptTimeoutRef.current) {
        clearTimeout(aiPromptTimeoutRef.current);
        aiPromptTimeoutRef.current = null;
      }
    };
  }, [showAIPrompt, triggerWhatsAppPrompt, aiPromptDisplayDuration]);

  // Effect to auto-hide WhatsApp popover
  useEffect(() => {
    if (showWhatsAppPrompt) {
      whatsAppPromptTimeoutRef.current = setTimeout(() => {
        setShowWhatsAppPrompt(false);
      }, whatsAppPromptDisplayDuration);
    }
    return () => {
      if (whatsAppPromptTimeoutRef.current) {
        clearTimeout(whatsAppPromptTimeoutRef.current);
        whatsAppPromptTimeoutRef.current = null;
      }
    };
  }, [showWhatsAppPrompt, whatsAppPromptDisplayDuration]);

  const handleAIButtonClick = () => {
    triggerWhatsAppPrompt(); 
    const advisorSection = document.getElementById('advisor');
    if (advisorSection) {
      advisorSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#advisor'; 
    }
  };
  
  const handleAIPopoverOpenChange = (open: boolean) => {
    if (!open && showAIPrompt) { 
      triggerWhatsAppPrompt(); 
    } else if (open && !showAIPrompt) { 
      if(aiPromptTimeoutRef.current) clearTimeout(aiPromptTimeoutRef.current);
      setShowAIPrompt(true);
    } else { 
       setShowAIPrompt(open);
    }
  };

  const handleWhatsAppButtonClick = () => {
    if (whatsAppPromptTimeoutRef.current) {
      clearTimeout(whatsAppPromptTimeoutRef.current);
      whatsAppPromptTimeoutRef.current = null;
    }
    setShowWhatsAppPrompt(false);
  };

  const handleWhatsAppPopoverOpenChange = (open: boolean) => {
    if (!open && showWhatsAppPrompt && whatsAppPromptTimeoutRef.current) { 
       clearTimeout(whatsAppPromptTimeoutRef.current);
       whatsAppPromptTimeoutRef.current = null;
    }
    setShowWhatsAppPrompt(open);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <Popover open={showAIPrompt} onOpenChange={handleAIPopoverOpenChange}>
          <PopoverTrigger asChild>
             <Button
                variant="default"
                size="icon"
                className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow animate-attention-bounce"
                aria-label="Try AI Business Assistant"
                title="Try AI Business Assistant"
                onClick={handleAIButtonClick} 
              >
                <Brain className="h-7 w-7" />
              </Button>
          </PopoverTrigger>
          <PopoverContent 
            side="left" 
            className="w-auto p-2 bg-background text-foreground border border-primary shadow-lg mr-2"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <p className="text-sm font-medium">Try the AI Business Assistant!</p>
          </PopoverContent>
        </Popover>
        
        <Popover open={showWhatsAppPrompt} onOpenChange={handleWhatsAppPopoverOpenChange}>
          <PopoverTrigger asChild>
            <Button
              asChild
              size="icon"
              className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow bg-accent text-accent-foreground hover:bg-green-500 hover:text-white"
              aria-label="Contact us on WhatsApp"
              title="Contact on WhatsApp"
              onClick={handleWhatsAppButtonClick} 
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I'd like to inquire about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-7 w-7" />
              </a>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            className="w-auto p-2 bg-background text-foreground border border-accent shadow-lg mr-2"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <p className="text-sm font-medium">Talk to one of our consultants!</p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
