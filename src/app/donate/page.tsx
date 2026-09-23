import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout, PageHeader } from '@/components/layout';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support Our Mission / Donate | Genius Hub',
  description:
    'Support youth skills training, female artisan starter toolkits, and community vocational scholarships with Genius Hub.',
};

export default function DonatePage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Direct Impact', variant: 'brand' }}
        title="Support Vocational Empowerment & Economic Dignity"
        description="Your support funds practical training scholarships, enterprise seed toolkits, and safe learning spaces for youth and women across Nigeria."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Donate / Support' }]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                amount: '₦50,000 / $35',
                title: 'Trainee Toolkit',
                desc: 'Provides an artisanal or digital starter toolkit (sewing notions, software licenses, drafting tools) for a graduating trainee.',
              },
              {
                amount: '₦150,000 / $100',
                title: 'Vocational Scholarship',
                desc: 'Funds a 3-month comprehensive vocational track for a vulnerable youth or female head-of-household.',
              },
              {
                amount: '₦500,000 / $350',
                title: 'Enterprise Seed Grant',
                desc: 'Equips a high-performing graduate cooperative with commercial machinery and 6 months of dedicated incubation.',
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className="bg-surface-secondary border-border-light flex flex-col justify-between space-y-3 rounded-2xl border p-6"
              >
                <div>
                  <div className="font-display text-brand-orange mb-1 text-xl font-bold">
                    {tier.amount}
                  </div>
                  <h3 className="text-text-primary mb-2 text-base font-bold">{tier.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{tier.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-secondary border-border-light space-y-6 rounded-3xl border p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-brand-orange h-6 w-6 shrink-0" />
              <h2 className="font-display text-text-primary text-xl font-bold">
                Fiduciary Responsibility & Audit
              </h2>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Genius Hub adheres to international financial governance benchmarks. All donations and
              institutional grants are audited annually by independent chartered accounting firms
              and accounted for in our published annual reports.
            </p>

            <div className="bg-surface-primary border-border-light text-text-tertiary rounded-xl border p-4 text-xs">
              Online credit card and direct payment gateway processing is being integrated for the
              upcoming release. For institutional gifts, foundation grants, or wire contributions,
              please reach out directly to our finance office.
            </div>

            <div className="border-border-light flex justify-end border-t pt-4">
              <Link
                href="/contact"
                className="bg-brand-orange hover:bg-brand-orange-dark inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
              >
                Contact Finance & Grants Office <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
