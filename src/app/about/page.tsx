import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader, Container, Section, Stack, Grid } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  Avatar,
} from '@/components/ui';
import { ArrowRight, Users, Shield, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Genius Hub',
  description:
    'Learn about Genius Hub, our leadership, our Nigerian origin, and our global mission to empower individuals through skills and technology.',
};

export default function AboutOverviewPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Organization Overview"
        title="About Genius Hub"
        description="A global development organization originating from Nigeria. We bridge the gap between human potential, market-driven vocational skills, and technology for the future of work."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', current: true },
        ]}
      />

      <Section surface="canvas" spacing="lg">
        <Container width="default">
          <Stack gap="2xl">
            {/* Core Mission & Value Pillars */}
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="flex flex-col gap-4 lg:col-span-7">
                <span className="text-label text-(--brand-primary)">Our Mission & Purpose</span>
                <h2 className="font-display text-display-lg font-bold text-slate-900">
                  Dignified Pathways to Economic Self-Reliance
                </h2>
                <p className="text-body-lg leading-relaxed text-slate-600">
                  Founded in Benin City, Edo State, Genius Hub works across Nigeria and
                  internationally to catalyze sustainable economic opportunities for youth, women,
                  and vulnerable populations. Through rigorous technical curricula, commercial
                  mindset incubation, and post-training enterprise linkage, we transform
                  beneficiaries into confident job creators.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/about/our-story">
                    <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      Read Our Story
                    </Button>
                  </Link>
                  <Link href="/about/leadership">
                    <Button variant="secondary" leftIcon={<Users className="h-4 w-4" />}>
                      Meet Our Leadership
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-(--radius-standard) border border-slate-200 bg-slate-50 p-8 lg:col-span-5">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar name="Isimeme Whyte" size="lg" />
                    <div className="flex flex-col">
                      <span className="font-display text-base font-bold text-slate-900">
                        Isimeme Whyte
                      </span>
                      <span className="text-xs text-slate-500">
                        Founder & CEO, Genius Hub Global
                      </span>
                    </div>
                  </div>
                  <blockquote className="font-display text-base font-medium text-slate-700 italic">
                    &ldquo;Our vision is an Africa where every youth possesses the skills,
                    technology, and commercial agency to build generational prosperity.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Sub-Section Exploration Cards */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-label text-(--brand-primary)">Explore Our Organization</span>
                <h3 className="font-display text-heading-xl font-bold text-slate-900">
                  Governance, People & Presence
                </h3>
              </div>

              <Grid cols={1} colsMd={3} gap="lg">
                <Card variant="default">
                  <CardHeader>
                    <Users className="h-5 w-5 text-(--brand-primary)" />
                    <CardTitle>Leadership & Team</CardTitle>
                    <CardDescription>
                      The executive team, board of trustees, and advisory council guiding Genius
                      Hub.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link
                      href="/about/leadership"
                      className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                    >
                      <span>View Team</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardFooter>
                </Card>

                <Card variant="default">
                  <CardHeader>
                    <Shield className="h-5 w-5 text-blue-600" />
                    <CardTitle>Governance & Ethics</CardTitle>
                    <CardDescription>
                      Rigorous compliance, transparent financial auditing, and human rights
                      safeguarding.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link
                      href="/about/governance"
                      className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                    >
                      <span>Read Policies</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardFooter>
                </Card>

                <Card variant="default">
                  <CardHeader>
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <CardTitle>Locations & Hubs</CardTitle>
                    <CardDescription>
                      Physical training ateliers, technical labs, and partner centers across
                      Nigeria.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link
                      href="/about/locations"
                      className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                    >
                      <span>Explore Centers</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardFooter>
                </Card>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Section>
    </PublicLayout>
  );
}
