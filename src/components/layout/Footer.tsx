'use client';

import React from 'react';
import Link from 'next/link';
import { Disc, Music, Send } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, SpotifyIcon } from '../ui/SocialIcons';
import { BRAND_NAME, PRODUCER_NAME, SOCIAL_LINKS } from '../../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050507] border-t border-amber-500/20 pt-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <img 
                src="/logo-cropped.png" 
                alt="Laboratório Gold Logo" 
                className="h-12 w-auto object-contain rounded-lg border border-amber-500/30 p-1 bg-[#08080a] shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-all duration-300" 
              />
              <div>
                <span className="font-extrabold text-lg tracking-wider gold-gradient-text block leading-none">
                  {BRAND_NAME}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-widest block uppercase mt-1">
                  SOUND LAB & PROD
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
              Espaço criativo dedicado à criação, produção e experimentação musical underground de alto padrão.
              Produções oficiais desenvolvidas por <strong className="text-amber-400">{PRODUCER_NAME}</strong>.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              <a
                href={SOCIAL_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                title="Spotify Oficial PennaMc"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition"
              >
                <SpotifyIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube Oficial PennaMc"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-500/40 transition"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.instagramMain}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @originalpenna"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.instagramBeats}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @og.penna"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/beats" className="hover:text-white transition">
                  Catálogo de Beats
                </Link>
              </li>
              <li>
                <Link href="/starters" className="hover:text-white transition">
                  Starters & Sample Packs
                </Link>
              </li>
              <li>
                <Link href="/music" className="hover:text-white transition">
                  Lançamentos Autorais
                </Link>
              </li>

              <li>
                <Link href="/videos" className="hover:text-white transition">
                  Vídeos & Sessions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">
              NOVIDADES GOLD
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Receba novos beats, cupons exclusivos e sample packs gratuitos no seu e-mail.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 w-full"
              />
              <button
                type="submit"
                className="gold-gradient-bg text-black p-2 rounded-lg font-bold hover:brightness-110 transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6 text-zinc-400">
            <Link href="/contact" className="hover:text-amber-400 transition">
              Contato & Licenciamento
            </Link>
            <Link href="/about" className="hover:text-amber-400 transition">
              Sobre {PRODUCER_NAME}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
