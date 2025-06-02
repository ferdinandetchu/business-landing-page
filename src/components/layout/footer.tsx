
"use client";

import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer 
      className="border-t border-primary-foreground/20 bg-primary bg-circles-overlay" 
    >
      <div className="container flex flex-col items-center justify-center gap-2 py-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm leading-loose text-primary-foreground/90">
          © {currentYear || new Date().getFullYear()} FYCARD Consulting and Outsourcing. All rights reserved.
        </p>
        <p className="text-center text-xs text-primary-foreground/90">
          <a 
            href="https://www.paveway.tech" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-accent transition-colors underline"
          >
            Designed & Developed by PaveWay Technologies
          </a>
        </p>
      </div>
    </footer>
  );
}
