# FRIDAY — AI Coding Assistant

## Phase 9 Verification (Security Implementation)
1. **New Backend Dependencies**: Run `pip install -r requirements.txt` in your backend folder to install `slowapi` for rate limiting.
2. **Environment Variables**: Make sure your backend `.env` now includes `SUPABASE_URL` and `SUPABASE_ANON_KEY` so FastAPI can securely verify JWT tokens.
3. **Start Application**: Run frontend (`npm run dev`) and backend (`uvicorn app.main:app --reload`).
4. **Test Authorization**: Try accessing the `/api/chat` endpoint directly via Postman without a Bearer token. It will return `401 Unauthorized`.
5. **Test Rate Limiting**: Send more than 10 messages within a minute from the frontend. FRIDAY will gracefully block the requests and display a rate limit error.
6. **Input Validation**: The backend now strictly enforces message boundaries (max 10,000 characters) and allowed roles using Pydantic validation.
