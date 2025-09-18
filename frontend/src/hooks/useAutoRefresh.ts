'use client';

import { useEffect, useRef } from 'react';

interface UseAutoRefreshOptions {
  enabled?: boolean;
  interval?: number;
  onRefresh?: () => void;
}

export function useAutoRefresh({ 
  enabled = true, 
  interval = 30000, // 30 seconds
  onRefresh 
}: UseAutoRefreshOptions = {}) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onRefreshRef = useRef(onRefresh);

  // Update the ref when onRefresh changes
  useEffect(() => {
    onRefreshRef.current = onRefresh;
  }, [onRefresh]);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      if (onRefreshRef.current) {
        onRefreshRef.current();
      }
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, interval]);

  return {
    start: () => {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => {
        if (onRefreshRef.current) {
          onRefreshRef.current();
        }
      }, interval);
    },
    stop: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    },
  };
}