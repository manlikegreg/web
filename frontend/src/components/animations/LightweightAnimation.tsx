'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LightweightAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function LightweightAnimation({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
}: LightweightAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '-50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || (once && hasAnimated)) {
    return <div className={className}>{children}</div>;
  }

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}s ease-out`,
      transitionDelay: `${delay}ms`,
    };

    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return { ...baseStyles, opacity: 0 };
        case 'slideUp':
          return { ...baseStyles, opacity: 0, transform: 'translateY(30px)' };
        case 'slideDown':
          return { ...baseStyles, opacity: 0, transform: 'translateY(-30px)' };
        case 'slideLeft':
          return { ...baseStyles, opacity: 0, transform: 'translateX(30px)' };
        case 'slideRight':
          return { ...baseStyles, opacity: 0, transform: 'translateX(-30px)' };
        case 'scale':
          return { ...baseStyles, opacity: 0, transform: 'scale(0.8)' };
        default:
          return { ...baseStyles, opacity: 0 };
      }
    }

    return {
      ...baseStyles,
      opacity: 1,
      transform: 'translate(0, 0) scale(1)',
    };
  };

  return (
    <div
      ref={ref}
      className={className}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  );
}

// Stagger animation component
export function StaggerAnimation({
  children,
  className = '',
  staggerDelay = 0.1,
  ...props
}: {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <div className={className} {...props}>
      {children.map((child, index) => (
        <LightweightAnimation
          key={index}
          delay={index * staggerDelay * 1000}
          animation="fadeIn"
        >
          {child}
        </LightweightAnimation>
      ))}
    </div>
  );
}