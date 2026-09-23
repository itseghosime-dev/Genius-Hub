import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      hasError = false,
      disabled = false,
      leftAddon,
      rightAddon,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative flex w-full items-center">
        {leftAddon && (
          <div className="pointer-events-none absolute left-3.5 z-10 flex items-center text-(--text-muted)">
            {leftAddon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          className={cn(
            'flex h-11 w-full rounded-(--radius-standard) border bg-(--surface-primary) px-3.5 text-sm text-(--text-primary) shadow-xs transition-colors',
            'placeholder:text-(--text-muted)',
            'focus-visible:border-(--brand-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
            'disabled:cursor-not-allowed disabled:bg-(--surface-muted) disabled:opacity-50',
            hasError
              ? 'border-(--state-error) focus-visible:outline-(--state-error)'
              : 'border-(--border-default) hover:border-(--border-strong)',
            leftAddon && 'pl-10',
            rightAddon && 'pr-10',
            className,
          )}
          {...props}
        />
        {rightAddon && (
          <div className="pointer-events-none absolute right-3.5 z-10 flex items-center text-(--text-muted)">
            {rightAddon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
