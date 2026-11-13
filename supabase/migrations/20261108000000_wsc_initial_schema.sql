-- Winners Sports Competition (WSC) Unified PostgreSQL Schema
-- Migration: 20261108000000_wsc_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. PROFILES & ROLES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'participant' 
    CHECK (role IN ('super_admin', 'event_manager', 'football_manager', 'marathon_manager', 'finance_manager', 'participant')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 2. EVENT CATEGORIES & SHARED EVENTS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.event_categories (
  id TEXT PRIMARY KEY, -- 'football', 'marathon', 'athletics'
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id TEXT NOT NULL REFERENCES public.event_categories(id),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  edition TEXT NOT NULL DEFAULT 'First Edition',
  host_institution TEXT NOT NULL DEFAULT 'Southern Delta University, Ozoro',
  venue TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'registration_open', 'registration_closed', 'in_progress', 'completed')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  registration_deadline TIMESTAMPTZ NOT NULL,
  registration_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  max_teams_or_participants INTEGER NOT NULL DEFAULT 16,
  prize_pool_total NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  prize_first NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  prize_second NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  prize_third NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  rules_summary TEXT,
  banner_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 3. SHARED EVENT REGISTRATIONS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  registration_type TEXT NOT NULL CHECK (registration_type IN ('team', 'individual')),
  reference_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'under_review', 'payment_pending', 'payment_verification', 'confirmed', 'rejected', 'withdrawn')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'pending_verification', 'verified', 'refunded')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 4. FOOTBALL MODULE: TEAMS & PLAYERS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID NOT NULL REFERENCES public.event_registrations(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  short_code TEXT,
  invite_code TEXT UNIQUE NOT NULL, -- Captain shareable invite code (e.g. WFC-ENG-4912)
  logo_url TEXT,
  captain_name TEXT NOT NULL,
  captain_email TEXT NOT NULL,
  captain_phone TEXT NOT NULL,
  seed_number INTEGER,
  bracket_position INTEGER,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'eliminated', 'active')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, name)
);

CREATE TABLE IF NOT EXISTS public.players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  student_id_card_url TEXT,
  verification_status TEXT NOT NULL DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified', 'verified', 'flagged')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.team_players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  jersey_number INTEGER NOT NULL,
  is_captain BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(team_id, player_id),
  UNIQUE(team_id, jersey_number)
);

