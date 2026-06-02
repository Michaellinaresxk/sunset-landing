// src/components/HomePageClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import {
  HeroSection,
  ReviewsSection,
  ExperienceSection,
  UrgencySection,
  FinalCTA,
} from '@/src/components/sections';
import FloatingBookButton from '@/src/components/FloatingWhatsAppButton';
import PromoBanner from '@/src/components/PromoBanner';
import ImageGallery from '@/src/components/sections/ImageGallery';
import QuickInfoBar from '@/src/components/sections/QuickInfoBar';
import SafetySection from '@/src/components/sections/SafetySection';
import IncludesSection from '@/src/components/sections/IncludesSection';
import DescriptionSection from '@/src/components/sections/DescriptionSection';
import Footer from '@/src/components/Footer';

export function HomePageClient() {
  const router = useRouter();

  const handleBookNow = () => router.push('/booking'); // ✅ en vez de window.location.href

  return (
    <main className='min-h-screen bg-zinc-950 antialiased'>
      <HeroSection onBookClick={handleBookNow} />
      <QuickInfoBar />
      <section id='gallery'>
        <ImageGallery />
      </section>
      <section id='includes'>
        <IncludesSection />
      </section>
      <PromoBanner onBookClick={handleBookNow} />
      <section id='reviews'>
        <ReviewsSection />
      </section>
      <FinalCTA onBookClick={handleBookNow} />
      <section id='about'>
        <DescriptionSection />
      </section>
      <section id='safety'>
        <SafetySection />
      </section>
      <ExperienceSection />
      <UrgencySection />
      <FloatingBookButton />
      <Footer />
    </main>
  );
}
