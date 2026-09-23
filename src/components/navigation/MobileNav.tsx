'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, ArrowRight, Globe, Search } from 'lucide-react';
import { headerNavigation, headerCta, languages, type HeaderNavItem } from '@/config/navigation';
import { Button } from '@/components/ui';

export interface MobileNavProps {
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [currentLang, setCurrentLang] = useState<'en' | 'fr' | 'de'>('en');
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle body scroll locking and Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-(--radius-standard) border border-slate-200 bg-white text-slate-700 transition-colors',
          'hover:bg-slate-50 hover:text-slate-950',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
        )}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Drawer Overlay & Slide-out Drawer */}
      {isOpen && (
        <>
          <div
            className="animate-in fade-in fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-navigation-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm translate-x-0 flex-col bg-white shadow-2xl transition-transform duration-300 ease-out"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <span className="font-display text-sm font-bold text-slate-900">Genius Hub Menu</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="rounded-(--radius-standard) p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-(--focus-ring)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Search & Language Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center gap-2 rounded-(--radius-standard) border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <span>Search site...</span>
              </button>

              {/* Inline Language Picker */}
              <div className="flex items-center gap-1 rounded-(--radius-standard) border border-slate-200 bg-white p-0.5 text-xs">
                <Globe className="ml-1 h-3 w-3 text-slate-400" aria-hidden="true" />
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setCurrentLang(lang.code)}
                    className={cn(
                      'rounded-xs px-1.5 py-0.5 font-mono text-[0.625rem] font-bold uppercase transition-colors',
                      currentLang === lang.code
                        ? 'bg-(--brand-primary) text-white'
                        : 'text-slate-600 hover:text-slate-950',
                    )}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Link List */}
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col gap-1.5">
                {headerNavigation.map((item: HeaderNavItem) => {
                  if (item.type === 'megamenu') {
                    const isExpanded = !!expandedSections[item.data.id];
                    const isCurrentSection = pathname.startsWith(item.data.href);

                    return (
                      <li key={item.data.id} className="border-b border-slate-100 pb-1.5">
                        <button
                          type="button"
                          onClick={() => toggleSection(item.data.id)}
                          aria-expanded={isExpanded}
                          className="font-display flex w-full items-center justify-between py-2 text-left text-base font-bold text-slate-900"
                        >
                          <span className={cn(isCurrentSection && 'text-(--brand-primary)')}>
                            {item.data.label}
                          </span>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 text-slate-400 transition-transform duration-200',
                              isExpanded && 'rotate-180 text-(--brand-primary)',
                            )}
                            aria-hidden="true"
                          />
                        </button>

                        {isExpanded && (
                          <div className="mt-1 flex flex-col gap-4 pl-3">
                            {item.data.groups.map((group) => (
                              <div key={group.heading} className="flex flex-col gap-1.5">
                                <span className="text-[0.6875rem] font-bold tracking-wider text-slate-400 uppercase">
                                  {group.heading}
                                </span>
                                <ul className="flex flex-col gap-1">
                                  {group.items.map((subItem) => (
                                    <li key={subItem.href}>
                                      <Link
                                        href={subItem.href}
                                        className="block rounded-(--radius-standard) py-1.5 text-sm font-medium text-slate-700 hover:text-(--brand-primary)"
                                      >
                                        {subItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  }

                  // Direct link
                  const isCurrent = pathname === item.data.href;
                  return (
                    <li key={item.data.id} className="border-b border-slate-100 py-1.5">
                      <Link
                        href={item.data.href}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={cn(
                          'font-display flex items-center justify-between py-1 text-base font-bold transition-colors',
                          isCurrent ? 'text-(--brand-primary)' : 'text-slate-900',
                        )}
                      >
                        <span>{item.data.label}</span>
                        {item.data.badge && (
                          <span className="rounded-xs bg-orange-100 px-1.5 py-0.5 text-[0.625rem] font-bold text-orange-800">
                            {item.data.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Drawer Action Footer */}
            <div className="border-t border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-2.5">
                <Link href={headerCta.primary.href} className="w-full">
                  <Button
                    variant="primary"
                    className="w-full justify-center"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    {headerCta.primary.label}
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link href={headerCta.secondary.href}>
                    <Button variant="secondary" size="sm" className="w-full justify-center">
                      {headerCta.secondary.label}
                    </Button>
                  </Link>
                  <Link href={headerCta.donate.href}>
                    <Button variant="outline" size="sm" className="w-full justify-center">
                      {headerCta.donate.label}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
