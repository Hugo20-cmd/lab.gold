'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { MOCK_SHOP_PRODUCTS } from '../../../data/mockData';
import { useCart } from '../../../context/CartContext';

export default function ShopProductDetailClient({ slug }: { slug: string }) {
  const product = MOCK_SHOP_PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Produto não encontrado</h2>
        <Link href="/shop" className="inline-block gold-gradient-bg text-black text-xs font-bold px-6 py-2.5 rounded-lg">
          VOLTAR PARA A LOJA
        </Link>
      </div>
    );
  }

  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');

  const handleAddToCart = () => {
    addToCart({
      itemType: 'shop',
      itemId: product.id,
      title: product.title,
      coverUrl: product.images[0],
      price: product.price,
      size: selectedSize
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>VOLTAR PARA A LOJA</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        <div className="md:col-span-6 space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden border border-amber-500/30 bg-zinc-950 shadow-2xl">
            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="md:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 font-mono">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {product.title}
            </h1>
            <p className="text-2xl font-extrabold text-amber-400 font-mono">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
            {product.description}
          </p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                TAMANHO:
              </label>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded-lg text-xs font-bold transition border ${
                      selectedSize === size
                        ? 'gold-gradient-bg text-black border-amber-500 font-extrabold'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-zinc-800 space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full gold-gradient-bg text-black font-extrabold text-sm py-4 rounded-xl shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <ShoppingBag className="w-4 h-4 fill-black" />
              <span>ADICIONAR AO CARRINHO</span>
            </button>

            <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Envio para todo o Brasil com embalagem oficial e garantia Laboratório Gold.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
