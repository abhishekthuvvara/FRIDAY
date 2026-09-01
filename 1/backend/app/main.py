from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from fastapi import Response
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="FRIDAY API",
    description="Backend API for FRIDAY - AI python Coding Assistant",
    version="1.0.0"
)

# CORS Configuration
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:5173"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthResponse(BaseModel):
    status: str
    message: str
    environment: str

@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="active",
        message="FRIDAY Backend Systems Online",
        environment=os.getenv("ENVIRONMENT", "development")
    )
@app.get("/")
async def root():
    return {"message": "FRIDAY backend is running", "docs": "/docs"}

@app.get("/favicon.ico")
async def favicon():
    return Response(status_code=204)