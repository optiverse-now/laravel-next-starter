import { z } from 'zod';

// バリデーションスキーマ
export const serviceSchema = z.object({
  name: z.string().min(1, '名前を入力してください').max(20, '名前は20文字以内で入力してください'),
});

export const serviceOrderSchema = z.object({
  order: z.array(z.string().uuid('無効なIDです')),
});

// 型定義
export type CreateServiceRequest = z.infer<typeof serviceSchema>;
export type UpdateServiceRequest = z.infer<typeof serviceSchema>;
export type UpdateServiceOrderRequest = z.infer<typeof serviceOrderSchema>;

export interface Service {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}
