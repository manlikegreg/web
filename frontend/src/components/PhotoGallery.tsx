'use client';

import { motion } from 'framer-motion';
import { Camera, Calendar, Tag, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import ScrollAnimation from './animations/ScrollAnimation';
import StaggerAnimation from './animations/StaggerAnimation';
import Lightbox from './animations/Lightbox';

const categories = ['All', 'Events', 'Activities', 'Academics', 'Sports', 'Community'];

const photos = [
  {
    id: '1',
    title: 'Science Fair 2024',
    description: 'Our annual science fair showcasing innovative projects',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
    category: 'Events',
    date: '2024-03-15',
    tags: ['science fair', 'innovation', 'competition'],
  },
  {
    id: '2',
    title: 'Chemistry Lab Session',
    description: 'Students conducting experiments in the chemistry laboratory',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
    category: 'Academics',
    date: '2024-02-20',
    tags: ['chemistry', 'laboratory', 'experiments'],
  },
  {
    id: '3',
    title: 'Sports Day Victory',
    description: 'Celebrating our victory in the inter-class athletics competition',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    category: 'Sports',
    date: '2024-01-10',
    tags: ['sports', 'athletics', 'victory'],
  },
  {
    id: '4',
    title: 'Community Service',
    description: 'Volunteering at the local environmental conservation project',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    category: 'Community',
    date: '2024-01-05',
    tags: ['community service', 'environment', 'volunteering'],
  },
  {
    id: '5',
    title: 'Field Trip to Research Center',
    description: 'Educational visit to the Ghana Atomic Energy Commission',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
    category: 'Activities',
    date: '2023-12-15',
    tags: ['field trip', 'research', 'education'],
  },
  {
    id: '6',
    title: 'Graduation Ceremony',
    description: 'Celebrating our achievements and looking forward to the future',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
    category: 'Events',
    date: '2023-11-30',
    tags: ['graduation', 'celebration', 'achievement'],
  },
];

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

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
          <StaggerAnimation className="flex flex-wrap justify-center gap-4 mb-12" staggerDelay={0.1}>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
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
        <StaggerAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => openLightbox(index)}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <motion.img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
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
                  <div className="w-16 h-16 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-8 h-8 text-primary-600" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white">
                  <motion.h3 
                    className="text-lg font-semibold mb-1"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {photo.title}
                  </motion.h3>
                  <p className="text-sm text-gray-200 mb-2">{photo.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(photo.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{photo.category}</span>
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