-- ==========================================
-- 5. MARATHON MODULE: RUNNERS & CATEGORIES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.race_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g. '10K Campus Challenge', '5K Fun Run'
  distance_km NUMERIC(5, 2) NOT NULL,
  description TEXT,
  registration_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID NOT NULL REFERENCES public.event_registrations(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  race_category_id UUID REFERENCES public.race_categories(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth DATE,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  emergency_contact_relationship TEXT NOT NULL,
  medical_notes TEXT,
  t_shirt_size TEXT CHECK (t_shirt_size IN ('S', 'M', 'L', 'XL', '2XL')),
  bib_number TEXT,
  check_in_status BOOLEAN NOT NULL DEFAULT FALSE,
  check_in_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.race_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  race_category_id UUID NOT NULL REFERENCES public.race_categories(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES public.participants(id) ON DELETE CASCADE,
  bib_number TEXT NOT NULL,
  gun_time_seconds INTEGER,
  chip_time_seconds INTEGER,
  finishing_position INTEGER,
  status TEXT NOT NULL DEFAULT 'finished'
    CHECK (status IN ('finished', 'dnf', 'dq')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 6. MATCHES, FIXTURES & DISCIPLINE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  round_name TEXT NOT NULL
    CHECK (round_name IN ('round_of_16', 'quarter_finals', 'semi_finals', 'third_place', 'final')),
  match_number INTEGER NOT NULL, -- 1 through 16
  team_a_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  team_b_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  scheduled_time TIMESTAMPTZ,
  pitch_location TEXT NOT NULL DEFAULT 'SDU Pitch 1',
  status TEXT NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'in_progress', 'completed', 'walkover', 'postponed', 'abandoned')),
  score_a INTEGER DEFAULT 0,
  score_b INTEGER DEFAULT 0,
  is_extra_time BOOLEAN NOT NULL DEFAULT FALSE,
  score_a_extra_time INTEGER DEFAULT 0,
  score_b_extra_time INTEGER DEFAULT 0,
  is_penalty_shootout BOOLEAN NOT NULL DEFAULT FALSE,
  score_a_penalties INTEGER DEFAULT 0,
  score_b_penalties INTEGER DEFAULT 0,
  winner_team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  walkover_awarded_to UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  referee_name TEXT,
  match_coordinator_name TEXT,
  phone_operator_name TEXT,
  match_report TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.match_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  player_id UUID REFERENCES public.players(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL
    CHECK (event_type IN ('goal', 'yellow_card', 'red_card', 'substitution', 'var_review')),
  minute INTEGER NOT NULL,
  fine_amount NUMERIC(10, 2) DEFAULT 0.00,
  fine_status TEXT DEFAULT 'pending' CHECK (fine_status IN ('pending', 'paid', 'waived', 'not_applicable')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 7. PAYMENTS & FINANCIAL AUDIT
-- ==========================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID NOT NULL REFERENCES public.event_registrations(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  payer_name TEXT NOT NULL,
  payer_account_number TEXT,
  transfer_date DATE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  transfer_reference TEXT UNIQUE NOT NULL,
  proof_receipt_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending_verification'
    CHECK (status IN ('pending_verification', 'verified', 'rejected')),
  verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 8. MEDIA ASSETS & ANNOUNCEMENTS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video', 'highlight')),
  title TEXT NOT NULL,
  caption TEXT,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  platform TEXT NOT NULL DEFAULT 'local' CHECK (platform IN ('local', 'instagram', 'tiktok', 'youtube')),
  embed_code TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'fixtures', 'disciplinary', 'media')),
  content TEXT NOT NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.race_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.race_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can view active categories, published events, public team roster names, matches, race results, public media & announcements
CREATE POLICY "Public can read categories" ON public.event_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published events" ON public.events FOR SELECT USING (status != 'draft');
CREATE POLICY "Public can read confirmed teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Public can read matches" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Public can read race results" ON public.race_results FOR SELECT USING (true);
CREATE POLICY "Public can read race categories" ON public.race_categories FOR SELECT USING (true);
CREATE POLICY "Public can read media assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Public can read announcements" ON public.announcements FOR SELECT USING (true);

-- Team registrations: anyone can create a registration, read by reference code
CREATE POLICY "Anyone can create registration" ON public.event_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create team" ON public.teams FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit payment" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can register participant" ON public.participants FOR INSERT WITH CHECK (true);

-- ==========================================
-- 10. SEED DATA (WSC FIRST EDITION)
-- ==========================================
INSERT INTO public.event_categories (id, name, description, icon) VALUES
('football', 'Football (Monkey Post)', '5-a-side Monkey Post knockout competition with small goalposts and no fixed keeper', 'Trophy'),
('marathon', 'Marathon & Road Running', 'Campus endurance race featuring 10K Elite and 5K Campus Fun Run divisions', 'Timer')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.events (
  id, category_id, title, slug, edition, host_institution, venue, description,
  status, start_date, end_date, registration_deadline, registration_fee,
  max_teams_or_participants, prize_pool_total, prize_first, prize_second, prize_third,
  rules_summary
) VALUES
(
  'e1000000-0000-0000-0000-000000000001',
  'football',
  'Winners Football Competition',
  'wfc-first-edition',
  'First Edition',
  'Southern Delta University, Ozoro',
  'SDU Sports Complex, Ozoro',
  'The premier 5-a-side Monkey Post football tournament for Southern Delta University students. 16 teams battle in a single-elimination knockout format for ₦80,000 in cash prizes.',
  'registration_open',
  '2026-11-20',
  '2026-12-05',
  '2026-11-18 23:59:59+01',
  10000.00,
  16,
  80000.00,
  50000.00,
  20000.00,
  10000.00,
  '5-a-side Monkey Post format. 7 registered players per team. 20 mins per half. 15 min walkover grace period. Yellow card fine ₦1,000, Red card fine ₦3,000 + 1-match suspension.'
),
(
  'e2000000-0000-0000-0000-000000000002',
  'marathon',
  'Winners Marathon Challenge',
  'wmc-first-edition',
  'First Edition',
  'Southern Delta University, Ozoro',
  'Main Campus Perimeter & Stadium Ring, Ozoro',
  'Campus-wide road racing event celebrating athletic endurance and university spirit. Featuring the 10K Campus Elite and 5K Community Fun Run.',
  'registration_open',
  '2026-12-08',
  '2026-12-08',
  '2026-12-01 23:59:59+01',
  3000.00,
  200,
  50000.00,
  30000.00,
  15000.00,
  5000.00,
  'Individual timed road race. Official numbered bibs provided. First aid stations every 2.5km. Mandatory emergency contact.'
)
ON CONFLICT (id) DO NOTHING;
