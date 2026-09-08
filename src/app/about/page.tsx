'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Calendar, 
  MapPin, 
  Disc, 
  Music, 
  Mic2, 
  Radio, 
  Film, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Heart,
  Quote
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, SpotifyIcon } from '../../components/ui/SocialIcons';
import { BRAND_NAME, PRODUCER_NAME, SOCIAL_LINKS } from '../../data/mockData';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'todos' | 'curta' | 'roda' | 'acustico' | 'ace'>('todos');
  const [selectedVideoEmbed, setSelectedVideoEmbed] = useState<string | null>(null);

  const timelineEvents = [
    {
      year: '2015',
      title: 'AS RAÍZES — CURTA METRAGEM',
      subtitle: 'CurtaMetragemKrew • Rio das Ostras / RJ',
      description: 'O início da caminhada musical coletiva ao lado de SativaMc e ND. Primeiros contatos intensos com produção musical, escrita, gravação de estúdio e construção de identidade artística.',
      tags: ['Curta Metragem', 'SativaMc', 'ND', 'PennaMc', 'Rio das Ostras'],
      icon: <Mic2 className="w-4 h-4 text-amber-400" />
    },
    {
      year: '2015',
      title: 'RODAS CULTURAIS & 8ª RODA DOS 3 MORRINHOS',
      subtitle: '15/05/2015 • Rio das Ostras / RJ',
      description: 'Apresentações marcantes na cena independente local. Registros históricos de faixas emblemáticas como "Nota de Suicídio", "Game Over", "A Procura", "E se Hoje Fosse" e "Profano".',
      tags: ['8ª Roda Cultural', '3 Morrinhos', 'Cena Independente'],
      icon: <Radio className="w-4 h-4 text-amber-400" />
    },
    {
      year: '2015',
      title: 'MANIFESTO DOS VERSOS',
      subtitle: 'Lançamento Audiovisual • 29/10/2015',
      description: 'Projeto audiovisual divisor de águas. O lançamento do teaser e do clipe oficial marcou a expansão da identidade estética e da maturidade de composição do grupo.',
      tags: ['Manifesto dos Versos', 'Clipe Oficial', 'Teaser'],
      icon: <Film className="w-4 h-4 text-amber-400" />
    },
    {
      year: '2016',
      title: 'A FASE ACÚSTICA',
      subtitle: 'Parceria com Pernas de Grilo',
      description: 'Exploração de novas sonoridades e arranjo orgânico com participações especiais nas faixas "O Melhor Pra Mim" e "A Toa Numa Boa". Demonstração de versatilidade e busca de expressão.',
      tags: ['Acústico', 'Pernas de Grilo', 'Versatilidade'],
      icon: <Music className="w-4 h-4 text-amber-400" />
    },
    {
      year: '2020+',
      title: 'EVOLUÇÃO & AMADURECIMENTO',
      subtitle: 'Transição Sonora & Produção Autônoma',
      description: 'Anos de vivência na cultura de rua, refinamento em engenharia de áudio, mixagem analógica e beatmaking. A consolidação da voz e do conceito artístico autêntico.',
      tags: ['Produção Musical', 'Engenharia de Áudio', 'Identidade'],
      icon: <Layers className="w-4 h-4 text-amber-400" />
    },
    {
      year: 'ATUAL',
      title: 'PENNAMC & ACE OF SPADES',
      subtitle: 'Nova Era • Laboratório Gold',
      description: '"PennaMc não é o começo de uma história. É a continuação de uma caminhada que começou muito antes." O projeto ACE OF SPADES e o ecossistema do Laboratório Gold representam a síntese de anos de bagagem.',
      tags: ['Ace of Spades', 'PennaMc', 'Laboratório Gold'],
      icon: <Sparkles className="w-4 h-4 text-amber-400" />
    }
  ];

  const archiveCards = [
    {
      id: 'curta-projeto-2015',
      category: 'curta',
      year: '2015',
      title: 'Curta Metragem — Projeto 2015',
      subtitle: 'Playlist Oficial • CurtaMetragemKrew',
      desc: 'Acervo completo das faixas históricas do Curta Metragem (Game Over, Vastos Pensamentos, Parte de Mim, Manifesto dos Versos, Profano, E se Hoje Fosse, Não Sei!, Nota de Suicídio, A Procura).',
      url: 'https://youtube.com/playlist?list=PLvztLp6YRWkS8eBOhx_pfZdrhAAoUXeT7&si=otQcTocdsTBZgMps',
      type: 'Playlist no YouTube'
    },
    {
      id: 'curta-acustico',
      category: 'acustico',
      year: '2016',
      title: 'Curta Metragem — Acústico',
      subtitle: 'Part. Pernas de Grilo',
      desc: 'Sessão acústica com arranjos orgânicos de violão e colaboração especial de Pernas de Grilo (O Melhor Pra Mim, A Toa Numa Boa).',
      url: 'https://youtube.com/playlist?list=PLvztLp6YRWkS94qkU28s12KeYxn4OjlQ6&si=Lm3Zhsg63VmO5VoB',
      type: 'Playlist no YouTube'
    },
    {
      id: 'intervencao-rio-das-ostras',
      category: 'roda',
      year: '2015',
      title: 'Intervenção em Rio das Ostras',
      subtitle: '8ª Roda Cultural dos 3 Morrinhos & Cultura Urbana',
      desc: 'Registros em áudio e vídeo das apresentações ao vivo nas rodas culturais da Região dos Lagos/RJ.',
      url: 'https://youtube.com/playlist?list=PLvztLp6YRWkTXHg11UvOO8nuu2x4g3q8Q&si=dH1RNAcrEElMfYW6',
      type: 'Playlist no YouTube'
    },
    {
      id: 'ace-of-spades',
      category: 'ace',
      year: '2026',
      title: 'EP: ACE OF SPADES',
      subtitle: 'Lançamento Autoral • PennaMc',
      desc: 'Playlist oficial do EP ACE OF SPADES, consolidando a nova era artística e identidade do estúdio.',
      url: 'https://youtube.com/playlist?list=PLvztLp6YRWkQ8jXNzDMgq5b-ofQvFKKiv&si=kbVrPoGN1LxqKbJw',
      type: 'EP / Playlist'
    },
    {
      id: 'lirica-e-mente',
      category: 'ace',
      year: '2026',
      title: 'Álbum: LÍRICA & MENTE',
      subtitle: 'Playlist Oficial • PennaMc',
      desc: 'Álbum autoral completo com versos profundos, conceito de superação e produções do Laboratório Gold.',
      url: 'https://youtube.com/playlist?list=PLvztLp6YRWkReabUXtQj7q3iaxTyVAujF&si=8qyj1hxipAPNELnp',
      type: 'Álbum / Playlist'
    }
  ];

  const filteredArchive = activeTab === 'todos'
    ? archiveCards
    : archiveCards.filter(c => c.category === activeTab);

  return (
    <div className="space-y-20 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-amber-500/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-[#080808] to-[#080808]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase shadow-lg shadow-amber-500/10">
            <Sparkles className="w-4 h-4" />
            <span>BIOGRAFIA & TRAJETÓRIA ARTÍSTICA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight max-w-4xl mx-auto">
            UMA HISTÓRIA EM <span className="gold-gradient-text">CONSTANTE CONSTRUÇÃO</span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-amber-300 max-w-2xl mx-auto italic">
            "Antes da música chegar até você, ela já tinha passado por muitos lugares."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#historia"
              className="w-full sm:w-auto gold-gradient-bg text-black font-black text-xs px-8 py-4 rounded-xl shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <span>CONHEÇAM MINHA HISTÓRIA</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <Link
              href="/music"
              className="w-full sm:w-auto glass-panel border border-amber-500/30 hover:border-amber-500/60 text-white font-black text-xs px-8 py-4 rounded-xl hover:bg-amber-500/10 transition flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Music className="w-4 h-4 text-amber-400" />
              <span>OUVIR MINHAS MÚSICAS</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. SEÇÃO "DE ONDE EU VENHO" */}
      <section id="historia" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image visual */}
          <div className="lg:col-span-5 relative aspect-square rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group">
            <img
              src="/images/original-penna-studio.jpg"
              alt="Hugo Emanoel Cordeiro (PennaMc)"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/80 backdrop-blur-md rounded-2xl border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-bold uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>RIO DAS OSTRAS / RJ • BRASIL</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase">HUGO EMANOEL CORDEIRO</h3>
              <p className="text-xs text-zinc-400">Nome artístico: <strong>PennaMc</strong></p>
            </div>
          </div>

          {/* Text content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                ORIGENS & IDENTITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                DE ONDE <span className="gold-gradient-text">EU VENHO</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Minha história começou muito antes de qualquer número, plataforma ou algoritmo. Começou na rua, nas ideias, nas amizades, nos versos, nos primeiros registros e na vontade de transformar aquilo que eu vivia em música.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Formado artisticamente na cena cultural de <strong>Rio das Ostras/RJ</strong>, PennaMc (Hugo Emanoel Cordeiro) construiu sua bagagem musical a partir da vivência real do hip-hop independente. Antes do projeto autoral solo, sua caminhada foi forjada no coletivo <strong>Curta Metragem (CurtaMetragemKrew)</strong> — ao lado de <em>SativaMc</em> e <em>ND</em>.
            </p>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-amber-500/20 space-y-2">
              <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>MÚSICA AUTÊNTICA DE RAIZ</span>
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                PennaMc não surgiu de forma repentina. Cada verso, mixagem e instrumental produzido no <strong>Laboratório Gold</strong> traz o peso de anos de prática, rodas culturais, criações caseiras e evolução contínua.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SEÇÃO "NINGUÉM VÊ OS PRIMEIROS CAPÍTULOS" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-14 border border-amber-500/30 space-y-8 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              PERSISTÊNCIA & TRAJETÓRIA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              NINGUÉM VÊ OS <span className="gold-gradient-text">PRIMEIROS CAPÍTULOS.</span>
            </h2>
          </div>

          {/* Conceptual Quote Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-zinc-800 space-y-2">
              <Quote className="w-6 h-6 text-amber-400" />
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "Antes de existir uma música pronta, existe uma história."
              </p>
            </div>

            <div className="p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-zinc-800 space-y-2">
              <Quote className="w-6 h-6 text-amber-400" />
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "Antes de existir um lançamento, existem anos de tentativa."
              </p>
            </div>

            <div className="p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-zinc-800 space-y-2">
              <Quote className="w-6 h-6 text-amber-400" />
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "Antes de existir um artista consistente, existe alguém insistindo quando quase ninguém está olhando."
              </p>
            </div>

          </div>

          <p className="text-sm text-zinc-300 leading-relaxed max-w-4xl">
            A trajetória independente não é uma linha reta. É feita de madrugadas no estúdio, beats refeitos do zero, composições engavetadas e testes sonoros. A experiência adquirida desde os primeiros trabalhos com o Curta Metragem criou a base sólida para a maturidade atual de PennaMc como intérprete, beatmaker e engenheiro de áudio.
          </p>

        </div>
      </section>

      {/* 4. VISUAL TIMELINE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            LINHA DO TEMPO
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            CRONOLOGIA DA <span className="gold-gradient-text">CAMINHADA</span>
          </h2>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto">
            Os marcos históricos da jornada artística de PennaMc desde os primeiros registros independentes até a fase atual.
          </p>
        </div>

        <div className="relative border-l-2 border-amber-500/30 ml-4 sm:ml-32 space-y-10 py-4">
          {timelineEvents.map((event, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              
              {/* Year badge on left (desktop) */}
              <div className="hidden sm:flex absolute -left-32 top-0 w-24 justify-end">
                <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                  {event.year}
                </span>
              </div>

              {/* Dot Icon on timeline line */}
              <div className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-[#08080a] border-2 border-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition">
                {event.icon}
              </div>

              {/* Event Card Content */}
              <div className="bg-[#111115] border border-zinc-800 group-hover:border-amber-500/40 p-6 rounded-2xl space-y-3 transition shadow-lg">
                
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="sm:hidden font-mono text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mr-2">
                      {event.year}
                    </span>
                    <h3 className="text-lg font-black text-white uppercase tracking-wider">
                      {event.title}
                    </h3>
                    <p className="text-xs font-mono text-amber-300">{event.subtitle}</p>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {event.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-zinc-900 text-zinc-400 px-2.5 py-0.5 rounded border border-zinc-800 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 5. ARQUIVO PENNAMC (HISTORICAL ARCHIVE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
              <Film className="w-4 h-4" />
              <span>ACERVO HISTÓRICO AUDIOVISUAL</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-wide uppercase">
              ARQUIVO <span className="gold-gradient-text">PENNAMC</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Documentos sonoros e registros em áudio/vídeo da primeira fase do artista com o Curta Metragem e produções autorais.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'todos', name: 'Todos' },
              { id: 'curta', name: 'Curta Metragem' },
              { id: 'roda', name: 'Roda Cultural' },
              { id: 'acustico', name: 'Fase Acústica' },
              { id: 'ace', name: 'Ace of Spades' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'gold-gradient-bg text-black shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Archive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArchive.map((item) => (
            <div
              key={item.id}
              className="bg-[#111115] border border-zinc-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-4 transition flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {item.year}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {item.type}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-white group-hover:text-amber-400 transition leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{item.subtitle}</p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-gradient-bg text-black font-extrabold text-[11px] px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md uppercase tracking-wider w-full"
                >
                  <YoutubeIcon className="w-4 h-4 fill-black" />
                  <span>ABRIR PLAYLIST NO YOUTUBE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. NOVA FASE & CONEXÃO COM O PÚBLICO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                VISÃO & CONCEITO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                A CONTINUAÇÃO DE UMA <span className="gold-gradient-text">CAMINHADA</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              "PennaMc não é o começo de uma história. É a continuação de uma caminhada que começou muito antes."
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              A música do PennaMc nasce da observação direta da vida, de vivências reais, sentimentos, superação, perdas e constante amadurecimento. No estúdio <strong>Laboratório Gold</strong>, cada beat, sample e composição autoral é trabalhada com rigor técnico de engenharia de som e alma underground.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={SOCIAL_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1db954] hover:bg-[#1ed760] text-black font-extrabold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg uppercase tracking-wider"
              >
                <SpotifyIcon className="w-4 h-4 fill-black" />
                <span>SPOTIFY OFICIAL</span>
              </a>

              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg uppercase tracking-wider"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>CANAL NO YOUTUBE</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#111115] border border-amber-500/30 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">IDENTIDADE ARTÍSTICA</span>
              <h3 className="text-2xl font-black text-white uppercase">PENNAMC</h3>
            </div>

            <ul className="space-y-3 text-xs text-zinc-300 font-mono">
              <li className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                <span className="text-amber-400 font-bold">• NOME REAL:</span>
                <span className="text-white">Hugo Emanoel Cordeiro</span>
              </li>
              <li className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                <span className="text-amber-400 font-bold">• ORIGEM:</span>
                <span className="text-white">Rio das Ostras / RJ</span>
              </li>
              <li className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                <span className="text-amber-400 font-bold">• GRUPO INICIAL:</span>
                <span className="text-white">Curta Metragem</span>
              </li>
              <li className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                <span className="text-amber-400 font-bold">• PROJETO ATUAL:</span>
                <span className="text-white">ACE OF SPADES / Gold Lab</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 7. FRASE FINAL DE ENCERRAMENTO */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-10 border-t border-zinc-800">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-gold border border-amber-500/30 space-y-6 shadow-2xl">
          <Quote className="w-10 h-10 text-amber-400 mx-auto" />
          
          <p className="text-lg sm:text-2xl font-extrabold text-white leading-relaxed italic max-w-2xl mx-auto">
            "Algumas histórias começam quando alguém encontra a música. A minha começou quando eu descobri que podia colocar minha própria história dentro dela."
          </p>

          <div className="space-y-1">
            <h4 className="text-xl font-black text-amber-400 uppercase tracking-widest">
              PENNAMC
            </h4>
            <p className="text-xs text-zinc-400 font-mono italic">
              "E essa história ainda está sendo escrita."
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
