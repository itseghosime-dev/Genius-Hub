import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-(--brand-primary) text-(--brand-primary-foreground) hover:bg-(--brand-primary-hover) active:bg-(--brand-primary-active) shadow-sm border border-transparent',
  secondary:
    'bg-(--brand-secondary) text-(--brand-secondary-foreground) hover:bg-(--brand-secondary-hover) active:bg-(--brand-secondary-active) shadow-sm border border-transparent',
  outline:
    'bg-transparent text-(--text-primary) border border-(--border-strong) hover:bg-(--surface-muted) active:bg-(--surface-secondary)',
  ghost:
    'bg-transparent text-(--text-primary) hover:bg-(--surface-muted) active:bg-(--surface-secondary) border border-transparent',
  inverse:
    'bg-white text-(--brand-secondary) hover:bg-slate-100 active:bg-slate-200 border border-transparent shadow-sm',
  danger:
    'bg-(--state-error) text-white hover:bg-red-700 active:bg-red-800 border border-transparent shadow-sm',
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-xs font-semibold gap-1.5 rounded-(--radius-standard)',
  md: 'h-11 px-5 text-sm font-semibold gap-2 rounded-(--radius-standard)',
  lg: 'h-13 px-7 text-base font-semibold gap-2.5 rounded-(--radius-standard)',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center font-sans tracking-tight transition-all duration-150 select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          buttonVariantClasses[variant],
          buttonSizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />}
        {!isLoading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
