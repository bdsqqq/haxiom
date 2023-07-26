'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from './utils/cn';
import { omit, pick } from './utils/fn';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

// potentially: 'z-50 shadow-md outline-none animate-in'
const popoverContentVariants = cva('z-50 outline-none animate-in', {
  variants: {
    size: {
      sm: 'w-24 py-1 text-xs px-1.5 h-min',
      md: 'w-48-8 py-1.5 px-2 h-min',
      lg: 'w-96 py-3 px-4 h-min',
      full: 'w-full py-3 px-4 h-min',
    },
    align: {
      start: 'start',
      center: 'center',
      end: 'end',
    },
    side: {
      top: 'top',
      right: 'right',
      bottom: 'bottom',
      left: 'left',
    },
  },
  defaultVariants: {
    size: 'full',
    align: 'center',
    side: 'bottom',
  },
});

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  options?: PopoverContentOptions;
}

type RealVariantProps = Omit<VariantProps<typeof popoverContentVariants>, 'align' | 'side'>;
type PopoverContentOptions = RealVariantProps & PopoverPrimitive.PopperContentProps;

const PopoverContent = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
  ({ className, options, ...props }, ref) => {
    // annoying, but we need to split the options into radix and cva options.
    // ts is not smart enough to generate the strings for us so we'll have to maintain this or find a better way
    const radixOptions = pick(options!, 'align', 'side');
    const cvaOptions = omit(options!, 'align', 'side') as RealVariantProps;

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          className={cn(popoverContentVariants(cvaOptions), className)}
          {...radixOptions}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, popoverContentVariants };
