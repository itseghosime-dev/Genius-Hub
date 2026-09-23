'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { headerCta } from '@/config/navigation';
import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { LanguageSelector } from './LanguageSelector';
import { SearchDialog, SearchTrigger } from './SearchDialog';

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Accessible Skip to Content Landmark */}
      <a
        href="#main-content"
        className={cn(
          'sr-only z-50 rounded-(--radius-standard) bg-(--brand-primary) px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform',
          'focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:outline-2 focus:outline-offset-2 focus:outline-slate-900',
        )}
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-shadow duration-200',
          className,
        )}
      >
        <div className="mx-auto flex h-18 max-w-(--content-default) items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-(--radius-standard) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)"
            aria-label="Genius Hub Homepage"
          >
            {/* Logo Mark: Stylized G with radiant stars */}
            <div className="flex h-9 w-9 items-center justify-center rounded-(--radius-standard) bg-(--brand-primary) text-white shadow-xs transition-transform group-hover:scale-105">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M12 7.25C9.38 7.25 7.25 9.38 7.25 12C7.25 14.62 9.38 16.75 12 16.75C14.32 16.75 16.25 15.08 16.66 12.88H12.25V11.12H18.38C18.45 11.41 18.5 11.7 18.5 12C18.5 15.59 15.59 18.5 12 18.5C8.41 18.5 5.5 15.59 5.5 12C5.5 8.41 8.41 5.5 12 5.5C13.88 5.5 15.58 6.25 16.8 7.48L15.48 8.8C14.58 7.85 13.35 7.25 12 7.25Z"
                  fill="white"
                />
                <circle cx="12" cy="2.5" r="1" fill="white" />
                <circle cx="19.5" cy="6" r="0.9" fill="white" />
                <circle cx="21.5" cy="12" r="1" fill="white" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-lg leading-none font-extrabold tracking-tight text-slate-900">
                Genius<span className="text-(--brand-primary)">Hub</span>
              </span>
              <span className="text-[0.625rem] font-bold tracking-widest text-slate-500 uppercase">
                Global
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Trigger */}
            <SearchTrigger onClick={() => setIsSearchOpen(true)} />

            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Dominant Primary CTA */}
            <Link href={headerCta.primary.href} className="hidden md:inline-flex">
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                {headerCta.primary.label}
              </Button>
            </Link>

            {/* Mobile Navigation Drawer Toggle */}
            <MobileNav onOpenSearch={() => setIsSearchOpen(true)} />
          </div>
        </div>
      </header>

      {/* Global Search Dialog Modal */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
