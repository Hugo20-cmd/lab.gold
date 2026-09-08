'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, ShieldCheck, Tag, CheckCircle2, MessageSquare, UserPlus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { generateWhatsAppCheckoutUrl } from '../../lib/whatsapp';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, totalPrice, totalItemsCount } = useCart();
  const { user } = useAuth();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'GOLD10' || promoCode.trim().toUpperCase() === 'LABORATORIO') {
      setAppliedDiscount(0.10); // 10% OFF
      setPromoSuccess('Cupom de 10% OFF aplicado com sucesso!');
    } else {
      setPromoError('Cupom inválido ou expirado. Tente GOLD10');
    }
  };

  const discountAmount = totalPrice * appliedDiscount;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  const whatsappCheckoutUrl = generateWhatsAppCheckoutUrl(cartItems, totalPrice, discountAmount, user);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
          <ShoppingBag className="w-4 h-4" />
          <span>RESUMO E CHECKOUT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          CARRINHO DE <span className="gold-gradient-text">COMPRAS</span>
        </h1>
        <p className="text-zinc-400 text-sm max-w-xl">
          Revise seus itens e licenças selecionadas. Ao clicar em finalizar, você será redirecionado para o WhatsApp com a nota fiscal detalhada.
        </p>
      </div>

      {/* User Login Warning / Info Card */}
      {!user && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <UserPlus className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs">
              <strong className="text-white font-extrabold block uppercase">RECOMENDADO: FAÇA SEU CADASTRO PRIMEIRO</strong>
              <span className="text-zinc-300">Cadastre seu nome, e-mail e WhatsApp para incluir seus dados na nota do pedido.</span>
            </div>
          </div>
          <Link
            href="/register"
            className="gold-gradient-bg text-black font-extrabold text-xs px-5 py-2.5 rounded-xl shrink-0 uppercase tracking-wider hover:brightness-110 transition"
          >
            CADASTRAR EM 1 MINUTO
          </Link>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10 text-zinc-600" />
          </div>
          <h3 className="text-xl font-bold text-white">Seu carrinho está vazio</h3>
          <p className="text-xs text-zinc-400">
            Você ainda não adicionou nenhum beat ou produto ao seu carrinho.
          </p>
          <Link
            href="/beats"
            className="inline-block gold-gradient-bg text-black font-extrabold text-xs px-8 py-3 rounded-xl uppercase tracking-wider shadow-lg hover:brightness-110 transition"
          >
            EXPLORAR BEATS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Items Table */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-2">
              <span>PRODUTO / LICENÇA ({totalItemsCount})</span>
              <button onClick={clearCart} className="text-zinc-500 hover:text-red-400 transition">
                Limpar Carrinho
              </button>
            </div>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#111115] border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-amber-500/30"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-zinc-800 shrink-0 bg-zinc-950"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {item.itemType} {item.licenseType && `• ${item.licenseType}`} {item.size && `• Size: ${item.size}`}
                      </span>
                      <h4 className="font-extrabold text-sm text-white truncate mt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-amber-400 font-mono mt-0.5">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-zinc-800 pt-3 sm:pt-0">
                    <span className="text-sm font-extrabold text-white font-mono">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary & WhatsApp Trigger */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code Box */}
            <div className="glass-panel p-5 rounded-2xl border border-zinc-800 space-y-3">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>CUPOM DE DESCONTO</span>
              </label>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: GOLD10"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-zinc-500 outline-none focus:border-amber-500/50 flex-1"
                />
                <button
                  type="submit"
                  className="bg-zinc-800 border border-zinc-700 hover:border-amber-500 text-amber-400 font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  APLICAR
                </button>
              </form>

              {promoSuccess && (
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {promoSuccess}
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-400 font-bold">
                  {promoError}
                </p>
              )}
            </div>

            {/* Total Summary Box */}
            <div className="glass-panel-gold p-6 rounded-2xl border border-amber-500/30 space-y-4">
              <h3 className="font-extrabold text-base text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
                RESUMO DO PEDIDO
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Desconto (10%)</span>
                    <span className="font-mono">
                      - R$ {discountAmount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>Cliente</span>
                  <span className="text-amber-400 font-bold">{user ? user.name : 'Visitante'}</span>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-sm font-extrabold text-white uppercase">TOTAL FINAL</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    R$ {finalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* WhatsApp Checkout Primary Button */}
              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm py-4 rounded-xl shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 uppercase tracking-wider mt-4 block text-center"
              >
                <MessageSquare className="w-5 h-5 fill-black inline" />
                <span>FINALIZAR NO WHATSAPP</span>
              </a>

              <div className="p-3 bg-black/60 rounded-xl border border-amber-500/20 text-[10px] text-zinc-300 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>PEDIDO COM NOTA FORMATADA</span>
                </div>
                <p className="text-zinc-400">
                  Ao clicar, seu WhatsApp abre com a nota fiscal cadastral para envio a <strong>(22) 998550323</strong>.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
