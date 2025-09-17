'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Trophy, Star } from 'lucide-react';

const milestones = [
  {
    year: '2021',
    title: 'Formation of Science 1B',
    description: 'Science 1B was established as part of the science program at St. John\'s Grammar SHS, bringing together students passionate about scientific inquiry and discovery.',
    icon: BookOpen,
  },
  {
    year: '2022',
    title: 'First Major Achievement',
    description: 'Our class won the regional science fair with an innovative project on sustainable energy solutions, marking our first major recognition.',
    icon: Trophy,
  },
  {
    year: '2023',
    title: 'Community Impact',
    description: 'Launched our community outreach program, conducting science workshops in local schools and organizing environmental conservation initiatives.',
    icon: Users,
  },
  {
    year: '2024',
    title: 'Academic Excellence',
    description: 'Achieved 100% pass rate in WASSCE with several students receiving university scholarships and recognition for outstanding performance.',
    icon: Star,
  },
];

export default function ClassHistory() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            From our humble beginnings to becoming one of the most recognized science classes 
            in the region, here's our story of growth, achievement, and impact.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 to-accent-200 hidden md:block" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="card p-8 group hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary-600">{milestone.year}</div>
                          <h3 className="text-xl font-semibold text-secondary-900">
                            {milestone.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-secondary-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex w-8 h-8 bg-white border-4 border-primary-500 rounded-full items-center justify-center z-10">
                    <div className="w-3 h-3 bg-primary-500 rounded-full" />
                  </div>

                  {/* Spacer for odd items */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-8' : 'md:pr-8'}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Looking Forward
            </h3>
            <p className="text-lg text-secondary-600 mb-6">
              As we continue our journey, Science 1B remains committed to excellence in education, 
              innovation in science, and making a positive impact in our community and beyond. 
              Our story is still being written, and we invite you to be part of it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Academic Excellence
              </span>
              <span className="px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                Innovation
              </span>
              <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Community Service
              </span>
              <span className="px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                Leadership
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
