import React from 'react';
import { cn } from '@/lib/utils';
import type { Radius } from '@/config/design';

export type MediaAspectRatio = '1:1' | '4:5' | '3:2' | '16:9' | '21:9';

export interface MediaFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: MediaAspectRatio;
  radius?: Radius;
  border?: boolean;
}

const aspectRatioClasses: Record<MediaAspectRatio, string> = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '3:2': 'aspect-[3/2]',
  '16:9': 'aspect-video',
  '21:9': 'aspect-[21/9]',
};

const radiusClasses: Record<Radius, string> = {
  none: 'rounded-none',
  subtle: 'rounded-(--radius-subtle)',
  standard: 'rounded-(--radius-standard)',
  large: 'rounded-(--radius-large)',
  pill: 'rounded-(--radius-pill)',
};

export const MediaFrame: React.FC<MediaFrameProps> = ({
  children,
  className,
  aspectRatio = '16:9',
  radius = 'standard',
  border = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-(--surface-muted)',
        aspectRatioClasses[aspectRatio],
        radiusClasses[radius],
        border && 'border border-(--border-default)',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
