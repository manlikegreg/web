'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, Medal, Star } from 'lucide-react';

const achievements = [
  {
    id: '1',
    title: 'Science Fair Champions',
    description: 'First place in the regional science fair with our innovative renewable energy project',
    year: 2024,
    category: 'academic' as const,
    icon: Trophy,
  },
  {
    id: '2',
    title: 'Debate Competition Winners',
    description: 'Won the inter-school debate competition on climate change and sustainability',
    year: 2024,
    category: 'academic' as const,
    icon: Award,
  },
  {
    id: '3',
    title: 'Sports Excellence',
    description: 'Champions in the school athletics competition, setting new records',
    year: 2023,
    category: 'sports' as const,
    icon: Medal,
  },
  {
    id: '4',
    title: 'Community Service Award',
    description: 'Recognized for outstanding community service and environmental initiatives',
    year: 2023,
    category: 'leadership' as const,
    icon: Star,
  },
];

export default function Achievements() {
  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Our Achievements
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Celebrating our successes and milestones that showcase the excellence and dedication 
            of Science 1B students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-secondary-600 text-sm mb-4">
                  {achievement.description}
                </p>
                <div className="text-primary-600 font-semibold">
                  {achievement.year}
                </div>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    achievement.category === 'academic' 
                      ? 'bg-primary-100 text-primary-700'
                      : achievement.category === 'sports'
                      ? 'bg-accent-100 text-accent-700'
                      : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Proud of Our Progress
            </h3>
            <p className="text-secondary-600 mb-6">
              These achievements represent just the beginning of our journey. We continue to strive 
              for excellence in all areas of academic and personal development.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
                <div className="text-sm text-secondary-600">Pass Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">95%</div>
                <div className="text-sm text-secondary-600">University Admission</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">50+</div>
                <div className="text-sm text-secondary-600">Scholarships</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
