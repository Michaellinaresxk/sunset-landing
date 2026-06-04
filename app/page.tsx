import { HomePageClient } from '@/src/components/sections/HomePageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sunset.luxpuntacana.com',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
