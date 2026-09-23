'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  X,
  ArrowRight,
  BookOpen,
  Layers,
  Award,
  Calendar,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const filterTabs = [
  { id: 'all', label: 'All Results' },
  { id: 'programmes', label: 'Programmes', icon: BookOpen },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'stories', label: 'Stories', icon: Award },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'shop', label: 'Products & Store', icon: ShoppingBag },
];

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Site Search"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24"
    >
      {/* Backdrop */}
      <div
        className="animate-in fade-in fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Container */}
      <div
        ref={dialogRef}
        className={cn(
          'relative w-full max-w-2xl overflow-hidden rounded-(--radius-large) border border-slate-200 bg-white shadow-2xl',
          'animate-in fade-in-50 zoom-in-95 duration-200',
        )}
      >
        {/* Search Header / Input */}
        <div className="flex items-center border-b border-slate-200 px-4 py-3 sm:px-6">
          <Search className="h-5 w-5 shrink-0 text-(--brand-primary)" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programmes, projects, stories, events, and initiatives..."
            className="flex-1 bg-transparent px-3.5 py-1 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
            aria-label="Search keywords"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded-xs p-1 text-slate-400 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-(--focus-ring)"
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 rounded-(--radius-standard) border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Content Type Filter Pills */}
        <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto border-b border-slate-100 bg-slate-50/70 px-4 py-2 sm:px-6">
          {filterTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'inline-flex items-center gap-1 rounded-(--radius-subtle) px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors',
                  isSelected
                    ? 'bg-(--brand-primary) text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900',
                )}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Body / Suggested Direct Pathways */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim().length === 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase">
                <Sparkles className="h-3.5 w-3.5 text-(--brand-primary)" />
                <span>Popular Pathways</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Link
                  href="/programmes"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-(--radius-standard) border border-slate-200 bg-white p-3 transition-colors hover:border-orange-300 hover:bg-orange-50/50"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Training Programmes</span>
                    <span className="text-[0.6875rem] text-slate-500">
                      Solar, Digital Skills & TVET
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  href="/impact/success-stories"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-(--radius-standard) border border-slate-200 bg-white p-3 transition-colors hover:border-orange-300 hover:bg-orange-50/50"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Success Stories</span>
                    <span className="text-[0.6875rem] text-slate-500">
                      Empowered MSMEs and artisans
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  href="/opportunities"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-(--radius-standard) border border-slate-200 bg-white p-3 transition-colors hover:border-orange-300 hover:bg-orange-50/50"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Open Opportunities</span>
                    <span className="text-[0.6875rem] text-slate-500">
                      Applications, Careers & Volunteering
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  href="/partner"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-(--radius-standard) border border-slate-200 bg-white p-3 transition-colors hover:border-orange-300 hover:bg-orange-50/50"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Partner With Us</span>
                    <span className="text-[0.6875rem] text-slate-500">
                      Strategic development collaboration
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm font-semibold text-slate-800">
                Searching for &ldquo;<span className="text-(--brand-primary)">{query}</span>&rdquo;
              </p>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
                Full-text search indexing is scheduled for integration with domain search services.
                Explore direct routes from the navigation menu above.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-[0.6875rem] text-slate-500 sm:px-6">
          <span>
            Tip: Press <kbd className="rounded border bg-white px-1 font-mono">ESC</kbd> to close
          </span>
          <span>Genius Hub Search Foundation</span>
        </div>
      </div>
    </div>
  );
};

export const SearchTrigger: React.FC<{
  onClick: () => void;
  className?: string;
}> = ({ onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open search dialog (Press Command K)"
      className={cn(
        'inline-flex items-center gap-2 rounded-(--radius-standard) border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-2xs transition-colors',
        'hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
        className,
      )}
    >
      <Search className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
      <span className="hidden sm:inline">Search platform...</span>
      <span className="sm:hidden">Search</span>
      <kbd className="hidden rounded border border-slate-200 bg-slate-50 px-1 font-mono text-[0.625rem] font-semibold text-slate-500 md:inline-block">
        ⌘K
      </kbd>
    </button>
  );
};
