'use client';

import { motion } from 'framer-motion';
import { BookOpen, PenTool, Users, Calendar } from 'lucide-react';

const stats = [
  { icon: BookOpen, label: 'Articles', count: '25+' },
  { icon: PenTool, label: 'Authors', count: '15+' },
  { icon: Users, label: 'Readers', count: '2.5K+' },
  { icon: Calendar, label: 'Published', count: 'Monthly' },
];

export default function ArticlesHero() {
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
            Articles & <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-secondary-700 mb-12 max-w-3xl mx-auto">
            Explore insights, stories, and perspectives from Science 1B students, 
            teachers, and community members. Discover the latest in science, 
            education, and innovation.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {stat.count}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
