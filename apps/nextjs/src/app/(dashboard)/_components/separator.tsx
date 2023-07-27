import { forwardRef } from 'react';
import { cn } from '@haxiom/ui';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Separator = forwardRef<HTMLDivElement, DivProps>(({ className, ...props }, ref) => {
  return <div className={cn('bg-gray-6 w-px h-full', className)} ref={ref} {...props} />;
});
Separator.displayName = 'Separator';
