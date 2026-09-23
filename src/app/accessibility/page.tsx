import type { Metadata } from 'next';
import { PublicLayout, PageHeader } from '@/components/layout';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Genius Hub',
  description:
    'Our commitment to ensuring the Genius Hub digital platform conforms to WCAG 2.2 Level AA accessibility standards.',
};

export default function AccessibilityPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Universal Access', variant: 'brand' }}
        title="Accessibility Statement"
        description="Genius Hub is dedicated to ensuring digital inclusion and accessibility for all people, including users with visual, auditory, motor, or cognitive disabilities."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Accessibility Statement' }]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-text-secondary max-w-none space-y-8 leading-relaxed">
            <h2 className="font-display text-text-primary text-2xl font-bold">
              Our Conformance Target
            </h2>
            <p>
              We strive to adhere to the{' '}
              <strong>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</strong>. These
              guidelines define how to make web content more accessible to people with diverse
              abilities and compatible with assistive technologies such as screen readers and
              keyboard navigation devices.
            </p>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              Implemented Accessibility Measures
            </h2>
            <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                'Semantic landmark regions (`<header>`, `<nav>`, `<main>`, `<footer>`)',
                "Dedicated 'Skip to main content' skip links for keyboard operators",
                'WCAG AA color contrast ratio (minimum 4.5:1 for standard text)',
                'Full keyboard operability with visible focus rings',
                'ARIA dialog attributes and focus-trapping in modals and drawers',
                'Touch targets exceeding 44x44px for responsive mobile usability',
              ].map((measure, i) => (
                <div
                  key={i}
                  className="bg-surface-secondary border-border-light text-text-secondary flex items-start gap-3 rounded-xl border p-4 text-sm"
                >
                  <CheckCircle2 className="text-brand-orange mt-0.5 h-5 w-5 shrink-0" />
                  <span>{measure}</span>
                </div>
              ))}
            </div>

            <h2 className="font-display text-text-primary text-2xl font-bold">
              Feedback & Assistance
            </h2>
            <p>
              We welcome your feedback on the accessibility of our digital platforms. If you
              encounter any barriers or require information in an alternative format, please contact
              our digital accessibility team at <strong>accessibility@geniushub.org</strong>.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
