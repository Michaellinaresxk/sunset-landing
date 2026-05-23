import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sunset Horseback Riding | Lux Punta Cana',
  description:
    'Experience the magic of a sunset horseback ride along the beaches of Punta Cana. Small groups, professional guides, all-inclusive experience.',
  keywords: [
    'horseback riding Punta Cana',
    'sunset horse riding',
    'Punta Cana excursion',
    'horse riding beach',
    'Dominican Republic horseback',
    'balade cheval Punta Cana',
  ],
  openGraph: {
    title: 'Sunset Horseback Riding | Lux Punta Cana',
    description:
      "Where paradise meets perfection, captured in nature's most spectacular light.",
    type: 'website',
    url: 'https://sunset.luxpuntacana.com',
    images: [
      {
        url: 'https://res.cloudinary.com/ddg92xar5/image/upload/v1755946814/Imagen_de_WhatsApp_2024-06-03_a_las_15.47.17_f9b60a74_l7xtfu.jpg',
        width: 1200,
        height: 630,
        alt: 'Sunset Horseback Riding in Punta Cana',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
