'use client';

import { Media } from '@/domains/media/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatDate, formatFileSize } from '@/lib/utils';
import Image from 'next/image';

interface MediaListItemProps {
  media: Media;
  onDelete: () => void;
}

export const MediaListItem = ({ media, onDelete }: MediaListItemProps) => {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="relative aspect-square">
          <Image
            src={`/storage/${media.file_path}`}
            alt={media.name}
            fill
            className="object-cover rounded"
          />
        </div>
        <div>
          <h3 className="font-medium truncate">{media.name}</h3>
          <p className="text-sm text-gray-500">
            {formatFileSize(media.file_size)} • {formatDate(media.created_at)}
          </p>
        </div>
        <Button
          variant="destructive"
          onClick={onDelete}
          className="w-full"
        >
          削除
        </Button>
      </div>
    </Card>
  );
};
