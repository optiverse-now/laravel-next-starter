'use client';

import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar } from '@/components/ui/Calendar';
import { Input } from '@/components/ui/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import { CalendarIcon } from 'lucide-react';

export interface DateTimePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: string;
}

export const DateTimePicker = ({
  name,
  control,
  label,
  error,
}: DateTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const [date, time] = field.value?.split('T') || ['', ''];
          const [hours, minutes] = time?.split(':') || ['', ''];

          const handleDateSelect = (date: Date | undefined) => {
            if (!date) {
              field.onChange('');
              return;
            }

            const currentValue = field.value;
            const currentTime = currentValue ? currentValue.split('T')[1] : '00:00';
            field.onChange(`${format(date, 'yyyy-MM-dd')}T${currentTime}`);
          };

          const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const currentValue = field.value;
            const currentDate = currentValue ? currentValue.split('T')[0] : format(new Date(), 'yyyy-MM-dd');
            field.onChange(`${currentDate}T${e.target.value}`);
          };

          return (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(new Date(date), 'yyyy年MM月dd日', { locale: ja }) : '日付を選択'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date ? new Date(date) : undefined}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Input
                type="time"
                value={`${hours || '00'}:${minutes || '00'}`}
                onChange={handleTimeChange}
                className="w-24"
              />
            </div>
          );
        }}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
