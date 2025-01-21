'use client';

import { CreateServiceRequest, serviceSchema } from '@/domains/service/types';
import { serviceApi } from '@/services/api/endpoints/v1/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const ServiceForm = () => {
  const [error, setError] = useState<string>('');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceRequest>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = async (data: CreateServiceRequest) => {
    try {
      await serviceApi.createService(data);
      await queryClient.invalidateQueries(['services']);
      reset();
    } catch (error: any) {
      setError(error.response?.data?.message || 'サービスの作成に失敗しました。');
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
          placeholder="サービス名"
          {...register('name')}
          error={errors.name?.message}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? '作成中...' : 'サービスを作成'}
      </Button>
    </form>
  );
};
