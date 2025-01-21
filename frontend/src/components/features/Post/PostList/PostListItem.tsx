'use client';

import { Post } from '@/domains/post/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

interface PostListItemProps {
  post: Post;
}

export const PostListItem = ({ post }: PostListItemProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium truncate">{post.title}</h3>
          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
            <span>{formatDate(post.updated_at)}</span>
            <span>•</span>
            <span>{post.user?.name}</span>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <Badge variant={post.status === 'published' ? 'success' : 'secondary'}>
              {post.status === 'published' ? '公開' : '下書き'}
            </Badge>
            {post.categories?.map((category) => (
              <Badge key={category.id} variant="outline">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        {post.eyecatch_media && (
          <div className="ml-4 flex-shrink-0">
            <img
              src={post.eyecatch_media.file_path}
              alt={post.title}
              className="h-16 w-16 object-cover rounded"
            />
          </div>
        )}
      </div>
    </Card>
  );
};
