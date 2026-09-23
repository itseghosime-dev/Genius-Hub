import React from 'react';
import { cn } from '@/lib/utils';
import type { StackGap } from './Stack';

export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
  align?: 'start' | 'center' | 'end' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  as?: React.ElementType;
}

const gapClasses: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-1 sm:gap-2',
  sm: 'gap-2 sm:gap-3',
  md: 'gap-3 sm:gap-4',
  lg: 'gap-4 sm:gap-6',
  xl: 'gap-6 sm:gap-8',
  '2xl': 'gap-8 sm:gap-12',
};

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
};

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

export const Cluster: React.FC<ClusterProps> = ({
  children,
  className,
  gap = 'sm',
  align = 'center',
  justify = 'start',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn(
        'flex flex-wrap',
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
