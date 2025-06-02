
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number; // Delay in ms before animation starts
  staggerDelay?: number; // Base delay for staggering, if an index is provided
  index?: number; // Optional index for staggering
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, triggerOnce = true, delay = 0, staggerDelay = 0, index = 0 } = options;
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  const effectiveDelay = delay + (staggerDelay * index);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    if (triggerOnce && hasBeenInView) {
      setIsInView(true); // Ensure it stays in the "inView" state if already triggered
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
            if (triggerOnce) {
              setHasBeenInView(true);
               // Unobserve after triggering if triggerOnce is true
              if (currentElement) { // Check currentElement again before unobserving
                observer.unobserve(currentElement);
              }
            }
          }, effectiveDelay);
        } else {
          if (!triggerOnce) {
            setIsInView(false);
          }
        }
      },
      { threshold }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, threshold, triggerOnce, hasBeenInView, effectiveDelay]);

  return { ref: setRef, isInView };
}
