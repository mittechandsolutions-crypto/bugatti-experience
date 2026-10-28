import React from 'react';
import { Metadata } from 'next';
import CarConfigurator from '@/components/CarConfigurator';

export const metadata: Metadata = {
  title: 'L’Atelier Bugatti | 3D Hypercar Configurator',
  description:
    'Customize your Bugatti in interactive 3D: Tourbillon, Bolide, Chiron Pur Sport. Select bespoke paints, lightweight forged wheels, calipers, and active aero.',
};

export default function ConfiguratorPage() {
  return (
    <main className="min-h-screen bg-[#060709]">
      <CarConfigurator />
    </main>
  );
}
