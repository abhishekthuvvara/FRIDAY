from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
app = FastAPI(title="FRIDAY API", version="1.0.0")

origins = [os.getenv("FRONTEND_URL", "http://localhost:5173")]
app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

# GEMINI INTEGRATION
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """You are FRIDAY, an AI coding assistant specializing in Python.
Your priorities are:
1. Correctness
2. Security
3. Clarity
4. Practicality
5. Maintainability

- Understand the user's exact requirements.
- Do not invent APIs or library features.
- Use valid Python syntax.
- Explain important assumptions.
- Provide complete code when requested.
- If the request is ambiguous, ask a concise clarification.
- When debugging, identify the actual problem before providing the fix.
"""

# Models tried in order — falls through to the next one only if the current one is out of daily quota
FALLBACK_MODELS = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.5-flash-lite"]

def send_with_fallback(history, system_instruction, prompt):
    """Tries each model in FALLBACK_MODELS in order; moves to the next one only on a quota/429 error."""
    last_error = None
    for model_name in FALLBACK_MODELS:
        try:
            session = client.chats.create(
                model=model_name,
                history=history,
                config=types.GenerateContentConfig(system_instruction=system_instruction),
            )
            response = session.send_message(prompt)
            print(f"Served by: {model_name}")
            return response, model_name
        except Exception as e:
            if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
                last_error = e
                continue  # this model is out of quota — try the next one
            raise  # any other error (503, network, etc.) shouldn't trigger fallback
    raise last_error  # every model in the list is exhausted

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@app.get("/api/health")
async def health_check():
    return {"status": "active", "message": "FRIDAY Backend Systems Online", "environment": os.getenv("ENVIRONMENT", "development")}

@app.get("/")
async def root():
    return {"message": "FRIDAY backend is running", "docs": "/docs"}

@app.get("/favicon.ico")
async def favicon():
    return Response(status_code=204)

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        formatted_history = [
            types.Content(
                role="user" if msg.role == "user" else "model",
                parts=[types.Part(text=msg.content)]
            )
            for msg in request.messages[:-1]
        ]

        response, model_used = send_with_fallback(
            formatted_history, SYSTEM_PROMPT, request.messages[-1].content
        )

        return {"response": response.text, "model_used": model_used}
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
            raise HTTPException(status_code=429, detail="FRIDAY has hit its daily AI request limit across all available models. Please try again tomorrow.")
        raise HTTPException(status_code=500, detail="FRIDAY is temporarily unable to generate a response.")