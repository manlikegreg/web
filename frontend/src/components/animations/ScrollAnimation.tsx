'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  distance?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  threshold = 0.1,
  once = true,
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { 
    once, 
    margin: '-50px',
    amount: threshold
  });

  // Check if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Respect user's motion preferences or mobile performance
  if (shouldReduceMotion || isMobile) {
    return <div className={`${className} mobile-optimized`}>{children}</div>;
  }

  const directionVariants = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 },
    fade: { opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
  };

  const animateVariants = {
    up: { y: 0, opacity: 1 },
    down: { y: 0, opacity: 1 },
    left: { x: 0, opacity: 1 },
    right: { x: 0, opacity: 1 },
    fade: { opacity: 1 },
    scale: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      className={`${className} mobile-optimized`}
      initial={directionVariants[direction]}
      animate={isInView ? animateVariants[direction] : directionVariants[direction]}
      transition={{
        duration: isMobile ? 0.3 : duration,
        delay: isMobile ? 0 : delay,
        ease: isMobile ? 'easeOut' : [0.25, 0.46, 0.45, 0.94],
        type: isMobile ? 'tween' : 'spring',
        stiffness: isMobile ? undefined : 100,
        damping: isMobile ? undefined : 20,
      }}
    >
      {children}
    </motion.div>
  );
}
