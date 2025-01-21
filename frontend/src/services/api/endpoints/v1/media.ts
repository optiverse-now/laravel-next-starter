import { Media } from '@/domains/media/types';
import { apiClient } from '@/services/api/client';

export const mediaApi = {
  uploadMedia: async (formData: FormData): Promise<Media> => {
    const response = await apiClient.post<Media>('/api/v1/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteMedia: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/media/${id}`);
  },
};
