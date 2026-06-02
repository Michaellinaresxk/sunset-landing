import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

// ── Fonts ─────────────────────────────────────────────────────
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
  title: {
    default:
      'Horseback Riding in Punta Cana — From $65 | Hotel Pickup Included — LuxPuntaCana',
    template: '%s | LuxPuntaCana',
  },
  description:
    'Ride along Playa Macao at golden hour — 2-hour guided horseback tour from $65/person. Hotel pickup included, no experience needed. Book online today!',
  keywords: [
    'horseback riding Punta Cana',
    'horseback riding Dominican Republic',
    'sunset horseback riding Punta Cana',
    'Playa Macao horseback riding',
    'Macao Beach horse tour',
    'things to do in Punta Cana',
    'Punta Cana excursions',
    'Punta Cana tours',
    'Punta Cana activities',
    'beach horseback riding',
    'horseback riding Punta Cana with hotel pickup',
    'horseback riding for beginners Punta Cana',
    'sunset beach ride Punta Cana',
    'horseback riding Bávaro',
    'golden hour horseback ride',
    'family activities Punta Cana',
    'Punta Cana activities for couples',
    'romantic things to do Punta Cana',
    'Punta Cana beach tour',
    'horse riding tour Dominican Republic',
    'cabalgata Punta Cana',
    'paseo a caballo Punta Cana',
    'excursiones Punta Cana',
    'LuxPuntaCana horseback riding',
    'sunset tour Punta Cana',
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Horseback Riding in Punta Cana — From $65 | Hotel Pickup Included',
    description:
      'Sunset horseback ride along Playa Macao — from $65/person, hotel pickup included. Book your 2-hour guided beach tour today!',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Horseback riding along Playa Macao beach at sunset in Punta Cana — LuxPuntaCana',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: 'Sunset Horseback Riding — Punta Cana from $65',
    description:
      'Playa Macao at golden hour, on horseback. Hotel pickup included. Book today.',
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
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
  category: 'travel',
  creator: SITE_NAME,
  publisher: SITE_NAME,
};

