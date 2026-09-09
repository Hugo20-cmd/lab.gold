'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Lock, Disc, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, loginWithGoogle } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await loginUser(emailOrPhone, password);
    if (res.success) {
      router.push('/profile');
    } else {
      setError(res.error || 'Erro ao efetuar login. Verifique seus dados.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (e: any) {
      setError('Erro ao iniciar login com o Google.');
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

      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
        
        {/* Google OAuth Login Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full bg-white hover:bg-zinc-100 text-black font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-3 tracking-wider uppercase border border-zinc-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.28v3.15C3.25 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.28C.46 8.21 0 10.05 0 12s.46 3.79 1.28 5.42l4-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.58l4 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>ENTRAR COM O GOOGLE</span>
        </button>

        <div className="flex items-center gap-3 text-zinc-500 text-[11px] font-mono uppercase">
          <div className="flex-1 h-[1px] bg-zinc-800" />
          <span>OU COM SEU E-MAIL</span>
          <div className="flex-1 h-[1px] bg-zinc-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>E-MAIL</span>
            </label>
            <input
              type="email"
              required
              placeholder="seuemail@gmail.com"
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
            disabled={loading}
            className="w-full gold-gradient-bg text-black font-extrabold text-sm py-4 rounded-xl shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 uppercase tracking-wider mt-2 disabled:opacity-50"
          >
            <span>{loading ? 'ENTRANDO...' : 'ENTRAR NA CONTA'}</span>
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
