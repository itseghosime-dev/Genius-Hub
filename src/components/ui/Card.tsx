import React from 'react';
import { cn } from '@/lib/utils';
import type { Radius } from '@/config/design';

export type CardVariant = 'default' | 'editorial' | 'cloud' | 'feature' | 'flat' | 'inverse';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  radius?: Radius;
  as?: React.ElementType;
}

const cardVariantClasses: Record<CardVariant, string> = {
  default: 'bg-white text-(--text-primary) border border-slate-200 shadow-2xs',
  editorial: 'bg-transparent text-(--text-primary) border-0 p-0',
  cloud: 'bg-(--surface-cloud) text-(--text-primary) border border-slate-200/80',
  feature:
    'bg-white text-(--text-primary) border-t-2 border-t-(--brand-primary) border-x border-b border-slate-200 shadow-xs',
  flat: 'bg-(--surface-subtle) text-(--text-primary) border-0',
  inverse: 'bg-(--surface-inverse) text-(--text-inverse) border-0',
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
        variant !== 'editorial' && radiusClasses[radius],
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
  <div className={cn('flex flex-col gap-1.5 p-5 pb-2 sm:p-6 sm:pb-3', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3
    className={cn(
      'font-display text-lg font-bold tracking-tight text-(--text-primary) sm:text-xl',
      className,
    )}
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
  <p className={cn('text-body-sm leading-relaxed text-(--text-secondary)', className)} {...props}>
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
