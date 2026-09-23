import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader, Container, Section, Stack, Grid } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
} from '@/components/ui';
import { ArrowRight, Building2, Globe2, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Strategic Partners',
  description:
    'Our international development partners, government stakeholders, and corporate sponsors empowering communities together.',
};

const partnerCategories = [
  {
    title: 'International Development Donors',
    description:
      'Bilateral and multilateral agencies co-funding youth TVET programmes, migration reintegration, and gender equity.',
    icon: Globe2,
    badge: 'Global Partners',
  },
  {
    title: 'Government & State Agencies',
    description:
      'Collaborative frameworks with state skills development agencies, vocational boards, and national ministries.',
    icon: Building2,
    badge: 'Public Sector',
  },
  {
    title: 'Private Sector & Industry Employers',
    description:
      'Corporate partners providing direct apprenticeships, tool donation, technology licensing, and graduate recruitment.',
    icon: Award,
    badge: 'Industry',
  },
];

export default function PartnersPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Global Collaboration"
        title="Strategic Partners & Stakeholders"
        description="We collaborate with international development institutions, government agencies, and industry leaders to deliver scalable social impact."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Partners', current: true },
        ]}
        actions={
          <Link href="/partner">
            <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Partner With Us
            </Button>
          </Link>
        }
      />

      <Section surface="canvas" spacing="lg">
        <Container width="default">
          <Stack gap="xl">
            <Grid cols={1} colsMd={3} gap="lg">
              {partnerCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Card key={cat.title} variant="default">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="h-6 w-6 text-(--brand-primary)" />
                        <Badge variant="brand">{cat.badge}</Badge>
                      </div>
                      <CardTitle className="mt-3 text-lg">{cat.title}</CardTitle>
                      <CardDescription>{cat.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-sm text-slate-600">
                        Interested in co-designing a targeted intervention cohort or scaling impact
                        across West Africa?
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/partner"
                        className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                      >
                        <span>Initiate Partnership</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PublicLayout>
  );
}
