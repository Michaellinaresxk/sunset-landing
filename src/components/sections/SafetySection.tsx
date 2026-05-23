'use client';

import {
  AlertTriangle,
  Weight,
  Footprints,
  HeartPulse,
  CloudRain,
  ShieldCheck,
  Heart,
  Sun,
  Accessibility,
} from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';
import ImportantNotesSection from '../ui/ImportantNotesSection';

const SAFETY_ITEMS = [
  {
    icon: Weight,
    text: 'Maximum weight: 300 lbs (136 kg)',
  },
  {
    icon: Footprints,
    text: 'Closed-toe shoes required (no sandals)',
  },
  {
    icon: HeartPulse,
    text: 'Not recommended for pregnant women',
  },
  {
    icon: Accessibility,
    text: 'Not recommended for people with mobility issues',
  },
  {
    icon: CloudRain,
    text: 'Weather dependent — may be rescheduled',
  },
  {
    icon: ShieldCheck,
    text: 'All riders must follow guide instructions',
  },
];

export default function SafetySection() {
  return (
    <SectionReveal className='py-16 md:py-24 bg-zinc-950 relative overflow-hidden'>
      {(isVisible) => (
        <div className='max-w-4xl mx-auto px-4 md:px-8 relative z-10'>
          <RevealItem isVisible={isVisible}>
            <div className='flex items-center gap-3 mb-10 md:mb-14'>
              <div className='w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center'>
                <AlertTriangle className='w-4 h-4 text-orange-400' />
              </div>
              <h2 className='text-3xl md:text-5xl font-extralight text-white tracking-tight'>
                Safety & Requirements
              </h2>
            </div>
          </RevealItem>

          <div className='grid grid-cols-2 gap-3'>
            {SAFETY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealItem key={i} isVisible={isVisible} delay={i * 80}>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5'>
                    <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0'>
                      <Icon className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40' />
                    </div>
                    <span className='text-xs sm:text-sm md:text-base text-white/50 font-light leading-snug'>
                      {item.text}
                    </span>
                  </div>
                </RevealItem>
              );
            })}
          </div>

          {/* Notices */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 md:mt-12'>
            <RevealItem isVisible={isVisible} delay={500}>
              <div className='rounded-2xl p-5 bg-amber-500/[0.04] border border-amber-500/10'>
                <div className='flex items-center gap-2.5 mb-3'>
                  <Heart className='w-4 h-4 text-amber-400' />
                  <h3 className='text-sm font-medium text-amber-300'>
                    About Our Dominican Horses
                  </h3>
                </div>
                <p className='text-xs sm:text-sm text-white/40 font-light leading-relaxed mb-3'>
                  Dominican horses are different from European horses —
                  they&apos;re perfectly adapted to tropical climate and
                  terrain. Our horses are well-cared for, regularly
                  veterinarian-checked, and trained specifically for tourist
                  activities.
                </p>
                <p className='text-xs sm:text-sm text-white/40 font-light leading-relaxed'>
                  We follow all animal welfare standards and treat our horses
                  with utmost respect and care.
                </p>
              </div>
            </RevealItem>

            <RevealItem isVisible={isVisible} delay={600}>
              <div className='rounded-2xl p-5 bg-sky-500/[0.04] border border-sky-500/10'>
                <div className='flex items-center gap-2.5 mb-3'>
                  <Sun className='w-4 h-4 text-sky-400' />
                  <h3 className='text-sm font-medium text-sky-300'>
                    Weather Policy
                  </h3>
                </div>
                <p className='text-xs sm:text-sm text-white/40 font-light leading-relaxed'>
                  Tours continue rain or shine! We only cancel in extreme
                  weather conditions. Your adventure awaits regardless of a
                  little tropical rain.
                </p>
              </div>
            </RevealItem>
          </div>

          <ImportantNotesSection />
        </div>
      )}
    </SectionReveal>
  );
}
