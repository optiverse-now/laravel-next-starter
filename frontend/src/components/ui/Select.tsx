'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  isMulti?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, value, onChange, error, isMulti, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (isMulti) {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        onChange?.(selectedOptions.join(','));
      } else {
        onChange?.(event.target.value);
      }
    };

    const selectedValues = value ? value.split(',') : [];

    return (
      <div className="space-y-1">
        <select
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500',
            className
          )}
          value={isMulti ? selectedValues : value}
          onChange={handleChange}
          multiple={isMulti}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
