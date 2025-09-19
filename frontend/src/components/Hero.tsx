'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

// Animated Particle Component
const Particle = ({ delay = 0, index = 0 }: { delay?: number; index?: number }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="absolute w-2 h-2 bg-white rounded-full opacity-20"
      initial={{ 
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
        scale: 0
      }}
      animate={{
        y: [null, -100],
        scale: [0, 1, 0],
        opacity: [0, 0.6, 0]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }}
    />
  );
};

// Particle Field Component
const ParticleField = () => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Create 50 particles
    setParticles(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((_, index) => (
        <Particle key={index} delay={index * 0.1} index={index} />
      ))}
    </div>
  );
};

export default function Hero() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('about-preview');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600" />
      
      {/* Animated particles */}
      <ParticleField />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24 lg:py-32">
        {/* Animated headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight"
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block text-responsive-lg sm:text-responsive-xl"
          >
            Welcome to
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="block bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent"
          >
            Science 1B
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-normal text-white/90 mt-2 sm:mt-4"
          >
            St. John's Grammar SHS
          </motion.span>
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-12 max-w-4xl mx-auto font-light px-4"
        >
          Excellence in Science, Innovation, and Teamwork
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="group inline-flex items-center justify-center px-6 py-4 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-primary-700 bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-accent-50 touch-target"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">Explore Magazine</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer touch-target"
        onClick={scrollToNext}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
        >
          <span className="text-xs sm:text-sm font-medium mb-2">Scroll Down</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1 sm:mt-2"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-300/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-white/5 rounded-full blur-lg animate-bounce" />
      <div className="absolute top-1/3 right-20 w-20 h-20 bg-accent-200/10 rounded-full blur-lg animate-bounce" />
    </section>
  );
}