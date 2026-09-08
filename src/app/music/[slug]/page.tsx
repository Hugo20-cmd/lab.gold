import React from 'react';
import { MOCK_MUSIC } from '../../../data/mockData';
import MusicDetailClient from './MusicDetailClient';

export function generateStaticParams() {
  return MOCK_MUSIC.map((track) => ({
    slug: track.slug,
  }));
}

export default async function MusicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MusicDetailClient slug={slug} />;
}
