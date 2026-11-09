# Winners Sports Competition (WSC) — Unified Sports Platform

[![Built for Southern Delta University, Ozoro](https://img.shields.io/badge/SDU%20Ozoro-First%20Edition-amber.svg)](https://winners-sports.org)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2014%20%7C%20Supabase%20%7C%20Vercel-blue.svg)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8.svg)](https://tailwindcss.com)

A unified sports-event management platform built for **Southern Delta University, Ozoro**, powering the **Winners Football Competition (WFC)** and the **Winners Marathon Challenge (WMC)** under one shared athletic brand, admin workspace, and registration engine.

---

## 🏆 Architectural Pillars

1. **Shared Events Engine**: Football and marathon are distinct sporting categories with specialized workflows, but they share the same event infrastructure, participant records, manual bank transfer verification, announcements, media assets, and administrative roles.
2. **5-a-Side Monkey Post Football (WFC)**:
   - 16 confirmed student teams; exactly 7 registered players per squad.
   - 5 active players moving freely on the pitch with small goalposts (no fixed goalkeeper or fixed post defender).
   - Regulation match time: 20 minutes first half + 20 minutes second half.
   - Tie-breaks: 5 minutes extra time, followed by long-distance penalty kicks.
   - Strict 15-minute walkover grace period.
   - Card fines: **₦1,000** for yellow card; **₦3,000** for red card + 1-match suspension.
   - Sideline phone video review system with 1 appeal request per team per match.
   - Cash prize pool: **₦80,000** (50% of the ₦160,000 registration income: ₦50,000 Champion, ₦20,000 Runner-up, ₦10,000 3rd Place).
3. **Campus Marathon & Road Running (WMC)**:
   - **10K Campus Elite Challenge** (timed, 2 laps, ₦30k / ₦15k / ₦5k podium cash prizes).
   - **5K Campus Fun Run** (1 lap community race, certificates and hydration pack).
   - Official bib number generation and physical check-in workflow.
   - Mandatory emergency contact and medical health disclosures (asthma, cardiovascular safety).
   - Water & first-aid stations every 2.5km.
4. **Manual Bank Transfer Verification (Document 10)**:
   - Official account: **First Bank of Nigeria — 3123456789** (*Winners Sports Competition Committee*).
   - Teams and runners submit transfer references; Finance Officers verify cleared funds before confirming registration. No cash on the pitch.

---

## 💻 Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org) (App Router, Server Components & Route Handlers)
- **Database & Auth**: [Supabase](https://supabase.com) (PostgreSQL 15, Row Level Security, Storage, Realtime)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + Lucide Icons + Radix UI primitives
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Deployment**: [Vercel](https://vercel.com) (Edge Functions, Preview Deployments, ISR)

---

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-org/winners-sports-competition.git
cd winners-sports-competition

# Install dependencies (pnpm recommended)
pnpm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials (if connecting to live database; the platform runs seamlessly out-of-the-box with seed mock store if credentials are left blank):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. Database Migration (Supabase)

To provision your live Supabase PostgreSQL database, execute the unified migration script located at:

```
supabase/migrations/20261108000000_wsc_initial_schema.sql
```

This provisions all tables (`profiles`, `events`, `event_registrations`, `teams`, `players`, `matches`, `match_events`, `participants`, `race_results`, `payments`, `media_assets`, `audit_logs`) and configures Row Level Security (RLS) policies.

### 4. Running Locally

```bash
# Start development server
pnpm run dev
# or
node ./node_modules/next/dist/bin/next dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Application Directory Structure

```
src/
├── app/
│   ├── (public)/                 # Public brand and tournament discovery
│   │   ├── page.tsx              # Homepage with hero, live ticker, media
│   │   ├── events/page.tsx       # Unified event catalogue (Football & Marathon)
│   │   ├── football/page.tsx     # WFC Hub: 16-team bracket, fixtures, rules, fines
│   │   ├── football/register/    # 4-step 7-player team registration wizard
│   │   ├── marathon/page.tsx     # WMC Hub: 10K/5K divisions, bib lookup, results
│   │   ├── marathon/register/    # Runner registration with medical disclosures
│   │   ├── gallery/page.tsx      # Volunteer photo & video media wall
│   │   ├── about/page.tsx        # Constitution & committee structure
│   │   └── contact/page.tsx      # Inquiries, volunteer signup, protests
│   ├── admin/                    # Administrative management console
│   │   ├── login/page.tsx        # Role switcher & credentials authentication
│   │   ├── dashboard/page.tsx    # Executive dashboard & metrics
│   │   ├── events/page.tsx       # Events lifecycle & configuration
│   │   ├── football/page.tsx     # Match scores, card fines, random draw
│   │   ├── marathon/page.tsx     # Runner check-in, bib assignment, timing
│   │   ├── payments/page.tsx     # Bank transfer verification & revenue ledger
│   │   ├── media/page.tsx        # Volunteer media asset manager
│   │   ├── reports/page.tsx      # Document 10 financial closeout report
│   │   └── audit/page.tsx        # System activity audit logs
│   ├── api/                      # REST API endpoints
│   │   ├── events/route.ts
│   │   ├── football/route.ts
│   │   ├── marathon/route.ts
│   │   └── payments/route.ts
│   ├── globals.css               # Obsidian/Gold/Emerald theme & accessibility
│   └── layout.tsx
├── components/
│   ├── layout/                   # Navbar & Footer
│   └── shared/                   # TournamentBracket, MatchScorecard, BibBadge
├── config/site.ts                # Brand settings, banking info & rules
├── lib/                          # Utils, date formatters, reference generator
├── services/                     # Business logic & seed data store
└── types/                        # TypeScript definitions
```

---

## 🛡️ Design Engineering & Accessibility Standards

- **Color Contrast**: WCAG 2.2 AA/AAA compliant tokens with dark athletic obsidian backgrounds (`#090D16`), Electric Gold accents (`#F59E0B`), and Pitch Emerald highlights (`#10B981`).
- **Typography**: Tabular numerals (`tabular-nums`) for match clocks, scores, bib numbers, and financial receipts.
- **Accessibility**: Minimum `44x44px` hit targets for interactive elements, visible focus rings, ARIA landmark semantics, and reduced-motion fallbacks (`@media (prefers-reduced-motion: reduce)`).
- **Mobile First**: Fluid responsive layouts for participants registering on smartphones across campus.

---

## 📄 License & Document Register

Governed by the official documentation package for the First Edition of the Winners Football Competition at Southern Delta University, Ozoro:
- `01_Tournament_Overview.md`
- `02_Tournament_Constitution.md`
- `03_Rules_of_the_Game.md`
- `04_Terms_and_Conditions.md`
- `05_Team_Registration_Specification.md`
- `06_Disciplinary_and_Appeals_Policy.md`
- `07_Tournament_Operations_Handbook.md`
- `08_Fixtures_Results_and_Knockout_Management.md`
- `09_Video_Review_and_Media_Guidelines.md`
- `10_Financial_Management_and_Prize_Policy.md`
