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
} from 'lucide-react';

export default function DesignSystemShowcasePage() {
  return (
    <main className="min-h-screen bg-(--surface-canvas) pb-24 text-(--text-primary)">
      {/* Header Banner */}
      <Section surface="dark" spacing="md" className="border-b border-(--border-default)">
        <Container width="default">
          <Stack gap="sm">
            <Cluster gap="xs">
              <Badge variant="brand" dot>
                Genius Hub Digital System
              </Badge>
              <Badge variant="neutral">Internal Dev Showcase</Badge>
              <Badge variant="warning">NoIndex / Private</Badge>
            </Cluster>
            <h1 className="text-display-lg font-extrabold tracking-tight">
              Design System & UI Primitives
            </h1>
            <p className="text-body-lg max-w-3xl text-(--text-secondary)">
              Foundational token architecture, accessible primitives, responsive layout containers,
              photography presentation, and motion language for the Genius Hub digital platform.
            </p>
          </Stack>
        </Container>
      </Section>

      <Container width="default" className="pt-12">
        <Stack gap="2xl">
          {/* Section 1: Brand Colors & Surfaces */}
          <section id="colors" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-heading-xl font-bold tracking-tight">
                01. Color System & Surfaces
              </h2>
              <p className="text-body-md text-(--text-secondary)">
                Semantic tokens with high WCAG 2.2 AA contrast ratios across light, dark, and brand
                themes.
              </p>
            </div>

            <Grid cols={1} colsSm={2} colsLg={4} gap="md">
              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-primary) p-5 text-white shadow-xs">
                <span className="font-mono text-xs tracking-wider uppercase opacity-80">
                  --brand-primary
                </span>
                <span className="text-lg font-bold">Genius Amber Gold</span>
                <span className="text-xs opacity-90">#D97706 / Vibrant Sun & Youth Energy</span>
              </div>

              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-secondary) p-5 text-white shadow-xs">
                <span className="font-mono text-xs tracking-wider uppercase opacity-80">
                  --brand-secondary
                </span>
                <span className="text-lg font-bold">Obsidian Navy</span>
                <span className="text-xs opacity-90">#0B1320 / Institutional Authority</span>
              </div>

              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-accent) p-5 text-white shadow-xs">
                <span className="font-mono text-xs tracking-wider uppercase opacity-80">
                  --brand-accent
                </span>
                <span className="text-lg font-bold">Impact Emerald</span>
                <span className="text-xs opacity-90">#059669 / Agriculture & Growth</span>
              </div>

              <div className="flex flex-col gap-2 rounded-(--radius-standard) bg-(--brand-tertiary) p-5 text-white shadow-xs">
                <span className="font-mono text-xs tracking-wider uppercase opacity-80">
                  --brand-tertiary
                </span>
                <span className="text-lg font-bold">Technology Sky</span>
                <span className="text-xs opacity-90">#0284C7 / Digital Innovation</span>
              </div>
            </Grid>

            {/* Surface Theme Showcase */}
            <div className="mt-4 flex flex-col gap-3">
              <h3 className="text-heading-sm font-semibold">Surface Theming Demonstration</h3>
              <Grid cols={1} colsMd={3} gap="md">
                <div className="rounded-(--radius-standard) border border-(--border-default) bg-(--surface-primary) p-6 text-(--text-primary)">
                  <Badge variant="neutral" className="mb-3">
                    Surface: Light (Default)
                  </Badge>
                  <h4 className="mb-1 text-base font-semibold">Crisp Editorial Canvas</h4>
                  <p className="text-sm text-(--text-secondary)">
                    Standard reading and informational background.
                  </p>
                </div>

                <div
                  data-surface="dark"
                  className="rounded-(--radius-standard) border border-(--border-subtle) bg-(--surface-primary) p-6 text-(--text-primary)"
                >
                  <Badge variant="brand" className="mb-3">
                    Surface: Dark
                  </Badge>
                  <h4 className="mb-1 text-base font-semibold">Deep Obsidian Atmosphere</h4>
                  <p className="text-sm text-(--text-secondary)">
                    Immersive containers for high-impact media.
                  </p>
                </div>

                <div
                  data-surface="brand"
                  className="rounded-(--radius-standard) border border-(--border-brand) bg-(--surface-primary) p-6 text-(--text-primary)"
                >
                  <Badge variant="warning" className="mb-3">
                    Surface: Brand Tone
                  </Badge>
                  <h4 className="mb-1 text-base font-semibold">Genius Highlight Section</h4>
                  <p className="text-sm text-(--text-secondary)">
                    Callouts, statistics, and major milestones.
                  </p>
                </div>
              </Grid>
            </div>
          </section>

          <Divider />

          {/* Section 2: Typography */}
          <section id="typography" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-heading-xl font-bold tracking-tight">
                02. Fluid Typography Scale
              </h2>
              <p className="text-body-md text-(--text-secondary)">
                Responsive type scales with fluid clamp values ensuring optimal legibility across
                mobile to 4K displays.
              </p>
            </div>

            <div className="flex flex-col gap-6 rounded-(--radius-standard) border border-(--border-default) bg-(--surface-secondary) p-6">
              <div className="flex flex-col gap-1 border-b border-(--border-default) pb-4">
                <span className="font-mono text-xs text-(--text-muted)">.text-display-xl</span>
                <p className="text-display-xl font-extrabold text-(--text-primary)">
                  Empowering Africa’s Future
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-(--border-default) pb-4">
                <span className="font-mono text-xs text-(--text-muted)">.text-display-lg</span>
                <p className="text-display-lg font-bold text-(--text-primary)">
                  Human Capital & Technology Solutions
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-(--border-default) pb-4">
                <span className="font-mono text-xs text-(--text-muted)">.text-heading-xl</span>
                <p className="text-heading-xl font-bold text-(--text-primary)">
                  Global Development Originating from Nigeria
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-(--border-default) pb-4">
                <span className="font-mono text-xs text-(--text-muted)">.text-heading-lg</span>
                <p className="text-heading-lg font-semibold text-(--text-primary)">
                  Vocational Training, Solar Installation & Tech Innovation
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b border-(--border-default) pb-4">
                <span className="font-mono text-xs text-(--text-muted)">.text-body-lg</span>
                <p className="text-body-lg text-(--text-secondary)">
                  Genius Hub is committed to transforming lives through hands-on entrepreneurship
                  programmes, international partnerships, and measurable community empowerment.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-(--text-muted)">
                  .text-label / .text-caption
                </span>
                <Cluster gap="md">
                  <span className="text-label text-(--text-primary)">Label / Eyebrow Text</span>
                  <span className="text-caption">
                    Caption text for photo credits, metadata, and timestamps.
                  </span>
                </Cluster>
              </div>
            </div>
          </section>

          <Divider />

          {/* Section 3: Buttons & Interactive Elements */}
          <section id="buttons" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-heading-xl font-bold tracking-tight">
                03. Button Hierarchy & States
              </h2>
              <p className="text-body-md text-(--text-secondary)">
                Interactive buttons with accessible keyboard focus rings, loading states, and icon
                slots.
              </p>
            </div>

            <Stack gap="lg">
              <div className="flex flex-col gap-3">
                <h3 className="text-heading-sm font-semibold">Button Variants</h3>
                <Cluster gap="sm">
                  <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Primary Action
                  </Button>
                  <Button variant="secondary" leftIcon={<ShieldCheck className="h-4 w-4" />}>
                    Secondary Action
                  </Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger Action</Button>
                </Cluster>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-heading-sm font-semibold">Sizes & States</h3>
                <Cluster gap="sm" align="center">
                  <Button size="sm" variant="primary">
                    Small (sm)
                  </Button>
                  <Button size="md" variant="primary">
                    Medium (md)
                  </Button>
                  <Button size="lg" variant="primary">
                    Large (lg)
                  </Button>
                  <Button variant="primary" isLoading>
                    Loading State
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled State
                  </Button>
                </Cluster>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-heading-sm font-semibold">IconButtons & LinkButtons</h3>
                <Cluster gap="sm" align="center">
                  <IconButton
                    icon={<Mail className="h-4 w-4" />}
                    aria-label="Send email"
                    variant="outline"
                  />
                  <IconButton
                    icon={<Download className="h-4 w-4" />}
                    aria-label="Download report"
                    variant="primary"
                  />
                  <IconButton
                    icon={<Search className="h-4 w-4" />}
                    aria-label="Search site"
                    variant="ghost"
                  />
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
                </Cluster>
              </div>
            </Stack>
          </section>

          <Divider />

          {/* Section 4: Form Foundation */}
          <section id="forms" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-heading-xl font-bold tracking-tight">
                04. Accessible Form Foundation
              </h2>
              <p className="text-body-md text-(--text-secondary)">
                Inputs, textareas, selects, checkboxes, and radio buttons with clear error and
                helper states.
              </p>
            </div>

            <div className="rounded-(--radius-standard) border border-(--border-default) bg-(--surface-secondary) p-6 sm:p-8">
              <Grid cols={1} colsMd={2} gap="lg">
                <FormField
                  label="Full Name"
                  htmlFor="demo-name"
                  required
                  description="Enter your legal full name for certification."
                >
                  <Input
                    id="demo-name"
                    placeholder="e.g. Isimeme Whyte"
                    leftAddon={<Users className="h-4 w-4" />}
                  />
                </FormField>

                <FormField
                  label="Email Address"
                  htmlFor="demo-email"
                  required
                  error="Please enter a valid institutional or personal email."
                >
                  <Input
                    id="demo-email"
                    type="email"
                    hasError
                    defaultValue="invalid-email@"
                    leftAddon={<Mail className="h-4 w-4" />}
                  />
                </FormField>

                <FormField
                  label="Programme of Interest"
                  htmlFor="demo-programme"
                  optional
                  description="Select a core training discipline."
                >
                  <Select
                    id="demo-programme"
                    placeholder="Choose a programme..."
                    options={[
                      { value: 'solar', label: 'Solar Energy & Electrical Installation' },
                      { value: 'tech', label: 'Software Engineering & Digital Skills' },
                      { value: 'fashion', label: 'Garment Production & Fashion Design' },
                      { value: 'agric', label: 'Sustainable Agriculture & Agribusiness' },
                    ]}
                  />
                </FormField>

                <FormField
                  label="Disabled Field Example"
                  htmlFor="demo-disabled"
                  description="Locked administrative field."
                >
                  <Input id="demo-disabled" disabled defaultValue="Read-only System Value" />
                </FormField>

                <div className="md:col-span-2">
                  <FormField
                    label="Statement of Purpose"
                    htmlFor="demo-message"
                    required
                    description="Describe your goals and how this training will impact your community."
                  >
                    <Textarea
                      id="demo-message"
                      placeholder="Write your statement here..."
                      rows={3}
                    />
                  </FormField>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-semibold">Checkboxes</h4>
                  <Checkbox
                    id="cb-terms"
                    label="I agree to the programme terms and code of conduct"
                    description="Required for student registration."
                  />
                  <Checkbox id="cb-newsletter" label="Receive newsletter updates" defaultChecked />
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-semibold">Radio Group</h4>
                  <Radio
                    name="study-mode"
                    id="radio-fulltime"
                    label="Full-time On-site (Benin City Hub)"
                    defaultChecked
                  />
                  <Radio name="study-mode" id="radio-hybrid" label="Hybrid / Virtual Learning" />
                </div>
              </Grid>
            </div>
          </section>

          <Divider />

          {/* Section 5: Badges & Tags */}
          <section id="badges" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-heading-xl font-bold tracking-tight">
                05. Badges & Taxonomy Tags
              </h2>
              <p className="text-body-md text-(--text-secondary)">
                Status indicators, category labels, and interactive filter pills.
              </p>
            </div>

            <Stack gap="md">
              <Cluster gap="sm" align="center">
                <Badge variant="neutral">Neutral Badge</Badge>
                <Badge variant="brand" dot>
                  Brand Active
                </Badge>
                <Badge variant="success" dot>
                  Approved
                </Badge>
                <Badge variant="warning" dot>
                  Pending Review
                </Badge>
                <Badge variant="error" dot>
                  Suspended
                </Badge>
                <Badge variant="info">Information</Badge>
              </Cluster>

              <Cluster gap="sm" align="center">
                <Tag selected>Youth Empowerment</Tag>
                <Tag interactive>Digital Skills</Tag>
                <Tag interactive>Solar Energy</Tag>
                <Tag interactive onRemove={() => {}}>
                  Edo State
                </Tag>
              </Cluster>
            </Stack>
          </section>

          <Divider />

          {/* Section 6: Cards, Media & Impact Stats */}
          <section id="cards-and-media" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-heading-xl font-bold tracking-tight">
                06. Cards, Photography & Impact Stats
              </h2>
              <p className="text-body-md text-(--text-secondary)">
                Modular card layouts, documentary photography presentation with controlled aspect
                ratios, and statistical milestones.
              </p>
            </div>

            {/* Impact Stats */}
            <Grid
              cols={1}
              colsSm={2}
              colsLg={4}
              gap="md"
              className="rounded-(--radius-standard) border border-(--border-default) bg-(--surface-secondary) p-6"
            >
              <Stat
                value="12,000"
                suffix="+"
                label="MSMEs Empowered"
                description="Across Edo, Lagos, and nationwide initiatives."
                trend={{ value: '+24% YoY', positive: true }}
              />
              <Stat
                value="85"
                suffix="%"
                label="Employment Rate"
                description="Graduates placed or running self-sustaining enterprises."
              />
              <Stat
                value="45"
                suffix="+"
                label="Training Hubs"
                description="Equipped physical centers and partner studios."
              />
              <Stat
                prefix="₦"
                value="250M"
                suffix="+"
                label="Grant Funding Facilitated"
                description="Seed capital directly disbursed to beneficiaries."
              />
            </Grid>

            {/* Media Presentation Cards */}
            <Grid cols={1} colsMd={3} gap="lg">
              <MediaCard
                aspectRatio="16:9"
                badge={<Badge variant="brand">Training Hub</Badge>}
                media={
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-600 to-amber-900 font-semibold text-white">
                    [16:9 Documentary Photo Frame]
                  </div>
                }
              >
                <CardHeader>
                  <CardTitle>Solar Power Technician Cohort</CardTitle>
                  <CardDescription>
                    Intensive 12-week technical workshop on photovoltaic systems installation and
                    maintenance.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <span className="text-xs text-(--text-muted)">Benin City Hub</span>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </CardFooter>
              </MediaCard>

              <MediaCard
                aspectRatio="16:9"
                badge={<Badge variant="success">Completed</Badge>}
                media={
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-700 to-slate-900 font-semibold text-white">
                    [16:9 Beneficiary Portrait]
                  </div>
                }
              >
                <CardHeader>
                  <CardTitle>Women in Tech Initiative</CardTitle>
                  <CardDescription>
                    Digital product design and frontend software development for young women
                    leaders.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <span className="text-xs text-(--text-muted)">Lagos Center</span>
                  <Button size="sm" variant="outline">
                    View Story
                  </Button>
                </CardFooter>
              </MediaCard>

              <Card variant="elevated">
                <CardHeader>
                  <Cluster gap="xs">
                    <Avatar name="Isimeme Whyte" role="Founder & CEO" size="md" status="online" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Isimeme Whyte</span>
                      <span className="text-xs text-(--text-muted)">Founder & Lead Strategist</span>
                    </div>
                  </Cluster>
                  <CardTitle className="mt-3">Leadership Perspective</CardTitle>
                  <CardDescription>
                    “Our mission is not merely training for employment, but nurturing self-reliant
                    innovators who anchor Africa’s future.”
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <span className="text-xs text-(--text-muted)">Executive Board</span>
                  <Button size="sm" variant="ghost">
                    Read Profile
                  </Button>
                </CardFooter>
              </Card>
            </Grid>

            {/* Photo Grid & Aspect Ratio System */}
            <div className="mt-6 flex flex-col gap-4">
              <h3 className="text-heading-sm font-semibold">
                Aspect Ratio Presentation & Captions
              </h3>
              <Grid cols={1} colsSm={2} colsLg={3} gap="md">
                <ImageWithCaption
                  aspectRatio="1:1"
                  caption="Apparel design atelier workshop session."
                  credit="Genius Hub Media"
                  media={
                    <div className="flex h-full w-full items-center justify-center bg-slate-800 font-mono text-xs text-white">
                      1:1 Square
                    </div>
                  }
                />
                <ImageWithCaption
                  aspectRatio="4:5"
                  caption="Student leader portrait during graduation ceremony."
                  credit="Genius Hub Archive"
                  media={
                    <div className="flex h-full w-full items-center justify-center bg-slate-800 font-mono text-xs text-white">
                      4:5 Portrait
                    </div>
                  }
                />
                <ImageWithCaption
                  aspectRatio="3:2"
                  caption="Agricultural drone inspection training in Edo State."
                  credit="Edo Tech Hub"
                  media={
                    <div className="flex h-full w-full items-center justify-center bg-slate-800 font-mono text-xs text-white">
                      3:2 Classic Photo
                    </div>
                  }
                />
              </Grid>
            </div>
          </section>

          <Divider />

          {/* Section 7: Breadcrumbs & Brand Loading Mark */}
          <section id="navigation-and-loader" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-heading-xl font-bold tracking-tight">
                07. Navigation Trails & Brand Loader
              </h2>
              <p className="text-body-md text-(--text-secondary)">
                Accessible breadcrumbs and the custom Genius Hub brand loading mark.
              </p>
            </div>

            <Grid cols={1} colsMd={2} gap="lg">
              <div className="flex flex-col gap-4 rounded-(--radius-standard) border border-(--border-default) bg-(--surface-primary) p-6">
                <h3 className="text-heading-sm font-semibold">Breadcrumb Navigation</h3>
                <Breadcrumbs
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Programmes', href: '/programmes' },
                    { label: 'Solar Power Tech', current: true },
                  ]}
                />
                <Breadcrumbs
                  items={[
                    { label: 'Genius Hub', href: '/' },
                    { label: 'Documentation', href: '/docs' },
                    { label: 'Design System', href: '/docs/design-system' },
                    { label: 'Color Tokens', current: true },
                  ]}
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-6 rounded-(--radius-standard) border border-(--border-default) bg-(--surface-primary) p-6">
                <h3 className="text-heading-sm self-start font-semibold">Brand Loading Mark</h3>
                <Cluster gap="lg" align="center" justify="center">
                  <BrandLoader size="sm" />
                  <BrandLoader size="md" showLabel />
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
