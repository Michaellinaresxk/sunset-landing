// src/components/ScrollToHashHandler.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToHashHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const timeout = setTimeout(() => {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
