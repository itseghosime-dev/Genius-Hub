import type { Metadata } from 'next';
import { PublicLayout, PageHeader } from '@/components/layout';
import { Download, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reports & Publications | Genius Hub',
  description:
    'Annual impact evaluations, programmatic publications, baseline research, and audited governance disclosures.',
};

const publications = [
  {
    title: 'Annual Impact & Accountability Report 2025',
    type: 'Annual Report',
    date: 'January 2026',
    size: '4.8 MB PDF',
    summary:
      'Comprehensive evaluation of 14,000+ youth and women trained across vocational and digital cohorts, including audited tracer study metrics.',
  },
  {
    title: 'Gender Inclusion & Economic Mobility in West African TVET',
    type: 'Research Paper',
    date: 'October 2025',
    size: '2.3 MB PDF',
    summary:
      'Policy brief analyzing female participation barriers and enterprise graduation rates in high-demand technical trades.',
  },
  {
    title: 'Youth Livelihoods & Migration Alternatives Evaluation Brief',
    type: 'Evaluation Brief',
    date: 'June 2025',
    size: '1.9 MB PDF',
    summary:
      'Independent multi-stakeholder assessment on vocational empowerment as a primary stabilization pathway in Edo and Niger Delta regions.',
  },
];

export default function ReportsPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Transparency & Governance', variant: 'brand' }}
        title="Reports and Publications"
        description="We believe in rigorous accountability and open sharing of development insights. Explore our independent evaluations, tracer studies, and policy research."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Impact', href: '/impact' },
          { label: 'Reports & Publications' },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {publications.map((pub, idx) => (
              <div
                key={idx}
                className="bg-surface-secondary border-border-light hover:border-brand-orange/40 flex flex-col justify-between gap-6 rounded-2xl border p-8 transition-colors md:flex-row md:items-center"
              >
                <div className="max-w-3xl space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1 text-xs font-semibold">
                      {pub.type}
                    </span>
                    <span className="text-text-tertiary flex items-center gap-1 text-xs">
                      <Calendar className="h-3.5 w-3.5" />
                      {pub.date}
                    </span>
                  </div>
                  <h3 className="font-display text-text-primary text-xl font-bold">{pub.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{pub.summary}</p>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <span className="text-text-tertiary hidden text-xs sm:inline-block">
                    {pub.size}
                  </span>
                  <button
                    type="button"
                    className="bg-surface-primary border-border-light text-text-primary hover:border-brand-orange hover:text-brand-orange inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
