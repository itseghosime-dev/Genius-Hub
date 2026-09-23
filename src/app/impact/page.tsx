import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { Users, BookOpen, Globe2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Impact Overview | Genius Hub',
  description:
    'Measuring verifiable social impact, livelihood transformation, and economic resilience across Nigeria and beyond.',
};

const impactMetrics = [
  { value: '50,000+', label: 'Beneficiaries Reached', sub: 'Youth, women, and returnees trained' },
  { value: '3,800+', label: 'Enterprises Supported', sub: 'Micro & small business acceleration' },
  { value: '70%', label: 'Women & Girls', sub: 'Priority participation across all hubs' },
  { value: '18+', label: 'States Impacted', sub: 'Expanding national footprint in Nigeria' },
];

export default function ImpactPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Evidence & Results', variant: 'brand' }}
        title="Transforming Lives Through Measurable Action"
        description="Our impact architecture combines data-driven monitoring, rigorous field evaluation, and human-centered development metrics to ensure every programme delivers sustainable economic independence."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Impact', href: '/impact' },
          { label: 'Overview' },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((stat, i) => (
              <div
                key={i}
                className="bg-surface-secondary border-border-light rounded-2xl border p-8 text-center"
              >
                <div className="font-display text-brand-orange mb-2 text-3xl font-extrabold lg:text-4xl">
                  {stat.value}
                </div>
                <div className="text-text-primary mb-1 font-semibold">{stat.label}</div>
                <div className="text-text-tertiary text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Link
              href="/impact/success-stories"
              className="group bg-surface-secondary border-border-light hover:border-brand-orange rounded-2xl border p-8 transition-all duration-300"
            >
              <div className="bg-brand-orange/10 text-brand-orange mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display text-text-primary mb-2 text-xl font-bold">
                Success Stories
              </h3>
              <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                Discover firsthand testimonies of students, artisans, and entrepreneurs who
                transformed their livelihoods.
              </p>
              <span className="text-brand-orange inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5">
                Read stories <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/impact/reports"
              className="group bg-surface-secondary border-border-light hover:border-brand-orange rounded-2xl border p-8 transition-all duration-300"
            >
              <div className="bg-brand-blue/10 text-brand-blue mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-display text-text-primary mb-2 text-xl font-bold">
                Reports & Publications
              </h3>
              <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                Access audited annual impact evaluations, independent donor reviews, and policy
                research briefs.
              </p>
              <span className="text-brand-orange inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5">
                Download reports <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/impact/geographic-reach"
              className="group bg-surface-secondary border-border-light hover:border-brand-orange rounded-2xl border p-8 transition-all duration-300"
            >
              <div className="bg-brand-green/10 text-brand-green mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-text-primary mb-2 text-xl font-bold">
                Geographic Reach
              </h3>
              <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                Explore our hub presence, mobile training units, and community partner networks
                across regions.
              </p>
              <span className="text-brand-orange inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5">
                Explore reach <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
