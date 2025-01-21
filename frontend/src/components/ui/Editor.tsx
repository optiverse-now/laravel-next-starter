'use client';

import { useController } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { FormControl, FormField, FormItem, FormMessage } from './Form';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded" />,
});

interface EditorProps {
  name: string;
  control: any;
  error?: string;
}

export const Editor = ({ name, control, error }: EditorProps) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={onChange}
              className="h-64"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
          </FormControl>
          {error && <FormMessage>{error}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
