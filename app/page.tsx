'use client';

import { useState, useCallback } from 'react';
import {
  HeroSection,
  StatsSection,
  VideoGallery,
  ExperienceSection,
  UrgencySection,
  FinalCTA,
} from '@/components/sections';
import BookingModal from '@/components/booking/BookingModal';
import FloatingBookButton from '@/components/FloatingBookButton';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <main className='min-h-screen bg-zinc-950 antialiased'>
      <HeroSection onBookClick={handleBookNow} />
      <StatsSection />
      <VideoGallery />
      <ExperienceSection />
      <UrgencySection />
      <FinalCTA onBookClick={handleBookNow} />

      <FloatingBookButton onClick={handleBookNow} />
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}
