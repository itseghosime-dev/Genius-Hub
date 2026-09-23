'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { languages, type LanguageOption } from '@/config/navigation';

export interface LanguageSelectorProps {
  currentLanguage?: 'en' | 'fr' | 'de';
  onLanguageChange?: (lang: 'en' | 'fr' | 'de') => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage = 'en',
  onLanguageChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'fr' | 'de'>(currentLanguage);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption =
    languages.find((l) => l.code === selectedLang) ?? (languages[0] as (typeof languages)[number]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: 'en' | 'fr' | 'de') => {
    setSelectedLang(code);
    setIsOpen(false);
    onLanguageChange?.(code);
  };

  return (
    <div ref={containerRef} className={cn('relative inline-block text-left', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Select language. Current language: ${currentOption.label}`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-(--radius-standard) border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors',
          'hover:bg-slate-50 hover:text-slate-900',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)',
          isOpen && 'border-slate-300 bg-slate-50 text-slate-900',
        )}
      >
        <Globe className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
        <span className="font-mono font-bold tracking-wider uppercase">{currentOption.code}</span>
        <ChevronDown
          className={cn(
            'h-3 w-3 text-slate-400 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Available languages"
          className={cn(
            'animate-in fade-in-50 zoom-in-95 absolute right-0 z-50 mt-1.5 w-40 origin-top-right rounded-(--radius-standard) border border-slate-200 bg-white p-1 shadow-md',
          )}
        >
          {languages.map((lang: LanguageOption) => {
            const isSelected = lang.code === selectedLang;
            return (
              <li
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(lang.code)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(lang.code);
                  }
                }}
                tabIndex={0}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-xs px-3 py-2 text-xs font-medium transition-colors',
                  'hover:bg-slate-100 hover:text-slate-900',
                  'focus:bg-slate-100 focus:text-slate-900 focus:outline-none',
                  isSelected ? 'bg-orange-50 font-semibold text-orange-900' : 'text-slate-700',
                )}
              >
                <div className="flex flex-col">
                  <span>{lang.nativeLabel}</span>
                  <span className="text-[0.625rem] text-slate-500">{lang.label}</span>
                </div>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 text-(--brand-primary)" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
