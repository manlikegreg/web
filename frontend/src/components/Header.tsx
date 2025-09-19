'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Students/Teachers', href: '/students' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Articles', href: '/articles' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-secondary-200'
          : 'bg-white/90 backdrop-blur-sm shadow-sm border-b border-secondary-200'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
              <div className="hidden sm:block">
                <motion.h1
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-900"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Science 1B
                </motion.h1>
                <motion.p
                  className="text-xs sm:text-sm text-secondary-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  St. John's Grammar SHS
                </motion.p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 group rounded-lg ${
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    {item.name}
                  </motion.span>
                  {pathname === item.href && (
                    <motion.div
                      className="absolute inset-0 bg-primary-100 rounded-lg"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation - Direct Buttons */}
          <div className="md:hidden flex items-center space-x-1">
            {navigation.slice(0, 4).map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 touch-target ${
                  pathname === item.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* More button for remaining items */}
            <div className="relative">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="px-2 py-2 text-xs font-medium rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-primary-50 touch-target"
              >
                More
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Dropdown for remaining items */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden border-t border-secondary-200 bg-white/95 backdrop-blur-sm"
            >
              <div className="px-4 pt-3 pb-4 space-y-1">
                {navigation.slice(4).map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 touch-target ${
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
