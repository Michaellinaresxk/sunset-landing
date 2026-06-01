'use client';

import {
  ShieldCheck,
  CalendarDays,
  CreditCard,
  Check,
  Car,
} from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';
import GradientButton from '@/src/components/ui/GradientButton';
import { SectionProps } from '@/src/types';

const VALUE_PROPS = [
  {
    icon: Car,
    title: 'Hotel Pickup & Drop-off',
    desc: 'We pick you up from your Bávaro or Punta Cana hotel and bring you back — included in the price.',
    highlight: true,
  },
  {
    icon: CreditCard,
    title: 'Book Direct — Best Price',
    desc: 'No middleman fees. You pay less than Viator or GetYourGuide for the same experience.',
  },
  {
    icon: ShieldCheck,
    title: 'Free Cancellation',
    desc: 'Changed your plans? Cancel up to 24 hours before for a full refund, no questions asked.',
  },
  {
    icon: CalendarDays,
    title: 'Available Every Day',
    desc: 'No blackout dates — ride any day of the week, including holidays. Just pick your date.',
  },
];

const VALUE_BG =
  'https://res.cloudinary.com/ddg92xar5/image/upload/f_auto,q_auto,w_1920/v1755946811/image00043_s1jla3.jpg';

export default function ValueBanner({ onBookClick }: SectionProps) {
  return (
    <SectionReveal className='relative py-20 md:py-32 overflow-hidden'>
      {(isVisible) => (
        <>
          {/* Background */}
          <div className='absolute inset-0'>
            <img src={VALUE_BG} alt='' className='w-full h-full object-cover' />
            <div className='absolute inset-0 bg-zinc-950/80' />
            <div className='absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950/80' />
          </div>

          {/* Top/bottom lines */}
          <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent' />
          <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent' />

          <div className='relative z-10 max-w-5xl mx-auto px-4 md:px-8'>
            {/* Header */}
            <RevealItem
              isVisible={isVisible}
              className='text-center mb-12 md:mb-16'
            >
              <h2 className='text-3xl sm:text-4xl md:text-5xl font-extralight text-white tracking-tight leading-tight mb-4'>
                Why Book Direct With Us
              </h2>
              <p className='text-sm sm:text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto'>
                Skip the booking platforms — get a better price, better service,
                and everything included
              </p>
            </RevealItem>

            {/* Value props grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16'>
              {VALUE_PROPS.map((prop, i) => {
                const Icon = prop.icon;
                return (
                  <RevealItem key={i} isVisible={isVisible} delay={i * 120}>
                    <div
                      className={`rounded-2xl p-5 md:p-6 border backdrop-blur-sm transition-all duration-500 h-full ${
                        prop.highlight
                          ? 'bg-emerald-500/[0.08] border-emerald-500/20'
                          : 'bg-white/[0.05] border-white/10'
                      }`}
                    >
                      <div className='flex items-start gap-4'>
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            prop.highlight
                              ? 'bg-emerald-500/20'
                              : 'bg-amber-500/10'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              prop.highlight
                                ? 'text-emerald-400'
                                : 'text-amber-400'
                            }`}
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1.5'>
                            <h3
                              className={`text-sm md:text-base font-medium ${
                                prop.highlight
                                  ? 'text-emerald-300'
                                  : 'text-white'
                              }`}
                            >
                              {prop.title}
                            </h3>
                            {prop.highlight && (
                              <span className='px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-medium rounded-full'>
                                INCLUDED
                              </span>
                            )}
                          </div>
                          <p className='text-xs md:text-sm text-white/40 font-light leading-relaxed'>
                            {prop.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </div>

            {/* CTA */}
            <RevealItem
              isVisible={isVisible}
              delay={500}
              className='text-center'
            >
              <GradientButton onClick={onBookClick} showArrow>
                Book Now — From $65/person
              </GradientButton>

              <div className='flex items-center justify-center gap-4 mt-6 text-xs text-white/30'>
                <span className='flex items-center gap-1'>
                  <Check className='w-3 h-3 text-emerald-400' />
                  Secure payment
                </span>
                <span className='flex items-center gap-1'>
                  <Check className='w-3 h-3 text-emerald-400' />
                  Instant confirmation
                </span>
                <span className='flex items-center gap-1'>
                  <Check className='w-3 h-3 text-emerald-400' />
                  24h free cancellation
                </span>
              </div>
            </RevealItem>
          </div>
        </>
      )}
    </SectionReveal>
  );
}
