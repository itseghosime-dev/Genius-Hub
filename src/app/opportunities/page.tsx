import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { Briefcase, GraduationCap, Users, HeartHandshake, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Opportunities & Careers | Genius Hub',
  description:
    'Explore open career roles, fellowships, trainer positions, volunteer opportunities, and enterprise funding calls at Genius Hub.',
};

const pathways = [
  {
    icon: GraduationCap,
    title: 'Vocational & Digital Traineeships',
    type: 'Cohort Admission',
    desc: 'Join fully funded or subsidized intensive training cohorts in garment production, tech skills, catering, and agro-enterprise.',
    ctaText: 'Apply as Trainee',
    href: '/apply',
  },
  {
    icon: Briefcase,
    title: 'Careers & Staff Openings',
    type: 'Employment',
    desc: 'Join our multidisciplinary team of project managers, monitoring specialists, educators, and creative directors.',
    ctaText: 'View Open Roles',
    href: '/contact',
  },
  {
    icon: Users,
    title: 'Master Trainers & Instructors',
    type: 'Contract / Fellowship',
    desc: 'We regularly contract certified vocational artisans, software engineers, and business mentors to facilitate cohorts.',
    ctaText: 'Join Trainer Roster',
    href: '/contact',
  },
  {
    icon: HeartHandshake,
    title: 'Volunteer & Community Ambassadors',
    type: 'Civic Engagement',
    desc: 'Support community mobilization, youth outreach events, and field logistics across Edo, Lagos, and surrounding states.',
    ctaText: 'Become a Volunteer',
    href: '/contact',
  },
];

export default function OpportunitiesPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Join Our Ecosystem', variant: 'brand' }}
        title="Opportunities, Careers & Fellowships"
        description="Whether you are seeking transformative skills, looking to teach, or wanting to contribute your professional talents to our mission, find your path here."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Opportunities' }]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {pathways.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface-secondary border-border-light hover:border-brand-orange flex flex-col justify-between rounded-2xl border p-8 transition-all duration-300"
                >
                  <div className="mb-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="bg-brand-orange/10 text-brand-orange flex h-12 w-12 items-center justify-center rounded-xl">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="bg-surface-primary border-border-light text-text-secondary rounded-full border px-3 py-1 text-xs font-semibold">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="font-display text-text-primary text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  <div>
                    <Link
                      href={item.href}
                      className="bg-brand-orange hover:bg-brand-orange-dark inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
                    >
                      {item.ctaText} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
