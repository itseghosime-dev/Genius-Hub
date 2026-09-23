import React from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export interface ResponsiveImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  aspectRatioClassName?: string;
  containerClassName?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fill = true,
  className,
  containerClassName,
  aspectRatioClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}) => {
  if (fill) {
    return (
      <div
        className={cn(
          'relative h-full w-full overflow-hidden',
          aspectRatioClassName,
          containerClassName,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn('object-cover object-center transition-transform duration-300', className)}
          {...props}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      className={cn('h-auto max-w-full', className)}
      {...props}
    />
  );
};
