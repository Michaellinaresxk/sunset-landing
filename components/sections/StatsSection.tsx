'use client';

import { STATS } from '@/constants';
import SectionReveal, { RevealItem } from '@/components/ui/SectionReveal';

export default function StatsSection() {
  return (
    <SectionReveal className='py-20 md:py-32 bg-zinc-950 border-y border-white/5 relative overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.02),transparent_50%)]' />
          <div className='max-w-7xl mx-auto px-4 md:px-8 relative z-10'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <RevealItem key={i} isVisible={isVisible} delay={i * 100} className='text-center'>
                    <Icon className='w-8 h-8 md:w-10 md:h-10 text-amber-300 mx-auto mb-4' />
                    <div className='text-4xl md:text-6xl font-light text-white mb-2'>{stat.number}</div>
                    <div className='text-sm md:text-base text-white/40 font-light'>{stat.label}</div>
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
