'use client';

import { useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  thumbnail: string;
  onClose: () => void;
}

export default function VideoPlayer({ src, thumbnail, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  return (
    <div className='fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-2xl animate-fadeIn'>
      <button onClick={onClose} className='absolute top-4 right-4 md:top-8 md:right-8 group'>
        <div className='relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10 group-hover:scale-110'>
          <X className='w-5 h-5 md:w-6 md:h-6 text-white/80 group-hover:text-white transition-colors' />
        </div>
      </button>

      <div className='relative w-full max-w-7xl'>
        <video
          ref={videoRef}
          src={src}
          poster={thumbnail}
          className='w-full rounded-3xl shadow-2xl'
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
        />

        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-10 rounded-b-3xl'>
          <div className='flex items-center gap-4 md:gap-6'>
            <button onClick={togglePlay} className='group/play'>
              <div className='w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-500 group-hover/play:bg-white/20 group-hover/play:scale-110'>
                {isPlaying ? (
                  <Pause className='w-5 h-5 md:w-6 md:h-6 text-white' />
                ) : (
                  <Play className='w-5 h-5 md:w-6 md:h-6 text-white ml-1' />
                )}
              </div>
            </button>

            <div className='flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden backdrop-blur-xl'>
              <div
                className='h-full bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 transition-all duration-300 shadow-lg shadow-amber-500/50'
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={toggleMute}
              className='text-white/70 hover:text-white transition-all duration-300 hover:scale-110'
            >
              {isMuted ? (
                <VolumeX className='w-5 h-5 md:w-6 md:h-6' />
              ) : (
                <Volume2 className='w-5 h-5 md:w-6 md:h-6' />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
