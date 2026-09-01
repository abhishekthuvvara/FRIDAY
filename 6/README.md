# FRIDAY — AI Coding Assistant

## Phase 6 Verification (Gemini AI & Database Integration)
1. **Database Check**: Ensure you ran the SQL script from Phase 4 in your Supabase project to create `conversations` and `messages`.
2. **Environment Variables**: Add your actual `GEMINI_API_KEY` to the backend `.env` file (create it in the root folder, matching `.env.example`).
3. **Start Backend**: `cd backend && source venv/bin/activate && uvicorn app.main:app --reload`
4. **Start Frontend**: `cd frontend && npm run dev`
5. **Test**: Log in, create a chat, and ask a Python question. The backend will inject the FRIDAY System Prompt, maintain history context, call Gemini, and securely save the interaction to your Supabase tables.
