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
}

export const Stat: React.FC<StatProps> = ({
  value,
  label,
  prefix,
  suffix,
  description,
  trend,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="text-xl font-bold tracking-tight text-(--brand-primary) sm:text-2xl">
            {prefix}
          </span>
        )}
        <span className="text-display-lg font-extrabold tracking-tight text-(--text-primary)">
          {value}
        </span>
        {suffix && (
          <span className="text-xl font-bold tracking-tight text-(--brand-primary) sm:text-2xl">
            {suffix}
          </span>
        )}
      </div>
      <div className="text-sm font-semibold tracking-tight text-(--text-primary)">{label}</div>
      {description && (
        <div className="text-xs leading-relaxed text-(--text-secondary)">{description}</div>
      )}
      {trend && (
        <div
          className={cn(
            'mt-1 flex items-center gap-1 text-xs font-semibold',
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
