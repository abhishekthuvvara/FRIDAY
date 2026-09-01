# FRIDAY — AI Coding Assistant

A production-style AI coding assistant focused on Python programming, featuring a modern glassmorphism UI, secure authentication, code validation, and hallucination reduction.

## System Architecture
*   **Frontend:** React + Vite + Tailwind CSS
*   **Backend:** Python FastAPI
*   **Database & Auth:** Supabase (PostgreSQL + OAuth)
*   **AI Engine:** Google Gemini API

## Phase 3 Verification
1. Setup Supabase: Create a Supabase project, enable Google Auth, and copy your URL and Anon Key into `frontend/.env` (using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
2. Start Backend: `cd backend && source venv/bin/activate && uvicorn app.main:app --reload`
3. Start Frontend: `cd frontend && npm install && npm run dev`
4. Visit `http://localhost:5173`. Click "Sign In" or "Start Coding" to trigger Google OAuth. Once authenticated, you will be redirected to the protected `/chat` route.
