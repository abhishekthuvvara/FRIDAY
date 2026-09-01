# FRIDAY Testing Matrix

## Automated Tests
- **Backend**: Implemented using `pytest` in `backend/tests/`. Run with `pytest`. Tests cover Health Check, Auth Rejection (401), Rate Limiting (429), and Input Validation (422).
- **Frontend**: Implemented using `vitest` in `frontend/src/tests/`. Run with `npm run test`. Tests cover basic component rendering.

## Manual Test Cases (MVP Acceptance)
Please execute these manually in the UI:

1. **Test 1: Beginner Explanation**
   - *Prompt*: "What is a Python variable?"
   - *Expected*: Correct beginner explanation formatted in Markdown.
2. **Test 2: Code Generation**
   - *Prompt*: "Write a Python Fibonacci program."
   - *Expected*: Valid Python code block, syntax validated (green check).
3. **Test 3: Debugging**
   - *Prompt*: "Debug this Python code: `print(x`"
   - *Expected*: Identifies the missing parenthesis and corrects the error.
4. **Test 4: Rewriting**
   - *Prompt*: "Rewrite this using OOP: `def add(a,b): return a+b`"
   - *Expected*: Functional OOP version (e.g., a Calculator class).
5. **Test 5: Delete Conversation**
   - *Action*: Click the three dots on a chat in the sidebar and delete it.
   - *Expected*: Conversation disappears from history and database.
6. **Test 6: Create New Chat**
   - *Action*: Click "+ New Chat".
   - *Expected*: New empty conversation, chat area clears.
7. **Test 7: Copy Code**
   - *Action*: Click "Copy" on a generated code block.
   - *Expected*: Code copied to clipboard, button shows "Copied!".
8. **Test 8: Unauthenticated Request**
   - *Action*: Attempt API request without token.
   - *Expected*: Backend returns HTTP 401. (Tested via pytest)
9. **Test 9: Cross-User Isolation**
   - *Action*: Attempt to query another user's conversation ID.
   - *Expected*: Supabase RLS policies reject the query (returns empty).
10. **Test 10: Rate Limiting**
    - *Action*: Send 11 rapid messages.
    - *Expected*: UI displays "Rate limit exceeded". (Tested via pytest)
