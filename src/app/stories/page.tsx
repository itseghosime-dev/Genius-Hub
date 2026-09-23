import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stories & News | Genius Hub',
  description:
    'Insights, news, analysis, and updates from the forefront of vocational education, youth enterprise, and creative development.',
};

const articles = [
  {
    title: 'How Vocational Innovation is Redefining Youth Employment in Edo State',
    slug: 'vocational-innovation-redefining-youth-employment-edo',
    category: 'Policy & TVET',
    author: 'Editorial Team',
    date: 'March 18, 2026',
    readTime: '5 min read',
    summary:
      'A deep dive into how modern garment production, digital fabrication, and agro-processing curricula are bridging local skills gaps.',
  },
  {
    title: 'Empowering 5,000 Female Entrepreneurs: Lessons from the Field',
    slug: 'empowering-female-entrepreneurs-lessons-field',
    category: 'Impact Insights',
    author: 'Isimeme Whyte',
    date: 'February 24, 2026',
    readTime: '7 min read',
    summary:
      'Reflections on creating safe, supportive, and commercially viable incubation networks for women in marginalized communities.',
  },
  {
    title: 'The Creative Economy as a Catalyst for Sustainable Livelihoods',
    slug: 'creative-economy-catalyst-sustainable-livelihoods',
    category: 'Creative Industries',
    author: 'Creative Studio Lead',
    date: 'January 15, 2026',
    readTime: '4 min read',
    summary:
      'Why combining cultural heritage crafts with modern e-commerce bridges local artisans to global export markets.',
  },
];

export default function StoriesPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Editorial & Insights', variant: 'brand' }}
        title="Stories, News & Insights"
        description="Thought leadership, field dispatches, programmatic announcements, and expert commentary on the future of work and youth empowerment."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Stories', href: '/stories' },
          { label: 'All Articles' },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="bg-surface-secondary border-border-light hover:border-brand-orange flex flex-col rounded-2xl border p-8 transition-all duration-300"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1 text-xs font-semibold">
                    {article.category}
                  </span>
                  <span className="text-text-tertiary text-xs">{article.readTime}</span>
                </div>

                <h3 className="font-display text-text-primary mb-3 text-xl font-bold">
                  <Link
                    href={`/stories/${article.slug}`}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>

                <p className="text-text-secondary mb-6 flex-1 text-sm leading-relaxed">
                  {article.summary}
                </p>

                <div className="border-border-light text-text-tertiary flex items-center justify-between border-t pt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <User className="text-brand-orange h-3.5 w-3.5" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{article.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
