'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, Award, Target } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-primary-200 rounded-full opacity-60 animate-pulse-slow" />
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-accent-200 rounded-full opacity-60 animate-bounce-slow" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6">
            About <span className="text-gradient">Science 1B</span>
          </h1>
          <p className="text-xl text-secondary-700 mb-12 max-w-3xl mx-auto">
            Discover our story, values, and the incredible journey of Science 1B at 
            St. John's Grammar Senior High School, Achimota.
          </p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-1">45+</div>
              <div className="text-sm text-secondary-600">Students</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-accent-600" />
              </div>
              <div className="text-3xl font-bold text-accent-600 mb-1">3</div>
              <div className="text-sm text-secondary-600">Years</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-1">15+</div>
              <div className="text-sm text-secondary-600">Awards</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-accent-600" />
              </div>
              <div className="text-3xl font-bold text-accent-600 mb-1">100%</div>
              <div className="text-sm text-secondary-600">Pass Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
