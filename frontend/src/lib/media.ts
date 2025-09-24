'use client';

import { getApiBaseUrl } from './api';

export function resolveMediaUrl(url?: string): string {
  if (!url) return '';
  const value = url.trim();
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('/uploads/')) return `${getApiBaseUrl()}${value}`;
  return value;
}

export function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg') || lower.includes('/videos/');
}

