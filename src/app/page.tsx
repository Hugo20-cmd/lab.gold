'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Play, Pause, ShoppingBag, ArrowRight, Sparkles, Disc, Layers, CheckCircle2, Music, Lock } from 'lucide-react';
import { MOCK_BEATS, MOCK_SAMPLE_PACKS, MOCK_MUSIC, MOCK_VIDEOS, BRAND_NAME, PRODUCER_NAME } from '../data/mockData';
import { InstagramIcon } from '../components/ui/SocialIcons';
import { useAudio } from '../context/AudioContext';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const { playTrack, isPlayingTrack } = useAudio();
  const { addToCart } = useCart();

  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');

  // Dynamically derive categories that actually exist in the current catalog
  const categories = useMemo(() => {
    const activeGenres = Array.from(new Set(MOCK_BEATS.map(b => b.genre)));
    return ['Todos', ...activeGenres];
  }, []);

  const filteredBeats = selectedGenre === 'Todos'
    ? MOCK_BEATS.slice(0, 6)
    : MOCK_BEATS.filter(b => b.genre === selectedGenre).slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 overflow-hidden border-b border-amber-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-[#080808] to-[#080808] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e0a_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5 z-10 flex flex-col items-center justify-center">
          
          {/* Brand Logo Emblem - Balanced & Proportional */}
          <div className="relative group mx-auto">
            <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/30 via-yellow-500/40 to-amber-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse" />
            <div className="relative rounded-2xl gold-gradient-bg p-[1.5px] shadow-xl shadow-amber-500/20 mx-auto transform group-hover:scale-105 transition duration-300">
              <div className="bg-[#08080a] rounded-[14px] p-3.5 sm:p-5 flex items-center justify-center">
                <img 
                  src="/logo-cropped.png" 
                  alt="Laboratório Gold Brand Logo" 
                  className="w-40 sm:w-56 md:w-64 h-auto object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
                />
              </div>
            </div>
          </div>

          <div className="pt-1">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-amber-300 tracking-wider uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              "TRANSFORMANDO IDEIAS EM SOM."
            </h1>
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-zinc-400 leading-relaxed font-normal">
            Beats, samples, músicas e experiências criadas para artistas e produtores independentes que buscam sonoridade de alto nível e identidade autêntica.
          </p>

          <div className="max-w-md mx-auto py-2 opacity-80">
            <div className="flex items-center justify-center gap-1.5 h-8">
              {[30, 45, 80, 60, 90, 100, 70, 50, 85, 95, 60, 40, 75, 90, 80, 55, 30, 65, 85, 40, 20].map((h, idx) => (
                <span
                  key={idx}
                  className="w-1 bg-gradient-to-t from-[#aa7c11] via-[#d4af37] to-[#f5d77f] rounded-full animate-waveform"
                  style={{ height: `${h}%`, animationDelay: `${idx * 0.08}s` }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/beats"
              className="w-full sm:w-auto gold-gradient-bg text-black font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Disc className="w-5 h-5 fill-black" />
              <span>EXPLORAR BEATS</span>
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto glass-panel border border-amber-500/30 hover:border-amber-500/60 text-white font-extrabold text-sm px-8 py-4 rounded-xl hover:bg-amber-500/10 transition flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <span>CONHECER O LABORATÓRIO</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

        </div>
      </section>

      {/* FEATURED BEATS CATALOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
              <Disc className="w-4 h-4" />
              <span>CATÁLOGO DE INSTRUMENTAIS</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-wide uppercase">
              BEATS EM DESTAQUE
            </h2>
            <p className="text-zinc-400 text-xs mt-1">
              Instrumentais exclusivos desenvolvidos no Laboratório Gold com qualidade pronta para vozes e masterização.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  selectedGenre === g
                    ? 'bg-[#d4af37] text-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeats.map((beat) => {
            const isPlaying = isPlayingTrack(beat.id);
            const isSoldExclusive = beat.isSoldExclusive || beat.status === 'sold_exclusive';

            return (
              <div
                key={beat.id}
                className="bg-[#111115] border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-4 transition-all duration-300 group hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-zinc-950 border border-zinc-800">
                    <img
                      src={beat.coverUrl}
                      alt={beat.title}
                      className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${isSoldExclusive ? 'grayscale' : ''}`}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => playTrack({
                          id: beat.id,
                          title: beat.title,
                          artistOrProducer: beat.producer,
                          coverUrl: beat.coverUrl,
                          audioUrl: beat.audioUrl,
                          type: 'beat'
                        })}
                        className="w-14 h-14 rounded-full gold-gradient-bg text-black flex items-center justify-center font-bold shadow-2xl hover:scale-110 transition"
                      >
                        {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-1" />}
                      </button>
                    </div>

                    {isSoldExclusive ? (
                      <span className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>VENDIDO — EXCLUSIVO</span>
                      </span>
                    ) : (
                      <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-400">
                        {beat.genre}
                      </span>
                    )}

                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-zinc-300 px-2.5 py-1 rounded-md text-[10px] font-mono">
                      {beat.bpm} BPM • {beat.key}
                    </div>
                  </div>

                  <div className="space-y-1 mb-3">
                    <Link href={`/beats/${beat.slug}`} className="block">
                      <h3 className="font-extrabold text-base text-white hover:text-amber-400 transition truncate">
                        {beat.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-400">prod. {beat.producer}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {beat.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  {isSoldExclusive ? (
                    <div>
                      <span className="text-[10px] text-red-400 block uppercase font-mono font-bold">Acervo Gold</span>
                      <span className="text-sm font-extrabold text-zinc-400">Exclusivo</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] text-zinc-500 block uppercase font-mono">A partir de</span>
                      <span className="text-sm font-extrabold text-amber-400 font-mono">
                        R$ {beat.priceBasic.toFixed(0)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playTrack({
                        id: beat.id,
                        title: beat.title,
                        artistOrProducer: beat.producer,
                        coverUrl: beat.coverUrl,
                        audioUrl: beat.audioUrl,
                        type: 'beat'
                      })}
                      className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition"
                      title="Ouvir Preview"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4" />}
                    </button>

                    <Link
                      href={`/beats/${beat.slug}`}
                      className={`font-extrabold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1 ${
                        isSoldExclusive ? 'bg-zinc-800 text-zinc-400' : 'gold-gradient-bg text-black hover:brightness-110'
                      }`}
                    >
                      {isSoldExclusive ? <span>DETALHES</span> : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>COMPRAR</span>
                        </>
                      )}
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/beats"
            className="inline-flex items-center gap-2 glass-panel-gold border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 px-8 py-3.5 rounded-xl text-xs font-extrabold tracking-widest uppercase transition"
          >
            <span>VER TODOS OS BEATS NO CATÁLOGO</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SAMPLE PACK SPOTLIGHT SECTION */}
      <section className="bg-gradient-to-b from-[#080808] via-[#101014] to-[#080808] py-16 border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
              <Layers className="w-4 h-4" />
              <span>STARTERS & IDEIAS DE MELODIA PARA PRODUTORES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              STARTERS & <span className="gold-gradient-text">SAMPLE PACKS</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Starters melódicos e timbres refinados criados no estúdio por {PRODUCER_NAME} para elevar o nível das suas produções.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_SAMPLE_PACKS.map(pack => (
              <div
                key={pack.id}
                className="bg-[#121216] border border-amber-500/20 rounded-2xl p-5 space-y-4 hover:border-amber-500/50 transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                    <img src={pack.coverUrl} alt={pack.title} className="w-full h-full object-cover" />
                    {pack.isFree && (
                      <span className="absolute top-3 left-3 bg-emerald-500 text-black font-extrabold text-[10px] px-2.5 py-1 rounded-md">
                        GRÁTIS
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-white uppercase">
                      {pack.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {pack.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-zinc-900 text-amber-400 px-2 py-0.5 rounded font-mono border border-zinc-800">
                      {pack.fileCount} Arquivos
                    </span>
                    {pack.categories.map(cat => (
                      <span key={cat} className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="font-extrabold text-base text-amber-400 font-mono">
                    {pack.isFree ? 'GRÁTIS' : `R$ ${pack.price.toFixed(0)}`}
                  </span>
                  <button
                    onClick={() => addToCart({
                      itemType: 'sample-pack',
                      itemId: pack.id,
                      title: pack.title,
                      coverUrl: pack.coverUrl,
                      price: pack.price
                    })}
                    className="gold-gradient-bg text-black font-extrabold text-xs px-4 py-2 rounded-xl hover:brightness-110 transition"
                  >
                    {pack.isFree ? 'BAIXAR AGORA' : 'ADICIONAR'}
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MUSIC RELEASES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
              <Music className="w-4 h-4" />
              <span>DISCOGRAFIA OFICIAL</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-wide uppercase">
              MÚSICAS & PRODUÇÕES
            </h2>
            <p className="text-zinc-400 text-xs mt-1">
              Faixas autorais e lançamentos assinados por {PRODUCER_NAME}.
            </p>
          </div>

          <Link href="/music" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1">
            VER TODAS AS MÚSICAS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MUSIC.slice(0, 3).map((music) => {
            const isPlaying = isPlayingTrack(music.id);

            return (
              <div
                key={music.id}
                className="bg-[#111115] border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-4 flex gap-4 items-center transition"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                  <img src={music.coverUrl} alt={music.title} className="w-full h-full object-cover" />
                  <button
                    onClick={() => playTrack({
                      id: music.id,
                      title: music.title,
                      artistOrProducer: music.artist,
                      coverUrl: music.coverUrl,
                      audioUrl: music.audioUrl,
                      type: 'music'
                    })}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-amber-400 hover:scale-110 transition"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-amber-400" /> : <Play className="w-6 h-6 fill-amber-400" />}
                  </button>
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {music.genre}
                  </span>
                  <h4 className="font-extrabold text-sm text-white truncate">
                    {music.title}
                  </h4>
                  <p className="text-xs text-zinc-400 truncate">
                    {music.artist}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT THE BRAND & PRODUCER MANIFESTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-amber-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
                <Disc className="w-4 h-4" />
                <span>O CONCEITO LABORATÓRIO GOLD</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase leading-tight">
                ESTÚDIO DE CRIAÇÃO & <span className="gold-gradient-text">INOVAÇÃO MUSICAL</span>
              </h2>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                O <strong>Laboratório Gold</strong> não é apenas uma loja de beats, é um centro de experimentação sonora voltado para a construção de sonoridades marcantes no Trap, Drill, Funk e R&B.
              </p>

              <div className="p-4 rounded-xl bg-black/60 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Produtor Responsável: {PRODUCER_NAME}</span>
                </div>
                <p className="text-zinc-400 text-xs">
                  Criador, arranjador e engenheiro de som responsável pela identidade e direção criativa da marca.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 gold-gradient-bg text-black font-extrabold text-xs px-6 py-3 rounded-xl hover:brightness-110 transition"
              >
                <span>CONHECER HISTÓRIA COMPLETA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <img
                src="/images/original-penna-studio.jpg"
                alt="Original Penna no Estúdio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-amber-500/30">
                <p className="text-xs text-amber-400 font-extrabold uppercase tracking-wider">
                  RIO DE JANEIRO • BRASIL
                </p>
                <p className="text-[11px] text-zinc-300 mt-0.5">
                  Engenharia de áudio e beats de alta precisão.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INSTAGRAM REELS & VIDEOS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
              <InstagramIcon className="w-4 h-4 text-amber-400" />
              <span>REELS & SESSIONS DE ESTÚDIO</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase">VÍDEOS DO LABORATÓRIO</h2>
          </div>
          <Link href="/videos" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1">
            VER TODOS OS VÍDEOS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_VIDEOS.slice(0, 4).map(video => (
            <div key={video.id} className="bg-[#111115] border border-zinc-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden border-b border-zinc-800">
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition">
                    <Link
                      href={`/videos/${video.slug}`}
                      className="w-12 h-12 rounded-full gold-gradient-bg text-black flex items-center justify-center font-bold shadow-xl hover:scale-110 transition"
                    >
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </Link>
                  </div>
                  <span className="absolute top-2.5 left-2.5 bg-black/80 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400">
                    {video.category}
                  </span>
                </div>
                <div className="p-3.5 space-y-1">
                  <Link href={`/videos/${video.slug}`} className="block font-extrabold text-xs text-white hover:text-amber-400 transition line-clamp-2">
                    {video.title}
                  </Link>
                </div>
              </div>

              <div className="p-3.5 pt-0 flex items-center justify-between text-[11px] text-zinc-500 font-mono border-t border-zinc-800/60 mt-2">
                <span>{video.views}</span>
                <Link href={`/videos/${video.slug}`} className="text-amber-400 hover:underline font-bold">
                  Ver Reel ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
