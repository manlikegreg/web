'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Users, Calendar, Target } from 'lucide-react';

export default function AboutPreview() {
  return (
    <section id="about-preview" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">
              About Science 1B
            </h2>
            <p className="text-lg text-secondary-600 mb-6">
              Science 1B is a dynamic and innovative class at St. John's Grammar Senior High School, 
              Achimota. We are passionate about science, technology, and making a positive impact 
              in our community and beyond.
            </p>
            <p className="text-secondary-600 mb-8">
              Our class represents the future of scientific excellence, combining rigorous academic 
              pursuits with creative problem-solving and leadership development.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-3xl font-bold text-primary-600 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  45+
                </motion.div>
                <div className="text-sm text-secondary-600">Students</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-3xl font-bold text-primary-600 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  3
                </motion.div>
                <div className="text-sm text-secondary-600">Years</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-3xl font-bold text-primary-600 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  15+
                </motion.div>
                <div className="text-sm text-secondary-600">Awards</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/about" className="btn-primary group">
                Learn More About Us
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <motion.div
                className="card p-6 group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-6 h-6 text-primary-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      Diverse Community
                    </h3>
                    <p className="text-secondary-600">
                      Students from various backgrounds united by passion for science and learning.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="card p-6 group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Calendar className="w-6 h-6 text-accent-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      Rich History
                    </h3>
                    <p className="text-secondary-600">
                      Building on decades of academic excellence and tradition at St. John's Grammar.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="card p-6 group hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="w-6 h-6 text-primary-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      Future-Focused
                    </h3>
                    <p className="text-secondary-600">
                      Preparing students for careers in science, technology, and innovation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
