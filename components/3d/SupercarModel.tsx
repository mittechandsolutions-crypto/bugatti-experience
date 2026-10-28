'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SupercarModelProps {
  color?: string;
  finish?: 'gloss' | 'matte' | 'carbon';
  rimColor?: string;
  caliperColor?: string;
  activeAero?: boolean;
  headlightsOn?: boolean;
  turntableSpin?: boolean;
}

export default function SupercarModel({
  color = '#0048FF',
  finish = 'gloss',
  rimColor = '#16181F',
  caliperColor = '#0048FF',
  activeAero = false,
  headlightsOn = true,
  turntableSpin = true,
}: SupercarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wingRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  // Smooth rotation for turntable
  useFrame((_, delta) => {
    if (turntableSpin && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
    // Animate wing deployment smoothly
    if (wingRef.current) {
      const targetY = activeAero ? 1.05 : 0.82;
      const targetRotX = activeAero ? -0.22 : 0;
      wingRef.current.position.y = THREE.MathUtils.lerp(wingRef.current.position.y, targetY, delta * 5);
      wingRef.current.rotation.x = THREE.MathUtils.lerp(wingRef.current.rotation.x, targetRotX, delta * 5);
    }
  });

  // Finish attributes
  const roughness = finish === 'matte' ? 0.65 : finish === 'carbon' ? 0.35 : 0.15;
  const metalness = finish === 'matte' ? 0.3 : finish === 'carbon' ? 0.4 : 0.85;
  const clearcoat = finish === 'matte' ? 0.0 : 1.0;
  const clearcoatRoughness = 0.1;

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* ================= MAIN CHASSIS / LOWER BODY ================= */}
      {/* Central Underbody / Monocoque */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.42, 4.4]} />
        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={clearcoat}
          clearcoatRoughness={clearcoatRoughness}
        />
      </mesh>

      {/* Front Nose & Bugatti Horseshoe Grille Base */}
      <mesh position={[0, 0.35, 2.25]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.65, 0.35, 32, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={clearcoat}
        />
      </mesh>

      {/* Bugatti Horseshoe Grille Black Honeycomb */}
      <mesh position={[0, 0.32, 2.38]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0, 0.34, 32]} />
        <meshStandardMaterial color="#0A0B0E" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Bugatti Signature Red Macaron Emblem */}
      <mesh position={[0, 0.45, 2.39]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.015, 24]} />
        <meshStandardMaterial color="#CC0000" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Front Splitter / Carbon Fiber Aero Lip */}
      <mesh position={[0, 0.14, 2.2]} castShadow>
        <boxGeometry args={[2.02, 0.06, 0.7]} />
        <meshStandardMaterial color="#0D0E11" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Rear Diffuser Carbon Section */}
      <mesh position={[0, 0.22, -2.15]} castShadow>
        <boxGeometry args={[1.95, 0.25, 0.5]} />
        <meshStandardMaterial color="#090A0D" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Quad Exhaust Outlets */}
      {[-0.22, -0.07, 0.07, 0.22].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, 0.26, -2.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.12, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* ================= CABIN & COCKPIT ================= */}
      {/* Sleek Low-Slung Greenhouse / Roof */}
      <mesh position={[0, 0.72, -0.1]} castShadow>
        <boxGeometry args={[1.4, 0.38, 2.1]} />
        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={clearcoat}
        />
      </mesh>

      {/* Front Windshield Glass */}
      <mesh position={[0, 0.73, 0.88]} rotation={[0.42, 0, 0]}>
        <boxGeometry args={[1.32, 0.04, 0.85]} />
        <meshPhysicalMaterial
          color="#05080E"
          transmission={0.6}
          opacity={0.85}
          transparent
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>

      {/* Side Windows Glass */}
      <mesh position={[0.69, 0.72, -0.05]}>
        <boxGeometry args={[0.04, 0.28, 1.4]} />
        <meshPhysicalMaterial color="#05080E" transmission={0.7} opacity={0.8} transparent roughness={0.05} />
      </mesh>
      <mesh position={[-0.69, 0.72, -0.05]}>
        <boxGeometry args={[0.04, 0.28, 1.4]} />
        <meshPhysicalMaterial color="#05080E" transmission={0.7} opacity={0.8} transparent roughness={0.05} />
      </mesh>

      {/* Rear Engine Bay Cover Glass */}
      <mesh position={[0, 0.69, -1.25]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[1.15, 0.03, 1.05]} />
        <meshPhysicalMaterial color="#0A0F1D" transmission={0.5} opacity={0.8} transparent roughness={0.1} />
      </mesh>

      {/* ================= BUGATTI SIGNATURE C-LINE ================= */}
      {/* Right C-Line Accent Curve */}
      <mesh position={[0.96, 0.55, -0.05]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.65, 0.045, 16, 32, Math.PI * 1.25]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Left C-Line Accent Curve */}
      <mesh position={[-0.96, 0.55, -0.05]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.65, 0.045, 16, 32, Math.PI * 1.25]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Side Carbon Skirts */}
      <mesh position={[0.97, 0.14, 0]}>
        <boxGeometry args={[0.08, 0.06, 2.6]} />
        <meshStandardMaterial color="#08090C" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[-0.97, 0.14, 0]}>
        <boxGeometry args={[0.08, 0.06, 2.6]} />
        <meshStandardMaterial color="#08090C" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* ================= HEADLIGHTS & OPTICS ================= */}
      {/* Left Quad LED Clusters */}
      <mesh position={[-0.65, 0.44, 2.12]} rotation={[0, 0.18, 0]}>
        <boxGeometry args={[0.35, 0.065, 0.12]} />
        <meshStandardMaterial
          color={headlightsOn ? '#E0F2FE' : '#64748B'}
          emissive={headlightsOn ? '#38BDF8' : '#000000'}
          emissiveIntensity={headlightsOn ? 2.5 : 0}
        />
      </mesh>
      {/* Right Quad LED Clusters */}
      <mesh position={[0.65, 0.44, 2.12]} rotation={[0, -0.18, 0]}>
        <boxGeometry args={[0.35, 0.065, 0.12]} />
        <meshStandardMaterial
          color={headlightsOn ? '#E0F2FE' : '#64748B'}
          emissive={headlightsOn ? '#38BDF8' : '#000000'}
          emissiveIntensity={headlightsOn ? 2.5 : 0}
        />
      </mesh>

      {/* Forward Light Projections when headlights are On */}
      {headlightsOn && (
        <>
          <pointLight position={[-0.65, 0.45, 2.6]} color="#38BDF8" intensity={4} distance={8} decay={2} />
          <pointLight position={[0.65, 0.45, 2.6]} color="#38BDF8" intensity={4} distance={8} decay={2} />
        </>
      )}

      {/* ================= REAR TAILLIGHT LIGHT RIBBON ================= */}
      {/* Continuous Red Light Ribbon (Bugatti Tourbillon/Chiron signature) */}
      <mesh position={[0, 0.54, -2.22]}>
        <boxGeometry args={[1.82, 0.045, 0.06]} />
        <meshStandardMaterial
          color="#FF0033"
          emissive="#FF0022"
          emissiveIntensity={3.2}
          roughness={0.1}
        />
      </mesh>

      {/* Rear Light ambient glow */}
      <pointLight position={[0, 0.55, -2.4]} color="#FF0033" intensity={2.5} distance={5} decay={2} />

      {/* ================= ACTIVE AERO REAR WING ================= */}
      <group ref={wingRef} position={[0, 0.82, -1.8]}>
        {/* Main Wing Foil */}
        <mesh castShadow>
          <boxGeometry args={[1.88, 0.035, 0.42]} />
          <meshPhysicalMaterial
            color={color}
            roughness={roughness}
            metalness={metalness}
            clearcoat={clearcoat}
          />
        </mesh>
        {/* Wing Endplates */}
        <mesh position={[0.93, 0.02, 0]}>
          <boxGeometry args={[0.03, 0.12, 0.44]} />
          <meshStandardMaterial color="#090A0D" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.93, 0.02, 0]}>
          <boxGeometry args={[0.03, 0.12, 0.44]} />
          <meshStandardMaterial color="#090A0D" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Hydraulic Wing Struts */}
        <mesh position={[0.42, -0.15, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.32, 12]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.42, -0.15, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.32, 12]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ================= WHEELS, TIRES, RIMS & BRAKES ================= */}
      {/* Front Left Wheel */}
      <WheelAssembly
        position={[-1.02, 0.34, 1.45]}
        rimColor={rimColor}
        caliperColor={caliperColor}
        isLeft={true}
      />
      {/* Front Right Wheel */}
      <WheelAssembly
        position={[1.02, 0.34, 1.45]}
        rimColor={rimColor}
        caliperColor={caliperColor}
        isLeft={false}
      />
      {/* Rear Left Wheel */}
      <WheelAssembly
        position={[-1.04, 0.36, -1.35]}
        rimColor={rimColor}
        caliperColor={caliperColor}
        isLeft={true}
        scale={1.06}
      />
      {/* Rear Right Wheel */}
      <WheelAssembly
        position={[1.04, 0.36, -1.35]}
        rimColor={rimColor}
        caliperColor={caliperColor}
        isLeft={false}
        scale={1.06}
      />

      {/* Shadow Plane Under Car */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.8, 5.4]} />
        <shadowMaterial opacity={0.65} />
      </mesh>
    </group>
  );
}

