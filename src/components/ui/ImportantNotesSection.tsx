// ImportantNotesSection.tsx
'use client';

import { Info } from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

const NOTES = [
  {
    emoji: '🦟',
    text: 'Bring mosquito repellent.',
  },
  {
    emoji: '🐎',
    text: 'Caribbean horses are smaller but well cared for.',
  },
  {
    emoji: '🌊',
    text: 'Sargassum season — some seaweed on the beach.',
  },
  {
    emoji: '☕',
    text: '10–15 min coffee & mamajuana tasting stop.',
  },
  {
    emoji: '⚠️',
    text: 'Follow the guide — do not pass other riders.',
  },
  {
    emoji: '🛍️',
    text: 'Small shopping opportunity included.',
  },
];

export default function ImportantNotesSection() {
  return (
    <SectionReveal className='py-10 md:py-16 bg-zinc-950 relative overflow-hidden'>
      {(isVisible) => (
        <div className='max-w-4xl mx-auto px-4 md:px-8'>
          <RevealItem isVisible={isVisible}>
            <div className='flex items-center gap-2 mb-4 md:mb-8'>
              <Info className='w-4 h-4 text-amber-400' />
              <h2 className='text-xl md:text-3xl font-extralight text-white tracking-tight'>
                Good to Know
              </h2>
            </div>
          </RevealItem>

          <div className='grid grid-cols-2 gap-2 md:gap-3'>
            {NOTES.map((note, i) => (
              <RevealItem key={i} isVisible={isVisible} delay={i * 80}>
                <div className='flex flex-col gap-1.5 p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/10 h-full'>
                  <span className='text-base leading-none'>{note.emoji}</span>
                  <p className='text-[11px] md:text-sm text-white/50 font-light leading-snug'>
                    {note.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      )}
    </SectionReveal>
  );
}
