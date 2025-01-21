'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterRequest, registerSchema } from '@/domains/auth/types';
import { authApi } from '@/services/api/endpoints/v1/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const response = await authApi.register(data);
      localStorage.setItem('token', response.token);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || '登録に失敗しました。');
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
          placeholder="名前"
          {...register('name')}
          error={errors.name?.message}
        />
      </div>

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="メールアドレス"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="パスワード"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="パスワード（確認）"
          {...register('password_confirmation')}
          error={errors.password_confirmation?.message}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? '登録中...' : '登録'}
      </Button>
    </form>
  );
};
