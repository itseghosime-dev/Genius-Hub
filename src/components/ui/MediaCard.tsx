import React from 'react';
import { cn } from '@/lib/utils';
import { Card, type CardProps } from './Card';
import { MediaFrame, type MediaAspectRatio } from './MediaFrame';

export interface MediaCardProps extends CardProps {
  media: React.ReactNode;
  aspectRatio?: MediaAspectRatio;
  badge?: React.ReactNode;
  editorial?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  children,
  className,
  media,
  aspectRatio = '16:9',
  badge,
  editorial = false,
  variant = 'default',
  radius = 'standard',
  ...props
}) => {
  if (editorial) {
    return (
      <article className={cn('group flex flex-col gap-3.5', className)}>
        <div className="relative w-full overflow-hidden rounded-(--radius-standard)">
          <MediaFrame
            aspectRatio={aspectRatio}
            radius={radius}
            className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          >
            {media}
          </MediaFrame>
          {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}
        </div>
        <div className="flex flex-1 flex-col gap-2">{children}</div>
      </article>
    );
  }

  return (
    <Card
      variant={variant}
      radius={radius}
      className={cn('group flex flex-col transition-all duration-200 hover:shadow-sm', className)}
      {...props}
    >
      <div className="relative w-full overflow-hidden">
        <MediaFrame
          aspectRatio={aspectRatio}
          radius="none"
          className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        >
          {media}
        </MediaFrame>
        {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </Card>
  );
};
