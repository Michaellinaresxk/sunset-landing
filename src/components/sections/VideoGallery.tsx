'use client';

import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { GALLERY_VIDEOS } from '@/src/constants';
import { MediaItem } from '@/src/types';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';
import VideoPlayer from '@/src/components/media/VideoPlayer';

function VideoThumbnail({
  video,
  onClick,
  className = '',
  children,
}: {
  video: MediaItem;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent' />
      {children}
    </div>
  );
}

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionReveal className='py-15 md:py-20 bg-white relative overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.06),transparent_50%)]' />

          <div className='max-w-7xl mx-auto px-4 md:px-8 relative z-10'>
            {/* Header */}
            <RevealItem
              isVisible={isVisible}
              className='text-center mb-16 md:mb-24'
            >
              <h2 className='text-4xl md:text-7xl font-extralight text-zinc-900 mb-6 tracking-tighter'>
                Experience
              </h2>
              <p className='text-base md:text-xl text-zinc-400 font-light'>
                Immerse yourself in the golden hour magic
              </p>
            </RevealItem>

            {/* Mobile horizontal scroll */}
            <div className='md:hidden mb-12'>
              <div
                ref={scrollContainerRef}
                className='flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 pl-4'
                style={{ scrollBehavior: 'smooth' }}
              >
                {GALLERY_VIDEOS.map((video, i) => (
                  <div
                    key={video.id}
                    className='flex-shrink-0 w-[200px] snap-start'
                  >
                    <VideoThumbnail
                      video={video}
                      onClick={() => setSelectedVideo(video)}
                      className='aspect-[9/16] rounded-2xl shadow-lg'
                    >
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-14 h-14 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center'>
                          <Play className='w-5 h-5 text-white ml-0.5' />
                        </div>
                      </div>
                      <div className='absolute bottom-0 left-0 right-0 p-3'>
                        <h3 className='text-sm font-light text-white'>
                          {video.title}
                        </h3>
                      </div>
                      {i === 0 && (
                        <div className='absolute top-3 right-3 bg-amber-500/80 backdrop-blur-md px-2.5 py-1 rounded-full animate-pulse'>
                          <span className='text-xs text-white font-light'>
                            Scroll →
                          </span>
                        </div>
                      )}
                    </VideoThumbnail>
                  </div>
                ))}
              </div>
              <div className='flex justify-center gap-2 mt-4'>
                {GALLERY_VIDEOS.map((_, i) => (
                  <div
                    key={i}
                    className='w-1.5 h-1.5 rounded-full bg-zinc-300'
                  />
                ))}
              </div>
            </div>

            {/* Desktop grid */}
            <div className='hidden md:grid md:grid-cols-3 gap-6 md:gap-8 mb-12'>
              {GALLERY_VIDEOS.map((video, i) => (
                <RevealItem
                  key={video.id}
                  isVisible={isVisible}
                  delay={i * 200}
                >
                  <VideoThumbnail
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                    className='aspect-[9/16] rounded-3xl shadow-xl shadow-zinc-200 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-amber-200/50'
                  >
                    <div className='absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700' />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110'>
                        <Play className='w-8 h-8 md:w-10 md:h-10 text-white ml-1' />
                      </div>
                    </div>
                    <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                      <h3 className='text-xl md:text-2xl font-light text-white'>
                        {video.title}
                      </h3>
                    </div>
                  </VideoThumbnail>
                </RevealItem>
              ))}
            </div>
          </div>

          {selectedVideo && (
            <VideoPlayer
              src={selectedVideo.src}
              thumbnail={selectedVideo.thumbnail!}
              onClose={() => setSelectedVideo(null)}
            />
          )}
        </>
      )}
    </SectionReveal>
  );
}
