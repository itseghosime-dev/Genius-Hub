import React from 'react';
import { cn } from '@/lib/utils';
import { type ButtonSize, type ButtonVariant, buttonVariantClasses } from './Button';
import { Loader2 } from 'lucide-react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  'aria-label': string; // Required for accessibility
  icon: React.ReactNode;
}

const iconButtonSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 w-9 p-0 rounded-(--radius-standard)',
  md: 'h-11 w-11 p-0 rounded-(--radius-standard)',
  lg: 'h-13 w-13 p-0 rounded-(--radius-standard)',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      isLoading = false,
      disabled = false,
      icon,
      'aria-label': ariaLabel,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center transition-all duration-150 select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          buttonVariantClasses[variant],
          iconButtonSizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : icon}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
