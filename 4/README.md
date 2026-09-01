# FRIDAY — AI Coding Assistant

A production-style AI coding assistant focused on Python programming, featuring a modern glassmorphism UI, secure authentication, code validation, and hallucination reduction.

## System Architecture
*   **Frontend:** React + Vite + Tailwind CSS
*   **Backend:** Python FastAPI
*   **Database & Auth:** Supabase (PostgreSQL + OAuth)
*   **AI Engine:** Google Gemini API

## Phase 4 Verification (Database Setup)
1. Navigate to your Supabase Dashboard.
2. Go to the **SQL Editor**.
3. Open `database/migrations/01_initial_schema.sql` from this project.
4. Copy and run the SQL code to create the `conversations` and `messages` tables, apply Row Level Security (RLS) policies, and create performance indexes.
5. Verify that the tables have been created securely in your Supabase Table Editor.
