# TranscribeOP — Web

> Next.js 15 frontend for **TranscribeOP**, the AI-powered SOP intelligence platform.
> A Claude-inspired UI for transforming transcripts and KT sessions into structured SOPs.

![next.js](https://img.shields.io/badge/next.js-15-black) ![react](https://img.shields.io/badge/react-19-61dafb) ![typescript](https://img.shields.io/badge/typescript-5-3178c6)

Companion backend repo: **TranscribeOP-api**.

---

## Stack

- **Next.js 15** (App Router, standalone output)
- **React 19** + **TypeScript 5**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **Framer Motion** for animations
- **TanStack Query** for server state
- **Zustand** for client state
- **React Hook Form** + **Zod**
- **Axios** for API calls

---

## Quick start

### Prerequisites
- Node.js 20+
- A running **TranscribeOP-api** instance (default: http://localhost:4000)

### 1. Install
```bash
npm install
```

### 2. Configure
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_NAME=TranscribeOP
```

### 3. Run
```bash
npm run dev
```

App: http://localhost:3000

### 4. Build / production
```bash
npm run build
npm run start
```

### 5. Lint & type-check
```bash
npm run lint
npm run type-check
```

---

## Project layout

```
src/
  app/         # Next.js App Router routes
  components/  # UI components (shadcn + feature)
  lib/         # API client, utils
  providers/   # Query / theme / auth providers
  stores/      # Zustand stores
  types/       # Shared TS types
```

---

## API integration

The web app calls the backend via `NEXT_PUBLIC_API_URL`. A Next.js rewrite under `/api/proxy/*` forwards to `${NEXT_PUBLIC_API_URL}/api/v1/*` (see [next.config.mjs](next.config.mjs)) — handy for avoiding CORS in dev.

> **Note:** `NEXT_PUBLIC_*` values are inlined at build time. For Vercel/static hosts, set them in the build environment, not at runtime.
