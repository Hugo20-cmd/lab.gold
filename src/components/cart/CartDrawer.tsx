'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Disc, MessageSquare } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { generateWhatsAppCheckoutUrl } from '../../lib/whatsapp';

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart, totalPrice, totalItemsCount, clearCart } = useCart();

  if (!isCartOpen) return null;

  const whatsappCheckoutUrl = generateWhatsAppCheckoutUrl(cartItems, totalPrice, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d10] border-l border-amber-500/20 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-lg tracking-wider text-white">
                SEU CARRINHO
              </h3>
              <span className="text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Disc className="w-8 h-8 text-zinc-600" />
                </div>
                <div>
                  <h4 className="text-zinc-300 font-bold text-sm">Seu carrinho está vazio</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Explore nossos beats, sample packs e mercadorias para adicionar itens.
                  </p>
                </div>
                <Link
                  href="/beats"
                  onClick={closeCart}
                  className="gold-gradient-bg text-black font-bold text-xs px-5 py-2.5 rounded-lg shadow-lg shadow-amber-500/20 hover:brightness-110 transition"
                >
                  EXPLORAR BEATS
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 flex gap-3.5 items-center justify-between hover:border-amber-500/30 transition"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-zinc-700 bg-zinc-950 relative">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      {item.itemType} {item.licenseType && `• ${item.licenseType}`} {item.size && `• Size: ${item.size}`}
                    </span>
                    <h5 className="text-xs font-bold text-white truncate mt-1">
                      {item.title}
                    </h5>
                    <p className="text-xs font-bold text-amber-400 mt-0.5">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition"
                    title="Remover"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-[#08080a] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200 font-mono">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Envio pelo WhatsApp</span>
                  <span className="text-emerald-400 font-bold">Direto com @originalpenna</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-extrabold text-white">
                  <span>Total</span>
                  <span className="text-amber-400 font-mono text-base">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>O pedido será gerado como nota fiscal e enviado para (22) 998550323.</span>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href={whatsappCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeCart}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>FINALIZAR NO WHATSAPP</span>
                </a>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 border border-zinc-800 transition"
                >
                  <span>Ver resumo detalhado no carrinho</span>
                </Link>

                <button
                  onClick={clearCart}
                  className="w-full text-zinc-500 hover:text-zinc-300 text-[11px] font-medium py-1 transition"
                >
                  Limpar carrinho
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
