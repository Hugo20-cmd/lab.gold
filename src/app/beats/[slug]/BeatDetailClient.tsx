'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Pause, ShoppingBag, CheckCircle2, ArrowLeft, Layers, CreditCard, Lock, Sparkles, AlertCircle, Video, MessageSquare, UserPlus } from 'lucide-react';
import { MOCK_BEATS, DEFAULT_LICENSES } from '../../../data/mockData';
import { LicenseType } from '../../../types';
import { useAudio } from '../../../context/AudioContext';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { WaveformVisualizer } from '../../../components/player/WaveformVisualizer';
import { generateSingleBeatWhatsAppUrl } from '../../../lib/whatsapp';

export default function BeatDetailClient({ slug }: { slug: string }) {
  const beat = MOCK_BEATS.find(b => b.slug === slug);

  if (!beat) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Beat não encontrado</h2>
        <p className="text-xs text-zinc-400">O beat solicitado não existe ou foi removido.</p>
        <Link href="/beats" className="inline-block gold-gradient-bg text-black text-xs font-bold px-6 py-2.5 rounded-lg">
          VOLTAR PARA OS BEATS
        </Link>
      </div>
    );
  }

  const { playTrack, isPlayingTrack, currentTime, duration, seek } = useAudio();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const initialLicense = beat.availableLicenses && beat.availableLicenses.length > 0 
    ? (beat.availableLicenses.includes('PROFESSIONAL') ? 'PROFESSIONAL' : beat.availableLicenses[0])
    : 'PROFESSIONAL';

  const [selectedLicenseId, setSelectedLicenseId] = useState<LicenseType>(initialLicense);
  const [showVideo, setShowVideo] = useState(false);

  const displayedLicenses = beat.availableLicenses && beat.availableLicenses.length > 0
    ? DEFAULT_LICENSES.filter(lic => beat.availableLicenses?.includes(lic.id))
    : DEFAULT_LICENSES;

  const getPriceForLicense = (licenseId: LicenseType) => {
    switch (licenseId) {
      case 'BASIC': return beat.priceBasic;
      case 'STANDARD': return beat.priceStandard;
      case 'PROFESSIONAL': return beat.priceProfessional;
      case 'EXCLUSIVE': return beat.priceExclusive;
      default: return beat.priceBasic;
    }
  };

  const selectedLicenseObj = DEFAULT_LICENSES.find(l => l.id === selectedLicenseId);
  const selectedPrice = getPriceForLicense(selectedLicenseId);
  const isPlaying = isPlayingTrack(beat.id);
  const isSoldExclusive = beat.isSoldExclusive || beat.status === 'sold_exclusive';

  const handleBuyDirectWhatsApp = (licenseId: LicenseType) => {
    if (isSoldExclusive) return;
    const licObj = DEFAULT_LICENSES.find(l => l.id === licenseId);
    const price = getPriceForLicense(licenseId);
    const url = generateSingleBeatWhatsAppUrl(
      beat.title,
      licObj?.name || licenseId,
      price,
      beat.bpm,
      beat.key,
      user
    );
    window.open(url, '_blank');
  };

  const mainWhatsappUrl = generateSingleBeatWhatsAppUrl(
    beat.title,
    selectedLicenseObj?.name || 'PROFESSIONAL',
    selectedPrice,
    beat.bpm,
    beat.key,
    user
  );

  const handleAddToCart = () => {
    if (isSoldExclusive) return;

    addToCart({
      itemType: 'beat',
      itemId: beat.id,
      title: beat.title,
      coverUrl: beat.coverUrl,
      price: selectedPrice,
      licenseType: selectedLicenseId
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Button */}
      <Link href="/beats" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>VOLTAR AO CATÁLOGO DE BEATS</span>
      </Link>

      {/* Main Beat Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Cover / Video Player & Waveform Player */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-amber-500/30 bg-zinc-950 shadow-2xl group">
            {beat.videoUrl && showVideo ? (
              <video
                src={beat.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img
                  src={beat.coverUrl}
                  alt={beat.title}
                  className={`w-full h-full object-cover ${isSoldExclusive ? 'grayscale opacity-70' : ''}`}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => playTrack({
                      id: beat.id,
                      title: beat.title,
                      artistOrProducer: beat.producer,
                      coverUrl: beat.coverUrl,
                      audioUrl: beat.audioUrl,
                      type: 'beat'
                    })}
                    className="w-20 h-20 rounded-full gold-gradient-bg text-black flex items-center justify-center font-bold shadow-2xl hover:scale-110 active:scale-95 transition"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
                  </button>
                </div>
              </>
            )}

            {/* Sold Exclusive Badge */}
            {isSoldExclusive ? (
              <div className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>VENDIDO — EXCLUSIVO</span>
              </div>
            ) : (
              <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-amber-500/30 px-3 py-1 rounded-md text-xs font-bold text-amber-400 uppercase">
                {beat.genre}
              </span>
            )}

            {beat.videoUrl && (
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="absolute bottom-4 right-4 bg-amber-500 text-black font-extrabold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl hover:bg-amber-400 transition"
              >
                <Video className="w-4 h-4" />
                <span>{showVideo ? 'VER CAPA' : 'ASSISTIR VÍDEO'}</span>
              </button>
            )}
          </div>

          {/* Interactive Waveform Scrubber Box */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>WAVEFORM PREVIEW</span>
              <span className="text-amber-400 font-bold">{beat.bpm} BPM • {beat.key}</span>
            </div>
            <WaveformVisualizer
              waveform={beat.waveform}
              currentTime={isPlaying ? currentTime : 0}
              duration={isPlaying ? duration : 210}
              isPlaying={isPlaying}
              onSeek={seek}
              height={48}
              barsCount={45}
            />
          </div>
        </div>

        {/* Right Column: Information & License Chooser */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header Metadata */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                PRODUÇÃO OFICIAL LABORATÓRIO GOLD
              </span>
              <span className="text-xs text-zinc-500 font-mono">{beat.plays.toLocaleString()} visualizações</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span>{beat.title}</span>
              {isSoldExclusive && (
                <span className="text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-md">
                  EXCLUSIVO
                </span>
              )}
            </h1>

            <p className="text-sm text-zinc-400 font-medium">
              Produzido por <strong className="text-amber-400">{beat.producer}</strong> • <span className="font-mono text-amber-300">{beat.bpm} BPM</span> • <span className="font-mono text-amber-300">{beat.key}</span>
            </p>
          </div>

          {/* User Status Bar */}
          {!user ? (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs text-zinc-300">
              <span className="flex items-center gap-2 text-amber-400 font-bold">
                <UserPlus className="w-4 h-4" />
                <span>Faça seu cadastro para salvar seu nome e WhatsApp na nota fiscal!</span>
              </span>
              <Link href="/register" className="gold-gradient-bg text-black font-extrabold text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-wider">
                Cadastrar
              </Link>
            </div>
          ) : (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-400 font-bold">
              <span>Cliente Conectado: {user.name} ({user.phone})</span>
              <Link href="/profile" className="underline text-[11px]">Ver perfil</Link>
            </div>
          )}

          {/* Exclusive Sold Warning Banner */}
          {isSoldExclusive && (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-white font-extrabold uppercase block">BEAT ADQUIRIDO COM DIREITOS EXCLUSIVOS</strong>
                <p className="text-zinc-300">
                  Este instrumental foi vendido com licença exclusiva e foi permanentemente retirado do catálogo de novas vendas. Ele permanece exibido apenas para fins de acervo e portfólio.
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          {beat.description && (
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
              {beat.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {beat.tags.map(tag => (
              <span key={tag} className="text-xs bg-zinc-900 text-zinc-400 px-3 py-1 rounded-lg border border-zinc-800 font-mono">
                #{tag}
              </span>
            ))}
          </div>

          {/* OFFICIAL LICENSE SELECTOR SECTION */}
          <div className="space-y-5 pt-4 border-t border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-black text-xl text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>ESCOLHA SUA LICENÇA</span>
                </h3>
                <p className="text-xs text-zinc-400">Selecione o plano desejado para ser redirecionado imediatamente ao WhatsApp com a nota fiscal.</p>
              </div>

              {/* Payment Info Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>💳 PIX OU CARTÃO</span>
              </div>
            </div>

            {/* License Cards Grid */}
            <div className={`grid grid-cols-1 ${displayedLicenses.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2'} gap-4`}>
              {displayedLicenses.map((lic) => {
                const price = getPriceForLicense(lic.id);
                const isSelected = selectedLicenseId === lic.id && !isSoldExclusive;

                return (
                  <div
                    key={lic.id}
                    onClick={() => {
                      if (!isSoldExclusive) setSelectedLicenseId(lic.id);
                    }}
                    className={`p-5 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                      isSoldExclusive
                        ? 'opacity-50 cursor-not-allowed bg-zinc-950 border-zinc-900'
                        : isSelected
                          ? lic.isExclusiveCard
                            ? 'bg-gradient-to-b from-[#1c180b] to-[#0f0d06] border-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                            : 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/15'
                          : lic.isExclusiveCard
                            ? 'bg-[#121116] border-amber-500/30 hover:border-amber-500/60 cursor-pointer'
                            : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 cursor-pointer'
                    }`}
                  >
                    {/* Popular / Recommended Badge */}
                    {lic.popular && displayedLicenses.length > 2 && (
                      <span className="absolute -top-3 right-4 gold-gradient-bg text-black text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                        🔥 MAIS POPULAR • RECOMENDADA
                      </span>
                    )}

                    {lic.isExclusiveCard && (
                      <span className="absolute -top-3 right-4 bg-amber-400 text-black text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-black" />
                        <span>EXCLUSIVIDADE TOTAL</span>
                      </span>
                    )}

                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base">{lic.icon}</span>
                            <h4 className="font-black text-sm text-white uppercase tracking-wider">
                              {lic.name}
                            </h4>
                          </div>
                          <span className="text-[10px] text-amber-400 font-mono font-bold block mt-1">
                            {lic.format}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="font-black text-lg text-amber-400 font-mono block">
                            R$ {price.toFixed(0)}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2 py-3 border-t border-zinc-800/80">
                        {lic.features.map((feat, idx) => (
                          <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Direct WhatsApp Action Button inside each license card */}
                    {!isSoldExclusive && (
                      <div className="pt-3 mt-2 border-t border-zinc-800/50">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyDirectWhatsApp(lic.id);
                          }}
                          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 uppercase tracking-wider"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-black" />
                          <span>COMPRAR PLANO {lic.name}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* EXPLICIT NON-EXCLUSIVE WARNING & RULES BOX */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold uppercase">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>NORMAS & REGRAS DE COMPRA E LICENCIAMENTO</span>
              </div>
              <div className="space-y-1.5 text-zinc-300 leading-relaxed">
                <p>
                  <strong>• Licenças MP3 (R$ 100) e WAV Fechado (R$ 250 / R$ 190):</strong> São licenças <span className="text-amber-400 font-bold">NÃO-EXCLUSIVAS</span>. A compra garante o direito de uso para gravação, lançamentos e videoclipes, porém o instrumental <span className="underline">permanece disponível no catálogo</span> para outros artistas.
                </p>
                <p>
                  <strong>• Exclusividade Total:</strong> Apenas a compra da licença <span className="text-amber-400 font-bold">EXCLUSIVA</span> (com projeto aberto em Stems WAV separados) garante o direito exclusivo e <span className="underline">retira o beat permanentemente do catálogo de vendas</span>.
                </p>
              </div>
            </div>

            {/* Primary Buy CTA Box */}
            <div className="p-5 rounded-2xl glass-panel-gold border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-mono block">Plano Selecionado</span>
                <span className="text-lg font-extrabold text-white">
                  {selectedLicenseObj?.name} —{' '}
                  <span className="text-amber-400 font-mono">
                    R$ {selectedPrice.toFixed(0)},00
                  </span>
                </span>
              </div>

              {isSoldExclusive ? (
                <button
                  disabled
                  className="w-full sm:w-auto bg-zinc-800 border border-zinc-700 text-zinc-500 font-extrabold text-sm px-8 py-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Lock className="w-4 h-4" />
                  <span>VENDIDO — EXCLUSIVO</span>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                  <a
                    href={mainWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs px-8 py-4 rounded-xl shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4.5 h-4.5 fill-black" />
                    <span>FINALIZAR NO WHATSAPP COM ESTE PLANO</span>
                  </a>

                  <button
                    onClick={handleAddToCart}
                    className="gold-gradient-bg text-black font-extrabold text-xs px-5 py-4 rounded-xl shadow-xl hover:brightness-110 transition flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  >
                    <ShoppingBag className="w-4 h-4 fill-black" />
                    <span>CARRINHO</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
