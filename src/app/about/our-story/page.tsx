import React from 'react';
import type { Metadata } from 'next';
import { PublicLayout, PageHeader, Container, Section, Stack } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Our Story & Heritage',
  description:
    'The journey of Genius Hub: from grassroots roots in Benin City, Edo State, to an internationally recognized development organization.',
};

export default function OurStoryPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Organization Heritage"
        title="Our Story & Mission Journey"
        description="From grassroots community workshops in Edo State, Nigeria, to a global development organization transforming thousands of lives."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Our Story', current: true },
        ]}
      />

      <Section surface="canvas" spacing="lg">
        <Container width="reading">
          <Stack gap="xl">
            <div className="prose prose-slate max-w-none">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Originating from Benin City with a Global Vision
              </h2>
              <p className="text-body-lg leading-relaxed text-slate-700">
                Genius Hub was founded with an urgent, deeply personal conviction: that talent is
                universally distributed, but structured commercial opportunity and market-relevant
                technical education are not.
              </p>
              <p className="text-body-md leading-relaxed text-slate-600">
                Operating from Edo State—a region with rich artisanal history and significant youth
                migration dynamics—Genius Hub pioneered an integrated intervention model combining
                technical skill acquisition, commercial mindset transformation, and direct
                post-training capital linkages.
              </p>
              <h3 className="font-display mt-8 text-xl font-bold text-slate-900">
                The Triple-Impact Formula
              </h3>
              <p className="text-body-md leading-relaxed text-slate-600">
                Every Genius Hub initiative incorporates three fundamental stages:
              </p>
              <ul className="text-body-md list-disc space-y-2 pl-5 text-slate-600">
                <li>
                  <strong>Practical Craft & Technology:</strong> Intensive hands-on mastery in
                  high-demand fields such as solar engineering, garment production, and software
                  development.
                </li>
                <li>
                  <strong>Enterprise & Financial Agency:</strong> Rigorous training in cost
                  accounting, client contracting, branding, and regulatory compliance.
                </li>
                <li>
                  <strong>Incubation & Livelihood Placement:</strong> Facilitating toolkits,
                  micro-grants, and direct client contracts so graduates transition immediately into
                  viable earnings.
                </li>
              </ul>
            </div>
          </Stack>
        </Container>
      </Section>
    </PublicLayout>
  );
}
