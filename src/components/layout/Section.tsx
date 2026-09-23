import React from 'react';
import { cn } from '@/lib/utils';
import type { SurfaceTheme } from '@/config/design';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  surface?: SurfaceTheme;
  as?: React.ElementType;
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: 'py-0',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16 lg:py-20',
  lg: 'py-16 sm:py-24 lg:py-32',
  xl: 'py-20 sm:py-32 lg:py-40',
};

const surfaceDataAttributes: Record<SurfaceTheme, Record<string, string>> = {
  light: {},
  secondary: { 'data-surface': 'light' },
  dark: { 'data-surface': 'dark' },
  brand: { 'data-surface': 'brand' },
};

const surfaceClasses: Record<SurfaceTheme, string> = {
  light: 'bg-(--surface-canvas) text-(--text-primary)',
  secondary: 'bg-(--surface-secondary) text-(--text-primary)',
  dark: 'bg-(--surface-canvas) text-(--text-primary)',
  brand: 'bg-(--surface-canvas) text-(--text-primary)',
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = 'md',
  surface = 'light',
  as: Component = 'section',
  ...props
}) => {
  return (
    <Component
      className={cn(
        'relative w-full transition-colors duration-200',
        spacingClasses[spacing],
        surfaceClasses[surface],
        className,
      )}
      {...surfaceDataAttributes[surface]}
      {...props}
    >
      {children}
    </Component>
  );
};
