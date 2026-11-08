# KHAANS DIGITS — starter website

This is a Next.js (TypeScript) project, not a Python website. Next.js is the frontend/backend framework selected earlier and is supported by Netlify. Python can be used for separate backend services, but it is not needed for this website starter.

## 1. Install tools
Install Node.js LTS and Visual Studio Code. Open this folder in VS Code.

## 2. Run locally
Open Terminal > New Terminal:
```bash
npm install
copy .env.example .env.local
npm run dev
```
On macOS/Linux use `cp .env.example .env.local`.
Open http://localhost:3000.

## 3. Connect Supabase
1. Create a project at https://supabase.com/dashboard.
2. Open Project Settings / API (or Connect) and copy Project URL and publishable/anon key.
3. Put them in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Open SQL Editor and run `supabase/schema.sql`.
5. Enable email confirmation in Supabase Authentication settings.
6. Create your own account at `/signup`, then find its UUID in Authentication > Users.
7. In SQL Editor run:
   `update public.profiles set role='admin' where id='YOUR-USER-UUID';`
   Never allow public sign-up to choose an admin role.
8. Set Auth Site URL and redirect URLs to your local URL and later your Netlify URL.

## 4. Important before public launch
This starter includes the marketing site, order request form, sign-up/sign-in, and a basic customer order list. It is NOT yet a complete production admin dashboard or complete secure payment integration. The order form can send a WhatsApp message and can insert into Supabase when configured. For reliable customer order history, add authenticated checkout/order creation and verify user identity server-side. The current demo order form intentionally allows an anonymous lead submission and must be hardened with server-side validation, rate limiting, CAPTCHA/spam protection, and stricter RLS before public launch.

Do not collect card numbers, passwords, bank login details, or sensitive payment credentials. For manual payment, collect a payment reference/receipt and verify it yourself. PayPal/Stripe require a proper merchant account and server-side payment integration; do not mark payments paid from browser input.

Configure Supabase backups on a plan that supports your needs. Test restore procedures. Keep service-role keys secret and server-side only.

## 5. Deploy to Netlify
1. Push the project to a GitHub repository (do not upload `.env.local`).
2. In Netlify choose Add new site > Import an existing project, connect GitHub, and select the repo.
3. Netlify should detect Next.js. Build command: `npm run build`. Do not set a static publish directory for the Next.js SSR app.
4. In Site configuration > Environment variables add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy / trigger a fresh deploy after adding or changing variables.
6. Add the final Netlify URL to Supabase Auth URL configuration.
7. Test signup, email verification, login, password reset (not yet implemented in this starter), order form, and mobile layout.

Netlify's current Next.js support uses its maintained adapter and supports App Router. See the official docs linked in the project instructions.

## 6. Pages to build next
The full plan also calls for About, portfolios/gallery with admin-managed items, pricing, FAQ, contact page, testimonials, admin order management, payment review, content editor, password reset, WhatsApp/email notifications, and role-protected admin routes. Those are planned but not all implemented in this starter. Build and test them before treating the site as a finished secure business platform.
