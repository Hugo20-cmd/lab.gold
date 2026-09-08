'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Calendar, LogOut, Disc, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase">VOCÊ NÃO ESTÁ LOGADO</h2>
        <p className="text-xs text-zinc-400">Faça login ou cadastre-se para visualizar seu perfil.</p>
        <div className="flex gap-3 justify-center pt-2">
          <Link href="/login" className="gold-gradient-bg text-black font-bold text-xs px-6 py-2.5 rounded-xl">
            FAZER LOGIN
          </Link>
          <Link href="/register" className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs px-6 py-2.5 rounded-xl">
            CADASTRAR-SE
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Profile Header */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gold-gradient-bg text-black font-black text-2xl flex items-center justify-center shadow-xl shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                CLIENTE CADASTRADO
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
              {user.name}
            </h1>
            <p className="text-xs text-zinc-400 font-mono">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-zinc-900 border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-400 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>SAIR DA CONTA</span>
        </button>
      </div>

      {/* User Data Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111115] border border-zinc-800 rounded-2xl p-5 space-y-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-amber-400" />
            NOME REGISTRADO
          </span>
          <p className="text-sm font-extrabold text-white truncate">{user.name}</p>
        </div>

        <div className="bg-[#111115] border border-zinc-800 rounded-2xl p-5 space-y-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            E-MAIL CADASTRADO
          </span>
          <p className="text-sm font-extrabold text-white truncate">{user.email}</p>
        </div>

        <div className="bg-[#111115] border border-zinc-800 rounded-2xl p-5 space-y-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            WHATSAPP
          </span>
          <p className="text-sm font-extrabold text-amber-400 font-mono">{user.phone}</p>
        </div>
      </div>

      {/* Order Status Notice */}
      <div className="bg-[#111115] border border-amber-500/20 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base text-white uppercase">
              STATUS DE COMPRAS & LICENÇAS
            </h3>
          </div>
          <Link href="/beats" className="gold-gradient-bg text-black font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1">
            <span>VER BEATS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>SEUS DADOS SERÃO AUTOMATICAMENTE INCLUÍDOS NO WHATSAPP</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            Sempre que você escolher um beat ou licença no site, seu nome (<strong>{user.name}</strong>), e-mail (<strong>{user.email}</strong>) e telefone (<strong>{user.phone}</strong>) serão anexados ao comprovante do pedido enviado para <strong>@originalpenna</strong> no WhatsApp!
          </p>
        </div>
      </div>

    </div>
  );
}
