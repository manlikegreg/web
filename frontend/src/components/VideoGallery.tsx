'use client';

import { motion } from 'framer-motion';
import { Play, Calendar, Clock, Eye } from 'lucide-react';
import { useState } from 'react';

const videos = [
  {
    id: '1',
    title: 'Science Fair 2024 Highlights',
    description: 'A compilation of the best moments from our annual science fair',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
    videoUrl: 'https://example.com/video1.mp4',
    duration: '5:30',
    views: '1.2K',
    date: '2024-03-15',
    category: 'Events',
  },
  {
    id: '2',
    title: 'Chemistry Lab Experiments',
    description: 'Students demonstrating various chemistry experiments in the laboratory',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
    videoUrl: 'https://example.com/video2.mp4',
    duration: '8:45',
    views: '856',
    date: '2024-02-20',
    category: 'Academics',
  },
  {
    id: '3',
    title: 'Sports Day Competition',
    description: 'Highlights from our inter-class athletics competition',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    videoUrl: 'https://example.com/video3.mp4',
    duration: '12:15',
    views: '2.1K',
    date: '2024-01-10',
    category: 'Sports',
  },
  {
    id: '4',
    title: 'Community Service Project',
    description: 'Our environmental conservation initiative in the local community',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    videoUrl: 'https://example.com/video4.mp4',
    duration: '6:20',
    views: '743',
    date: '2024-01-05',
    category: 'Community',
  },
  {
    id: '5',
    title: 'Field Trip Documentary',
    description: 'Documentary of our educational visit to the research center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
    videoUrl: 'https://example.com/video5.mp4',
    duration: '15:30',
    views: '1.5K',
    date: '2023-12-15',
    category: 'Activities',
  },
  {
    id: '6',
    title: 'Graduation Ceremony',
    description: 'Full coverage of our graduation ceremony and celebrations',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
    videoUrl: 'https://example.com/video6.mp4',
    duration: '25:45',
    views: '3.2K',
    date: '2023-11-30',
    category: 'Events',
  },
];

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Video Gallery
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Watch our videos and relive the memorable moments from our journey together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary-600 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                  {video.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-secondary-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(video.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  className="w-full h-96 object-cover"
                  poster={selectedVideo.thumbnailUrl}
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="text-secondary-600 mb-4">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-secondary-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedVideo.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{selectedVideo.views} views</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
