'use client';

import { motion } from 'framer-motion';
import { Play, Calendar } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getGalleryItems } from '@/lib/api';
import { isVideoUrl, resolveMediaUrl } from '@/lib/media';

interface MediaItem { id: string; imageUrl: string; caption?: string; createdAt?: string; }

export default function VideoGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selected, setSelected] = useState<MediaItem | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getGalleryItems(1, 200);
      if (res.success && res.data) setItems(res.data.filter((i) => isVideoUrl(i.imageUrl)));
    })();
  }, []);

  const videos = useMemo(() => items.map((i) => ({ ...i, thumbnailUrl: resolveMediaUrl(i.imageUrl), videoUrl: resolveMediaUrl(i.imageUrl) })), [items]);

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
              onClick={() => setSelected(video)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.caption || 'Video'}
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

                {/* Caption Badge */}
                {video.caption ? (
                  <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs px-2 py-1 rounded line-clamp-1 max-w-[70%]">
                    {video.caption}
                  </div>
                ) : null}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {video.caption || 'Video'}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-secondary-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
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
                  src={resolveMediaUrl(selected.imageUrl)}
                  controls
                  className="w-full h-96 object-cover"
                  poster={resolveMediaUrl(selected.imageUrl)}
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  {selected.caption || 'Video'}
                </h3>
                <div className="flex items-center space-x-6 text-sm text-secondary-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : ''}</span>
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
