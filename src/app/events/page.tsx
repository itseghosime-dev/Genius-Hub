import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events & Workshops | Genius Hub',
  description:
    'Upcoming exhibitions, masterclasses, graduation summits, and community development forums organized by Genius Hub.',
};

const events = [
  {
    title: 'West Africa Youth TVET & Creative Innovation Summit 2026',
    slug: 'west-africa-youth-tvet-creative-summit-2026',
    category: 'Summit',
    date: 'October 14–16, 2026',
    time: '09:00 AM – 05:00 PM WAT',
    location: 'Benin City Innovation Campus & Virtual',
    summary:
      'A 3-day multi-stakeholder gathering uniting development organizations, TVET practitioners, creative enterprises, and government leaders.',
  },
  {
    title: 'Genius Artisans & Fashion Runway Exhibition: Edo Heritage',
    slug: 'genius-artisans-fashion-runway-exhibition',
    category: 'Exhibition',
    date: 'November 05, 2026',
    time: '04:00 PM – 09:00 PM WAT',
    location: 'Victoria Island Creative Studio, Lagos',
    summary:
      'Spotlighting contemporary fashion collections, beadwork, and leathercraft produced by graduates of the Genius Hub Garment Incubation Cohort.',
  },
  {
    title: 'Digital Freelancing & Remote Work Masterclass for Women',
    slug: 'digital-freelancing-remote-work-masterclass',
    category: 'Workshop',
    date: 'December 02, 2026',
    time: '10:00 AM – 02:00 PM WAT',
    location: 'Virtual (Live Interactive Stream)',
    summary:
      'Practical coaching on cross-border service delivery, digital portfolio curation, contract negotiation, and global payment compliance.',
  },
];

export default function EventsPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Conferences & Workshops', variant: 'brand' }}
        title="Events & Community Gatherings"
        description="Join our masterclasses, policy forums, hackathons, and creative showcases. Connect with mentors, industry leaders, and our vibrant alumni ecosystem."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'Upcoming' },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {events.map((event) => (
              <div
                key={event.slug}
                className="bg-surface-secondary border-border-light hover:border-brand-orange flex flex-col justify-between gap-8 rounded-2xl border p-8 transition-all duration-300 lg:flex-row lg:items-center"
              >
                <div className="max-w-3xl space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1 text-xs font-semibold">
                      {event.category}
                    </span>
                    <span className="text-text-tertiary flex items-center gap-1.5 text-xs font-medium">
                      <Calendar className="text-brand-orange h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="text-text-tertiary flex items-center gap-1.5 text-xs font-medium">
                      <Clock className="text-brand-orange h-3.5 w-3.5" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="font-display text-text-primary text-xl font-bold lg:text-2xl">
                    <Link
                      href={`/events/${event.slug}`}
                      className="hover:text-brand-orange transition-colors"
                    >
                      {event.title}
                    </Link>
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed">{event.summary}</p>

                  <div className="text-text-tertiary flex items-center gap-2 text-xs">
                    <MapPin className="text-brand-orange h-3.5 w-3.5 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <Link
                    href={`/events/${event.slug}`}
                    className="bg-brand-orange hover:bg-brand-orange-dark inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
