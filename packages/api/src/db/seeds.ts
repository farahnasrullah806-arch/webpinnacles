import type {
  BlogPost,
  CaseStudy,
  Category,
  Faq,
  Page,
  ServicePage,
  Testimonial,
  User,
} from '@webpinnacles/contracts'

const now = new Date().toISOString()

export const seedUsers: User[] = [
  {
    id: '10000000-0000-4000-8000-000000000001',
    name: 'Admin User',
    email: 'admin@webpinnacles.com',
    role: 'admin',
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '10000000-0000-4000-8000-000000000002',
    name: 'Editor User',
    email: 'editor@webpinnacles.com',
    role: 'editor',
    active: true,
    createdAt: now,
    updatedAt: now,
  },
]

export const seedPages: Page[] = [
  {
    id: '20000000-0000-4000-8000-000000000001',
    slug: 'home',
    pageType: 'homepage',
    title: 'Digital Marketing Agency for Service Businesses | WebPinnacles',
    seo: {
      title: 'Marketing Agency for Service Businesses | WebPinnacles',
      description:
        'We help service-based businesses book more appointments with Paid Ads, Local SEO, and high-converting funnels.',
      indexing: 'index',
      canonicalUrl: 'https://webpinnacles.com/',
      ogImageUrl: 'https://cdn.webpinnacles.com/og/homepage.jpg',
      schemaMarkup: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
      },
    },
    sections: [
      {
        type: 'hero',
        order: 1,
        visible: true,
        props: {
          eyebrow: 'Appointment-Driven Growth Agency',
          headline: 'We Make Every Dollar Work Overtime',
          subhead:
            'Paid ads, local SEO, and high-converting funnels built for service businesses.',
          primaryCta: { label: 'Book Free Growth Audit', href: '/contact' },
          secondaryCta: { label: 'See Client Results', href: '/services/case-studies' },
        },
      },
      {
        type: 'stats',
        order: 2,
        visible: true,
        props: {
          items: [
            { label: 'Avg. Lead Increase', value: 340, suffix: '%+' },
            { label: 'Ad Spend Managed', value: 2, prefix: '$', suffix: 'M+' },
            { label: 'Average ROAS', value: 4.2, suffix: 'x' },
            { label: 'Active Clients', value: 80, suffix: '+' },
          ],
        },
      },
      {
        type: 'services',
        order: 3,
        visible: true,
        props: {
          title: 'The Growth Engine That Actually Converts',
          items: [
            {
              slug: 'paid-ads',
              title: 'Paid Ads',
              description: 'Performance campaigns built to book appointments.',
            },
            {
              slug: 'local-seo',
              title: 'Local SEO',
              description: 'Win map pack visibility in your city and category.',
            },
            {
              slug: 'funnels-crm',
              title: 'Funnels & CRM',
              description: 'Convert interest into appointments and revenue.',
            },
            {
              slug: 'appointment-setting',
              title: 'Appointment Setting',
              description: 'Done-for-you outreach and follow-up systems.',
            },
          ],
        },
      },
      {
        type: 'faq',
        order: 4,
        visible: true,
        props: {
          scope: 'homepage',
        },
      },
      {
        type: 'cta',
        order: 5,
        visible: true,
        props: {
          headline: 'Your Next 100 Booked Appointments Start Here',
          trustLine: 'No contract. No fluff. Just results.',
          primaryCta: { label: 'Book Audit', href: '/contact' },
          secondaryCta: { label: 'Download Case Study', href: '/services/case-studies' },
        },
      },
    ],
    status: 'published',
    publishedAt: now,
    updatedAt: now,
  },
  {
    id: '20000000-0000-4000-8000-000000000002',
    slug: 'services',
    pageType: 'services-hub',
    title: 'Digital Marketing Services for Service-Based Businesses',
    seo: {
      title: 'Digital Marketing Services for Service Businesses | WebPinnacles',
      description:
        'One agency. Every channel that converts: paid ads, local SEO, funnels & CRM, appointment setting.',
      indexing: 'index',
      canonicalUrl: 'https://webpinnacles.com/services/',
      ogImageUrl: 'https://cdn.webpinnacles.com/og/services.jpg',
    },
    sections: [
      {
        type: 'hero',
        order: 1,
        visible: true,
        props: {
          eyebrow: 'Everything You Need to Scale',
          headline: 'One Agency. Every Channel That Converts.',
          subhead: 'A unified growth stack for appointment-driven businesses.',
        },
      },
      {
        type: 'comparison-table',
        order: 2,
        visible: true,
        props: {
          columns: ['WebPinnacles', 'In-House', 'Other Agency'],
          rows: [
            {
              label: 'Speed to launch',
              values: ['7-14 days', '45-90 days', '21-45 days'],
            },
            {
              label: 'Reporting clarity',
              values: ['Live dashboards', 'Varies', 'Monthly PDF'],
            },
            {
              label: 'Appointment focus',
              values: ['Primary KPI', 'Often mixed', 'Often mixed'],
            },
          ],
        },
      },
    ],
    status: 'published',
    publishedAt: now,
    updatedAt: now,
  },
  {
    id: '20000000-0000-4000-8000-000000000003',
    slug: 'about',
    pageType: 'about',
    title: "We're Not an Agency. We're Your Growth Team.",
    seo: {
      title: 'About WebPinnacles | Appointment-Driven Marketing Agency',
      description:
        'WebPinnacles is a results-driven marketing agency specializing in appointment-setting, paid ads, and local SEO.',
      indexing: 'index',
      canonicalUrl: 'https://webpinnacles.com/about/',
      ogImageUrl: 'https://cdn.webpinnacles.com/og/about.jpg',
    },
    sections: [
      {
        type: 'hero',
        order: 1,
        visible: true,
        props: {
          headline: "We're Not an Agency. We're Your Growth Team.",
          subhead:
            'We exist to eliminate vanity metrics and replace guesswork with predictable appointment growth.',
        },
      },
      {
        type: 'text',
        order: 2,
        visible: true,
        props: {
          heading: 'What We Believe',
          body: [
            'Results over reports.',
            'Clarity over complexity.',
            'Revenue over impressions.',
          ],
        },
      },
    ],
    status: 'published',
    publishedAt: now,
    updatedAt: now,
  },
  {
    id: '20000000-0000-4000-8000-000000000004',
    slug: 'contact',
    pageType: 'contact',
    title: 'Book Your Free 20-Minute Growth Audit',
    seo: {
      title: 'Book Your Free 20-Minute Marketing Audit | WebPinnacles',
      description:
        'Book a free 20-minute growth audit with WebPinnacles. Get a clear plan for more leads and higher ROAS.',
      indexing: 'index',
      canonicalUrl: 'https://webpinnacles.com/contact/',
      ogImageUrl: 'https://cdn.webpinnacles.com/og/contact.jpg',
    },
    sections: [
      {
        type: 'hero',
        order: 1,
        visible: true,
        props: {
          headline: 'Book Your Free 20-Minute Growth Audit',
          subhead:
            "We'll review your marketing, find the gaps, and show where your next 100 clients are.",
        },
      },
    ],
    status: 'published',
    publishedAt: now,
    updatedAt: now,
  },
  {
    id: '20000000-0000-4000-8000-000000000005',
    slug: 'privacy-policy',
    pageType: 'privacy-policy',
    title: 'Privacy Policy — WebPinnacles',
    seo: {
      title: 'Privacy Policy — WebPinnacles',
      description: 'Read how WebPinnacles collects, processes, and protects your data.',
      indexing: 'noindex',
      canonicalUrl: 'https://webpinnacles.com/privacy-policy/',
      ogImageUrl: 'https://cdn.webpinnacles.com/og/privacy.jpg',
    },
    sections: [
      {
        type: 'text',
        order: 1,
        visible: true,
        props: {
          lastUpdated: '2026-03-24',
          sections: [
            'Information Collected',
            'How We Use It',
            'Cookies',
            'Third Parties',
            'Your Rights',
            'Contact Us',
          ],
        },
      },
    ],
    status: 'published',
    publishedAt: now,
    updatedAt: now,
  },
]

