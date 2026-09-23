import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  role?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'busy';
}

const sizeClasses: Record<
  AvatarSize,
  { container: string; text: string; status: string; px: number }
> = {
  sm: { container: 'h-8 w-8', text: 'text-xs', status: 'h-2 w-2 ring-1', px: 32 },
  md: { container: 'h-10 w-10', text: 'text-sm', status: 'h-2.5 w-2.5 ring-2', px: 40 },
  lg: { container: 'h-14 w-14', text: 'text-base', status: 'h-3 w-3 ring-2', px: 56 },
  xl: { container: 'h-20 w-20', text: 'text-xl', status: 'h-4 w-4 ring-2', px: 80 },
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase();
  }
  return (name.slice(0, 2) || '').toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  role,
  size = 'md',
  status,
  className,
  ...props
}) => {
  const config = sizeClasses[size];
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--border-default) bg-(--surface-muted) font-semibold text-(--text-primary) select-none',
        config.container,
        className,
      )}
      aria-label={role ? `${name}, ${role}` : name}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={config.px}
          height={config.px}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          className={cn(
            'text-center font-bold tracking-tight text-(--brand-secondary)',
            config.text,
          )}
        >
          {initials}
        </span>
      )}
      {status && (
        <span
          className={cn(
            'absolute right-0 bottom-0 rounded-full ring-white',
            config.status,
            status === 'online' && 'bg-(--state-success)',
            status === 'offline' && 'bg-slate-400',
            status === 'busy' && 'bg-(--state-error)',
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};
