import React from 'react';
import { MOCK_SHOP_PRODUCTS } from '../../../data/mockData';
import ShopProductDetailClient from './ShopProductDetailClient';

export function generateStaticParams() {
  return MOCK_SHOP_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ShopProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ShopProductDetailClient slug={slug} />;
}
