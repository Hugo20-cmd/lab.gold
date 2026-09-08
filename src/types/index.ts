export type LicenseType = 'BASIC' | 'STANDARD' | 'PROFESSIONAL' | 'EXCLUSIVE';

export interface BeatLicense {
  id: LicenseType;
  name: string;
  icon: string;
  format: string; // e.g. "MP3 COM TAG", "WAV COM TAG", "WAV + STEMS", "MP3 + WAV + STEMS"
  price: number;
  features: string[];
  popular?: boolean;
  isExclusiveCard?: boolean;
  recommendationNote?: string;
}

export interface Beat {
  id: string;
  title: string;
  slug: string;
  genre: 'Trap' | 'Drill' | 'Hip Hop' | 'Funk' | 'R&B' | 'Afrobeat' | 'Outros';
  bpm: number;
  key: string;
  coverUrl: string;
  audioUrl: string; // Preview WAV/MP3
  videoUrl?: string; // Video file or URL
  wavUrl?: string;
  stemsUrl?: string;
  tags: string[];
  priceBasic: number;       // R$ 100
  priceStandard: number;    // R$ 190 ou R$ 250
  priceProfessional: number;// R$ 450
  priceExclusive: number;   // R$ 800
  availableLicenses?: LicenseType[]; // Permite restringir as licenças disponíveis (ex: apenas BASIC e STANDARD)
  isSoldExclusive?: boolean;
  exclusiveSoldDate?: string;
  status: 'available' | 'sold_exclusive' | 'draft';
  plays: number;
  releaseDate: string;
  duration: string;
  producer: string; // Default: "@originalpenna"
  description?: string;
  waveform?: number[];
}

export interface MusicTrack {
  id: string;
  title: string;
  slug: string;
  artist: string;
  producer: string;
  genre: string;
  releaseDate: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  youtubeEmbedUrl?: string;
  description: string;
}

export interface Sample {
  id: string;
  title: string;
  slug: string;
  category: 'Drums' | '808' | 'Loops' | 'Melodies' | 'Vocals' | 'FX' | 'One Shots' | 'MIDI';
  bpm?: number;
  key?: string;
  audioUrl: string;
  isFree: boolean;
  price: number;
  priceClosed?: number;   // Starter Fechado (WAV) - R$ 35
  priceOpen?: number;     // Starter Aberto (Stems) - R$ 80
  priceExclusive?: number;// Starter Exclusivo - R$ 250
  isSoldExclusive?: boolean;
  packName?: string;
}

export interface SamplePack {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  fileCount: number;
  categories: string[];
  price: number;
  isFree: boolean;
  description: string;
  previewAudioUrl: string;
}

export interface ShopProduct {
  id: string;
  title: string;
  slug: string;
  category: 'Roupas' | 'Acessórios' | 'Kits Digitais' | 'Outros';
  price: number;
  images: string[];
  description: string;
  sizes?: string[];
  inStock: boolean;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  category: 'Beatmaking' | 'Making Of' | 'Studio Session' | 'Produção Musical' | 'Bastidores' | 'Tutoriais' | 'Clipes' | 'Shorts';
  duration: string;
  views: string;
  date: string;
  thumbnailUrl: string;
  videoUrl: string;
  description: string;
  instagramUrl?: string;
  reelId?: string;
  likes?: string;
  comments?: string;
}

export interface CartItem {
  id: string;
  itemType: 'beat' | 'sample' | 'sample-pack' | 'shop';
  itemId: string;
  title: string;
  coverUrl: string;
  price: number;
  licenseType?: LicenseType;
  size?: string;
  quantity: number;
}
