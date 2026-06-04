import { HomePageClient } from '@/src/components/sections/HomePageClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sunset.luxpuntacana.com',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
