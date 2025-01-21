import { z } from 'zod';
import { Category } from '../category/types';
import { Media } from '../media/types';
import { User } from '../user/types';

// バリデーションスキーマ
export const postSchema = z.object({
  service_id: z.string().uuid('無効なサービスIDです'),
  title: z.string().min(1, 'タイトルを入力してください').max(255, 'タイトルは255文字以内で入力してください'),
  content: z.string().min(1, '本文を入力してください'),
  status: z.enum(['draft', 'published'], {
    required_error: 'ステータスを選択してください',
    invalid_type_error: '無効なステータスです',
  }),
  category_ids: z.array(z.string().uuid('無効なカテゴリIDです')).optional(),
  eyecatch_media_id: z.string().uuid('無効なメディアIDです').optional().nullable(),
  published_at: z.string().datetime().optional().nullable(),
});

// 型定義
export type CreatePostRequest = z.infer<typeof postSchema>;
export type UpdatePostRequest = Omit<CreatePostRequest, 'service_id'>;

export interface Post {
  id: string;
  service_id: string;
  user_id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  eyecatch_media_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  eyecatch_media?: Media;
  user?: User;
}

export interface PostsResponse {
  data: Post[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface PostFilters {
  status?: 'draft' | 'published';
  category_id?: string;
  search?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  page?: number;
}
