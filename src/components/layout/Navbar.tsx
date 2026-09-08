'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, User, Disc, UserCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { BRAND_NAME } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItemsCount, openCart } = useCart();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'INÍCIO', href: '/' },
    { name: 'BEATS', href: '/beats' },
    { name: 'STARTER', href: '/starters' },
    { name: 'MÚSICAS', href: '/music' },
    { name: 'VÍDEOS', href: '/videos' },
    { name: 'HISTÓRIA', href: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <img 
            src="/logo-cropped.png" 
            alt="Laboratório Gold Logo" 
            className="h-11 sm:h-12 w-auto object-contain rounded-lg border border-amber-500/30 p-1 bg-[#08080a] shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-all duration-300" 
          />
          <div className="hidden sm:block">
            <span className="font-extrabold text-lg sm:text-xl tracking-wider gold-gradient-text block leading-none">
              {BRAND_NAME}
            </span>
            <span className="text-[9px] text-zinc-400 font-mono tracking-widest block uppercase mt-1">
              SOUND LAB & PROD
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-xs font-bold tracking-widest transition-all duration-200 rounded-md relative ${
                  active
                    ? 'text-[#d4af37] bg-amber-500/10'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-zinc-900/90 border border-amber-500/30 rounded-full px-3 py-1.5 w-48 sm:w-64 transition-all">
                <Search className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar beats, samples..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-zinc-400 hover:text-white ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-400 transition"
                title="Buscar"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-400 transition relative"
            title="Carrinho"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#d4af37] text-black font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* User Account / Profile Button */}
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-extrabold transition"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span className="max-w-[100px] truncate">{user.name}</span>
            </Link>
          ) : (
            <Link
              href="/register"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg gold-gradient-bg text-black font-extrabold text-xs hover:brightness-110 transition shadow-md"
            >
              <User className="w-3.5 h-3.5 fill-black" />
              <span>CADASTRO</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-lg bg-zinc-900 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0d] border-b border-amber-500/20 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-xs font-bold tracking-widest ${
                isActive(link.href)
                  ? 'bg-amber-500/10 text-[#d4af37] border-l-2 border-[#d4af37]'
                  : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-zinc-400 hover:text-amber-400"
            >
              CONTATO & BOOKING
            </Link>
            
            {user ? (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-md border border-amber-500/20"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{user.name}</span>
              </Link>
            ) : (
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs font-extrabold text-black gold-gradient-bg px-3 py-1.5 rounded-md"
              >
                <User className="w-3.5 h-3.5 fill-black" />
                <span>CADASTRAR-SE</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
