import React from 'react';
import { cn } from '@/lib/utils';
import { MediaFrame, type MediaAspectRatio } from './MediaFrame';
import type { Radius } from '@/config/design';

export interface ImageWithCaptionProps extends React.HTMLAttributes<HTMLElement> {
  media: React.ReactNode;
  caption: string;
  credit?: string;
  aspectRatio?: MediaAspectRatio;
  radius?: Radius;
}

export const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({
  media,
  caption,
  credit,
  aspectRatio = '16:9',
  radius = 'standard',
  className,
  ...props
}) => {
  return (
    <figure className={cn('flex w-full flex-col gap-2', className)} {...props}>
      <MediaFrame aspectRatio={aspectRatio} radius={radius}>
        {media}
      </MediaFrame>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 px-0.5 text-xs text-(--text-secondary)">
        <span className="leading-normal">{caption}</span>
        {credit && <span className="shrink-0 text-(--text-muted) italic">Photo: {credit}</span>}
      </figcaption>
    </figure>
  );
};
