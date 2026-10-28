'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitInquiry } from '@/lib/inquiries';
import { BUGATTI_MODELS } from '@/lib/cars';
import {
  Calendar,
  MapPin,
  Car,
  User,
  Mail,
  Phone,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    title: 'Mr.',
    fullName: '',
    email: '',
    phone: '',
    model: 'tourbillon',
    location: 'Château Saint-Jean, Molsheim (Alsace, France)',
    preferredDate: '',
    timeframe: 'within-30-days',
    currentCollection: '',
    privacyConsent: false,
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submitError, setSubmitError] = useState('');

  const locations = [
    'Château Saint-Jean, Molsheim (Alsace, France)',
    'Circuit Paul Ricard (Le Castellet, France)',
    'Dubai Autodrome & Yas Marina (UAE)',
    'Monaco Port Hercule & Col de Turini (Monaco)',
    'The Quail & Laguna Seca (California, USA)',
    'Mayfair Private Salon (London, UK)',
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const reference = await submitInquiry({
        type: 'booking',
        salutation: formData.title,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        model: formData.model,
        location: formData.location,
        preferredDate: formData.preferredDate,
        timeframe: formData.timeframe,
        notes: formData.currentCollection,
        privacyConsent: formData.privacyConsent,
        website: formData.website,
      });
      setBookingRef(reference);
      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0048FF', '#D4AF37', '#CBD5E1', '#FFFFFF'],
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Your request could not be saved. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-bugatti-blue/15 rounded-full blur-[140px] pointer-events-none" />

      {isSuccess ? (
        <div className="relative rounded-3xl glass-panel border border-bugatti-blue/30 p-8 sm:p-12 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-bugatti-blue/20 border border-bugatti-blue/40 text-bugatti-blue flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-bugatti-blue-light font-semibold">
            Request Received
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2 mb-4">
            INQUIRY SAVED
          </h3>

          <p className="text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Thank you, <strong className="text-white">{formData.title} {formData.fullName}</strong>. Your request for <span className="text-white font-medium">{formData.location}</span> has been saved by this independent concept website. Bugatti Automobiles has not received this request.
          </p>

          <div className="max-w-md mx-auto p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-left font-mono text-xs space-y-3 mb-8">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400">Request Reference:</span>
              <span className="text-bugatti-blue-light font-bold">{bookingRef}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400">Hypercar Model:</span>
              <span className="text-white uppercase">{formData.model}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400">Location:</span>
              <span className="text-white">{formData.location.split(',')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-emerald-400">Saved successfully</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                title: 'Mr.',
                fullName: '',
                email: '',
                phone: '',
                model: 'tourbillon',
                location: locations[0],
                preferredDate: '',
                timeframe: 'within-30-days',
                currentCollection: '',
                privacyConsent: false,
                website: '',
              });
              setSubmitError('');
            }}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors"
          >
            SUBMIT ANOTHER INQUIRY
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative rounded-3xl glass-panel border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {/* Header */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-bugatti-blue-light uppercase mb-2">
              <Sparkles className="w-4 h-4 text-bugatti-blue" />
              <span>Privé Client Relations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              RESERVE YOUR DYNAMIC PILOTAGE
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
              Experience the unmatched velocity, downforce, and acoustic fury of Bugatti on closed circuit or private Alpine roads with a factory test driver.
            </p>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label
              htmlFor="website"
              aria-hidden="true"
              className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
            >
              Leave this field empty
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </label>
            {/* Title & Full Name */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">
                Salutation & Full Name *
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-24 bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-bugatti-blue"
                >
                  <option value="Mr." className="bg-neutral-900">Mr.</option>
                  <option value="Ms." className="bg-neutral-900">Ms.</option>
                  <option value="Dr." className="bg-neutral-900">Dr.</option>
                  <option value="Lord" className="bg-neutral-900">Lord</option>
                  <option value="Sheikh" className="bg-neutral-900">H.E.</option>
                </select>
                <div className="relative flex-1">
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ettore Bugatti"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bugatti-blue"
                  />
                  <User className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">
                Private Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="client@domain.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bugatti-blue"
                />
                <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">
                Direct Contact Telephone *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+33 3 88 04 44 00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bugatti-blue"
                />
                <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Preferred Model */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">
                Vehicle of Interest *
              </label>
              <div className="relative">
                <select
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-bugatti-blue"
                >
                  {BUGATTI_MODELS.map((car) => (
                    <option key={car.slug} value={car.slug} className="bg-neutral-900">
                      {car.name} ({car.category})
                    </option>
                  ))}
                </select>
                <Car className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Preferred Test Drive Location */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">
                Preferred Atelier / Circuit *
              </label>
              <div className="relative">
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white appearance-none focus:outline-none focus:border-bugatti-blue"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc} className="bg-neutral-900">
                      {loc}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Target Date */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">
                Preferred Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-bugatti-blue"
                />
                <Calendar className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Preferred Timeframe */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">
                Preferred Timeframe *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-bugatti-blue"
                >
                  <option value="within-30-days" className="bg-neutral-900">Within 30 days</option>
                  <option value="within-3-months" className="bg-neutral-900">Within 3 months</option>
                  <option value="within-6-months" className="bg-neutral-900">Within 6 months</option>
                  <option value="flexible" className="bg-neutral-900">Flexible</option>
                </select>
                <Clock className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Existing Collection / Notes */}
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">
              Current Stable or Specific Consultation Requirements
            </label>
            <textarea
              rows={3}
              value={formData.currentCollection}
              onChange={(e) => setFormData({ ...formData, currentCollection: e.target.value })}
              placeholder="e.g. Previous Chiron Pur Sport owner, interested in bespoke dual-tone carbon configuration..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bugatti-blue resize-none"
            />
          </div>

          {/* Privacy Consent */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <input
              type="checkbox"
              id="privacyConsent"
              required
              checked={formData.privacyConsent}
              onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
              className="mt-0.5 rounded border-white/20 bg-black/40 text-bugatti-blue focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="privacyConsent" className="text-xs text-gray-400 cursor-pointer leading-relaxed">
              I agree that the site owner may store and use these details solely to respond to this inquiry, as described in the{' '}
              <Link href="/privacy" className="text-bugatti-blue-light underline" onClick={(event) => event.stopPropagation()}>
                Privacy Information
              </Link>
              . This independent concept website is not operated by Bugatti Automobiles.
            </label>
          </div>

          {submitError && (
            <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {submitError}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-bugatti-blue hover:bg-bugatti-blue-light text-white font-semibold tracking-widest text-xs uppercase shadow-xl shadow-bugatti-blue/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>SAVING YOUR REQUEST...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>TRANSMIT TEST DRIVE REQUEST</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
