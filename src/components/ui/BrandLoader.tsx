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
  xl: { px: 88, textClass: 'text-lg' },
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
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Subtle Orbiting Constellation Track (Hub & Ecosystem) */}
        <circle
          cx="24"
          cy="24"
          r="19"
          stroke="#ff6b00"
          strokeWidth="1"
          strokeDasharray="3 5"
          strokeOpacity="0.2"
          className="origin-center motion-safe:animate-[spin_12s_linear_infinite]"
        />

        {/* Orbiting Stars & Brilliance Constellation Group */}
        <g className="origin-center motion-safe:animate-[spin_8s_linear_infinite]">
          {/* Top Star — Brilliance & Human Potential (Genius Orange) */}
          <path
            d="M 24 1.5 Q 24 5 27.5 5 Q 24 5 24 8.5 Q 24 5 20.5 5 Q 24 5 24 1.5 Z"
            fill="#ff6b00"
            className="motion-safe:animate-[pulse_1.8s_ease-in-out_infinite]"
          />

          {/* Top-Right Star — Opportunity & Innovation (Digital Blue) */}
          <path
            d="M 38 11.5 Q 38 14 40.5 14 Q 38 14 38 16.5 Q 38 14 35.5 14 Q 38 14 38 11.5 Z"
            fill="#2563eb"
            className="motion-safe:animate-[pulse_1.8s_ease-in-out_infinite_0.35s]"
          />

          {/* Bottom-Right Star — Impact & Community (Electric Teal) */}
          <path
            d="M 35 31.5 Q 35 34 37.5 34 Q 35 34 35 36.5 Q 35 34 32.5 34 Q 35 34 35 31.5 Z"
            fill="#0d9488"
            className="motion-safe:animate-[pulse_1.8s_ease-in-out_infinite_0.7s]"
          />

          {/* Bottom-Left Star — Livelihoods & Growth (Genius Orange) */}
          <path
            d="M 13 31.5 Q 13 34 15.5 34 Q 13 34 13 36.5 Q 13 34 10.5 34 Q 13 34 13 31.5 Z"
            fill="#ff6b00"
            className="motion-safe:animate-[pulse_1.8s_ease-in-out_infinite_1.05s]"
          />

          {/* Top-Left Star — Youth Optimism (Optimistic Yellow) */}
          <path
            d="M 10 11.5 Q 10 14 12.5 14 Q 10 14 10 16.5 Q 10 14 7.5 14 Q 10 14 10 11.5 Z"
            fill="#f59e0b"
            className="motion-safe:animate-[pulse_1.8s_ease-in-out_infinite_1.4s]"
          />
        </g>

        {/* Central "G" Brand Anchor */}
        <g className="origin-center motion-safe:animate-[pulse_3s_ease-in-out_infinite]">
          <path
            d="M24 14.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5c4.65 0 8.5-3.35 9.32-7.75H24v-3.5h13.25c.16.57.25 1.15.25 1.75 0 7.45-6.05 13.5-13.5 13.5C16.55 37.5 10.5 31.45 10.5 24S16.55 10.5 24 10.5c3.75 0 7.15 1.5 9.6 3.95l-2.65 2.65C29.2 15.35 26.75 14.5 24 14.5Z"
            fill="#ff6b00"
          />
        </g>
      </svg>

      {showLabel ? (
        <span
          className={cn('font-sans font-semibold tracking-tight text-(--text-primary)', textClass)}
        >
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );
};
