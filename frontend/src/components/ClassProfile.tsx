'use client';

import { motion } from 'framer-motion';
import { Microscope, Users, BookOpen, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Microscope,
    title: 'Advanced Science Curriculum',
    description: 'Comprehensive study of Physics, Chemistry, Biology, and Mathematics with hands-on laboratory experiences and research projects.',
  },
  {
    icon: Users,
    title: 'Collaborative Learning',
    description: 'Emphasis on teamwork, peer learning, and group projects that foster critical thinking and problem-solving skills.',
  },
  {
    icon: BookOpen,
    title: 'Research Opportunities',
    description: 'Students engage in independent research projects, science fairs, and competitions to develop analytical and research skills.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Focus',
    description: 'Encouraging creative thinking and innovation through project-based learning and real-world problem solving.',
  },
];

const subjects = [
  { name: 'Physics', percentage: 95 },
  { name: 'Chemistry', percentage: 92 },
  { name: 'Biology', percentage: 88 },
  { name: 'Mathematics', percentage: 90 },
  { name: 'English', percentage: 85 },
  { name: 'Social Studies', percentage: 87 },
];

export default function ClassProfile() {
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
            Class Profile
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Science 1B represents a diverse group of students united by their passion for 
            science and commitment to academic excellence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Academic Performance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">
              Academic Performance
            </h3>
            <p className="text-secondary-600 mb-6">
              Our students consistently achieve outstanding results across all subjects, 
              with particular strength in the sciences.
            </p>
            
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={subject.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-secondary-700">
                      {subject.name}
                    </span>
                    <span className="text-sm font-bold text-primary-600">
                      {subject.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${subject.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Class Demographics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">
              Class Demographics
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <span className="text-secondary-700">Total Students</span>
                <span className="text-2xl font-bold text-primary-600">45</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-accent-50 rounded-lg">
                <span className="text-secondary-700">Male Students</span>
                <span className="text-2xl font-bold text-accent-600">24</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <span className="text-secondary-700">Female Students</span>
                <span className="text-2xl font-bold text-primary-600">21</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-accent-50 rounded-lg">
                <span className="text-secondary-700">Average Age</span>
                <span className="text-2xl font-bold text-accent-600">17</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg">
              <h4 className="font-semibold text-secondary-900 mb-2">Class Motto</h4>
              <p className="text-secondary-600 italic">
                "Excellence through Science, Innovation through Collaboration"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
