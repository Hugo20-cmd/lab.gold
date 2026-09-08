import { Beat, MusicTrack, Sample, SamplePack, ShopProduct, Video, BeatLicense } from '../types';

export const PRODUCER_NAME = "@originalpenna";
export const BRAND_NAME = "LABORATÓRIO GOLD";

export const SOCIAL_LINKS = {
  spotify: "https://open.spotify.com/artist/3gu1gCXTmzDd7sQeTXEf4U",
  youtube: "https://www.youtube.com/@Pennamc",
  instagramMain: "https://www.instagram.com/originalpenna/",
  instagramBeats: "https://www.instagram.com/og.penna/",
};

export const DEFAULT_LICENSES: BeatLicense[] = [
  {
    id: 'BASIC',
    name: 'BÁSICA',
    icon: '🎧',
    format: 'MP3 COM TAG',
    price: 100.00,
    features: [
      'Pronta para uso',
      'Arquivo MP3 com tag',
      'Ideal para projetos simples'
    ],
    recommendationNote: 'Opção de entrada para demonstração e projetos prévios.'
  },
  {
    id: 'STANDARD',
    name: 'PADRÃO',
    icon: '🔥',
    format: 'WAV COM TAG',
    price: 190.00,
    features: [
      'Qualidade profissional',
      'Arquivo WAV com tag',
      'Som mais definido'
    ],
    recommendationNote: 'Ótima fidelidade de som para ensaios e mixtapes.'
  },
  {
    id: 'PROFESSIONAL',
    name: 'PROFISSIONAL',
    icon: '🚀',
    format: 'WAV + STEMS',
    price: 450.00,
    popular: true,
    features: [
      'Beat aberto (stems)',
      'Maior liberdade para mixagem e masterização',
      'Ideal para lançamentos profissionais'
    ],
    recommendationNote: 'Opção recomendada para artistas que pretendem lançar comercialmente.'
  },
  {
    id: 'EXCLUSIVE',
    name: 'EXCLUSIVA',
    icon: '👑',
    format: 'MP3 + WAV + STEMS',
    price: 800.00,
    isExclusiveCard: true,
    features: [
      'Beat sai da venda após a compra',
      'Uso exclusivo do instrumental',
      'Inclui MP3, WAV e stems'
    ],
    recommendationNote: 'Garante exclusividade total e a retirada permanente do catálogo.'
  }
];

// Audio Demos
const AUDIO_MIDNIGHT_TYPE = "/audio/midnight-type.wav";
const AUDIO_SAMPLE_1 = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=trap-future-bass-royalty-free-music-111005.mp3";
const AUDIO_SAMPLE_2 = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7090b.mp3?filename=drill-beat-10023.mp3";
const AUDIO_SAMPLE_3 = "https://cdn.pixabay.com/download/audio/2021/09/06/audio_8b21c43aa4.mp3?filename=hip-hop-10707.mp3";

