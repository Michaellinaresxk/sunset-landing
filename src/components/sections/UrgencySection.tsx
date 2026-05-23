'use client';

import { Zap, TrendingUp } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_SUBJECT, CONTACT_BODY } from '@/src/constants';
import SectionReveal from '@/src/components/ui/SectionReveal';
import GradientButton from '@/src/components/ui/GradientButton';

export default function UrgencySection() {
  const handleContactClick = () => {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${CONTACT_SUBJECT}&body=${CONTACT_BODY}`;
  };

  return (
    <SectionReveal className='py-16 md:py-24 bg-zinc-950 border-y border-amber-500/20 relative overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.05),transparent_50%)]' />
          <div className='max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10'>
            <div
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6'>
                <Zap className='w-4 h-4 text-amber-400 animate-pulse' />
                <span className='text-amber-300 text-sm font-light tracking-wider uppercase'>
                  Personal Support
                </span>
              </div>

              <h3 className='text-3xl md:text-5xl font-light text-white mb-4'>
                Need Booking Assistance?
              </h3>
              <p className='text-white/60 font-light mb-8 text-base md:text-lg'>
                Email us directly—we&apos;ll contact you and help plan your
                perfect sunset ride.
              </p>

              <GradientButton onClick={handleContactClick} icon={TrendingUp}>
                Get Assistance
              </GradientButton>
            </div>
          </div>
        </>
      )}
    </SectionReveal>
  );
}
