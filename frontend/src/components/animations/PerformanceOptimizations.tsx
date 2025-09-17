'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface OptimizedMotionProps {
  children: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  whileHover?: any;
  whileTap?: any;
  transition?: any;
  [key: string]: any;
}

/**
 * Performance-optimized motion component that respects user's motion preferences
 * and uses hardware acceleration for smooth animations
 */
export default function OptimizedMotion({
  children,
  className = '',
  initial,
  animate,
  whileHover,
  whileTap,
  transition,
  ...props
}: OptimizedMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, return static element
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Optimized transition defaults
  const optimizedTransition = {
    duration: 0.3,
    ease: 'easeOut',
    ...transition,
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={optimizedTransition}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Lightweight scroll animation component with intersection observer optimization
 */
export function OptimizedScrollAnimation({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  ...props
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  [key: string]: any;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once: true, 
        margin: rootMargin,
        amount: threshold 
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      style={{
        willChange: 'transform, opacity',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Optimized stagger animation for lists
 */
export function OptimizedStaggerAnimation({
  children,
  className = '',
  staggerDelay = 0.1,
  ...props
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  [key: string]: any;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      {...props}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
