import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Success Stories | Genius Hub',
  description:
    'Real stories of change, economic empowerment, and innovation from Genius Hub beneficiaries and partner communities.',
};

const stories = [
  {
    title: "From Trainee to Fashion Atelier Founder: Aisha's Story",
    slug: 'from-trainee-to-fashion-atelier-founder-aisha',
    category: 'Vocational & Creative',
    summary:
      'How Aisha leveraged Genius Hub garment design and enterprise mentorship to build an atelier employing 8 youth in Benin City.',
    beneficiary: 'Aisha Mohammed',
    role: 'Founder, House of Zari',
  },
  {
    title: "Bridging the Digital Divide in Agritech: Chinedu's Journey",
    slug: 'bridging-digital-divide-agritech-chinedu',
    category: 'Digital Skills & Tech',
    summary:
      'Chinedu turned mobile software engineering training into a localized platform helping 200+ smallholder farmers track market prices.',
    beneficiary: 'Chinedu Okafor',
    role: 'Software Developer & Agritech Entrepreneur',
  },
  {
    title: "Restoring Dignity Through Safe Livelihoods: Blessing's Transformation",
    slug: 'restoring-dignity-safe-livelihoods-blessing',
    category: 'Economic Reintegration',
    summary:
      'After returning to Edo State, Blessing found community, vocational mastery, and financial security through our business incubation support.',
    beneficiary: 'Blessing Igbinoba',
    role: 'Catering & Event Services Lead',
  },
];

export default function SuccessStoriesPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Human Voices', variant: 'brand' }}
        title="Stories of Resilience and Transformation"
        description="Behind every metric is an individual with ambition, dignity, and potential. Explore how our alumni and community members are building thriving enterprises and mentoring the next generation."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Impact', href: '/impact' },
          { label: 'Success Stories' },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stories.map((story) => (
              <div
                key={story.slug}
                className="bg-surface-secondary border-border-light hover:border-brand-orange flex flex-col rounded-2xl border p-8 transition-all duration-300"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1 text-xs font-semibold">
                    {story.category}
                  </span>
                </div>
                <h3 className="font-display text-text-primary mb-3 text-xl font-bold">
                  <Link
                    href={`/impact/success-stories/${story.slug}`}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {story.title}
                  </Link>
                </h3>
                <p className="text-text-secondary mb-6 flex-1 text-sm leading-relaxed">
                  {story.summary}
                </p>
                <div className="border-border-light flex items-center justify-between border-t pt-4">
                  <div>
                    <div className="text-text-primary text-sm font-bold">{story.beneficiary}</div>
                    <div className="text-text-tertiary text-xs">{story.role}</div>
                  </div>
                  <Link
                    href={`/impact/success-stories/${story.slug}`}
                    className="bg-surface-primary border-border-light text-brand-orange hover:bg-brand-orange flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:text-white"
                    aria-label={`Read ${story.beneficiary}'s story`}
                  >
                    <ArrowRight className="h-4 w-4" />
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
