'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn('space-y-4', className)}
        {...props}
      />
    );
  }
);
Form.displayName = 'Form';

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
      />
    );
  }
);
FormItem.displayName = 'FormItem';

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('', className)}
        {...props}
      />
    );
  }
);
FormControl.displayName = 'FormControl';

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-red-500', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormMessage.displayName = 'FormMessage';

interface FormFieldProps {
  name: string;
  control: any;
  render: (props: { field: any }) => React.ReactNode;
}

const FormField = ({ name, control, render }: FormFieldProps) => {
  const field = {
    name,
    value: control._formValues[name],
    onChange: (value: any) => control._updateFormState(name, value),
  };
  return render({ field });
};

export { Form, FormItem, FormControl, FormMessage, FormField };
