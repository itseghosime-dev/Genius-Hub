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
  md: 'py-12 sm:py-16 lg:py-24',
  lg: 'py-16 sm:py-24 lg:py-32',
  xl: 'py-24 sm:py-32 lg:py-44',
};

const surfaceDataAttributes: Record<SurfaceTheme, Record<string, string>> = {
  canvas: {},
  primary: {},
  cream: { 'data-surface': 'cream' },
  sand: { 'data-surface': 'sand' },
  stone: { 'data-surface': 'sand' },
  dark: { 'data-surface': 'dark' },
};

const surfaceClasses: Record<SurfaceTheme, string> = {
  canvas: 'bg-(--surface-canvas) text-(--text-primary)',
  primary: 'bg-(--surface-primary) text-(--text-primary)',
  cream: 'bg-(--surface-cream) text-(--text-primary)',
  sand: 'bg-(--surface-sand) text-(--text-primary)',
  stone: 'bg-(--surface-stone) text-(--text-primary)',
  dark: 'bg-(--surface-inverse) text-(--text-inverse)',
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = 'md',
  surface = 'canvas',
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
