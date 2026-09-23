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
import { ArrowRight, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Training Programmes',
  description:
    'Explore Genius Hub capacity-building programmes in renewable solar engineering, software development, and vocational trades.',
};

const programmes = [
  {
    slug: 'solar-energy-engineering',
    title: 'Renewable Solar Installation & Microgrid Engineering',
    category: 'Renewable Energy',
    badge: 'Solar Track',
    duration: '16 Weeks Intensive',
    location: 'Benin City & Field Sites',
    description:
      'Practical training on solar PV system sizing, inverter setup, battery storage, and rural microgrid deployment.',
  },
  {
    slug: 'fullstack-software-development',
    title: 'Full-Stack Web & Cloud Application Engineering',
    category: 'Digital Academy',
    badge: 'Tech Track',
    duration: '24 Weeks Hybrid',
    location: 'Lagos Studio & Virtual',
    description:
      'Modern JavaScript, TypeScript, React, Next.js, and cloud backends with real-world enterprise internships.',
  },
  {
    slug: 'sustainable-apparel-manufacturing',
    title: 'Apparel Manufacturing & Sustainable Fashion Export',
    category: 'Creative TVET',
    badge: 'Fashion Track',
    duration: '20 Weeks Atelier',
    location: 'Benin City Garment Atelier',
    description:
      'Industrial pattern drafting, mass garment cutting, quality control, and export-grade garment assembly.',
  },
  {
    slug: 'digital-marketing-msme-growth',
    title: 'Digital Marketing & E-Commerce for MSMEs',
    category: 'Enterprise Growth',
    badge: 'Business Track',
    duration: '8 Weeks Flexible',
    location: 'Online / Hybrid',
    description:
      'Equipping entrepreneurs with digital advertising, customer acquisition funnels, and payment gateway integration.',
  },
];

export default function ProgrammesPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Capacity Building"
        title="Training Programmes"
        description="Market-driven technical curricula engineered to transition ambitious African youth and women directly into skilled employment and enterprise ownership."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Programmes', current: true },
        ]}
        actions={
          <Link href="/apply">
            <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Apply for Current Cohort
            </Button>
          </Link>
        }
      />

      <Section surface="canvas" spacing="lg">
        <Container width="default">
          <Stack gap="xl">
            <Grid cols={1} colsMd={2} gap="lg">
              {programmes.map((prog) => (
                <Card key={prog.slug} variant="default" className="flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.6875rem] font-bold tracking-wider text-slate-400 uppercase">
                        {prog.category}
                      </span>
                      <Badge variant="brand">{prog.badge}</Badge>
                    </div>
                    <CardTitle className="mt-2 text-xl">{prog.title}</CardTitle>
                    <CardDescription>{prog.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-(--brand-primary)" />
                        <span>{prog.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-(--brand-primary)" />
                        <span>{prog.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/programmes/${prog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                    >
                      <span>View Curriculum & Admissions</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PublicLayout>
  );
}
