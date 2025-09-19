'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import LightweightAnimation from '@/components/animations/LightweightAnimation';

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-secondary-200'
          : 'bg-white/90 backdrop-blur-sm shadow-sm border-b border-secondary-200'
      }`}
    >
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="hover:scale-105 transition-transform duration-200">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-900">
                  Science 1B
                </h1>
                <p className="text-xs sm:text-sm text-secondary-600">
                  St. John's Grammar SHS
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item, index) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 group rounded-lg hover:-translate-y-0.5 ${
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <span className="relative z-10">
                    {item.name}
                  </span>
                  {pathname === item.href && (
                    <div className="absolute inset-0 bg-primary-100 rounded-lg transition-all duration-300" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Navigation - Responsive Layout */}
          <div className="md:hidden flex items-center space-x-1">
            {/* Primary navigation items - responsive based on screen width */}
            <div className="flex items-center space-x-1">
              {navigation.slice(0, 3).map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 touch-target whitespace-nowrap ${
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Dropdown for additional items */}
            <div className="relative">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 touch-target flex items-center space-x-1 active:scale-95 ${
                  mobileMenuOpen
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <span className="hidden xs:inline">More</span>
                <div className={`transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-3 h-3" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Dropdown for remaining items */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-secondary-200 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300">
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navigation.slice(3).map((item, index) => (
                <div key={item.name}>
                  <Link
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
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
