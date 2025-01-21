import { z } from 'zod';

export const uploadMediaSchema = z.object({
  service_id: z.string().uuid(),
  file: z.instanceof(File),
  name: z.string().min(1).max(255).optional(),
});

export type UploadMediaRequest = z.infer<typeof uploadMediaSchema>;

export interface Media {
  id: string;
  service_id: string;
  name: string;
  file_path: string;
  mime_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

export interface MediaResponse {
  data: Media[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
