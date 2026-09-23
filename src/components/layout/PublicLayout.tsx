'use client';

import React from 'react';
import { Header } from '@/components/navigation';
import { Footer } from '@/components/layout/Footer';

export interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-(--text-primary)">
      <Header />
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
