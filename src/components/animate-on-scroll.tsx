"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  reanimate?: boolean;
}

export const AnimateOnScroll = ({ children, className, delay = 0, reanimate = false }: AnimateOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!reanimate) {
            observer.unobserve(element);
          }
        } else {
            if (reanimate) {
                setIsVisible(false);
            }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      if(element) {
        observer.unobserve(element);
      }
    };
  }, [reanimate]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
