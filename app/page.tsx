'use client';

import React from 'react';
import Link from 'next/link';
import Hero3D from '@/components/Hero3D';
import StatsCounter from '@/components/StatsCounter';
import ModelCard from '@/components/ModelCard';
import Gallery from '@/components/Gallery';
import { BUGATTI_MODELS } from '@/lib/cars';
import { ArrowRight, Compass, ShieldCheck, Flame, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const featuredModels = BUGATTI_MODELS.slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#060709] overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background Atmospheric Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bugatti-blue/15 rounded-full blur-[160px] pointer-events-none" />

        {/* Hero Headline */}
        <div className="text-center z-10 pt-4 md:pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-bugatti-blue-light text-xs font-semibold tracking-[0.25em] uppercase mb-4 shadow-lg backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-bugatti-blue" />
            <span>World Premiere • The Next Era</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-wider text-white"
          >
            POUR L&apos;ÉTERNITÉ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base md:text-lg text-gray-300 font-light tracking-[0.15em] max-w-2xl mx-auto uppercase"
          >
            Bugatti Tourbillon • 1,800 PS Naturally Aspirated V16 Hybrid
          </motion.p>
        </div>

        {/* 3D Hypercar Viewer Canvas */}
        <div className="w-full h-[480px] sm:h-[560px] md:h-[620px] my-2 relative z-0">
          <Hero3D initialColor="#0048FF" showControls={true} />
        </div>

        {/* Hero Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 z-10"
        >
          <Link
            href="/configurator?model=tourbillon"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-bugatti-blue hover:bg-bugatti-blue-light text-white font-semibold text-xs tracking-widest uppercase shadow-2xl shadow-bugatti-blue/40 transition-all hover:scale-105"
          >
            <Compass className="w-4 h-4" />
            <span>CONFIGURE YOUR TOURBILLON</span>
          </Link>

          <Link
            href="/models"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-widest uppercase border border-white/15 backdrop-blur-md transition-all"
          >
            <span>DISCOVER THE FLEET</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* ================= TELEMETRY STATS SECTION ================= */}
      <StatsCounter
        acceleration={2.0}
        topSpeed={445}
        horsepower={1800}
        rpm={9000}
        modelName="BUGATTI TOURBILLON"
      />

      {/* ================= ICONIC FLEET PREVIEW ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-bugatti-blue-light font-semibold">
              The Lineup of Legends
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mt-1">
              HYPER SPORTS CARS
            </h2>
          </div>
          <Link
            href="/models"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-bugatti-blue-light hover:text-white transition-colors"
          >
            <span>VIEW ALL 6 CREATIONS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredModels.map((car, idx) => (
            <ModelCard key={car.id} car={car} index={idx} />
          ))}
        </div>
      </section>

      {/* ================= CRAFTSMANSHIP & ATELIER SPOTLIGHT ================= */}
      <section className="relative py-24 bg-[#090B10] border-y border-white/5 overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-bugatti-blue/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-bugatti-blue-light uppercase mb-4">
              <Layers className="w-3.5 h-3.5 text-bugatti-blue" />
              <span>Château Saint-Jean Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide leading-tight">
              WHERE WATCHMAKING MEETS UNTAMED VELOCITY
            </h2>
            <p className="mt-6 text-sm text-gray-400 font-light leading-relaxed">
              In Molsheim, France, no assembly lines exist. Each hypercar is handcrafted by a dedicated team of master mechanics and artisans who treat each carbon fiber weave, titanium bolt, and leather seam like a bespoke horological creation.
            </p>

            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-2xl glass-panel border border-white/5 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-bugatti-blue/15 text-bugatti-blue">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">Naturally Aspirated Cosworth V16</h4>
                  <p className="text-xs text-gray-400 mt-1">9,000 RPM atmospheric combustion paired with instant electric torque vectoring.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/5 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-bugatti-blue/15 text-bugatti-blue">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">Swiss Horological Instruments</h4>
                  <p className="text-xs text-gray-400 mt-1">Skeletonized titanium cluster with over 600 components engineered to outlive digital screens.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full border border-white/10 transition-colors"
              >
                <span>REQUEST PRIVATE ATELIER VIEWING</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85"
              alt="Bugatti Molsheim Craftsmanship"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
              <span className="text-[10px] tracking-widest text-bugatti-blue-light uppercase font-semibold">
                Molsheim, Alsace
              </span>
              <p className="text-xs text-white font-medium mt-0.5">
                Every vehicle individually track-tested on the Colmar runway before client handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY SHOWCASE ================= */}
      <Gallery />

      {/* ================= VIP CONCIERGE CALL-TO-ACTION BANNER ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl glass-panel border border-white/15 p-8 sm:p-14 overflow-hidden text-center">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-bugatti-blue/20 rounded-full blur-[140px] pointer-events-none" />
          
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bugatti-blue-light">
            Private Dynamic Pilotage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mt-2 mb-4">
            EXPERIENCE BUGATTI ON CLOSED CIRCUIT
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto mb-8">
            Private test sessions with Bugatti factory drivers at Château Saint-Jean, Circuit Paul Ricard, or Dubai Yas Marina.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-bugatti-blue hover:bg-bugatti-blue-light text-white font-semibold text-xs tracking-widest uppercase shadow-xl shadow-bugatti-blue/30 transition-all hover:scale-105"
            >
              BOOK PRIVATE TEST DRIVE
            </Link>
            <Link
              href="/configurator"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-widest uppercase border border-white/10 transition-all"
            >
              LAUNCH 3D CONFIGURATOR
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