export const seedFaqs: Faq[] = [
  {
    id: '30000000-0000-4000-8000-000000000001',
    pageId: null,
    scope: 'homepage',
    question: 'How quickly can we expect results?',
    answer:
      'Most clients see early leading indicators in 14-30 days and stable appointment growth in 60-90 days.',
    order: 1,
  },
  {
    id: '30000000-0000-4000-8000-000000000002',
    pageId: null,
    scope: 'homepage',
    question: 'Do you work on long-term contracts?',
    answer: 'No long lock-ins. We earn retention by performance and transparency.',
    order: 2,
  },
  {
    id: '30000000-0000-4000-8000-000000000003',
    pageId: null,
    scope: 'paid-ads',
    question: 'Which ad platforms do you manage?',
    answer: 'We manage Meta, Google, TikTok, and Pinterest based on your market and economics.',
    order: 1,
  },
  {
    id: '30000000-0000-4000-8000-000000000004',
    pageId: null,
    scope: 'local-seo',
    question: 'Can you improve map rankings in competitive cities?',
    answer:
      'Yes. We use GBP optimization, citations, review loops, and localized content to increase local pack relevance.',
    order: 1,
  },
]

export const seedTestimonials: Testimonial[] = [
  {
    id: '40000000-0000-4000-8000-000000000001',
    clientName: 'David R.',
    businessName: 'Summit Roofing',
    industry: 'Home Services',
    quote:
      'Within 90 days we replaced inconsistent lead flow with a predictable appointment machine.',
    resultMetric: '340% lead increase',
    rating: 5,
    avatarUrl: 'https://cdn.webpinnacles.com/avatars/david-r.jpg',
    service: 'paid-ads',
    featured: true,
  },
  {
    id: '40000000-0000-4000-8000-000000000002',
    clientName: 'Dr. Sana K.',
    businessName: 'Bright Dental Care',
    industry: 'Medical',
    quote:
      'Local SEO and funnel updates doubled qualified consultations while reducing wasted spend.',
    resultMetric: '2.1x booked consults',
    rating: 5,
    avatarUrl: 'https://cdn.webpinnacles.com/avatars/sana-k.jpg',
    service: 'local-seo',
    featured: true,
  },
  {
    id: '40000000-0000-4000-8000-000000000003',
    clientName: 'Ammar H.',
    businessName: 'PrimeFit Studios',
    industry: 'Fitness',
    quote: 'Automation removed follow-up bottlenecks and lifted show rates across all campaigns.',
    resultMetric: '37% show-rate lift',
    rating: 5,
    avatarUrl: 'https://cdn.webpinnacles.com/avatars/ammar-h.jpg',
    service: 'funnels-crm',
    featured: false,
  },
]

