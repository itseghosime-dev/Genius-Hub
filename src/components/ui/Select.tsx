import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options?: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, hasError = false, disabled = false, options, placeholder, children, ...props },
    ref,
  ) => {
    return (
      <div className="relative flex w-full items-center">
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          className={cn(
            'flex h-11 w-full cursor-pointer appearance-none rounded-(--radius-standard) border bg-(--surface-primary) px-3.5 pr-10 text-sm text-(--text-primary) shadow-xs transition-colors',
            'focus-visible:border-(--brand-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
            'disabled:cursor-not-allowed disabled:bg-(--surface-muted) disabled:opacity-50',
            hasError
              ? 'border-(--state-error) focus-visible:outline-(--state-error)'
              : 'border-(--border-default) hover:border-(--border-strong)',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="pointer-events-none absolute right-3.5 flex items-center text-(--text-muted)">
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';
