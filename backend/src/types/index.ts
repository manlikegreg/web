export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  published_at: string;
  category: string;
  tags: string[];
  image_url?: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  type: 'photo' | 'video';
  video_url?: string;
  category: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  category: 'academic' | 'sports' | 'cultural' | 'leadership';
  image_url?: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DatabaseError extends Error {
  code?: string;
  detail?: string;
  constraint?: string;
}
