'use client';

import React from 'react';
import { Container, Section, Stack, Cluster, Grid } from '@/components/layout';
import {
  Button,
  IconButton,
  LinkButton,
  Badge,
  Tag,
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  MediaCard,
  ImageWithCaption,
  Stat,
  Avatar,
  Divider,
  Breadcrumbs,
  BrandLoader,
} from '@/components/ui';
import {
  ArrowRight,
  Download,
  Mail,
  Search,
  ExternalLink,
  ShieldCheck,
  Globe,
  Users,
  Quote,
} from 'lucide-react';

export default function DesignSystemShowcasePage() {
  return (
    <main className="min-h-screen bg-(--surface-canvas) pb-28 text-(--text-primary)">
      {/* Header Banner - Warm Sand Editorial Surface */}
      <Section surface="sand" spacing="lg" className="border-b border-(--border-default)">
        <Container width="default">
          <Stack gap="md">
            <Cluster gap="xs">
              <Badge variant="brand" dot>
                Genius Hub Digital System
              </Badge>
              <Badge variant="neutral">Internal Editorial Showcase</Badge>
              <Badge variant="warning">NoIndex / Internal</Badge>
            </Cluster>
            <h1 className="text-display-xl font-normal tracking-tight text-(--text-primary)">
              Human-Centered Design System & Editorial Primitives
            </h1>
            <p className="text-body-lg max-w-3xl leading-relaxed text-(--text-secondary)">
              Visual language, warm token architecture, documentary photography foundations, and
              accessible components representing Genius Hub as a global development organization
              originating from Nigeria.
            </p>
          </Stack>
        </Container>
      </Section>

      <Container width="default" className="pt-16">
        <Stack gap="2xl">
          {/* Section 1: Color Palette & Warm Earth Tones */}
          <section id="colors" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">01. Color Architecture</span>
              <h2 className="text-heading-xl font-normal tracking-tight">
                Warm Earth & Social Impact Palette
              </h2>
              <p className="text-body-md max-w-3xl text-(--text-secondary)">
                A unified, warm color foundation anchored by Genius Amber, natural clay, muted
                forest, and warm paper canvas tones.
              </p>
            </div>

            <Grid cols={1} colsSm={2} colsLg={4} gap="md">
              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-primary) p-6 text-white shadow-xs">
                <span className="font-mono text-[0.6875rem] tracking-wider uppercase opacity-80">
                  --brand-primary
                </span>
                <span className="font-serif text-lg font-semibold">Genius Amber Gold</span>
                <span className="text-xs opacity-90">#D97706 / Primary Accent & Warm Sun</span>
              </div>

              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-terracotta) p-6 text-white shadow-xs">
                <span className="font-mono text-[0.6875rem] tracking-wider uppercase opacity-80">
                  --brand-terracotta
                </span>
                <span className="font-serif text-lg font-semibold">Earth Terracotta</span>
                <span className="text-xs opacity-90">#C2410C / Clay & Traditional Artisanship</span>
              </div>

              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-sage) p-6 text-white shadow-xs">
                <span className="font-mono text-[0.6875rem] tracking-wider uppercase opacity-80">
                  --brand-sage
                </span>
                <span className="font-serif text-lg font-semibold">Muted Forest Sage</span>
                <span className="text-xs opacity-90">
                  #36533E / Sustainable Growth & Agriculture
                </span>
              </div>

              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--text-primary) p-6 text-(--text-inverse) shadow-xs">
                <span className="font-mono text-[0.6875rem] tracking-wider uppercase opacity-80">
                  --text-primary
                </span>
                <span className="font-serif text-lg font-semibold">Mineral Charcoal</span>
                <span className="text-xs opacity-90">#1C1917 / Warm Editorial Ink</span>
              </div>
            </Grid>

            {/* Warm Surface Variations */}
            <div className="mt-4 flex flex-col gap-3">
              <h3 className="text-heading-sm font-semibold text-(--text-primary)">
                Warm Natural Surfaces
              </h3>
              <Grid cols={1} colsMd={3} gap="md">
                <div className="rounded-(--radius-standard) border border-(--border-default) bg-(--surface-primary) p-6">
                  <span className="text-label mb-2 block">Surface: Pure Paper</span>
                  <h4 className="mb-1 font-serif text-base font-semibold">Crisp Document Area</h4>
                  <p className="text-body-sm text-(--text-secondary)">
                    Cards, form fields, and elevated content blocks.
                  </p>
                </div>

                <div className="rounded-(--radius-standard) border border-(--border-default) bg-(--surface-sand) p-6">
                  <span className="text-label mb-2 block">Surface: Warm Sand</span>
                  <h4 className="mb-1 font-serif text-base font-semibold">
                    Editorial Pullout Canvas
                  </h4>
                  <p className="text-body-sm text-(--text-secondary)">
                    Milestone callouts, statistics, and narrative highlights.
                  </p>
                </div>

                <div className="rounded-(--radius-standard) border border-(--border-default) bg-(--surface-cream) p-6">
                  <span className="text-label mb-2 block">Surface: Soft Cream</span>
                  <h4 className="mb-1 font-serif text-base font-semibold">Subtle Section Canvas</h4>
                  <p className="text-body-sm text-(--text-secondary)">
                    Article categories and supporting community profiles.
                  </p>
                </div>
              </Grid>
            </div>
          </section>

          <Divider />

          {/* Section 2: Editorial Typography */}
          <section id="typography" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">02. Typography</span>
              <h2 className="text-heading-xl font-normal tracking-tight">
                Editorial Serif & Humanist Sans Hierarchy
              </h2>
              <p className="text-body-md max-w-3xl text-(--text-secondary)">
                Warm editorial headlines paired with clean, accessible body typography optimized for
                storytelling across English, French, and German.
              </p>
            </div>

            <div className="flex flex-col gap-8 rounded-(--radius-standard) border border-(--border-default) bg-(--surface-cream) p-8">
              <div className="flex flex-col gap-1 border-b border-(--border-default) pb-6">
                <span className="font-mono text-[0.6875rem] text-(--text-muted)">
                  .text-display-xl (Editorial Serif)
                </span>
                <p className="text-display-xl font-normal text-(--text-primary)">
                  Dignified Pathways to Self-Reliance
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-(--border-default) pb-6">
                <span className="font-mono text-[0.6875rem] text-(--text-muted)">
                  .text-display-lg (Editorial Serif)
                </span>
                <p className="text-display-lg font-normal text-(--text-primary)">
                  Empowering 12,000+ Entrepreneurs Across Nigeria
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-(--border-default) pb-6">
                <span className="font-mono text-[0.6875rem] text-(--text-muted)">
                  .text-heading-xl (Editorial Serif)
                </span>
                <p className="text-heading-xl font-normal text-(--text-primary)">
                  Vocational Excellence, Solar Power & Technology Incubation
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-(--border-default) pb-6">
                <span className="font-mono text-[0.6875rem] text-(--text-muted)">
                  .text-body-lg (Humanist Sans)
                </span>
                <p className="text-body-lg leading-relaxed text-(--text-secondary)">
                  Genius Hub works at the intersection of human dignity, practical vocational
                  mastery, and modern technology education. Founded in Edo State, our programmes
                  equip young women, men, and returnee migrants with tangible livelihoods.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.6875rem] text-(--text-muted)">
                  .text-label / .text-caption
                </span>
                <Cluster gap="lg">
                  <span className="text-label">Report — Benin City Training Cohort</span>
                  <span className="text-caption">
                    Photography by Genius Hub Media Team • September 2026
                  </span>
                </Cluster>
              </div>
            </div>
          </section>

          <Divider />

          {/* Section 3: Impact Statistics */}
          <section id="stats" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">03. Impact & Outcomes</span>
              <h2 className="text-heading-xl font-normal tracking-tight">
                Quantitative Milestones
              </h2>
              <p className="text-body-md max-w-3xl text-(--text-secondary)">
                Restrained, factual metrics presented in an editorial format rather than a SaaS KPI
                dashboard.
              </p>
            </div>

            <div className="rounded-(--radius-standard) border border-(--border-default) bg-(--surface-sand) p-8 sm:p-10">
              <Grid cols={1} colsSm={2} colsLg={4} gap="xl">
                <Stat
                  value="12,000"
                  suffix="+"
                  label="MSMEs Empowered"
                  description="Grassroots enterprises founded and scaled across Edo, Lagos, and nationwide hubs."
                />
                <Stat
                  value="85"
                  suffix="%"
                  label="Livelihood Placement"
                  description="Graduates operating registered businesses or placed in skilled employment."
                />
                <Stat
                  value="45"
                  suffix="+"
                  label="Training Hubs"
                  description="Community centers, fashion studios, and solar testing workshops."
                />
                <Stat
                  prefix="₦"
                  value="250M"
                  suffix="+"
                  label="Seed Capital Facilitated"
                  description="Direct micro-grants and equipment disbursements to beneficiaries."
                />
              </Grid>
            </div>
          </section>

          <Divider />

          {/* Section 4: Photography & Storytelling Layouts */}
          <section id="photography" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">04. Photography Foundation</span>
              <h2 className="text-heading-xl font-normal tracking-tight">
                Documentary Storytelling & Aspect Ratios
              </h2>
              <p className="text-body-md max-w-3xl text-(--text-secondary)">
                Real human stories carry the color and vitality of the brand against calm neutral
                surfaces.
              </p>
            </div>

            {/* Asymmetric Story Layout: Portrait + Quote */}
            <div className="rounded-(--radius-standard) border border-(--border-default) bg-(--surface-cream) p-8 sm:p-12">
              <Grid cols={1} colsMd={12} gap="xl" className="items-center">
                <div className="md:col-span-5">
                  <ImageWithCaption
                    aspectRatio="4:5"
                    caption="Vocational apprentice at the Benin City Garment Atelier."
                    credit="Genius Hub Documentary Archive"
                    media={
                      <div className="flex h-full w-full items-center justify-center bg-stone-300 font-serif text-sm text-stone-700 italic">
                        [4:5 Documentary Portrait]
                      </div>
                    }
                  />
                </div>
                <div className="flex flex-col gap-6 md:col-span-7">
                  <Quote className="h-8 w-8 text-(--brand-primary) opacity-70" />
                  <blockquote className="font-serif text-2xl leading-snug text-(--text-primary) sm:text-3xl">
                    “When you equip a woman with a practical craft and commercial confidence, you
                    transform not only her household, but the economic heartbeat of her entire
                    community.”
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <Avatar name="Isimeme Whyte" role="Founder & CEO" size="md" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-(--text-primary)">
                        Isimeme Whyte
                      </span>
                      <span className="text-xs text-(--text-secondary)">
                        Founder & Social Impact Lead, Genius Hub
                      </span>
                    </div>
                  </div>
                </div>
              </Grid>
            </div>

            {/* Editorial Story Cards */}
            <div className="mt-4 flex flex-col gap-4">
              <h3 className="text-heading-sm font-semibold text-(--text-primary)">
                Editorial Programme & Article Cards
              </h3>
              <Grid cols={1} colsMd={3} gap="lg">
                <MediaCard
                  editorial
                  aspectRatio="16:9"
                  badge={<Badge variant="brand">Solar & Energy</Badge>}
                  media={
                    <div className="flex h-full w-full items-center justify-center bg-amber-900/10 font-serif text-xs text-stone-600">
                      [16:9 Solar Installation Training]
                    </div>
                  }
                >
                  <span className="text-[0.6875rem] font-semibold tracking-wider text-(--brand-primary) uppercase">
                    Technical Programme
                  </span>
                  <h4 className="cursor-pointer font-serif text-xl leading-snug font-semibold text-(--text-primary) transition-colors hover:text-(--brand-primary)">
                    Renewable Solar Installation & Microgrid Engineering
                  </h4>
                  <p className="text-body-sm line-clamp-2 text-(--text-secondary)">
                    A comprehensive 16-week practical cohort for youth across rural and urban Edo
                    State.
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-(--brand-primary)">
                    <span>Explore Curriculum</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </MediaCard>

                <MediaCard
                  editorial
                  aspectRatio="16:9"
                  badge={<Badge variant="neutral">Creative Arts</Badge>}
                  media={
                    <div className="flex h-full w-full items-center justify-center bg-stone-300 font-serif text-xs text-stone-600">
                      [16:9 Fashion Design Studio]
                    </div>
                  }
                >
                  <span className="text-[0.6875rem] font-semibold tracking-wider text-(--text-muted) uppercase">
                    Enterprise Incubation
                  </span>
                  <h4 className="cursor-pointer font-serif text-xl leading-snug font-semibold text-(--text-primary) transition-colors hover:text-(--brand-primary)">
                    Apparel Manufacturing & Sustainable Fashion Export
                  </h4>
                  <p className="text-body-sm line-clamp-2 text-(--text-secondary)">
                    Bridging traditional African craftsmanship with commercial pattern drafting and
                    export readiness.
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-(--brand-primary)">
                    <span>Read Overview</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </MediaCard>

                <MediaCard
                  editorial
                  aspectRatio="16:9"
                  badge={<Badge variant="success">Beneficiary Story</Badge>}
                  media={
                    <div className="flex h-full w-full items-center justify-center bg-emerald-900/10 font-serif text-xs text-stone-600">
                      [16:9 Beneficiary Story]
                    </div>
                  }
                >
                  <span className="text-[0.6875rem] font-semibold tracking-wider text-(--state-success) uppercase">
                    Impact Narrative
                  </span>
                  <h4 className="cursor-pointer font-serif text-xl leading-snug font-semibold text-(--text-primary) transition-colors hover:text-(--brand-primary)">
                    From Apprentice to Employer: Osasere’s Tech Journey
                  </h4>
                  <p className="text-body-sm line-clamp-2 text-(--text-secondary)">
                    How digital skills training enabled a returnee youth to establish a digital
                    agency in Benin City.
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-(--brand-primary)">
                    <span>Read Story</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </MediaCard>
              </Grid>
            </div>
          </section>

          <Divider />

          {/* Section 5: Buttons & Forms */}
          <section id="controls" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">
                05. Actions & Accessible Forms
              </span>
              <h2 className="text-heading-xl font-normal tracking-tight">
                Warm Buttons & Accessible Controls
              </h2>
              <p className="text-body-md max-w-3xl text-(--text-secondary)">
                High-contrast keyboard focus, softened radii, and clear form feedback without heavy
                SaaS borders.
              </p>
            </div>

            <Stack gap="xl">
              {/* Button Family */}
              <div className="flex flex-col gap-3">
                <h3 className="text-heading-sm font-semibold text-(--text-primary)">
                  Button Hierarchy
                </h3>
                <Cluster gap="sm" align="center">
                  <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Apply for Programme
                  </Button>
                  <Button variant="secondary" leftIcon={<ShieldCheck className="h-4 w-4" />}>
                    Partner with Us
                  </Button>
                  <Button variant="outline">Read Publications</Button>
                  <Button variant="ghost">Contact Support</Button>
                  <IconButton
                    icon={<Mail className="h-4 w-4" />}
                    aria-label="Email organization"
                    variant="secondary"
                  />
                  <IconButton
                    icon={<Download className="h-4 w-4" />}
                    aria-label="Download annual report"
                    variant="outline"
                  />
                  <IconButton
                    icon={<Search className="h-4 w-4" />}
                    aria-label="Search initiatives"
                    variant="ghost"
                  />
                </Cluster>
              </div>

              {/* Navigation Links & Tags */}
              <div className="flex flex-col gap-3">
                <h3 className="text-heading-sm font-semibold text-(--text-primary)">
                  Links & Taxonomy Chips
                </h3>
                <Cluster gap="md" align="center">
                  <LinkButton
                    href="#typography"
                    variant="outline"
                    leftIcon={<Globe className="h-4 w-4" />}
                  >
                    Internal LinkButton
                  </LinkButton>
                  <LinkButton
                    href="https://github.com"
                    external
                    variant="secondary"
                    rightIcon={<ExternalLink className="h-4 w-4" />}
                  >
                    External LinkButton
                  </LinkButton>
                  <Tag selected>Solar Tech</Tag>
                  <Tag interactive>Youth Empowerment</Tag>
                  <Tag interactive onRemove={() => {}} removeLabel="Remove tag">
                    Edo State
                  </Tag>
                </Cluster>
              </div>

              {/* Structured Card Demonstration */}
              <div className="flex flex-col gap-3">
                <h3 className="text-heading-sm font-semibold text-(--text-primary)">
                  Structured Institutional Card
                </h3>
                <Grid cols={1} colsMd={2} gap="lg">
                  <Card variant="sand">
                    <CardHeader>
                      <CardTitle>Vocational Incubation Advisory</CardTitle>
                      <CardDescription>
                        Direct technical advisory and mentor linkages provided to enrolled student
                        artisans.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-sm text-(--text-secondary)">
                        Cohorts receive continuous business incubation support, financial literacy
                        workshops, and regulatory compliance assistance.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <span className="text-xs text-(--text-muted)">Benin City Hub</span>
                      <Button size="sm" variant="primary">
                        Access Support
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card variant="cream">
                    <CardHeader>
                      <CardTitle>Institutional Partnerships</CardTitle>
                      <CardDescription>
                        Collaborative frameworks with international development agencies and
                        government bodies.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-sm text-(--text-secondary)">
                        Genius Hub works closely with donor partners to ensure transparent
                        governance, verified impact tracking, and scalable outcomes.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <span className="text-xs text-(--text-muted)">Global Desk</span>
                      <Button size="sm" variant="secondary">
                        Partner With Us
                      </Button>
                    </CardFooter>
                  </Card>
                </Grid>
              </div>

              {/* Form Foundation */}
              <div className="rounded-(--radius-standard) border border-(--border-default) bg-(--surface-cream) p-8 sm:p-10">
                <Grid cols={1} colsMd={2} gap="lg">
                  <FormField
                    label="Applicant Full Name"
                    htmlFor="form-demo-name"
                    required
                    description="Official legal name for certification and grant records."
                  >
                    <Input
                      id="form-demo-name"
                      placeholder="e.g. Isimeme Whyte"
                      leftAddon={<Users className="h-4 w-4" />}
                    />
                  </FormField>

                  <FormField
                    label="Contact Email"
                    htmlFor="form-demo-email"
                    required
                    error="Please enter a valid personal or institutional email."
                  >
                    <Input
                      id="form-demo-email"
                      type="email"
                      hasError
                      defaultValue="invalid-email@"
                      leftAddon={<Mail className="h-4 w-4" />}
                    />
                  </FormField>

                  <FormField
                    label="Training Track"
                    htmlFor="form-demo-track"
                    description="Choose your primary vocational or technical discipline."
                  >
                    <Select
                      id="form-demo-track"
                      placeholder="Select training pathway..."
                      options={[
                        { value: 'solar', label: 'Solar & Renewable Energy Engineering' },
                        { value: 'software', label: 'Software Engineering & Digital Skills' },
                        { value: 'fashion', label: 'Apparel Manufacturing & Fashion Production' },
                        { value: 'agric', label: 'Modern Sustainable Agriculture' },
                      ]}
                    />
                  </FormField>

                  <FormField
                    label="State / Hub Location"
                    htmlFor="form-demo-loc"
                    optional
                    description="Preferred physical center."
                  >
                    <Select
                      id="form-demo-loc"
                      placeholder="Select center location..."
                      options={[
                        { value: 'benin-hq', label: 'Benin City Headquarters (Edo State)' },
                        { value: 'lagos-hub', label: 'Lagos Innovation Studio' },
                        { value: 'virtual', label: 'Online / Hybrid Learning' },
                      ]}
                    />
                  </FormField>

                  <div className="md:col-span-2">
                    <FormField
                      label="Community Impact Statement"
                      htmlFor="form-demo-statement"
                      required
                      description="Explain how this training will enable you to create livelihoods in your locality."
                    >
                      <Textarea
                        id="form-demo-statement"
                        placeholder="Write your statement here..."
                        rows={3}
                      />
                    </FormField>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">Registration Agreement</h4>
                    <Checkbox
                      id="cb-code-conduct"
                      label="I agree to commit to the full cohort duration and community code of conduct"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold">Learning Mode</h4>
                    <Cluster gap="md">
                      <Radio
                        name="delivery-mode"
                        id="radio-onsite"
                        label="On-Site Hub"
                        defaultChecked
                      />
                      <Radio name="delivery-mode" id="radio-hybrid" label="Hybrid Track" />
                    </Cluster>
                  </div>
                </Grid>
              </div>
            </Stack>
          </section>

          <Divider />

          {/* Section 6: Breadcrumbs & Brand Loading Mark */}
          <section id="loader" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">
                06. Navigation & Brand Loading Mark
              </span>
              <h2 className="text-heading-xl font-normal tracking-tight">
                Breadcrumbs & Community Gathering Mark
              </h2>
              <p className="text-body-md max-w-3xl text-(--text-secondary)">
                A calm, respectful SVG loading mark and semantic breadcrumb navigation trail.
              </p>
            </div>

            <Grid cols={1} colsMd={2} gap="lg">
              <div className="flex flex-col gap-4 rounded-(--radius-standard) border border-(--border-default) bg-(--surface-primary) p-8">
                <h3 className="text-heading-sm font-semibold text-(--text-primary)">
                  Semantic Breadcrumb Navigation
                </h3>
                <Breadcrumbs
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Programmes', href: '/programmes' },
                    { label: 'Solar & Renewable Energy', current: true },
                  ]}
                />
                <Breadcrumbs
                  items={[
                    { label: 'Genius Hub', href: '/' },
                    { label: 'Impact Stories', href: '/stories' },
                    { label: 'Youth Entrepreneurs', current: true },
                  ]}
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-6 rounded-(--radius-standard) border border-(--border-default) bg-(--surface-sand) p-8">
                <h3 className="text-heading-sm self-start font-semibold text-(--text-primary)">
                  Brand Loading Mark
                </h3>
                <Cluster gap="2xl" align="center" justify="center">
                  <BrandLoader size="sm" />
                  <BrandLoader size="md" showLabel label="Loading Genius Hub..." />
                  <BrandLoader size="lg" />
                </Cluster>
              </div>
            </Grid>
          </section>
        </Stack>
      </Container>
    </main>
  );
}
