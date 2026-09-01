# FRIDAY: AI Coding Assistant
**Bachelor of Technology (Artificial Intelligence & Machine Learning) - Project Documentation**

## 1. Problem Statement
Writing, debugging, and maintaining code is a time-intensive process. While generalized Large Language Models (LLMs) exist, they often hallucinate APIs, lack strict syntax validation, and are not securely integrated into a dedicated, developer-focused workspace with proper conversation isolation and rate-limiting.

## 2. Proposed Solution
**FRIDAY** is a specialized AI coding assistant focused on Python programming. It provides a secure, dark-themed, glassmorphism UI where developers can write, explain, debug, and refactor Python code. It leverages the Google Gemini API for natural language understanding and incorporates a backend Python Abstract Syntax Tree (AST) validation pipeline to reduce hallucinations and syntax errors before the user ever sees the response.

## 3. System Architecture
*   **Frontend**: React.js, Vite, Tailwind CSS (Glassmorphism UI, Responsive Mobile Overlay)
*   **Backend**: Python FastAPI (Handles AI orchestration, syntax validation, rate-limiting)
*   **Database**: Supabase PostgreSQL (Stores conversations, messages, timestamps)
*   **Authentication**: Supabase Auth (Google OAuth)
*   **AI Engine**: Google Gemini API (gemini-1.5-flash)
*   **Deployment**: Render (Static Site for Frontend, Web Service for Backend)

## 4. Functional Requirements
*   Users must be able to sign in via Google OAuth.
*   Users must be able to create, read, and delete chat conversations.
*   The system must generate Python code based on natural language prompts.
*   The system must format AI responses using Markdown and syntax-highlighted code blocks.
*   Users must be able to copy code blocks to their clipboard with one click.
*   The backend must automatically validate the syntax of generated Python code.

## 5. Non-Functional Requirements
*   **Performance**: The frontend must load quickly; backend processing should utilize streaming or optimistic UI updates.
*   **Security**: Ensure multi-tenant data isolation using Row Level Security (RLS).
*   **Usability**: Provide a fully responsive, accessible (WCAG compliant) interface.
*   **Reliability**: Rate limiting must prevent API abuse (10 requests/min/IP).

## 6. Database Design
*   **`conversations` table**: `id` (UUID), `user_id` (UUID, FK), `title` (TEXT), `created_at`, `updated_at`.
*   **`messages` table**: `id` (UUID), `conversation_id` (UUID, FK), `user_id` (UUID, FK), `role` (user|assistant), `content` (TEXT), `is_validated` (BOOLEAN), `created_at`.

## 7. AI Architecture & Hallucination Reduction Strategy
FRIDAY utilizes a multi-step pipeline to ensure high-quality code generation:
1.  **System Prompting**: A strict, Python-focused system instruction bounds the LLM's behavior, explicitly prohibiting the invention of nonexistent libraries.
2.  **AST Validation**: When the LLM generates a response, the FastAPI backend uses Regex to extract ````python` blocks. It then parses these blocks using Python's native `ast.parse()`.
3.  **Autonomous Self-Correction**: If a `SyntaxError` is detected, the backend intercepts the error, injects the traceback into a hidden prompt, and asks Gemini to fix the code (up to 2 retries) before sending the final payload to the client.

## 8. Security Architecture
*   **Authentication**: Handled entirely via Supabase; passwords are not stored.
*   **Authorization (RLS)**: PostgreSQL Row Level Security guarantees `auth.uid() = user_id`, making cross-user data breaches impossible at the database level.
*   **API Security**: The Gemini API key is stored securely in the FastAPI backend environment variables and is never exposed to the React frontend.
*   **Endpoint Protection**: `slowapi` enforces strict rate limits. Requests are authenticated via standard JWT Bearer tokens.

## 9. Deployment Architecture
*   **Frontend**: Hosted on Render as a Static Site. Continuous integration via Git hooks builds the Vite project and serves the static `dist/` directory.
*   **Backend**: Hosted on Render as a Python Web Service running `uvicorn` and `fastapi`.
*   **Database**: Supabase manages the managed PostgreSQL instance and connection pooling.

## 10. Future Enhancements
*   **Secure Code Execution Sandbox**: Implement Docker-based isolated containers to actually run the generated code safely.
*   **RAG over Documentation**: Sync the latest Python package documentation into a vector database to provide version-aware API assistance.
*   **IDE Integration**: Develop a VS Code extension that interfaces with the FRIDAY backend.
