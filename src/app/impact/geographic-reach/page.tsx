import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { MapPin, Building, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Geographic Reach | Genius Hub',
  description:
    'Our operational presence, regional learning centers, and expanding footprint across Nigeria and West Africa.',
};

const regions = [
  {
    region: 'South-South Nigeria (HQ & Core Ecosystem)',
    states: 'Edo, Delta, Rivers',
    details:
      'Our main innovation campus, garment production hub, culinary academy, and primary incubator facilities. Serving over 35,000 beneficiaries locally.',
    centers: '3 Flagship Hubs, 12 Community Satellite Units',
  },
  {
    region: 'South-West Nigeria (Commercial & Creative Hub)',
    states: 'Lagos, Ogun, Oyo',
    details:
      'Enterprise acceleration, digital agency studio, creative sector partnerships, and retail distribution bridge for artisan products.',
    centers: 'Lagos Creative Studio & Corporate Liaison',
  },
  {
    region: 'North-Central & Federal Capital Territory',
    states: 'Abuja FCT, Plateau, Nasarawa',
    details:
      'Policy advocacy, national TVET harmonization working groups, and donor coordination offices.',
    centers: 'Abuja Policy & Partnership Desk',
  },
];

export default function GeographicReachPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Footprint & Expansion', variant: 'brand' }}
        title="Geographic Reach"
        description="From our historic roots in Benin City to nationwide outreach and regional West African collaborations, Genius Hub builds durable infrastructure wherever talent requires opportunity."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Impact', href: '/impact' },
          { label: 'Geographic Reach' },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {regions.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-secondary border-border-light space-y-4 rounded-2xl border p-8"
              >
                <div className="bg-brand-orange/10 text-brand-orange flex h-10 w-10 items-center justify-center rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-display text-text-primary text-xl font-bold">{item.region}</h3>
                <div className="text-brand-orange text-xs font-semibold tracking-wider uppercase">
                  {item.states}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{item.details}</p>
                <div className="border-border-light text-text-tertiary flex items-center gap-1.5 border-t pt-4 text-xs font-medium">
                  <Building className="text-brand-orange h-4 w-4 shrink-0" />
                  {item.centers}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-orange/5 border-brand-orange/20 flex flex-col items-center justify-between gap-6 rounded-3xl border p-8 sm:flex-row">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-display text-text-primary text-lg font-bold">
                Explore Our Physical Office & Studio Locations
              </h3>
              <p className="text-text-secondary text-sm">
                View street addresses, operating hours, and map locations for our physical campuses.
              </p>
            </div>
            <Link
              href="/about/locations"
              className="bg-brand-orange hover:bg-brand-orange-dark inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
            >
              View Hub Locations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
