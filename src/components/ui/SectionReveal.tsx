'use client';

import { useIntersectionObserver } from '@/src/hooks';

interface SectionRevealProps {
  children: (isVisible: boolean) => React.ReactNode;
  className?: string;
}

export default function SectionReveal({
  children,
  className = '',
}: SectionRevealProps) {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section ref={elementRef} className={className}>
      {children(isVisible)}
    </section>
  );
}

// Reusable animated wrapper for individual items
export function RevealItem({
  isVisible,
  delay = 0,
  children,
  className = '',
}: {
  isVisible: boolean;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
