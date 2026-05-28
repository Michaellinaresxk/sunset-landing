'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

// SEO: Moved paragraphs to constants for easier management,
// but keeping inline here so the component is self-contained.
const DESCRIPTION_PARAGRAPHS = [
  'Explore the breathtaking beauty of Playa Macao on horseback as you ride along its pristine shores. This 2-hour guided horseback riding tour in Punta Cana includes round-trip hotel pickup from Bávaro, Cap Cana, and surrounding resort areas — one of the top-rated things to do in Punta Cana for couples, families, and groups.',
  'On arrival at the ranch, meet your bilingual guide and be paired with a horse that matches your skill level. Get equipped with all necessary safety gear and step into the saddle. No prior horseback riding experience is required — our guides provide hands-on instruction suitable for complete beginners and experienced riders alike.',
  'Ride along the stunning Playa Macao, where golden sands meet turquoise Caribbean waters, offering a breathtaking backdrop for your vacation memories. Continue your journey through a scenic river trail surrounded by tropical vegetation and Dominican countryside.',
  'As the sun sets over the Atlantic, enjoy the golden hour from horseback — one of the most unforgettable sunset experiences in the Dominican Republic. At the end of your tour, enjoy a complimentary return transfer back to your hotel.',
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
