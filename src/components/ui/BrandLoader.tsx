import React from 'react';
import { cn } from '@/lib/utils';

export type BrandLoaderSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BrandLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: BrandLoaderSize;
  label?: string;
  showLabel?: boolean;
}

const sizeConfig: Record<BrandLoaderSize, { px: number; textClass: string }> = {
  sm: { px: 28, textClass: 'text-xs' },
  md: { px: 44, textClass: 'text-sm' },
  lg: { px: 60, textClass: 'text-base' },
  xl: { px: 84, textClass: 'text-lg' },
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
      className={cn(
        'inline-flex flex-col items-center justify-center gap-2.5 select-none',
        className,
      )}
      {...props}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-(--brand-primary)"
        aria-hidden="true"
      >
        {/* Warm subtle sun aura */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.15"
          strokeDasharray="3 4"
          className="origin-center motion-safe:animate-[spin_12s_linear_infinite]"
        />

        {/* Gathering community nodes (People, Opportunity, Knowledge, Growth) */}
        {/* Top Node */}
        <circle
          cx="24"
          cy="10"
          r="3"
          fill="#d97706"
          className="motion-safe:animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"
          fillOpacity="0.8"
        />
        {/* Right Node */}
        <circle
          cx="38"
          cy="24"
          r="2.5"
          fill="#c2410c"
          className="motion-safe:animate-[pulse_2.5s_ease-in-out_infinite]"
        />
        {/* Bottom Node */}
        <circle
          cx="24"
          cy="38"
          r="3"
          fill="#d97706"
          className="motion-safe:animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"
          fillOpacity="0.7"
        />
        {/* Left Node */}
        <circle
          cx="10"
          cy="24"
          r="2.5"
          fill="#36533e"
          className="motion-safe:animate-[pulse_2.5s_ease-in-out_infinite_0.25s]"
        />

        {/* Soft connecting human arcs */}
        <path
          d="M24 10C31.732 10 38 16.268 38 24C38 31.732 31.732 38 24 38C16.268 38 10 31.732 10 24C10 16.268 16.268 10 24 10Z"
          stroke="#d97706"
          strokeWidth="1"
          strokeOpacity="0.25"
        />

        {/* Warm Radiant Center Mark (Genius Sun Core) */}
        <circle cx="24" cy="24" r="5.5" fill="#d97706" />
        <circle cx="24" cy="24" r="2" fill="#ffffff" />
      </svg>

      {showLabel ? (
        <span
          className={cn(
            'font-serif font-medium tracking-normal text-(--text-secondary)',
            textClass,
          )}
        >
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );
};
