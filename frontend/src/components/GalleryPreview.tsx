'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Play, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getGalleryItems } from '@/lib/api';
import { resolveMediaUrl, isVideoUrl } from '@/lib/media';

interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
}

export default function GalleryPreview() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getGalleryItems(1, 9);
      if (res.success && res.data) setItems(res.data);
    })();
  }, []);

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
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">Our Gallery</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">Capturing memorable moments from our journey together as Science 1B students.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const src = resolveMediaUrl(item.imageUrl);
            const video = isVideoUrl(src);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={src}
                    alt={item.caption || 'Gallery item'}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {video ? (
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary-600 ml-1" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-primary-600" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="text-white">
                    {item.caption ? <h3 className="text-lg font-semibold mb-1 line-clamp-1">{item.caption}</h3> : null}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/gallery" className="btn-primary group">
            View Full Gallery
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
