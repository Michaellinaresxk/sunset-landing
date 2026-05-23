'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { PICKUP_LOCATIONS } from '@/src/constants';

interface PickupLocationInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function PickupLocationInput({
  value,
  onChange,
  error,
}: PickupLocationInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external value → internal query
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = PICKUP_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(query.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    setIsOpen(true);
  };

  const handleSelect = (location: string) => {
    setQuery(location);
    onChange(location);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className='relative'>
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border ${
          error ? 'border-red-500' : 'border-white/10'
        } focus-within:border-amber-300/50 transition-colors`}
      >
        <MapPin className='w-4 h-4 text-amber-400 flex-shrink-0' />
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder='Hotel name or area (e.g. Bávaro)'
          className='flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none'
        />
        <button
          type='button'
          onClick={() => {
            setIsOpen(!isOpen);
            inputRef.current?.focus();
          }}
          className='text-white/30 hover:text-white/50 transition-colors'
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && filtered.length > 0 && (
        <div className='absolute z-20 mt-1 w-full max-h-48 overflow-y-auto rounded-xl bg-zinc-800 border border-white/10 shadow-xl'>
          {filtered.map((location) => (
            <button
              key={location}
              type='button'
              onClick={() => handleSelect(location)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2.5 ${
                value === location
                  ? 'bg-amber-500/15 text-amber-300'
                  : 'text-white/60 hover:bg-white/5 hover:text-white/80'
              }`}
            >
              <MapPin className='w-3.5 h-3.5 flex-shrink-0 text-amber-400/60' />
              {location}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
