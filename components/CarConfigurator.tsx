'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import SupercarModel from './3d/SupercarModel';
import StudioEnvironment from './3d/StudioEnvironment';
import { CONFIGURATOR_OPTIONS, BUGATTI_MODELS } from '@/lib/cars';
import { submitInquiry } from '@/lib/inquiries';
import confetti from 'canvas-confetti';
import {
  Palette,
  Disc,
  Shield,
  Layers,
  Sparkles,
  Share2,
  CheckCircle2,
  Download,
  RotateCcw,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';

interface CarConfiguratorProps {
  initialModelSlug?: string;
}

export default function CarConfigurator({ initialModelSlug = 'tourbillon' }: CarConfiguratorProps) {
  // Find selected model or default to first
  const [selectedModel, setSelectedModel] = useState(
    BUGATTI_MODELS.find((m) => m.slug === initialModelSlug) || BUGATTI_MODELS[0]
  );

  useEffect(() => {
    const modelSlug = new URLSearchParams(window.location.search).get('model');
    const model = BUGATTI_MODELS.find((car) => car.slug === modelSlug);
    if (model) setSelectedModel(model);
  }, []);

  // Configuration state
  const [exteriorColor, setExteriorColor] = useState(CONFIGURATOR_OPTIONS.exteriorColors[0].hex);
  const [exteriorFinish, setExteriorFinish] = useState<'gloss' | 'matte' | 'carbon'>('gloss');
  const [wheelDesign, setWheelDesign] = useState(CONFIGURATOR_OPTIONS.wheelDesigns[0].id);
  const [rimColor, setRimColor] = useState(CONFIGURATOR_OPTIONS.rimColors[0].hex);
  const [caliperColor, setCaliperColor] = useState(CONFIGURATOR_OPTIONS.caliperColors[0].hex);
  const [interiorTheme, setInteriorTheme] = useState(CONFIGURATOR_OPTIONS.interiorThemes[0].id);
  const [activeAero, setActiveAero] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [turntableSpin, setTurntableSpin] = useState(true);

  // Active tab state
  const [activeTab, setActiveTab] = useState<'exterior' | 'wheels' | 'interior' | 'aero'>('exterior');
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [savedCopied, setSavedCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submissionReference, setSubmissionReference] = useState('');

  // Generate unique luxury spec code
  const colorName = CONFIGURATOR_OPTIONS.exteriorColors.find((c) => c.hex === exteriorColor)?.name || 'FRB';
  const specCode = `EB-${selectedModel.slug.toUpperCase().slice(0, 4)}-${exteriorFinish.toUpperCase().slice(0, 3)}-${wheelDesign.toUpperCase().slice(0, 4)}`;

  const handleReserve = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const reference = await submitInquiry({
        type: 'configuration',
        model: selectedModel.slug,
        configuration: {
          exteriorColor,
          exteriorFinish,
          wheelDesign,
          rimColor,
          caliperColor,
          interiorTheme,
          activeAero,
          headlightsOn,
        },
        website: '',
      });
      setSubmissionReference(reference);
      setReservationModalOpen(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0048FF', '#CBD5E1', '#D4AF37', '#FFFFFF'],
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Your specification could not be saved. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySpec = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setSavedCopied(true);
    setTimeout(() => setSavedCopied(false), 2500);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#060709] pt-20 pb-12 flex flex-col">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-[0.25em] text-bugatti-blue-light uppercase">
              L’Atelier Bugatti Bespoke
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs font-mono text-gray-400">Spec #{specCode}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            {selectedModel.name}
          </h1>
        </div>

        {/* Quick Model Selector Dropdown */}
        <div className="flex items-center gap-3">
          <select
            value={selectedModel.slug}
            onChange={(e) => {
              const next = BUGATTI_MODELS.find((m) => m.slug === e.target.value);
              if (next) setSelectedModel(next);
            }}
            className="bg-black/60 border border-white/10 text-white text-xs font-medium py-2 px-3 rounded-xl focus:outline-none focus:border-bugatti-blue"
          >
            {BUGATTI_MODELS.map((m) => (
              <option key={m.slug} value={m.slug} className="bg-neutral-900 text-white">
                {m.name} ({m.price})
              </option>
            ))}
          </select>

          <button
            onClick={handleCopySpec}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            title="Share Configuration"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{savedCopied ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={handleReserve}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold tracking-wider text-white bg-bugatti-blue hover:bg-bugatti-blue-light shadow-lg shadow-bugatti-blue/30 transition-all hover:scale-[1.02]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'SAVING SPEC...' : 'SAVE SPEC'}</span>
          </button>
        </div>
      </div>
      {submitError && (
        <p role="alert" className="mx-auto mt-3 max-w-7xl px-4 text-sm text-red-300">
          {submitError}
        </p>
      )}

      {/* Main Studio Workstation: 3D Stage + Control Drawer */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 3D Viewport (8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] rounded-3xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center">
            {/* Dynamic Background Aura */}
            <div
              className="absolute w-[450px] h-[450px] rounded-full blur-[140px] opacity-30 pointer-events-none transition-all duration-700"
              style={{ background: exteriorColor }}
            />

            {/* Three.js R3F Canvas */}
            <Canvas
              shadows
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              className="cursor-grab active:cursor-grabbing w-full h-full"
            >
              <PerspectiveCamera makeDefault position={[3.6, 1.7, 4.6]} fov={40} />
              <StudioEnvironment />
              <SupercarModel
                color={exteriorColor}
                finish={exteriorFinish}
                rimColor={rimColor}
                caliperColor={caliperColor}
                activeAero={activeAero}
                headlightsOn={headlightsOn}
                turntableSpin={turntableSpin}
              />
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={3.0}
                maxDistance={8.0}
                maxPolarAngle={Math.PI / 2 - 0.05}
                minPolarAngle={Math.PI / 6}
                dampingFactor={0.06}
                rotateSpeed={0.7}
              />
            </Canvas>

            {/* Overlay Telemetry Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs">
                <span className="text-gray-400">Engine: </span>
                <span className="font-semibold">{selectedModel.engine.split('+')[0]}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs">
                <span className="text-gray-400">Power: </span>
                <span className="font-bold text-bugatti-blue-light">{selectedModel.horsepower} PS</span>
              </div>
            </div>

            {/* 360 Viewport Quick Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-[11px] tracking-widest uppercase text-gray-400 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                Drag to orbit 360°
              </span>
              <button
                onClick={() => setTurntableSpin(!turntableSpin)}
                className="pointer-events-auto px-3 py-1.5 rounded-full text-xs font-medium text-white bg-black/70 hover:bg-black border border-white/15 backdrop-blur-md flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className={`w-3 h-3 ${turntableSpin ? 'animate-spin-slow' : ''}`} />
                <span>{turntableSpin ? 'Turntable Active' : 'Turntable Paused'}</span>
              </button>
            </div>
          </div>

          {/* Quick Specifications Footnote */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Acceleration</p>
              <p className="text-sm font-bold font-mono text-white mt-0.5">0–100 in {selectedModel.acceleration}s</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Top Speed</p>
              <p className="text-sm font-bold font-mono text-white mt-0.5">{selectedModel.topSpeed} km/h</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Weight</p>
              <p className="text-sm font-bold font-mono text-white mt-0.5">{selectedModel.weight}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Estimated Base</p>
              <p className="text-sm font-bold font-mono text-bugatti-blue-light mt-0.5">{selectedModel.price}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Atelier Drawer (4 cols) */}
        <div className="lg:col-span-4 flex flex-col rounded-3xl glass-panel border border-white/10 p-6 overflow-hidden">
          {/* Atelier Navigation Tabs */}
          <div className="flex border-b border-white/10 pb-3 gap-1">
            {[
              { id: 'exterior', label: 'Exterior', icon: Palette },
              { id: 'wheels', label: 'Wheels', icon: Disc },
              { id: 'interior', label: 'Interior', icon: Layers },
              { id: 'aero', label: 'Aero', icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-bugatti-blue text-white shadow-lg shadow-bugatti-blue/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Container */}
          <div className="flex-1 py-5 overflow-y-auto space-y-6">
            {/* 1. EXTERIOR TAB */}
            {activeTab === 'exterior' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 block">
                    Bespoke Paint Pigment
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {CONFIGURATOR_OPTIONS.exteriorColors.map((color) => {
                      const isSelected = exteriorColor === color.hex;
                      return (
                        <button
                          key={color.id}
                          onClick={() => setExteriorColor(color.hex)}
                          className={`group relative flex flex-col items-center p-2 rounded-2xl border transition-all ${
                            isSelected
                              ? 'border-bugatti-blue bg-bugatti-blue/10 scale-105 shadow-md shadow-bugatti-blue/20'
                              : 'border-white/10 hover:border-white/30 bg-white/[0.02]'
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-full shadow-inner border border-white/20 relative"
                            style={{ backgroundColor: color.hex }}
                          >
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center text-white">
                                <CheckCircle2 className="w-4 h-4 drop-shadow" />
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-300 text-center font-medium mt-1.5 leading-tight truncate w-full">
                            {color.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Paint Finish Selector */}
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 block">
                    Finish & Lacquer
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'gloss', label: 'High Gloss' },
                      { id: 'matte', label: 'Satin Matte' },
                      { id: 'carbon', label: 'Tinted Carbon' },
                    ].map((finish) => (
                      <button
                        key={finish.id}
                        onClick={() => setExteriorFinish(finish.id as any)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                          exteriorFinish === finish.id
                            ? 'bg-white/15 text-white border-bugatti-blue shadow-sm'
                            : 'bg-white/[0.02] text-gray-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {finish.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. WHEELS TAB */}
            {activeTab === 'wheels' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 block">
                    Forged Wheel Architecture
                  </label>
                  <div className="space-y-2.5">
                    {CONFIGURATOR_OPTIONS.wheelDesigns.map((w) => {
                      const isSelected = wheelDesign === w.id;
                      return (
                        <button
                          key={w.id}
                          onClick={() => setWheelDesign(w.id)}
                          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-bugatti-blue bg-bugatti-blue/10 shadow-md'
                              : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-semibold text-white">{w.name}</p>
                            <p className="text-[11px] text-gray-400 font-light mt-0.5">{w.style}</p>
                          </div>
                          <span className="text-[11px] font-mono text-bugatti-blue-light font-medium">
                            {w.weightDiff}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rim Finish Color */}
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 block">
                    Rim Finish
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {CONFIGURATOR_OPTIONS.rimColors.map((rim) => (
                      <button
                        key={rim.id}
                        onClick={() => setRimColor(rim.hex)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                          rimColor === rim.hex
                            ? 'border-bugatti-blue bg-bugatti-blue/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full border border-white/20" style={{ backgroundColor: rim.hex }} />
                        <span className="text-[10px] text-gray-300 truncate w-full text-center">{rim.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brake Calipers Color */}
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 block">
                    AP Carbon-Ceramic Caliper Pigment
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {CONFIGURATOR_OPTIONS.caliperColors.map((cal) => (
                      <button
                        key={cal.id}
                        onClick={() => setCaliperColor(cal.hex)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          caliperColor === cal.hex
                            ? 'border-white scale-105 shadow-lg'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: cal.hex }} />
                        <span className="text-[9px] text-gray-300 truncate w-full text-center">{cal.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. INTERIOR TAB */}
            {activeTab === 'interior' && (
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold block">
                  Cockpit Atmosphere & Leather
                </label>
                {CONFIGURATOR_OPTIONS.interiorThemes.map((theme) => {
                  const isSelected = interiorTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setInteriorTheme(theme.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-bugatti-blue bg-bugatti-blue/15 shadow-lg'
                          : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white tracking-wide">{theme.name}</span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: theme.primaryHex }} />
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: theme.accentHex }} />
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                        {theme.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4. AERO TAB */}
            {activeTab === 'aero' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">Active Aerodynamic Rear Wing</p>
                      <p className="text-[11px] text-gray-400">Deploy high-downforce aerofoil</p>
                    </div>
                    <button
                      onClick={() => setActiveAero(!activeAero)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        activeAero ? 'bg-bugatti-blue' : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          activeAero ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">Quad-LED Optics & Signature DRL</p>
                      <p className="text-[11px] text-gray-400">Toggle forward illumination</p>
                    </div>
                    <button
                      onClick={() => setHeadlightsOn(!headlightsOn)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        headlightsOn ? 'bg-sky-500' : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          headlightsOn ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-bugatti-blue/10 border border-bugatti-blue/20 text-xs text-gray-300 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-bugatti-blue flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Bugatti active aero elements adjust downforce automatically based on telemetry speed, cornering Gs, and air-braking decelerations from 400 km/h.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Summary Bar */}
          <div className="border-t border-white/10 pt-4 mt-auto">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-gray-400 uppercase tracking-wider">Total Commission</span>
              <span className="text-base font-mono font-bold text-white">{selectedModel.price}</span>
            </div>
            <button
              onClick={handleReserve}
              disabled={isSubmitting}
              className="w-full py-3 rounded-2xl bg-bugatti-blue hover:bg-bugatti-blue-light text-white font-semibold tracking-wider text-xs shadow-xl shadow-bugatti-blue/30 transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'SAVING SPECIFICATION...' : 'SAVE SPECIFICATION'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reservation Confirmation Modal */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="relative max-w-lg w-full rounded-3xl glass-panel border border-white/20 p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-bugatti-blue/20 border border-bugatti-blue/40 text-bugatti-blue flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-bugatti-blue-light font-semibold">
              Independent Concept Configuration
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-2">
              SPECIFICATION SAVED
            </h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
              Specification <span className="font-mono text-white font-semibold">[{specCode}]</span> for the{' '}
              <strong className="text-white">{selectedModel.name}</strong> was saved to this concept site's inquiry database. This is not a vehicle order, and Bugatti Automobiles has not received it. Use the inquiry form if you would like to leave contact details.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-2 mb-6 font-mono">
              <div className="flex justify-between">
                <span className="text-gray-400">Request Reference:</span>
                <span className="text-bugatti-blue-light">{submissionReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Exterior Pigment:</span>
                <span className="text-white font-sans">{colorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Finish:</span>
                <span className="text-white uppercase">{exteriorFinish}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Wheels:</span>
                <span className="text-white">{wheelDesign.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Interior Theme:</span>
                <span className="text-white">{interiorTheme.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setReservationModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors"
              >
                CLOSE
              </button>
              <Link
                href="/contact"
                className="flex-1 py-3 rounded-xl bg-bugatti-blue hover:bg-bugatti-blue-light text-white text-xs font-semibold tracking-wider shadow-lg shadow-bugatti-blue/30 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>BOOK TEST DRIVE</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
