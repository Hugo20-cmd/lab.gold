'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Beat, MusicTrack, Sample, SamplePack } from '../types';

export type PlayableItem = {
  id: string;
  title: string;
  artistOrProducer: string;
  coverUrl: string;
  audioUrl: string;
  type: 'beat' | 'music' | 'sample' | 'sample-pack';
};

interface AudioContextType {
  currentTrack: PlayableItem | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  playTrack: (item: PlayableItem) => void;
  togglePlay: () => void;
  pauseTrack: () => void;
  stopTrack: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  isPlayingTrack: (id: string) => boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<PlayableItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Cache para os Blobs das músicas (evita baixar 2x a mesma)
  const blobCache = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    // Create HTML5 Audio element on client side
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = volume;

    // Impedir menu de contexto (Botão Direito) diretamente no elemento Audio (embora invisível)
    audio.addEventListener('contextmenu', (e) => e.preventDefault());

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playTrack = async (item: PlayableItem) => {
    if (!audioRef.current) return;

    if (currentTrack?.id === item.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      return;
    }

    setCurrentTrack(item);
    setIsLoading(true);

    let secureUrl = item.audioUrl;

    // Proteção de Áudio (Blob Fetching)
    try {
      if (blobCache.current.has(item.id)) {
        secureUrl = blobCache.current.get(item.id)!;
      } else {
        // Baixa o arquivo em memória para ofuscar a URL real
        const response = await fetch(item.audioUrl);
        const blob = await response.blob();
        secureUrl = URL.createObjectURL(blob);
        blobCache.current.set(item.id, secureUrl);
      }
    } catch (e) {
      console.error("Falha ao proteger stream do áudio, caindo para URL padrão", e);
    }

    audioRef.current.src = secureUrl;
    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const pauseTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const stopTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    if (vol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const isPlayingTrack = (id: string) => {
    return currentTrack?.id === id && isPlaying;
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isLoading,
        playTrack,
        togglePlay,
        pauseTrack,
        stopTrack,
        seek,
        setVolume,
        toggleMute,
        isPlayingTrack
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
