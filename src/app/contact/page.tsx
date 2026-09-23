import type { Metadata } from 'next';
import { PublicLayout, PageHeader } from '@/components/layout';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Genius Hub',
  description:
    'Get in touch with Genius Hub. Inquire about training admissions, partnerships, media requests, or visit our campuses in Benin City and Lagos.',
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <PageHeader
        badge={{ text: 'Get In Touch', variant: 'brand' }}
        title="Contact Genius Hub"
        description="Whether you have inquiries regarding programme admissions, corporate partnerships, press, or wish to schedule a hub visit, our team is ready to assist."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-surface-primary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-text-primary mb-3 text-2xl font-bold">
                  Direct Inquiries
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Reach out to the appropriate department for faster support.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange/10 text-brand-orange flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-text-tertiary text-xs font-semibold tracking-wider uppercase">
                      General & Admissions
                    </div>
                    <a
                      href="mailto:info@geniushub.org"
                      className="text-text-primary hover:text-brand-orange text-sm font-semibold transition-colors"
                    >
                      info@geniushub.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange/10 text-brand-orange flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-text-tertiary text-xs font-semibold tracking-wider uppercase">
                      Phone / Support Line
                    </div>
                    <div className="text-text-primary text-sm font-semibold">
                      +234 (0) 800 GENIUS HUB
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange/10 text-brand-orange flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-text-tertiary text-xs font-semibold tracking-wider uppercase">
                      Headquarters
                    </div>
                    <div className="text-text-primary text-sm font-semibold">
                      Benin City Innovation Campus, Edo State, Nigeria
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange/10 text-brand-orange flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-text-tertiary text-xs font-semibold tracking-wider uppercase">
                      Operating Hours
                    </div>
                    <div className="text-text-secondary text-sm">
                      Monday – Friday: 8:00 AM – 5:00 PM WAT
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-surface-secondary border-border-light space-y-6 rounded-3xl border p-8 md:p-10">
                <div>
                  <h3 className="font-display text-text-primary mb-1 text-xl font-bold">
                    Send Us a Message
                  </h3>
                  <p className="text-text-secondary text-xs">
                    Fill out the form below and a representative will respond within 1–2 business
                    days.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="fullName"
                        className="text-text-secondary block text-xs font-medium"
                      >
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        className="bg-surface-primary border-border-light text-text-primary focus:border-brand-orange focus:ring-brand-orange w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-1 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="email"
                        className="text-text-secondary block text-xs font-medium"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="e.g. jane@example.com"
                        className="bg-surface-primary border-border-light text-text-primary focus:border-brand-orange focus:ring-brand-orange w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-1 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="inquiryType"
                      className="text-text-secondary block text-xs font-medium"
                    >
                      Inquiry Department
                    </label>
                    <select
                      id="inquiryType"
                      className="bg-surface-primary border-border-light text-text-primary focus:border-brand-orange focus:ring-brand-orange w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-1 focus:outline-none"
                    >
                      <option>Programme Admissions & Enrollment</option>
                      <option>Strategic Partnerships & Grants</option>
                      <option>Media & Press Relations</option>
                      <option>Enterprise Services & Bulk Orders</option>
                      <option>General Support</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="message"
                      className="text-text-secondary block text-xs font-medium"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="How can we assist you?"
                      className="bg-surface-primary border-border-light text-text-primary focus:border-brand-orange focus:ring-brand-orange w-full resize-none rounded-lg border px-4 py-2.5 text-sm focus:ring-1 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-brand-orange hover:bg-brand-orange-dark inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    Submit Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
