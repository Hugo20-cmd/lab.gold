'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, CheckCircle2, Disc, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BRAND_NAME } from '../../data/mockData';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    registerUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });

    setRegistered(true);
    setTimeout(() => {
      router.push('/beats');
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl gold-gradient-bg p-[1px] mx-auto shadow-xl">
          <div className="w-full h-full bg-[#080808] rounded-[15px] flex items-center justify-center">
            <Disc className="w-6 h-6 text-[#d4af37]" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          CADASTRO <span className="gold-gradient-text">LABORATÓRIO GOLD</span>
        </h1>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          Crie sua conta para registrar suas compras, salvar seu nome artístico, e-mail e WhatsApp oficial.
        </p>
      </div>

      {/* Card Container */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl">
        {registered ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full gold-gradient-bg text-black flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase">CADASTRO REALIZADO COM SUCESSO!</h3>
            <p className="text-xs text-zinc-300">
              Seus dados foram salvos. Redirecionando para o catálogo de beats...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>NOME COMPLETO OU ARTÍSTICO *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex: MC Vanguarda / Gabriel Silva"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-500/60"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>E-MAIL PRINCIPAL *</span>
              </label>
              <input
                type="email"
                required
                placeholder="seuemail@gmail.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-500/60"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>WHATSAPP COM DDD (PARA NOTAS E STEMS) *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="(22) 99887-6655"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-500/60 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>CRIE UMA SENHA</span>
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-500/60"
              />
            </div>

            <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Seus dados cadastrais serão anexados à nota fiscal enviada no WhatsApp.</span>
            </div>

            <button
              type="submit"
              className="w-full gold-gradient-bg text-black font-extrabold text-sm py-4 rounded-xl shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 uppercase tracking-wider mt-2"
            >
              <span>CONCLUIR CADASTRO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2 text-xs text-zinc-400">
              Já possui conta cadastrada?{' '}
              <Link href="/login" className="text-amber-400 font-bold hover:underline">
                Fazer Login
              </Link>
            </div>

          </form>
        )}
      </div>

    </div>
  );
}
