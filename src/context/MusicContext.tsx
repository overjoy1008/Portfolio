"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PLAYER_STATE_STORAGE_KEY = 'portfolio-music-player-state';

export const SONGS = [
  {
    title: 'CPU (See Parts of You) [Instrumentals]',
    file: '/music/cpu.mp3',
    cover: '/cover/cpu.png',
    loudnessMultiplier: 1.0,
    genre: 'Hip Hop',
  },
  {
    title: 'Heads Up',
    file: '/music/heads-up.mp3',
    cover: '/cover/heads-up.png',
    loudnessMultiplier: 0.6,
    genre: 'K-Pop',
  },
  {
    title: 'W!N (Feat. Andrew Pearce, Nitro XXO)',
    file: '/music/win.mp3',
    cover: '/cover/win.png',
    loudnessMultiplier: 1.0,
    genre: 'Hip Hop',
  },
  {
    title: '누가 뭐래도 (Feat. EVAN BOSCO)',
    file: '/music/no-matter.mp3',
    cover: '/cover/no-matter.jpg',
    loudnessMultiplier: 0.6,
    genre: 'R&B',
  },
  {
    title: '희망사항 (Feat. EVAN BOSCO)',
    file: '/music/wishlist.mp3',
    cover: '/cover/wishlist.jpg',
    loudnessMultiplier: 0.7,
    genre: 'R&B',
  },
];

interface MusicContextType {
  currentSongIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  loadError: boolean;
  playSong: (index: number) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingSeekTimeRef = useRef<number | null>(null);
  const shouldResumeOnInteractionRef = useRef(false);

  const currentSong = SONGS[currentSongIndex];

  const syncDuration = () => {
    if (!audioRef.current) return;

    const nextDuration = audioRef.current.duration;
    if (Number.isFinite(nextDuration) && nextDuration > 0) {
      setDuration(nextDuration);
    }
  };

  const removeUnlockListeners = () => {
    if (typeof window === 'undefined') return;

    window.removeEventListener('click', handleUnlockPlayback);
    window.removeEventListener('keydown', handleUnlockPlayback);
    window.removeEventListener('touchstart', handleUnlockPlayback);
  };

  const handleUnlockPlayback = () => {
    if (!shouldResumeOnInteractionRef.current || !audioRef.current) return;

    audioRef.current.play().then(() => {
      shouldResumeOnInteractionRef.current = false;
      removeUnlockListeners();
    }).catch(() => {
      // Keep listeners attached so the next user gesture can retry playback.
    });
  };

  const requestPlaybackUnlock = () => {
    if (typeof window === 'undefined' || shouldResumeOnInteractionRef.current) return;

    shouldResumeOnInteractionRef.current = true;
    window.addEventListener('click', handleUnlockPlayback);
    window.addEventListener('keydown', handleUnlockPlayback);
    window.addEventListener('touchstart', handleUnlockPlayback);
  };

  const restorePlaybackPosition = () => {
    if (!audioRef.current || pendingSeekTimeRef.current === null) return;

    const nextTime = Number.isFinite(audioRef.current.duration) && audioRef.current.duration > 0
      ? Math.min(pendingSeekTimeRef.current, audioRef.current.duration)
      : pendingSeekTimeRef.current;

    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
    pendingSeekTimeRef.current = null;
  };

  useEffect(() => {
    setLoadError(false);
    if (audioRef.current) {
      const multiplier = currentSong.loudnessMultiplier || 1.0;
      audioRef.current.volume = Math.min(1, Math.max(0, multiplier));

      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          if (err.name === 'AbortError') {
            return;
          }

          if (err.name === 'NotAllowedError') {
            requestPlaybackUnlock();
          } else {
            setLoadError(true);
            setIsPlaying(false);
          }
        });
      } else {
        shouldResumeOnInteractionRef.current = false;
        removeUnlockListeners();
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex, currentSong.loudnessMultiplier]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const rawState = window.localStorage.getItem(PLAYER_STATE_STORAGE_KEY);
      if (!rawState) {
        setIsHydrated(true);
        return;
      }

      const parsedState = JSON.parse(rawState) as {
        currentSongIndex?: number;
        currentTime?: number;
        isPlaying?: boolean;
      };

      const nextSongIndex = Number.isInteger(parsedState.currentSongIndex)
        ? Math.min(Math.max(parsedState.currentSongIndex ?? 0, 0), SONGS.length - 1)
        : 0;
      const nextCurrentTime = typeof parsedState.currentTime === 'number' && parsedState.currentTime >= 0
        ? parsedState.currentTime
        : 0;

      pendingSeekTimeRef.current = nextCurrentTime;

      setCurrentSongIndex(nextSongIndex);
      setCurrentTime(nextCurrentTime);
      setIsPlaying(false);
    } catch {
      window.localStorage.removeItem(PLAYER_STATE_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    setCurrentTime(0);
    setDuration(0);
    audioRef.current.load();
    syncDuration();
    restorePlaybackPosition();
  }, [currentSongIndex]);

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;

    window.localStorage.setItem(
      PLAYER_STATE_STORAGE_KEY,
      JSON.stringify({
        currentSongIndex,
        currentTime,
        isPlaying,
      }),
    );
  }, [currentSongIndex, currentTime, isPlaying, isHydrated]);

  useEffect(() => {
    return () => {
      removeUnlockListeners();
    };
  }, []);

  const playSong = (index: number) => {
    if (index === currentSongIndex) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (loadError) return;
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
  };

  const seek = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    syncDuration();
    restorePlaybackPosition();
  };

  const handleCanPlay = () => {
    syncDuration();
    restorePlaybackPosition();

    if (!audioRef.current || !isPlaying) return;

    audioRef.current.play().catch((err) => {
      if (err.name === 'AbortError') {
        return;
      }

      if (err.name === 'NotAllowedError') {
        requestPlaybackUnlock();
        return;
      }

      setLoadError(true);
      setIsPlaying(false);
    });
  };

  const handleSongEnd = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
    setIsPlaying(true);
  };

  return (
    <MusicContext.Provider
      value={{
        currentSongIndex,
        isPlaying,
        currentTime,
        duration,
        loadError,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        seek,
        audioRef,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentSong.file}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onEnded={handleSongEnd}
        onError={() => setLoadError(true)}
      />
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
