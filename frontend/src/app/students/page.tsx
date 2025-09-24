'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserGroupIcon, UsersIcon, CalendarIcon, HeartIcon, StarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { getStudents, getTeachers, getLeadershipMembers } from '@/lib/api';
import ProfileModal from '@/components/ProfileModal';
import LeadershipPreview from '@/components/LeadershipPreview';
import { getSettings } from '@/lib/api';
import { resolveMediaUrl } from '@/lib/media';

interface Student {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  gender?: 'male' | 'female';
  phone?: string;
  whatsapp?: string;
  email?: string;
  profilePic?: string;
  bio?: string;
  body?: string;
  contactInfo?: string;
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
  body?: string;
  contactInfo?: string;
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
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    averageAge: 17
  });
  const [selectedProfile, setSelectedProfile] = useState<Student | Teacher | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [leadershipInfo, setLeadershipInfo] = useState<string>('');
  const [genderModal, setGenderModal] = useState<'male'|'female'|null>(null);

  const handleProfileClick = (profile: Student | Teacher, isTeacher: boolean) => {
    setActiveTab(isTeacher ? 'teachers' : 'students');
    setSelectedProfile(profile);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedProfile(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching data...');
        
        // Fetch all data in parallel for faster loading
        const [studentsResponse, teachersResponse, leadershipResponse] = await Promise.all([
          getStudents(),
          getTeachers(),
          getLeadershipMembers()
        ]);

        console.log('📊 API Responses:', {
          students: studentsResponse,
          teachers: teachersResponse,
          leadership: leadershipResponse
        });

        // Process students data
        if (studentsResponse.success && studentsResponse.data) {
          console.log('✅ Students data loaded:', studentsResponse.data.length, 'students');
          
          // Deduplicate students by ID
          const uniqueStudents = studentsResponse.data.filter((student, index, self) => 
            index === self.findIndex(s => s.id === student.id)
          );
          
          console.log('🔄 Deduplicated students:', uniqueStudents.length, 'unique students');
          
          setStudents(uniqueStudents);
          setFilteredStudents(uniqueStudents);
          
          // Calculate stats
          const total = uniqueStudents.length;
          const male = uniqueStudents.filter(s => s.gender === 'male').length;
          const female = uniqueStudents.filter(s => s.gender === 'female').length;
          
          setStats({
            total,
            male,
            female,
            averageAge: 17
          });
        } else {
          console.error('❌ Students data failed:', studentsResponse);
        }

        // Process teachers data
        if (teachersResponse.success && teachersResponse.data) {
          console.log('✅ Teachers data loaded:', teachersResponse.data.length, 'teachers');
          
          // Deduplicate teachers by ID
          const uniqueTeachers = teachersResponse.data.filter((teacher, index, self) => 
            index === self.findIndex(t => t.id === teacher.id)
          );
          
          console.log('🔄 Deduplicated teachers:', uniqueTeachers.length, 'unique teachers');
          
          setTeachers(uniqueTeachers);
          setFilteredTeachers(uniqueTeachers);
        } else {
          console.error('❌ Teachers data failed:', teachersResponse);
        }

        // Process leadership data
        if (leadershipResponse.success && leadershipResponse.data) {
          console.log('✅ Leadership data loaded:', leadershipResponse.data.length, 'members');
          
          // Deduplicate leadership by ID
          const uniqueLeadership = leadershipResponse.data.filter((member, index, self) => 
            index === self.findIndex(l => l.id === member.id)
          );
          
          console.log('🔄 Deduplicated leadership:', uniqueLeadership.length, 'unique members');
          
          setLeadership(uniqueLeadership);
        } else {
          console.error('❌ Leadership data failed:', leadershipResponse);
        }

        // Load leadership info from settings (about section)
        try {
          const s = await getSettings();
          if (s.success && s.data) {
            const aboutText = (s.data['about.achievements'] || s.data['about.history'] || '').toString();
            setLeadershipInfo(aboutText);
          }
        } catch {}
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        setError('Failed to load data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter students and teachers based on search term
  useEffect(() => {
    let stu = students;
    if (searchTerm.trim() !== '') {
      stu = stu.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.bio && student.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (activeCategory !== 'All') {
      stu = stu.filter((s: any) => (s.categories || []).includes(activeCategory));
    }
    setFilteredStudents(stu);

    let tea = teachers;
    if (searchTerm.trim() !== '') {
      tea = tea.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.subject && teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (teacher.bio && teacher.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredTeachers(tea);
  }, [searchTerm, activeCategory, students, teachers]);

  // Debug render state
  useEffect(() => {
    console.log('🔍 Render check:', {
      activeTab,
      studentsCount: students.length,
      filteredStudentsCount: filteredStudents.length,
      teachersCount: teachers.length,
      filteredTeachersCount: filteredTeachers.length,
      leadershipCount: leadership.length
    });
  }, [activeTab, students, filteredStudents, teachers, filteredTeachers, leadership]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with loading animation */}
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

        {/* Loading content with skeleton */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl p-6 h-32"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-80 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="ml-4 text-gray-600">Loading students...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Class Demographics</h2>
            <p className="text-lg text-gray-600">
              A diverse and talented group of students
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
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
                className="text-center p-6 bg-green-50 rounded-xl cursor-pointer"
                onClick={() => { setActiveTab('students'); setGenderModal('male'); }}
              >
                <UserGroupIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-green-600 mb-2">{stats.male}</h3>
                <p className="text-gray-700 font-medium">Male Students</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-pink-50 rounded-xl cursor-pointer"
                onClick={() => { setActiveTab('students'); setGenderModal('female'); }}
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
          </motion.div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            {leadershipInfo ? (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{leadershipInfo}</p>
            ) : null}
          </motion.div>
          <LeadershipPreview />
        </div>
      </section>

      {/* Students/Teachers Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
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
            {activeTab === 'students' && (
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {['All','Back Benchers','Most Smartest','Quiz Boys','Most Shortest','Most Tallest'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm border ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 max-w-md mx-auto"
          >
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
          </motion.div>

              {(activeTab === 'students' ? filteredStudents.length === 0 : filteredTeachers.length === 0) ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
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
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {activeTab === 'students' 
                  ? filteredStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProfileClick(student, false)}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <div className="p-6 text-center">
                      {student.profilePic ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-100">
                          <img
                            src={resolveMediaUrl(student.profilePic)}
                            alt={student.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
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
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProfileClick(teacher, true)}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <div className="p-6 text-center">
                      {/* Profile Picture */}
                      {teacher.profilePic ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-100">
                          <img
                            src={resolveMediaUrl(teacher.profilePic)}
                            alt={teacher.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
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
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Science 1B is more than just a class - it's a family of curious minds working together to explore the wonders of science.
            </p>
            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        profile={selectedProfile}
        type={activeTab === 'students' ? 'student' : 'teacher'}
      />

      {/* Gender Filter Modal */}
      <AnimatePresence>
        {genderModal && (
          <div className="fixed inset-0 z-50">
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGenderModal(null)}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <button
                  onClick={() => setGenderModal(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80"
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {genderModal === 'male' ? 'Male Students' : 'Female Students'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(students.filter((s: any) => s.gender === genderModal)).map((student) => (
                      <div
                        key={student.id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-4 cursor-pointer border"
                        onClick={() => handleProfileClick(student as any, false)}
                      >
                        <div className="text-center">
                          {student.profilePic ? (
                            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-4 border-blue-100">
                              <img src={resolveMediaUrl((student as any).profilePic)} alt={student.name} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-3" />
                          )}
                          <div className="font-semibold text-gray-900">{student.name}</div>
                          <div className="text-blue-600 text-sm">{student.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}