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
  Zap,
} from 'lucide-react';

export default function DesignSystemShowcasePage() {
  return (
    <main className="min-h-screen bg-white pb-28 text-(--text-primary)">
      {/* Header Banner - Bright, Energetic, Light-First */}
      <Section surface="cloud" spacing="lg" className="border-b border-slate-200">
        <Container width="default">
          <Stack gap="md">
            <Cluster gap="xs">
              <Badge variant="brand" dot>
                Genius Hub Digital Platform
              </Badge>
              <Badge variant="blue">Human Impact + Future of Work</Badge>
              <Badge variant="neutral">Internal Showcase (NoIndex)</Badge>
            </Cluster>
            <h1 className="text-display-xl font-bold tracking-tight text-slate-900">
              Energetic, Human-Centered & Tech-Forward Design System
            </h1>
            <p className="text-body-lg max-w-3xl leading-relaxed text-slate-600">
              The digital brand system for Genius Hub — a global development organization
              originating from Nigeria. Built around real human photography, vibrant Genius Orange,
              clean cloud surfaces, and digital innovation accents.
            </p>
          </Stack>
        </Container>
      </Section>

      <Container width="default" className="pt-16">
        <Stack gap="2xl">
          {/* Section 1: Color Palette & Light-First Architecture */}
          <section id="colors" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">01. Color Architecture</span>
              <h2 className="text-heading-xl font-bold tracking-tight text-slate-900">
                Light-First Palette & Color Hierarchy
              </h2>
              <p className="text-body-md max-w-3xl text-slate-600">
                A disciplined, vibrant hierarchy: Genius Orange is primary; Fresh White and Soft
                Cloud form the light foundation; Digital Blue and Electric Teal represent technology
                and innovation; Growth Green and Optimistic Yellow provide contextual highlights.
              </p>
            </div>

            {/* Primary & Core Swatches */}
            <Grid cols={1} colsSm={2} colsLg={4} gap="md">
              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-primary) p-6 text-white shadow-sm">
                <span className="font-mono text-[0.6875rem] tracking-wider uppercase opacity-85">
                  --brand-primary (Primary)
                </span>
                <span className="font-display text-xl font-bold">Genius Hub Orange</span>
                <span className="text-xs opacity-90">#FF6B00 / Primary Action & Sun Mark</span>
              </div>

              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-blue) p-6 text-white shadow-sm">
                <span className="font-mono text-[0.6875rem] tracking-wider uppercase opacity-85">
                  --brand-blue (Innovation)
                </span>
                <span className="font-display text-xl font-bold">Digital Blue</span>
                <span className="text-xs opacity-90">#2563EB / Future of Work & Tech</span>
              </div>

              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-teal) p-6 text-white shadow-sm">
                <span className="font-mono text-[0.6875rem] tracking-wider uppercase opacity-85">
                  --brand-teal (Innovation)
                </span>
                <span className="font-display text-xl font-bold">Electric Teal</span>
                <span className="text-xs opacity-90">#0D9488 / Digital Skills & Connective</span>
              </div>

              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-green) p-6 text-white shadow-sm">
                <span className="font-mono text-[0.6875rem] tracking-wider uppercase opacity-85">
                  --brand-green (Contextual)
                </span>
                <span className="font-display text-xl font-bold">Growth Green</span>
                <span className="text-xs opacity-90">#16A34A / Sustainability & Livelihoods</span>
              </div>
            </Grid>

            {/* Surface Foundations */}
            <div className="mt-4 flex flex-col gap-3">
              <h3 className="font-display text-base font-bold text-slate-900">
                Light-First Foundation Surfaces
              </h3>
              <Grid cols={1} colsMd={3} gap="md">
                <div className="rounded-(--radius-standard) border border-slate-200 bg-white p-6 shadow-2xs">
                  <span className="text-label mb-2 block text-orange-600">
                    Surface: Fresh White
                  </span>
                  <h4 className="font-display mb-1 text-base font-bold text-slate-900">
                    Crisp Canvas & Cards
                  </h4>
                  <p className="text-body-sm text-slate-600">
                    Primary page canvas, cards, form controls, and elevated dialogs.
                  </p>
                </div>

                <div className="rounded-(--radius-standard) border border-slate-200 bg-slate-50 p-6 shadow-2xs">
                  <span className="text-label mb-2 block text-blue-600">Surface: Soft Cloud</span>
                  <h4 className="font-display mb-1 text-base font-bold text-slate-900">
                    Alternating Section Canvas
                  </h4>
                  <p className="text-body-sm text-slate-600">
                    Subtle content groupings, statistics sections, and editorial callouts.
                  </p>
                </div>

                <div className="rounded-(--radius-standard) border border-slate-800 bg-slate-900 p-6 text-white shadow-sm">
                  <span className="text-label mb-2 block text-orange-400">
                    Surface: Deep Ink (Contrast)
                  </span>
                  <h4 className="font-display mb-1 text-base font-bold text-white">
                    Footer & Contrast Media
                  </h4>
                  <p className="text-body-sm text-slate-300">
                    Reserved exclusively for platform footer and rare high-impact media moments.
                  </p>
                </div>
              </Grid>
            </div>
          </section>

          <Divider />

          {/* Section 2: Contemporary Typography */}
          <section id="typography" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">02. Typography</span>
              <h2 className="text-heading-xl font-bold tracking-tight text-slate-900">
                Contemporary Display (Outfit) & Humanist Sans (Plus Jakarta Sans)
              </h2>
              <p className="text-body-md max-w-3xl text-slate-600">
                Confident, energetic display headings with personality paired with clean, accessible
                body typography supporting English, French, and German characters.
              </p>
            </div>

            <div className="flex flex-col gap-8 rounded-(--radius-standard) border border-slate-200 bg-slate-50/70 p-8 sm:p-10">
              <div className="flex flex-col gap-1 border-b border-slate-200 pb-6">
                <span className="font-mono text-[0.6875rem] text-slate-500">
                  .text-display-2xl (Outfit / Bold & Optimistic)
                </span>
                <p className="text-display-2xl font-extrabold text-slate-900">
                  Igniting African Youth & Women Potential
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-slate-200 pb-6">
                <span className="font-mono text-[0.6875rem] text-slate-500">
                  .text-display-xl (Outfit / Contemporary Display)
                </span>
                <p className="text-display-xl font-bold text-slate-900">
                  Empowering 12,000+ Entrepreneurs Across Nigeria
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-slate-200 pb-6">
                <span className="font-mono text-[0.6875rem] text-slate-500">
                  .text-heading-xl (Outfit / Section Heading)
                </span>
                <p className="text-heading-xl font-bold text-slate-900">
                  Practical Vocational Mastery, Solar Engineering & Digital Incubation
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-slate-200 pb-6">
                <span className="font-mono text-[0.6875rem] text-slate-500">
                  .text-body-lg (Plus Jakarta Sans / Clean & Warm)
                </span>
                <p className="text-body-lg leading-relaxed text-slate-700">
                  Genius Hub operates at the dynamic intersection of human dignity, practical
                  vocational skills, and technology for the future of work. Founded in Edo State,
                  our initiatives equip young women, men, and returnee migrants with market-driven
                  skills and sustainable enterprise capital.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.6875rem] text-slate-500">
                  .text-label / .text-caption
                </span>
                <Cluster gap="lg">
                  <span className="text-label text-orange-600">
                    Genius Hub Innovation Lab • Benin City HQ
                  </span>
                  <span className="text-caption text-slate-500">
                    Documentary Photography Archive • Updated September 2026
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
              <h2 className="text-heading-xl font-bold tracking-tight text-slate-900">
                Expressive Impact Milestones
              </h2>
              <p className="text-body-md max-w-3xl text-slate-600">
                Bold, energetic numbers integrated into layouts to celebrate tangible human progress
                rather than sterile SaaS widgets.
              </p>
            </div>

            <div className="rounded-(--radius-standard) border border-slate-200 bg-slate-50 p-8 sm:p-10">
              <Grid cols={1} colsSm={2} colsLg={4} gap="xl">
                <Stat
                  value="12,000"
                  suffix="+"
                  label="MSMEs Empowered"
                  description="Grassroots enterprises founded and scaled across Edo, Lagos, and national hubs."
                />
                <Stat
                  value="85"
                  suffix="%"
                  label="Livelihood Placement"
                  description="Graduates actively operating registered businesses or placed in tech/vocational jobs."
                />
                <Stat
                  value="45"
                  suffix="+"
                  label="Innovation Hubs"
                  description="Community learning centers, fashion ateliers, and solar testing workshops."
                />
                <Stat
                  prefix="₦"
                  value="250M"
                  suffix="+"
                  label="Seed Capital Disbursed"
                  description="Direct enterprise grants, toolkits, and equipment funding for beneficiaries."
                />
              </Grid>
            </div>
          </section>

          <Divider />

          {/* Section 4: Photography-First Foundations */}
          <section id="photography" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">
                04. Photography-First Foundation
              </span>
              <h2 className="text-heading-xl font-bold tracking-tight text-slate-900">
                Real Human Stories & Documentary Visuals
              </h2>
              <p className="text-body-md max-w-3xl text-slate-600">
                Authentic activity imagery—students, women, youth, tech training, fashion atelier,
                community leadership—drives the emotional resonance of Genius Hub.
              </p>
            </div>

            {/* Asymmetric Story Layout: Portrait + Quote */}
            <div className="rounded-(--radius-standard) border border-slate-200 bg-white p-8 shadow-2xs sm:p-12">
              <Grid cols={1} colsMd={12} gap="xl" className="items-center">
                <div className="md:col-span-5">
                  <ImageWithCaption
                    aspectRatio="4:5"
                    caption="Vocational apprentice at the Genius Hub Garment Atelier."
                    credit="Genius Hub Documentary Archive"
                    media={
                      <div className="font-display flex h-full w-full items-center justify-center bg-slate-100 text-sm font-semibold text-slate-600">
                        [4:5 Real Activity Portrait]
                      </div>
                    }
                  />
                </div>
                <div className="flex flex-col gap-6 md:col-span-7">
                  <Quote className="h-10 w-10 text-(--brand-primary)" />
                  <blockquote className="font-display text-2xl leading-snug font-bold text-slate-900 sm:text-3xl">
                    “When you equip a young African with a practical craft, digital capabilities,
                    and commercial confidence, you transform not just a household—you activate the
                    entire regional economy.”
                  </blockquote>
                  <div className="flex items-center gap-3.5">
                    <Avatar name="Isimeme Whyte" role="Founder & CEO" size="md" />
                    <div className="flex flex-col">
                      <span className="font-display text-sm font-bold text-slate-900">
                        Isimeme Whyte
                      </span>
                      <span className="text-xs text-slate-600">
                        Founder & CEO, Genius Hub Global
                      </span>
                    </div>
                  </div>
                </div>
              </Grid>
            </div>

            {/* Photography-Led Editorial Cards */}
            <div className="mt-4 flex flex-col gap-4">
              <h3 className="font-display text-base font-bold text-slate-900">
                Editorial Programme & Story Cards
              </h3>
              <Grid cols={1} colsMd={3} gap="lg">
                <MediaCard
                  editorial
                  aspectRatio="16:9"
                  badge={<Badge variant="brand">Solar & Energy</Badge>}
                  media={
                    <div className="font-display flex h-full w-full items-center justify-center bg-orange-50 text-xs font-semibold text-orange-800">
                      [16:9 Solar Installation Training]
                    </div>
                  }
                >
                  <span className="text-[0.6875rem] font-bold tracking-wider text-orange-600 uppercase">
                    Technical Track
                  </span>
                  <h4 className="font-display cursor-pointer text-xl leading-snug font-bold text-slate-900 transition-colors hover:text-(--brand-primary)">
                    Renewable Solar Installation & Microgrid Engineering
                  </h4>
                  <p className="text-body-sm line-clamp-2 text-slate-600">
                    A comprehensive 16-week practical cohort for youth across rural and urban Edo
                    State.
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-(--brand-primary)">
                    <span>Explore Curriculum</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </MediaCard>

                <MediaCard
                  editorial
                  aspectRatio="16:9"
                  badge={<Badge variant="blue">Future of Work</Badge>}
                  media={
                    <div className="font-display flex h-full w-full items-center justify-center bg-blue-50 text-xs font-semibold text-blue-800">
                      [16:9 Software & Digital Studio]
                    </div>
                  }
                >
                  <span className="text-[0.6875rem] font-bold tracking-wider text-blue-600 uppercase">
                    Digital Academy
                  </span>
                  <h4 className="font-display cursor-pointer text-xl leading-snug font-bold text-slate-900 transition-colors hover:text-(--brand-primary)">
                    Full-Stack Web Development & Cloud Foundations
                  </h4>
                  <p className="text-body-sm line-clamp-2 text-slate-600">
                    Equipping young developers with modern JavaScript, cloud architectures, and
                    remote readiness.
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-(--brand-primary)">
                    <span>Read Overview</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </MediaCard>

                <MediaCard
                  editorial
                  aspectRatio="16:9"
                  badge={<Badge variant="success">Beneficiary Story</Badge>}
                  media={
                    <div className="font-display flex h-full w-full items-center justify-center bg-emerald-50 text-xs font-semibold text-emerald-800">
                      [16:9 Beneficiary Story]
                    </div>
                  }
                >
                  <span className="text-[0.6875rem] font-bold tracking-wider text-emerald-600 uppercase">
                    Impact Story
                  </span>
                  <h4 className="font-display cursor-pointer text-xl leading-snug font-bold text-slate-900 transition-colors hover:text-(--brand-primary)">
                    From Apprentice to Employer: Osasere’s Tech Journey
                  </h4>
                  <p className="text-body-sm line-clamp-2 text-slate-600">
                    How digital skills training enabled a returnee youth to establish a digital
                    agency in Benin City.
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-(--brand-primary)">
                    <span>Read Story</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </MediaCard>
              </Grid>
            </div>
          </section>

          <Divider />

          {/* Section 5: Actions & Forms */}
          <section id="controls" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">
                05. Actions & Accessible Forms
              </span>
              <h2 className="text-heading-xl font-bold tracking-tight text-slate-900">
                Vibrant Buttons, Accessible Controls & Structured Cards
              </h2>
              <p className="text-body-md max-w-3xl text-slate-600">
                High-contrast keyboard focus, accessible WCAG 2.2 AA targets, and clear visual
                hierarchy.
              </p>
            </div>

            <Stack gap="xl">
              {/* Button Family */}
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-base font-bold text-slate-900">
                  Button Hierarchy
                </h3>
                <Cluster gap="sm" align="center">
                  <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Apply for Programme
                  </Button>
                  <Button variant="innovation" leftIcon={<Zap className="h-4 w-4" />}>
                    Explore Innovation Hub
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
                <h3 className="font-display text-base font-bold text-slate-900">
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
                <h3 className="font-display text-base font-bold text-slate-900">
                  Structured Institutional Cards
                </h3>
                <Grid cols={1} colsMd={2} gap="lg">
                  <Card variant="feature">
                    <CardHeader>
                      <CardTitle>Vocational Incubation Advisory</CardTitle>
                      <CardDescription>
                        Direct technical advisory and mentor linkages provided to enrolled student
                        artisans.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-sm text-slate-600">
                        Cohorts receive continuous business incubation support, financial literacy
                        workshops, and regulatory compliance assistance.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <span className="text-xs font-semibold text-slate-500">Benin City Hub</span>
                      <Button size="sm" variant="primary">
                        Access Support
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card variant="default">
                    <CardHeader>
                      <CardTitle>Institutional Partnerships</CardTitle>
                      <CardDescription>
                        Collaborative frameworks with international development agencies and
                        government bodies.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-sm text-slate-600">
                        Genius Hub works closely with donor partners to ensure transparent
                        governance, verified impact tracking, and scalable outcomes.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <span className="text-xs font-semibold text-slate-500">Global Desk</span>
                      <Button size="sm" variant="secondary">
                        Partner With Us
                      </Button>
                    </CardFooter>
                  </Card>
                </Grid>
              </div>

              {/* Form Foundation */}
              <div className="rounded-(--radius-standard) border border-slate-200 bg-slate-50/70 p-8 sm:p-10">
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
                    <h4 className="font-display text-sm font-bold text-slate-900">
                      Registration Agreement
                    </h4>
                    <Checkbox
                      id="cb-code-conduct"
                      label="I agree to commit to the full cohort duration and community code of conduct"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="font-display text-sm font-bold text-slate-900">Learning Mode</h4>
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

          {/* Section 6: Navigation & Connected Brand Loader */}
          <section id="loader" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-label text-(--brand-primary)">
                06. Navigation & Brand Loading Mark
              </span>
              <h2 className="text-heading-xl font-bold tracking-tight text-slate-900">
                Semantic Breadcrumbs & Connected Brand Loader
              </h2>
              <p className="text-body-md max-w-3xl text-slate-600">
                Connected community nodes converging into the radiant Genius Hub sun mark, built
                with lightweight SVG and full reduced-motion support.
              </p>
            </div>

            <Grid cols={1} colsMd={2} gap="lg">
              <div className="flex flex-col gap-4 rounded-(--radius-standard) border border-slate-200 bg-white p-8 shadow-2xs">
                <h3 className="font-display text-base font-bold text-slate-900">
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

              <div className="flex flex-col items-center justify-center gap-6 rounded-(--radius-standard) border border-slate-200 bg-slate-50 p-8 shadow-2xs">
                <h3 className="font-display self-start text-base font-bold text-slate-900">
                  Connected Brand Loader Mark
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
