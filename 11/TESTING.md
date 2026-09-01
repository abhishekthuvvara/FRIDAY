# FRIDAY Testing Matrix
## Automated Tests
- **Backend**: Implemented using `pytest` in `backend/tests/`.
- **Frontend**: Implemented using `vitest` in `frontend/src/tests/`.

## Manual Test Cases (MVP Acceptance)
1. **Test 1: Beginner Explanation** -> Correct beginner explanation formatted in Markdown.
2. **Test 2: Code Generation** -> Valid Python code block, syntax validated (green check).
3. **Test 3: Debugging** -> Identifies missing syntax and corrects the error.
4. **Test 4: Rewriting** -> Functional OOP version generated.
5. **Test 5: Delete Conversation** -> Conversation disappears from history and database.
6. **Test 6: Create New Chat** -> New empty conversation, chat area clears.
7. **Test 7: Copy Code** -> Code copied to clipboard, button shows "Copied!".
8. **Test 8: Unauthenticated Request** -> Backend returns HTTP 401. 
9. **Test 9: Cross-User Isolation** -> Supabase RLS policies reject the query.
10. **Test 10: Rate Limiting** -> UI displays "Rate limit exceeded".