export const MOCK_BEATS: Beat[] = [
  {
    id: 'beat-distrito23-type',
    title: 'DISTRITO 23 TYPE',
    slug: 'distrito23-type',
    genre: 'Trap',
    bpm: 135,
    key: 'D Min',
    coverUrl: '/covers/distrito23-type.png',
    audioUrl: '/audio/distrito23-type.wav',
    tags: ['Distrito 23', 'Type Beat', '135 BPM', 'Trap Underground', 'Favela Trap', 'Gold Series'],
    priceBasic: 100.00,
    priceStandard: 250.00,
    priceProfessional: 450.00,
    priceExclusive: 800.00,
    availableLicenses: ['BASIC', 'STANDARD'],
    isSoldExclusive: false,
    status: 'available',
    plays: 1,
    releaseDate: '2026-09-08',
    duration: '3:15',
    producer: PRODUCER_NAME,
    description: 'Instrumental oficial "DISTRITO 23 TYPE". 135 BPM em D Minor. Bateria urbana pesada, sonoridade underground periférica criada por @originalpenna no Laboratório Gold. Opções de compra: MP3 Fechado (R$ 100) e WAV Fechado (R$ 250). *Atenção: Licenças MP3 e WAV Fechado são NÃO EXCLUSIVAS (o beat permanece à venda no acervo).*',
    waveform: [50, 70, 95, 100, 85, 90, 100, 95, 80, 85, 95, 90, 70, 100, 95, 85, 70, 65, 90, 95, 75, 60, 100, 95, 85, 70]
  },
  {
    id: 'beat-trap-comic-serum-3',
    title: 'TYPE TRAP COMIC (Serum 3)',
    slug: 'type-trap-comic-serum-3',
    genre: 'Trap',
    bpm: 105,
    key: 'D Min',
    coverUrl: '/covers/trap-comic-serum-3.png',
    audioUrl: '/audio/trap-comic-serum-3.wav',
    tags: ['Type Trap Comic', 'Serum 3', '105 BPM', 'D Minor', 'Trap', 'Gold Series'],
    priceBasic: 100.00,
    priceStandard: 190.00,
    priceProfessional: 450.00,
    priceExclusive: 800.00,
    isSoldExclusive: false,
    status: 'available',
    plays: 1,
    releaseDate: '2026-09-08',
    duration: '3:05',
    producer: PRODUCER_NAME,
    description: 'Instrumental "TYPE TRAP COMIC" desenvolvido com synths no Serum 3 por @originalpenna. 105 BPM em D Minor. Timbres psicodélicos, graves potentes e arranjo dinâmico.',
    waveform: [45, 65, 80, 95, 90, 85, 100, 90, 80, 75, 90, 85, 65, 95, 100, 85, 70, 60, 85, 90, 70, 55, 95, 90, 80, 65]
  },
  {
    id: 'beat-midnight-type',
    title: 'MIDNIGHT TYPE (Lithe x Don Toliver)',
    slug: 'midnight-type',
    genre: 'Trap',
    bpm: 126,
    key: 'Eb Min',
    coverUrl: '/covers/midnight-type.png',
    audioUrl: '/audio/midnight-type.wav',
    tags: ['Midnight Type', 'Lithe', 'Don Toliver', '126 BPM', 'Eb Minor', 'Gold Series'],
    priceBasic: 100.00,
    priceStandard: 190.00,
    priceProfessional: 450.00,
    priceExclusive: 800.00,
    isSoldExclusive: false,
    status: 'available',
    plays: 1,
    releaseDate: '2026-09-08',
    duration: '3:30',
    producer: PRODUCER_NAME,
    description: 'Instrumental oficial "MIDNIGHT TYPE" (Lithe x Don Toliver). 126 BPM em Eb Minor. Beats envolventes para produções noturnas com graves potentes e melodia marcante assinada por @originalpenna.',
    waveform: [40, 60, 85, 90, 75, 80, 95, 100, 85, 75, 90, 80, 60, 95, 100, 90, 75, 60, 85, 90, 70, 50, 95, 100, 80, 60]
  },
  {
    id: 'beat-rare-g-sax-groove',
    title: 'TYPE RARE G (Sax Groove)',
    slug: 'type-rare-g-sax-groove',
    genre: 'Trap',
    bpm: 100,
    key: 'E Min',
    coverUrl: '/covers/rare-g-sax-groove.png',
    audioUrl: '/audio/rare-g-sax-groove.wav',
    tags: ['Type Rare G', 'Sax Groove', '100 BPM', 'E Minor', 'Gold Series', 'Penna Beats'],
    priceBasic: 100.00,
    priceStandard: 190.00,
    priceProfessional: 450.00,
    priceExclusive: 800.00,
    isSoldExclusive: false,
    status: 'available',
    plays: 1,
    releaseDate: '2026-09-08',
    duration: '2:55',
    producer: PRODUCER_NAME,
    description: 'Instrumental oficial "TYPE RARE G (Sax Groove)". 100 BPM em E Minor. Arranjo sofisticado com groove de saxofone envolvente, graves profundos e timbres orgânicos produzidos por @originalpenna no Laboratório Gold.',
    waveform: [40, 60, 85, 90, 75, 80, 95, 100, 85, 75, 90, 80, 60, 95, 100, 90, 75, 60, 85, 90, 70, 50, 95, 100, 80, 60]
  }
];

