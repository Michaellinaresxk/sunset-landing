'use client';

import {
  MapPin,
  Waves,
  ShoppingBag,
  Truck,
  Camera,
  Shield,
} from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

const INCLUDES = [
  { label: 'Round trip transportation (limited offer)', icon: Truck },
  { label: 'Playa Macao beach ride', icon: MapPin },
  { label: 'Scenic river trail', icon: Waves },
  { label: 'Shopping stop', icon: ShoppingBag },
  { label: 'Professional photo (not included)', icon: Camera },
  { label: 'Professional guide', icon: Shield },
];

export default function IncludesSection() {
  return (
    <SectionReveal className='py-10 md:py-24 bg-zinc-950 relative overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,191,36,0.04),transparent_50%)]' />

          <div className='max-w-4xl mx-auto px-4 md:px-8 relative z-10'>
            <RevealItem isVisible={isVisible}>
              <h2 className='text-xl md:text-5xl font-extralight text-white mb-6 md:mb-14 tracking-tight'>
                What&apos;s Included
              </h2>
            </RevealItem>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5'>
              {INCLUDES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <RevealItem key={i} isVisible={isVisible} delay={i * 80}>
                    <div className='flex flex-col items-center text-center gap-2 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 h-full'>
                      <div className='w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center flex-shrink-0'>
                        <Icon className='w-4 h-4 text-amber-400' />
                      </div>
                      <span className='text-[11px] md:text-sm text-white/60 font-light leading-snug'>
                        {item.label}
                      </span>
                    </div>
                  </RevealItem>
                );
              })}
            </div>
          </div>
        </>
      )}
    </SectionReveal>
  );
}
