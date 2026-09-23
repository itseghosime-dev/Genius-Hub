import React from 'react';
import Link from 'next/link';
import { PublicLayout, PageHeader, Container, Section, Stack, Grid } from '@/components/layout';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Stat,
} from '@/components/ui';
import { ArrowRight, BookOpen, Sparkles, Award, Globe, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Foundation Entry Shell (Phase 05 Shell - Phase 06 will design full Narrative Experience) */}
      <PageHeader
        eyebrow="Genius Hub Digital Platform"
        eyebrowVariant="brand"
        title="Human Capital Development & Technological Innovation"
        description="A global development organization originating from Nigeria. Equipping individuals, youth, and women with market-driven vocational skills, renewable solar engineering, and digital technology for the future of work."
        surface="cloud"
        actions={
          <>
            <Link href="/apply">
              <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Apply for Training
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" leftIcon={<Globe className="h-4 w-4" />}>
                Explore Genius Hub
              </Button>
            </Link>
            <Link href="/partner">
              <Button variant="outline" leftIcon={<ShieldCheck className="h-4 w-4" />}>
                Partner With Us
              </Button>
            </Link>
          </>
        }
      />

      {/* Core Impact Statistics Foundation */}
      <Section surface="canvas" spacing="md" className="border-b border-slate-200">
        <Container width="default">
          <Grid cols={1} colsSm={2} colsLg={4} gap="xl">
            <Stat
              value="12,000"
              suffix="+"
              label="MSMEs Empowered"
              description="Grassroots enterprises founded and scaled across Edo, Lagos, and national hubs."
            />
            <Stat
              value="85"
              suffix="%"
              label="Livelihood Placement"
              description="Graduates actively operating registered businesses or placed in skilled employment."
            />
            <Stat
              value="45"
              suffix="+"
              label="Innovation Hubs"
              description="Community learning centers, fashion ateliers, and solar testing workshops."
            />
            <Stat
              prefix="₦"
              value="250M"
              suffix="+"
              label="Seed Capital Disbursed"
              description="Direct enterprise grants, toolkits, and equipment funding for beneficiaries."
            />
          </Grid>
        </Container>
      </Section>

      {/* Information Architecture Navigation Highlights */}
      <Section surface="cloud" spacing="lg">
        <Container width="default">
          <Stack gap="xl">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">Ecosystem Overview</span>
              <h2 className="font-display text-display-lg font-bold text-slate-900">
                Explore the Genius Hub Ecosystem
              </h2>
              <p className="text-body-md max-w-2xl text-slate-600">
                Navigate key public areas across our strategic pillars, capacity-building
                programmes, verified impact evidence, and direct enrollment pathways.
              </p>
            </div>

            <Grid cols={1} colsMd={3} gap="lg">
              <Card variant="feature">
                <CardHeader>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-(--brand-primary)">
                    <BookOpen className="h-4 w-4" />
                    <span>Capacity Building</span>
                  </div>
                  <CardTitle>Training Programmes</CardTitle>
                  <CardDescription>
                    Renewable solar installation, full-stack software development, and industrial
                    garment manufacturing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-slate-600">
                    Comprehensive, hands-on curricula designed in collaboration with industry
                    partners to ensure immediate employability.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/programmes"
                    className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                  >
                    <span>View All Programmes</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardFooter>
              </Card>

              <Card variant="default">
                <CardHeader>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                    <Award className="h-4 w-4" />
                    <span>Verified Outcomes</span>
                  </div>
                  <CardTitle>Impact & Stories</CardTitle>
                  <CardDescription>
                    Documented success stories of youth, women, and returnee migrants building
                    sustainable livelihoods.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-slate-600">
                    Explore quantitative milestones, verified evaluation audits, and first-person
                    beneficiary documentary profiles.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/impact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                  >
                    <span>Explore Our Impact</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardFooter>
              </Card>

              <Card variant="default">
                <CardHeader>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <Sparkles className="h-4 w-4" />
                    <span>Get Involved</span>
                  </div>
                  <CardTitle>Opportunities & Partners</CardTitle>
                  <CardDescription>
                    Apply for open cohort admissions, partner with Genius Hub, or collaborate on
                    community projects.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-slate-600">
                    Join an international network of development practitioners, government agencies,
                    and industry innovators.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/opportunities"
                    className="inline-flex items-center gap-1 text-xs font-bold text-(--brand-primary) hover:underline"
                  >
                    <span>Explore Opportunities</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PublicLayout>
  );
}
