'use client';

import { useState, useCallback } from 'react';
import {
  HeroSection,
  StatsSection,
  ExperienceSection,
  UrgencySection,
  FinalCTA,
} from '@/src/components/sections';
import BookingModal from '@/src/components/booking/BookingModal';
import FloatingBookButton from '@/src/components/FloatingBookButton';
import PromoBanner from '@/src/components/PromoBanner';
import ImageGallery from '@/src/components/sections/ImageGallery';
import QuickInfoBar from '@/src/components/sections/QuickInfoBar';
import SafetySection from '@/src/components/sections/SafetySection';
import IncludesSection from '@/src/components/sections/IncludesSection';
import DescriptionSection from '@/src/components/sections/DescriptionSection';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handlePromoBook = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <main className='min-h-screen bg-zinc-950 antialiased'>
      <HeroSection onBookClick={handleBookNow} />
      <QuickInfoBar />
      <ImageGallery />
      <IncludesSection />
      <PromoBanner onBookClick={handlePromoBook} />
      <DescriptionSection />
      {/* <VideoGallery /> */}
      <ExperienceSection />
      <SafetySection />
      <StatsSection />
      <FinalCTA onBookClick={handleBookNow} />
      <UrgencySection />

      <FloatingBookButton />
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}
