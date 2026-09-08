'use client';

import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, CheckCircle2, Lock, FileText, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

export const LicensingRulesSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>TERMOS & NORMAS DE COMPRA</span>
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">
            COMO FUNCIONAM AS LICENÇAS E A <span className="gold-gradient-text">EXCLUSIVIDADE</span>?
          </h3>
          <p className="text-xs text-zinc-300">
            Entenda detalhadamente as regras de uso comercial, direitos autorais e o que garante a retirada do beat do catálogo.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="gold-gradient-bg text-black font-extrabold text-xs px-5 py-3 rounded-xl hover:brightness-110 transition flex items-center justify-center gap-2 uppercase tracking-wider shrink-0 shadow-lg"
        >
          <FileText className="w-4 h-4" />
          <span>{isOpen ? 'OCULTAR REGRAS COMPLETA' : 'VER REGRAS COMPLETAS'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
        
        {/* Card 1: Non-Exclusive Licenses */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>1. LICENÇAS NÃO-EXCLUSIVAS (MP3 & WAV FECHADO)</span>
            </h4>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            As opções em <strong className="text-white">MP3 (R$ 100)</strong> e <strong className="text-white">WAV Fechado (R$ 250 / R$ 190)</strong> concedem direito de uso comercial para gravação de vocal, distribuição em plataformas (Spotify, Apple Music, YouTube) e videoclipes.
          </p>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 font-bold">
            ⚠️ O beat PERMANECE À VENDA normalmente no acervo do Laboratório Gold para outros artistas.
          </div>
        </div>

        {/* Card 2: Exclusive Ownership */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1c180b] to-[#0f0d06] border border-amber-500/40 space-y-3 shadow-lg shadow-amber-500/10">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>2. EXCLUSIVIDADE TOTAL (PROJETO + STEMS ABERTOS)</span>
            </h4>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            A <strong className="text-white">ÚNICA FORMA DE ADQUIRIR A EXCLUSIVIDADE</strong> do beat é através da compra Exclusiva (com Stems em WAV abertos e faixas separadas).
          </p>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-400 font-bold">
            👑 O beat sai de venda IMEDIATAMENTE e é RETIRADO PERMANENTEMENTE do catálogo do site.
          </div>
        </div>

      </div>

      {/* Accordion / Expanded Details */}
      {isOpen && (
        <div className="space-y-6 pt-4 border-t border-zinc-800 animate-fade-in text-xs text-zinc-300 leading-relaxed">
          
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
              📌 Tabela Comparativa de Planos & Entregáveis:
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-amber-400 font-mono text-[11px] uppercase">
                    <th className="py-2.5 px-3">Formato / Plano</th>
                    <th className="py-2.5 px-3">Valor Padrão</th>
                    <th className="py-2.5 px-3">Arquivos Entregues</th>
                    <th className="py-2.5 px-3">Status no Catálogo</th>
                    <th className="py-2.5 px-3">Direito Exclusivo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono text-[11px]">
                  <tr>
                    <td className="py-3 px-3 font-bold text-white">BÁSICA (MP3 Fechado)</td>
                    <td className="py-3 px-3 text-amber-300">R$ 100,00</td>
                    <td className="py-3 px-3">MP3 Masterizado com Tag</td>
                    <td className="py-3 px-3 text-emerald-400">Permanece Disponível</td>
                    <td className="py-3 px-3 text-red-400">Não Exclusivo</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-white">PADRÃO (WAV Fechado)</td>
                    <td className="py-3 px-3 text-amber-300">R$ 190 a R$ 250</td>
                    <td className="py-3 px-3">WAV 24-bit Masterizado com Tag</td>
                    <td className="py-3 px-3 text-emerald-400">Permanece Disponível</td>
                    <td className="py-3 px-3 text-red-400">Não Exclusivo</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-white">PROFISSIONAL (WAV + Stems)</td>
                    <td className="py-3 px-3 text-amber-300">R$ 450,00</td>
                    <td className="py-3 px-3">WAV + Pistas Separadas (Stems)</td>
                    <td className="py-3 px-3 text-emerald-400">Permanece Disponível</td>
                    <td className="py-3 px-3 text-red-400">Não Exclusivo</td>
                  </tr>
                  <tr className="bg-amber-500/10">
                    <td className="py-3 px-3 font-bold text-amber-400">EXCLUSIVA (Completo)</td>
                    <td className="py-3 px-3 text-amber-300 font-extrabold">R$ 800,00+</td>
                    <td className="py-3 px-3 text-white">MP3 + WAV + Stems Abertas</td>
                    <td className="py-3 px-3 text-red-400 font-bold">Retirado Permanentemente</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">Exclusividade Total 👑</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2">
            <h5 className="font-bold text-amber-400 uppercase">💡 Dúvidas Frequentes:</h5>
            <ul className="space-y-1.5 list-disc list-inside text-zinc-400">
              <li><strong>Posso registrar no ecossistema do YouTube (Content ID) uma música gravada com licença MP3 ou WAV Fechado?</strong> Não é permitido registrar o áudio no ContentID ou distribuidoras de proteção de direitos sem ter a licença Exclusiva do instrumental.</li>
              <li><strong>Como recebo meus arquivos?</strong> O envio é imediato após confirmação do pagamento via PIX ou cartão no WhatsApp.</li>
              <li><strong>E se eu comprar em MP3/WAV e depois quiser fazer upgrade para Exclusiva?</strong> Se o beat ainda estiver disponível no catálogo, você paga apenas a diferença do valor.</li>
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};
