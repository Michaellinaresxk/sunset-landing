'use client';

import { XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BookingCancelPage() {
  return (
    <main className='min-h-screen bg-zinc-950 flex items-center justify-center px-4'>
      <div className='max-w-lg w-full text-center space-y-8'>
        <div className='w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto'>
          <XCircle className='w-10 h-10 text-amber-400' />
        </div>

        <div className='space-y-3'>
          <h1 className='text-4xl md:text-5xl font-extralight text-white tracking-tight'>
            Booking Cancelled
          </h1>
          <p className='text-white/60 font-light text-lg'>
            No worries — your golden hour is still waiting for you.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 text-zinc-950 font-medium hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105'
          >
            Try Again
            <ArrowRight className='w-4 h-4' />
          </Link>
        </div>
      </div>
    </main>
  );
}
