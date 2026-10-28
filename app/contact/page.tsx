import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bugatti Concierge | Book Dynamic Pilotage & Test Drive',
  description:
    'Arrange your private factory test drive or confidential consultation with a Bugatti client liaison at Château Saint-Jean or international partner circuits.',
};

export default function ContactPage() {
  const atelierSalons = [
    {
      city: 'Molsheim (Alsace)',
      country: 'France',
      address: 'Château Saint-Jean, 1 Rue Jean Bugatti, 67120 Dorlisheim',
      phone: '+33 3 88 04 44 00',
      email: 'molsheim.atelier@bugatti.com',
      badge: 'Historic Headquarters',
    },
    {
      city: 'London (Mayfair)',
      country: 'United Kingdom',
      address: '15-17 Berkeley Square, Mayfair, London W1J 6BQ',
      phone: '+44 20 7495 8888',
      email: 'london.concierge@bugatti.com',
      badge: 'Private Salon',
    },
    {
      city: 'Dubai (DIFC)',
      country: 'United Arab Emirates',
      address: 'Sheikh Zayed Road & DIFC Gate Precinct 4',
      phone: '+971 4 343 3333',
      email: 'dubai.atelier@bugatti.com',
      badge: 'Middle East Flagship',
    },
    {
      city: 'Beverly Hills',
      country: 'California, USA',
      address: '8833 Wilshire Blvd, Beverly Hills, CA 90211',
      phone: '+1 310 550 7707',
      email: 'beverlyhills@bugatti.com',
      badge: 'Americas Hub',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#060709] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-bugatti-blue/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-bugatti-blue-light text-xs font-semibold tracking-widest uppercase mb-4">
          <Shield className="w-3.5 h-3.5 text-bugatti-blue" />
          <span>Privé Client Services</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-wider text-white">
          BOOK PRIVATE PILOTAGE
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
          Commission your hypercar or schedule an exclusive dynamic test drive alongside a Bugatti factory test driver on circuit or private French estate grounds.
        </p>
      </div>

      {/* Booking Form Component */}
      <div className="mb-20">
        <ContactForm />
      </div>

      {/* Worldwide Atelier Salons */}
      <div className="mt-20 border-t border-white/10 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-bugatti-blue-light font-semibold">
            Global Representation
          </span>
          <h2 className="text-3xl font-serif font-bold text-white tracking-wide mt-1">
            BUGATTI ATELIER SALONS
          </h2>
          <p className="text-xs text-gray-400 mt-2 font-light">
            Visit our dedicated private client salons for confidential design consultations and tactile material commissioning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {atelierSalons.map((salon) => (
            <div
              key={salon.city}
              className="p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-bugatti-blue/15 text-bugatti-blue-light border border-bugatti-blue/20 mb-3">
                  {salon.badge}
                </span>
                <h3 className="text-lg font-serif font-bold text-white">
                  {salon.city}
                </h3>
                <p className="text-xs text-gray-400 font-light mt-0.5 mb-4">
                  {salon.country}
                </p>

                <div className="space-y-2.5 text-xs text-gray-400 font-light">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>{salon.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="font-mono text-gray-300">{salon.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{salon.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  <span>By Appointment Only</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
