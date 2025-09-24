export interface Student {
  id: string;
  name: string;
  role: string;
  profilePic?: string | null;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: Student;
}

export interface Gallery {
  id: string;
  imageUrl: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
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

export interface CreateStudentData {
  name: string;
  role: string;
  profilePic?: string;
  bio?: string;
}

export interface CreateArticleData {
  title: string;
  content: string;
  authorId: string;
}

export interface CreateGalleryData {
  imageUrl: string;
  caption?: string;
}
