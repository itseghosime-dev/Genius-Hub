import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';

interface EventSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Events | Genius Hub`,
    description: `Event details, schedule, speaker lineup, and registration guidelines for ${formattedTitle}.`,
  };
}

export default async function EventDetailPage({ params }: EventSlugPageProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Event Details', variant: 'brand' }}
        title={formattedTitle}
        description="Comprehensive session schedule, keynote speakers, venue logistics, and participation information."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: formattedTitle },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="font-display text-text-primary mb-4 text-2xl font-bold">
                  About This Event
                </h2>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  This gathering convenes youth innovators, vocational practitioners, international
                  development partners, and policy champions. Attendees will participate in hands-on
                  workshops, interactive panel debates, and live product showcases.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Participation provides direct networking with industry recruiters, creative
                  enterprise mentors, and financial inclusion partners.
                </p>
              </div>

              <div className="bg-surface-secondary border-border-light rounded-2xl border p-6">
                <h3 className="font-display text-text-primary mb-4 text-lg font-bold">
                  Event Highlights
                </h3>
                <ul className="space-y-3">
                  {[
                    'Keynote addresses from leading enterprise leaders and development economists',
                    'Live pitch sessions and exhibition of graduate artisan creations',
                    'Dedicated networking breakouts for institutional and donor partnerships',
                    'Interactive masterclasses on scaling small businesses',
                  ].map((highlight, idx) => (
                    <li key={idx} className="text-text-secondary flex items-start gap-3 text-sm">
                      <CheckCircle2 className="text-brand-orange mt-0.5 h-5 w-5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href="/events"
                  className="text-brand-orange hover:text-brand-orange-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all events
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface-secondary border-border-light space-y-6 rounded-2xl border p-6">
                <h3 className="font-display text-text-primary text-lg font-bold">
                  Event Logistics
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="text-text-secondary flex items-center gap-3">
                    <Calendar className="text-brand-orange h-4 w-4 shrink-0" />
                    <span>Date: Announced in Schedule</span>
                  </div>
                  <div className="text-text-secondary flex items-center gap-3">
                    <Clock className="text-brand-orange h-4 w-4 shrink-0" />
                    <span>Time: 09:00 AM – 05:00 PM WAT</span>
                  </div>
                  <div className="text-text-secondary flex items-center gap-3">
                    <MapPin className="text-brand-orange h-4 w-4 shrink-0" />
                    <span>Venue: Benin City Campus / Hybrid</span>
                  </div>
                  <div className="text-text-secondary flex items-center gap-3">
                    <Users className="text-brand-orange h-4 w-4 shrink-0" />
                    <span>Capacity: Limited Seating</span>
                  </div>
                </div>

                <div className="border-border-light border-t pt-4">
                  <Link
                    href="/contact"
                    className="bg-brand-orange hover:bg-brand-orange-dark block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors"
                  >
                    Inquire / Register Interest
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
