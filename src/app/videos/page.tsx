'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Heart, MessageCircle, Calendar, ExternalLink, X } from 'lucide-react';
import { MOCK_VIDEOS, PRODUCER_NAME, SOCIAL_LINKS } from '../../data/mockData';
import { InstagramIcon } from '../../components/ui/SocialIcons';
import { Video } from '../../types';
import { useAudio } from '../../context/AudioContext';

export default function VideosPage() {
  const { pauseTrack } = useAudio();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalVideo, setActiveModalVideo] = useState<Video | null>(null);

  const handleOpenVideoModal = (video: Video) => {
    pauseTrack();
    setActiveModalVideo(video);
  };

  const categories = [
    'Todos',
    'Bastidores',
    'Studio Session',
    'Produção Musical',
    'Beatmaking',
    'Shorts'
  ];

  const filteredVideos = selectedCategory === 'Todos'
    ? MOCK_VIDEOS
    : MOCK_VIDEOS.filter(v => v.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
            <InstagramIcon className="w-4 h-4 text-amber-400" />
            <span>REELS & CONTEÚDO EXCLUSIVO DO ESTÚDIO</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            VÍDEOS DO <span className="gold-gradient-text">LABORATÓRIO</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Confira os bastidores, sessões de estúdio, processos criativos de mixagem e batidas produzidas por {PRODUCER_NAME} extraídos diretamente do Instagram oficial do estúdio.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={SOCIAL_LINKS.instagramMain}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-4 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shrink-0"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@originalpenna</span>
          </a>
          <a
            href={SOCIAL_LINKS.instagramBeats}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-amber-500/30 font-extrabold text-xs px-4 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shrink-0"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@og.penna</span>
          </a>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'gold-gradient-bg text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-[#111115] border border-zinc-800/80 hover:border-amber-500/40 rounded-2xl overflow-hidden transition group flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden border-b border-zinc-800/80">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-between p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-black/80 backdrop-blur-md border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-400">
                      {video.category}
                    </span>
                    <span className="bg-black/70 backdrop-blur-md text-amber-400 p-1.5 rounded-full border border-zinc-800">
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="self-center my-auto">
                    <button
                      onClick={() => handleOpenVideoModal(video)}
                      className="w-14 h-14 rounded-full gold-gradient-bg text-black flex items-center justify-center font-bold shadow-2xl hover:scale-110 transition group-hover:shadow-amber-500/30"
                      title="Assistir Vídeo"
                    >
                      <Play className="w-6 h-6 fill-black ml-1" />
                    </button>
                  </div>

                  {/* Likes & Comments Pills */}
                  <div className="flex items-center justify-between text-[11px] text-zinc-300 font-mono">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-zinc-300">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/40" />
                      {video.likes || '0'}
                    </span>
                    {video.comments && (
                      <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-zinc-300">
                        <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                        {video.comments}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-4 space-y-2">
                <Link href={`/videos/${video.slug}`} className="block group-hover:text-amber-400 transition">
                  <h3 className="font-extrabold text-sm text-white line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                </Link>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>

            {/* Footer details */}
            <div className="px-4 pb-4 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {video.date}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalVideo(video)}
                  className="text-amber-400 hover:underline font-bold text-[11px]"
                >
                  Player
                </button>
                <span>•</span>
                <Link
                  href={`/videos/${video.slug}`}
                  className="text-zinc-300 hover:text-white transition flex items-center gap-0.5"
                >
                  Detalhes <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Quick Player Modal */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111115] border border-amber-500/30 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Instagram Reel
                </span>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Embed Body */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              <h2 className="text-lg font-bold text-white leading-tight">
                {activeModalVideo.title}
              </h2>

              <div className="relative aspect-[9/16] max-w-[340px] mx-auto rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-lg">
                <iframe
                  src={activeModalVideo.videoUrl}
                  title={activeModalVideo.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>

              <div className="space-y-2 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800 text-xs text-zinc-300">
                <p className="leading-relaxed">
                  {activeModalVideo.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono border-t border-zinc-800/60">
                  <span>Prod: {PRODUCER_NAME}</span>
                  <span>{activeModalVideo.date}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between gap-3">
              {activeModalVideo.instagramUrl && (
                <a
                  href={activeModalVideo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-rose-400" />
                  <span>Ver no Instagram</span>
                </a>
              )}
              <Link
                href={`/videos/${activeModalVideo.slug}`}
                onClick={() => setActiveModalVideo(null)}
                className="flex-1 text-center gold-gradient-bg text-black text-xs font-bold py-2.5 rounded-xl transition shadow-md hover:scale-[1.02]"
              >
                Página Completa
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
