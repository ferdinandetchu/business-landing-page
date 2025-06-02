"use client";

import React, { useRef, useEffect, type HTMLAttributes, type ElementType } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveGradientBackgroundProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: ElementType;
}

export function InteractiveGradientBackground({
  children,
  className,
  as: Component = 'div',
  ...props
}: InteractiveGradientBackgroundProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const RENDER_THRESHOLD = 2; // Only update if mouse moved this many pixels
    let lastX = -RENDER_THRESHOLD -1;
    let lastY = -RENDER_THRESHOLD -1;
    let animationFrameId: number | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (Math.abs(x - lastX) < RENDER_THRESHOLD && Math.abs(y - lastY) < RENDER_THRESHOLD && animationFrameId !== null) {
          return;
        }
        lastX = x;
        lastY = y;
        
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
          if (containerRef.current) { // Check ref again inside rAF
            containerRef.current.style.setProperty('--mouse-x', `${x}px`);
            containerRef.current.style.setProperty('--mouse-y', `${y}px`);
          }
        });
      }
    };

    const handleMouseLeave = () => {
       if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      if (containerRef.current) {
        // Set to a far-off position to animate out smoothly
        containerRef.current.style.setProperty('--mouse-x', `-500px`);
        containerRef.current.style.setProperty('--mouse-y', `-500px`);
      }
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove, { passive: true });
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <Component
      ref={containerRef}
      className={cn(
        'interactive-gradient-parent',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}