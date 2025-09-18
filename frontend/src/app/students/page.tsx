'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon, UsersIcon, CalendarIcon, HeartIcon, StarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { getStudents, getTeachers, getLeadershipMembers } from '@/lib/api';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

interface Student {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  gender?: 'male' | 'female';
  phone?: string;
  whatsapp?: string;
  profilePic?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

interface Teacher {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  subject?: string;
  gender?: 'male' | 'female';
  phone?: string;
  whatsapp?: string;
  email?: string;
  profilePic?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  profilePic?: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    averageAge: 17
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students
        const studentsResponse = await getStudents();
        if (studentsResponse.success && studentsResponse.data) {
          setStudents(studentsResponse.data);
          setFilteredStudents(studentsResponse.data);
          
          // Calculate stats
          const total = studentsResponse.data.length;
          const male = studentsResponse.data.filter(s => s.gender === 'male').length;
          const female = studentsResponse.data.filter(s => s.gender === 'female').length;
          
          setStats({
            total,
            male,
            female,
            averageAge: 17
          });
        }

        // Fetch teachers
        const teachersResponse = await getTeachers();
        if (teachersResponse.success && teachersResponse.data) {
          setTeachers(teachersResponse.data);
          setFilteredTeachers(teachersResponse.data);
        }

        // Fetch leadership
        const leadershipResponse = await getLeadershipMembers();
        if (leadershipResponse.success && leadershipResponse.data) {
          setLeadership(leadershipResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter students and teachers based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
      setFilteredTeachers(teachers);
    } else {
      const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.bio && student.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredStudents(filteredStudents);

      const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.subject && teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (teacher.bio && teacher.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredTeachers(filteredTeachers);
    }
  }, [searchTerm, students, teachers]);

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

      {/* Leadership Team Section */}
      {leadership.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Leadership Team
                </h2>
                <p className="text-lg text-gray-600">
                  Meet the dedicated students who lead Science 1B with vision and integrity
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {leadership.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="p-6 text-center">
                      {member.profilePic ? (
                        <img
                          src={member.profilePic}
                          alt={member.name}
                          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                          <StarIcon className="w-10 h-10 text-blue-600" />
                        </div>
                      )}
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                      
                      {member.bio && (
                        <p className="text-gray-600 text-sm leading-relaxed">
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
            </ScrollAnimation>
          </div>
        </section>
      )}

      {/* Students/Teachers Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {activeTab === 'students' ? 'Meet Our Students' : 'Meet Our Teachers'}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {activeTab === 'students' 
                  ? 'Each student brings unique talents and perspectives to our class'
                  : 'Dedicated educators who guide and inspire our students'
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
                    <UsersIcon className="w-5 h-5" />
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
                    <AcademicCapIcon className="w-5 h-5" />
                    <span>Teachers</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Search Bar */}
          <ScrollAnimation>
            <div className="mb-8 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={activeTab === 'students' 
                    ? "Search students by name, role, or bio..." 
                    : "Search teachers by name, role, subject, or bio..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {(activeTab === 'students' ? filteredStudents.length === 0 : filteredTeachers.length === 0) ? (
            <ScrollAnimation>
              <div className="text-center py-12">
                <UserGroupIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {searchTerm 
                    ? `No ${activeTab} found` 
                    : `No ${activeTab} yet`
                  }
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Try adjusting your search terms.' 
                    : `${activeTab === 'students' ? 'Students' : 'Teachers'} will appear here once they're added to the system.`
                  }
                </p>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {activeTab === 'students' 
                  ? filteredStudents.map((student, index) => (
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
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
                      {student.nickname && (
                        <p className="text-sm text-gray-500 mb-2">"{student.nickname}"</p>
                      )}
                      <p className="text-blue-600 font-medium mb-3">{student.role}</p>
                      
                      {student.bio && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {student.bio.length > 100 
                            ? `${student.bio.substring(0, 100)}...` 
                            : student.bio
                          }
                        </p>
                      )}

                      {/* Contact Information */}
                      <div className="space-y-2">
                        {student.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href={`tel:${student.phone}`} className="hover:text-green-600 transition-colors">
                              {student.phone}
                            </a>
                          </div>
                        )}
                        
                        {student.whatsapp && (
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            <a 
                              href={`https://wa.me/${student.whatsapp.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-green-600 transition-colors"
                            >
                              WhatsApp
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  ))
                  : filteredTeachers.map((teacher, index) => (
                  <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6 text-center">
                      {/* Profile Picture */}
                      {teacher.profilePic ? (
                        <img
                          src={teacher.profilePic}
                          alt={teacher.name}
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                          <AcademicCapIcon className="w-12 h-12 text-blue-600" />
                        </div>
                      )}
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                      {teacher.nickname && (
                        <p className="text-sm text-gray-500 mb-2">"{teacher.nickname}"</p>
                      )}
                      <p className="text-blue-600 font-medium mb-3">{teacher.role}</p>
                      {teacher.subject && (
                        <p className="text-sm text-gray-600 mb-3 font-medium">{teacher.subject}</p>
                      )}
                      
                      {teacher.bio && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {teacher.bio.length > 100 
                            ? `${teacher.bio.substring(0, 100)}...` 
                            : teacher.bio
                          }
                        </p>
                      )}

                      {/* Contact Information */}
                      <div className="space-y-2">
                        {teacher.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href={`tel:${teacher.phone}`} className="hover:text-green-600 transition-colors">
                              {teacher.phone}
                            </a>
                          </div>
                        )}
                        
                        {teacher.whatsapp && (
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            <a 
                              href={`https://wa.me/${teacher.whatsapp.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-green-600 transition-colors"
                            >
                              WhatsApp
                            </a>
                          </div>
                        )}

                        {teacher.email && (
                          <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href={`mailto:${teacher.email}`} className="hover:text-blue-600 transition-colors">
                              {teacher.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  ))
                }
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