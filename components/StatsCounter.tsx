'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gauge, Zap, Flame, Compass } from 'lucide-react';

interface MetricItemProps {
  label: string;
  sublabel: string;
  value: number;
  decimals?: number;
  unit: string;
  prefix?: string;
  icon: React.ElementType;
  delay?: number;
}

function MetricCounter({
  label,
  sublabel,
  value,
  decimals = 0,
  unit,
  prefix = '',
  icon: Icon,
  delay = 0,
}: MetricItemProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    let startTime: number | null = null;

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = easeProgress * value;

        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="relative p-6 md:p-8 rounded-2xl glass-panel glass-panel-hover border border-white/10 group overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-bugatti-blue/10 rounded-full blur-3xl group-hover:bg-bugatti-blue/20 transition-colors" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-[0.25em] text-gray-400 font-medium">
          {label}
        </span>
        <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-bugatti-blue group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline gap-1 my-2">
        <span className="text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight text-white font-mono">
          {prefix}
          {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString()}
        </span>
        <span className="text-base md:text-xl font-medium tracking-wide text-bugatti-blue-light font-sans ml-1">
          {unit}
        </span>
      </div>

      <p className="text-xs text-gray-400 font-light mt-1 tracking-wider">
        {sublabel}
      </p>

      {/* Progress telemetry bar */}
      <div className="w-full bg-white/5 h-[3px] rounded-full mt-5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.8, delay: delay + 0.2 }}
          className="h-full bg-gradient-to-r from-bugatti-blue-dark via-bugatti-blue to-cyan-400"
        />
      </div>
    </motion.div>
  );
}

interface StatsCounterProps {
  acceleration?: number;
  topSpeed?: number;
  horsepower?: number;
  rpm?: number;
  modelName?: string;
}

export default function StatsCounter({
  acceleration = 2.0,
  topSpeed = 445,
  horsepower = 1800,
  rpm = 9000,
  modelName = 'BUGATTI TOURBILLON',
}: StatsCounterProps) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bugatti-blue/10 border border-bugatti-blue/30 text-bugatti-blue-light text-xs font-semibold tracking-widest uppercase mb-4">
          <span>Official Telemetry</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-wider text-white">
          THE APEX OF PROPULSION
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-400 tracking-wide font-light">
          Engineered beyond ordinary comprehension. Every millisecond and horsepower calibrated to redefine physics for {modelName}.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCounter
          label="0 — 100 KM/H"
          sublabel="Launch Control Rocket Acceleration"
          value={acceleration}
          decimals={1}
          unit="SEC"
          icon={Zap}
          delay={0.1}
        />
        <MetricCounter
          label="MAX VELOCITY"
          sublabel="Electronically calibrated Vmax key"
          value={topSpeed}
          unit="KM/H"
          icon={Gauge}
          delay={0.2}
        />
        <MetricCounter
          label="POWER OUTPUT"
          sublabel="Atmospheric combustion + Tri-electric motors"
          value={horsepower}
          unit="HP / PS"
          icon={Flame}
          delay={0.3}
        />
        <MetricCounter
          label="REDLINE CADENCE"
          sublabel="Cosworth naturally aspirated V16"
          value={rpm}
          unit="RPM"
          icon={Compass}
          delay={0.4}
        />
      </div>
    </section>
  );
}
