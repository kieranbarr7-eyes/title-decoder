# Title Decoder

A tool that tells you what someone on LinkedIn actually does. Paste any job title + company, get back a real explanation of the role — including how it differs by seniority and what makes that company's version specific.

## The problem
Job titles on LinkedIn have stopped describing jobs. "Forward Deployed Engineer," "Storyteller Engineer," "Vibe Engineer" — they don't tell you what someone does day-to-day. As AI-native roles multiply, the gap keeps widening.

## The plan
- **Phase 1 (in progress):** Web app where you paste a title + company and get a real explanation back. Goal: prove that LLM-driven explanations are meaningfully better than a Google search.
- **Phase 2:** Chrome extension that surfaces the explanation inline on LinkedIn profiles.
- **Phase 3:** Visual day-timeline + YouTube DITL embeds when available.
- **Phase 4:** Avatar-narrated explainer videos.

## Stack (rough)
- Frontend: Next.js + TypeScript + Tailwind
- Backend: Vercel Edge Functions
- LLM: Claude API
- DB/cache: Supabase (added when Phase 2 needs it)
- Extension: Chrome Manifest V3 (Phase 2+)

## Status
🟢 Phase 1 — in progress  
⚪ Phase 2 — not started  
⚪ Phase 3 — not started  
⚪ Phase 4 — not started

## Building in public
Following along on X: @kbarrbuilds

## Decisions
Architecture decisions live in [`/decisions`](./decisions).

## Running locally

1. Clone the repo and `cd` into it.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example env file and add your Anthropic API key:
   ```bash
   cp .env.local.example .env.local
   # then edit .env.local and set ANTHROPIC_API_KEY=sk-ant-...
   ```
   Get a key at <https://console.anthropic.com/settings/keys>.
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open <http://localhost:3000>, paste a title + company, hit **Decode**.

### Deploying to Vercel

1. Push this repo to GitHub (already done if you cloned the canonical repo).
2. Import the project at <https://vercel.com/new>.
3. In **Settings → Environment Variables**, add `ANTHROPIC_API_KEY` for all environments.
4. Deploy. Vercel will auto-detect Next.js.
