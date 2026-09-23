import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, disabled = false, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        aria-invalid={hasError ? 'true' : undefined}
        className={cn(
          'flex min-h-[5rem] w-full rounded-(--radius-standard) border bg-(--surface-primary) p-3.5 text-sm text-(--text-primary) shadow-xs transition-colors',
          'placeholder:text-(--text-muted)',
          'focus-visible:border-(--brand-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
          'disabled:cursor-not-allowed disabled:bg-(--surface-muted) disabled:opacity-50',
          hasError
            ? 'border-(--state-error) focus-visible:outline-(--state-error)'
            : 'border-(--border-default) hover:border-(--border-strong)',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
