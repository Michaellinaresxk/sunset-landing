// ImageGallery.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { GALLERY_IMAGES } from '@/src/constants';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

export default function ImageGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.firstElementChild?.clientWidth ?? 1;
      setActiveIndex(Math.round(scrollLeft / (itemWidth + 12)));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SectionReveal className='py-8 md:py-20 bg-white relative overflow-hidden'>
      {(isVisible) => (
        <RevealItem isVisible={isVisible}>
          {/* Header */}
          <div className='flex items-center gap-2 px-4 md:px-8 mb-4 md:mb-8'>
            <Camera className='w-4 h-4 text-amber-500' />
            <h2 className='text-xl md:text-4xl font-extralight text-zinc-900 tracking-tight'>
              Experience Gallery
            </h2>
          </div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className='flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-4'
          >
            {GALLERY_IMAGES.map((image) => (
              <div
                key={image.id}
                className='flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[30vw] snap-start'
              >
                <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shadow-zinc-200'>
                  <img
                    src={image.src}
                    alt={image.title}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-zinc-950/60 to-transparent'>
                    <h3 className='text-sm md:text-base font-light text-white'>
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className='flex justify-center gap-1.5 mt-3 md:hidden'>
            {GALLERY_IMAGES.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-4 bg-amber-400' : 'w-1.5 bg-zinc-300'
                }`}
              />
            ))}
          </div>
        </RevealItem>
      )}
    </SectionReveal>
  );
}
