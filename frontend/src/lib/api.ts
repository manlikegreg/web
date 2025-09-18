// API client for connecting to the backend
// Hardcode deployed backend URL (ignore env overrides)
const API_BASE_URL = 'https://web-xplc.onrender.com';
const API_URL = `${API_BASE_URL}/api`;

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

export interface Leadership {
  id: string;
  name: string;
  position: string;
  profilePic?: string;
  bio?: string;
  order: number;
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const headers: Record<string, string> = {
      ...(options.headers as any),
    };
    const method = (options.method || 'GET').toUpperCase();
    if (method !== 'GET' && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    const config: RequestInit = {
      headers,
      mode: 'cors',
      signal: controller.signal,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
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

  // Settings API (site-wide content like Home/About/Contact)
  async getSettings(): Promise<ApiResponse<Record<string, string>>> {
    return this.request<Record<string, string>>('/settings');
  }

  async updateSettings(values: Record<string, string>): Promise<ApiResponse<null>> {
    return this.request<null>('/settings', {
      method: 'PUT',
      body: JSON.stringify(values),
    });
  }

  // Upload API
  async uploadFile(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${this.baseURL}/upload`, { method: 'POST', body: formData });
    if (!res.ok) {
      return { success: false, error: `Upload failed (${res.status})` } as any;
    }
    const data = await res.json();
    return data;
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

  // Leadership API
  async getLeadershipMembers(): Promise<ApiResponse<Leadership[]>> {
    return this.request<Leadership[]>('/leadership');
  }

  async getLeadershipMember(id: string): Promise<ApiResponse<Leadership>> {
    return this.request<Leadership>(`/leadership/${id}`);
  }

  async createLeadershipMember(member: Omit<Leadership, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Leadership>> {
    return this.request<Leadership>('/leadership', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async updateLeadershipMember(id: string, member: Partial<Leadership>): Promise<ApiResponse<Leadership>> {
    return this.request<Leadership>(`/leadership/${id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    });
  }

  async deleteLeadershipMember(id: string): Promise<ApiResponse<null>> {
    return this.request<null>(`/leadership/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderLeadershipMembers(members: Leadership[]): Promise<ApiResponse<null>> {
    return this.request<null>('/leadership/reorder', {
      method: 'PUT',
      body: JSON.stringify({ members }),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    return this.request<{ message: string; timestamp: string }>('/health');
  }
}

// Create and export API client instance
export const apiClient = new ApiClient();

// Export individual methods for convenience with proper binding
export const getStudents = apiClient.getStudents.bind(apiClient);
export const getStudent = apiClient.getStudent.bind(apiClient);
export const createStudent = apiClient.createStudent.bind(apiClient);
export const updateStudent = apiClient.updateStudent.bind(apiClient);
export const deleteStudent = apiClient.deleteStudent.bind(apiClient);
export const getArticles = apiClient.getArticles.bind(apiClient);
export const getArticle = apiClient.getArticle.bind(apiClient);
export const createArticle = apiClient.createArticle.bind(apiClient);
export const updateArticle = apiClient.updateArticle.bind(apiClient);
export const deleteArticle = apiClient.deleteArticle.bind(apiClient);
export const getGalleryItems = apiClient.getGalleryItems.bind(apiClient);
export const getGalleryItem = apiClient.getGalleryItem.bind(apiClient);
export const createGalleryItem = apiClient.createGalleryItem.bind(apiClient);
export const updateGalleryItem = apiClient.updateGalleryItem.bind(apiClient);
export const deleteGalleryItem = apiClient.deleteGalleryItem.bind(apiClient);
export const getLeadershipMembers = apiClient.getLeadershipMembers.bind(apiClient);
export const getLeadershipMember = apiClient.getLeadershipMember.bind(apiClient);
export const createLeadershipMember = apiClient.createLeadershipMember.bind(apiClient);
export const updateLeadershipMember = apiClient.updateLeadershipMember.bind(apiClient);
export const deleteLeadershipMember = apiClient.deleteLeadershipMember.bind(apiClient);
export const reorderLeadershipMembers = apiClient.reorderLeadershipMembers.bind(apiClient);
export const getSettings = apiClient.getSettings.bind(apiClient);
export const updateSettings = apiClient.updateSettings.bind(apiClient);
export const uploadFile = apiClient.uploadFile.bind(apiClient);
export const healthCheck = apiClient.healthCheck.bind(apiClient);

// Utility function to check if API is available
export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) return false;
    const data = await res.json();
    return !!data?.success;
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
  return API_BASE_URL;
}
