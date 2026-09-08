'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Pause, Music, ExternalLink, X, Film } from 'lucide-react';
import { MOCK_MUSIC, PRODUCER_NAME, SOCIAL_LINKS } from '../../data/mockData';
import { YoutubeIcon, SpotifyIcon } from '../../components/ui/SocialIcons';
import { useAudio } from '../../context/AudioContext';
import { MusicTrack } from '../../types';

export default function MusicPage() {
  const { playTrack, isPlayingTrack } = useAudio();
  const [activeModalTrack, setActiveModalTrack] = useState<MusicTrack | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
            <YoutubeIcon className="w-4 h-4 text-red-500" />
            <span>DISCOGRAFIA & VÍDEOCLIPES OFICIAIS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            MÚSICAS DO <span className="gold-gradient-text">LABORATÓRIO</span>
          </h1>
          <p className="text-zinc-400 text-sm">
            Lançamentos autorais, videoclipes e produções musicais do canal oficial PennaMc. Assista aos videoclipes do YouTube diretamente no site ou acompanhe nas plataformas digitais.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={SOCIAL_LINKS.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shrink-0"
          >
            <SpotifyIcon className="w-4 h-4 text-white" />
            <span>OUVIR NO SPOTIFY</span>
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shrink-0"
          >
            <YoutubeIcon className="w-4 h-4 text-white" />
            <span>INSCREVER-SE NO YOUTUBE</span>
          </a>
        </div>
      </div>

      {/* Music Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MUSIC.map((track) => {
          const isPlaying = isPlayingTrack(track.id);

          return (
            <div
              key={track.id}
              className="bg-[#111115] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl p-5 transition group flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-4">
                {/* Cover Image Container */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition flex items-center justify-center gap-3">
                    {/* YouTube Video Modal Button */}
                    {track.youtubeEmbedUrl && (
                      <button
                        onClick={() => setActiveModalTrack(track)}
                        className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shadow-2xl hover:scale-110 transition"
                        title="Assistir Videoclipe"
                      >
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </button>
                    )}

                    {/* Audio Player Button */}
                    <button
                      onClick={() => playTrack({
                        id: track.id,
                        title: track.title,
                        artistOrProducer: track.artist,
                        coverUrl: track.coverUrl,
                        audioUrl: track.audioUrl,
                        type: 'music'
                      })}
                      className="w-12 h-12 rounded-full gold-gradient-bg text-black flex items-center justify-center font-bold shadow-2xl hover:scale-110 transition"
                      title="Ouvir Áudio"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Music className="w-5 h-5" />}
                    </button>
                  </div>

                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded text-[10px] font-bold text-amber-400 font-mono">
                    {track.genre}
                  </span>

                  <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-zinc-300 px-2 py-0.5 rounded text-[10px] font-mono">
                    {track.duration}
                  </span>
                </div>

                <div>
                  <Link href={`/music/${track.slug}`} className="block">
                    <h3 className="font-extrabold text-base text-white hover:text-amber-400 transition truncate">
                      {track.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-zinc-400 mt-0.5">{track.artist}</p>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {track.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {track.youtubeEmbedUrl && (
                    <button
                      onClick={() => setActiveModalTrack(track)}
                      className="bg-red-600/10 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white font-extrabold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
                    >
                      <YoutubeIcon className="w-3.5 h-3.5" />
                      <span>CLIPE</span>
                    </button>
                  )}

                  <button
                    onClick={() => playTrack({
                      id: track.id,
                      title: track.title,
                      artistOrProducer: track.artist,
                      coverUrl: track.coverUrl,
                      audioUrl: track.audioUrl,
                      type: 'music'
                    })}
                    className="gold-gradient-bg text-black font-extrabold text-xs px-3.5 py-1.5 rounded-lg hover:brightness-110 transition flex items-center gap-1.5"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                    <span>{isPlaying ? 'PAUSAR' : 'ÁUDIO'}</span>
                  </button>
                </div>

                <Link
                  href={`/music/${track.slug}`}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  DETALHES <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          );
        })}
      </div>

      {/* Video Modal Player */}
      {activeModalTrack && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111115] border border-amber-500/30 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col">
            
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2">
                <YoutubeIcon className="w-5 h-5 text-red-500" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {activeModalTrack.title}
                </span>
              </div>
              <button
                onClick={() => setActiveModalTrack(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-xl">
                <iframe
                  src={activeModalTrack.youtubeEmbedUrl}
                  title={activeModalTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <h3 className="font-extrabold text-base text-white">{activeModalTrack.title}</h3>
                  <p className="text-xs text-zinc-400">{activeModalTrack.artist} • prod. {activeModalTrack.producer}</p>
                </div>

                {activeModalTrack.youtubeUrl && (
                  <a
                    href={activeModalTrack.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-700 transition flex items-center gap-1.5"
                  >
                    <span>ABRIR NO YOUTUBE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
