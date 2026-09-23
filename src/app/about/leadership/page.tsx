import React from 'react';
import type { Metadata } from 'next';
import { PublicLayout, PageHeader, Container, Section, Stack, Grid } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  Badge,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Leadership & Team',
  description:
    'Meet the leadership team, board members, and founder Isimeme Whyte guiding Genius Hub Global.',
};

const leaders = [
  {
    name: 'Isimeme Whyte',
    role: 'Founder & Chief Executive Officer',
    bio: 'Social impact entrepreneur, vocational innovation strategist, and advocate for youth empowerment and safe migration in Africa.',
    badge: 'Executive Lead',
  },
  {
    name: 'Board of Trustees',
    role: 'Strategic & Legal Governance',
    bio: 'Distinguished professionals across international development, law, education, and finance providing fiduciary oversight.',
    badge: 'Governance',
  },
  {
    name: 'Technical Advisory Council',
    role: 'Curriculum & Industry Linkage',
    bio: 'Engineers, renewable energy pioneers, and garment industry leaders ensuring global accreditation standards.',
    badge: 'Advisory',
  },
];

export default function LeadershipPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Leadership & Governance"
        title="Our Leadership & Team"
        description="Guided by experienced development practitioners, industry pioneers, and grassroots community advocates."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Leadership', current: true },
        ]}
      />

      <Section surface="canvas" spacing="lg">
        <Container width="default">
          <Stack gap="xl">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">Executive Direction</span>
              <h2 className="font-display text-heading-xl font-bold text-slate-900">
                Guiding Genius Hub&apos;s Mission
              </h2>
            </div>

            <Grid cols={1} colsMd={3} gap="lg">
              {leaders.map((leader) => (
                <Card key={leader.name} variant="default">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Avatar name={leader.name} size="lg" />
                      <Badge variant="brand">{leader.badge}</Badge>
                    </div>
                    <CardTitle className="mt-3">{leader.name}</CardTitle>
                    <CardDescription>{leader.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body-sm leading-relaxed text-slate-600">{leader.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PublicLayout>
  );
}
