'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Users, Award, Star, X } from 'lucide-react';

// Define the type for a leader
interface Leader {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  achievements: string[];
}

const leadership: Leader[] = [
  {
    name: 'Kwame Asante',
    role: 'Class Prefect',
    bio: 'Leading by example with outstanding academic performance and exceptional leadership skills.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    achievements: ['Science Fair Winner', 'Debate Champion', 'Student Council Member'],
  },
  {
    name: 'Ama Serwaa',
    role: 'Assistant Prefect',
    bio: 'Passionate about community service and environmental conservation initiatives.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    achievements: ['Community Service Award', 'Environmental Club President', 'Academic Excellence'],
  },
  {
    name: 'Kofi Mensah',
    role: 'Academic Secretary',
    bio: 'Dedicated to helping fellow students achieve their academic goals and maintain high standards.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    achievements: ['Mathematics Olympiad Winner', 'Peer Tutor', 'Research Project Leader'],
  },
  {
    name: 'Akosua Osei',
    role: 'Sports Captain',
    bio: 'Promoting physical fitness and team spirit through various sports and athletic activities.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    achievements: ['Athletics Champion', 'Team Captain', 'Sports Excellence Award'],
  },
];

const committees = [
  {
    name: 'Academic Committee',
    description: 'Oversees academic activities, study groups, and educational initiatives',
    icon: Award,
    members: 8,
  },
  {
    name: 'Social Committee',
    description: 'Organizes social events, cultural activities, and class bonding activities',
    icon: Users,
    members: 6,
  },
  {
    name: 'Environmental Committee',
    description: 'Leads environmental conservation projects and sustainability initiatives',
    icon: Star,
    members: 10,
  },
  {
    name: 'Sports Committee',
    description: 'Manages sports activities, competitions, and physical fitness programs',
    icon: Crown,
    members: 7,
  },
];

export default function Leadership() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

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
            Leadership Team
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Meet the dedicated students who lead Science 1B with vision, integrity, 
            and commitment to excellence.
          </p>
        </motion.div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {leadership.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedLeader(leader)}
            >
              <div className="relative mb-4">
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary-100 group-hover:border-primary-200 transition-colors"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                {leader.name}
              </h3>
              <p className="text-primary-600 font-medium mb-3">
                {leader.role}
              </p>
              <p className="text-secondary-600 text-sm mb-4">
                {leader.bio}
              </p>
              
              <div className="space-y-1">
                {leader.achievements.map((achievement, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full mr-1 mb-1"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Committees */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-secondary-900 mb-4">
            Class Committees
          </h3>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Various committees work together to ensure the smooth running of class activities 
            and the achievement of our collective goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {committees.map((committee, index) => {
            const Icon = committee.icon;
            return (
              <motion.div
                key={committee.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors">
                  <Icon className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                  {committee.name}
                </h4>
                <p className="text-secondary-600 text-sm mb-4">
                  {committee.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">
                    {committee.members} members
                  </span>
                  <div className="w-2 h-2 bg-accent-500 rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Leadership Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Our Leadership Philosophy
            </h3>
            <p className="text-lg text-secondary-600 mb-6">
              "We believe that true leadership is about serving others, inspiring excellence, 
              and creating an environment where every student can thrive and reach their full potential. 
              Our leadership team is committed to fostering a culture of respect, collaboration, 
              and continuous improvement."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white text-primary-700 rounded-full text-sm font-medium shadow-sm">
                Servant Leadership
              </span>
              <span className="px-4 py-2 bg-white text-accent-700 rounded-full text-sm font-medium shadow-sm">
                Collaborative Approach
              </span>
              <span className="px-4 py-2 bg-white text-primary-700 rounded-full text-sm font-medium shadow-sm">
                Continuous Learning
              </span>
              <span className="px-4 py-2 bg-white text-accent-700 rounded-full text-sm font-medium shadow-sm">
                Inclusive Excellence
              </span>
            </div>
          </div>
        </motion.div>

        {/* Modal for leader details */}
        <AnimatePresence>
          {selectedLeader && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedLeader(null)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              >
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="absolute top-4 right-4 text-secondary-500 hover:text-secondary-800 transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="text-center">
                  <img
                    src={selectedLeader.imageUrl}
                    alt={selectedLeader.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-200 mb-4"
                  />
                  <h2 className="text-3xl font-bold text-secondary-900">{selectedLeader.name}</h2>
                  <p className="text-primary-600 font-medium text-lg mb-4">{selectedLeader.role}</p>
                </div>

                <p className="text-secondary-600 text-center mb-6">{selectedLeader.bio}</p>

                <div>
                  <h4 className="text-xl font-semibold text-secondary-800 mb-3 text-center">Achievements</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedLeader.achievements.map((achievement, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
