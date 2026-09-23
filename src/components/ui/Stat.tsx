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
  layout?: 'editorial' | 'compact' | 'stacked' | 'bold';
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
        <div className="font-display flex items-baseline gap-1 text-2xl font-bold tracking-tight text-(--text-primary) sm:text-3xl">
          {prefix && <span className="text-xl text-(--brand-primary)">{prefix}</span>}
          <span>{value}</span>
          {suffix && <span className="text-xl text-(--brand-primary)">{suffix}</span>}
        </div>
        <div className="text-xs font-semibold text-(--text-secondary)">{label}</div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="font-display flex items-baseline gap-1 font-extrabold tracking-tight text-(--text-primary)">
        {prefix && (
          <span className="text-2xl font-bold text-(--brand-primary) sm:text-3xl lg:text-4xl">
            {prefix}
          </span>
        )}
        <span className="text-4xl sm:text-5xl lg:text-6xl">{value}</span>
        {suffix && (
          <span className="text-2xl font-bold text-(--brand-primary) sm:text-3xl lg:text-4xl">
            {suffix}
          </span>
        )}
      </div>
      <div className="font-display text-base font-bold tracking-tight text-(--text-primary) sm:text-lg">
        {label}
      </div>
      {description && (
        <p className="text-body-sm leading-relaxed text-(--text-secondary)">{description}</p>
      )}
      {trend && (
        <div
          className={cn(
            'mt-0.5 flex items-center gap-1 text-xs font-semibold',
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
