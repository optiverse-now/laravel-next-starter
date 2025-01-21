import { z } from 'zod';

export const createApiKeySchema = z.object({
  service_id: z.string().uuid(),
  name: z.string().min(1).max(255),
});

export type CreateApiKeyRequest = z.infer<typeof createApiKeySchema>;

export interface ApiKey {
  id: string;
  service_id: string;
  name: string;
  key?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiKeysResponse {
  data: ApiKey[];
}
