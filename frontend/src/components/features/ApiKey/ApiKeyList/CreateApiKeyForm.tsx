'use client';

import { createApiKeySchema } from '@/domains/apiKey/types';
import { apiKeyApi } from '@/services/api/apiKey';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useQueryClient } from '@tanstack/react-query';

interface CreateApiKeyFormProps {
  serviceId: string;
  onClose: () => void;
}

export const CreateApiKeyForm = ({ serviceId, onClose }: CreateApiKeyFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: {
      service_id: serviceId,
      name: '',
    },
  });

  const onSubmit = async (data: { service_id: string; name: string }) => {
    try {
      await apiKeyApi.createApiKey(data);
      await queryClient.invalidateQueries(['apiKeys', serviceId]);
      toast.success('APIキーを作成しました');
      onClose();
    } catch (error) {
      toast.error('APIキーの作成に失敗しました');
    }
  };

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="APIキー名"
                    error={form.formState.errors.name?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit">作成</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
