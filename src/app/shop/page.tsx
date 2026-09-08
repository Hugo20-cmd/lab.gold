'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { MOCK_SHOP_PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

export default function ShopPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Roupas', 'Acessórios', 'Kits Digitais'];

  const filteredProducts = selectedCategory === 'Todos'
    ? MOCK_SHOP_PRODUCTS
    : MOCK_SHOP_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-4 h-4" />
          <span>VESTUÁRIO & ACESSÓRIOS DE ESTÚDIO</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          LOJA <span className="gold-gradient-text">LABORATÓRIO GOLD</span>
        </h1>
        <p className="text-zinc-400 text-sm max-w-xl">
          Produtos oficiais da marca Laboratório Gold. Vestuário street premium, acessórios para produtores e produtos digitais.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'gold-gradient-bg text-black shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#111115] border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-4 transition group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-950 mb-4 border border-zinc-800">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded text-[10px] font-bold text-amber-400">
                  {product.category}
                </span>
              </div>

              <Link href={`/shop/${product.slug}`} className="block">
                <h3 className="font-extrabold text-sm text-white hover:text-amber-400 transition">
                  {product.title}
                </h3>
              </Link>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 font-mono block">Preço</span>
                <span className="text-sm font-extrabold text-amber-400 font-mono">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                onClick={() => addToCart({
                  itemType: 'shop',
                  itemId: product.id,
                  title: product.title,
                  coverUrl: product.images[0],
                  price: product.price,
                  size: product.sizes?.[0]
                })}
                className="gold-gradient-bg text-black font-extrabold text-xs px-4 py-2.5 rounded-xl hover:brightness-110 transition flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>COMPRAR</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
