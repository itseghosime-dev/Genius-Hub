import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  interactive?: boolean;
  selected?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  className,
  interactive = false,
  selected = false,
  onRemove,
  removeLabel = 'Remove tag',
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-(--radius-subtle) border px-2.5 py-1 text-xs font-medium transition-colors',
        selected
          ? 'border-(--brand-primary) bg-(--brand-primary) text-white'
          : 'border-(--border-default) bg-(--surface-sand) text-(--text-secondary) hover:border-(--border-strong)',
        interactive && 'cursor-pointer select-none',
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={removeLabel}
          className="ml-0.5 rounded-xs p-0.5 hover:bg-black/10 focus-visible:outline-1 focus-visible:outline-(--focus-ring)"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      )}
    </span>
  );
};
