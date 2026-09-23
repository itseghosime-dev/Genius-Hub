import React from 'react';
import { cn } from '@/lib/utils';
import type { ContainerWidth } from '@/config/design';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  as?: React.ElementType;
}

const widthClasses: Record<ContainerWidth, string> = {
  narrow: 'max-w-[48rem]',
  reading: 'max-w-[42.5rem]',
  default: 'max-w-[75rem]',
  wide: 'max-w-[90rem]',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  width = 'default',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', widthClasses[width], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
