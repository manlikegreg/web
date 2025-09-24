'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

export default function RateLimitMonitor() {
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Monitor fetch responses for rate limit headers
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      
      // Check for rate limit headers
      const limit = response.headers.get('RateLimit-Limit');
      const remaining = response.headers.get('RateLimit-Remaining');
      const reset = response.headers.get('RateLimit-Reset');
      const retryAfter = response.headers.get('Retry-After');
      
      if (limit && remaining && reset) {
        const rateLimitData: RateLimitInfo = {
          limit: parseInt(limit),
          remaining: parseInt(remaining),
          reset: parseInt(reset) * 1000, // Convert to milliseconds
          retryAfter: retryAfter ? parseInt(retryAfter) * 1000 : undefined,
        };
        
        setRateLimitInfo(rateLimitData);
        
        // Show warning if remaining requests are low
        if (rateLimitData.remaining < 50) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
      
      // Check for 429 status (rate limited)
      if (response.status === 429) {
        setIsVisible(true);
      }
      
      return response;
    };
    
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  if (!isVisible || !rateLimitInfo) {
    return null;
  }

  const getStatusColor = () => {
    if (rateLimitInfo.remaining < 10) return 'text-red-600 bg-red-50 border-red-200';
    if (rateLimitInfo.remaining < 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getStatusIcon = () => {
    if (rateLimitInfo.remaining < 10) return <AlertCircle className="w-4 h-4" />;
    if (rateLimitInfo.remaining < 50) return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getStatusMessage = () => {
    if (rateLimitInfo.remaining < 10) {
      return 'Rate limit almost reached. Please slow down your requests.';
    }
    if (rateLimitInfo.remaining < 50) {
      return 'Rate limit warning. Consider reducing request frequency.';
    }
    return 'API requests are within normal limits.';
  };

  const formatResetTime = (resetTime: number) => {
    const now = Date.now();
    const timeLeft = resetTime - now;
    
    if (timeLeft <= 0) return 'Reset now';
    
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    
    if (minutes > 0) {
      return `Resets in ${minutes}m ${seconds}s`;
    }
    return `Resets in ${seconds}s`;
  };

  return (
    <div className={`fixed top-20 right-4 z-50 max-w-sm transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
    }`}>
      <div className={`p-3 rounded-lg border shadow-lg ${getStatusColor()}`}>
        <div className="flex items-start space-x-2">
          {getStatusIcon()}
          <div className="flex-1">
            <p className="text-sm font-medium">
              {getStatusMessage()}
            </p>
            <div className="mt-1 text-xs space-y-1">
              <div className="flex justify-between">
                <span>Requests remaining:</span>
                <span className="font-mono">{rateLimitInfo.remaining}/{rateLimitInfo.limit}</span>
              </div>
              <div className="flex justify-between">
                <span>Reset time:</span>
                <span className="font-mono">{formatResetTime(rateLimitInfo.reset)}</span>
              </div>
              {rateLimitInfo.retryAfter && (
                <div className="flex justify-between">
                  <span>Retry after:</span>
                  <span className="font-mono">{Math.ceil(rateLimitInfo.retryAfter / 1000)}s</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}