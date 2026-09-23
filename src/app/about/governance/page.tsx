import React from 'react';
import type { Metadata } from 'next';
import { PublicLayout, PageHeader, Container, Section, Stack, Grid } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { ShieldCheck, FileText, Lock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Governance & Ethics',
  description:
    'Genius Hub institutional governance, fiduciary accountability, safeguarding policies, and ethical standards.',
};

export default function GovernancePage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Trust & Accountability"
        title="Governance & Ethics"
        description="We hold ourselves to the highest international standards of fiscal transparency, safeguarding, and institutional governance."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Governance', current: true },
        ]}
      />

      <Section surface="canvas" spacing="lg">
        <Container width="default">
          <Stack gap="xl">
            <Grid cols={1} colsMd={2} gap="lg">
              <Card variant="default">
                <CardHeader>
                  <ShieldCheck className="h-6 w-6 text-(--brand-primary)" />
                  <CardTitle>Fiduciary Oversight & Audit</CardTitle>
                  <CardDescription>
                    Independent financial audits conducted annually in compliance with international
                    donor accounting standards.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-slate-600">
                    Genius Hub maintains strict internal financial controls, automated transaction
                    logging, and segregation of duties across all grant disbursements and
                    procurement.
                  </p>
                </CardContent>
              </Card>

              <Card variant="default">
                <CardHeader>
                  <Lock className="h-6 w-6 text-blue-600" />
                  <CardTitle>Safeguarding & Human Dignity</CardTitle>
                  <CardDescription>
                    Zero-tolerance policies regarding harassment, exploitation, and discrimination
                    across all training centers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-slate-600">
                    Dedicated safeguarding officers ensure safe, inclusive learning environments for
                    all beneficiaries, specifically protecting vulnerable women and youth.
                  </p>
                </CardContent>
              </Card>

              <Card variant="default">
                <CardHeader>
                  <FileText className="h-6 w-6 text-emerald-600" />
                  <CardTitle>Whistleblowing & Compliance</CardTitle>
                  <CardDescription>
                    Confidential reporting mechanisms accessible to beneficiaries, staff, and
                    external partners.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-slate-600">
                    All compliance inquiries are reviewed independently by the board governance
                    committee to ensure complete transparency.
                  </p>
                </CardContent>
              </Card>

              <Card variant="default">
                <CardHeader>
                  <Users className="h-6 w-6 text-orange-600" />
                  <CardTitle>Data Privacy & Beneficiary Consent</CardTitle>
                  <CardDescription>
                    Strict adherence to NDPR and international privacy frameworks for all student
                    and beneficiary records.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-slate-600">
                    Beneficiary data is encrypted, securely stored, and never shared with commercial
                    third parties without explicit legal consent.
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PublicLayout>
  );
}
