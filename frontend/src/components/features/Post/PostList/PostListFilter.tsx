'use client';

import { PostFilters } from '@/domains/post/types';
import { Category } from '@/domains/category/types';
import { categoryApi } from '@/services/api/endpoints/v1/category';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface PostListFilterProps {
  filters: PostFilters;
  onFilterChange: (filters: Partial<PostFilters>) => void;
  serviceId: string;
}

const filterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
  category_id: z.string().uuid().optional(),
  from_date: z.string().optional(),
  to_date: z.string().optional(),
  sort: z.string().optional(),
  direction: z.enum(['asc', 'desc']).optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

export const PostListFilter = ({
  filters,
  onFilterChange,
  serviceId,
}: PostListFilterProps) => {
  const { data: categories } = useQuery({
    queryKey: ['categories', serviceId],
    queryFn: () => categoryApi.getCategories(serviceId),
  });

  const { register, handleSubmit, control } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: filters,
  });

  const onSubmit = (data: FilterFormData) => {
    onFilterChange(data);
  };

  const statusOptions = [
    { value: '', label: 'すべて' },
    { value: 'draft', label: '下書き' },
    { value: 'published', label: '公開' },
  ];

  const sortOptions = [
    { value: 'updated_at', label: '更新日時' },
    { value: 'created_at', label: '作成日時' },
    { value: 'published_at', label: '公開日時' },
    { value: 'title', label: 'タイトル' },
  ];

  const directionOptions = [
    { value: 'desc', label: '降順' },
    { value: 'asc', label: '昇順' },
  ];

  const categoryOptions = [
    { value: '', label: 'すべて' },
    ...(categories?.map(category => ({
      value: category.id,
      label: category.name,
    })) || []),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="検索..."
            {...register('search')}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="w-40">
          <Select
            options={statusOptions}
            placeholder="ステータス"
            {...register('status')}
          />
        </div>
        <div className="w-40">
          <Select
            options={categoryOptions}
            placeholder="カテゴリ"
            {...register('category_id')}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-40">
          <DateTimePicker
            name="from_date"
            control={control}
            placeholder="開始日時"
          />
        </div>
        <div className="w-40">
          <DateTimePicker
            name="to_date"
            control={control}
            placeholder="終了日時"
          />
        </div>
        <div className="w-40">
          <Select
            options={sortOptions}
            placeholder="並び順"
            {...register('sort')}
          />
        </div>
        <div className="w-40">
          <Select
            options={directionOptions}
            placeholder="順序"
            {...register('direction')}
          />
        </div>
        <Button type="submit">検索</Button>
      </div>
    </form>
  );
};
