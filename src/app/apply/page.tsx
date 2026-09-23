import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { GraduationCap, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apply for Training | Genius Hub',
  description:
    'Apply for upcoming vocational, digital skills, and business incubation cohorts at Genius Hub.',
};

export default function ApplyPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Admissions & Enrollment', variant: 'brand' }}
        title="Apply for Genius Hub Training Programmes"
        description="Take the first step toward acquiring industry-standard vocational mastery, digital expertise, and building a sustainable livelihood."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Opportunities', href: '/opportunities' },
          { label: 'Apply' },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Choose Track',
                desc: 'Select between Vocational Crafts, Creative Design, or Digital Tech Skills.',
              },
              {
                step: '02',
                title: 'Submit Profile',
                desc: 'Complete the applicant assessment form with your background and goals.',
              },
              {
                step: '03',
                title: 'Interview & Onboarding',
                desc: 'Attend candidate screening and orientation at your selected hub campus.',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-surface-secondary border-border-light space-y-3 rounded-2xl border p-6"
              >
                <div className="font-display text-brand-orange text-2xl font-extrabold">
                  {s.step}
                </div>
                <h3 className="font-display text-text-primary text-base font-bold">{s.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-secondary border-border-light space-y-8 rounded-3xl border p-8">
            <div className="space-y-2">
              <h2 className="font-display text-text-primary text-2xl font-bold">
                Application Portal Status
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                Applications for the upcoming 2026 Q3/Q4 cohorts are opening soon. You can register
                your interest below or contact our admissions desk.
              </p>
            </div>

            <div className="bg-brand-orange/5 border-brand-orange/20 space-y-4 rounded-2xl border p-6">
              <h3 className="text-text-primary flex items-center gap-2 text-base font-bold">
                <GraduationCap className="text-brand-orange h-5 w-5" />
                Current Cohort Tracks
              </h3>
              <ul className="text-text-secondary grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                {[
                  'Industrial Garment Making & Pattern Drafting',
                  'Footwear & Leather Goods Craftsmanship',
                  'Culinary Arts & Commercial Catering',
                  'Full-Stack Web & Mobile App Development',
                  'Digital Marketing & E-Commerce Operations',
                  'Agro-Processing & Sustainable Farming',
                ].map((track, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="text-brand-orange h-4 w-4 shrink-0" />
                    <span>{track}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-border-light flex flex-col items-center justify-between gap-4 border-t pt-4 sm:flex-row">
              <div className="text-text-tertiary text-xs">
                Have questions before applying? Contact our admissions officer.
              </div>
              <Link
                href="/contact"
                className="bg-brand-orange hover:bg-brand-orange-dark w-full rounded-lg px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors sm:w-auto"
              >
                Inquire With Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
