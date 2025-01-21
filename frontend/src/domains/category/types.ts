import { z } from 'zod';

// バリデーションスキーマ
export const categorySchema = z.object({
  service_id: z.string().uuid('無効なサービスIDです'),
  name: z.string().min(1, '名前を入力してください').max(20, '名前は20文字以内で入力してください'),
});

export const categoryOrderSchema = z.object({
  order: z.array(z.string().uuid('無効なIDです')),
});

// 型定義
export type CreateCategoryRequest = z.infer<typeof categorySchema>;
export type UpdateCategoryRequest = Pick<CreateCategoryRequest, 'name'>;
export type UpdateCategoryOrderRequest = z.infer<typeof categoryOrderSchema>;

export interface Category {
  id: string;
  service_id: string;
  name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}
