import type { Metadata } from 'next';
import { PublicLayout, PageHeader } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Terms of Use | Genius Hub',
  description:
    'Terms and conditions governing the use of Genius Hub digital platforms, resources, and educational content.',
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Legal Terms', variant: 'brand' }}
        title="Terms of Use"
        description="Guidelines and legal terms governing visitor interaction with Genius Hub digital platforms and services."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-text-secondary max-w-none space-y-8 leading-relaxed">
            <div className="bg-surface-secondary border-border-light text-text-tertiary rounded-xl border p-4 text-xs">
              Last Updated: March 2026
            </div>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the Genius Hub digital platform, you agree to comply with and
              be bound by these Terms of Use and our Privacy Policy. If you do not agree with these
              terms, please discontinue platform use.
            </p>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              2. Intellectual Property & Brand Assets
            </h2>
            <p>
              All trademarks, logos, educational curriculum materials, reports, photography, and
              digital assets published on this website are the intellectual property of Genius Hub
              Global Initiative or its licensors, protected by Nigerian and international copyright
              statutes.
            </p>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              3. Beneficiary & Applicant Code of Conduct
            </h2>
            <p>
              All users submitting training applications or participating in our physical or virtual
              cohort sessions agree to provide truthful information and adhere to our safeguarding,
              anti-harassment, and community mutual-respect policies.
            </p>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              4. Disclaimer & Limitation of Liability
            </h2>
            <p>
              Genius Hub provides informational materials and educational pathways in good faith. We
              make no warranty that our services will be uninterrupted or error-free.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
