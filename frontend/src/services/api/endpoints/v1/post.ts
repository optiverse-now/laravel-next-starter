import { CreatePostRequest, Post, PostFilters, PostsResponse, UpdatePostRequest } from '@/domains/post/types';
import { apiClient } from '@/services/api/client';
import { buildQueryString } from '@/lib/utils';

export const postApi = {
  getPosts: async (serviceId: string, filters?: PostFilters): Promise<PostsResponse> => {
    const queryString = buildQueryString(filters);
    const response = await apiClient.get<PostsResponse>(`/api/v1/services/${serviceId}/posts${queryString}`);
    return response.data;
  },

  getPost: async (id: string): Promise<Post> => {
    const response = await apiClient.get<Post>(`/api/v1/posts/${id}`);
    return response.data;
  },

  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await apiClient.post<Post>('/api/v1/posts', data);
    return response.data;
  },

  updatePost: async (id: string, data: UpdatePostRequest): Promise<Post> => {
    const response = await apiClient.put<Post>(`/api/v1/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/posts/${id}`);
  },
};
