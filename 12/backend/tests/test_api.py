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
    assert response.status_code in [401, 403]

def test_invalid_message_role_rejected():
    payload = {"messages": [{"role": "hacker", "content": "Write a python script."}]}
    response = client.post("/api/chat", json=payload, headers={"Authorization": "Bearer fake_token"})
    assert response.status_code in [401, 403, 422]
