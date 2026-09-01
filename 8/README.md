# FRIDAY — AI Coding Assistant

## Phase 8 Verification (Code UX)
1. **New Dependencies**: We added Markdown parsing and Syntax Highlighting libraries. Navigate to your `frontend` directory and run `npm install`.
2. **Start Backend**: `cd backend && source venv/bin/activate && uvicorn app.main:app --reload`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Test**: Ask FRIDAY to "Write a Python function to read a CSV file". You will see the response formatted cleanly with Markdown, highlighting for Python code, and a functional "Copy code" button that shows a success state.
