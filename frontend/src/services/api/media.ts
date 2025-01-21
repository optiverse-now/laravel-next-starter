import { apiClient } from './client';
import { Media, MediaResponse, UploadMediaRequest } from '@/domains/media/types';

export const mediaApi = {
  getMedia: async (serviceId: string, page: number = 1): Promise<MediaResponse> => {
    const response = await apiClient.get<MediaResponse>(`/services/${serviceId}/media`, {
      params: { page },
    });
    return response.data;
  },

  uploadMedia: async (data: UploadMediaRequest): Promise<Media> => {
    const formData = new FormData();
    formData.append('service_id', data.service_id);
    formData.append('file', data.file);
    if (data.name) {
      formData.append('name', data.name);
    }

    const response = await apiClient.post<{ data: Media }>('/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  deleteMedia: async (id: string): Promise<void> => {
    await apiClient.delete(`/media/${id}`);
  },
};
