'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Pause, ArrowLeft } from 'lucide-react';
import { MOCK_MUSIC } from '../../../data/mockData';
import { YoutubeIcon } from '../../../components/ui/SocialIcons';
import { useAudio } from '../../../context/AudioContext';

export default function MusicDetailClient({ slug }: { slug: string }) {
  const track = MOCK_MUSIC.find(m => m.slug === slug);

  if (!track) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Música não encontrada</h2>
        <Link href="/music" className="inline-block gold-gradient-bg text-black text-xs font-bold px-6 py-2.5 rounded-lg">
          VOLTAR PARA MÚSICAS
        </Link>
      </div>
    );
  }

  const { playTrack, isPlayingTrack } = useAudio();
  const isPlaying = isPlayingTrack(track.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <Link href="/music" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>VOLTAR PARA AS MÚSICAS</span>
      </Link>

      <div className="space-y-8">
        
        {/* Video Player or Cover Image */}
        {track.youtubeEmbedUrl ? (
          <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-amber-500/30 bg-black shadow-2xl">
            <iframe
              src={track.youtubeEmbedUrl}
              title={track.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-amber-500/30 bg-zinc-950 shadow-2xl">
              <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Music Metadata */}
        <div className="space-y-6 bg-[#111115] p-6 sm:p-8 rounded-2xl border border-zinc-800">
          <div className="space-y-2 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20 font-mono">
                {track.genre} • {track.duration}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              {track.title}
            </h1>
            <p className="text-lg text-zinc-300 font-medium">{track.artist}</p>
            <p className="text-xs text-zinc-500 font-mono">Produção: {track.producer} • Lançamento: {track.releaseDate}</p>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {track.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => playTrack({
                id: track.id,
                title: track.title,
                artistOrProducer: track.artist,
                coverUrl: track.coverUrl,
                audioUrl: track.audioUrl,
                type: 'music'
              })}
              className="gold-gradient-bg text-black font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-xl hover:brightness-110 transition flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black" />}
              <span>{isPlaying ? 'PAUSAR ÁUDIO' : 'REPRODUZIR ÁUDIO'}</span>
            </button>

            {track.youtubeUrl && (
              <a
                href={track.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl transition flex items-center gap-2 shadow-lg"
              >
                <YoutubeIcon className="w-5 h-5 text-white" />
                <span>ASSISTIR NO YOUTUBE</span>
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
