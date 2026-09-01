# FRIDAY — AI Coding Assistant

A production-style AI coding assistant focused on Python programming, featuring a modern glassmorphism UI, secure authentication, code validation, and hallucination reduction.

## System Architecture
*   **Frontend:** React + Vite + Tailwind CSS
*   **Backend:** Python FastAPI
*   **Database & Auth:** Supabase (PostgreSQL + OAuth)
*   **AI Engine:** Google Gemini API

## Phase 2 Verification
1. Start Backend: `cd backend && source venv/bin/activate && uvicorn app.main:app --reload`
2. Start Frontend: `cd frontend && npm run dev`
3. Visit `http://localhost:5173`. You should see the new futuristic FRIDAY landing page.
