'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import ContactModal from '@/src/components/ContactModal';

export default function FooterContactButton() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsContactOpen(true)}
        className='flex items-center gap-3 text-white/60 hover:text-white transition-colors group'
      >
        <span className='w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors flex-shrink-0'>
          <Mail className='w-3.5 h-3.5 text-white/50' />
        </span>
        <span className='text-sm'>Send us a message</span>
      </button>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
