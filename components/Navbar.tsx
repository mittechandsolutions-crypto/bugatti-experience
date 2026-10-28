'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Compass } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'MODELS', href: '/models' },
    { name: 'CONFIGURATOR', href: '/configurator' },
    { name: 'CONCIERGE', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#060709]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Bugatti Logo & Macaron */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full bg-[#CC0000] flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <span className="text-[12px] font-black tracking-tight text-white font-serif">EB</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.3em] text-lg font-bold text-white group-hover:text-bugatti-blue-light transition-colors">
              BUGATTI
            </span>
            <span className="text-[9px] tracking-[0.25em] text-gray-400 font-sans -mt-1">
              MOLSHEIM, FRANCE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-bugatti-blue shadow-[0_0_8px_#0048FF]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Quick Contact */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/configurator"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider text-white bg-bugatti-blue hover:bg-bugatti-blue-light shadow-lg shadow-bugatti-blue/30 transition-all hover:scale-[1.03]"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>CUSTOMIZE</span>
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-full text-xs font-medium tracking-wider text-gray-300 border border-white/20 hover:border-white/50 hover:text-white transition-colors"
          >
            TEST DRIVE
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07080A]/98 border-b border-white/10 px-6 py-6 transition-all">
          <div className="flex flex-col space-y-4 text-sm font-medium tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center justify-between py-2 text-gray-200 border-b border-white/5 hover:text-bugatti-blue"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/configurator"
                className="w-full text-center py-3 rounded-xl bg-bugatti-blue text-white font-semibold tracking-wider text-xs shadow-lg shadow-bugatti-blue/30"
              >
                START CONFIGURATION
              </Link>
              <Link
                href="/contact"
                className="w-full text-center py-3 rounded-xl border border-white/20 text-white font-medium tracking-wider text-xs"
              >
                BOOK VIP TEST DRIVE
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
