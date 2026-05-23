'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

const DESCRIPTION_PARAGRAPHS = [
  'Explore the breathtaking beauty of Playa Macao on horseback as you ride along its pristine shores. Discover a scenic river and connect with nature on this guided horse-riding tour with transfers from Punta Cana.',
  'On arrival, meet your guide and be paired with a horse that matches your skill level. Get equipped with all the necessary safety equipment, and step up to the saddle. No prior experience is required, as your guide will provide support and instruction to make this experience suitable for all skill levels.',
  'Ride along the stunning Playa Macao, where golden sands meet the blue waters, offering a picturesque backdrop to capture timeless vacation memories. Then, continue your journey towards a serene river and admire the crystal-clear waters.',
  'Create unforgettable memories and connect with nature as you explore your lush environment on horseback. At the end of your tour, enjoy a return transfer back to your hotel.',
];

export default function DescriptionSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleParagraphs = isExpanded
    ? DESCRIPTION_PARAGRAPHS
    : DESCRIPTION_PARAGRAPHS.slice(0, 2);

  return (
    <SectionReveal className='py-16 md:py-24 bg-zinc-950 relative overflow-hidden'>
      {(isVisible) => (
        <div className='max-w-4xl mx-auto px-4 md:px-8 relative z-10'>
          <RevealItem isVisible={isVisible}>
            <h2 className='text-3xl md:text-5xl font-extralight text-white mb-8 md:mb-12 tracking-tight'>
              About the Experience
            </h2>
          </RevealItem>

          <div className='space-y-6 relative'>
            {visibleParagraphs.map((paragraph, i) => (
              <RevealItem key={i} isVisible={isVisible} delay={i * 100}>
                <p className='text-base md:text-lg text-white/60 font-light leading-relaxed'>
                  {paragraph}
                </p>
              </RevealItem>
            ))}

            {/* Fade overlay when collapsed */}
            {!isExpanded && DESCRIPTION_PARAGRAPHS.length > 2 && (
              <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none' />
            )}
          </div>

          {DESCRIPTION_PARAGRAPHS.length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='mt-6 flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group'
            >
              <span className='text-sm font-medium'>
                {isExpanded ? 'Show less' : 'Read more'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
        </div>
      )}
    </SectionReveal>
  );
}
