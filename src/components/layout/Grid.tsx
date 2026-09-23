import React from 'react';
import { cn } from '@/lib/utils';
import type { StackGap } from './Stack';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridColumns;
  colsSm?: GridColumns;
  colsMd?: GridColumns;
  colsLg?: GridColumns;
  colsXl?: GridColumns;
  gap?: StackGap;
  as?: React.ElementType;
}

const gapClasses: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-10',
  '2xl': 'gap-12',
};

const colClasses: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

const smColClasses: Record<GridColumns, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  12: 'sm:grid-cols-12',
};

const mdColClasses: Record<GridColumns, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  12: 'md:grid-cols-12',
};

const lgColClasses: Record<GridColumns, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
};

const xlColClasses: Record<GridColumns, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
  12: 'xl:grid-cols-12',
};

export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = 'md',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn(
        'grid',
        colClasses[cols],
        colsSm && smColClasses[colsSm],
        colsMd && mdColClasses[colsMd],
        colsLg && lgColClasses[colsLg],
        colsXl && xlColClasses[colsXl],
        gapClasses[gap],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
