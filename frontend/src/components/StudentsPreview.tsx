'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, User, ArrowRight, GraduationCap } from 'lucide-react';
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

interface Teacher {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  subject?: string;
  gender?: 'male' | 'female';
  profilePic?: string;
  bio?: string;
}

type Person = Student | Teacher;

export default function StudentsPreview() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0
  });

  const fetchData = async () => {
    try {
      // Fetch students
      const studentsRes = await fetch('https://web-xplc.onrender.com/api/students', { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      if (studentsRes.ok) {
        const studentsData = await studentsRes.json();
        const studentsList = studentsData?.data || [];
        setStudents(studentsList.slice(0, 6)); // Show only first 6 students
        
        // Calculate stats
        const total = studentsList.length;
        const male = studentsList.filter((s: Student) => s.gender === 'male').length;
        const female = studentsList.filter((s: Student) => s.gender === 'female').length;
        
        setStats({ total, male, female });
      }

      // Fetch teachers
      const teachersRes = await fetch('https://web-xplc.onrender.com/api/teachers', { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      if (teachersRes.ok) {
        const teachersData = await teachersRes.json();
        const teachersList = teachersData?.data || [];
        setTeachers(teachersList.slice(0, 6)); // Show only first 6 teachers
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh every 30 seconds
  useAutoRefresh({
    enabled: true,
    interval: 30000,
    onRefresh: fetchData,
  });

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Meet Our Students/Teachers
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Loading data...
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
            Meet Our Students/Teachers
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto mb-8">
            {activeTab === 'students' 
              ? 'Discover the talented and diverse students who make up Science 1B at St. John\'s Grammar SHS.'
              : 'Meet the dedicated educators who guide and inspire our students at Science 1B.'
            }
          </p>
          
          {/* Toggle Buttons */}
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-200">
              <button
                onClick={() => setActiveTab('students')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'students'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Students</span>
              </button>
              <button
                onClick={() => setActiveTab('teachers')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'teachers'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                        <GraduationCap className="w-5 h-5" />
                <span>Teachers</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Class Stats - Only show for students */}
        {activeTab === 'students' && (
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
        )}

        {/* Student/Teacher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'students' ? students.length === 0 : teachers.length === 0) ? (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No {activeTab === 'students' ? 'Students' : 'Teachers'} Yet
              </h3>
              <p className="text-gray-600">
                {activeTab === 'students' ? 'Student' : 'Teacher'} profiles will appear here once they're added to the system.
              </p>
            </div>
          ) : (
            (activeTab === 'students' ? students : teachers).map((item: Person, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="p-6 text-center">
                  {/* Profile Picture */}
                  {item.profilePic ? (
                    <img
                      src={item.profilePic}
                      alt={item.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100 group-hover:border-blue-200 transition-colors"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      {activeTab === 'students' ? (
                        <User className="w-10 h-10 text-blue-600" />
                      ) : (
                        <GraduationCap className="w-10 h-10 text-blue-600" />
                      )}
                    </div>
                  )}
                  
                  {/* Name and Nickname */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                  {item.nickname && (
                    <p className="text-sm text-gray-500 mb-2">"{item.nickname}"</p>
                  )}
                  
                  {/* Role */}
                  <p className="text-blue-600 font-medium mb-3">{item.role}</p>
                  
                  {/* Subject (for teachers) */}
                  {activeTab === 'teachers' && 'subject' in item && item.subject && (
                    <p className="text-sm text-gray-600 mb-3 font-medium">{item.subject}</p>
                  )}
                  
                  {/* Bio Preview */}
                  {item.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {item.bio.length > 80 
                        ? `${item.bio.substring(0, 80)}...` 
                        : item.bio
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
            View All Students/Teachers
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}