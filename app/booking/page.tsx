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
    title: 'Horseback Riding in Punta Cana — From $65 | Hotel Pickup Included',
    description:
      'Sunset horseback ride along Playa Macao — from $65/person, hotel pickup included. Book your 2-hour guided beach tour today!',
    url: 'https://sunset.luxpuntacana.com',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Horseback riding along Playa Macao beach at sunset in Punta Cana',
        type: 'image/jpeg',
      },
    ],
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
