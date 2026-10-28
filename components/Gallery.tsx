'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Aerodynamic Sculpture in Carbon',
    category: 'Hypercar',
    src: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85',
    description: 'Every air scoop and vent is calibrated to manage supersonic airflow, cooling the massive quad-turbocharged powerplant.',
  },
  {
    id: '2',
    title: 'The Track Weapon Unleashed',
    category: 'Track',
    src: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85',
    description: 'Pushing physics to its absolute boundary with over 3,000 kg of downforce at racing speeds.',
  },
  {
    id: '3',
    title: 'Sculpted Silhouette at Twilight',
    category: 'Hypercar',
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
    description: 'The iconic Bugatti C-line seamlessly framing the monocoque and channeling air toward the air intakes.',
  },
  {
    id: '4',
    title: 'Haute Horlogerie Engineering',
    category: 'Craftsmanship',
    src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
    description: 'Handcrafted titanium instrument dials with genuine sapphire crystal faces, engineered never to fade.',
  },
  {
    id: '5',
    title: 'The Roadster Renaissance',
    category: 'Hypercar',
    src: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1600&q=85',
    description: 'Open-air symphony of 16 combustion cylinders roaring across European alpine passes.',
  },
  {
    id: '6',
    title: 'Bespoke Molsheim Craftsmanship',
    category: 'Craftsmanship',
    src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85',
    description: 'Six months of painstaking hand assembly by master artisans at the historical Bugatti Atelier in Alsace, France.',
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = ['All', 'Hypercar', 'Track', 'Craftsmanship'];

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleNext = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-bugatti-blue-light mb-3">
            <Camera className="w-3.5 h-3.5 text-bugatti-blue" />
            <span>Visual Anthology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
            THE GALLERY OF MOLSHEIM
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-2 max-w-xl">
            Where relentless aerodynamic form meets bespoke French luxury. Explore the photographic archives of the world’s most exclusive hypercars.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-bugatti-blue text-white shadow-lg shadow-bugatti-blue/30'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActiveImageIndex(idx)}
            className="group relative h-80 rounded-2xl overflow-hidden glass-panel border border-white/10 cursor-pointer"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Hover Expand Icon */}
            <div className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white/80 group-hover:text-white group-hover:scale-110 transition-all border border-white/10">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-bugatti-blue-light uppercase mb-1">
                {item.category}
              </span>
              <h3 className="text-lg font-serif font-bold text-white tracking-wide group-hover:text-bugatti-blue-light transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-light">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Close image"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center">
              <Image
                src={filteredItems[activeImageIndex].src}
                alt={filteredItems[activeImageIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Lightbox Caption Footer */}
            <div className="absolute bottom-6 max-w-xl text-center px-4">
              <h3 className="text-xl font-serif font-bold text-white">
                {filteredItems[activeImageIndex].title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-light">
                {filteredItems[activeImageIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
