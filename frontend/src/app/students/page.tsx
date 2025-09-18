'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon, UsersIcon, CalendarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { getStudents } from '@/lib/api';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

interface Student {
  id: string;
  name: string;
  role: string;
  profilePic?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    averageAge: 17
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        if (response.success && response.data) {
          setStudents(response.data);
          
          // Calculate stats
          const total = response.data.length;
          const male = response.data.filter(s => s.role.toLowerCase().includes('male') || s.name.toLowerCase().includes('mr')).length;
          const female = total - male;
          
          setStats({
            total,
            male,
            female,
            averageAge: 17 // Default average age
          });
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Amazing Students
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Meet the brilliant minds of Science 1B at St. John's Grammar SHS
            </p>
          </motion.div>
        </div>
      </section>

      {/* Class Demographics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Class Demographics
              </h2>
              <p className="text-lg text-gray-600">
                A diverse and talented group of students
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-blue-50 rounded-xl"
              >
                <UsersIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{stats.total}</h3>
                <p className="text-gray-700 font-medium">Total Students</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-green-50 rounded-xl"
              >
                <UserGroupIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-green-600 mb-2">{stats.male}</h3>
                <p className="text-gray-700 font-medium">Male Students</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-pink-50 rounded-xl"
              >
                <HeartIcon className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-pink-600 mb-2">{stats.female}</h3>
                <p className="text-gray-700 font-medium">Female Students</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-purple-50 rounded-xl"
              >
                <CalendarIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-purple-600 mb-2">{stats.averageAge}</h3>
                <p className="text-gray-700 font-medium">Average Age</p>
              </motion.div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Students Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Students
              </h2>
              <p className="text-lg text-gray-600">
                Each student brings unique talents and perspectives to our class
              </p>
            </div>
          </ScrollAnimation>

          {students.length === 0 ? (
            <ScrollAnimation>
              <div className="text-center py-12">
                <UserGroupIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No students yet</h3>
                <p className="text-gray-600">Students will appear here once they're added to the system.</p>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6 text-center">
                      {student.profilePic ? (
                        <img
                          src={student.profilePic}
                          alt={student.name}
                          className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                          <UserGroupIcon className="w-12 h-12 text-blue-600" />
                        </div>
                      )}
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{student.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{student.role}</p>
                      
                      {student.bio && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {student.bio.length > 100 
                            ? `${student.bio.substring(0, 100)}...` 
                            : student.bio
                          }
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimation>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Science 1B is more than just a class - it's a family of curious minds working together to explore the wonders of science.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              Get in Touch
            </motion.a>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}