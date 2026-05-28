'use client';

import { Calendar, Truck, Check, ShieldCheck } from 'lucide-react';
import { CTA_IMAGE } from '@/src/constants';
import { SectionProps } from '@/src/types';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';
import GradientButton from '@/src/components/ui/GradientButton';

export default function FinalCTA({ onBookClick }: SectionProps) {
  return (
    <SectionReveal className='relative py-32 md:py-56 overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0'>
            <img
              src={CTA_IMAGE}
              alt='Sunset horseback riding tour on Playa Macao beach Punta Cana'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950/90' />
          </div>

          <div className='relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center'>
            <RevealItem isVisible={isVisible}>
              <h2 className='text-5xl md:text-8xl lg:text-9xl font-extralight text-white mb-8 md:mb-12 tracking-tighter leading-none'>
                Your Moment
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 mt-4'>
                  Awaits
                </span>
              </h2>

              <p className='text-lg md:text-2xl lg:text-3xl text-white/60 font-light mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed'>
                Book your unforgettable golden hour horseback ride in Punta Cana
              </p>

              {/* CONVERSION: Trust signals before the CTA button */}
              <div className='flex flex-wrap items-center justify-center gap-3 mb-10 md:mb-14 text-sm'>
                <span className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80'>
                  From <span className='text-amber-300 font-medium'>$65</span>
                  /person
                </span>
                <span className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'>
                  <Truck className='w-3.5 h-3.5' />
                  Hotel Pickup Included
                </span>
                <span className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60'>
                  <ShieldCheck className='w-3.5 h-3.5' />
                  Free Cancellation 24h
                </span>
              </div>

              <GradientButton
                onClick={onBookClick}
                icon={Calendar}
                size='xl'
                showArrow
              >
                Book Now
              </GradientButton>
            </RevealItem>
          </div>
        </>
      )}
    </SectionReveal>
  );
}
