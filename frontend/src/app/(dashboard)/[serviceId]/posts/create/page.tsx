'use client';

import { PostForm } from '@/components/features/Post/PostForm/PostForm';
import { postApi } from '@/services/api/endpoints/v1/post';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface CreatePostPageProps {
  params: {
    serviceId: string;
  };
}

export default function CreatePostPage({ params }: CreatePostPageProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await postApi.createPost({
        ...data,
        service_id: params.serviceId,
      });
      toast.success('記事を作成しました');
      router.push(`/${params.serviceId}/posts`);
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error('記事の作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">新規記事作成</h1>
      <PostForm
        serviceId={params.serviceId}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
