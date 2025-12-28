# CampusCart

Campus-verified exchange platform for university communities. Buy and sell with fellow students during move-in, move-out, and graduation.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth + Storage)

## Pilot Campuses

- London School of Economics (@lse.ac.uk)
- Bennett University (@bennett.edu.in)
- SPIT Mumbai (@spit.ac.in)

## Setup

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. Go to Authentication > URL Configuration and add your site URL
4. Go to Storage and verify the `listings` bucket was created

### 2. Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Find these values in Supabase: Settings > API

### 3. Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

### 5. Post-Deployment

1. Update Supabase Auth URL Configuration with your Vercel domain
2. Add `https://your-domain.vercel.app/auth/callback` to redirect URLs

## Features

- University email verification
- Campus-specific marketplaces
- Listing creation with image upload
- "Leaving Campus" mode with auto-expiry
- Direct messaging between students
- Row-level security (users only see their campus)

## Database Schema

- `campuses` - Supported universities
- `users` - User profiles linked to auth
- `listings` - Items for sale
- `messages` - Direct messages between users

## Security

- Email domain validation on signup
- Row-level security policies
- Users can only view listings from their campus
- Users can only message about visible listings
