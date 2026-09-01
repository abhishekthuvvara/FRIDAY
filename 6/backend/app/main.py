from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from fastapi import Response
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


# GEMINI INTEGRATION
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """You are FRIDAY, an AI coding assistant specializing in Python.
...
"""

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

        chat_session = client.chats.create(
            model="gemini-3.5-flash",
            history=formatted_history,
            config=types.GenerateContentConfig(system_instruction=SYSTEM_PROMPT),
        )
        response = chat_session.send_message(request.messages[-1].content)

        return {"response": response.text}
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        raise HTTPException(status_code=500, detail="FRIDAY is temporarily unable to generate a response.")