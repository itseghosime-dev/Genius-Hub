'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { MegaMenuConfig } from '@/config/navigation';

export interface MegaMenuProps {
  config: MegaMenuConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ config, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label={`${config.label} navigation menu`}
      className={cn(
        'absolute top-full left-0 w-full border-b border-slate-200 bg-white/98 shadow-xl backdrop-blur-md',
        'animate-in fade-in-50 slide-in-from-top-2 duration-150',
      )}
    >
      <div className="mx-auto max-w-(--content-default) px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Grouped Columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-8">
            {config.groups.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3.5">
                <h3 className="font-display text-xs font-bold tracking-wider text-slate-400 uppercase">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'group flex flex-col rounded-(--radius-standard) p-2.5 transition-colors',
                          'hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-(--focus-ring)',
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-bold text-slate-900 group-hover:text-(--brand-primary)">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="rounded-xs bg-orange-100 px-1.5 py-0.5 text-[0.625rem] font-bold text-orange-800">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <span className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Spotlight Card */}
          {config.featured && (
            <div className="lg:col-span-4">
              <div className="flex h-full flex-col justify-between rounded-(--radius-standard) border border-slate-200 bg-gradient-to-br from-slate-50 to-orange-50/40 p-6 shadow-2xs">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-(--brand-primary)">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{config.featured.badge || 'Featured'}</span>
                  </div>
                  <h4 className="font-display text-base leading-snug font-bold text-slate-900">
                    {config.featured.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {config.featured.description}
                  </p>
                </div>

                <Link
                  href={config.featured.href}
                  onClick={onClose}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-(--brand-primary) hover:underline"
                >
                  <span>{config.featured.actionText || 'Learn More'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
