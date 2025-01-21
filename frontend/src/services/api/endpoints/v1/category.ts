import { Category, CreateCategoryRequest, UpdateCategoryOrderRequest, UpdateCategoryRequest } from '@/domains/category/types';
import { apiClient } from '@/services/api/client';

export const categoryApi = {
  getCategories: async (serviceId: string): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>(`/api/v1/services/${serviceId}/categories`);
    return response.data;
  },

  getCategory: async (id: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/api/v1/categories/${id}`);
    return response.data;
  },

  createCategory: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post<Category>('/api/v1/categories', data);
    return response.data;
  },

  updateCategory: async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
    const response = await apiClient.put<Category>(`/api/v1/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/categories/${id}`);
  },

  updateCategoryOrder: async (serviceId: string, data: UpdateCategoryOrderRequest): Promise<void> => {
    await apiClient.put(`/api/v1/services/${serviceId}/categories/order`, data);
  },
};
