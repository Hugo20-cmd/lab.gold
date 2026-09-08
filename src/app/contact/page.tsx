'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, QrCode } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, SpotifyIcon } from '../../components/ui/SocialIcons';
import { BRAND_NAME, PRODUCER_NAME, SOCIAL_LINKS } from '../../data/mockData';
import { WHATSAPP_NUMBER, WHATSAPP_QR_LINK } from '../../lib/whatsapp';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Licenciamento de Beat Exclusivo',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
          <MessageSquare className="w-4 h-4" />
          <span>FALE CONOSCO & BOOKING</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          CONTATO & <span className="gold-gradient-text">BOOKING</span>
        </h1>
        <p className="text-zinc-400 text-sm">
          Entre em contato direto com a equipe do Laboratório Gold e {PRODUCER_NAME} para orçamentos, beats exclusivos e colaborações.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Info & Official WhatsApp Card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Official WhatsApp QR Code Card */}
          <div className="bg-gradient-to-b from-[#0e271b] via-[#111115] to-[#111115] border border-emerald-500/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-extrabold uppercase font-mono">
              <QrCode className="w-3.5 h-3.5" />
              <span>WHATSAPP OFICIAL DO PRODUTOR</span>
            </div>

            <div className="w-44 h-44 mx-auto rounded-2xl p-2 bg-white shadow-2xl border-2 border-emerald-500">
              <img
                src="/images/whatsapp-qr.png"
                alt="QR Code WhatsApp Originalpenna"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <div>
              <h3 className="text-lg font-black text-white uppercase">Originalpenna</h3>
              <p className="text-xs text-emerald-400 font-mono font-bold mt-0.5">(22) 998550323</p>
              <p className="text-[11px] text-zinc-400 mt-1">Escaneie o QR Code acima ou clique no botão abaixo para abrir a conversa.</p>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-3 rounded-xl shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 uppercase tracking-wider block"
            >
              <MessageSquare className="w-4 h-4 fill-black inline" />
              <span>ABRIR CONVERSA NO WHATSAPP</span>
            </a>
          </div>

          <div className="bg-[#111115] border border-amber-500/20 rounded-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-base text-white uppercase tracking-wider">
              INFORMAÇÕES DE CONTATO
            </h3>
            
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-center gap-3 p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-mono">E-MAIL OFICIAL</span>
                  <a href="mailto:contato@laboratoriogold.com" className="font-bold text-white hover:text-amber-400 transition">
                    contato@laboratoriogold.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Hub */}
          <div className="bg-[#111115] border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-xs text-amber-400 uppercase tracking-widest">
              REDES SOCIAIS & PLATAFORMAS
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={SOCIAL_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/40 transition text-xs font-bold"
              >
                <SpotifyIcon className="w-4 h-4 text-emerald-400" />
                <span>SPOTIFY</span>
              </a>

              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-red-500 hover:border-red-500/40 transition text-xs font-bold"
              >
                <YoutubeIcon className="w-4 h-4 text-red-500" />
                <span>YOUTUBE</span>
              </a>

              <a
                href={SOCIAL_LINKS.instagramMain}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition text-xs font-bold"
              >
                <InstagramIcon className="w-4 h-4 text-amber-400" />
                <span>@originalpenna</span>
              </a>

              <a
                href={SOCIAL_LINKS.instagramBeats}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition text-xs font-bold"
              >
                <InstagramIcon className="w-4 h-4 text-amber-400" />
                <span>@og.penna</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel-gold rounded-2xl p-6 sm:p-8 border border-amber-500/30">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full gold-gradient-bg text-black flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase">MENSAGEM ENVIADA COM SUCESSO!</h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Obrigado pelo contato. Nossa equipe ou o produtor {PRODUCER_NAME} responderá em até 24 horas.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="gold-gradient-bg text-black font-extrabold text-xs px-6 py-2.5 rounded-xl uppercase tracking-wider"
                >
                  ENVIAR OUTRA MENSAGEM
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-extrabold text-lg text-white uppercase tracking-wider mb-2">
                  FORMULÁRIO DE ATENDIMENTO
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase">SEU NOME / ARTÍSTICO</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: MC Vanguarda"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase">E-MAIL PARA RESPOSTA</label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase">ASSUNTO / INTERESSE</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-amber-400 font-bold outline-none focus:border-amber-500/50"
                  >
                    <option value="Licenciamento de Beat Exclusivo">Licenciamento de Beat Exclusivo</option>
                    <option value="Produção sob Medida / Custom Beat">Produção sob Medida / Custom Beat</option>
                    <option value="Gravação de Estúdio / Mix & Master">Gravação de Estúdio / Mix & Master</option>
                    <option value="Parcerias & Colaborações">Parcerias & Colaborações</option>
                    <option value="Dúvidas sobre o Carrinho / Licenças">Dúvidas sobre o Carrinho / Licenças</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase">MENSAGEM / DETALHES DO PROJETO</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Descreva seu projeto, prazos e referências sonoras..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-bg text-black font-extrabold text-sm py-4 rounded-xl shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>ENVIAR MENSAGEM AGORA</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
