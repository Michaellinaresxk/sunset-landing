import type { Metadata } from 'next';
import BookingClient from './BookingClient';
export const metadata: Metadata = {
  title: 'Book Horseback Riding in Punta Cana — Secure Checkout',
  description:
    'Reserve your sunset horseback ride at Playa Macao. From $65/person, hotel pickup included. Choose your date, pick your time, instant confirmation.',
  alternates: {
    canonical: 'https://sunset.luxpuntacana.com/booking',
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Book Your Horseback Riding — Punta Cana from $65',
    description:
      'Hotel pickup included · Free cancellation · Instant confirmation',
    url: 'https://sunset.luxpuntacana.com/booking',
    images: [
      {
        url: 'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946814/Imagen_de_WhatsApp_2024-06-03_a_las_15.47.17_f9b60a74_l7xtfu.jpg',
        width: 1200,
        height: 630,
        alt: 'Book horseback riding Punta Cana — Playa Macao at sunset',
      },
    ],
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
