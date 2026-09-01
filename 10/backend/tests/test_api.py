from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "active"

def test_unauthenticated_chat_rejected():
    payload = {"messages": [{"role": "user", "content": "Write a python script."}]}
    response = client.post("/api/chat", json=payload)
    # 403 Forbidden because HTTPBearer requires a token
    assert response.status_code in [401, 403]

def test_invalid_message_role_rejected():
    payload = {"messages": [{"role": "hacker", "content": "Write a python script."}]}
    response = client.post("/api/chat", json=payload, headers={"Authorization": "Bearer fake_token"})
    # Pydantic validation should reject the role before auth fails, or auth fails first.
    # Either way, it must not process the request.
    assert response.status_code in [401, 403, 422]
