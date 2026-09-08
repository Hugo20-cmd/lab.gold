'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Heart, MessageCircle, Share2 } from 'lucide-react';
import { MOCK_VIDEOS, PRODUCER_NAME } from '../../../data/mockData';
import { InstagramIcon } from '../../../components/ui/SocialIcons';

export default function VideoDetailClient({ slug }: { slug: string }) {
  const video = MOCK_VIDEOS.find(v => v.slug === slug);

  if (!video) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Vídeo não encontrado</h2>
        <Link href="/videos" className="inline-block gold-gradient-bg text-black text-xs font-bold px-6 py-2.5 rounded-lg">
          VOLTAR PARA OS VÍDEOS
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do vídeo copiado para a área de transferência!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button */}
      <Link href="/videos" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>VOLTAR PARA OS VÍDEOS</span>
      </Link>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Reel Embed Player Container */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden border border-amber-500/40 bg-black shadow-2xl relative">
            <iframe
              src={video.videoUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* Video Info & Instagram Meta */}
        <div className="md:col-span-7 space-y-6">
          
          <div className="space-y-3 border-b border-zinc-800 pb-6">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20 font-mono">
                {video.category}
              </span>
              <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {video.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {video.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                {video.likes || '0'} curtidas
              </span>
              {video.comments && (
                <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                  <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                  {video.comments} comentários
                </span>
              )}
            </div>
          </div>

          {/* Description / Instagram Caption */}
          <div className="space-y-3 bg-[#111115] p-5 rounded-2xl border border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 border-b border-zinc-800/60 pb-3">
              <InstagramIcon className="w-4 h-4 text-rose-400" />
              <span>LEGENDA DO INSTAGRAM</span>
            </div>
            <p className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed font-sans">
              {video.description}
            </p>
          </div>

          {/* Producer & Action Buttons */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Criado por:</span>
              <span className="font-bold text-amber-400">{PRODUCER_NAME}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {video.instagramUrl && (
                <a
                  href={video.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <InstagramIcon className="w-4 h-4 text-white" />
                  <span>ABRIR REEL NO INSTAGRAM</span>
                </a>
              )}
              <button
                onClick={handleShare}
                className="w-full sm:w-auto bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-white text-xs font-bold py-3.5 px-5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>COMPARTILHAR</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
