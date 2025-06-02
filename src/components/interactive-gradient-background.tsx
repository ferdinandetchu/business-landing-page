
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
  // lastAppliedX/Y track the coordinates used in the last successful rAF update
  // lastMouseEventX/Y track the coordinates from the latest mouse event
  let lastAppliedX = useRef(-1000).current; // Start far off screen
  let lastAppliedY = useRef(-1000).current;
  let lastMouseEventX = useRef(-1000).current;
  let lastMouseEventY = useRef(-1000).current;
  let animationFrameId: number | null = null;

  useEffect(() => {
    const RENDER_THRESHOLD = 2; // Only update if mouse moved this many pixels

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        lastMouseEventX = event.clientX - rect.left;
        lastMouseEventY = event.clientY - rect.top;

        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(() => {
            if (containerRef.current) {
              const dx = Math.abs(lastMouseEventX - lastAppliedX);
              const dy = Math.abs(lastMouseEventY - lastAppliedY);

              if (dx >= RENDER_THRESHOLD || dy >= RENDER_THRESHOLD) {
                containerRef.current.style.setProperty('--mouse-x', `${lastMouseEventX}px`);
                containerRef.current.style.setProperty('--mouse-y', `${lastMouseEventY}px`);
                lastAppliedX = lastMouseEventX;
                lastAppliedY = lastMouseEventY;
              }
            }
            animationFrameId = null; // Reset after execution
          });
        }
      }
    };

    const handleMouseLeave = () => {
      lastMouseEventX = -500; // Target far-off position
      lastMouseEventY = -500;

      if (!animationFrameId) { // Similar logic to mousemove for scheduling update
        animationFrameId = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.setProperty('--mouse-x', `-500px`);
            containerRef.current.style.setProperty('--mouse-y', `-500px`);
            lastAppliedX = -500;
            lastAppliedY = -500;
          }
          animationFrameId = null; // Reset after execution
        });
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
        animationFrameId = null;
      }
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []); // lastAppliedX, lastAppliedY are stable refs for this effect's purpose

  return (
    <Component
      ref={containerRef as React.RefObject<any>}
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
