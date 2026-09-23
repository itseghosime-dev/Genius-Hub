import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { ArrowLeft, Quote } from 'lucide-react';

interface StorySlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StorySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Success Story | Genius Hub`,
    description: `Read how this beneficiary built sustainable economic opportunity through Genius Hub programmes.`,
  };
}

export default async function StoryDetailPage({ params }: StorySlugPageProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Beneficiary Spotlight', variant: 'brand' }}
        title={formattedTitle}
        description="A real-life journey of skill acquisition, enterprise incubation, and sustainable livelihood generation."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Impact', href: '/impact' },
          { label: 'Success Stories', href: '/impact/success-stories' },
          { label: formattedTitle },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-orange/5 border-brand-orange/20 relative rounded-3xl border p-8">
            <Quote className="text-brand-orange/30 absolute top-6 right-6 h-10 w-10" />
            <p className="text-text-primary mb-4 text-lg leading-relaxed font-medium italic">
              &ldquo;The technical training gave me the craft, but the business mentorship and
              dignity of support from Genius Hub gave me the courage to launch and employ others in
              my community.&rdquo;
            </p>
            <div className="text-brand-orange text-sm font-bold">— Featured Programme Graduate</div>
          </div>

          <div className="prose prose-lg text-text-secondary max-w-none space-y-6 leading-relaxed">
            <h2 className="font-display text-text-primary text-2xl font-bold">The Journey</h2>
            <p>
              Before connecting with Genius Hub, finding structured pathway opportunities in
              specialized vocational skills was a persistent challenge. Through our community
              outreach and cohort selection process, the participant enrolled in intensive hands-on
              training.
            </p>
            <h2 className="font-display text-text-primary text-2xl font-bold">
              The Intervention & Mentorship
            </h2>
            <p>
              Over a multi-month period, the training blended technical craftsmanship, digital
              marketing essentials, financial literacy, and cooperative business networking. Master
              artisans and industry experts provided practical supervision.
            </p>
            <h2 className="font-display text-text-primary text-2xl font-bold">
              Sustainable Outcomes
            </h2>
            <p>
              Today, the enterprise generates recurring local revenue, supports family livelihoods,
              and provides apprenticeships to new youth in the surrounding community.
            </p>
          </div>

          <div className="border-border-light flex items-center justify-between border-t pt-8">
            <Link
              href="/impact/success-stories"
              className="text-brand-orange hover:text-brand-orange-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all success stories
            </Link>

            <Link
              href="/apply"
              className="bg-brand-orange hover:bg-brand-orange-dark rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
            >
              Apply for Training
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
