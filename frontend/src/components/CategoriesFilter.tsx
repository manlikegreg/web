'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const categories = [
  { name: 'All', count: 25 },
  { name: 'Science', count: 8 },
  { name: 'Education', count: 6 },
  { name: 'Community', count: 4 },
  { name: 'Innovation', count: 3 },
  { name: 'Personal Stories', count: 4 },
];

export default function CategoriesFilter() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <section className="py-8 bg-white border-b border-secondary-200">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === category.name
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 hover:scale-105'
              }`}
            >
              <span>{category.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedCategory === category.name
                  ? 'bg-white bg-opacity-20'
                  : 'bg-secondary-200'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
