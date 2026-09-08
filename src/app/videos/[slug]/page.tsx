import React from 'react';
import { MOCK_VIDEOS } from '../../../data/mockData';
import VideoDetailClient from './VideoDetailClient';

export function generateStaticParams() {
  return MOCK_VIDEOS.map((video) => ({
    slug: video.slug,
  }));
}

export default async function VideoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <VideoDetailClient slug={slug} />;
}
