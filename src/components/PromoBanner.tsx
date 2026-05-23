'use client';

import { useState, useEffect } from 'react';
import { Flame, Truck, Calendar } from 'lucide-react';

interface PromoBannerProps {
  onBookClick: () => void;
}

const getTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diff = midnight.getTime() - now.getTime();

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

const pad = (n: number) => String(n).padStart(2, '0');

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm'>
        <span className='text-3xl sm:text-4xl md:text-5xl font-light text-white tabular-nums font-mono tracking-tight'>
          {value}
        </span>
        {/* Center divider line */}
        <div className='absolute inset-x-0 top-1/2 h-px bg-white/5' />
      </div>
      <span className='text-[10px] sm:text-xs text-white/30 uppercase tracking-widest mt-2 font-light'>
        {label}
      </span>
    </div>
  );
}

export default function PromoBanner({ onBookClick }: PromoBannerProps) {
  const [time, setTime] = useState(getTimeUntilMidnight);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeUntilMidnight()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative py-16 md:py-24 overflow-hidden bg-zinc-950 border-y border-amber-500/20'>
      {/* Background effects */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.12),transparent_60%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(234,88,12,0.08),transparent_50%)]' />
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent' />
      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent' />

      <div className='relative z-10 max-w-3xl mx-auto px-4 md:px-8'>
        <div className='flex flex-col items-center text-center'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 md:mb-10'>
            <Flame className='w-4 h-4 text-orange-400 animate-pulse' />
            <span className='text-orange-300 text-xs sm:text-sm font-light tracking-wider uppercase'>
              Limited Time Offer
            </span>
          </div>

          {/* Headline */}
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight leading-tight mb-3 md:mb-4'>
            Free Transport
          </h2>

          {/* Subheadline */}
          <div className='flex items-center gap-2.5 mb-10 md:mb-14'>
            <Truck className='w-4 h-4 md:w-5 md:h-5 text-amber-400/70' />
            <p className='text-sm sm:text-base md:text-lg text-white/50 font-light'>
              Book for{' '}
              <span className='text-amber-300 font-normal'>
                2 or more guests
              </span>{' '}
              today and pickup is on us
            </p>
          </div>

          {/* Countdown */}
          <div className='flex items-center gap-3 sm:gap-4 md:gap-5 mb-10 md:mb-14'>
            <CountdownUnit value={pad(time.hours)} label='Hours' />
            <span className='text-2xl md:text-3xl text-white/20 font-light -mt-6'>
              :
            </span>
            <CountdownUnit value={pad(time.minutes)} label='Minutes' />
            <span className='text-2xl md:text-3xl text-white/20 font-light -mt-6'>
              :
            </span>
            <CountdownUnit value={pad(time.seconds)} label='Seconds' />
          </div>

          {/* Offer expiry label */}
          <p className='text-xs sm:text-sm text-white/30 font-light mb-8 md:mb-10'>
            Offer resets daily at midnight — don&apos;t miss today&apos;s window
          </p>

          {/* CTA */}
          <button
            onClick={onBookClick}
            className='group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 text-zinc-950 font-medium px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/40 hover:scale-105 inline-flex items-center justify-center gap-3'
          >
            <Calendar className='w-5 h-5 relative z-10' />
            <span className='relative z-10'>Claim Free Transport</span>
            <div className='absolute inset-0 bg-gradient-to-r from-orange-300 via-amber-200 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
          </button>
        </div>
      </div>
    </section>
  );
}
