import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const MAX_BODY_BYTES = 16_384;
const allowedModels = new Set([
  'tourbillon',
  'bolide',
  'chiron-pur-sport',
  'divo',
  'mistral',
  'la-voiture-noire',
]);
const allowedLocations = new Set([
  'Château Saint-Jean, Molsheim (Alsace, France)',
  'Circuit Paul Ricard (Le Castellet, France)',
  'Dubai Autodrome & Yas Marina (UAE)',
  'Monaco Port Hercule & Col de Turini (Monaco)',
  'The Quail & Laguna Seca (California, USA)',
  'Mayfair Private Salon (London, UK)',
]);
const allowedTimeframes = new Set([
  'within-30-days',
  'within-3-months',
  'within-6-months',
  'flexible',
]);
const allowedWheelDesigns = new Set(['aerolight', 'pursport', 'bolide-aero', 'classique']);
const allowedInteriorThemes = new Set([
  'beluga-blue',
  'terre-dor',
  'rouge-sang',
  'blanc-glacier',
]);
const allowedExteriorColors = new Set([
  '#0048FF',
  '#08090C',
  '#D0D5DD',
  '#B91C1C',
  '#F3F4F6',
  '#092147',
  '#EAB308',
  '#064E3B',
]);
const allowedRimColors = new Set(['#16181F', '#CBD5E1', '#D4AF37', '#1E40AF']);
const allowedCaliperColors = new Set(['#0048FF', '#DC2626', '#FACC15', '#EA580C', '#94A3B8']);

function jsonResponse(
  status: number,
  body: Record<string, unknown>,
  origin: string
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      Vary: 'Origin',
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requiredText(
  data: Record<string, unknown>,
  key: string,
  maxLength: number
): string | null {
  const value = data[key];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= maxLength ? trimmed : null;
}

function optionalText(
  data: Record<string, unknown>,
  key: string,
  maxLength: number
): string | null {
  const value = data[key];
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length <= maxLength ? trimmed || null : null;
}

function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#[\da-f]{6}$/i.test(value);
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get('origin');
  const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (!origin || !allowedOrigins.includes(origin)) {
    return new Response('Origin is not allowed.', { status: 403 });
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        Vary: 'Origin',
      },
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed.' }, origin);
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: 'Request is too large.' }, origin);
  }

  const bodyText = await request.text();
  if (new TextEncoder().encode(bodyText).length > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: 'Request is too large.' }, origin);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(bodyText);
  } catch {
    return jsonResponse(400, { error: 'Invalid request body.' }, origin);
  }

  if (!isRecord(payload)) {
    return jsonResponse(400, { error: 'Invalid request body.' }, origin);
  }

  if (typeof payload.website === 'string' && payload.website.trim()) {
    return jsonResponse(400, { error: 'Request could not be accepted.' }, origin);
  }

  const model = requiredText(payload, 'model', 60);
  if (!model || !allowedModels.has(model)) {
    return jsonResponse(400, { error: 'Select a valid vehicle model.' }, origin);
  }

  const reference = `BG-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  let row: Record<string, unknown>;

  if (payload.type === 'booking') {
    const salutation = requiredText(payload, 'salutation', 20);
    const fullName = requiredText(payload, 'fullName', 120);
    const email = requiredText(payload, 'email', 254);
    const phone = requiredText(payload, 'phone', 40);
    const location = requiredText(payload, 'location', 160);
    const preferredDate = optionalText(payload, 'preferredDate', 10);
    const timeframe = requiredText(payload, 'timeframe', 40);
    const notes = optionalText(payload, 'notes', 2000);
    const hasPreferredDate =
      payload.preferredDate !== undefined &&
      payload.preferredDate !== null &&
      payload.preferredDate !== '';
    const hasNotes =
      payload.notes !== undefined && payload.notes !== null && payload.notes !== '';
    const parsedDate = preferredDate
      ? Date.parse(`${preferredDate}T00:00:00.000Z`)
      : Number.NaN;
    const validPreferredDate =
      typeof preferredDate === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(preferredDate) &&
      !Number.isNaN(parsedDate) &&
      new Date(parsedDate).toISOString().slice(0, 10) === preferredDate;

    if (
      !salutation ||
      !fullName ||
      fullName.length < 2 ||
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !phone ||
      phone.length < 7 ||
      !location ||
      !allowedLocations.has(location) ||
      !timeframe ||
      !allowedTimeframes.has(timeframe) ||
      (hasPreferredDate && !validPreferredDate) ||
      (hasNotes && notes === null) ||
      payload.privacyConsent !== true
    ) {
      return jsonResponse(400, { error: 'Check the form fields and try again.' }, origin);
    }

    row = {
      reference,
      submission_type: 'booking',
      salutation,
      full_name: fullName,
      email,
      phone,
      model_slug: model,
      location,
      preferred_date: preferredDate,
      timeframe,
      notes,
      privacy_consent: true,
    };
  } else if (payload.type === 'configuration') {
    const configuration = payload.configuration;

    if (
      !isRecord(configuration) ||
      !isHexColor(configuration.exteriorColor) ||
      !allowedExteriorColors.has(configuration.exteriorColor.toUpperCase()) ||
      !isHexColor(configuration.rimColor) ||
      !allowedRimColors.has(configuration.rimColor.toUpperCase()) ||
      !isHexColor(configuration.caliperColor) ||
      !allowedCaliperColors.has(configuration.caliperColor.toUpperCase()) ||
      !['gloss', 'matte', 'carbon'].includes(String(configuration.exteriorFinish)) ||
      typeof configuration.wheelDesign !== 'string' ||
      !allowedWheelDesigns.has(configuration.wheelDesign) ||
      typeof configuration.interiorTheme !== 'string' ||
      !allowedInteriorThemes.has(configuration.interiorTheme) ||
      typeof configuration.activeAero !== 'boolean' ||
      typeof configuration.headlightsOn !== 'boolean'
    ) {
      return jsonResponse(400, { error: 'The vehicle specification is invalid.' }, origin);
    }

    row = {
      reference,
      submission_type: 'configuration',
      model_slug: model,
      configuration,
    };
  } else {
    return jsonResponse(400, { error: 'Select a valid request type.' }, origin);
  }

  const projectUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!projectUrl || !serviceRoleKey) {
    console.error('Supabase function is missing database credentials.');
    return jsonResponse(503, { error: 'The inquiry service is temporarily unavailable.' }, origin);
  }

  const supabase = createClient(projectUrl, serviceRoleKey);
  const { error } = await supabase.from('inquiries').insert(row);
  if (error) {
    console.error('Could not save an inquiry:', error.message);
    return jsonResponse(500, { error: 'Your request could not be saved. Please try again.' }, origin);
  }

  return jsonResponse(201, { reference }, origin);
});
