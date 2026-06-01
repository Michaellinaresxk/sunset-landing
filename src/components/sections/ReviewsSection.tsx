'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';

// ─── CONFIG ───────────────────────────────────────────────────
const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps?cid=3708423153448984480';

// ─── DATA ─────────────────────────────────────────────────────
// Replace with your real Google reviews.
// Each review links to your Google profile page.
const REVIEWS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    date: 'April 2025',
    stars: 5,
    initials: 'SM',
    country: '🇺🇸',
    text: 'Absolutely unforgettable experience! The sunset ride along Playa Macao was the highlight of our entire trip to Punta Cana. Our guide was incredibly patient and made us feel safe the whole time. Hotel pickup was right on time. 100% worth it!',
  },
  {
    id: 2,
    name: 'James Thornton',
    date: 'February 2025',
    stars: 5,
    initials: 'JT',
    country: '🇬🇧',
    text: "We booked this for our anniversary and it exceeded all expectations. Watching the sun go down over the ocean while on horseback is something we'll never forget. The horses were well cared for and the guide spoke great English. Much better price than the resort excursion desk.",
  },
  {
    id: 3,
    name: 'Camille Fontaine',
    date: 'March 2025',
    stars: 5,
    initials: 'CF',
    country: '🇫🇷',
    text: 'Neither of us had ridden a horse before and we were a little nervous, but the guide was so calm and helpful that we felt comfortable within minutes. The beach was stunning. The coffee and mamajuana stop at the end was a lovely touch!',
  },
  {
    id: 4,
    name: 'Marco Delgado',
    date: 'January 2025',
    stars: 5,
    initials: 'MD',
    country: '🇨🇦',
    text: 'Came here with my family including two kids (8 and 11). The staff was amazing with the children — extra attentive and made sure they had a great time. The horses are gentle and the river trail was a wonderful surprise. Free hotel pickup sealed the deal for us.',
  },
  {
    id: 5,
    name: 'Lena Brandt',
    date: 'December 2024',
    stars: 5,
    initials: 'LB',
    country: '🇩🇪',
    text: 'The golden hour light on the beach was just magical. I took so many photos from horseback! Our guide was funny, professional and very knowledgeable about the area. We booked online the night before with no issues. Highly recommended.',
  },
  {
    id: 6,
    name: 'Tyler Okafor',
    date: 'March 2025',
    stars: 5,
    initials: 'TO',
    country: '🇺🇸',
    text: 'Best excursion we did in Punta Cana, and we did a lot of them. The sunset timing is perfect — you hit the beach right when the light turns golden. Small group, attentive guide, horses in great shape. Skip the resort tours and book directly here.',
  },
];

