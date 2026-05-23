'use client';

import { ArrowRight } from 'lucide-react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ElementType;
  showArrow?: boolean;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  md: 'px-10 py-4 text-base',
  lg: 'px-12 py-4 text-base md:text-lg',
  xl: 'px-12 md:px-20 py-5 md:py-7 text-base md:text-xl',
};

export default function GradientButton({
  children,
  onClick,
  icon: Icon,
  showArrow = false,
  size = 'md',
  className = '',
}: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 text-zinc-950 font-medium transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 inline-flex items-center justify-center gap-3 ${sizeClasses[size]} ${className}`}
    >
      {Icon && <Icon className='w-5 h-5 md:w-6 md:h-6 relative z-10' />}
      <span className='relative z-10'>{children}</span>
      {showArrow && (
        <ArrowRight className='w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-1 transition-transform' />
      )}
      <div className='absolute inset-0 bg-gradient-to-r from-orange-300 via-amber-200 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
    </button>
  );
}
