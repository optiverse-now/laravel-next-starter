'use client';

import { uploadMediaSchema } from '@/domains/media/types';
import { mediaApi } from '@/services/api/media';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadMediaFormProps {
  serviceId: string;
  onClose: () => void;
}

export const UploadMediaForm = ({ serviceId, onClose }: UploadMediaFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(uploadMediaSchema),
    defaultValues: {
      service_id: serviceId,
      name: '',
      file: undefined,
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      form.setValue('file', acceptedFiles[0]);
      if (!form.getValues('name')) {
        form.setValue('name', acceptedFiles[0].name);
      }
    }
  }, [form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const onSubmit = async (data: { service_id: string; name: string; file: File }) => {
    try {
      await mediaApi.uploadMedia(data);
      await queryClient.invalidateQueries({ queryKey: ['media', serviceId] });
      toast.success('メディアをアップロードしました');
      onClose();
    } catch (error) {
      toast.error('メディアのアップロードに失敗しました');
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
                    placeholder="ファイル名"
                    error={form.formState.errors.name?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer ${
              isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {form.getValues('file') ? (
              <p>{form.getValues('file').name}</p>
            ) : isDragActive ? (
              <p>ここにファイルをドロップ</p>
            ) : (
              <p>クリックまたはドラッグ&ドロップでファイルを選択</p>
            )}
          </div>
          {form.formState.errors.file && (
            <p className="text-sm text-red-500">
              {form.formState.errors.file.message?.toString()}
            </p>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit">アップロード</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
