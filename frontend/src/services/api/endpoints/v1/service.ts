import { CreateServiceRequest, Service, UpdateServiceOrderRequest, UpdateServiceRequest } from '@/domains/service/types';
import { apiClient } from '@/services/api/client';

export const serviceApi = {
  getServices: async (): Promise<Service[]> => {
    const response = await apiClient.get<Service[]>('/api/v1/services');
    return response.data;
  },

  getService: async (id: string): Promise<Service> => {
    const response = await apiClient.get<Service>(`/api/v1/services/${id}`);
    return response.data;
  },

  createService: async (data: CreateServiceRequest): Promise<Service> => {
    const response = await apiClient.post<Service>('/api/v1/services', data);
    return response.data;
  },

  updateService: async (id: string, data: UpdateServiceRequest): Promise<Service> => {
    const response = await apiClient.put<Service>(`/api/v1/services/${id}`, data);
    return response.data;
  },

  deleteService: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/services/${id}`);
  },

  updateServiceOrder: async (data: UpdateServiceOrderRequest): Promise<void> => {
    await apiClient.put('/api/v1/services/order', data);
  },
};
