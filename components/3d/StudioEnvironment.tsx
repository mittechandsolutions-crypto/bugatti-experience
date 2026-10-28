'use client';

import React from 'react';
import { ContactShadows } from '@react-three/drei';

export default function StudioEnvironment() {
  return (
    <>
      {/* Studio Ambient & Directional Lighting */}
      <ambientLight intensity={0.7} />

      {/* Main Overhead Studio Softbox Light */}
      <spotLight
        position={[0, 8, 2]}
        angle={0.6}
        penumbra={0.8}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        color="#F8FAFC"
      />

      {/* Key Front Rim Light */}
      <directionalLight position={[4, 5, 4]} intensity={1.8} color="#E0F2FE" />

      {/* Blue Rim Accent Light (Bugatti signature atmospheric accent) */}
      <directionalLight position={[-5, 3, -4]} intensity={2.5} color="#0048FF" />

      {/* Warm Fill Light */}
      <directionalLight position={[0, -2, -3]} intensity={0.4} color="#C5A059" />

      {/* High-Resolution Soft Ground Contact Shadows */}
      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.8}
        scale={10}
        blur={1.8}
        far={4.5}
        resolution={1024}
        color="#000000"
      />

      {/* Polished Studio Floor Grid & Reflection */}
      <mesh position={[0, -0.41, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#060709"
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>
    </>
  );
}
