import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner With Us | Genius Hub',
  description:
    'Collaborate with Genius Hub on development programmes, technical training, donor interventions, and CSR initiatives.',
};

const partnershipModels = [
  {
    title: 'Multilateral & Development Donors',
    desc: 'Co-design and execute high-impact TVET, migration stabilization, gender empowerment, and youth employment projects with robust M&E frameworks.',
  },
  {
    title: 'Government & Public Sector Agencies',
    desc: 'Scale state-level skills development, curriculum modernization, and enterprise incubation infrastructure across key economic zones.',
  },
  {
    title: 'Corporate CSR & Foundation Partners',
    desc: 'Sponsor specialized training cohorts, provide graduate starter toolkits, or co-brand innovation hubs that yield verifiable community ROI.',
  },
  {
    title: 'Industry & Employer Networks',
    desc: 'Hire certified, pre-vetted vocational and digital talent directly from our talent ecosystem, or commission tailored enterprise apprenticeships.',
  },
];

export default function PartnerPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Strategic Collaboration', variant: 'brand' }}
        title="Partner with Genius Hub"
        description="We partner with international development agencies, governments, foundations, and private industry to deliver verifiable social impact at scale."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Partners', href: '/about/partners' },
          { label: 'Partner With Us' },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {partnershipModels.map((model, idx) => (
              <div
                key={idx}
                className="bg-surface-secondary border-border-light space-y-4 rounded-2xl border p-8"
              >
                <div className="bg-brand-orange/10 text-brand-orange flex h-10 w-10 items-center justify-center rounded-xl">
                  <Handshake className="h-5 w-5" />
                </div>
                <h3 className="font-display text-text-primary text-xl font-bold">{model.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{model.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-orange/5 border-brand-orange/20 flex flex-col items-center justify-between gap-8 rounded-3xl border p-8 md:flex-row md:p-12">
            <div className="max-w-2xl space-y-2 text-center md:text-left">
              <h2 className="font-display text-text-primary text-2xl font-bold">
                Ready to explore a partnership?
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Connect with our Partnerships & Institutional Development Directorate to discuss
                programmatic alignment, concept notes, or site visits.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-brand-orange hover:bg-brand-orange-dark shrink-0 rounded-xl px-8 py-4 text-base font-bold text-white shadow-md transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
