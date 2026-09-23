import React from 'react';
import { cn } from '@/lib/utils';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
  description?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
  layout?: 'editorial' | 'compact' | 'stacked';
}

export const Stat: React.FC<StatProps> = ({
  value,
  label,
  prefix,
  suffix,
  description,
  trend,
  layout = 'editorial',
  className,
  ...props
}) => {
  if (layout === 'compact') {
    return (
      <div className={cn('flex flex-col gap-0.5', className)} {...props}>
        <div className="flex items-baseline gap-1 font-serif text-3xl font-semibold tracking-tight text-(--text-primary)">
          {prefix && <span className="text-xl text-(--brand-primary)">{prefix}</span>}
          <span>{value}</span>
          {suffix && <span className="text-xl text-(--brand-primary)">{suffix}</span>}
        </div>
        <div className="text-xs font-medium text-(--text-secondary)">{label}</div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="font-serif text-2xl font-normal text-(--brand-primary) sm:text-3xl">
            {prefix}
          </span>
        )}
        <span className="text-display-lg font-serif font-semibold tracking-tight text-(--text-primary)">
          {value}
        </span>
        {suffix && (
          <span className="font-serif text-2xl font-normal text-(--brand-primary) sm:text-3xl">
            {suffix}
          </span>
        )}
      </div>
      <div className="text-base font-semibold tracking-tight text-(--text-primary)">{label}</div>
      {description && (
        <p className="text-sm leading-relaxed text-(--text-secondary)">{description}</p>
      )}
      {trend && (
        <div
          className={cn(
            'mt-0.5 flex items-center gap-1 text-xs font-medium',
            trend.positive ? 'text-(--state-success)' : 'text-(--state-error)',
          )}
        >
          <span>{trend.positive ? '↑' : '↓'}</span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
};
