'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { headerNavigation, type HeaderNavItem } from '@/config/navigation';
import { MegaMenu } from './MegaMenu';

export const DesktopNav: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const rawPathname = usePathname();
  const pathname = rawPathname ?? '/';
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const toggleMenu = (menuId: string) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main Navigation"
      className="hidden lg:flex lg:items-center lg:gap-1"
      onMouseLeave={handleMouseLeave}
    >
      {headerNavigation.map((item: HeaderNavItem) => {
        if (item.type === 'megamenu') {
          const isOpen = activeMenu === item.data.id;
          const isCurrentSection = pathname.startsWith(item.data.href);

          return (
            <div
              key={item.data.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.data.id)}
            >
              <button
                type="button"
                onClick={() => toggleMenu(item.data.id)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className={cn(
                  'inline-flex items-center gap-1 rounded-(--radius-standard) px-3 py-2 text-sm font-semibold transition-colors',
                  isOpen || isCurrentSection
                    ? 'text-(--brand-primary)'
                    : 'text-slate-700 hover:text-slate-950',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
                )}
              >
                <span>{item.data.label}</span>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-200',
                    isOpen && 'rotate-180 text-(--brand-primary)',
                  )}
                  aria-hidden="true"
                />
              </button>

              <MegaMenu config={item.data} isOpen={isOpen} onClose={() => setActiveMenu(null)} />
            </div>
          );
        }

        // Direct Nav Link
        const isCurrent = pathname === item.data.href;
        return (
          <Link
            key={item.data.id}
            href={item.data.href}
            aria-current={isCurrent ? 'page' : undefined}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-(--radius-standard) px-3 py-2 text-sm font-semibold transition-colors',
              isCurrent ? 'text-(--brand-primary)' : 'text-slate-700 hover:text-slate-950',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
            )}
          >
            <span>{item.data.label}</span>
            {item.data.badge && (
              <span className="rounded-xs bg-slate-100 px-1.5 py-0.5 text-[0.625rem] font-bold text-slate-700">
                {item.data.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};