interface WheelAssemblyProps {
  position: [number, number, number];
  rimColor: string;
  caliperColor: string;
  isLeft: boolean;
  scale?: number;
}

function WheelAssembly({ position, rimColor, caliperColor, isLeft, scale = 1 }: WheelAssemblyProps) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Tire Rubber */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.28, 32]} />
        <meshStandardMaterial color="#121316" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Rim Base / Hub */}
      <mesh position={[isLeft ? -0.06 : 0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 0.2, 24]} />
        <meshStandardMaterial color={rimColor} metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Spokes Accent */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh
            key={idx}
            position={[isLeft ? -0.12 : 0.12, Math.sin(rad) * 0.14, Math.cos(rad) * 0.14]}
            rotation={[rad, 0, 0]}
          >
            <boxGeometry args={[0.04, 0.24, 0.03]} />
            <meshStandardMaterial color={rimColor} metalness={0.95} roughness={0.15} />
          </mesh>
        );
      })}

      {/* Drilled Carbon-Ceramic Brake Rotor */}
      <mesh position={[isLeft ? 0.04 : -0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.23, 0.23, 0.02, 32]} />
        <meshStandardMaterial color="#64748B" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* High Performance Brake Caliper */}
      <mesh position={[isLeft ? 0.04 : -0.04, 0.14, 0]}>
        <boxGeometry args={[0.06, 0.1, 0.14]} />
        <meshStandardMaterial color={caliperColor} metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  );
}
