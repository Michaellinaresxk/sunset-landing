'use client';

import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { GALLERY_VIDEOS, GALLERY_IMAGES } from '@/src/constants';
import { MediaItem } from '@/src/types';
import SectionReveal, { RevealItem } from '@/src/components/ui/SectionReveal';
import VideoPlayer from '@/src/components/media/VideoPlayer';

// Shared thumbnail overlay for both mobile and desktop
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
    <SectionReveal className='py-24 md:py-40 bg-zinc-950 relative overflow-hidden'>
      {(isVisible) => (
        <>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.03),transparent_50%)]' />

          <div className='max-w-7xl mx-auto px-4 md:px-8 relative z-10'>
            {/* Header */}
            <RevealItem
              isVisible={isVisible}
              className='text-center mb-16 md:mb-24'
            >
              <h2 className='text-4xl md:text-7xl font-extralight text-white mb-6 tracking-tighter'>
                Experience
              </h2>
              <p className='text-base md:text-xl text-white/40 font-light'>
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
                        <div className='absolute top-3 right-3 bg-amber-300/20 backdrop-blur-md px-2.5 py-1 rounded-full animate-pulse'>
                          <span className='text-xs text-amber-200 font-light'>
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
                    className='w-1.5 h-1.5 rounded-full bg-white/30'
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
                    className='aspect-[9/16] rounded-3xl transition-all duration-700 hover:scale-105'
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

            {/* Image gallery */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8'>
              {GALLERY_IMAGES.map((image, i) => (
                <RevealItem
                  key={image.id}
                  isVisible={isVisible}
                  delay={(i + 3) * 200}
                >
                  <div className='group relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-700 hover:scale-105'>
                    <img
                      src={image.src}
                      alt={image.title}
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700' />
                    <div className='absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                      <h3 className='text-base md:text-xl font-light text-white'>
                        {image.title}
                      </h3>
                    </div>
                  </div>
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
