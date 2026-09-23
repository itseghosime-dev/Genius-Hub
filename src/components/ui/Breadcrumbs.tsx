import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = (
    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-(--text-muted)" aria-hidden="true" />
  ),
  className,
  ...props
}) => {
  return (
    <nav aria-label="Breadcrumbs" className={cn('flex items-center text-xs', className)} {...props}>
      <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.current || isLast;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="font-medium text-(--text-secondary) no-underline transition-colors hover:text-(--brand-primary) hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'font-medium',
                    isCurrent ? 'font-semibold text-(--text-primary)' : 'text-(--text-secondary)',
                  )}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
