'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginRequest, loginSchema } from '@/domains/auth/types';
import { authApi } from '@/services/api/endpoints/v1/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await authApi.login(data);
      localStorage.setItem('token', response.token);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'ログインに失敗しました。');
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

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('remember')}
          className="rounded border-gray-300"
        />
        <label className="text-sm text-gray-600">ログイン状態を保持する</label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  );
};
