import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ── Constants ─────────────────────────────────────────────────
const SITE_URL = 'https://sunset.luxpuntacana.com';
const SITE_NAME = 'LuxPuntaCana';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // 1200×630px recommended
const TWITTER_HANDLE = '@luxpuntacana';

// ── Viewport (exported separately in Next 16) ────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

// ── Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  // ▸ Core
  title: {
    default:
      'Horseback Riding in Punta Cana | Sunset Beach Rides — LuxPuntaCana',
    template: '%s | LuxPuntaCana',
  },
  description:
    'Ride along Playa Macao at golden hour — an unforgettable horseback experience in Punta Cana with hotel pickup, professional guides, and beach & river trails. Book online today!',
  keywords: [
    'horseback riding Punta Cana',
    'sunset horseback ride',
    'Playa Macao horse tour',
    'Punta Cana excursions',
    'horseback riding Dominican Republic',
    'beach horseback riding',
    'Punta Cana activities',
    'golden hour horseback ride',
    'things to do in Punta Cana',
    'cabalgata Punta Cana',
  ],

  // ▸ Canonical & alternates
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'es-DO': '/es',
    },
  },

  // ▸ Open Graph — rich previews on Facebook, WhatsApp, iMessage, LinkedIn
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Horseback Sunset Rides in Punta Cana — Book Your Golden Hour',
    description:
      'Explore Playa Macao on horseback at sunset. Hotel pickup included, professional guides, beach & river trails. Limited spots — reserve now!',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Horseback riding on Playa Macao beach at sunset in Punta Cana',
        type: 'image/jpeg',
      },
    ],
  },

  // ▸ Twitter Card — rich previews on X / Twitter
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: 'Sunset Horseback Riding — Punta Cana',
    description:
      'Golden hour on the beach, on horseback. Book your Playa Macao ride today.',
    images: [OG_IMAGE],
  },

  // ▸ Favicon & app icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  // ▸ Robots & indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ▸ Misc
  category: 'travel',
  creator: SITE_NAME,
  publisher: SITE_NAME,
};

// ── Structured Data (JSON-LD) ─────────────────────────────────
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // 1. TouristTrip — main product
    {
      '@type': 'TouristTrip',
      name: 'Sunset Horseback Riding Experience — Playa Macao',
      description:
        'A 2-hour guided horseback ride along Playa Macao beach and a scenic river trail at golden hour, with round-trip hotel transfers from Punta Cana resorts.',
      touristType: ['Adventure', 'Nature', 'Beach'],
      url: SITE_URL,
      image: OG_IMAGE,
      provider: {
        '@type': 'TourProvider',
        name: SITE_NAME,
        url: SITE_URL,
        email: 'info@luxpuntacana.com',
        telephone: '+1-829-812-3753',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Punta Cana',
          addressRegion: 'La Altagracia',
          addressCountry: 'DO',
        },
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Classic Ride — Adult',
          price: '65.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: new Date().toISOString().split('T')[0],
          url: SITE_URL,
        },
        {
          '@type': 'Offer',
          name: 'Sunset Experience — Adult',
          price: '75.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: new Date().toISOString().split('T')[0],
          url: SITE_URL,
        },
      ],
      itinerary: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Hotel pickup & welcome',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Safety briefing & horse pairing',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Golden hour beach & river ride',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Return transfer to hotel',
          },
        ],
      },
    },

    // 2. LocalBusiness — branded entity
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      email: 'info@luxpuntacana.com',
      telephone: '+1-829-812-3753',
      image: OG_IMAGE,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Punta Cana',
        addressRegion: 'La Altagracia',
        addressCountry: 'DO',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 18.582,
        longitude: -68.4055,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '500',
        bestRating: '5',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    },

    // 3. WebSite — enables sitelinks search box
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#business` },
    },

    // 4. BreadcrumbList — helps Google show breadcrumbs
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
      ],
    },

    // 5. FAQPage — can show FAQ rich results
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long is the horseback riding tour?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The experience lasts approximately 2 hours, including hotel pickup and return.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is prior horse riding experience required?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No experience needed. Our guides pair you with a horse matching your skill level and provide full instructions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is hotel pickup included?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, round-trip transportation from Punta Cana area hotels is included in the price.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the cancellation policy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Free cancellation up to 24 hours before the experience.',
          },
        },
      ],
    },
  ],
};

// ── Layout ────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
