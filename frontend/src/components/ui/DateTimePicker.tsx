'use client';

import { useController } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from './Form';
import { Input } from './Input';
import { Calendar } from 'lucide-react';
import { Button } from './Button';
import { Calendar as CalendarComponent } from './Calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useState } from 'react';

interface DateTimePickerProps {
  name: string;
  control: any;
  error?: string;
}

export const DateTimePicker = ({ name, control, error }: DateTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const date = value ? new Date(value) : null;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormControl>
            <Button
              type="button"
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date ? (
                format(date, 'yyyy年MM月dd日 HH:mm', { locale: ja })
              ) : (
                <span>公開日時を選択</span>
              )}
            </Button>
          </FormControl>
          {isOpen && (
            <div className="absolute z-50 mt-2 rounded-md border bg-background p-4 shadow-md">
              <CalendarComponent
                mode="single"
                selected={date || undefined}
                onSelect={(date) => {
                  if (date) {
                    const currentDate = value ? new Date(value) : new Date();
                    date.setHours(currentDate.getHours());
                    date.setMinutes(currentDate.getMinutes());
                    onChange(date.toISOString());
                  } else {
                    onChange(null);
                  }
                }}
                initialFocus
              />
              <div className="mt-4 border-t pt-4">
                <Input
                  type="time"
                  value={date ? format(date, 'HH:mm') : ''}
                  onChange={(e) => {
                    if (date) {
                      const [hours, minutes] = e.target.value.split(':');
                      const newDate = new Date(date);
                      newDate.setHours(parseInt(hours));
                      newDate.setMinutes(parseInt(minutes));
                      onChange(newDate.toISOString());
                    }
                  }}
                />
              </div>
            </div>
          )}
          {error && <FormMessage>{error}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