export const MOCK_MUSIC: MusicTrack[] = [
  {
    id: 'yt-music-1',
    title: '♠️ QUANTO TEMPO',
    slug: 'quanto-tempo',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Trap',
    releaseDate: '2026',
    duration: '2:05',
    coverUrl: '/music/yt-1.jpg',
    audioUrl: AUDIO_SAMPLE_1,
    youtubeUrl: 'https://www.youtube.com/watch?v=9gpWz0OsecE',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/9gpWz0OsecE',
    description: 'Single oficial "QUANTO TEMPO" por PennaMc. Produção musical exclusiva e direção de som no Laboratório Gold.'
  },
  {
    id: 'yt-music-2',
    title: '♠️ SÓ ACREDITAR',
    slug: 'so-acreditar',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Trap',
    releaseDate: '2026',
    duration: '2:40',
    coverUrl: '/music/yt-2.jpg',
    audioUrl: AUDIO_SAMPLE_2,
    youtubeUrl: 'https://www.youtube.com/watch?v=W8Z_KJeSJRo',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/W8Z_KJeSJRo',
    description: 'Faixa oficial "SÓ ACREDITAR" por PennaMc. Sonoridade de peso e lírica marcante do canal oficial PennaMc.'
  },
  {
    id: 'yt-music-3',
    title: '♠️ EU TÔ BEM',
    slug: 'eu-to-bem',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Trap',
    releaseDate: '2026',
    duration: '2:27',
    coverUrl: '/music/yt-3.jpg',
    audioUrl: AUDIO_SAMPLE_3,
    youtubeUrl: 'https://www.youtube.com/watch?v=i5YcOO6CNpQ',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/i5YcOO6CNpQ',
    description: 'Faixa autoral "EU TÔ BEM" por PennaMc. Produzida com a identidade marcante do estúdio Laboratório Gold.'
  },
  {
    id: 'yt-music-4',
    title: '♠️ BEM LONGE DE TUDO',
    slug: 'bem-longe-de-tudo',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Underground',
    releaseDate: '2026',
    duration: '2:19',
    coverUrl: '/music/yt-4.jpg',
    audioUrl: AUDIO_SAMPLE_1,
    youtubeUrl: 'https://www.youtube.com/watch?v=PrMxcMluU9I',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/PrMxcMluU9I',
    description: 'Música oficial "BEM LONGE DE TUDO" por PennaMc. Clima reflexivo e beats imersivos assinados por @originalpenna.'
  },
  {
    id: 'yt-music-5',
    title: '♠️ É LOUCURA',
    slug: 'e-loucura',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Trap / Hip-Hop',
    releaseDate: '2026',
    duration: '2:47',
    coverUrl: '/music/yt-5.jpg',
    audioUrl: AUDIO_SAMPLE_2,
    youtubeUrl: 'https://www.youtube.com/watch?v=X6ujiK_JpoM',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/X6ujiK_JpoM',
    description: 'Single "É LOUCURA" por PennaMc. Lançamento oficial disponível no YouTube.'
  },
  {
    id: 'yt-music-6',
    title: '♠️ INTRO',
    slug: 'intro-penna',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Intro / Rap',
    releaseDate: '2026',
    duration: '3:44',
    coverUrl: '/music/yt-6.jpg',
    audioUrl: AUDIO_SAMPLE_3,
    youtubeUrl: 'https://www.youtube.com/watch?v=HslFKNoo4FE',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/HslFKNoo4FE',
    description: 'Faixa introdutória "INTRO" por PennaMc. Conceito sonoro e arranjo de abertura do álbum.'
  },
  {
    id: 'yt-music-7',
    title: 'Nosso Reinado (Official Visualizer)',
    slug: 'nosso-reinado',
    artist: 'Wiz | Vin | Penna',
    producer: 'Correria Rec',
    genre: 'Trap / Rap',
    releaseDate: '2026',
    duration: '2:10',
    coverUrl: '/music/yt-7.jpg',
    audioUrl: AUDIO_SAMPLE_1,
    youtubeUrl: 'https://www.youtube.com/watch?v=tvQ69rQXIOc',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/tvQ69rQXIOc',
    description: 'Colaboração especial "Nosso Reinado" com Wiz, Vin e Penna. Produção por Correria Rec.'
  },
  {
    id: 'yt-music-8',
    title: 'Acústico #02 ☀️ (Audio Prévia)',
    slug: 'acustico-02-previa',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Acústico / R&B',
    releaseDate: '2026',
    duration: '2:28',
    coverUrl: '/music/yt-8.jpg',
    audioUrl: AUDIO_SAMPLE_2,
    youtubeUrl: 'https://www.youtube.com/watch?v=QXHvhqSNGuo',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/QXHvhqSNGuo',
    description: 'Prévia de áudio do Acústico #02 por PennaMc. Arranjos melódicos e timbres orgânicos.'
  },
  {
    id: 'yt-music-9',
    title: '04:00am 🕓',
    slug: '0400am',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Trap / Midnight',
    releaseDate: '2026',
    duration: '3:03',
    coverUrl: '/music/yt-9.jpg',
    audioUrl: AUDIO_SAMPLE_3,
    youtubeUrl: 'https://www.youtube.com/watch?v=X2ced6m6nZk',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/X2ced6m6nZk',
    description: 'Faixa "04:00am" inspirada na atmosfera noturna e gravações de madrugada no Laboratório Gold.'
  },
  {
    id: 'yt-music-10',
    title: 'Mulher ♀️ #01',
    slug: 'mulher-01',
    artist: 'Penna l M Rodrigues',
    producer: PRODUCER_NAME,
    genre: 'Rap / R&B',
    releaseDate: '2026',
    duration: '1:39',
    coverUrl: '/music/yt-10.jpg',
    audioUrl: AUDIO_SAMPLE_1,
    youtubeUrl: 'https://www.youtube.com/watch?v=EZvnhgk34yg',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/EZvnhgk34yg',
    description: 'Faixa "Mulher #01" parceria entre Penna e M Rodrigues.'
  },
  {
    id: 'yt-music-11',
    title: 'Penna - Observação 👀',
    slug: 'observacao',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Underground',
    releaseDate: '2026',
    duration: '1:23',
    coverUrl: '/music/yt-11.jpg',
    audioUrl: AUDIO_SAMPLE_2,
    youtubeUrl: 'https://www.youtube.com/watch?v=Vjs2wYe741o',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/Vjs2wYe741o',
    description: 'Single "Observação" por PennaMc. Rimas afiadas e produção direto do estúdio.'
  },
  {
    id: 'yt-music-12',
    title: 'ERRATA ! 📨 (Oficial Music)',
    slug: 'errata-oficial-music',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Trap',
    releaseDate: '2026',
    duration: '3:12',
    coverUrl: '/music/yt-12.jpg',
    audioUrl: AUDIO_SAMPLE_3,
    youtubeUrl: 'https://www.youtube.com/watch?v=Fk1FMfB6F9w',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/Fk1FMfB6F9w',
    description: 'Música oficial "ERRATA !" por PennaMc.'
  },
  {
    id: 'yt-music-13',
    title: 'Intro - Persistência (Oficial Music)',
    slug: 'intro-persistencia',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Intro',
    releaseDate: '2026',
    duration: '3:07',
    coverUrl: '/music/yt-13.jpg',
    audioUrl: AUDIO_SAMPLE_1,
    youtubeUrl: 'https://www.youtube.com/watch?v=Y-AMOActpeI',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/Y-AMOActpeI',
    description: 'Faixa "Intro - Persistência" marcando a caminhada autoral de PennaMc.'
  },
  {
    id: 'yt-music-14',
    title: '02 - Aprofundo (Oficial Music)',
    slug: '02-aprofundo',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Trap',
    releaseDate: '2026',
    duration: '2:44',
    coverUrl: '/music/yt-14.jpg',
    audioUrl: AUDIO_SAMPLE_2,
    youtubeUrl: 'https://www.youtube.com/watch?v=FMqnKxbiL1k',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/FMqnKxbiL1k',
    description: 'Faixa "02 - Aprofundo" do canal oficial PennaMc.'
  },
  {
    id: 'yt-music-15',
    title: '03 - Diferenciada (Oficial Music)',
    slug: '03-diferenciada',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Trap / Hip-Hop',
    releaseDate: '2026',
    duration: '3:33',
    coverUrl: '/music/yt-15.jpg',
    audioUrl: AUDIO_SAMPLE_3,
    youtubeUrl: 'https://www.youtube.com/watch?v=XJXuTEaWYVw',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/XJXuTEaWYVw',
    description: 'Single "03 - Diferenciada" por PennaMc.'
  },
  {
    id: 'yt-music-16',
    title: '04 - Corre não (Oficial Music)',
    slug: '04-corre-nao',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Underground',
    releaseDate: '2026',
    duration: '2:01',
    coverUrl: '/music/yt-16.jpg',
    audioUrl: AUDIO_SAMPLE_1,
    youtubeUrl: 'https://www.youtube.com/watch?v=S9JBv-WpNSU',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/S9JBv-WpNSU',
    description: 'Faixa "04 - Corre não" por PennaMc.'
  },
  {
    id: 'yt-music-17',
    title: '05 - Valores (Oficial Music)',
    slug: '05-valores',
    artist: 'PennaMc',
    producer: PRODUCER_NAME,
    genre: 'Rap / Conceitual',
    releaseDate: '2026',
    duration: '3:28',
    coverUrl: '/music/yt-17.jpg',
    audioUrl: AUDIO_SAMPLE_2,
    youtubeUrl: 'https://www.youtube.com/watch?v=pIqzAYtNjjI',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/pIqzAYtNjjI',
    description: 'Faixa "05 - Valores" por PennaMc. Reflexão e lírica marcante.'
  }
];

