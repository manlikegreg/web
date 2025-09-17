'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const contactDetails = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      'St. John\'s Grammar Senior High School',
      'Achimota, Accra',
      'Ghana',
    ],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: [
      'Main Office: +233 XX XXX XXXX',
      'Science Department: +233 XX XXX XXXX',
      'Emergency: +233 XX XXX XXXX',
    ],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      'General: info@stjohns.edu.gh',
      'Science 1B: science1b@stjohns.edu.gh',
      'Admissions: admissions@stjohns.edu.gh',
    ],
  },
  {
    icon: Clock,
    title: 'School Hours',
    details: [
      'Monday - Friday: 8:00 AM - 4:00 PM',
      'Saturday: 8:00 AM - 12:00 PM',
      'Sunday: Closed',
    ],
  },
];

const socialLinks = [
  { icon: Facebook, name: 'Facebook', url: '#', color: 'text-blue-600' },
  { icon: Twitter, name: 'Twitter', url: '#', color: 'text-blue-400' },
  { icon: Instagram, name: 'Instagram', url: '#', color: 'text-pink-600' },
  { icon: Youtube, name: 'YouTube', url: '#', color: 'text-red-600' },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-6">
          Contact Information
        </h2>
        <p className="text-secondary-600 mb-8">
          We're here to help and answer any questions you might have. 
          Feel free to reach out to us through any of the channels below.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-6">
        {contactDetails.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {contact.title}
                </h3>
                <div className="space-y-1">
                  {contact.details.map((detail, idx) => (
                    <p key={idx} className="text-secondary-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Social Media */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="pt-6 border-t border-secondary-200"
      >
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Follow Us
        </h3>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                className={`w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center hover:bg-secondary-200 transition-colors group`}
                aria-label={social.name}
              >
                <Icon className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform`} />
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="pt-6 border-t border-secondary-200"
      >
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Find Us
        </h3>
        <div className="w-full h-48 bg-secondary-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-secondary-400 mx-auto mb-2" />
            <p className="text-secondary-500">Interactive Map</p>
            <p className="text-sm text-secondary-400">
              St. John's Grammar SHS, Achimota
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Response Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
          Quick Response
        </h3>
        <p className="text-secondary-600 text-sm mb-4">
          We typically respond to inquiries within 24 hours during school days. 
          For urgent matters, please call our main office.
        </p>
        <div className="flex items-center space-x-4 text-sm text-secondary-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Online Now</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Response time: &lt; 24h</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
