import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Hotjar from '@hotjar/browser';

const siteId = 6719650;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

// Initializing with `debug` option:
Hotjar.init(siteId, hotjarVersion, {
  debug: true,
});

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
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const TWITTER_HANDLE = '@luxpuntacana';

// ── Viewport (exported separately in Next 15+) ───────────────
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

  // ▸ Open Graph
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

  // ▸ Twitter Card
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

const BUSINESS_ID = `${SITE_URL}/#business`;
const PRODUCT_ID = `${SITE_URL}/#product`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // ─── 1. LocalBusiness ─────────────────────────────────────
    // The branded entity — carries the ONLY AggregateRating on the page.
    {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: SITE_NAME,
      url: SITE_URL,
      email: 'info@luxpuntacana.com',
      telephone: '+1-829-812-3753',
      image: OG_IMAGE,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Playa Macao',
        addressLocality: 'Punta Cana',
        addressRegion: 'La Altagracia',
        postalCode: '23000',
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
        worstRating: '1',
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
      sameAs: [
        'https://www.instagram.com/luxpuntacana',
        'https://www.facebook.com/luxpuntacana',
        'https://www.tiktok.com/@luxpuntacana',
      ],
    },

    // ─── 2. Product (wraps the tour for offer/price rich results) ──
    // Google supports AggregateRating on Product, but we reference the
    // business rating via the brand instead of duplicating it here.
    {
      '@type': 'Product',
      '@id': PRODUCT_ID,
      name: 'Sunset Horseback Riding Experience — Playa Macao',
      description:
        'A 2-hour guided horseback ride along Playa Macao beach and a scenic river trail at golden hour, with round-trip hotel transfers from Punta Cana resorts.',
      image: OG_IMAGE,
      url: SITE_URL,
      brand: {
        '@type': 'Brand',
        name: SITE_NAME,
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Classic Ride — Adult',
          price: '65.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          url: `${SITE_URL}/#booking`,
          priceValidUntil: '2026-12-31',
          seller: { '@id': BUSINESS_ID },
        },
        {
          '@type': 'Offer',
          name: 'Sunset Experience — Adult',
          price: '75.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          url: `${SITE_URL}/#booking`,
          priceValidUntil: '2026-12-31',
          seller: { '@id': BUSINESS_ID },
        },
      ],
    },

    // ─── 3. WebSite ───────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': BUSINESS_ID },
      inLanguage: ['en-US', 'es-DO'],
    },

    // ─── 4. BreadcrumbList ────────────────────────────────────
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Horseback Riding',
          item: `${SITE_URL}/horseback-riding`,
        },
      ],
    },

    // ─── 5. FAQPage ───────────────────────────────────────────
    // No AggregateRating here — Google does NOT support it on FAQPage.
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
        {
          '@type': 'Question',
          name: 'What should I wear for the horseback ride?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Wear comfortable clothing and closed-toe shoes. Sunscreen and sunglasses are recommended.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are children allowed on the tour?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Children aged 6 and older can participate. Younger children may ride with an adult on select horses — contact us for details.',
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
  const siteId = 6719650;
  const hotjarVersion = 6;

  Hotjar.init(siteId, hotjarVersion);

  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD — single script tag, single @graph, one AggregateRating */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Google Analytics */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-T3N16HEN6X'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T3N16HEN6X');
          `}
        </Script>
      </head>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
