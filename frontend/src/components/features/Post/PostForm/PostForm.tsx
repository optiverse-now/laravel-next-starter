'use client';

import { Post, postSchema } from '@/domains/post/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/services/api/endpoints/v1/category';
import { Editor } from '@/components/ui/Editor';
import { MediaUploader } from '@/components/ui/MediaUploader';
import { DateTimePicker } from '@/components/ui/DateTimePicker';

interface PostFormProps {
  serviceId: string;
  post?: Post;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}

type FormData = {
  title: string;
  content: string;
  status: 'draft' | 'published';
  category_ids: string[];
  eyecatch_media_id: string | null;
  published_at: string | null;
};

export const PostForm = ({
  serviceId,
  post,
  onSubmit,
  isSubmitting,
}: PostFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post
      ? {
          title: post.title,
          content: post.content,
          status: post.status,
          category_ids: post.categories?.map((c) => c.id) || [],
          eyecatch_media_id: post.eyecatch_media_id,
          published_at: post.published_at,
        }
      : {
          status: 'draft',
          category_ids: [],
          eyecatch_media_id: null,
          published_at: null,
        },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories', serviceId],
    queryFn: () => categoryApi.getCategories(serviceId),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Input
              {...register('title')}
              placeholder="タイトルを入力"
              error={errors.title?.message}
            />
          </div>

          <div>
            <Editor
              name="content"
              control={control}
              error={errors.content?.message}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Select
              {...register('status')}
              options={[
                { value: 'draft', label: '下書き' },
                { value: 'published', label: '公開' },
              ]}
              error={errors.status?.message}
            />

            <DateTimePicker
              name="published_at"
              control={control}
              error={errors.published_at?.message}
            />
          </div>

          <div>
            <Select
              {...register('category_ids')}
              options={
                categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                })) || []
              }
              isMulti
              error={errors.category_ids?.message}
            />
          </div>

          <div>
            <MediaUploader
              name="eyecatch_media_id"
              control={control}
              error={errors.eyecatch_media_id?.message}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button">
          キャンセル
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : '保存'}
        </Button>
      </div>
    </form>
  );
};
