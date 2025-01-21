'use client';

import { useController } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from './Form';
import { Button } from './Button';
import { Image, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { mediaApi } from '@/services/api/endpoints/v1/media';

interface MediaUploaderProps {
  name: string;
  control: any;
  error?: string;
}

export const MediaUploader = ({ name, control, error }: MediaUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      try {
        setIsUploading(true);
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        const media = await mediaApi.uploadMedia(formData);
        onChange(media.id);
      } catch (error) {
        console.error('Failed to upload media:', error);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div
              {...getRootProps()}
              className={cn(
                'border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors',
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary'
              )}
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <div className="py-4">アップロード中...</div>
              ) : value ? (
                <div className="relative">
                  <img
                    src={value}
                    alt="アップロード画像"
                    className="max-h-48 mx-auto"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="py-4">
                  <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    クリックまたはドラッグ&ドロップで画像をアップロード
                  </p>
                </div>
              )}
            </div>
          </FormControl>
          {error && <FormMessage>{error}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
