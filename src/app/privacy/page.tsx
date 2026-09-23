import type { Metadata } from 'next';
import { PublicLayout, PageHeader } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Genius Hub',
  description:
    'Information regarding data protection, beneficiary privacy, and compliance with the Nigeria Data Protection Act (NDPA) and global privacy standards.',
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Data Governance', variant: 'brand' }}
        title="Privacy Policy"
        description="Genius Hub is committed to protecting the personal data and privacy of all students, beneficiaries, partners, and platform visitors."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-text-secondary max-w-none space-y-8 leading-relaxed">
            <div className="bg-surface-secondary border-border-light text-text-tertiary rounded-xl border p-4 text-xs">
              Last Updated: March 2026 | Compliant with Nigeria Data Protection Regulation (NDPR) &
              NDPA 2023.
            </div>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              1. Information We Collect
            </h2>
            <p>
              When you interact with Genius Hub—whether applying for vocational cohorts, registering
              for events, partnering on donor projects, or visiting our digital platform—we collect
              personal information that you provide voluntarily. This includes contact details,
              demographic information, identification records for beneficiary verification, and
              feedback responses.
            </p>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              2. How We Use Beneficiary & Visitor Data
            </h2>
            <p>
              We process personal information exclusively for legitimate organizational and
              developmental purposes:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-sm">
              <li>
                Facilitating training cohort admissions, certifications, and alumni mentorship.
              </li>
              <li>
                Monitoring, Evaluation, and Learning (MEL) reporting for international donor
                accountability (reported only in aggregated/anonymized formats unless express
                consent is granted).
              </li>
              <li>
                Communicating programmatic announcements, event details, and newsletter updates.
              </li>
              <li>
                Safeguarding our physical facilities, learning platforms, and administrative
                records.
              </li>
            </ul>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              3. Data Security & Storage
            </h2>
            <p>
              We maintain technical, physical, and administrative safeguards designed to protect
              personal information against unauthorized access, alteration, disclosure, or
              destruction. Access to confidential beneficiary data is restricted strictly to
              authorized staff on a need-to-know basis.
            </p>

            <h2 className="font-display text-text-primary text-2xl font-bold">4. Your Rights</h2>
            <p>
              Under applicable data protection laws, you possess the right to access, rectify, or
              request deletion of your personal records. For inquiries or data protection requests,
              contact our Data Protection Officer at <strong>privacy@geniushub.org</strong>.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