export const DEFAULT_STARTER_LICENSES = [
  {
    id: 'CLOSED',
    name: 'STARTER FECHADO',
    icon: '🎧',
    format: 'WAV COM TAG',
    description: 'Loop WAV masterizado da melodia. Perfeito para maquetes e produções iniciais.',
    features: [
      'Loop WAV masterizado com tag',
      'Ideal para maquetes e pré-produção',
      'Qualidade 24-bit de estúdio'
    ],
    recommendationNote: 'Opção de entrada para usar como base de criação.'
  },
  {
    id: 'OPEN_EXCLUSIVE',
    name: 'STARTER ABERTO + STEMS (EXCLUSIVO)',
    icon: '👑',
    format: 'WAV + STEMS (RETIRADA DO CATÁLOGO)',
    popular: true,
    isExclusiveCard: true,
    description: 'Melodia aberta com todas as pistas (Stems). Garante o uso exclusivo e a retirada permanente do catálogo.',
    features: [
      'Pistas e instrumentos separados (stems em WAV)',
      'Uso exclusivo da melodia',
      'O Starter sai de venda e é retirado permanentemente do catálogo'
    ],
    recommendationNote: 'Garante exclusividade total e a retirada permanente do acervo.'
  }
];

export const MOCK_SAMPLES: Sample[] = [
  {
    id: 'starter-1',
    title: '@OriginalPenna Stacks Starter',
    slug: 'stacks-starter-120bpm-e-minor',
    category: 'Melodies',
    bpm: 120,
    key: 'E Min',
    audioUrl: '/audio/starters/starter-stacks-120bpm-e-minor.wav',
    isFree: true,
    price: 0,
    packName: 'STARTER PACK VOL. 01'
  },
  {
    id: 'starter-2',
    title: 'Piano Underwater Dream',
    slug: 'piano-underwater-dream-e-minor',
    category: 'Melodies',
    bpm: 120,
    key: 'E Min',
    audioUrl: '/audio/starters/starter-piano-underwater-dream-e-minor.wav',
    isFree: false,
    price: 100.00,
    priceClosed: 100.00,
    priceOpen: 300.00,
    priceExclusive: 300.00,
    isSoldExclusive: false,
    packName: 'STARTER PACK VOL. 01'
  },
  {
    id: 'starter-3',
    title: 'Augmented G.Piano Starter',
    slug: 'augmented-gpiano-110bpm-b-minor',
    category: 'Melodies',
    bpm: 110,
    key: 'B Min',
    audioUrl: '/audio/starters/starter-augmented-gpiano-110bpm-b-minor.wav',
    isFree: true,
    price: 0,
    packName: 'STARTER PACK VOL. 01'
  },
  {
    id: 'starter-4',
    title: 'Kontakt 01 Synth Starter',
    slug: 'kontakt-01-125bpm-c-minor',
    category: 'Loops',
    bpm: 125,
    key: 'C Min',
    audioUrl: '/audio/starters/starter-kontakt-01-125bpm-c-minor.wav',
    isFree: true,
    price: 0,
    packName: 'STARTER PACK VOL. 01'
  },
  {
    id: 'starter-5',
    title: 'Forte Piano Ambience',
    slug: 'forte-80bpm-eb-major',
    category: 'Melodies',
    bpm: 80,
    key: 'Eb Maj',
    audioUrl: '/audio/starters/starter-forte-80bpm-eb-major.wav',
    isFree: true,
    price: 0,
    packName: 'STARTER PACK VOL. 01'
  }
];

