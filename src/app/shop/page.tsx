import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop & Social Enterprise | Genius Hub',
  description:
    'Ethically crafted fashion, artisan accessories, and cultural merchandise made by Genius Hub graduates and community cooperatives.',
};

const products = [
  {
    title: 'Handcrafted Heritage Edo Tote',
    slug: 'handcrafted-heritage-edo-tote',
    category: 'Artisan Leathercraft',
    price: '₦28,500',
    summary:
      'Handcrafted using sustainably sourced leather and traditional woven accents by graduates of the Benin City Garment & Leather Hub.',
  },
  {
    title: 'Genius Community Linen Blazer',
    slug: 'genius-community-linen-blazer',
    category: 'Apparel & Tailoring',
    price: '₦45,000',
    summary:
      'Precision-tailored breathable linen blazer created in our vocational garment production unit.',
  },
  {
    title: 'Beaded Monarch Ceremonial Cuff',
    slug: 'beaded-monarch-ceremonial-cuff',
    category: 'Cultural Accessories',
    price: '₦16,000',
    summary:
      'Intricately beaded jewelry celebrating Edo artistic heritage, supporting female artisan cooperatives.',
  },
];

export default function ShopPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Social Enterprise', variant: 'brand' }}
        title="Ethical Commerce & Artisan Marketplace"
        description="Every purchase directly funds livelihood creation, vocational scholarships, and micro-grant seed toolkits for youth and female artisans."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: 'Products' },
        ]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-orange/5 border-brand-orange/20 flex flex-col items-center gap-4 rounded-2xl border p-6 text-center sm:flex-row sm:text-left">
            <ShieldCheck className="text-brand-orange h-8 w-8 shrink-0" />
            <div className="text-text-secondary text-sm">
              <span className="text-text-primary font-bold">100% Social Reinvestment: </span>
              All proceeds after production costs are reinvested into training materials and
              equipment starter packs for underprivileged trainees.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.slug}
                className="bg-surface-secondary border-border-light hover:border-brand-orange flex flex-col rounded-2xl border p-6 transition-all duration-300"
              >
                <div className="bg-surface-primary border-border-light text-text-tertiary relative mb-6 flex aspect-square items-center justify-center overflow-hidden rounded-xl border">
                  <ShoppingBag className="text-brand-orange/30 h-12 w-12" />
                  <span className="bg-brand-orange/10 text-brand-orange absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold">
                    {product.category}
                  </span>
                </div>

                <h3 className="font-display text-text-primary mb-2 text-lg font-bold">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {product.title}
                  </Link>
                </h3>

                <p className="text-text-secondary mb-4 flex-1 text-xs leading-relaxed">
                  {product.summary}
                </p>

                <div className="border-border-light flex items-center justify-between border-t pt-4">
                  <span className="text-brand-orange text-lg font-bold">{product.price}</span>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="bg-brand-orange hover:bg-brand-orange-dark inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors"
                  >
                    View Item <ArrowRight className="h-3.5 w-3.5" />
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
