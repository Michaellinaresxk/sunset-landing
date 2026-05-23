'use client';

import { Clock, Users, Check, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/src/hooks';
import { HERO_IMAGE } from '@/src/constants';
import GradientButton from '@/src/components/ui/GradientButton';
import { SectionProps } from '@/src/types';

const HERO_FEATURES = [
  { label: '2 Hours', icon: Clock },
  { label: 'Small Groups', icon: Users },
  { label: 'All Inclusive', icon: Check },
];

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
          alt='Sunset horseback riding'
          className='w-full h-full object-cover scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/20 to-zinc-950/90' />
        <div className='absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-transparent' />
      </div>

      {/* Content */}
      <div className='relative z-10 h-full flex items-end pb-24 md:pb-32'>
        <div className='max-w-7xl mx-auto px-4 md:px-8 w-full'>
          <div className='max-w-4xl space-y-8 md:space-y-10'>
            {/* Badge */}
            <div className='inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10'>
              <div className='w-2 h-2 rounded-full bg-amber-300 animate-pulse' />
              <span className='text-white/90 text-xs md:text-sm tracking-widest uppercase font-light'>
                Exclusive Sunset Experience
              </span>
            </div>

            {/* Title */}
            <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight text-white tracking-tighter leading-none'>
              Golden
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 mt-2 md:mt-4'>
                Hour
              </span>
            </h1>

            <p className='text-lg md:text-2xl lg:text-3xl text-white/60 font-light max-w-2xl leading-relaxed'>
              Where paradise meets perfection, captured in nature&apos;s most
              spectacular light
            </p>

            {/* CTA */}
            <div className='flex flex-col sm:flex-row gap-4 md:gap-6 pt-4'>
              <GradientButton onClick={onBookClick} size='lg' showArrow>
                Experience Golden Hour
              </GradientButton>
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
