# Admission Bridge – Full Stack University Admission Platform

Admission Bridge is a website where students can find suitable admission opportunities based on their GPA, IELTS score, preferred university and country. According to their preferences, they can also apply to any university of their choice.

## Live Link

Website: https://admission-bridge.vercel.app/

## Project Overview

> The Admission Bridge is a vertical-slice admission system where students can:

1. Search universities by country & degree

2. Filter in real-time using tuition fee slider, GPA & IELTS

3. Compare universities side-by-side

4. Apply instantly with a validated multi-step form

## Tech Stack

- Frontend: Next.js, Tailwind CSS, Framer Motion
- Backend: Next.js API Routes
- Database: PostgreSQL
- Deployment: Vercel + Railway

## Dependencies

```
 "dependencies": {
    "axios": "^1.13.2",
    "daisyui": "^5.5.14",
    "framer-motion": "^12.23.26",
    "lottie-react": "^2.4.1",
    "lucide-react": "^0.562.0",
    "next": "16.1.1",
    "pg": "^8.16.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.69.0",
    "react-toastify": "^11.0.5",
    "sweetalert2": "^11.26.17"
  },
```

```
"devDependencies": {
  "@tailwindcss/postcss": "^4.1.18",
  "eslint": "^9",
  "eslint-config-next": "16.1.1",
  "tailwindcss": "^4.1.18"
}
```

## Local Setup

```
git clone https://github.com/oiiemon9/admission-bridge.git
cd admission-bridge
npm install
```

### Create .env.local

DATABASE_URL=\*\*\*\*

### Run SQL Seed File

```
psql -U username -d dbname -f seed.sql
```

### Start Development Server

```
npm run dev
```
