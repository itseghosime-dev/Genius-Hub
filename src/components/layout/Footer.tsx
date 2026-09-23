'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { footerNavigation } from '@/config/navigation';
import { Button } from '@/components/ui';
import { MapPin, ArrowRight, Globe } from 'lucide-react';

const socialIcons: Record<string, React.ReactNode> = {
  Twitter: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  Facebook: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  ),
  Instagram: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
};

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={cn('border-t border-slate-800 bg-(--surface-inverse) text-slate-300', className)}
    >
      <div className="mx-auto max-w-(--content-default) px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        {/* Top Mission & Newsletter Grid */}
        <div className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Mission Statement */}
          <div className="flex flex-col gap-4 lg:col-span-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-(--radius-standard) bg-(--brand-primary) font-bold text-white">
                G
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Genius<span className="text-(--brand-primary)">Hub</span> Global
              </span>
            </Link>
            <p className="text-body-sm max-w-md leading-relaxed text-slate-400">
              A global development organization originating from Nigeria. Equipping individuals,
              youth, and women with market-driven vocational crafts, renewable solar engineering,
              and digital technology for the future of work.
            </p>

            {/* Office Locations */}
            <div className="mt-2 flex flex-col gap-2 text-xs text-slate-400">
              {footerNavigation.locations.map((loc) => (
                <div key={loc.name} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-(--brand-primary)" />
                  <span>
                    <strong className="text-slate-200">{loc.name}:</strong> {loc.city},{' '}
                    {loc.country}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup UI Placeholder */}
          <div className="flex flex-col gap-3 rounded-(--radius-standard) border border-slate-800 bg-slate-900/60 p-6 lg:col-span-6">
            <h3 className="font-display text-base font-bold text-white">
              Stay Connected with Genius Hub Updates
            </h3>
            <p className="text-xs text-slate-400">
              Receive quarterly impact bulletins, cohort admissions announcements, and research
              insights.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for your interest. Newsletter subscription will activate soon.');
              }}
              className="mt-2 flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 rounded-(--radius-standard) border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none"
                aria-label="Email for newsletter subscription"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Categorized Link Navigation Grid */}
        <div className="grid grid-cols-2 gap-8 border-t border-slate-800/80 pt-12 md:grid-cols-3 lg:grid-cols-5">
          {footerNavigation.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3.5">
              <h4 className="font-display text-xs font-bold tracking-wider text-slate-200 uppercase">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2 text-xs">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 transition-colors hover:text-(--brand-primary) focus-visible:outline-2 focus-visible:outline-(--focus-ring)"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal, Social & Trust Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Genius Hub Global. All rights reserved. Registered
            development organization.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {footerNavigation.social.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className="flex h-8 w-8 items-center justify-center rounded-(--radius-standard) border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-2 focus-visible:outline-(--focus-ring)"
              >
                {socialIcons[social.platform] || <Globe className="h-4 w-4" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
