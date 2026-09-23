import React from 'react';
import { cn } from '@/lib/utils';

export interface PhotoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  asymmetric?: boolean;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({
  children,
  className,
  columns = 3,
  asymmetric = false,
  ...props
}) => {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'grid gap-4 sm:gap-6',
        columnClasses[columns],
        asymmetric && '[&>*:first-child]:sm:col-span-2 [&>*:first-child]:sm:row-span-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
