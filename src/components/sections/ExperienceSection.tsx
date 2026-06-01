'use client';

import { EXPERIENCE_STEPS, EXPERIENCE_BG } from '@/src/constants';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

export default function ExperienceSection() {
  return (
    <SectionReveal className='py-20 md:py-32 relative overflow-hidden'>
      {(isVisible) => (
        <>
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${EXPERIENCE_BG})` }}
          />
          <div className='absolute inset-0 bg-zinc-900/75' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.15),transparent_50%)]' />

          <div className='max-w-7xl mx-auto px-4 md:px-8 relative z-10'>
            <RevealItem
              isVisible={isVisible}
              className='text-center mb-12 md:mb-20'
            >
              <h2 className='text-4xl md:text-6xl lg:text-7xl font-extralight text-white mb-4 tracking-tighter'>
                The Journey
              </h2>
              <p className='text-base md:text-lg text-white/70 font-light'>
                Your Moment Awaits — A Sunset Horseback Ride Like No Other
              </p>
            </RevealItem>

            {/* Mobile */}
            <div className='grid grid-cols-2 gap-3 lg:hidden'>
              {EXPERIENCE_STEPS.map((exp, i) => (
                <RevealItem key={i} isVisible={isVisible} delay={i * 100}>
                  <div className='bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl'>
                    <div className='text-4xl font-extralight text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-orange-400 mb-2'>
                      {exp.number}
                    </div>
                    <h3 className='text-base font-light text-white mb-1 leading-tight'>
                      {exp.title}
                    </h3>
                    <p className='text-xs text-white/70 font-light leading-relaxed'>
                      {exp.desc}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </div>

            {/* Desktop */}
            <div className='hidden lg:grid lg:grid-cols-4 gap-6'>
              {EXPERIENCE_STEPS.map((exp, i) => (
                <RevealItem key={i} isVisible={isVisible} delay={i * 150}>
                  <div className='bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl transition-all duration-1000 hover:scale-105 hover:bg-white/15 hover:shadow-2xl hover:shadow-amber-500/30'>
                    <div className='text-6xl font-extralight text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-orange-400 mb-4'>
                      {exp.number}
                    </div>
                    <h3 className='text-xl font-light text-white mb-3 tracking-tight leading-tight'>
                      {exp.title}
                    </h3>
                    <p className='text-sm text-white/70 font-light leading-relaxed'>
                      {exp.desc}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </>
      )}
    </SectionReveal>
  );
}
