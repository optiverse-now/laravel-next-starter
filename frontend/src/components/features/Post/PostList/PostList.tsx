'use client';

import { Post, PostFilters } from '@/domains/post/types';
import { postApi } from '@/services/api/endpoints/v1/post';
import { useQuery } from '@tanstack/react-query';
import { PostListItem } from './PostListItem';
import { PostListFilter } from './PostListFilter';
import { useState } from 'react';
import { Pagination } from '@/components/ui/Pagination';

interface PostListProps {
  serviceId: string;
}

export const PostList = ({ serviceId }: PostListProps) => {
  const [filters, setFilters] = useState<PostFilters>({
    page: 1,
    sort: 'updated_at',
    direction: 'desc',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['posts', serviceId, filters],
    queryFn: () => postApi.getPosts(serviceId, filters),
  });

  const handleFilterChange = (newFilters: Partial<PostFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PostListFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        serviceId={serviceId}
      />

      <div className="space-y-4">
        {data?.data.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>

      {data && (
        <Pagination
          currentPage={data.meta.current_page}
          lastPage={data.meta.last_page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
