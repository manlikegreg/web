// API client for connecting to the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || `${API_BASE_URL}/api`;

// Types for API responses
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

export interface Student {
  id: string;
  name: string;
  role: string;
  profilePic?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: Student;
}

export interface Gallery {
  id: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
  updatedAt: string;
}

// API client class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  // Students API
  async getStudents(): Promise<ApiResponse<Student[]>> {
    return this.request<Student[]>('/students');
  }

  async getStudent(id: string): Promise<ApiResponse<Student>> {
    return this.request<Student>(`/students/${id}`);
  }

  async createStudent(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Student>> {
    return this.request<Student>('/students', {
      method: 'POST',
      body: JSON.stringify(student),
    });
  }

  async updateStudent(id: string, student: Partial<Student>): Promise<ApiResponse<Student>> {
    return this.request<Student>(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(student),
    });
  }

  async deleteStudent(id: string): Promise<ApiResponse<null>> {
    return this.request<null>(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  // Articles API
  async getArticles(page: number = 1, limit: number = 10): Promise<ApiResponse<Article[]>> {
    return this.request<Article[]>(`/articles?page=${page}&limit=${limit}`);
  }

  async getArticle(id: string): Promise<ApiResponse<Article>> {
    return this.request<Article>(`/articles/${id}`);
  }

  async createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Article>> {
    return this.request<Article>('/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  }

  async updateArticle(id: string, article: Partial<Article>): Promise<ApiResponse<Article>> {
    return this.request<Article>(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    });
  }

  async deleteArticle(id: string): Promise<ApiResponse<null>> {
    return this.request<null>(`/articles/${id}`, {
      method: 'DELETE',
    });
  }

  // Gallery API
  async getGalleryItems(page: number = 1, limit: number = 12): Promise<ApiResponse<Gallery[]>> {
    return this.request<Gallery[]>(`/gallery?page=${page}&limit=${limit}`);
  }

  async getGalleryItem(id: string): Promise<ApiResponse<Gallery>> {
    return this.request<Gallery>(`/gallery/${id}`);
  }

  async createGalleryItem(item: Omit<Gallery, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Gallery>> {
    return this.request<Gallery>('/gallery', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateGalleryItem(id: string, item: Partial<Gallery>): Promise<ApiResponse<Gallery>> {
    return this.request<Gallery>(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  }

  async deleteGalleryItem(id: string): Promise<ApiResponse<null>> {
    return this.request<null>(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    return this.request<{ message: string; timestamp: string }>('/health');
  }
}

// Create and export API client instance
export const apiClient = new ApiClient();

// Export individual methods for convenience
export const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  healthCheck,
} = apiClient;

// Utility function to check if API is available
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await healthCheck();
    return response.success;
  } catch {
    return false;
  }
}

// Utility function to get API base URL
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

// Utility function to get full API URL
export function getApiUrl(): string {
  return API_URL;
}
