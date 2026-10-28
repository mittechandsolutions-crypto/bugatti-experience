'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Compass, PhoneCall } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040507] text-gray-400 text-xs border-t border-white/10 overflow-hidden">
      {/* Subtle Blue Glow in background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-bugatti-blue/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Ettore Bugatti Quote Banner */}
      <div className="border-b border-white/5 py-12 text-center px-4">
        <p className="font-serif italic text-lg sm:text-2xl text-white/90 tracking-widest max-w-3xl mx-auto">
          &ldquo;Si ce n’est pas parfait, ce n’est pas Bugatti. Si c’est comparable, ce n’est plus Bugatti.&rdquo;
        </p>
        <span className="inline-block mt-3 text-[11px] tracking-[0.3em] uppercase text-bugatti-blue-light font-medium">
          — Ettore Bugatti, Founder (1909)
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#CC0000] flex items-center justify-center shadow-lg shadow-red-600/30">
                <span className="text-[11px] font-black text-white font-serif">EB</span>
              </div>
              <span className="font-serif tracking-[0.3em] text-xl font-bold text-white">
                BUGATTI
              </span>
            </div>
            <p className="text-gray-400 font-light text-xs leading-relaxed max-w-sm">
              Headquartered at Château Saint-Jean in Molsheim, Alsace since 1909. Creator of the world’s most extraordinary hyper sports cars, uniting haute horlogerie mechanics with incomparable automotive speed.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] tracking-wider text-gray-300">
                Independent Automotive Concept Experience
              </span>
            </div>
          </div>

          {/* Hypercar Models */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Current Fleet
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/models/tourbillon" className="hover:text-white transition-colors">
                  Bugatti Tourbillon
                </Link>
              </li>
              <li>
                <Link href="/models/bolide" className="hover:text-white transition-colors">
                  Bugatti Bolide
                </Link>
              </li>
              <li>
                <Link href="/models/chiron-pur-sport" className="hover:text-white transition-colors">
                  Chiron Pur Sport
                </Link>
              </li>
              <li>
                <Link href="/models/mistral" className="hover:text-white transition-colors">
                  W16 Mistral Roadster
                </Link>
              </li>
              <li>
                <Link href="/models/divo" className="hover:text-white transition-colors">
                  Bugatti Divo
                </Link>
              </li>
              <li>
                <Link href="/models/la-voiture-noire" className="hover:text-white transition-colors">
                  La Voiture Noire
                </Link>
              </li>
            </ul>
          </div>

          {/* Bespoke Experiences */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Experiences
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/configurator" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-bugatti-blue-light" />
                  <span>L’Atelier Configurator</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-bugatti-blue-light" />
                  <span>Private Test Drive</span>
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Château Saint-Jean Visits</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Bugatti Sur Mesure</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Horlogerie Timepieces</span>
              </li>
            </ul>
          </div>

          {/* Global Salons */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Atelier Salons
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li className="text-gray-300 font-medium">Molsheim (Alsace, France)</li>
              <li>London (Mayfair, UK)</li>
              <li>Dubai (DIFC, UAE)</li>
              <li>Beverly Hills (California, USA)</li>
              <li>Tokyo (Minato-ku, Japan)</li>
              <li>Monaco (Carré d&apos;Or)</li>
            </ul>
          </div>
        </div>

        {/* Legal and Regulatory footnote */}
        <div className="border-t border-white/5 mt-14 pt-8 text-[11px] text-gray-500 space-y-4">
          <p className="leading-relaxed text-gray-300">
            Independent fan-made concept project. Not affiliated with, endorsed by, or operated by Bugatti Automobiles S.A.S. Requests submitted here are not sent to Bugatti.
          </p>
          <p className="leading-relaxed">
            Vehicle names, marks, and imagery belong to their respective owners. Specifications shown are illustrative and should be verified with the manufacturer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Independent concept project.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy Information
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                aria-label="Back to top"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
