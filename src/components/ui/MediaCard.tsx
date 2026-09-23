import React from 'react';
import { cn } from '@/lib/utils';
import { Card, type CardProps } from './Card';
import { MediaFrame, type MediaAspectRatio } from './MediaFrame';

export interface MediaCardProps extends CardProps {
  media: React.ReactNode;
  aspectRatio?: MediaAspectRatio;
  badge?: React.ReactNode;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  children,
  className,
  media,
  aspectRatio = '16:9',
  badge,
  variant = 'default',
  radius = 'standard',
  ...props
}) => {
  return (
    <Card
      variant={variant}
      radius={radius}
      className={cn('group flex flex-col', className)}
      {...props}
    >
      <div className="relative w-full overflow-hidden">
        <MediaFrame aspectRatio={aspectRatio} radius="none" className="w-full">
          {media}
        </MediaFrame>
        {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </Card>
  );
};
