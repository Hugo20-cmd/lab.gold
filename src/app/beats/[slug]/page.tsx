import React from 'react';
import { MOCK_BEATS } from '../../../data/mockData';
import BeatDetailClient from './BeatDetailClient';

export function generateStaticParams() {
  return MOCK_BEATS.map((beat) => ({
    slug: beat.slug,
  }));
}

export default async function BeatDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BeatDetailClient slug={slug} />;
}
