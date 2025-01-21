import { apiClient } from './client';
import { ApiKey, ApiKeysResponse, CreateApiKeyRequest } from '@/domains/apiKey/types';

export const apiKeyApi = {
  getApiKeys: async (serviceId: string): Promise<ApiKey[]> => {
    const response = await apiClient.get<ApiKeysResponse>(`/services/${serviceId}/api-keys`);
    return response.data.data;
  },

  createApiKey: async (data: CreateApiKeyRequest): Promise<ApiKey> => {
    const response = await apiClient.post<{ data: ApiKey }>('/api-keys', data);
    return response.data.data;
  },

  deleteApiKey: async (id: string): Promise<void> => {
    await apiClient.delete(`/api-keys/${id}`);
  },
};
