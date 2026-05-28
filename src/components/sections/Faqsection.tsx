'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

const FAQ_ITEMS = [
  {
    question: 'Do I need horseback riding experience?',
    answer:
      'No experience is required. Our bilingual guides provide a full safety briefing and match you with a horse suited to your comfort level. The ride is suitable for complete beginners and experienced riders alike.',
  },
  {
    question: 'What is included in the price?',
    answer:
      'Your ticket includes round-trip hotel pickup and drop-off, a 2-hour guided horseback ride along Playa Macao beach and river trail, safety equipment, a bilingual guide, and a Dominican coffee & mamajuana tasting stop.',
  },
  {
    question: 'Is hotel pickup really included?',
    answer:
      'Yes — round-trip transport from your hotel in Bávaro, Punta Cana, Cap Cana, or Uvero Alto is included in the price at no extra charge. Our driver picks you up and brings you back.',
  },
  {
    question: 'How long is the horseback ride?',
    answer:
      'The ride itself is approximately 2 hours. Including hotel pickup and drop-off, plan for about 3–4 hours total.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Free cancellation up to 24 hours before your scheduled experience for a full refund.',
  },
  {
    question: 'What should I wear?',
    answer:
      'Closed-toe shoes are required (no sandals or flip-flops). Wear comfortable clothing suitable for warm weather. We recommend bringing sunscreen and mosquito repellent.',
  },
  {
    question: 'Is this safe for children?',
    answer:
      'Children aged 7 and above can participate with a parent or guardian. Our horses are gentle and trained for tourist activities, and guides provide extra attention to young riders.',
  },
  {
    question: 'What happens if it rains?',
    answer:
      'Tours run rain or shine — a little tropical rain adds to the adventure! We only cancel in extreme weather conditions, in which case you can reschedule or receive a full refund.',
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className='border border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-white/10'>
      <button
        onClick={onToggle}
        className='w-full text-left px-5 py-4 flex items-center justify-between gap-4'
      >
        <span className='text-sm md:text-base text-white/80 font-light'>
          {item.question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-amber-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className='px-5 pb-4 text-sm text-white/50 font-light leading-relaxed'>
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionReveal className='py-16 md:py-24 bg-zinc-950 relative overflow-hidden'>
      {(isVisible) => (
        <div className='max-w-3xl mx-auto px-4 md:px-8 relative z-10'>
          <RevealItem isVisible={isVisible}>
            <div className='flex items-center gap-3 mb-8 md:mb-12'>
              <div className='w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center'>
                <HelpCircle className='w-4 h-4 text-amber-400' />
              </div>
              <h2 className='text-3xl md:text-5xl font-extralight text-white tracking-tight'>
                Frequently Asked Questions
              </h2>
            </div>
          </RevealItem>

          <div className='space-y-2'>
            {FAQ_ITEMS.map((item, i) => (
              <RevealItem key={i} isVisible={isVisible} delay={i * 60}>
                <FAQItem
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </RevealItem>
            ))}
          </div>
        </div>
      )}
    </SectionReveal>
  );
}
