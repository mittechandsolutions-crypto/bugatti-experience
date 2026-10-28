create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  submission_type text not null check (submission_type in ('booking', 'configuration')),
  salutation text,
  full_name text,
  email text,
  phone text,
  model_slug text not null,
  location text,
  preferred_date date,
  timeframe text,
  notes text,
  privacy_consent boolean not null default false,
  configuration jsonb,
  created_at timestamptz not null default now(),
  constraint inquiries_payload_matches_type check (
    (submission_type = 'booking'
      and full_name is not null
      and email is not null
      and phone is not null
      and privacy_consent = true
      and configuration is null)
    or
    (submission_type = 'configuration'
      and configuration is not null
      and full_name is null
      and email is null
      and phone is null)
  )
);

alter table public.inquiries enable row level security;
revoke all on table public.inquiries from anon, authenticated;
