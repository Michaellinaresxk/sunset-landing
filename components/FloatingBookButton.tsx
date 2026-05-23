'use client';

import { Calendar } from 'lucide-react';

interface FloatingBookButtonProps {
  onClick: () => void;
}

export default function FloatingBookButton({ onClick }: FloatingBookButtonProps) {
  return (
    <button
      onClick={onClick}
      className='fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 group'
      aria-label='Book now'
    >
      <div className='w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 flex items-center justify-center shadow-2xl shadow-amber-500/50 transition-all duration-500 group-hover:scale-110'>
        <Calendar className='w-6 h-6 md:w-9 md:h-9 text-zinc-950' />
      </div>
    </button>
  );
}