export const seedCategories: Category[] = [
  { id: '50000000-0000-4000-8000-000000000001', slug: 'paid-ads', name: 'Paid Ads' },
  { id: '50000000-0000-4000-8000-000000000002', slug: 'local-seo', name: 'Local SEO' },
  { id: '50000000-0000-4000-8000-000000000003', slug: 'funnels', name: 'Funnels & CRM' },
]

const tiptapDoc = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Why Appointment Velocity Matters' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Appointment velocity is the speed at which qualified prospects become booked calls.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'How to Improve It' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Align ad messaging, funnel copy, and follow-up automation around one clear booking action.',
        },
      ],
    },
  ],
}

const toc = [
  { id: 'why-appointment-velocity-matters', text: 'Why Appointment Velocity Matters', level: 2 },
  { id: 'how-to-improve-it', text: 'How to Improve It', level: 2 },
]

export const seedBlogPosts: BlogPost[] = [
  {
    id: '60000000-0000-4000-8000-000000000001',
    slug: 'service-business-lead-engine-playbook',
    title: 'The Service Business Lead Engine Playbook for 2026',
    seoTitle: 'Service Business Lead Engine Playbook (2026) | WebPinnacles',
    metaDescription:
      'A tactical playbook to combine paid ads, local SEO, and follow-up automation for predictable booked appointments.',
    excerpt:
      'Learn the exact cross-channel framework we use to turn traffic into booked appointments.',
    content: tiptapDoc,
    featuredImage: 'https://cdn.webpinnacles.com/blog/lead-engine-playbook.jpg',
    category: seedCategories[0]!,
    authorName: 'WebPinnacles Editorial',
    authorSlug: 'webpinnacles-editorial',
    tags: ['service business marketing', 'appointment setting', 'lead generation'],
    readingTime: 9,
    wordCount: 2140,
    focusKeyword: 'marketing agency for service businesses',
    canonicalUrl: 'https://webpinnacles.com/blog/service-business-lead-engine-playbook/',
    status: 'published',
    publishedAt: now,
    updatedAt: now,
    toc,
  },
  {
    id: '60000000-0000-4000-8000-000000000002',
    slug: 'google-maps-ranking-blueprint',
    title: 'Google Maps Ranking Blueprint for Local Service Brands',
    seoTitle: 'Google Maps Ranking Blueprint | WebPinnacles',
    metaDescription:
      'How local service businesses can win top-3 map visibility with GBP, citations, and review systems.',
    excerpt:
      'A practical breakdown of local SEO execution for businesses that depend on map pack traffic.',
    content: tiptapDoc,
    featuredImage: 'https://cdn.webpinnacles.com/blog/maps-ranking-blueprint.jpg',
    category: seedCategories[1]!,
    authorName: 'WebPinnacles Editorial',
    authorSlug: 'webpinnacles-editorial',
    tags: ['local seo', 'google maps', 'service business seo'],
    readingTime: 8,
    wordCount: 1980,
    focusKeyword: 'local seo services for small business',
    canonicalUrl: 'https://webpinnacles.com/blog/google-maps-ranking-blueprint/',
    status: 'published',
    publishedAt: now,
    updatedAt: now,
    toc,
  },
]

