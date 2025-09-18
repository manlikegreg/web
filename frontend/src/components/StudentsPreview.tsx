'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, User, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';

interface Student {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  gender?: 'male' | 'female';
  profilePic?: string;
  bio?: string;
}

export default function StudentsPreview() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0
  });

  const fetchStudents = async () => {
    try {
      const res = await fetch('https://web-xplc.onrender.com/api/students', { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      if (res.ok) {
        const data = await res.json();
        const studentsData = data?.data || [];
        setStudents(studentsData.slice(0, 6)); // Show only first 6 students
        
        // Calculate stats
        const total = studentsData.length;
        const male = studentsData.filter((s: Student) => s.gender === 'male').length;
        const female = studentsData.filter((s: Student) => s.gender === 'female').length;
        
        setStats({ total, male, female });
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Auto-refresh every 30 seconds
  useAutoRefresh({
    enabled: true,
    interval: 30000,
    onRefresh: fetchStudents,
  });

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Meet Our Students
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Loading students...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Meet Our Students
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover the talented and diverse students who make up Science 1B at St. John's Grammar SHS.
          </p>
        </motion.div>

        {/* Class Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</h3>
            <p className="text-gray-600">Total Students</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.male}</h3>
            <p className="text-gray-600">Male Students</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.female}</h3>
            <p className="text-gray-600">Female Students</p>
          </div>
        </motion.div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Students Yet</h3>
              <p className="text-gray-600">Student profiles will appear here once they're added to the system.</p>
            </div>
          ) : (
            students.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="p-6 text-center">
                  {/* Profile Picture */}
                  {student.profilePic ? (
                    <img
                      src={student.profilePic}
                      alt={student.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100 group-hover:border-blue-200 transition-colors"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <User className="w-10 h-10 text-blue-600" />
                    </div>
                  )}
                  
                  {/* Name and Nickname */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h3>
                  {student.nickname && (
                    <p className="text-sm text-gray-500 mb-2">"{student.nickname}"</p>
                  )}
                  
                  {/* Role */}
                  <p className="text-blue-600 font-medium mb-3">{student.role}</p>
                  
                  {/* Bio Preview */}
                  {student.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {student.bio.length > 80 
                        ? `${student.bio.substring(0, 80)}...` 
                        : student.bio
                      }
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/students" className="btn-primary group">
            View All Students
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}