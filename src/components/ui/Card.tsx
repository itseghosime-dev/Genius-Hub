import React from 'react';
import { cn } from '@/lib/utils';
import type { Radius } from '@/config/design';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'muted' | 'inverse';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  radius?: Radius;
  as?: React.ElementType;
}

const cardVariantClasses: Record<CardVariant, string> = {
  default: 'bg-(--surface-primary) text-(--text-primary) border border-(--border-default)',
  elevated:
    'bg-(--surface-elevated) text-(--text-primary) border border-(--border-subtle) shadow-md',
  bordered: 'bg-transparent text-(--text-primary) border-2 border-(--border-strong)',
  muted: 'bg-(--surface-secondary) text-(--text-primary) border border-(--border-subtle)',
  inverse: 'bg-(--surface-inverse) text-(--text-inverse) border border-(--border-inverse)',
};

const radiusClasses: Record<Radius, string> = {
  none: 'rounded-none',
  subtle: 'rounded-(--radius-subtle)',
  standard: 'rounded-(--radius-standard)',
  large: 'rounded-(--radius-large)',
  pill: 'rounded-(--radius-pill)',
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  radius = 'standard',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn(
        'overflow-hidden transition-all duration-200',
        cardVariantClasses[variant],
        radiusClasses[radius],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('flex flex-col gap-1.5 p-5 pb-3 sm:p-6 sm:pb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3
    className={cn('text-heading-sm font-semibold tracking-tight text-(--text-primary)', className)}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn('text-body-sm text-(--text-secondary)', className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('p-5 pt-0 sm:p-6', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn('flex items-center justify-between gap-4 p-5 pt-0 sm:p-6', className)}
    {...props}
  >
    {children}
  </div>
);