// ── Structured Data ───────────────────────────────────────────
const BUSINESS_ID = `${SITE_URL}/#business`;
const PRODUCT_ID = `${SITE_URL}/#product`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: SITE_NAME,
      url: SITE_URL,
      email: 'info@luxpuntacana.com',
      telephone: '+1-829-812-3753',
      image: OG_IMAGE,
      description:
        'Premium horseback riding tours along Playa Macao beach in Punta Cana, Dominican Republic. Sunset and classic rides available daily with round-trip hotel pickup included.',
      priceRange: '$65–$75',
      paymentAccepted: ['Credit Card', 'Debit Card'],
      currenciesAccepted: 'USD',
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
      areaServed: [
        { '@type': 'Place', name: 'Punta Cana' },
        { '@type': 'Place', name: 'Bávaro' },
        { '@type': 'Place', name: 'Cap Cana' },
        { '@type': 'Place', name: 'Uvero Alto' },
      ],
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
        closes: '19:00',
      },
      sameAs: [
        'https://www.instagram.com/luxpuntacana',
        'https://www.facebook.com/luxpuntacana',
        'https://www.tiktok.com/@luxpuntacana',
      ],
    },
    {
      '@type': 'Product',
      '@id': PRODUCT_ID,
      name: 'Horseback Riding Tour — Playa Macao, Punta Cana',
      description:
        'A 2-hour guided horseback ride along Playa Macao beach and a scenic river trail at golden hour. Includes round-trip hotel pickup from Bávaro, Punta Cana, Cap Cana, and Uvero Alto. No experience required. Available every day.',
      image: OG_IMAGE,
      url: SITE_URL,
      brand: { '@type': 'Brand', name: SITE_NAME },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '500',
        bestRating: '5',
        worstRating: '1',
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Classic Ride — Adult',
          price: '65.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          priceValidUntil: '2026-12-31',
          url: `${SITE_URL}/#booking`,
          seller: { '@id': BUSINESS_ID },
        },
        {
          '@type': 'Offer',
          name: 'Classic Ride — Child (7-10)',
          price: '55.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          priceValidUntil: '2026-12-31',
          url: `${SITE_URL}/#booking`,
          seller: { '@id': BUSINESS_ID },
        },
        {
          '@type': 'Offer',
          name: 'Sunset Experience — Adult',
          price: '75.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          priceValidUntil: '2026-12-31',
          url: `${SITE_URL}/#booking`,
          seller: { '@id': BUSINESS_ID },
        },
        {
          '@type': 'Offer',
          name: 'Sunset Experience — Child (7-10)',
          price: '65.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          priceValidUntil: '2026-12-31',
          url: `${SITE_URL}/#booking`,
          seller: { '@id': BUSINESS_ID },
        },
      ],
    },
    {
      '@type': 'TouristTrip',
      name: 'Sunset Horseback Riding at Playa Macao — Punta Cana',
      description:
        'A 2-hour guided horseback riding experience along Playa Macao beach at golden hour. Includes round-trip hotel pickup, bilingual guide, safety equipment, and a Dominican coffee & mamajuana tasting stop. No experience required.',
      touristType: ['Adventure', 'Nature', 'Beach', 'Couples', 'Families'],
      provider: { '@id': BUSINESS_ID },
      itinerary: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Hotel Pickup',
            description:
              'Round-trip pickup from your Bávaro or Punta Cana hotel — included in the price.',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Meet Your Horse',
            description:
              'Safety briefing, equipment fitting, and horse matching by your bilingual guide.',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Beach & River Ride',
            description:
              '2 hours along Playa Macao shoreline and a scenic river trail through tropical landscape.',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Golden Hour',
            description:
              'Pause at the shore as the Caribbean sunset paints the sky — the perfect photo moment.',
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        'Book sunset and classic horseback riding tours at Playa Macao beach, Punta Cana. Hotel pickup included, available every day.',
      publisher: { '@id': BUSINESS_ID },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'LuxPuntaCana',
          item: 'https://luxpuntacana.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Horseback Riding — Punta Cana',
          item: SITE_URL,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need horseback riding experience?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No experience is required. Our bilingual guides provide a full safety briefing and match you with a horse suited to your comfort level. The ride is suitable for complete beginners and experienced riders alike.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is included in the price?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your ticket includes round-trip hotel pickup and drop-off, a 2-hour guided horseback ride along Playa Macao beach and river trail, safety equipment, a bilingual guide, and a Dominican coffee & mamajuana tasting stop.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is hotel pickup really included?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — round-trip transport from your hotel in Bávaro, Punta Cana, Cap Cana, or Uvero Alto is included in the price at no extra charge. Our driver picks you up and brings you back.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long is the horseback ride?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The ride itself is approximately 2 hours. Including hotel pickup and drop-off, plan for about 3–4 hours total.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the cancellation policy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Free cancellation up to 24 hours before your scheduled experience for a full refund.',
          },
        },
        {
          '@type': 'Question',
          name: 'What should I wear?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Closed-toe shoes are required (no sandals or flip-flops). Wear comfortable clothing suitable for warm weather. We recommend bringing sunscreen and mosquito repellent.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this safe for children?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Children aged 7 and above can participate with a parent or guardian. Our horses are gentle and trained for tourist activities, and guides provide extra attention to young riders.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if it rains?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tours run rain or shine — a little tropical rain adds to the adventure! We only cancel in extreme weather conditions, in which case you can reschedule or receive a full refund.',
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

      <body className='min-h-full flex flex-col'>
        {children}

        {/* Google Analytics + Google Ads */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-LD9XRNSCB0'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LD9XRNSCB0');
            gtag('config', 'AW-17581132846');
          `}
        </Script>

        {/* Hotjar */}
        <Script id='hotjar' strategy='afterInteractive'>
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6719650,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </body>
    </html>
  );
}
