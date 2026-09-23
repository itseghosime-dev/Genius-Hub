import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'subtle' | 'default' | 'strong' | 'brand';
  label?: React.ReactNode;
}

const variantClasses = {
  subtle: 'border-(--border-subtle)',
  default: 'border-(--border-default)',
  strong: 'border-(--border-strong)',
  brand: 'border-(--brand-primary)',
};

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'default',
  label,
  className,
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          'inline-block h-full min-h-[1em] w-[1px] self-stretch border-r',
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div className={cn('relative my-4 flex w-full items-center', className)}>
        <div className={cn('grow border-t', variantClasses[variant])} />
        <span className="shrink-0 px-3 text-xs font-semibold tracking-wider text-(--text-muted) uppercase">
          {label}
        </span>
        <div className={cn('grow border-t', variantClasses[variant])} />
      </div>
    );
  }

  return (
    <hr
      className={cn('my-4 w-full border-t border-b-0', variantClasses[variant], className)}
      {...props}
    />
  );
};
