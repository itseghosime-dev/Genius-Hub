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
  xl: { px: 80, textClass: 'text-lg' },
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
        {/* Connective Motion Ring (Technology / Network Arc) */}
        <circle
          cx="24"
          cy="24"
          r="19"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="origin-center motion-safe:animate-[spin_6s_linear_infinite]"
          strokeOpacity="0.3"
        />

        {/* Outer Interconnected Network Track */}
        <circle
          cx="24"
          cy="24"
          r="15"
          stroke="#0d9488"
          strokeWidth="1"
          strokeDasharray="2 4"
          className="origin-center motion-safe:animate-[spin_4s_linear_infinite_reverse]"
          strokeOpacity="0.25"
        />

        {/* Small Orange People Nodes (Community & Human Potential) */}
        {/* Top Community Node (Genius Orange) */}
        <circle
          cx="24"
          cy="5"
          r="3"
          fill="#ff6b00"
          className="motion-safe:animate-[pulse_1.5s_ease-in-out_infinite]"
        />
        {/* Right Innovation Node (Digital Blue) */}
        <circle
          cx="43"
          cy="24"
          r="2.75"
          fill="#2563eb"
          className="motion-safe:animate-[pulse_1.5s_ease-in-out_infinite_0.3s]"
        />
        {/* Bottom Community Node (Genius Orange) */}
        <circle
          cx="24"
          cy="43"
          r="3"
          fill="#ff6b00"
          className="motion-safe:animate-[pulse_1.5s_ease-in-out_infinite_0.6s]"
        />
        {/* Left Growth Node (Electric Teal) */}
        <circle
          cx="5"
          cy="24"
          r="2.75"
          fill="#0d9488"
          className="motion-safe:animate-[pulse_1.5s_ease-in-out_infinite_0.9s]"
        />

        {/* Converging Radiant Sun Core (Genius Hub Center Identity) */}
        <circle
          cx="24"
          cy="24"
          r="6.5"
          fill="#ff6b00"
          className="motion-safe:animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"
          fillOpacity="0.2"
        />
        <circle cx="24" cy="24" r="6" fill="#ff6b00" />
        <circle cx="24" cy="24" r="2.5" fill="#ffffff" />
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
