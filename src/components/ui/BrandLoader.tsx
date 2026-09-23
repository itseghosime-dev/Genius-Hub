import React from 'react';
import { cn } from '@/lib/utils';

export type BrandLoaderSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BrandLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: BrandLoaderSize;
  label?: string;
  showLabel?: boolean;
}

const sizeConfig: Record<BrandLoaderSize, { px: number; textClass: string }> = {
  sm: { px: 32, textClass: 'text-xs' },
  md: { px: 48, textClass: 'text-sm' },
  lg: { px: 64, textClass: 'text-base' },
  xl: { px: 96, textClass: 'text-lg' },
};

export const BrandLoader: React.FC<BrandLoaderProps> = ({
  size = 'md',
  label = 'Loading Genius Hub...',
  showLabel = false,
  className,
  ...props
}) => {
  const { px, textClass } = sizeConfig[size];

  return (
    <div
      role="status"
      aria-label={label}
      className={cn('inline-flex flex-col items-center justify-center gap-3', className)}
      {...props}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-(--brand-primary) motion-safe:animate-pulse"
        aria-hidden="true"
      >
        {/* Outer subtle orbital ring */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 6"
          className="origin-center animate-[spin_8s_linear_infinite] opacity-40"
        />

        {/* Dynamic interconnected nodes representing People, Knowledge, Opportunity, Impact */}
        {/* Top Node */}
        <circle cx="32" cy="14" r="4" fill="#0b1320" className="dark:fill-slate-200" />
        {/* Right Node */}
        <circle cx="50" cy="32" r="4" fill="currentColor" />
        {/* Bottom Node */}
        <circle cx="32" cy="50" r="4" fill="#059669" />
        {/* Left Node */}
        <circle cx="14" cy="32" r="4" fill="#0284c7" />

        {/* Connecting vector paths */}
        <path
          d="M32 14L50 32M50 32L32 50M32 50L14 32M14 32L32 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />

        {/* Central Core Radiant Mark (Genius Hub Core) */}
        <circle cx="32" cy="32" r="8" fill="currentColor" />
        <circle cx="32" cy="32" r="3" fill="#ffffff" />
      </svg>

      {showLabel ? (
        <span className={cn('font-semibold tracking-tight text-(--text-secondary)', textClass)}>
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );
};
