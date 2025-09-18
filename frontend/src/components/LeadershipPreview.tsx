'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Crown, User, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { getLeadershipMembers } from '@/lib/api';

interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  profilePic?: string;
}

export default function LeadershipPreview() {
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeadership = async () => {
    try {
      const response = await getLeadershipMembers();
      if (response.success && response.data && response.data.length > 0) {
        setLeadership(response.data.slice(0, 4)); // Show only first 4 members
      } else {
        setLeadership([]);
      }
    } catch (error) {
      console.error('Error fetching leadership members:', error);
      setLeadership([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadership();
  }, []);

  // Auto-refresh every 30 seconds
  useAutoRefresh({
    enabled: true,
    interval: 30000,
    onRefresh: fetchLeadership,
  });

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Loading leadership team...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="p-6 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            Meet the dedicated students who lead Science 1B with vision, integrity, and commitment to excellence.
          </p>
        </motion.div>

        {leadership.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Leadership Members</h3>
            <p className="text-gray-600">Leadership team members will appear here once they're added through the admin panel.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="p-6 text-center">
                  {/* Profile Picture */}
                  {member.profilePic ? (
                    <img
                      src={member.profilePic}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100 group-hover:border-primary-200 transition-colors"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                      <Crown className="w-10 h-10 text-primary-600" />
                    </div>
                  )}
                  
                  {/* Name and Position */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                  
                  {/* Bio Preview */}
                  {member.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {member.bio.length > 80 
                        ? `${member.bio.substring(0, 80)}...` 
                        : member.bio
                      }
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/about" className="btn-primary group">
            View Full Leadership Team
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}