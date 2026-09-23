import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';

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
    title: `${formattedTitle} | Stories | Genius Hub`,
    description: `Read the full analysis and field report on ${formattedTitle}.`,
  };
}

export default async function StoryArticleDetailPage({ params }: StorySlugPageProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Editorial Feature', variant: 'brand' }}
        title={formattedTitle}
        description="In-depth analysis of community economic mobility, TVET modernization, and sustainable social enterprise development."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Stories', href: '/stories' },
          { label: formattedTitle },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="border-border-light text-text-secondary flex flex-wrap items-center justify-between gap-4 border-b pb-6 text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <User className="text-brand-orange h-4 w-4" />
                By Editorial Contributor
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="text-brand-orange h-4 w-4" />
                March 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="text-brand-orange h-4 w-4" />5 min read
              </span>
            </div>
          </div>

          <div className="prose prose-lg text-text-secondary max-w-none space-y-6 leading-relaxed">
            <p className="text-text-primary text-lg font-medium">
              Economic self-reliance begins with responsive skill systems designed for local
              realities while connected to global market standards.
            </p>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              Context and Background
            </h2>
            <p>
              In communities across Nigeria, the gap between conventional educational certification
              and market-demanded enterprise skills continues to challenge youth transitions into
              decent work. Through targeted vocational tracks, Genius Hub addresses this bottleneck
              directly.
            </p>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              The Pedagogical Model
            </h2>
            <p>
              By fusing rigorous practical fabrication, modern quality control, and essential
              digital business operations, trainees graduate not just as craftspersons, but as
              enterprise operators capable of sustaining teams.
            </p>

            <h2 className="font-display text-text-primary text-2xl font-bold">Looking Ahead</h2>
            <p>
              As our alumni networks expand, collaborative clusters are forming across regional
              value chains, proving that sustained investment in localized human capital drives
              long-term community resilience.
            </p>
          </div>

          <div className="border-border-light flex items-center justify-between border-t pt-8">
            <Link
              href="/stories"
              className="text-brand-orange hover:text-brand-orange-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-text-tertiary text-xs">Share article:</span>
              <button
                type="button"
                className="bg-surface-secondary border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange rounded-lg border p-2 transition-colors"
                aria-label="Share article"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
