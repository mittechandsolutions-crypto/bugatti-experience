# GitHub Pages and Supabase setup

This project is a static GitHub Pages site. Supabase Edge Functions provide the
server-side inquiry endpoint; browser code only uses the Supabase public anon
key. Never put a Supabase service-role key in the site or GitHub Actions
variables.

## 1. Configure Supabase

1. Create or select a Supabase project.
2. In GitHub **Settings → Secrets and variables → Actions**, add the secrets
   `SUPABASE_ACCESS_TOKEN` and `SUPABASE_DB_PASSWORD`, and the variable
   `SUPABASE_PROJECT_ID` (the project reference in the Supabase dashboard URL).
3. Run **Deploy Supabase backend** from the repository's Actions tab. It applies
   the migration, deploys the Edge Function with JWT verification enabled, and
   allows requests from `https://OWNER.github.io`. For a custom domain, edit
   the last step in `.github/workflows/deploy-backend.yml` before deploying.
4. The function uses Supabase's `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` server-side secrets.
5. Copy the project URL and public anon key from Supabase; do not use the
   service-role key.

## 2. Configure GitHub Pages

1. Push this project to a GitHub repository on the `main` branch.
2. In **Settings → Pages**, select **GitHub Actions** as the build and deploy
   source.
3. In **Settings → Secrets and variables → Actions → Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`: the Supabase project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: the Supabase public anon key.
4. Push to `main` or run the **Deploy to GitHub Pages** workflow manually.

The workflow builds the static site at the repository subpath automatically.
The deployment URL is shown in **Settings → Pages** and in the workflow run.

## Local development

Create `.env.local` with the two `NEXT_PUBLIC_SUPABASE_*` values and add
`http://localhost:3000` to the function's `ALLOWED_ORIGINS`, then run
`npm run dev`. Without these values, submissions fail visibly instead of
pretending to have been saved.

Inquiry submissions are stored in the project's private `inquiries` table.
The public browser key has no direct table permissions; only the Edge Function
can write records. The request form collects contact details only to handle the
submitted request. Before collecting real customer data, configure the
appropriate privacy notice and abuse protections for your deployment.

This is an independent concept project and is not affiliated with or endorsed
by Bugatti Automobiles S.A.S.
