/**
 * Genius Hub Public Navigation & Information Architecture Configuration
 * Provides typed, centralized navigation data for desktop, mega menus, mobile drawer, and footer.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  external?: boolean;
  iconName?: string;
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export interface FeaturedItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
  imageAlt?: string;
  actionText?: string;
}

export interface MegaMenuConfig {
  id: string;
  label: string;
  href: string;
  groups: NavGroup[];
  featured?: FeaturedItem;
}

export interface DirectNavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export type HeaderNavItem =
  { type: 'megamenu'; data: MegaMenuConfig } | { type: 'direct'; data: DirectNavItem };

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export interface SocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
}

export interface LanguageOption {
  code: 'en' | 'fr' | 'de';
  label: string;
  nativeLabel: string;
}

export const languages: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
];

export const headerNavigation: HeaderNavItem[] = [
  {
    type: 'megamenu',
    data: {
      id: 'about',
      label: 'About',
      href: '/about',
      groups: [
        {
          heading: 'Who We Are',
          items: [
            {
              label: 'About Genius Hub',
              href: '/about',
              description: 'Our mission, heritage, and global development approach.',
            },
            {
              label: 'Leadership & Team',
              href: '/about/leadership',
              description: 'Executive leadership, advisors, and founder Isimeme Whyte.',
            },
            {
              label: 'Our Story',
              href: '/about/our-story',
              description: 'From grassroots origins in Edo State to international impact.',
            },
          ],
        },
        {
          heading: 'Governance & Reach',
          items: [
            {
              label: 'Governance & Ethics',
              href: '/about/governance',
              description: 'Institutional accountability, board oversight, and standards.',
            },
            {
              label: 'Locations & Hubs',
              href: '/about/locations',
              description: 'Headquarters in Benin City, Lagos Hub, and training centers.',
            },
            {
              label: 'Strategic Partners',
              href: '/about/partners',
              description: 'Collaborating international donors, government, and industry bodies.',
            },
          ],
        },
      ],
      featured: {
        title: 'Building Pathways to Self-Reliance',
        description:
          'Learn how Genius Hub has catalyzed sustainable livelihoods for over 12,000 beneficiaries across West Africa.',
        href: '/about/our-story',
        badge: 'Organization Story',
        actionText: 'Read Our Story',
      },
    },
  },
  {
    type: 'megamenu',
    data: {
      id: 'what-we-do',
      label: 'What We Do',
      href: '/focus-areas',
      groups: [
        {
          heading: 'Strategic Pillars',
          items: [
            {
              label: 'Focus Areas',
              href: '/focus-areas',
              description: 'Core thematic domains driving human and technological impact.',
            },
            {
              label: 'Programmes',
              href: '/programmes',
              description:
                'Structured capacity building, solar engineering, and digital academies.',
            },
            {
              label: 'Projects & Initiatives',
              href: '/projects',
              description: 'Targeted field interventions and community partnerships.',
            },
          ],
        },
        {
          heading: 'Ecosystem & Services',
          items: [
            {
              label: 'Vocational Training (TVET)',
              href: '/programmes?track=vocational',
              description: 'Market-driven technical crafts, apparel production, and solar energy.',
            },
            {
              label: 'Creative & Studio Services',
              href: '/services',
              description: 'Garment manufacturing atelier, creative media, and production studio.',
            },
            {
              label: 'Employment & Talent Ecosystem',
              href: '/talent',
              description:
                'Linking trained youth and women directly to verified enterprise placements.',
            },
          ],
        },
      ],
      featured: {
        title: 'Renewable Solar Engineering Academy',
        description:
          'A flagship 16-week technical training programme delivering clean energy livelihoods to African youth.',
        href: '/programmes/solar-energy-engineering',
        badge: 'Featured Programme',
        actionText: 'Explore Curriculum',
      },
    },
  },
  {
    type: 'megamenu',
    data: {
      id: 'impact-stories',
      label: 'Impact & Stories',
      href: '/impact',
      groups: [
        {
          heading: 'Evidence & Outcomes',
          items: [
            {
              label: 'Impact Overview',
              href: '/impact',
              description: 'Quantitative milestones, evaluation data, and verified metrics.',
            },
            {
              label: 'Success Stories',
              href: '/impact/success-stories',
              description: 'First-person narratives of empowered entrepreneurs and artisans.',
            },
            {
              label: 'Publications & Reports',
              href: '/impact/reports',
              description: 'Annual impact audits, policy briefs, and research papers.',
            },
            {
              label: 'Geographic Reach',
              href: '/impact/geographic-reach',
              description: 'Interactive map of communities, states, and hubs reached.',
            },
          ],
        },
        {
          heading: 'Editorial & News',
          items: [
            {
              label: 'News & Updates',
              href: '/stories?category=news',
              description: 'Press releases, platform announcements, and organizational milestones.',
            },
            {
              label: 'Insights & Thought Leadership',
              href: '/stories?category=insights',
              description:
                'Articles on TVET, migration advocacy, and the future of work in Africa.',
            },
            {
              label: 'Events & Workshops',
              href: '/events',
              description: 'Upcoming conferences, graduation summits, and masterclasses.',
            },
          ],
        },
      ],
      featured: {
        title: 'Osasere: From Apprentice to Atelier Employer',
        description:
          'Discover how returnee migrant Osasere built an 8-person apparel studio in Benin City after Genius Hub training.',
        href: '/impact/success-stories/osasere-tech-journey',
        badge: 'Beneficiary Story',
        actionText: 'Read Story',
      },
    },
  },
  {
    type: 'direct',
    data: {
      id: 'opportunities',
      label: 'Opportunities',
      href: '/opportunities',
    },
  },
  {
    type: 'direct',
    data: {
      id: 'shop',
      label: 'Store',
      href: '/shop',
      badge: 'Products',
    },
  },
  {
    type: 'direct',
    data: {
      id: 'contact',
      label: 'Contact',
      href: '/contact',
    },
  },
];

export const headerCta = {
  primary: {
    label: 'Apply for Training',
    href: '/apply',
  },
  secondary: {
    label: 'Partner With Us',
    href: '/partner',
  },
  donate: {
    label: 'Donate',
    href: '/donate',
  },
} as const;

export const footerNavigation: {
  columns: FooterColumn[];
  social: SocialLink[];
  locations: Array<{ name: string; city: string; country: string; address?: string }>;
} = {
  columns: [
    {
      title: 'Organization',
      links: [
        { label: 'About Genius Hub', href: '/about' },
        { label: 'Leadership & Team', href: '/about/leadership' },
        { label: 'Our Story & Heritage', href: '/about/our-story' },
        { label: 'Governance & Ethics', href: '/about/governance' },
        { label: 'Physical Locations', href: '/about/locations' },
        { label: 'Strategic Partners', href: '/about/partners' },
      ],
    },
    {
      title: 'What We Do',
      links: [
        { label: 'Focus Areas', href: '/focus-areas' },
        { label: 'All Programmes', href: '/programmes' },
        { label: 'Active Projects', href: '/projects' },
        { label: 'Vocational TVET', href: '/programmes?track=vocational' },
        { label: 'Creative Studio Services', href: '/services' },
        { label: 'Talent & Job Placements', href: '/talent' },
      ],
    },
    {
      title: 'Impact & Media',
      links: [
        { label: 'Impact Overview', href: '/impact' },
        { label: 'Success Stories', href: '/impact/success-stories' },
        { label: 'Publications & Reports', href: '/impact/reports' },
        { label: 'News & Press', href: '/stories' },
        { label: 'Upcoming Events', href: '/events' },
        { label: 'Geographic Reach', href: '/impact/geographic-reach' },
      ],
    },
    {
      title: 'Opportunities',
      links: [
        { label: 'Apply for Training', href: '/apply' },
        { label: 'Partner With Us', href: '/partner' },
        { label: 'Careers & Vacancies', href: '/careers' },
        { label: 'Volunteer Network', href: '/volunteer' },
        { label: 'Genius Hub Store', href: '/shop' },
        { label: 'Make a Donation', href: '/donate' },
      ],
    },
    {
      title: 'Trust & Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Accessibility Statement', href: '/accessibility' },
        { label: 'Sitemap', href: '/sitemap.xml' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
  ],
  social: [
    {
      platform: 'Twitter',
      href: 'https://twitter.com/geniushubglobal',
      ariaLabel: 'Follow Genius Hub on Twitter / X',
    },
    {
      platform: 'LinkedIn',
      href: 'https://linkedin.com/company/geniushubglobal',
      ariaLabel: 'Connect with Genius Hub on LinkedIn',
    },
    {
      platform: 'Facebook',
      href: 'https://facebook.com/geniushubglobal',
      ariaLabel: 'Like Genius Hub on Facebook',
    },
    {
      platform: 'Instagram',
      href: 'https://instagram.com/geniushubglobal',
      ariaLabel: 'Follow Genius Hub on Instagram',
    },
  ],
  locations: [
    {
      name: 'Global Headquarters',
      city: 'Benin City, Edo State',
      country: 'Nigeria',
      address: 'Genius Hub Hub Complex, Benin City',
    },
    {
      name: 'Innovation & Tech Studio',
      city: 'Lagos',
      country: 'Nigeria',
      address: 'Lagos Innovation Centre, Victoria Island',
    },
  ],
};
