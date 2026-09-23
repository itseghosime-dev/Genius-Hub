import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  hasError?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, hasError = false, disabled = false, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className={cn('relative flex items-start gap-3 select-none', className)}>
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError ? 'true' : undefined}
            className={cn(
              'peer h-4.5 w-4.5 shrink-0 cursor-pointer appearance-none rounded-(--radius-subtle) border bg-(--surface-primary) transition-all',
              'checked:border-(--brand-primary) checked:bg-(--brand-primary)',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
              'disabled:cursor-not-allowed disabled:bg-(--surface-muted) disabled:opacity-50',
              hasError
                ? 'border-(--state-error)'
                : 'border-(--border-strong) hover:border-(--brand-primary)',
            )}
            {...props}
          />
          <Check
            className="pointer-events-none absolute ml-0.5 h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
            aria-hidden="true"
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

Checkbox.displayName = 'Checkbox';
