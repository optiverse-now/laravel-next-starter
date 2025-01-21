'use client';

import { CreateCategoryRequest, categorySchema } from '@/domains/category/types';
import { categoryApi } from '@/services/api/endpoints/v1/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface CategoryFormProps {
  serviceId: string;
}

export const CategoryForm = ({ serviceId }: CategoryFormProps) => {
  const [error, setError] = useState<string>('');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryRequest>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      service_id: serviceId,
    },
  });

  const onSubmit = async (data: CreateCategoryRequest) => {
    try {
      await categoryApi.createCategory(data);
      await queryClient.invalidateQueries(['categories', serviceId]);
      reset();
    } catch (error: any) {
      setError(error.response?.data?.message || 'カテゴリの作成に失敗しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Input
          type="text"
          placeholder="カテゴリ名"
          {...register('name')}
          error={errors.name?.message}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? '作成中...' : 'カテゴリを作成'}
      </Button>
    </form>
  );
};
