'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Pause, Download, ShoppingBag, Layers, ArrowRight, X, CreditCard, MessageSquare, Lock } from 'lucide-react';
import { MOCK_SAMPLES, MOCK_SAMPLE_PACKS, DEFAULT_STARTER_LICENSES, PRODUCER_NAME } from '../../data/mockData';
import { useAudio } from '../../context/AudioContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { generateSingleStarterWhatsAppUrl } from '../../lib/whatsapp';
import { Sample } from '../../types';

export default function StartersPage() {
  const { playTrack, isPlayingTrack } = useAudio();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeLicenseModalSample, setActiveLicenseModalSample] = useState<Sample | null>(null);
  const [selectedLicenseId, setSelectedLicenseId] = useState<'CLOSED' | 'OPEN_EXCLUSIVE'>('OPEN_EXCLUSIVE');

  const categories = ['Todos', 'Melodies', 'Loops', 'Ambient', 'Pianos', 'Synths'];

  const filteredSamples = selectedCategory === 'Todos'
    ? MOCK_SAMPLES
    : MOCK_SAMPLES.filter(s => s.category === selectedCategory);

  const getPriceForStarterLicense = (sample: Sample, licenseId: string) => {
    switch (licenseId) {
      case 'CLOSED': return sample.priceClosed || 100.00;
      case 'OPEN_EXCLUSIVE': return sample.priceOpen || sample.priceExclusive || 300.00;
      default: return sample.priceClosed || 100.00;
    }
  };

  const handleBuyDirectWhatsApp = (sample: Sample, licenseId: string) => {
    if (sample.isSoldExclusive) return;
    const licObj = DEFAULT_STARTER_LICENSES.find(l => l.id === licenseId);
    const price = getPriceForStarterLicense(sample, licenseId);
    const url = generateSingleStarterWhatsAppUrl(
      sample.title,
      licObj?.name || licenseId,
      price,
      sample.bpm,
      sample.key,
      user
    );
    window.open(url, '_blank');
  };

  const handleAddToCartWithLicense = (sample: Sample, licenseId: string) => {
    if (sample.isSoldExclusive) return;
    const price = getPriceForStarterLicense(sample, licenseId);
    const licObj = DEFAULT_STARTER_LICENSES.find(l => l.id === licenseId);
    addToCart({
      itemType: 'sample',
      itemId: sample.id,
      title: `${sample.title} (${licObj?.name || licenseId})`,
      coverUrl: '/covers/starter-pack-v1.png',
      price: price
    });
    setActiveLicenseModalSample(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
            <Layers className="w-4 h-4" />
            <span>STARTERS & MELODY LOOPS DO ESTÚDIO</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            CATÁLOGO DE <span className="gold-gradient-text">STARTERS</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl mt-1">
            Starters de melodia, ideias de arranjo, pianos e composições criadas pessoalmente por {PRODUCER_NAME}. Opções em versão masterizada (Starter Fechado por R$ 100) ou versão aberta com Stems + Exclusividade (R$ 300 - com retirada permanente do catálogo).
          </p>
        </div>

        <Link
          href="/sample-packs"
          className="gold-gradient-bg text-black font-extrabold text-xs px-5 py-3 rounded-xl hover:brightness-110 transition shrink-0 flex items-center gap-2 uppercase tracking-wider"
        >
          <span>VER KITS DE STARTERS COMPLETOS</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Starter Pack Feature Banner */}
      {MOCK_SAMPLE_PACKS.length > 0 && (
        <div className="bg-[#111115] border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden border border-amber-500/40 bg-black shrink-0 shadow-lg group">
              <img
                src={MOCK_SAMPLE_PACKS[0].coverUrl}
                alt={MOCK_SAMPLE_PACKS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 px-3 py-1 rounded border border-amber-500/30 uppercase">
                PACOTE DE STARTERS OFICIAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight">
                {MOCK_SAMPLE_PACKS[0].title}
              </h2>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {MOCK_SAMPLE_PACKS[0].description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => playTrack({
                id: 'starter-pack-preview',
                title: MOCK_SAMPLE_PACKS[0].title,
                artistOrProducer: PRODUCER_NAME,
                coverUrl: MOCK_SAMPLE_PACKS[0].coverUrl,
                audioUrl: MOCK_SAMPLE_PACKS[0].previewAudioUrl,
                type: 'sample'
              })}
              className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-amber-400 hover:border-amber-400 transition shadow-md"
              title="Ouvir Preview do Pack"
            >
              <Play className="w-5 h-5 fill-amber-400" />
            </button>

            <button
              onClick={() => addToCart({
                itemType: 'sample-pack',
                itemId: MOCK_SAMPLE_PACKS[0].id,
                title: MOCK_SAMPLE_PACKS[0].title,
                coverUrl: MOCK_SAMPLE_PACKS[0].coverUrl,
                price: MOCK_SAMPLE_PACKS[0].price
              })}
              className="gold-gradient-bg text-black font-extrabold text-xs px-6 py-3.5 rounded-xl hover:brightness-110 transition shadow-lg flex items-center gap-2 uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>BAIXAR PACK GRÁTIS</span>
            </button>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'gold-gradient-bg text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Starters List */}
      <div className="space-y-3">
        {filteredSamples.map((sample) => {
          const isPlaying = isPlayingTrack(sample.id);
          const isSoldExclusive = sample.isSoldExclusive;

          return (
            <div
              key={sample.id}
              className={`bg-[#111115] border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition shadow-md ${
                isSoldExclusive ? 'border-red-900/40 opacity-75' : 'border-zinc-800/80 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <button
                  onClick={() => playTrack({
                    id: sample.id,
                    title: sample.title,
                    artistOrProducer: sample.packName || PRODUCER_NAME,
                    coverUrl: '/covers/starter-pack-v1.png',
                    audioUrl: sample.audioUrl,
                    type: 'sample'
                  })}
                  className="w-12 h-12 rounded-full gold-gradient-bg text-black flex items-center justify-center font-bold shadow-lg shrink-0 hover:scale-105 transition"
                  title="Ouvir Starter"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-white truncate">
                      {sample.title}
                    </h4>
                    {isSoldExclusive ? (
                      <span className="text-[9px] bg-red-600 text-white font-bold px-2.5 py-0.5 rounded font-mono uppercase flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        VENDIDO — EXCLUSIVO
                      </span>
                    ) : sample.isFree ? (
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded font-bold uppercase font-mono">
                        GRÁTIS
                      </span>
                    ) : (
                      <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded font-bold uppercase font-mono">
                        FECHADO R$ 100 • ABERTO + STEMS R$ 300
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    {sample.category} {sample.bpm && `• ${sample.bpm} BPM`} {sample.key && `• Tom: ${sample.key}`} {sample.packName && `• ${sample.packName}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-xs font-mono font-bold text-amber-400">
                  {isSoldExclusive
                    ? 'EXCLUSIVO'
                    : sample.isFree
                    ? 'GRÁTIS'
                    : `R$ ${(sample.priceClosed || 100).toFixed(0)},00 — R$ ${(sample.priceOpen || 300).toFixed(0)},00`}
                </span>

                {isSoldExclusive ? (
                  <button
                    disabled
                    className="bg-zinc-800 text-zinc-500 font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-not-allowed flex items-center gap-1.5"
                  >
                    <Lock className="w-4 h-4" />
                    <span>VENDIDO</span>
                  </button>
                ) : sample.isFree ? (
                  <button
                    onClick={() => addToCart({
                      itemType: 'sample',
                      itemId: sample.id,
                      title: sample.title,
                      coverUrl: '/covers/starter-pack-v1.png',
                      price: 0
                    })}
                    className="gold-gradient-bg text-black font-extrabold text-xs px-5 py-2.5 rounded-xl hover:brightness-110 transition flex items-center gap-1.5 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>BAIXAR WAV</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setActiveLicenseModalSample(sample);
                      setSelectedLicenseId('OPEN_EXCLUSIVE');
                    }}
                    className="gold-gradient-bg text-black font-extrabold text-xs px-5 py-2.5 rounded-xl hover:brightness-110 transition flex items-center gap-1.5 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ESCOLHER PLANO</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Starter License Modal */}
      {activeLicenseModalSample && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111115] border border-amber-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gold-gradient-bg p-[1px]">
                  <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center">
                    <Layers className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                    SELEÇÃO DE OPÇÃO DO STARTER
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    {activeLicenseModalSample.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveLicenseModalSample(null)}
                className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              <div className="space-y-1">
                <p className="text-xs text-zinc-400">
                  Escolha o formato ideal para a sua produção (Starter Fechado por R$ 100,00 ou Starter Aberto + Stems Exclusivo por R$ 300,00):
                </p>
              </div>

              {/* License Option Cards Grid */}
              <div className="grid grid-cols-1 gap-4">
                {DEFAULT_STARTER_LICENSES.map((lic) => {
                  const isSelected = selectedLicenseId === lic.id;
                  const price = getPriceForStarterLicense(activeLicenseModalSample, lic.id);

                  return (
                    <div
                      key={lic.id}
                      onClick={() => setSelectedLicenseId(lic.id as any)}
                      className={`cursor-pointer p-4.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{lic.icon}</span>
                          <h4 className="font-extrabold text-sm text-white">
                            {lic.name}
                          </h4>
                          {lic.popular && (
                            <span className="text-[9px] font-bold bg-amber-500 text-black px-2 py-0.5 rounded font-mono uppercase">
                              MAIS POPULAR
                            </span>
                          )}
                          {lic.isExclusiveCard && (
                            <span className="text-[9px] font-bold bg-red-600 text-white px-2 py-0.5 rounded font-mono uppercase">
                              SAI DE VENDA
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-amber-400 font-mono font-semibold">
                          Formatos: {lic.format}
                        </p>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {lic.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                        <span className="text-xl font-black text-amber-400 font-mono">
                          R$ {price.toFixed(0)},00
                        </span>

                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-amber-400 bg-amber-400' : 'border-zinc-600'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Modal Action Footer */}
            <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleBuyDirectWhatsApp(activeLicenseModalSample, selectedLicenseId)}
                  className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>COMPRAR AGORA NO WHATSAPP</span>
                </button>

                <button
                  onClick={() => handleAddToCartWithLicense(activeLicenseModalSample, selectedLicenseId)}
                  className="w-full sm:flex-1 gold-gradient-bg text-black font-extrabold text-xs py-3.5 px-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADICIONAR AO CARRINHO</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono">
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>PAGAMENTO SEGURO VIA PIX OU CARTÃO DE CRÉDITO</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
