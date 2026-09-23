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
    'bg-(--brand-primary) text-white hover:bg-(--brand-primary-hover) active:bg-(--brand-primary-active) shadow-xs border border-transparent font-medium',
  secondary:
    'bg-(--surface-sand) text-(--text-primary) hover:bg-(--surface-stone) active:bg-(--border-strong) border border-(--border-default) font-medium',
  outline:
    'bg-transparent text-(--text-primary) border border-(--border-strong) hover:bg-(--surface-sand) active:bg-(--surface-stone) font-medium',
  ghost:
    'bg-transparent text-(--text-primary) hover:bg-(--surface-muted) active:bg-(--surface-sand) border border-transparent font-medium',
  inverse:
    'bg-white text-(--text-primary) hover:bg-stone-100 active:bg-stone-200 border border-transparent shadow-xs font-medium',
  danger:
    'bg-(--state-error) text-white hover:bg-red-800 active:bg-red-900 border border-transparent shadow-xs font-medium',
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8.5 px-3.5 text-xs gap-1.5 rounded-(--radius-standard)',
  md: 'h-10.5 px-5 text-sm gap-2 rounded-(--radius-standard)',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-(--radius-standard)',
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
