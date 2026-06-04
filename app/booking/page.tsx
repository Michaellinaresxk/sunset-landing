import type { Metadata } from 'next';
import BookingClient from './BookingClient';
const OG_IMAGE = 'https://sunset.luxpuntacana.com/og-image.jpg';

export const metadata: Metadata = {
  title: 'Book Horseback Riding in Punta Cana — Secure Checkout',
  description:
    'Reserve your sunset horseback ride at Playa Macao. From $65/person, hotel pickup included.',
  alternates: {
    canonical: 'https://sunset.luxpuntacana.com/booking',
  },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Book Your Horseback Riding — Punta Cana from $65',
    description:
      'Hotel pickup included · Free cancellation · Instant confirmation',
    url: 'https://sunset.luxpuntacana.com/booking',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Book horseback riding Punta Cana — Playa Macao at sunset',
        type: 'image/jpeg',
      },
    ],
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
