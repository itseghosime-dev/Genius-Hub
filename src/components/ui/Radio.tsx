import React from 'react';
import { cn } from '@/lib/utils';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  hasError?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, hasError = false, disabled = false, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className={cn('relative flex items-start gap-3 select-none', className)}>
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError ? 'true' : undefined}
            className={cn(
              'peer h-4.5 w-4.5 shrink-0 cursor-pointer appearance-none rounded-full border bg-(--surface-primary) transition-all',
              'checked:border-[5px] checked:border-(--brand-primary)',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
              'disabled:cursor-not-allowed disabled:bg-(--surface-muted) disabled:opacity-50',
              hasError
                ? 'border-(--state-error)'
                : 'border-(--border-strong) hover:border-(--brand-primary)',
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col text-sm">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  'cursor-pointer font-medium text-(--text-primary)',
                  disabled && 'cursor-not-allowed opacity-50',
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs leading-relaxed text-(--text-muted)">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Radio.displayName = 'Radio';
