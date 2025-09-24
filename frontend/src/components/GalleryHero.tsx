'use client';

import { motion } from 'framer-motion';
import { Camera, Play, Image, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getGalleryItems } from '@/lib/api';
import { isVideoUrl } from '@/lib/media';

export default function GalleryHero() {
  const [photos, setPhotos] = useState(0);
  const [videos, setVideos] = useState(0);
  const [events, setEvents] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await getGalleryItems(1, 1000);
      if (res.success && res.data) {
        const items = res.data;
        const p = items.filter((i) => !isVideoUrl(i.imageUrl)).length;
        const v = items.filter((i) => isVideoUrl(i.imageUrl)).length;
        const uniqueDays = new Set(
          items
            .map((i) => i.createdAt)
            .filter(Boolean)
            .map((d) => new Date(d as any).toDateString())
        );
        setPhotos(p);
        setVideos(v);
        setTotal(items.length);
        setEvents(uniqueDays.size || Math.max(1, Math.floor(items.length / 5)));
      }
    })();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-primary-200 rounded-full opacity-60 animate-pulse-slow" />
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-accent-200 rounded-full opacity-60 animate-bounce-slow" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6">
            Our <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-xl text-secondary-700 mb-12 max-w-3xl mx-auto">
            Capturing the moments that define our journey together as Science 1B students. 
            From academic achievements to memorable events, explore our visual story.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Image className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-1">{photos}</div>
              <div className="text-sm text-secondary-600">Photos</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Video className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-1">{videos}</div>
              <div className="text-sm text-secondary-600">Videos</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Camera className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-1">{events}</div>
              <div className="text-sm text-secondary-600">Events</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Play className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-1">{total}</div>
              <div className="text-sm text-secondary-600">Memories</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
