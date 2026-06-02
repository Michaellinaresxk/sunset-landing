'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import Footer from '@/src/components/Footer';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const amount = Number(searchParams.get('amount') ?? 0);

  useEffect(() => {
    if (!sessionId || typeof window.gtag !== 'function') return;
    window.gtag('event', 'purchase', {
      transaction_id: sessionId,
      value: amount,
      currency: 'USD',
    });
  }, [sessionId, amount]);

  return (
    <main className='min-h-screen bg-zinc-950 flex items-center justify-center px-4'>
      <div className='max-w-lg w-full text-center space-y-8'>
        <div className='w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto'>
          <CheckCircle className='w-10 h-10 text-green-400' />
        </div>

        <div className='space-y-3'>
          <h1 className='text-4xl md:text-5xl font-extralight text-white tracking-tight'>
            Booking Confirmed
          </h1>
          <p className='text-white/60 font-light text-lg'>
            Your sunset horseback riding experience has been reserved.
          </p>
        </div>

        <div className='bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4'>
          <div className='flex items-center gap-3 text-white/70'>
            <Calendar className='w-5 h-5 text-amber-400' />
            <span className='text-sm font-light'>
              Check your email for full booking details and pickup instructions.
            </span>
          </div>
          {sessionId && (
            <p className='text-xs text-white/30 font-mono break-all'>
              Reference: {sessionId}
            </p>
          )}
        </div>

        <Link
          href='/'
          className='inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 text-zinc-950 font-medium hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105'
        >
          Back to Home
          <ArrowRight className='w-4 h-4' />
        </Link>
      </div>
      <Footer />
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className='min-h-screen bg-zinc-950 flex items-center justify-center'>
          <div className='text-white/40'>Loading...</div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
