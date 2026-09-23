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
  Badge,
} from '@/components/ui';
import { Sun, Code, Scissors, Users, Leaf, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Focus Areas',
  description:
    'Explore Genius Hub strategic thematic focus areas driving vocational, digital, and economic empowerment across Africa.',
};

const focusAreas = [
  {
    slug: 'vocational-skills-tvet',
    title: 'Vocational Skills & TVET Excellence',
    description:
      'Empowering youth and women with market-relevant technical trades, craft mastery, and commercial enterprise agency.',
    icon: Scissors,
    badge: 'TVET Core',
    initiatives:
      'Garment production, cosmetology, culinary arts, carpentry, and electrical installation.',
  },
  {
    slug: 'renewable-solar-energy',
    title: 'Renewable Solar Energy & Green Tech',
    description:
      'Training technicians and entrepreneurs in off-grid solar installation, inverter maintenance, and microgrid infrastructure.',
    icon: Sun,
    badge: 'Green Growth',
    initiatives:
      'Solar technician cohorts, clean cooking transition, and rural electrification projects.',
  },
  {
    slug: 'digital-skills-future-of-work',
    title: 'Digital Skills & Future of Work',
    description:
      'Equipping youth with coding, full-stack software development, cloud computing, and remote workplace readiness.',
    icon: Code,
    badge: 'Technology',
    initiatives:
      'Coding bootcamps, digital marketing, AI tools for MSMEs, and freelance agency incubation.',
  },
  {
    slug: 'migration-advocacy-reintegration',
    title: 'Safe Migration & Reintegration',
    description:
      'Providing dignified vocational training, psychological support, and enterprise toolkits to returnee migrants.',
    icon: Users,
    badge: 'Human Dignity',
    initiatives: 'Livelihood support, community sensitization, and anti-trafficking partnerships.',
  },
  {
    slug: 'sustainable-agribusiness',
    title: 'Sustainable Agribusiness & Food Security',
    description:
      'Fostering modern agricultural practices, hydroponics, food processing, and farm-to-market commercial supply chains.',
    icon: Leaf,
    badge: 'Agriculture',
    initiatives:
      'Greenhouse farming, agro-processing value addition, and cooperative distribution.',
  },
];

export default function FocusAreasPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Strategic Pillars"
        title="Our Focus Areas"
        description="Targeted thematic domains engineered to solve systemic youth unemployment, climate vulnerability, and gender economic inequality."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Focus Areas', current: true },
        ]}
      />

      <Section surface="canvas" spacing="lg">
        <Container width="default">
          <Stack gap="xl">
            <Grid cols={1} colsMd={2} colsLg={3} gap="lg">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <Card key={area.slug} variant="default" className="flex flex-col justify-between">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="h-6 w-6 text-(--brand-primary)" />
                        <Badge variant="brand">{area.badge}</Badge>
                      </div>
                      <CardTitle className="mt-3 text-lg">{area.title}</CardTitle>
                      <CardDescription>{area.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-slate-500">
                        <strong>Key Tracks:</strong> {area.initiatives}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`/focus-areas/${area.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                      >
                        <span>Explore Focus Area</span>
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
