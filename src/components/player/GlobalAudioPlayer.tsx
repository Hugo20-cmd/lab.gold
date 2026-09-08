'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, ShoppingBag, Disc, ChevronDown, Maximize2, X, Music } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useCart } from '../../context/CartContext';
import { WaveformVisualizer } from './WaveformVisualizer';

export const GlobalAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    stopTrack
  } = useAudio();

  const { addToCart } = useCart();
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);

  if (!currentTrack || closed) return null;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleQuickAddBeat = () => {
    if (!currentTrack) return;
    addToCart({
      itemType: currentTrack.type === 'beat' ? 'beat' : 'sample',
      itemId: currentTrack.id,
      title: currentTrack.title,
      coverUrl: currentTrack.coverUrl,
      price: 100.00,
      licenseType: 'BASIC'
    });
  };

  const handleClose = () => {
    stopTrack();
    setClosed(true);
  };

  // 1. Minimized Floating Widget on Bottom Right (completely unobtrusive)
  if (minimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0a0a0d]/95 backdrop-blur-xl border border-amber-500/40 p-2 sm:p-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.9)] animate-fade-in hover:border-amber-400 transition-all">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-amber-500/40">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="hidden sm:block max-w-[130px] pr-1">
          <h4 className="text-xs font-bold text-white truncate leading-tight">
            {currentTrack.title}
          </h4>
          <span className="text-[10px] text-amber-400 font-mono block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full gold-gradient-bg text-black flex items-center justify-center font-bold shadow-md hover:scale-105 transition"
          title={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
        </button>

        {/* Expand Player Button */}
        <button
          onClick={() => setMinimized(false)}
          className="p-1.5 rounded-full text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/80 transition"
          title="Expandir Player"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="p-1.5 rounded-full text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 transition"
          title="Fechar Player"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // 2. Full Bottom Docked Player
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Header Pill Controls */}
      <div className="flex justify-center -mb-[1px]">
        <div className="bg-[#0c0c0f] border-t border-x border-amber-500/30 rounded-t-xl px-4 py-1 flex items-center gap-3 shadow-lg">
          <button
            onClick={() => setMinimized(true)}
            className="text-amber-400 text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 hover:text-amber-300 transition"
            title="Minimizar para a lateral inferior"
          >
            <span>MINIMIZAR NA LATERAL</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <span className="text-zinc-700">|</span>
          <button
            onClick={handleClose}
            className="text-zinc-400 text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 hover:text-red-400 transition"
            title="Fechar player de áudio"
          >
            <span>FECHAR</span>
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="glass-panel-gold border-t border-amber-500/30 px-4 sm:px-6 py-3 shadow-[0_-10px_35px_rgba(0,0,0,0.95)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Track Info */}
          <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-amber-500/30 bg-zinc-900 group">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Disc className="w-5 h-5 text-amber-400 animate-spin-slow" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  {currentTrack.type}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white truncate hover:text-amber-400 transition mt-0.5">
                {currentTrack.title}
              </h4>
              <p className="text-[11px] text-zinc-400 truncate">
                {currentTrack.artistOrProducer}
              </p>
            </div>
          </div>

          {/* Center: Play Controls & Interactive Waveform */}
          <div className="flex-1 w-full max-w-2xl flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-4 w-full justify-center">
              
              {/* Play / Pause Toggle */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full gold-gradient-bg text-black flex items-center justify-center font-bold shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition shrink-0"
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
              </button>

              {/* Time display */}
              <span className="text-[11px] font-mono text-zinc-400 w-12 text-right shrink-0">
                {formatTime(currentTime)}
              </span>

              {/* Interactive Waveform Bar */}
              <div className="flex-1 min-w-[150px] sm:min-w-[300px]">
                <WaveformVisualizer
                  currentTime={currentTime}
                  duration={duration}
                  isPlaying={isPlaying}
                  onSeek={seek}
                  height={32}
                  barsCount={35}
                />
              </div>

              <span className="text-[11px] font-mono text-zinc-500 w-12 shrink-0">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Volume & Buy CTA */}
          <div className="hidden lg:flex items-center justify-end gap-4 w-full md:w-1/4">
            
            {/* Volume controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-amber-400 transition"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 accent-[#d4af37] bg-zinc-800 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Quick Buy CTA */}
            {currentTrack.type === 'beat' && (
              <button
                onClick={handleQuickAddBeat}
                className="gold-border-glow bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>COMPRAR (R$ 100)</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
