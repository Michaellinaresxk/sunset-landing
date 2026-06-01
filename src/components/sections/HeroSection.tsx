'use client';

import { ChevronDown, Truck, Check, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '@/src/hooks';
import { HERO_IMAGE } from '@/src/constants';
import GradientButton from '@/src/components/ui/GradientButton';
import { SectionProps } from '@/src/types';

export default function HeroSection({ onBookClick }: SectionProps) {
  const scrollY = useScrollReveal();
  const parallax = scrollY * 0.7;

  return (
    <div className='relative h-screen min-h-[900px] overflow-hidden'>
      {/* Parallax Background */}
      <div
        className='absolute inset-0'
        style={{ transform: `translateY(${parallax}px)` }}
      >
        <img
          src={HERO_IMAGE}
          alt='Horseback riding on Playa Macao beach at sunset in Punta Cana'
          className='w-full h-full object-cover scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/20 to-zinc-950/90' />
        <div className='absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-transparent' />
      </div>

      {/* Content */}
      <div className='relative z-10 h-full flex items-end pb-24 md:pb-32'>
        <div className='max-w-7xl mx-auto px-4 md:px-8 w-full'>
          <div className='max-w-4xl space-y-4 md:space-y-5'>
            {/* Badge */}
            <div className='inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10'>
              <div className='w-2 h-2 rounded-full bg-amber-300 animate-pulse' />
              <span className='text-white/90 text-xs md:text-sm tracking-widest uppercase font-light'>
                Exclusive Sunset Experience
              </span>
            </div>

            {/* H1 — SEO keyword phrase */}
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-extralight text-white tracking-tighter leading-none'>
              Horseback
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200'>
                Riding in Punta Cana
              </span>
            </h1>

            {/* Subtitle — emotional hook */}
            <p className='text-xl md:text-2xl lg:text-3xl text-white/75 font-light max-w-2xl leading-relaxed'>
              The most memorable hour of your vacation —
              <span className='text-amber-200/90'>
                {' '}
                on horseback at golden hour.
              </span>
            </p>

            {/* CTA + trust pills */}
            <div className='flex flex-col gap-4'>
              <GradientButton
                onClick={onBookClick}
                size='lg'
                showArrow
                className='w-fit'
              >
                Reserve Your Spot
              </GradientButton>

              {/* Price + trust signals — visible before first scroll */}
              <div className='flex flex-wrap items-center gap-2.5'>
                <span className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-medium'>
                  From $65 / person
                </span>
                <span className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs'>
                  <Truck className='w-3 h-3' />
                  Hotel pickup included
                </span>
                <span className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs'>
                  <ShieldCheck className='w-3 h-3' />
                  Free cancellation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce'>
        <ChevronDown className='w-8 h-8 text-white/30' />
      </div>
    </div>
  );
}
