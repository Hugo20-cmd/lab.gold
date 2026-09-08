'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Play, Pause, ShoppingBag, Search, Disc, Lock } from 'lucide-react';
import { MOCK_BEATS, PRODUCER_NAME } from '../../data/mockData';
import { useAudio } from '../../context/AudioContext';
import { useCart } from '../../context/CartContext';
import { LicensingRulesSection } from '../../components/beats/LicensingRulesSection';

export default function BeatsPage() {
  const { playTrack, isPlayingTrack } = useAudio();
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [selectedSort, setSelectedSort] = useState<'recent' | 'popular' | 'priceAsc'>('popular');

  // Dynamically derive categories that actually exist in the current catalog
  const categories = useMemo(() => {
    const activeGenres = Array.from(new Set(MOCK_BEATS.map(b => b.genre)));
    return ['Todos', ...activeGenres];
  }, []);

  const filteredBeats = useMemo(() => {
    return MOCK_BEATS.filter(beat => {
      const matchesSearch = beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGenre = selectedGenre === 'Todos' || beat.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    }).sort((a, b) => {
      if (selectedSort === 'popular') return b.plays - a.plays;
      if (selectedSort === 'recent') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      if (selectedSort === 'priceAsc') return a.priceBasic - b.priceBasic;
      return 0;
    });
  }, [searchQuery, selectedGenre, selectedSort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
          <Disc className="w-4 h-4 animate-spin-slow" />
          <span>CATÁLOGO DE INSTRUMENTAIS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          CATÁLOGO DE <span className="gold-gradient-text">BEATS</span>
        </h1>
        <p className="text-zinc-400 text-sm max-w-xl">
          Instrumentais desenvolvidos no Laboratório Gold por {PRODUCER_NAME}. Prontos para uso comercial e gravações de alto desempenho.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome, tag ou estilo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
            <span className="text-xs text-zinc-400 shrink-0 font-bold">ORDENAR POR:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-800 text-xs text-amber-400 font-bold rounded-xl px-3 py-2.5 outline-none focus:border-amber-500/40"
            >
              <option value="popular">Mais Populares</option>
              <option value="recent">Mais Recentes</option>
              <option value="priceAsc">Menor Preço</option>
            </select>
          </div>

        </div>

        {/* Dynamic Genre Pills - Only showing categories that exist in the catalog */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
          {categories.map(genre => {
            const count = genre === 'Todos'
              ? MOCK_BEATS.length
              : MOCK_BEATS.filter(b => b.genre === genre).length;

            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap flex items-center gap-1.5 ${
                  selectedGenre === genre
                    ? 'gold-gradient-bg text-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-500/30'
                }`}
              >
                <span>{genre}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  selectedGenre === genre ? 'bg-black/20 text-black' : 'bg-zinc-800 text-amber-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Beats Grid */}
      {filteredBeats.length === 0 ? (
        <div className="py-20 text-center text-zinc-500 space-y-3">
          <p className="text-sm font-bold text-zinc-300">Nenhum beat encontrado com esses filtros.</p>
          <button
            onClick={() => { setSelectedGenre('Todos'); setSearchQuery(''); }}
            className="text-xs text-amber-400 underline font-bold"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBeats.map((beat) => {
            const isPlaying = isPlayingTrack(beat.id);
            const isSoldExclusive = beat.isSoldExclusive || beat.status === 'sold_exclusive';

            return (
              <div
                key={beat.id}
                className={`bg-[#111115] border rounded-2xl p-4 transition-all duration-300 group flex flex-col justify-between ${
                  isSoldExclusive
                    ? 'border-zinc-800 opacity-90'
                    : 'border-zinc-800 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5'
                }`}
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-zinc-950 border border-zinc-800">
                    <img
                      src={beat.coverUrl}
                      alt={beat.title}
                      className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${isSoldExclusive ? 'grayscale' : ''}`}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button
                        onClick={() => playTrack({
                          id: beat.id,
                          title: beat.title,
                          artistOrProducer: beat.producer,
                          coverUrl: beat.coverUrl,
                          audioUrl: beat.audioUrl,
                          type: 'beat'
                        })}
                        className="w-12 h-12 rounded-full gold-gradient-bg text-black flex items-center justify-center shadow-xl hover:scale-110 transition"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                      </button>
                    </div>

                    {isSoldExclusive ? (
                      <span className="absolute top-2.5 left-2.5 bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>VENDIDO — EXCLUSIVO</span>
                      </span>
                    ) : (
                      <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400">
                        {beat.genre}
                      </span>
                    )}

                    <span className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md text-zinc-300 px-2 py-0.5 rounded text-[10px] font-mono">
                      {beat.bpm} BPM
                    </span>
                  </div>

                  <Link href={`/beats/${beat.slug}`} className="block">
                    <h3 className="font-extrabold text-sm text-white hover:text-amber-400 transition truncate">
                      {beat.title}
                    </h3>
                  </Link>
                  <p className="text-[11px] text-zinc-400 mt-0.5">prod. {beat.producer}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  {isSoldExclusive ? (
                    <div>
                      <span className="text-[10px] text-red-400 block uppercase font-mono font-bold">Acervo Gold</span>
                      <span className="text-xs font-bold text-zinc-400">Exclusivo</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] text-zinc-500 block uppercase font-mono">A partir de</span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        R$ {beat.priceBasic.toFixed(0)}
                      </span>
                    </div>
                  )}

                  <Link
                    href={`/beats/${beat.slug}`}
                    className={`font-extrabold text-xs px-3.5 py-1.5 rounded-lg transition flex items-center gap-1 ${
                      isSoldExclusive
                        ? 'bg-zinc-800 text-zinc-400 hover:text-white'
                        : 'gold-gradient-bg text-black hover:brightness-110'
                    }`}
                  >
                    {isSoldExclusive ? (
                      <span>DETALHES</span>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>LICENÇAS</span>
                      </>
                    )}
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Official Licensing Terms & Rules Section */}
      <div className="pt-8 border-t border-zinc-800/80">
        <LicensingRulesSection />
      </div>

    </div>
  );
}
