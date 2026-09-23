import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { ArrowLeft, ShoppingBag, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ShopSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ShopSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Social Enterprise Shop | Genius Hub`,
    description: `Purchase ${formattedTitle} ethically crafted by Genius Hub vocational artisans.`,
  };
}

export default async function ProductDetailPage({ params }: ShopSlugPageProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Artisan Product', variant: 'brand' }}
        title={formattedTitle}
        description="Crafted with ethical materials and cultural authenticity by graduates of Genius Hub enterprise incubators."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: formattedTitle },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="bg-surface-secondary border-border-light text-text-tertiary flex aspect-square items-center justify-center rounded-3xl border">
              <ShoppingBag className="text-brand-orange/20 h-24 w-24" />
            </div>

            <div className="space-y-6">
              <div>
                <span className="bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1 text-xs font-semibold">
                  Made in Edo State, Nigeria
                </span>
                <h2 className="font-display text-text-primary mt-3 text-3xl font-bold">
                  {formattedTitle}
                </h2>
                <div className="text-brand-orange mt-2 text-2xl font-bold">₦28,500 – ₦45,000</div>
              </div>

              <div className="bg-surface-secondary border-border-light text-text-secondary flex items-center gap-3 rounded-xl border p-4 text-xs">
                <ShieldCheck className="text-brand-orange h-5 w-5 shrink-0" />
                <span>
                  Ethical Craft Guarantee: 100% created by verified alumni of Genius Hub vocational
                  incubation units.
                </span>
              </div>

              <div className="text-text-secondary space-y-4 text-sm leading-relaxed">
                <p>
                  Each piece is individually produced by skilled artisans trained through our
                  intensive vocational cohorts. By purchasing this item, you directly support
                  fair-wage employment and sustainable enterprise expansion in local communities.
                </p>
                <ul className="space-y-2">
                  {[
                    'Ethically sourced local materials',
                    'Durable craftsmanship & tailored finishing',
                    'Direct economic return to female and youth makers',
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="text-brand-orange h-4 w-4 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-border-light space-y-4 border-t pt-6">
                <div className="bg-surface-secondary border-border-light rounded-xl border p-4 text-center">
                  <p className="text-text-tertiary mb-2 text-xs">
                    E-commerce checkout is currently in development.
                  </p>
                  <Link
                    href="/contact"
                    className="bg-brand-orange hover:bg-brand-orange-dark inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
                  >
                    Inquire for Custom Order / Bulk Purchase
                  </Link>
                </div>

                <Link
                  href="/shop"
                  className="text-brand-orange hover:text-brand-orange-dark inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
