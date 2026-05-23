'use client';

import { useState, useCallback } from 'react';
import {
  HeroSection,
  StatsSection,
  VideoGallery,
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
  const [promoApplied, setPromoApplied] = useState(false);

  const handleBookNow = useCallback(() => {
    setPromoApplied(false);
    setIsModalOpen(true);
  }, []);

  const handlePromoBook = useCallback(() => {
    setPromoApplied(true);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setPromoApplied(false);
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

      <FloatingBookButton onClick={handleBookNow} />
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        promoApplied={promoApplied}
      />
    </main>
  );
}
