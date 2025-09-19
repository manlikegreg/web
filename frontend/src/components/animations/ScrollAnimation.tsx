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

  // Respect user's motion preferences
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
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
      className={className}
      initial={directionVariants[direction]}
      animate={isInView ? animateVariants[direction] : directionVariants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother animations
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
