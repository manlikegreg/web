export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  slug: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  type: 'photo' | 'video';
  videoUrl?: string;
  category: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  category: 'academic' | 'sports' | 'cultural' | 'leadership';
  imageUrl?: string;
}

export interface Student {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