export const seedCaseStudies: CaseStudy[] = [
  {
    id: '70000000-0000-4000-8000-000000000001',
    slug: 'roofing-company-340-percent-lead-increase',
    title: 'Roofing Company 340% Lead Increase in 120 Days',
    industry: 'Home Services',
    challenge: 'Lead flow was inconsistent and cost per booked call was too high.',
    resultSummary:
      'Rebuilt the acquisition stack with intent-segmented campaigns and appointment-focused funnel copy.',
    metrics: [
      { label: 'Lead Increase', value: '340%' },
      { label: 'ROAS', value: '4.2x' },
      { label: 'Cost/Booked Call', value: '-41%' },
    ],
    servicesUsed: ['paid-ads', 'funnels-crm', 'appointment-setting'],
    featured: true,
    publishedAt: now,
  },
  {
    id: '70000000-0000-4000-8000-000000000002',
    slug: 'dental-clinic-local-seo-turnaround',
    title: 'Dental Clinic Local SEO Turnaround: 180% Inquiry Growth',
    industry: 'Medical',
    challenge: 'GBP visibility lagged top competitors in the same service area.',
    resultSummary:
      'Standardized citations, rebuilt service pages, and launched structured review acquisition.',
    metrics: [
      { label: 'Inquiry Growth', value: '180%' },
      { label: 'Top-3 Map Keywords', value: '27' },
      { label: 'Organic Calls', value: '+92%' },
    ],
    servicesUsed: ['local-seo'],
    featured: false,
    publishedAt: now,
  },
]

