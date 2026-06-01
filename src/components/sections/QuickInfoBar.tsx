'use client';

import { Clock, CalendarDays, Users, DollarSign, Car } from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

const INFO_ITEMS = [
  {
    icon: Clock,
    title: 'Duration',
    value: '2 Hours',
  },
  {
    icon: CalendarDays,
    title: 'Schedule',
    value: 'Every Day',
  },
  {
    icon: Users,
    title: 'Ages',
    value: 'From 7 years',
  },
  {
    icon: Car,
    title: 'Transport',
    value: 'Free hotel pickup',
    highlight: true,
  },
  {
    icon: DollarSign,
    title: 'From',
    value: '$65 / person',
  },
];

export default function QuickInfoBar() {
  return (
    <SectionReveal className='py-10 md:py-14 bg-zinc-950 border-y border-white/5 relative overflow-hidden'>
      {(isVisible) => (
        <div className='max-w-5xl mx-auto px-4 md:px-8'>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4'>
            {INFO_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealItem
                  key={i}
                  isVisible={isVisible}
                  delay={i * 100}
                  className='flex items-center gap-4'
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                      item.highlight
                        ? 'bg-emerald-500/10 border-emerald-500/15'
                        : 'bg-amber-500/10 border-amber-500/15'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        item.highlight ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    />
                  </div>
                  <div>
                    <div className='text-sm font-medium text-white'>
                      {item.title}
                    </div>
                    <div
                      className={`text-xs font-light ${
                        item.highlight ? 'text-emerald-300/70' : 'text-white/40'
                      }`}
                    >
                      {item.value}
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </div>
      )}
    </SectionReveal>
  );
}
