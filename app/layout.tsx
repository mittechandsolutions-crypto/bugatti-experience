import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BUGATTI | Official Hyper Sports Cars Experience',
  description:
    'Discover the apex of automotive engineering: Bugatti Tourbillon, Bolide, Chiron Pur Sport, and bespoke coachbuilt creations. Customize in interactive 3D.',
  keywords: ['Bugatti', 'Tourbillon', 'Bolide', 'Chiron', 'Hypercar', '3D Configurator'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${cinzel.variable}`}>
      <body className="bg-[#060709] text-[#F4F6F8] min-h-screen flex flex-col antialiased selection:bg-bugatti-blue selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
