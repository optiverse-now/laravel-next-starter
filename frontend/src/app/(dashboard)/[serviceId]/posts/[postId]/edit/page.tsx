'use client';

import { PostForm } from '@/components/features/Post/PostForm/PostForm';
import { postApi } from '@/services/api/endpoints/v1/post';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

interface EditPostPageProps {
  params: {
    serviceId: string;
    postId: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => postApi.getPost(params.postId),
  });

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await postApi.updatePost(params.postId, data);
      toast.success('記事を更新しました');
      router.push(`/${params.serviceId}/posts`);
    } catch (error) {
      console.error('Failed to update post:', error);
      toast.error('記事の更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div>Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-6">
        <div>記事が見つかりません</div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">記事編集</h1>
      <PostForm
        serviceId={params.serviceId}
        post={post}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
