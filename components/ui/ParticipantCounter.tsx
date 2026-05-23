'use client';

interface ParticipantCounterProps {
  label: string;
  sublabel: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  icon: React.ElementType;
  min?: number;
}

export default function ParticipantCounter({
  label,
  sublabel,
  value,
  onIncrement,
  onDecrement,
  icon: Icon,
  min = 0,
}: ParticipantCounterProps) {
  return (
    <div className='flex items-center justify-between py-4 border-b border-white/5 last:border-0'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0'>
          <Icon className='w-5 h-5 text-amber-300' />
        </div>
        <div>
          <div className='text-sm font-medium text-white'>{label}</div>
          <div className='text-xs text-white/40'>{sublabel}</div>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          onClick={onDecrement}
          disabled={value <= min}
          className='w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed'
        >
          <span className='text-lg font-light'>−</span>
        </button>
        <div className='w-10 text-center text-base font-medium text-white'>
          {value}
        </div>
        <button
          type='button'
          onClick={onIncrement}
          className='w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition'
        >
          <span className='text-lg font-light'>+</span>
        </button>
      </div>
    </div>
  );
}
