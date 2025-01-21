'use client';

import { Media } from '@/domains/media/types';
import { mediaApi } from '@/services/api/media';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MediaListItem } from './MediaListItem';
import { UploadMediaForm } from './UploadMediaForm';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { Pagination } from '@/components/ui/Pagination';

interface MediaListProps {
  serviceId: string;
}

export const MediaList = ({ serviceId }: MediaListProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data: mediaResponse, isLoading } = useQuery({
    queryKey: ['media', serviceId, page],
    queryFn: () => mediaApi.getMedia(serviceId, page),
  });

  const handleDelete = async (media: Media) => {
    try {
      await mediaApi.deleteMedia(media.id);
      toast.success('メディアを削除しました');
    } catch (error) {
      toast.error('メディアの削除に失敗しました');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">メディアライブラリ</h2>
        <Button onClick={() => setIsFormOpen(true)}>アップロード</Button>
      </div>

      {isFormOpen && (
        <UploadMediaForm
          serviceId={serviceId}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaResponse?.data.map((media) => (
          <MediaListItem
            key={media.id}
            media={media}
            onDelete={() => handleDelete(media)}
          />
        ))}
      </div>

      {mediaResponse && (
        <Pagination
          currentPage={mediaResponse.meta.current_page}
          lastPage={mediaResponse.meta.last_page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