export const seedServicePages: ServicePage[] = [
  {
    slug: 'paid-ads',
    title: 'Paid Advertising That Books Appointments, Not Just Clicks',
    subtitle:
      'Meta, Google, TikTok, and Pinterest campaigns built for revenue outcomes and booked calls.',
    resultBadge: '340% Avg. Lead Increase',
    seo: {
      title: 'Paid Advertising Agency for Service Businesses | WebPinnacles',
      description:
        'Performance-focused paid ads for service businesses. We build campaigns to book appointments, not vanity clicks.',
      canonicalUrl: 'https://webpinnacles.com/services/paid-ads/',
      indexing: 'index',
      ogImageUrl: 'https://cdn.webpinnacles.com/og/paid-ads.jpg',
    },
    whatWhy: {
      what:
        'Paid ads is a controlled demand engine that creates predictable appointment volume when targeting and creative are aligned.',
      why: 'You get faster learning loops, measurable ROI, and immediate opportunity coverage in competitive markets.',
    },
    features: [
      { icon: '🎯', title: 'Offer-Market Match', description: 'Campaign architecture aligned to high-intent segments.' },
      { icon: '🧪', title: 'Creative Testing', description: 'Rapid ad angle testing to improve click-to-book economics.' },
      { icon: '📊', title: 'Attribution', description: 'Funnel-level reporting connected to booked call outcomes.' },
      { icon: '📈', title: 'Budget Scaling', description: 'Scale winners while maintaining CPA and quality thresholds.' },
      { icon: '🧭', title: 'Audience Mapping', description: 'Cold, warm, and retargeting flows with role-based messaging.' },
      { icon: '⚙️', title: 'Weekly Optimization', description: 'Creative, bidding, and placement updates each week.' },
    ],
    process: [
      { step: 1, title: 'Audit', description: 'Analyze account health, funnel leaks, and conversion friction.' },
      { step: 2, title: 'Strategy', description: 'Build platform mix, messaging angles, and KPI guardrails.' },
      { step: 3, title: 'Launch', description: 'Deploy campaigns with tracking and QA checks.' },
      { step: 4, title: 'Optimize', description: 'Iterate creative and bids based on appointment-level performance.' },
    ],
    caseStudy: {
      name: 'Summit Roofing',
      industry: 'Home Services',
      before: 'Unstable leads and high CPL',
      after: '340% lead growth and 4.2x ROAS',
      summary: 'Shifted to appointment-focused campaign segmentation with high-intent ad messaging.',
    },
    faqs: seedFaqs.filter((faq) => faq.scope === 'paid-ads'),
    cta: {
      headline: 'Need Ads That Drive Revenue Instead of Noise?',
      primaryCtaLabel: 'Book Free Audit',
      primaryCtaHref: '/contact',
      secondaryCtaLabel: 'See Case Studies',
      secondaryCtaHref: '/services/case-studies',
    },
  },
  {
    slug: 'local-seo',
    title: "Local SEO That Gets You Into Google's Top 3 Map Results",
    subtitle: 'Own your city-category footprint and increase qualified calls from local search.',
    resultBadge: 'Top-3 Local Visibility',
    seo: {
      title: 'Local SEO Services for Service Businesses | WebPinnacles',
      description:
        'Local SEO services that dominate Google Maps and local intent search for appointment-driven businesses.',
      canonicalUrl: 'https://webpinnacles.com/services/local-seo/',
      indexing: 'index',
      ogImageUrl: 'https://cdn.webpinnacles.com/og/local-seo.jpg',
    },
    whatWhy: {
      what:
        'Local SEO aligns your GBP, citations, and city-service pages so Google trusts your relevance and proximity signals.',
      why: 'Map-pack visibility captures the highest-conversion local intent traffic for service businesses.',
    },
    features: [
      { icon: '📍', title: 'GBP Optimization', description: 'Service, category, and conversion-focused profile setup.' },
      { icon: '🧱', title: 'Citation Uniformity', description: 'NAP consistency across trusted local directories.' },
      { icon: '⭐', title: 'Review Engine', description: 'Automated request + response loops for reputation growth.' },
      { icon: '🗺️', title: 'Geo Landing Pages', description: 'City and service pages mapped to local keyword clusters.' },
      { icon: '🔎', title: 'Local Keyword Mapping', description: 'Intent-based targeting by city + service combination.' },
      { icon: '📉', title: 'Competitor Gap Analysis', description: 'Track and close structural SERP gaps monthly.' },
    ],
    process: [
      { step: 1, title: 'Baseline', description: 'Map pack ranking benchmark and profile audit.' },
      { step: 2, title: 'Foundation', description: 'Fix NAP/citation inconsistencies and profile entities.' },
      { step: 3, title: 'Content', description: 'Deploy localized pages and structured schema support.' },
      { step: 4, title: 'Authority', description: 'Run review growth cycles and monitor local signals.' },
    ],
    caseStudy: {
      name: 'Bright Dental Care',
      industry: 'Medical',
      before: 'Limited map-pack reach',
      after: '180% inquiry growth',
      summary: 'Local pack ranking lifted across priority services and neighborhoods.',
    },
    faqs: seedFaqs.filter((faq) => faq.scope === 'local-seo'),
    cta: {
      headline: 'Want More Calls From Local Search?',
      primaryCtaLabel: 'Book Free Audit',
      primaryCtaHref: '/contact',
      secondaryCtaLabel: 'Explore Services',
      secondaryCtaHref: '/services',
    },
  },
  {
    slug: 'funnels-crm',
    title: 'Sales Funnels & CRM Systems Built to Convert Leads Into Revenue',
    subtitle: 'Turn incoming traffic into booked appointments with automation-first funnel architecture.',
    resultBadge: 'Higher Lead-to-Appointment Conversion',
    seo: {
      title: 'Funnels & CRM Automation for Service Businesses | WebPinnacles',
      description:
        'Custom sales funnels and CRM automation for service businesses to convert cold traffic into booked appointments.',
      canonicalUrl: 'https://webpinnacles.com/services/funnels-crm/',
      indexing: 'index',
      ogImageUrl: 'https://cdn.webpinnacles.com/og/funnels-crm.jpg',
    },
    whatWhy: {
      what:
        'Funnels + CRM combine persuasive conversion paths with timely automated follow-up across email/SMS.',
      why: 'Speed and consistency in follow-up are often the biggest hidden growth levers.',
    },
    features: [
      { icon: '🧩', title: 'Funnel Mapping', description: 'Offer-to-appointment journey design with drop-off mitigation.' },
      { icon: '📮', title: 'Email + SMS Drips', description: 'Automated follow-up based on lead behavior and stage.' },
      { icon: '🛠️', title: 'CRM Integration', description: 'GoHighLevel, HubSpot, and Salesforce-compatible workflows.' },
      { icon: '🧪', title: 'A/B Testing', description: 'Headline, CTA, and trust element testing with clear hypotheses.' },
      { icon: '🔁', title: 'Lifecycle Automation', description: 'No-response and reactivation sequences by segment.' },
      { icon: '📊', title: 'Pipeline Metrics', description: 'Visibility into MQL to appointment to close progression.' },
    ],
    process: [
      { step: 1, title: 'Diagnose', description: 'Find friction in pages, forms, and follow-up timing.' },
      { step: 2, title: 'Design', description: 'Build funnel copy, UX flow, and CRM state transitions.' },
      { step: 3, title: 'Automate', description: 'Deploy multi-step sequences and routing rules.' },
      { step: 4, title: 'Refine', description: 'Optimize conversion points based on cohort behavior.' },
    ],
    caseStudy: {
      name: 'PrimeFit Studios',
      industry: 'Fitness',
      before: 'Lead follow-up delays and low show rates',
      after: '37% show-rate lift',
      summary: 'Replaced manual follow-up with automated stage-based messaging.',
    },
    faqs: [],
    cta: {
      headline: 'Need a Funnel and CRM That Actually Convert?',
      primaryCtaLabel: 'Book Free Audit',
      primaryCtaHref: '/contact',
      secondaryCtaLabel: 'View Results',
      secondaryCtaHref: '/services/case-studies',
    },
  },
  {
    slug: 'appointment-setting',
    title: 'Done-for-You Appointment Setting That Fills Your Calendar',
    subtitle: 'We handle outreach, qualification, and booking so your sales team only takes qualified calls.',
    resultBadge: 'Booked Calendar, Qualified Calls',
    seo: {
      title: 'Appointment Setting Services for Service Businesses | WebPinnacles',
      description:
        'Appointment setting services with outreach, follow-up, and booking workflows designed for service businesses.',
      canonicalUrl: 'https://webpinnacles.com/services/appointment-setting/',
      indexing: 'index',
      ogImageUrl: 'https://cdn.webpinnacles.com/og/appointment-setting.jpg',
    },
    whatWhy: {
      what:
        'A done-for-you booking operation that qualifies leads and routes only fit prospects into your calendar.',
      why: 'Better qualification improves show rates, close rates, and sales-team utilization.',
    },
    features: [
      { icon: '📬', title: 'Multi-Channel Outreach', description: 'Email, SMS, and LinkedIn outreach calibrated by persona.' },
      { icon: '✅', title: 'Qualification Framework', description: 'ICP fit checks before booking to protect calendar quality.' },
      { icon: '📆', title: 'Booking Automation', description: 'Cal.com and Calendly routing based on rep availability and lead score.' },
      { icon: '🔔', title: 'Reminder System', description: 'Pre-call reminders and confirmations to reduce no-shows.' },
      { icon: '📞', title: 'Show-up Tracking', description: 'Pipeline instrumentation from first touch to attended appointment.' },
      { icon: '📉', title: 'Performance Review', description: 'Weekly KPI review for show, close, and no-show rates.' },
    ],
    process: [
      { step: 1, title: 'ICP Definition', description: 'Set qualification criteria and outreach messaging.' },
      { step: 2, title: 'System Setup', description: 'Connect channels, sequences, and booking workflows.' },
      { step: 3, title: 'Launch Outreach', description: 'Run campaigns and monitor response signals.' },
      { step: 4, title: 'Optimize Pipeline', description: 'Tune scripts and cadence to improve attendance and close rates.' },
    ],
    caseStudy: {
      name: 'Regional Insurance Agency',
      industry: 'Financial Services',
      before: 'Inconsistent show rates and unqualified meetings',
      after: '2.4x qualified appointments',
      summary: 'Qualification scoring and reminder automation lifted calendar quality and attendance.',
    },
    faqs: [],
    cta: {
      headline: 'Want a Calendar Filled With Qualified Appointments?',
      primaryCtaLabel: 'Book Free Audit',
      primaryCtaHref: '/contact',
      secondaryCtaLabel: 'Talk to Strategy Team',
      secondaryCtaHref: '/contact',
    },
  },
]
