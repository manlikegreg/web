'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const featuredArticles = [
  {
    id: '1',
    title: 'The Future of Renewable Energy in Ghana',
    excerpt: 'Exploring how Science 1B students are contributing to sustainable energy solutions through innovative projects and research.',
    author: 'Kwame Asante',
    publishedAt: '2024-01-15',
    category: 'Science',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&h=300&fit=crop',
    slug: 'future-renewable-energy-ghana',
  },
  {
    id: '2',
    title: 'Building a Stronger Community Through Science',
    excerpt: 'How our class initiatives are making a positive impact in the local community through science education and outreach programs.',
    author: 'Ama Serwaa',
    publishedAt: '2024-01-10',
    category: 'Community',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
    slug: 'building-stronger-community-science',
  },
  {
    id: '3',
    title: 'Preparing for University: A Student\'s Guide',
    excerpt: 'Tips and insights from Science 1B students on navigating the university application process and choosing the right path.',
    author: 'Kofi Mensah',
    publishedAt: '2024-01-05',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop',
    slug: 'preparing-university-student-guide',
  },
];

export default function FeaturedArticles() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Featured Articles
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover insights, stories, and perspectives from our Science 1B students and community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-secondary-500 mb-3">
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-secondary-500">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/articles" className="btn-primary group">
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
