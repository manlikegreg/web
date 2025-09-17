'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'science1b@stjohns.edu.gh',
    description: 'Send us an email anytime',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+233 XX XXX XXXX',
    description: 'Call during school hours',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Achimota, Accra, Ghana',
    description: 'Visit us at our school',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon - Fri: 8AM - 4PM',
    description: 'School operating hours',
  },
];

export default function ContactHero() {
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
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-secondary-700 mb-12 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have questions, suggestions, 
            or just want to say hello, don't hesitate to reach out to us.
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {info.label}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {info.value}
                </p>
                <p className="text-secondary-600 text-sm">
                  {info.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
