'use client';

import { GALLERY_IMAGES } from '@/src/constants';

import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

export default function ImageGallery() {
  return (
    <SectionReveal className='py-10 md:py-20 bg-white relative overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.06),transparent_50%)]' />

          <div className='max-w-7xl mx-auto px-4 md:px-8 relative z-10'>
            {/* Image gallery */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8'>
              {GALLERY_IMAGES.map((image, i) => (
                <RevealItem
                  key={image.id}
                  isVisible={isVisible}
                  delay={(i + 3) * 200}
                >
                  <div className='group relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg shadow-zinc-200 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-amber-200/50'>
                    <img
                      src={image.src}
                      alt={image.title}
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700' />
                    <div className='absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                      <h3 className='text-base md:text-xl font-light text-white'>
                        {image.title}
                      </h3>
                    </div>
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
