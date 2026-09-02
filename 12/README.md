# FRIDAY — AI Coding Assistant

A production-style AI coding assistant focused on Python programming, featuring a modern glassmorphism UI, secure authentication, code validation, and hallucination reduction. Built as a BTech AI & ML final-year project.

## Phase 12 Verification (Deployment to Render)
1. **Prepare for Render**: Push this complete project repository to GitHub.
2. **Connect Render to GitHub**: 
   - Go to [Render](https://render.com/).
   - Click "Blueprints" -> "New Blueprint Instance".
   - Select your GitHub repository. Render will read the `render.yaml` file automatically.
3. **Configure Environment Variables**:
   - In the Render dashboard, populate the required environment variables for the Backend (`GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`) and Frontend (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_BACKEND_URL`). Set `VITE_BACKEND_URL` to the deployed backend URL, such as `https://friday-backend-xxxx.onrender.com`.
   - Once the frontend is deployed, copy its URL and set it as the `FRONTEND_URL` environment variable in your Backend service configuration to allow CORS.
4. **Documentation**: Refer to `docs/BTech_Project_Report.md` for the comprehensive project architecture report needed for your final-year presentation.
