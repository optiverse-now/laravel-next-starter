import { AuthResponse, LoginRequest, RegisterRequest } from '@/domains/auth/types';
import { apiClient } from '@/services/api/client';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/api/v1/auth/logout');
  },

  refresh: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/refresh');
    return response.data;
  },

  me: async (): Promise<AuthResponse> => {
    const response = await apiClient.get<AuthResponse>('/api/v1/auth/me');
    return response.data;
  },
};
