import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System Showcase — Genius Hub (Internal)',
  description:
    'Internal developer documentation and visual verification showcase for Genius Hub design tokens and UI primitives.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
