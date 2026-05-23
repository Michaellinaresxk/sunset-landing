'use client';

import { Calendar, Check } from 'lucide-react';
import { CTA_IMAGE } from '@/src/constants';
import { SectionProps } from '@/src/types';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';
import GradientButton from '@/src/components/ui/GradientButton';

const GUARANTEES = [
  'Instant Confirmation',
  'Free Cancellation',
  'Private Available',
];

export default function FinalCTA({ onBookClick }: SectionProps) {
  return (
    <SectionReveal className='relative py-32 md:py-56 overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0'>
            <img
              src={CTA_IMAGE}
              alt='Sunset horseback riding'
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

              <p className='text-lg md:text-2xl lg:text-3xl text-white/60 font-light mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed'>
                Limited availability. Reserve your exclusive golden hour
                experience today.
              </p>

              <GradientButton
                onClick={onBookClick}
                icon={Calendar}
                size='xl'
                showArrow
              >
                Reserve Now
              </GradientButton>

              <div className='flex flex-wrap justify-center gap-6 md:gap-12 mt-10 md:mt-16 text-sm md:text-base text-white/40 font-light'>
                {GUARANTEES.map((text, i) => (
                  <div key={i} className='flex items-center gap-2'>
                    <Check className='w-4 h-4 md:w-5 md:h-5 text-amber-300' />
                    {text}
                  </div>
                ))}
              </div>
            </RevealItem>
          </div>
        </>
      )}
    </SectionReveal>
  );
}
