import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { AudioProvider } from '../context/AudioContext';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlobalAudioPlayer } from '../components/player/GlobalAudioPlayer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { BRAND_NAME, PRODUCER_NAME } from '../data/mockData';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Beats, Samples & Produção Musical`,
  description: `Plataforma e catálogo oficial do Laboratório Gold. Beats, samples, músicas e experiências criadas por ${PRODUCER_NAME} para artistas e produtores independentes.`,
  keywords: ['Laboratório Gold', 'Beats', 'Beatmaking', 'Sample Packs', 'Trap Beats', 'Drill Beats', 'Produção Musical', 'originalpenna'],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: `${BRAND_NAME} | Transformando Ideias em Som`,
    description: `Beats, samples, músicas e experiências criadas por ${PRODUCER_NAME}.`,
    url: 'https://laboratoriogold.com',
    siteName: BRAND_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[#080808] text-white min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-black">
        <AuthProvider>
          <AudioProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <GlobalAudioPlayer />
              <CartDrawer />
            </CartProvider>
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
