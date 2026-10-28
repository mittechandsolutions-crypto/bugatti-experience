'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import SupercarModel from './3d/SupercarModel';
import StudioEnvironment from './3d/StudioEnvironment';
import { Play, Pause, Sun, Shield, RotateCcw, Sparkles } from 'lucide-react';

interface Hero3DProps {
  initialColor?: string;
  showControls?: boolean;
}

export default function Hero3D({
  initialColor = '#0048FF',
  showControls = true,
}: Hero3DProps) {
  const [color, setColor] = useState(initialColor);
  const [spin, setSpin] = useState(true);
  const [headlights, setHeadlights] = useState(true);
  const [activeAero, setActiveAero] = useState(false);

  const quickColors = [
    { name: 'French Racing Blue', hex: '#0048FF' },
    { name: 'Nocturne Obsidian', hex: '#090A0D' },
    { name: 'Argent Titanium', hex: '#CBD5E1' },
    { name: 'Rosso Corsa', hex: '#B91C1C' },
    { name: 'Jaune Molsheim', hex: '#EAB308' },
  ];

  return (
    <div className="relative w-full h-full min-h-[500px] md:min-h-[640px] flex items-center justify-center select-none overflow-hidden">
      {/* Dynamic Background Glow behind car */}
      <div
        className="absolute w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-all duration-700"
        style={{ background: color }}
      />

      {/* 3D Canvas */}
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[3.8, 1.8, 4.8]} fov={42} />
        
        <Suspense fallback={null}>
          <StudioEnvironment />
          <SupercarModel
            color={color}
            finish="gloss"
            rimColor="#16181F"
            caliperColor={color === '#0048FF' ? '#0048FF' : '#EAB308'}
            activeAero={activeAero}
            headlightsOn={headlights}
            turntableSpin={spin}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3.2}
          maxDistance={8.5}
          maxPolarAngle={Math.PI / 2 - 0.05} // Don't allow camera under floor
          minPolarAngle={Math.PI / 6}
          dampingFactor={0.06}
          rotateSpeed={0.7}
        />
      </Canvas>

      {/* Floating 3D Micro-Control HUD */}
      {showControls && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 md:gap-3 px-4 py-2.5 rounded-full glass-panel border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Color quick-swatches */}
          <div className="flex items-center gap-1.5 pr-2 md:pr-3 border-r border-white/10">
            {quickColors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.hex)}
                className={`w-5 h-5 md:w-6 md:h-6 rounded-full transition-transform border ${
                  color === c.hex ? 'scale-125 border-white shadow-lg' : 'border-white/30 hover:scale-110 opacity-70'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={c.name}
              />
            ))}
          </div>

          {/* Turntable spin toggle */}
          <button
            onClick={() => setSpin(!spin)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              spin
                ? 'bg-bugatti-blue text-white shadow-lg shadow-bugatti-blue/30'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {spin ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{spin ? 'Pause Spin' : '360° Spin'}</span>
          </button>

          {/* Headlights toggle */}
          <button
            onClick={() => setHeadlights(!headlights)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              headlights
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Sun className="w-3 h-3" />
            <span>LED Optics</span>
          </button>

          {/* Active Aero toggle */}
          <button
            onClick={() => setActiveAero(!activeAero)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeAero
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Active Aero</span>
          </button>
        </div>
      )}

      {/* Orbit Gesture Cue */}
      <div className="absolute top-6 right-6 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5 text-[11px] tracking-widest text-gray-400 uppercase backdrop-blur-sm">
        <Sparkles className="w-3 h-3 text-bugatti-blue" />
        <span>360° Interactive Canvas</span>
      </div>
    </div>
  );
}
