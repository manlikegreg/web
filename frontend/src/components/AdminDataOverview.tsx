'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  DocumentTextIcon, 
  PhotoIcon,
  StarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { 
  getStudents, 
  getTeachers, 
  getLeadershipMembers, 
  getArticles, 
  getGalleryItems 
} from '@/lib/api';

interface DataCounts {
  students: number;
  teachers: number;
  leadership: number;
  articles: number;
  gallery: number;
  loading: boolean;
  error: string | null;
}

interface AdminDataOverviewProps {
  refreshTrigger?: number;
}

export default function AdminDataOverview({ refreshTrigger }: AdminDataOverviewProps = {}) {
  const [data, setData] = useState<DataCounts>({
    students: 0,
    teachers: 0,
    leadership: 0,
    articles: 0,
    gallery: 0,
    loading: true,
    error: null
  });

  const fetchData = async () => {
    setData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const [studentsRes, teachersRes, leadershipRes, articlesRes, galleryRes] = await Promise.all([
        getStudents(),
        getTeachers(),
        getLeadershipMembers(),
        getArticles(1, 100), // Get more articles to get accurate count
        getGalleryItems(1, 100) // Get more gallery items to get accurate count
      ]);

      console.log('📊 Dashboard API Responses:', {
        students: studentsRes,
        teachers: teachersRes,
        leadership: leadershipRes,
        articles: articlesRes,
        gallery: galleryRes
      });

      setData({
        students: studentsRes.success ? (studentsRes.data?.length || 0) : 0,
        teachers: teachersRes.success ? (teachersRes.data?.length || 0) : 0,
        leadership: leadershipRes.success ? (leadershipRes.data?.length || 0) : 0,
        articles: articlesRes.success ? (articlesRes.data?.length || 0) : 0,
        gallery: galleryRes.success ? (galleryRes.data?.length || 0) : 0,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('❌ Dashboard data fetch error:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load data counts'
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (refreshTrigger !== undefined) {
      fetchData();
    }
  }, [refreshTrigger]);

  const dataItems = [
    {
      key: 'students',
      label: 'Students',
      icon: UserGroupIcon,
      color: 'blue',
      count: data.students
    },
    {
      key: 'teachers',
      label: 'Teachers',
      icon: AcademicCapIcon,
      color: 'green',
      count: data.teachers
    },
    {
      key: 'leadership',
      label: 'Leadership',
      icon: StarIcon,
      color: 'purple',
      count: data.leadership
    },
    {
      key: 'articles',
      label: 'Articles',
      icon: DocumentTextIcon,
      color: 'orange',
      count: data.articles
    },
    {
      key: 'gallery',
      label: 'Gallery',
      icon: PhotoIcon,
      color: 'pink',
      count: data.gallery
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
      pink: 'bg-pink-50 text-pink-600 border-pink-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (data.loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading data overview...</span>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="text-center py-8">
          <ChartBarIcon className="mx-auto h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load data overview</h3>
          <p className="text-gray-600 mb-4">{data.error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ChartBarIcon className="h-6 w-6 mr-2 text-blue-600" />
            Data Overview
          </h2>
          <p className="text-gray-600">Current counts of all data in the system</p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {dataItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 ${getColorClasses(item.color)}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{item.label}</p>
                  <p className="text-2xl font-bold">{item.count}</p>
                </div>
                <Icon className="h-8 w-8 opacity-60" />
              </div>
              <div className="mt-2">
                <span className="text-xs font-medium">
                  {item.count === 1 ? 'item' : 'items'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total Items: {data.students + data.teachers + data.leadership + data.articles + data.gallery}</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}