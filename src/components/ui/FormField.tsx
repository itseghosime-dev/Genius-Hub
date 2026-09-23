import React from 'react';
import { cn } from '@/lib/utils';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  description?: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  optional = false,
  description,
  error,
  children,
  className,
  ...props
}) => {
  const descriptionId = htmlFor ? `${htmlFor}-description` : undefined;
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)} {...props}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={htmlFor}
            className="cursor-pointer text-sm font-semibold text-(--text-primary) select-none"
          >
            {label}
            {required && (
              <span className="ml-1 text-(--state-error)" aria-hidden="true">
                *
              </span>
            )}
          </label>
          {optional && (
            <span className="text-xs font-normal text-(--text-muted) select-none">Optional</span>
          )}
        </div>
      )}

      {description && (
        <p id={descriptionId} className="text-xs leading-relaxed text-(--text-secondary)">
          {description}
        </p>
      )}

      <div className="relative w-full">{children}</div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs leading-snug font-medium text-(--state-error)"
        >
          {error}
        </p>
      )}
    </div>
  );
};
