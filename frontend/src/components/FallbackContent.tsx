'use client';

import { useEffect, useState } from 'react';

interface FallbackContentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}

export default function FallbackContent({ 
  children, 
  fallback,
  delay = 2000 
}: FallbackContentProps) {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (showFallback && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Default fallback component for when content fails to load
export function DefaultFallback({ message = "Content is loading..." }: { message?: string }) {
  return (
    <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
        <p className="text-sm text-gray-500 mt-2">If this persists, please refresh the page</p>
      </div>
    </div>
  );
}