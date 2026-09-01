from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import ast
import re
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

When generating code:
- Understand the user's exact requirements.
- Do not invent APIs or library features.
- Use valid Python syntax.
- Explain important assumptions.
- Provide complete code when requested.
- If the request is ambiguous, ask a concise clarification.
- If the user provides code, preserve their intended behavior unless asked to change it.
- When debugging, identify the actual problem before providing the fix.
"""

class Message(BaseModel):
    role: str
    content: str
    is_validated: Optional[bool] = False

class ChatRequest(BaseModel):
    messages: List[Message]

def extract_python_code(text: str) -> List[str]:
    pattern = r"```(?:python)?\n(.*?)\n```"
    return re.findall(pattern, text, re.DOTALL)

def validate_python_code(code: str) -> Optional[str]:
    try:
        ast.parse(code)
        return None
    except SyntaxError as e:
        return f"SyntaxError on line {e.lineno}: {e.msg}\nCode snippet:\n{e.text}"
    except Exception as e:
        return f"Error: {str(e)}"

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

        current_prompt = request.messages[-1].content
        MAX_RETRIES = 2

        for attempt in range(MAX_RETRIES + 1):
            response = chat_session.send_message(current_prompt)
            text_response = response.text

            code_blocks = extract_python_code(text_response)
            all_valid = True
            error_msg = ""

            if code_blocks:
                for code in code_blocks:
                    val_error = validate_python_code(code)
                    if val_error:
                        all_valid = False
                        error_msg = val_error
                        break

            if all_valid:
                return {
                    "response": text_response,
                    "validated": len(code_blocks) > 0
                }

            if attempt < MAX_RETRIES:
                current_prompt = f"The code you just provided has the following syntax error:\n{error_msg}\nPlease fix the error and provide the corrected code."
            else:
                return {
                    "response": text_response + "\n\n*(Note: FRIDAY detected potential syntax errors in this code. Please review carefully.)*",
                    "validated": False
                }
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        raise HTTPException(status_code=500, detail="FRIDAY is temporarily unable to generate a response.")

@app.get("/api/health")
async def health_check():
    return {"status": "active", "message": "FRIDAY Backend Systems Online", "environment": os.getenv("ENVIRONMENT", "development")}

@app.get("/")
async def root():
    return {"message": "FRIDAY backend is running", "docs": "/docs"}

@app.get("/favicon.ico")
async def favicon():
    return Response(status_code=204)