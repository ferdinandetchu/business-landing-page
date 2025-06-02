
"use client";

import React, { useRef, useEffect, type HTMLAttributes, type ElementType, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveGradientBackgroundProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: ElementType;
  randomIdle?: boolean;
}

export function InteractiveGradientBackground({
  children,
  className,
  as: Component = 'div',
  randomIdle = false,
  ...props
}: InteractiveGradientBackgroundProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const randomMovementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  
  const lastMousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const lastAppliedPositionRef = useRef<{ x: number; y: number } | null>(null);

  const updateGradient = useCallback((x: number, y: number) => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      lastAppliedPositionRef.current = { x, y };
    }
  }, []);

  const scheduleUpdate = useCallback((x: number, y: number, forceUpdate = false) => {
    lastMousePositionRef.current = { x, y };

    if (animationFrameIdRef.current === null) {
      animationFrameIdRef.current = requestAnimationFrame(() => {
        if (lastMousePositionRef.current) {
          const RENDER_THRESHOLD = 2; // Only update if mouse moved this many pixels
          const { x: targetX, y: targetY } = lastMousePositionRef.current;
          
          const prevX = lastAppliedPositionRef.current?.x ?? -Infinity;
          const prevY = lastAppliedPositionRef.current?.y ?? -Infinity;

          const dx = Math.abs(targetX - prevX);
          const dy = Math.abs(targetY - prevY);

          // Force update for random jumps or if threshold met or if it's the first update
          if (forceUpdate || dx >= RENDER_THRESHOLD || dy >= RENDER_THRESHOLD || !lastAppliedPositionRef.current) {
            updateGradient(targetX, targetY);
          }
        }
        animationFrameIdRef.current = null;
      });
    }
  }, [updateGradient]);

  const startOrUpdateRandomMovement = useCallback(() => {
    if (randomMovementIntervalRef.current) {
      clearInterval(randomMovementIntervalRef.current);
      randomMovementIntervalRef.current = null;
    }

    if (containerRef.current && randomIdle && !isHovering) {
      const move = () => {
        if (containerRef.current) { // Check ref again inside interval
          const rect = containerRef.current.getBoundingClientRect();
          const randomX = Math.random() * rect.width;
          const randomY = Math.random() * rect.height;
          // For random movement, we want to bypass the threshold and update directly.
          // So, call updateGradient directly or ensure forceUpdate is true.
          requestAnimationFrame(() => updateGradient(randomX, randomY));
        }
      };
      move(); // Initial move for the random position
      randomMovementIntervalRef.current = setInterval(move, 2500); // e.g., move every 2.5 seconds
    }
  }, [randomIdle, isHovering, updateGradient]); // updateGradient was missing

  useEffect(() => {
    startOrUpdateRandomMovement();
    return () => {
      if (randomMovementIntervalRef.current) {
        clearInterval(randomMovementIntervalRef.current);
        randomMovementIntervalRef.current = null;
      }
    };
  }, [isHovering, randomIdle, startOrUpdateRandomMovement]);


  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (randomMovementIntervalRef.current) {
        clearInterval(randomMovementIntervalRef.current);
        randomMovementIntervalRef.current = null;
      }
      if (!isHovering) {
        setIsHovering(true);
      }
      
      const rect = currentRef.getBoundingClientRect();
      scheduleUpdate(event.clientX - rect.left, event.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      // If not using random idle, move gradient off-screen
      if (!randomIdle) {
        scheduleUpdate(-500, -500, true); // force update to move it off
      }
      // If randomIdle is true, the other useEffect will handle restarting random movement
      // when isHovering becomes false.
    };

    currentRef.addEventListener('mousemove', handleMouseMove, { passive: true });
    currentRef.addEventListener('mouseleave', handleMouseLeave);

    // Set initial position for randomIdle to center if not hovering
    if (randomIdle && !isHovering && currentRef) {
        const rect = currentRef.getBoundingClientRect();
        scheduleUpdate(rect.width / 2, rect.height / 2, true);
    }


    return () => {
      currentRef.removeEventListener('mousemove', handleMouseMove);
      currentRef.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      // Interval is cleared by the other useEffect
    };
  }, [randomIdle, scheduleUpdate, isHovering]); // Added isHovering

  return (
    <Component
      ref={containerRef as React.RefObject<any>}
      className={cn('interactive-gradient-parent', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
