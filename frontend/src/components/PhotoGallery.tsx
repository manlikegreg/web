'use client';

import { motion } from 'framer-motion';
import { Calendar, Tag, ZoomIn } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ScrollAnimation from './animations/ScrollAnimation';
import StaggerAnimation from './animations/StaggerAnimation';
import Lightbox from './animations/Lightbox';

const categories = ['All', 'Events', 'Activities', 'Academics', 'Sports', 'Community'];
import { getGalleryItems } from '@/lib/api';
import { resolveMediaUrl } from '@/lib/media';

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getGalleryItems(1, 1000);
      if (res.success && res.data) setItems(res.data.filter((i) => (i.type || 'photo') === 'photo'));
    })();
  }, []);

  const filteredPhotos = useMemo(() => {
    const arr = items.map((g) => ({
      id: g.id,
      title: g.caption || 'Photo',
      description: g.caption || '',
      imageUrl: resolveMediaUrl(g.imageUrl),
      category: g.category || 'Gallery',
      date: g.createdAt,
    }));
    return selectedCategory === 'All' ? arr : arr.filter((p) => p.category === selectedCategory);
  }, [items, selectedCategory]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const lightboxImages = filteredPhotos.map(photo => ({
    id: photo.id,
    src: photo.imageUrl,
    alt: photo.title,
    caption: photo.description,
  }));

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Category Filter */}
        <ScrollAnimation>
          <StaggerAnimation className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12" staggerDelay={0.1}>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base touch-target ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </StaggerAnimation>
        </ScrollAnimation>

        {/* Photo Grid */}
        <StaggerAnimation className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" staggerDelay={0.05}>
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-200 cursor-pointer mobile-optimized"
              onClick={() => openLightbox(index)}
              whileHover={{ 
                y: -4, 
                scale: 1.01,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <motion.img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover mobile-optimized"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </div>
              
              {/* Overlay */}
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 sm:p-4"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white">
                  <motion.h3 
                    className="text-base sm:text-lg font-semibold mb-1 line-clamp-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {photo.title}
                  </motion.h3>
                  <p className="text-xs sm:text-sm text-gray-200 mb-2 line-clamp-2">{photo.description}</p>
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span className="hidden sm:inline">{new Date(photo.date).toLocaleDateString()}</span>
                      <span className="sm:hidden">{new Date(photo.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span className="truncate">{photo.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </StaggerAnimation>

        {/* Lightbox */}
        <Lightbox
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          images={lightboxImages}
          currentIndex={currentImageIndex}
          onNext={nextImage}
          onPrev={prevImage}
        />
      </div>
    </section>
  );
}
