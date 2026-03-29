"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ErrorBoundary } from './ErrorBoundary';
import { useMusic, SONGS } from '../context/MusicContext';
import { AnimatedOverflowText } from './AnimatedOverflowText';

export const MusicPlayerContent: React.FC = () => {
  const { 
    currentSongIndex, 
    isPlaying, 
    currentTime, 
    duration, 
    loadError, 
    togglePlay, 
    nextSong, 
    prevSong, 
    seek 
  } = useMusic();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef(false);
  
  const currentSong = SONGS[currentSongIndex];

  // Auto-play and temporary show logic
  const showTemporarily = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    setIsExpanded(true);
  };

  useEffect(() => {
    showTemporarily();
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [currentSongIndex]);

  const handleMouseEnter = () => {
    isHovering.current = true;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (!isAnimating) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    if (!isAnimating) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 1000);
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    if (!isHovering.current && isExpanded) {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = setTimeout(() => {
        if (!isHovering.current) {
          setIsExpanded(false);
        }
      }, 1000);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex items-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded-player"
            initial={{ x: '120%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '120%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 120, duration: 0.8 }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={handleAnimationComplete}
            className="bg-white/90 backdrop-blur-md border border-neutral-200 rounded-2xl shadow-2xl px-4 py-3 w-84 overflow-hidden relative"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
              className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-900 transition-colors p-1 z-50"
              aria-label="Close player"
            >
              <ChevronRight size={16} />
            </button>

            <div className="flex flex-col gap-2">
              {/* Row 1: Album cover, Title and Subtext */}
              <div className="flex items-center gap-4 pl-1">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 shadow-inner">
                  <img 
                    src={currentSong.cover} 
                    alt={currentSong.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="overflow-hidden pr-6">
                  <AnimatedOverflowText
                    text={currentSong.title}
                    isActive={isPlaying}
                    className="font-noto font-bold text-neutral-700 text-[18px] leading-[26px] h-[26px] max-w-full"
                  />
                  <div className="flex flex-col mt-0.5 gap-[2px]">
                    <p className="font-noto text-[12px] font-medium text-neutral-500 leading-tight">GRADIENT</p>
                    <p className="font-noto text-[10px] text-neutral-500 leading-tight">{currentSong.genre}</p>
                  </div>
                </div>
              </div>

              {/* Row 2 & 3: Progress and Controls - Tightened with overlap */}
              <div className="flex flex-col -mt-1">
                {/* Row 2: Playhead (Progress Bar) - Centered */}
                <div className="space-y-0.5 px-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Row 3: Buttons - Centered with negative margin to overlap Row 2's text */}
                <div className="flex items-center justify-center gap-8 -mt-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevSong(); }}
                    className="text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <SkipBack size={16} fill="currentColor" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                  >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextSong(); }}
                    className="text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <SkipForward size={16} fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed-player"
            layout
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsExpanded(true)}
            className="group flex-shrink-0 relative flex items-center justify-center"
            style={{ width: 60, height: 60 }}
            aria-label="Expand player"
          >
            {/* Album Cover (Bottom Layer) */}
            <div className="absolute inset-0 z-0 w-full h-full rounded-xl overflow-hidden shadow-lg bg-white border border-neutral-200 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              <img 
                src={currentSong.cover} 
                alt="Album Case" 
                className={`w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 ${isPlaying ? 'opacity-100' : 'opacity-60'}`}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* CD (Top Layer) - Rotates when playing */}
            <div 
              className="relative z-10 w-[90%] h-[90%] rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-[4px] border-white/20 backdrop-blur-sm transition-transform duration-500"
              style={{
                animation: 'album-rotate 12s linear infinite',
                animationPlayState: isPlaying ? 'running' : 'paused',
                transform: isPlaying ? 'scale(1.05)' : 'scale(0.95)',
                maskImage: 'radial-gradient(circle, transparent 9%, black 9.5%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 9%, black 9.5%)'
              }}
            >
              {/* CD Image (Same as cover) with a hole in the middle */}
              <img 
                src={currentSong.cover} 
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

            {!isPlaying && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 rounded-xl">
                <Music size={24} className="text-white drop-shadow-md" />
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MusicPlayer: React.FC = () => (
  <ErrorBoundary>
    <MusicPlayerContent />
  </ErrorBoundary>
);
