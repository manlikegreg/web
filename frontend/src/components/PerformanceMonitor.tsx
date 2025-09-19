'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    const reportMetrics = (metrics: PerformanceMetrics) => {
      // In a real app, you would send this to your analytics service
      console.log('Performance Metrics:', metrics);
      
      // Example: Send to analytics
      // analytics.track('performance_metrics', metrics);
    };

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          reportMetrics({ fcp: fcpEntry.startTime });
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        reportMetrics({ lcp: lastEntry.startTime });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          reportMetrics({ fid: entry.processingStart - entry.startTime });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        reportMetrics({ cls: clsValue });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    };

    // Measure Time to First Byte
    const measureTTFB = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        reportMetrics({ ttfb });
      }
    };

    // Run measurements
    measureWebVitals();
    measureTTFB();

    // Measure page load time
    const measurePageLoad = () => {
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page Load Time:', loadTime, 'ms');
      });
    };

    measurePageLoad();

    // Cleanup
    return () => {
      // Cleanup observers if needed
    };
  }, []);

  return null; // This component doesn't render anything
}

// Hook for measuring component performance
export function usePerformanceMeasure(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time:`, renderTime.toFixed(2), 'ms');
      }
    };
  }, [componentName]);
}

// Hook for measuring async operations
export function useAsyncPerformance() {
  const measureAsync = async function<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await operation();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${operationName} took:`, duration.toFixed(2), 'ms');
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.error(`${operationName} failed after:`, duration.toFixed(2), 'ms', error);
      throw error;
    }
  };

  return { measureAsync };
}