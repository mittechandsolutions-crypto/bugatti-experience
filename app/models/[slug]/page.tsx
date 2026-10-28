import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BUGATTI_MODELS } from '@/lib/cars';
import Hero3D from '@/components/Hero3D';
import StatsCounter from '@/components/StatsCounter';
import {
  ArrowLeft,
  Sliders,
  Calendar,
  Sparkles,
  Zap,
  Gauge,
  Flame,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BUGATTI_MODELS.map((car) => ({
    slug: car.slug,
  }));
}

export default function ModelDetailPage({ params }: PageProps) {
  const car = BUGATTI_MODELS.find((m) => m.slug === params.slug);

  if (!car) {
    notFound();
  }

  // Find next and prev model
  const currentIndex = BUGATTI_MODELS.findIndex((m) => m.slug === car.slug);
  const nextModel = BUGATTI_MODELS[(currentIndex + 1) % BUGATTI_MODELS.length];
  const prevModel = BUGATTI_MODELS[(currentIndex - 1 + BUGATTI_MODELS.length) % BUGATTI_MODELS.length];

  return (
    <div className="relative min-h-screen bg-[#060709] pt-24 pb-20 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[170px] opacity-25 pointer-events-none"
        style={{ background: car.colors[0]?.hex || '#0048FF' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between py-4 border-b border-white/5 mb-8">
          <Link
            href="/models"
            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO FLEET</span>
          </Link>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-gray-500 uppercase tracking-widest">{car.category}</span>
            <span className="text-gray-600">•</span>
            <span className="text-bugatti-blue-light font-mono font-semibold">{car.price}</span>
          </div>
        </div>

        {/* Vehicle Header Dossier */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-bugatti-blue-light">
            {car.subtitle}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-wider text-white mt-1 mb-4">
            {car.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            {car.description}
          </p>
        </div>

        {/* ================= 3D INTERACTIVE VIEWER CANVAS ================= */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[680px] rounded-3xl overflow-hidden glass-panel border border-white/10 my-8 shadow-2xl flex items-center justify-center">
          <Hero3D initialColor={car.colors[0]?.hex || '#0048FF'} showControls={true} />

          {/* Overlay Quick Badge */}
          <div className="absolute top-6 left-6 pointer-events-none hidden sm:flex flex-col gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs">
              <span className="text-gray-400">Powerplant: </span>
              <span className="font-semibold">{car.engine}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs">
              <span className="text-gray-400">Production Year: </span>
              <span className="font-semibold">{car.year}</span>
            </div>
          </div>
        </div>

        {/* Action Callout Bar */}
        <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <div>
            <h3 className="text-base font-serif font-bold text-white">
              CUSTOMIZE THIS {car.name}
            </h3>
            <p className="text-xs text-gray-400">
              Select bespoke paint finishes, magnesium wheel architectures, and cockpit leathers in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href={`/configurator?model=${car.slug}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-bugatti-blue hover:bg-bugatti-blue-light text-white text-xs font-semibold tracking-wider transition-all shadow-lg shadow-bugatti-blue/30"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>LAUNCH CONFIGURATOR</span>
            </Link>
            <Link
              href="/contact"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium tracking-wider border border-white/10 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>TEST DRIVE</span>
            </Link>
          </div>
        </div>

        {/* Telemetry Stats Counter */}
        <StatsCounter
          acceleration={car.acceleration}
          topSpeed={car.topSpeed}
          horsepower={car.horsepower}
          modelName={car.name}
        />

        {/* Engineering Innovations & Features */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-bugatti-blue-light font-semibold">
              Technical Ingenuity
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide mt-1">
              ENGINEERING ANOMALIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {car.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden group hover:border-bugatti-blue/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-bugatti-blue/15 text-bugatti-blue flex items-center justify-center mb-6">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-bugatti-blue-light transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications Dossier Table */}
        <div className="my-20 p-8 sm:p-12 rounded-3xl glass-panel border border-white/10">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-bugatti-blue-light font-semibold">
                Technical Blueprint
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                OFFICIAL SPECIFICATION ARCHIVE
              </h3>
            </div>
            <span className="hidden sm:inline font-mono text-xs text-gray-400">
              Verified by Molsheim Engineering
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {car.specifications.map((spec, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b border-white/5 font-sans"
              >
                <span className="text-xs text-gray-400">{spec.label}</span>
                <span className="text-xs font-mono font-semibold text-white text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="my-20">
          <h3 className="text-2xl font-serif font-bold text-white tracking-wide mb-8 text-center">
            {car.name} PHOTOGRAPHIC DOSSIER
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {car.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative h-72 rounded-2xl overflow-hidden glass-panel border border-white/10 group"
              >
                <Image
                  src={imgUrl}
                  alt={`${car.name} detail ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Next / Previous Hypercar Navigators */}
        <div className="border-t border-white/10 pt-10 flex items-center justify-between">
          <Link
            href={`/models/${prevModel.slug}`}
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 block">Previous</span>
              <span className="text-sm font-serif font-bold text-white group-hover:text-bugatti-blue-light transition-colors">
                {prevModel.name}
              </span>
            </div>
          </Link>

          <Link
            href={`/models/${nextModel.slug}`}
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-colors group text-right"
          >
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 block">Next</span>
              <span className="text-sm font-serif font-bold text-white group-hover:text-bugatti-blue-light transition-colors">
                {nextModel.name}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
