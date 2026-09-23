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
import { ArrowRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects & Initiatives',
  description:
    'Explore Genius Hub community field interventions, donor-funded projects, and sustainable livelihood initiatives.',
};

const projects = [
  {
    slug: 'edo-rural-solar-electrification',
    title: 'Edo Rural Clean Energy & Solar Livelihoods Initiative',
    donor: 'Global Energy Partner',
    location: 'Edo State (Rural Hubs)',
    badge: 'Active Project',
    summary:
      'Installing community solar kiosks and training 250 local youth to manage and service decentralized off-grid microgrids.',
  },
  {
    slug: 'women-in-apparel-manufacturing',
    title: 'Women in Garment Export & Sustainable Production',
    donor: 'Gender & Enterprise Foundation',
    location: 'Benin City Atelier',
    badge: 'Flagship Initiative',
    summary:
      'Upskilling 400 vulnerable women in industrial pattern making, commercial apparel construction, and national retail distribution.',
  },
  {
    slug: 'returnee-youth-tech-reintegration',
    title: 'Safe Migration & Returnee Digital Skills Acceleration',
    donor: 'International Migration Advisory',
    location: 'Benin City & Lagos Studio',
    badge: 'Reintegration',
    summary:
      'Comprehensive psychosocial support and digital software bootcamps enabling returnee migrants to launch digital services agencies.',
  },
];

export default function ProjectsPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Field Interventions"
        title="Active Projects & Initiatives"
        description="Targeted community development projects co-designed with international donors, state partners, and grassroots leaders."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', current: true },
        ]}
      />

      <Section surface="canvas" spacing="lg">
        <Container width="default">
          <Stack gap="xl">
            <Grid cols={1} colsMd={3} gap="lg">
              {projects.map((proj) => (
                <Card key={proj.slug} variant="default" className="flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="brand">{proj.badge}</Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-(--brand-primary)" />
                        <span>{proj.location}</span>
                      </div>
                    </div>
                    <CardTitle className="mt-3 text-lg">{proj.title}</CardTitle>
                    <CardDescription>{proj.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-500">
                      <strong>Partner / Funder:</strong> {proj.donor}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/projects/${proj.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                    >
                      <span>Read Project Brief</span>
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
