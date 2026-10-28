'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CarModel } from '@/lib/types';
import { Zap, Gauge, Flame, ArrowUpRight, Sliders } from 'lucide-react';

interface ModelCardProps {
  car: CarModel;
  index?: number;
}

export default function ModelCard({ car, index = 0 }: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden glass-panel glass-panel-hover border border-white/10"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-black">
        <Image
          src={car.heroImage}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-black/30" />

        {/* Category Badge & Year */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-black/60 backdrop-blur-md text-white border border-white/10">
            {car.category}
          </span>
          <span className="text-xs font-mono font-medium tracking-wider text-gray-300 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            {car.year}
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 right-4">
          <span className="text-xs font-mono font-semibold tracking-wider text-bugatti-blue-light bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-bugatti-blue/30">
            {car.price}
          </span>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-2">
            <span className="text-[11px] font-medium tracking-[0.2em] text-bugatti-blue-light uppercase">
              {car.subtitle}
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide mt-0.5 group-hover:text-bugatti-blue-light transition-colors">
              {car.name}
            </h3>
          </div>

          <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed mb-6">
            {car.tagline}
          </p>

          {/* Quick Telemetry Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-white/[0.03] border border-white/5 mb-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 font-medium">
                <Flame className="w-3 h-3 text-red-500" />
                <span>POWER</span>
              </div>
              <p className="text-sm font-bold font-mono text-white mt-1">
                {car.horsepower} <span className="text-[10px] font-normal text-gray-400">HP</span>
              </p>
            </div>
            <div className="border-x border-white/5">
              <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 font-medium">
                <Gauge className="w-3 h-3 text-cyan-400" />
                <span>TOP SPEED</span>
              </div>
              <p className="text-sm font-bold font-mono text-white mt-1">
                {car.topSpeed} <span className="text-[10px] font-normal text-gray-400">KM/H</span>
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 font-medium">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>0-100</span>
              </div>
              <p className="text-sm font-bold font-mono text-white mt-1">
                {car.acceleration}s
              </p>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 pt-2">
          <Link
            href={`/models/${car.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider text-white bg-white/10 hover:bg-white/20 transition-all border border-white/10"
          >
            <span>VIEW DOSSIER</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/configurator?model=${car.slug}`}
            className="flex items-center justify-center p-2.5 rounded-xl text-bugatti-blue-light bg-bugatti-blue/10 hover:bg-bugatti-blue hover:text-white transition-all border border-bugatti-blue/30"
            title="Configure in 3D"
          >
            <Sliders className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
