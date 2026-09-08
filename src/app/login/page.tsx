'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Lock, Disc, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = loginUser(emailOrPhone);
    if (success) {
      router.push('/profile');
    } else {
      setError('Conta não encontrada com este e-mail ou telefone. Crie sua conta primeiro!');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl gold-gradient-bg p-[1px] mx-auto shadow-xl">
          <div className="w-full h-full bg-[#080808] rounded-[15px] flex items-center justify-center">
            <Disc className="w-6 h-6 text-[#d4af37]" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          LOGIN <span className="gold-gradient-text">CLIENTE</span>
        </h1>
        <p className="text-xs text-zinc-400">
          Acesse sua conta para visualizar suas licenças e dados cadastrais.
        </p>
      </div>

      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>E-MAIL OU WHATSAPP</span>
            </label>
            <input
              type="text"
              required
              placeholder="seuemail@gmail.com ou (22) 99887-6655"
              value={emailOrPhone}
              onChange={e => setEmailOrPhone(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-500/60"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>SENHA</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-500/60"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-bold bg-red-950/40 p-3 rounded-xl border border-red-500/30">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full gold-gradient-bg text-black font-extrabold text-sm py-4 rounded-xl shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 uppercase tracking-wider mt-2"
          >
            <span>ENTRAR NA CONTA</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2 text-xs text-zinc-400 space-y-1">
            <p>Ainda não tem conta cadastrada?</p>
            <Link href="/register" className="text-amber-400 font-extrabold hover:underline block">
              CADASTRE-SE AGORA EM 1 MINUTO
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
}
