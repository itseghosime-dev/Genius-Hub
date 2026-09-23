import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  'neutral' | 'brand' | 'blue' | 'teal' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const badgeVariantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
  brand:
    'bg-(--brand-primary-light) text-(--brand-primary-dark) border border-(--brand-primary-subtle)',
  blue: 'bg-(--brand-blue-light) text-blue-700 border border-(--brand-blue-border)',
  teal: 'bg-(--brand-teal-light) text-teal-800 border border-(--brand-teal-border)',
  success:
    'bg-(--state-success-bg) text-(--state-success-foreground) border border-(--state-success-border)',
  warning:
    'bg-(--state-warning-bg) text-(--state-warning-foreground) border border-(--state-warning-border)',
  error:
    'bg-(--state-error-bg) text-(--state-error-foreground) border border-(--state-error-border)',
  info: 'bg-(--state-info-bg) text-(--state-info-foreground) border border-(--state-info-border)',
};

const dotColors: Record<BadgeVariant, string> = {
  neutral: 'bg-slate-400',
  brand: 'bg-(--brand-primary)',
  blue: 'bg-(--brand-blue)',
  teal: 'bg-(--brand-teal)',
  success: 'bg-(--state-success)',
  warning: 'bg-(--state-warning)',
  error: 'bg-(--state-error)',
  info: 'bg-(--state-info)',
};

const badgeSizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[0.6875rem] font-medium tracking-normal gap-1',
  md: 'px-2.5 py-0.5 text-xs font-medium tracking-normal gap-1.5',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-(--radius-subtle) font-sans leading-normal',
        badgeVariantClasses[variant],
        badgeSizeClasses[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
