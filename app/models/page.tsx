'use client';

import React, { useState } from 'react';
import ModelCard from '@/components/ModelCard';
import { BUGATTI_MODELS } from '@/lib/cars';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function ModelsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'power' | 'speed' | 'year'>('power');

  const categories = ['All', 'Hyper Sports', 'Track Only', 'Coachbuilt', 'Roadster', 'One-Off'];

  // Filter & Sort
  const filteredCars = BUGATTI_MODELS.filter((car) => {
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.engine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'power') return b.horsepower - a.horsepower;
    if (sortBy === 'speed') return b.topSpeed - a.topSpeed;
    if (sortBy === 'year') return b.year - a.year;
    return 0;
  });

  return (
    <div className="relative min-h-screen bg-[#060709] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Accent Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-bugatti-blue/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Page Title & Intro */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-bugatti-blue-light text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-bugatti-blue" />
          <span>The Definitive Fleet</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-wider text-white">
          THE BUGATTI COLLECTION
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
          From the naturally aspirated 9,000 RPM V16 Tourbillon to the track-only Bolide, explore the apex of automotive engineering and coachbuilding artistry.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-bugatti-blue text-white shadow-md shadow-bugatti-blue/30'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model or engine..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bugatti-blue"
            />
            <Search className="absolute right-3 top-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort models by"
              className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-bugatti-blue"
            >
              <option value="power" className="bg-neutral-900">Highest Horsepower</option>
              <option value="speed" className="bg-neutral-900">Highest Top Speed</option>
              <option value="year" className="bg-neutral-900">Release Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, idx) => (
            <ModelCard key={car.id} car={car} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-2xl border border-white/10">
          <p className="text-gray-400 text-sm">No models found matching your search query.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-full bg-bugatti-blue text-xs font-semibold text-white"
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </div>
  );
}
