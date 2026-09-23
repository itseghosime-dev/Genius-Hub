import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { ArrowLeft, Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';

interface ProjectSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Projects | Genius Hub`,
    description: `Explore details and measurable development outcomes for ${formattedTitle} at Genius Hub.`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectSlugPageProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Active Project', variant: 'brand' }}
        title={formattedTitle}
        description="Detailed field intervention, implementation milestones, donor collaboration, and community impact metrics."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'What We Do', href: '/focus-areas' },
          { label: 'Projects', href: '/projects' },
          { label: formattedTitle },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="font-display text-text-primary mb-4 text-2xl font-bold">
                  Project Overview
                </h2>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  This project represents a targeted, milestone-driven initiative executed by Genius
                  Hub in close coordination with international development partners, state
                  stakeholders, and local grassroots communities.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Through rigorous monitoring, evaluation, and learning (MEL) frameworks, we track
                  direct beneficiary enrollments, skill acquisition benchmarks, and economic
                  transition outcomes across target demographics.
                </p>
              </div>

              <div className="bg-surface-secondary border-border-light rounded-2xl border p-6">
                <h3 className="font-display text-text-primary mb-4 text-lg font-bold">
                  Key Milestones & Deliverables
                </h3>
                <ul className="space-y-3">
                  {[
                    'Baseline demographic study and community mobilization',
                    'Curriculum deployment and specialized master trainers onboarding',
                    'Practical vocational & digital skill training cohorts execution',
                    'Enterprise toolkit distribution and post-training mentorship',
                  ].map((milestone, idx) => (
                    <li key={idx} className="text-text-secondary flex items-start gap-3 text-sm">
                      <CheckCircle2 className="text-brand-orange mt-0.5 h-5 w-5 shrink-0" />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href="/projects"
                  className="text-brand-orange hover:text-brand-orange-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all projects
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface-secondary border-border-light space-y-6 rounded-2xl border p-6">
                <h3 className="font-display text-text-primary text-lg font-bold">
                  Project Metadata
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="text-text-secondary flex items-center gap-3">
                    <MapPin className="text-brand-orange h-4 w-4 shrink-0" />
                    <span>Locations: Edo State, Lagos State</span>
                  </div>
                  <div className="text-text-secondary flex items-center gap-3">
                    <Building2 className="text-brand-orange h-4 w-4 shrink-0" />
                    <span>Funding / Partner: Multilateral & Institutional Donors</span>
                  </div>
                  <div className="text-text-secondary flex items-center gap-3">
                    <Calendar className="text-brand-orange h-4 w-4 shrink-0" />
                    <span>Timeline: Multi-year Ongoing</span>
                  </div>
                </div>

                <div className="border-border-light border-t pt-4">
                  <Link
                    href="/partner"
                    className="bg-brand-orange hover:bg-brand-orange-dark block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors"
                  >
                    Partner On This Project
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
