export interface BookingInquiry {
  type: 'booking';
  salutation: string;
  fullName: string;
  email: string;
  phone: string;
  model: string;
  location: string;
  preferredDate: string;
  timeframe: string;
  notes: string;
  privacyConsent: boolean;
  website: string;
}

export interface ConfigurationInquiry {
  type: 'configuration';
  model: string;
  configuration: {
    exteriorColor: string;
    exteriorFinish: string;
    wheelDesign: string;
    rimColor: string;
    caliperColor: string;
    interiorTheme: string;
    activeAero: boolean;
    headlightsOn: boolean;
  };
  website: string;
}

export type Inquiry = BookingInquiry | ConfigurationInquiry;

export async function submitInquiry(inquiry: Inquiry): Promise<string> {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!projectUrl || !publicKey) {
    throw new Error(
      'The inquiry service is not configured. Please try again later or contact the site owner.'
    );
  }

  let endpoint: URL;
  try {
    endpoint = new URL('/functions/v1/submit-inquiry', projectUrl);
  } catch {
    throw new Error('The inquiry service URL is invalid. Please contact the site owner.');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: publicKey,
      Authorization: `Bearer ${publicKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inquiry),
  });

  let result: { reference?: unknown; error?: unknown };
  try {
    result = await response.json();
  } catch {
    throw new Error('The inquiry service returned an invalid response. Please try again.');
  }

  if (!response.ok) {
    const message = typeof result.error === 'string' ? result.error : '';
    throw new Error(message || 'Your request could not be saved. Please try again.');
  }

  if (typeof result.reference !== 'string' || !result.reference) {
    throw new Error('The inquiry service did not confirm your request. Please try again.');
  }

  return result.reference;
}
