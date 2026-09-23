import React from 'react';
import type { Metadata } from 'next';
import { PublicLayout, PageHeader, Container, Section, Stack, Grid } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui';
import { MapPin, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Locations & Hubs',
  description:
    'Explore Genius Hub physical centers, headquarters, and training ateliers in Benin City, Lagos, and nationwide.',
};

const locations = [
  {
    name: 'Global Headquarters & Main Training Complex',
    city: 'Benin City, Edo State',
    country: 'Nigeria',
    type: 'Headquarters & Ateliers',
    address: 'Genius Hub Complex, Off Sapele Road, Benin City',
    contact: 'contact@geniushubglobal.com',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
  },
  {
    name: 'Lagos Innovation Studio & Tech Lab',
    city: 'Victoria Island, Lagos State',
    country: 'Nigeria',
    type: 'Tech Lab & Executive Desk',
    address: 'Innovation Centre, Victoria Island, Lagos',
    contact: 'lagos@geniushubglobal.com',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
  },
  {
    name: 'Edo North Community Skills Hub',
    city: 'Auchi, Edo State',
    country: 'Nigeria',
    type: 'Field Training Centre',
    address: 'Community Empowerment Center, Auchi',
    contact: 'auchi@geniushubglobal.com',
    hours: 'Mon - Fri: 8:30 AM - 4:30 PM',
  },
];

export default function LocationsPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Physical Presence"
        title="Locations & Training Hubs"
        description="Our state-of-the-art vocational ateliers, technical laboratories, and community training centers across Nigeria."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Locations', current: true },
        ]}
      />

      <Section surface="canvas" spacing="lg">
        <Container width="default">
          <Stack gap="xl">
            <Grid cols={1} colsMd={3} gap="lg">
              {locations.map((loc) => (
                <Card key={loc.name} variant="default">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <MapPin className="h-5 w-5 text-(--brand-primary)" />
                      <Badge variant="brand">{loc.type}</Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">{loc.name}</CardTitle>
                    <CardDescription>
                      {loc.city}, {loc.country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 text-xs text-slate-600">
                      <p>
                        <strong>Address:</strong> {loc.address}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <span>{loc.contact}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{loc.hours}</span>
                      </div>
                    </div>
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
