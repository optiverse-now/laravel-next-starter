'use client';

import * as React from 'react';
import { Popover as HeadlessPopover } from '@headlessui/react';
import { cn } from '@/lib/utils';

const Popover = HeadlessPopover;

const PopoverTrigger = ({ children, asChild, className }: { children: React.ReactNode; asChild?: boolean; className?: string }) => (
  <HeadlessPopover.Button className={cn('outline-none', className)}>
    {children}
  </HeadlessPopover.Button>
);

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; align?: 'start' | 'center' | 'end' }
>(({ children, className, align = 'center' }, ref) => (
  <HeadlessPopover.Panel
    ref={ref}
    className={cn(
      'absolute z-50 mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none',
      align === 'start' && 'left-0',
      align === 'center' && 'left-1/2 -translate-x-1/2',
      align === 'end' && 'right-0',
      className
    )}
  >
    {children}
  </HeadlessPopover.Panel>
));

PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent };

