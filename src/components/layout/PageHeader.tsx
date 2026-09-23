'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Container, Section, Stack, Cluster } from '@/components/layout';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/Breadcrumbs';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import type { SurfaceTheme } from '@/config/design';

export interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  eyebrowVariant?: BadgeVariant;
  badge?: { text: string; variant?: BadgeVariant };
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  media?: React.ReactNode;
  surface?: SurfaceTheme;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  eyebrow,
  eyebrowVariant = 'brand',
  badge,
  description,
  breadcrumbs,
  actions,
  media,
  surface = 'cloud',
  className,
}) => {
  const badgeText = badge ? badge.text : eyebrow;
  const activeVariant = badge ? (badge.variant ?? 'brand') : eyebrowVariant;

  return (
    <Section
      surface={surface}
      spacing="md"
      className={cn('border-b border-slate-200/80', className)}
    >
      <Container width="default">
        <Stack gap="md">
          {/* Integrated Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-1">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className={cn(media ? 'lg:col-span-8' : 'lg:col-span-10')}>
              <Stack gap="sm">
                {badgeText && (
                  <Cluster gap="xs">
                    <Badge variant={activeVariant} dot>
                      {badgeText}
                    </Badge>
                  </Cluster>
                )}

                <h1 className="font-display text-display-xl sm:text-display-2xl font-extrabold tracking-tight text-slate-900">
                  {title}
                </h1>

                {description && (
                  <p className="text-body-lg max-w-3xl leading-relaxed text-slate-600">
                    {description}
                  </p>
                )}

                {actions && <div className="mt-4 flex flex-wrap items-center gap-3">{actions}</div>}
              </Stack>
            </div>

            {media && <div className="lg:col-span-4">{media}</div>}
          </div>
        </Stack>
      </Container>
    </Section>
  );
};
