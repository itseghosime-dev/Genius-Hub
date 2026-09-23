import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader, Container, Section, Stack } from '@/components/layout';
import { Button } from '@/components/ui';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProgrammePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProgrammePageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Programmes`,
    description: `Curriculum, eligibility criteria, and enrollment details for the ${formattedTitle} programme at Genius Hub.`,
  };
}

export default async function ProgrammeDetailPage({ params }: ProgrammePageProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Training Programme"
        title={formattedTitle}
        description="A structured, industry-aligned capacity building track delivering practical craft mastery, technology proficiency, and commercial agency."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Programmes', href: '/programmes' },
          { label: formattedTitle, current: true },
        ]}
        actions={
          <Link href="/apply">
            <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Apply for This Programme
            </Button>
          </Link>
        }
      />

      <Section surface="canvas" spacing="lg">
        <Container width="reading">
          <Stack gap="xl">
            <div className="prose prose-slate max-w-none">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Curriculum Overview & Practical Learning
              </h2>
              <p className="text-body-lg leading-relaxed text-slate-700">
                The {formattedTitle} cohort provides intensive, studio-based and laboratory learning
                led by accredited master practitioners. Students complete real client projects,
                undergo safety and quality certifications, and receive post-training enterprise
                toolkits.
              </p>

              <h3 className="font-display mt-6 text-xl font-bold text-slate-900">
                Admission Requirements & Eligibility
              </h3>
              <ul className="text-body-md list-none space-y-2 pl-0 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-(--brand-primary)" />
                  <span>Open to ambitious youth and women aged 18–35.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-(--brand-primary)" />
                  <span>Demonstrated commitment to the full cohort duration.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-(--brand-primary)" />
                  <span>
                    Priority access for returnee migrants and marginalized community members.
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-(--radius-standard) border border-slate-200 bg-slate-50 p-6 sm:flex-row">
                <div className="flex flex-col">
                  <span className="font-display text-sm font-bold text-slate-900">
                    Cohort Admissions Open
                  </span>
                  <span className="text-xs text-slate-500">
                    Apply early to secure scholarship consideration and toolkit access.
                  </span>
                </div>
                <Link href="/apply">
                  <Button variant="primary" size="sm">
                    Submit Application
                  </Button>
                </Link>
              </div>
            </div>
          </Stack>
        </Container>
      </Section>
    </PublicLayout>
  );
}
