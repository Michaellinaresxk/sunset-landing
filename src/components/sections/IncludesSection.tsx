'use client';

import {
  Check,
  MapPin,
  Waves,
  ShoppingBag,
  Truck,
  Camera,
  Shield,
} from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

const INCLUDES = [
  { label: 'Round trip transportation', icon: Truck },
  { label: 'Playa Macao beach ride', icon: MapPin },
  { label: 'Scenic river trail', icon: Waves },
  { label: 'Shopping stop', icon: ShoppingBag },
  { label: 'Professional photo ops', icon: Camera },
  { label: 'Safety equipment', icon: Shield },
];

export default function IncludesSection() {
  return (
    <SectionReveal className='py-16 md:py-24 bg-zinc-950 relative overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,191,36,0.04),transparent_50%)]' />

          <div className='max-w-4xl mx-auto px-4 md:px-8 relative z-10'>
            <RevealItem isVisible={isVisible}>
              <h2 className='text-3xl md:text-5xl font-extralight text-white mb-10 md:mb-14 tracking-tight'>
                What&apos;s Included
              </h2>
            </RevealItem>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5'>
              {INCLUDES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <RevealItem key={i} isVisible={isVisible} delay={i * 80}>
                    <div className='flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300'>
                      <div className='w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center flex-shrink-0'>
                        <Icon className='w-4 h-4 text-amber-400' />
                      </div>
                      <span className='text-sm md:text-base text-white/70 font-light'>
                        {item.label}
                      </span>
                      <Check className='w-4 h-4 text-emerald-400/60 ml-auto flex-shrink-0' />
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