// ─── HELPERS ──────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < count ? 'text-amber-400 fill-amber-400' : 'text-white/20'
          }`}
        />
      ))}
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────

function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    // Each card links to Google Reviews
    <a
      href={GOOGLE_REVIEWS_URL}
      target='_blank'
      rel='noopener noreferrer'
      className='flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[38vw] lg:w-[30vw] snap-start group'
    >
      <div className='flex flex-col gap-4 p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/8 group-hover:border-amber-500/30 group-hover:bg-white/[0.06] transition-all duration-400 h-full cursor-pointer'>
        {/* Stars + Google dots */}
        <div className='flex items-center justify-between'>
          <Stars count={review.stars} />
          {/* Google brand dots */}
          <span className='flex items-center gap-0.5'>
            <span className='w-1.5 h-1.5 rounded-full bg-[#4285F4]' />
            <span className='w-1.5 h-1.5 rounded-full bg-[#EA4335]' />
            <span className='w-1.5 h-1.5 rounded-full bg-[#FBBC05]' />
            <span className='w-1.5 h-1.5 rounded-full bg-[#34A853]' />
          </span>
        </div>

        {/* Review text */}
        <p className='text-sm md:text-base text-white/60 font-light leading-relaxed flex-1 group-hover:text-white/75 transition-colors duration-300'>
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Author */}
        <div className='flex items-center gap-3 pt-3 border-t border-white/5'>
          <div className='w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0'>
            <span className='text-xs font-medium text-amber-300'>
              {review.initials}
            </span>
          </div>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-1.5'>
              <span className='text-sm font-medium text-white truncate'>
                {review.name}
              </span>
              <span className='text-sm leading-none'>{review.country}</span>
            </div>
            <span className='text-xs text-white/30 font-light'>
              {review.date} · Google
            </span>
          </div>
          {/* Subtle external link hint on hover */}
          <ChevronRight className='w-4 h-4 text-white/0 group-hover:text-amber-400/60 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 flex-shrink-0' />
        </div>
      </div>
    </a>
  );
}

// ─── SECTION ──────────────────────────────────────────────────

export default function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const avgRating = (
    REVIEWS.reduce((sum, r) => sum + r.stars, 0) / REVIEWS.length
  ).toFixed(1);

  // ── Track scroll position ──────────────────────────────────
  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = el.firstElementChild?.clientWidth ?? 1;
    const gap = 12;
    setActiveIndex(Math.round(el.scrollLeft / (itemWidth + gap)));
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateState, { passive: true });
    updateState();
    return () => el.removeEventListener('scroll', updateState);
  }, [updateState]);

  // ── Arrow navigation ───────────────────────────────────────
  const scrollTo = useCallback((direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = el.firstElementChild?.clientWidth ?? 300;
    const gap = 12;
    el.scrollBy({
      left: direction === 'next' ? itemWidth + gap : -(itemWidth + gap),
      behavior: 'smooth',
    });
  }, []);

  return (
    <SectionReveal className='py-16 md:py-24 bg-zinc-950 relative overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.04),transparent_60%)]' />

          <div className='relative z-10'>
            {/* ── Header ────────────────────────────────────── */}
            <RevealItem isVisible={isVisible}>
              <div className='max-w-6xl mx-auto px-4 md:px-8'>
                <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 md:mb-10'>
                  <div>
                    <h2 className='text-3xl md:text-5xl font-extralight text-white tracking-tight mb-2'>
                      What Our Guests Say
                    </h2>
                    <p className='text-white/40 font-light text-sm'>
                      Real reviews from Google — no filters, no edits
                    </p>
                  </div>

                  <div className='flex items-center gap-4 flex-shrink-0'>
                    {/* Aggregate rating */}
                    <a
                      href={GOOGLE_REVIEWS_URL}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-3 px-4 py-2.5 rounded-xl bg-amber-500/[0.08] border border-amber-500/15 hover:border-amber-500/30 transition-colors'
                    >
                      <div>
                        <div className='text-2xl font-light text-white leading-none'>
                          {avgRating}
                        </div>
                        <Stars count={5} />
                      </div>
                      <div className='pl-3 border-l border-amber-500/15'>
                        <div className='text-xs text-white/40 font-light'>
                          {REVIEWS.length}+ reviews
                        </div>
                        <div className='text-xs text-amber-400/60 font-light mt-0.5'>
                          Google
                        </div>
                      </div>
                    </a>

                    {/* Arrow buttons — hidden on mobile */}
                    <div className='hidden md:flex items-center gap-2'>
                      <button
                        onClick={() => scrollTo('prev')}
                        disabled={!canScrollLeft}
                        className='w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all disabled:opacity-25 disabled:cursor-not-allowed'
                        aria-label='Previous review'
                      >
                        <ChevronLeft className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => scrollTo('next')}
                        disabled={!canScrollRight}
                        className='w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all disabled:opacity-25 disabled:cursor-not-allowed'
                        aria-label='Next review'
                      >
                        <ChevronRight className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </RevealItem>

            {/* ── Carousel ──────────────────────────────────── */}
            <RevealItem isVisible={isVisible} delay={150}>
              <div
                ref={scrollRef}
                className='flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-2'
              >
                {REVIEWS.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}

                {/* Trailing spacer so last card doesn't hug the edge */}
                <div className='flex-shrink-0 w-4 md:w-8' aria-hidden='true' />
              </div>
            </RevealItem>

            {/* ── Dots + Google CTA ─────────────────────────── */}
            <RevealItem isVisible={isVisible} delay={300}>
              <div className='max-w-6xl mx-auto px-4 md:px-8 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
                {/* Dots */}
                <div className='flex items-center gap-1.5'>
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const el = scrollRef.current;
                        if (!el) return;
                        const itemWidth =
                          el.firstElementChild?.clientWidth ?? 300;
                        el.scrollTo({
                          left: i * (itemWidth + 12),
                          behavior: 'smooth',
                        });
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? 'w-5 bg-amber-400'
                          : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Google CTA button */}
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/12 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/22 transition-all duration-300 group'
                >
                  <span className='flex items-center gap-0.5'>
                    <span className='w-2 h-2 rounded-full bg-[#4285F4]' />
                    <span className='w-2 h-2 rounded-full bg-[#EA4335]' />
                    <span className='w-2 h-2 rounded-full bg-[#FBBC05]' />
                    <span className='w-2 h-2 rounded-full bg-[#34A853]' />
                  </span>
                  <span className='text-sm text-white/50 group-hover:text-white/80 transition-colors font-light'>
                    Read all reviews on Google
                  </span>
                  <ChevronRight className='w-3.5 h-3.5 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300' />
                </a>
              </div>
            </RevealItem>
          </div>
        </>
      )}
    </SectionReveal>
  );
}