export const MOCK_SAMPLE_PACKS: SamplePack[] = [
  {
    id: 'starter-pack-1',
    title: 'LAB GOLD VOL. 01 - OFFICIAL STARTER PACK',
    slug: 'lab-gold-vol-01-official-starter-pack',
    coverUrl: '/covers/starter-pack-v1.png',
    fileCount: 5,
    categories: ['Melodies', 'Pianos', 'Synths', 'Loops', 'Ambient'],
    price: 0,
    isFree: true,
    description: 'Pacote oficial de Starters e Melodias produzidas por @originalpenna. Arquivos WAV sem perda em 24-bit prontos para arrasto direto na sua DAW.',
    previewAudioUrl: '/audio/starters/starter-stacks-120bpm-e-minor.wav'
  }
];

export const MOCK_SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'shop-1',
    title: 'Camisa Oversized Laboratório Gold Black & Gold',
    slug: 'camisa-oversized-laboratorio-gold-black-gold',
    category: 'Roupas',
    price: 149.90,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Camisa de algodão premium 260g com modelagem street oversized. Estampa minimalista em silk relevo dourado metálico nas costas e logo sutil no peito.',
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    inStock: true
  }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'video-reel-1',
    title: '🎥 Bastidores do Single: SAUDADES',
    slug: 'bastidores-single-saudades',
    category: 'Bastidores',
    duration: 'Reel',
    views: '88 curtidas',
    date: '2026-07-28',
    thumbnailUrl: '/videos/reel-1.jpg',
    videoUrl: 'https://www.instagram.com/reel/DbV89cdzpuR/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DbV89cdzpuR/',
    reelId: 'DbV89cdzpuR',
    likes: '88',
    comments: '21',
    description: 'Toda música tem uma história. E Saudade nasceu de um momento que marcou a minha vida. Nesse vídeo, eu compartilho a inspiração por trás da composição, o significado da letra e um pouco do processo que deu vida a essa canção. Curta, comente e compartilhe! 🙏🔥💪'
  },
  {
    id: 'video-reel-2',
    title: '🚨 Nova Fase: Reconstruindo a Comunidade',
    slug: 'nova-fase-reconstruindo-comunidade',
    category: 'Studio Session',
    duration: 'Reel',
    views: '65 curtidas',
    date: '2026-07-29',
    thumbnailUrl: '/videos/reel-2.jpg',
    videoUrl: 'https://www.instagram.com/reel/DbN_jJDTeWh/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DbN_jJDTeWh/',
    reelId: 'DbN_jJDTeWh',
    likes: '65',
    comments: '13',
    description: 'Preciso da ajuda de vocês! Minha página anterior acabou sendo restrita, e isso prejudicou muito o alcance dos meus conteúdos. Por esse motivo, tive que começar uma nova etapa com uma nova página. Se você gosta do conteúdo que eu produzo, me ajude nessa caminhada: siga a nova página, curta o vídeo, comente e compartilhe! 🙏❤️'
  },
  {
    id: 'video-reel-3',
    title: '🎧 Bastidores & Making Of de Produção Musical',
    slug: 'bastidores-making-of-producao-musical',
    category: 'Produção Musical',
    duration: 'Reel',
    views: '45 curtidas',
    date: '2026-07-29',
    thumbnailUrl: '/videos/reel-3.jpg',
    videoUrl: 'https://www.instagram.com/reel/DbYTIxVRr6i/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DbYTIxVRr6i/',
    reelId: 'DbYTIxVRr6i',
    likes: '45',
    comments: '8',
    description: 'Bastidores da produção musical e rotina de estúdio no Laboratório Gold. Timbres, texturas e escolha de elementos com @originalpenna. 🎹🔥'
  },
  {
    id: 'video-reel-4',
    title: '🔥 Single: SAUDADES (Beat Breakdown)',
    slug: 'single-saudades-beat-breakdown',
    category: 'Beatmaking',
    duration: 'Reel',
    views: '21 curtidas',
    date: '2026-07-29',
    thumbnailUrl: '/videos/reel-4.jpg',
    videoUrl: 'https://www.instagram.com/reel/DbY8qmBpEej/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DbY8qmBpEej/',
    reelId: 'DbY8qmBpEej',
    likes: '21',
    comments: '0',
    description: '🎧 Single: SAUDADES | 🔥 Beat por: @_thxrpe | 💿 Álbum: O Fim de Nós. O Início de Mim! - Curta, comente o que achou e compartilhe com quem precisa ouvir essa mensagem.'
  },
  {
    id: 'video-reel-5',
    title: '📜 Trajetória: 12 Anos de Curta-Metragem & Rodas Culturais',
    slug: 'trajetoria-12-anos-curta-metragem-rodas-culturais',
    category: 'Bastidores',
    duration: 'Reel',
    views: '32 curtidas',
    date: '2026-07-30',
    thumbnailUrl: '/videos/reel-5.jpg',
    videoUrl: 'https://www.instagram.com/reel/DbbFhUBxfag/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DbbFhUBxfag/',
    reelId: 'DbbFhUBxfag',
    likes: '32',
    comments: '5',
    description: 'Tem histórias que o tempo nunca apaga. Depois de mais de 12 anos, resolvi contar um pouco da trajetória do Curta-Metragem: como tudo começou, os clipes, as rodas culturais, os desafios e os momentos que marcaram essa caminhada. Se você viveu essa época, comente sua lembrança! 🎙️🔥'
  },
  {
    id: 'video-reel-6',
    title: '💡 Álbum Lírica e Mente: Inspirações & Processo Criativo',
    slug: 'album-lirica-e-mente-inspiracoes-processo',
    category: 'Produção Musical',
    duration: 'Reel',
    views: '22 curtidas',
    date: '2026-08-02',
    thumbnailUrl: '/videos/reel-6.jpg',
    videoUrl: 'https://www.instagram.com/reel/DbiuGfjpPrQ/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DbiuGfjpPrQ/',
    reelId: 'DbiuGfjpPrQ',
    likes: '22',
    comments: '3',
    description: 'Neste vídeo, compartilho um pouco sobre duas músicas do meu primeiro álbum, Lírica e Mente: as inspirações, os significados e o processo por trás de cada uma. Espero que essa troca faça sentido pra você!'
  },
  {
    id: 'video-reel-7',
    title: '🚀 Você é capaz, faça você mesmo!',
    slug: 'voce-e-capaz-faca-voce-mesmo',
    category: 'Shorts',
    duration: 'Short',
    views: '38 curtidas',
    date: '2026-08-23',
    thumbnailUrl: '/videos/reel-7.jpg',
    videoUrl: 'https://www.instagram.com/reel/DcYuS2vxMDQ/embed/',
    instagramUrl: 'https://www.instagram.com/og.penna/reel/DcYuS2vxMDQ/',
    reelId: 'DcYuS2vxMDQ',
    likes: '38',
    comments: '5',
    description: 'Você é capaz, faça você mesmo! Motivação e trabalho constante no estúdio do Laboratório Gold por @originalpenna. #musicvideo #beat #rap #fyp'
  },
  {
    id: 'video-reel-8',
    title: '🎵 FL Studio Session: Criação & Arranjos',
    slug: 'fl-studio-session-criacao-arranjos',
    category: 'Beatmaking',
    duration: 'Reel',
    views: '19 curtidas',
    date: '2026-09-07',
    thumbnailUrl: '/videos/reel-8.jpg',
    videoUrl: 'https://www.instagram.com/reel/Dc_a8NqxAQl/embed/',
    instagramUrl: 'https://www.instagram.com/reel/Dc_a8NqxAQl/',
    reelId: 'Dc_a8NqxAQl',
    likes: '19',
    comments: '4',
    description: 'Sessão prática no FL Studio. Criação de synths, arranjos de bateria e estrutura de beats no estúdio Laboratório Gold. #flstudio #musicproducer'
  },
  {
    id: 'video-reel-9',
    title: '📁 Abrindo o Projeto da Música "Sem Perceber"',
    slug: 'abrindo-projeto-musica-sem-perceber',
    category: 'Produção Musical',
    duration: 'Reel',
    views: '13 curtidas',
    date: '2026-08-24',
    thumbnailUrl: '/videos/reel-9.jpg',
    videoUrl: 'https://www.instagram.com/reel/DccWF8qtFiw/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DccWF8qtFiw/',
    reelId: 'DccWF8qtFiw',
    likes: '13',
    comments: '6',
    description: 'Abrindo o projeto da música "Sem Perceber" no FL Studio. Bastidores do arranjo, escolha de timbres e estrutura da faixa com @originalpenna. #flstudio #musicproducer'
  },
  {
    id: 'video-reel-10',
    title: '🎧 Track: SAUDADES (Spotify Teaser)',
    slug: 'track-saudades-spotify-teaser',
    category: 'Studio Session',
    duration: 'Reel',
    views: '30 curtidas',
    date: '2026-08-26',
    thumbnailUrl: '/videos/reel-10.jpg',
    videoUrl: 'https://www.instagram.com/reel/DcgflatRS37/embed/',
    instagramUrl: 'https://www.instagram.com/reel/DcgflatRS37/',
    reelId: 'DcgflatRS37',
    likes: '30',
    comments: '2',
    description: 'Já seguiu o perfil no SPOTIFY? Cola na Bio e já segue pra não perder esse lançamento! Track: Saudades | BEAT por: @_thxrpe.'
  }
];
