'use client';

import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ScrollAnimation from './animations/ScrollAnimation';
import StaggerAnimation from './animations/StaggerAnimation';

const articles = [
  {
    id: '1',
    title: 'The Future of Renewable Energy in Ghana',
    excerpt: 'Exploring how Science 1B students are contributing to sustainable energy solutions through innovative projects and research.',
    author: 'Kwame Asante',
    publishedAt: '2024-01-15',
    category: 'Science',
    tags: ['renewable energy', 'sustainability', 'innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop',
    slug: 'future-renewable-energy-ghana',
    readTime: '8 min read',
  },
  {
    id: '2',
    title: 'Building a Stronger Community Through Science',
    excerpt: 'How our class initiatives are making a positive impact in the local community through science education and outreach programs.',
    author: 'Ama Serwaa',
    publishedAt: '2024-01-10',
    category: 'Community',
    tags: ['community service', 'education', 'outreach'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    slug: 'building-stronger-community-science',
    readTime: '6 min read',
  },
  {
    id: '3',
    title: 'Preparing for University: A Student\'s Guide',
    excerpt: 'Tips and insights from Science 1B students on navigating the university application process and choosing the right path.',
    author: 'Kofi Mensah',
    publishedAt: '2024-01-05',
    category: 'Education',
    tags: ['university', 'career guidance', 'academic planning'],
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
    slug: 'preparing-university-student-guide',
    readTime: '10 min read',
  },
  {
    id: '4',
    title: 'Innovation in Science Education',
    excerpt: 'How modern teaching methods and technology are transforming science education in our classroom.',
    author: 'Dr. Sarah Johnson',
    publishedAt: '2023-12-20',
    category: 'Education',
    tags: ['teaching methods', 'technology', 'innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
    slug: 'innovation-science-education',
    readTime: '7 min read',
  },
  {
    id: '5',
    title: 'My Journey in Science 1B',
    excerpt: 'A personal reflection on the transformative experience of being part of Science 1B and the lessons learned.',
    author: 'Akosua Osei',
    publishedAt: '2023-12-15',
    category: 'Personal Stories',
    tags: ['personal journey', 'reflection', 'growth'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    slug: 'my-journey-science-1b',
    readTime: '5 min read',
  },
  {
    id: '6',
    title: 'Environmental Conservation: Our Responsibility',
    excerpt: 'The importance of environmental conservation and how young people can make a difference in protecting our planet.',
    author: 'Environmental Club',
    publishedAt: '2023-12-10',
    category: 'Community',
    tags: ['environment', 'conservation', 'responsibility'],
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    slug: 'environmental-conservation-responsibility',
    readTime: '9 min read',
  },
];

export default function ArticlesList() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <StaggerAnimation className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" staggerDelay={0.05}>
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="card group hover:shadow-2xl transition-all duration-200 overflow-hidden mobile-optimized"
              whileHover={{ 
                y: -3, 
                scale: 1.01,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden relative">
                <motion.img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-40 sm:h-48 lg:h-52 object-cover mobile-optimized"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                {/* Category Badge */}
                <motion.div
                  className="absolute top-3 left-3 sm:top-4 sm:left-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-white/90 backdrop-blur-sm text-primary-700 rounded-full text-xs font-medium shadow-lg">
                    {article.category}
                  </span>
                </motion.div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-secondary-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{formatDate(article.publishedAt)}</span>
                    <span className="sm:hidden">{formatDate(article.publishedAt).split(',')[0]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <motion.h3 
                  className="text-lg sm:text-xl font-semibold text-secondary-900 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors line-clamp-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {article.title}
                </motion.h3>
                
                <p className="text-sm sm:text-base text-secondary-600 mb-3 sm:mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-secondary-500">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate">{article.author}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {article.tags.slice(0, 2).map((tag, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full"
                      whileHover={{ scale: 1.05, backgroundColor: '#3B82F6', color: 'white' }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                  {article.tags.length > 2 && (
                    <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full">
                      +{article.tags.length - 2}
                    </span>
                  )}
                </div>
                
                <motion.button 
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base touch-target"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Read More
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.article>
          ))}
        </StaggerAnimation>

        {/* Load More Button */}
        <ScrollAnimation className="text-center mt-8 sm:mt-12">
          <motion.button 
            className="btn-primary group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Load More Articles
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </motion.div>
          </motion.button>
        </ScrollAnimation>
      </div>
    </section>
  );
}
