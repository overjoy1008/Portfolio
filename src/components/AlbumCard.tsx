"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { AnimatedOverflowText } from './AnimatedOverflowText';

interface AlbumCardProps {
  index: number;
  title: string;
  cover: string;
  genre: string;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ index, title, cover, genre }) => {
  const { currentSongIndex, isPlaying, playSong } = useMusic();
  const [isHovered, setIsHovered] = React.useState(false);
  const isCurrent = currentSongIndex === index;
  const isActuallyPlaying = isCurrent && isPlaying;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.15, 
        ease: "easeOut",
        layout: { duration: 0.25 }
      }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      onClick={() => playSong(index)}
    >
      {/* Liquid Slime Background Effect (Gooey feel) */}
      <div className="absolute -inset-4 bg-neutral-100/50 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      {/* CD Peek Container */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
        {/* Album Cover (Bottom Layer) */}
        <div className="absolute inset-0 z-0 w-full h-full rounded-xl overflow-hidden shadow-lg bg-white border border-neutral-200 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          <img 
            src={cover} 
            alt={title} 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* CD (Top Layer) - Rotates when playing */}
        <div 
          className="relative z-10 w-[90%] h-[90%] rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-[6px] border-white/20 backdrop-blur-sm transition-transform duration-500"
          style={{
            animation: 'album-rotate 12s linear infinite',
            animationPlayState: isActuallyPlaying ? 'running' : 'paused',
            transform: isActuallyPlaying ? 'scale(1.05)' : 'scale(0.95)',
            maskImage: 'radial-gradient(circle, transparent 9%, black 9.5%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 9%, black 9.5%)'
          }}
        >
          {/* CD Image (Same as cover) with a hole in the middle */}
          <img 
            src={cover} 
            alt="CD Art" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              maskImage: 'radial-gradient(circle, transparent 18%, black 18.5%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 18%, black 18.5%)'
            }}
            referrerPolicy="no-referrer"
          />
          
          {/* CD Center Hole - Truly transparent to see the cover below */}
          <div className="relative z-20 w-[18%] h-[18%] rounded-full flex items-center justify-center">
            {/* Inner ring detail */}
            <div className="w-full h-full rounded-full border border-white/30 shadow-inner" />
          </div>

          {/* Vinyl/CD Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,white/10_90deg,transparent_180deg,white/10_270deg,transparent_360deg)] pointer-events-none" />
        </div>

        <style>{`
          @keyframes album-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        
        {/* Overlay when hover - Play/Pause button ONLY on hover */}
        <div className="absolute inset-0 z-30 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-neutral-900 z-40">
            {isActuallyPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </div>
        </div>

        {/* Playing Indicator (Equalizer style) */}
        {isActuallyPlaying && (
          <div className="absolute bottom-4 right-4 z-40 flex items-end gap-0.5 h-4">
            {[0.6, 1, 0.8, 0.4].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: ["20%", "100%", "20%"] }}
                transition={{ 
                  duration: 0.5 + i * 0.1, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-1 bg-white rounded-full shadow-sm"
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Album Info */}
      <div className="mt-4 text-left px-1">
        <AnimatedOverflowText
          text={title}
          isActive={isActuallyPlaying || isHovered}
          className="font-noto font-bold text-neutral-800 text-lg leading-[34px] h-[34px] max-w-48 md:max-w-56"
        />
        <p className="font-noto text-sm text-neutral-500">{genre}</p>
      </div>
    </motion.div>
  );
};
