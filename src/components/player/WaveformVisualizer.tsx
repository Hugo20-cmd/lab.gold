'use client';

import React from 'react';

interface WaveformVisualizerProps {
  waveform?: number[];
  currentTime: number;
  duration: number;
  isPlaying?: boolean;
  onSeek?: (time: number) => void;
  height?: number;
  barsCount?: number;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  waveform,
  currentTime,
  duration,
  isPlaying = false,
  onSeek,
  height = 40,
  barsCount = 40
}) => {
  // Generate bars if waveform array is not provided
  const bars = waveform && waveform.length > 0
    ? waveform
    : Array.from({ length: barsCount }, (_, i) => Math.floor(Math.sin(i * 0.4) * 35 + 50));

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(clickRatio * duration);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-[2px] w-full cursor-pointer group py-1"
      style={{ height: `${height}px` }}
      title="Clique para pausar/avançar no áudio"
    >
      {bars.map((barValue, index) => {
        const barPercent = (index / bars.length) * 100;
        const isPassed = barPercent <= progressPercent;

        return (
          <div
            key={index}
            className={`flex-1 rounded-full transition-all duration-150 ${
              isPassed
                ? 'bg-gradient-to-t from-[#d4af37] to-[#f5d77f] shadow-[0_0_8px_rgba(212,175,55,0.4)]'
                : 'bg-zinc-800 group-hover:bg-zinc-700'
            }`}
            style={{
              height: `${Math.max(15, barValue)}%`,
              animationDelay: isPlaying && isPassed ? `${(index % 5) * 0.15}s` : '0s'
            }}
          />
        );
      })}
    </div>
  );
};
