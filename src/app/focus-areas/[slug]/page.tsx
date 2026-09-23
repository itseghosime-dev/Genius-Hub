import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader, Container, Section, Stack } from '@/components/layout';
import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

interface FocusAreaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: FocusAreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Focus Areas`,
    description: `Learn about Genius Hub initiatives, curricula, and impact under the ${formattedTitle} pillar.`,
  };
}

export default async function FocusAreaDetailPage({ params }: FocusAreaPageProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Strategic Focus Area"
        title={formattedTitle}
        description={`Targeted interventions, structured capacity training, and enterprise linkages under the ${formattedTitle} domain.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Focus Areas', href: '/focus-areas' },
          { label: formattedTitle, current: true },
        ]}
        actions={
          <Link href="/apply">
            <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Apply for Relevant Programme
            </Button>
          </Link>
        }
      />

      <Section surface="canvas" spacing="lg">
        <Container width="reading">
          <Stack gap="xl">
            <div className="prose prose-slate max-w-none">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Pillar Objectives & Intervention Strategy
              </h2>
              <p className="text-body-lg leading-relaxed text-slate-700">
                Genius Hub approaches {formattedTitle} with a comprehensive ecosystem model:
                combining practical hands-on technical skills, modern tools and technology, and
                structured post-training commercial linkages.
              </p>
              <h3 className="font-display mt-6 text-xl font-bold text-slate-900">
                Related Programmes & Projects
              </h3>
              <p className="text-body-md leading-relaxed text-slate-600">
                Cohorts and field projects in this focus area are regularly updated from our CMS
                database. Explore our active capacity-building programmes to see curriculum details
                and enrollment eligibility.
              </p>
              <div className="mt-8 flex gap-3">
                <Link href="/programmes">
                  <Button variant="secondary">Browse All Programmes</Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline">View Active Projects</Button>
                </Link>
              </div>
            </div>
          </Stack>
        </Container>
      </Section>
    </PublicLayout>
  );
}
