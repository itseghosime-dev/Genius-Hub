export const designConfig = {
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  containers: {
    narrow: 'max-w-(--content-narrow)', // 768px
    reading: 'max-w-(--content-reading)', // 720px
    default: 'max-w-(--content-default)', // 1200px
    wide: 'max-w-(--content-wide)', // 1440px
    full: 'w-full',
  },
  aspectRatios: {
    square: 'aspect-square', // 1:1
    portrait: 'aspect-[4/5]', // 4:5
    classic: 'aspect-[3/2]', // 3:2
    video: 'aspect-video', // 16:9
    cinema: 'aspect-[21/9]', // 21:9
  },
  surfaces: {
    canvas: 'bg-(--surface-canvas) text-(--text-primary)',
    primary: 'bg-(--surface-primary) text-(--text-primary)',
    cloud: 'bg-(--surface-cloud) text-(--text-primary)',
    subtle: 'bg-(--surface-subtle) text-(--text-primary)',
    dark: 'bg-(--surface-inverse) text-(--text-inverse)',
  },
  radii: {
    none: 'rounded-none',
    subtle: 'rounded-(--radius-subtle)',
    standard: 'rounded-(--radius-standard)',
    large: 'rounded-(--radius-large)',
    pill: 'rounded-(--radius-pill)',
  },
} as const;

export type ContainerWidth = keyof typeof designConfig.containers;
export type AspectRatio = keyof typeof designConfig.aspectRatios;
export type SurfaceTheme = keyof typeof designConfig.surfaces;
export type Radius = keyof typeof designConfig.radii;
