'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Pause, ShoppingBag, Layers, CheckCircle2, Download } from 'lucide-react';
import { MOCK_SAMPLE_PACKS, PRODUCER_NAME } from '../../data/mockData';
import { useAudio } from '../../context/AudioContext';
import { useCart } from '../../context/CartContext';

export default function SamplePacksPage() {
  const { playTrack, isPlayingTrack } = useAudio();
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
          <Layers className="w-4 h-4" />
          <span>KITS COMPLETOS & COLEÇÕES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          SAMPLE <span className="gold-gradient-text">PACKS</span>
        </h1>
        <p className="text-zinc-400 text-sm max-w-xl">
          Pacotes de bateria, melodia e efeitos sonoros produzidos por {PRODUCER_NAME}. Prontos para arrastar para sua DAW.
        </p>
      </div>

      {/* Sample Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_SAMPLE_PACKS.map((pack) => {
          const isPlaying = isPlayingTrack(pack.id);

          return (
            <div
              key={pack.id}
              className="bg-[#111115] border border-amber-500/20 rounded-2xl p-6 space-y-6 flex flex-col justify-between hover:border-amber-500/50 transition shadow-xl"
            >
              <div className="space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                  <img src={pack.coverUrl} alt={pack.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <button
                      onClick={() => playTrack({
                        id: pack.id,
                        title: pack.title,
                        artistOrProducer: PRODUCER_NAME,
                        coverUrl: pack.coverUrl,
                        audioUrl: pack.previewAudioUrl,
                        type: 'sample-pack'
                      })}
                      className="w-16 h-16 rounded-full gold-gradient-bg text-black flex items-center justify-center font-bold shadow-2xl hover:scale-110 transition"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-1" />}
                    </button>
                  </div>

                  {pack.isFree && (
                    <span className="absolute top-3 left-3 bg-emerald-500 text-black font-black text-xs px-3 py-1 rounded-md">
                      GRÁTIS
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-white uppercase tracking-tight">
                    {pack.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {pack.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Total de Arquivos:</span>
                    <strong className="text-amber-400 font-mono">{pack.fileCount} sons</strong>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pack.categories.map(cat => (
                      <span key={cat} className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="font-extrabold text-lg text-amber-400 font-mono">
                  {pack.isFree ? 'GRÁTIS' : `R$ ${pack.price.toFixed(2).replace('.', ',')}`}
                </span>

                <button
                  onClick={() => addToCart({
                    itemType: 'sample-pack',
                    itemId: pack.id,
                    title: pack.title,
                    coverUrl: pack.coverUrl,
                    price: pack.price
                  })}
                  className="gold-gradient-bg text-black font-extrabold text-xs px-5 py-2.5 rounded-xl hover:brightness-110 transition flex items-center gap-1.5"
                >
                  {pack.isFree ? <Download className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{pack.isFree ? 'BAIXAR KIT' : 'ADICIONAR'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
