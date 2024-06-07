import requests
import pytest

# Configura gli URL e le credenziali
login_url = "http://maven-app-bsn:8088/api/v1/auth/authenticate"
protected_endpoint_url = "http://maven-app-bsn:8088/api/v1/ragllm/answer"
username = "tester_user"
password = "password123"
timeout = 20  # Imposta il timeout massimo a 20 secondi

def test_login_and_access_protected_endpoint():
    # Effettua la richiesta di login
    login_payload = {
        "username": username,
        "password": password
    }

    login_response = requests.post(login_url, json=login_payload, timeout=timeout)
    assert login_response.status_code == 200, f"Errore nella richiesta di login: {login_response.status_code} - {login_response.text}"

    # Estrai il token JWT dalla risposta di login
    jwt_token = login_response.json().get("token")
    assert jwt_token is not None, "Errore: il token JWT non è presente nella risposta di login"

    # Effettua una richiesta autenticata al secondo endpoint
    headers = {
        "Authorization": f"Bearer {jwt_token}"
    }
    rag_payload = {
        "question": 'Come mi chiamo?',
    }
    response = requests.post(protected_endpoint_url, headers=headers, json=rag_payload, timeout=timeout)

    # Verifica la risposta
    assert response.status_code == 200, f"Errore nella richiesta autenticata: {response.status_code} - {response.text}"
    response_json = response.json()
    assert "response" in response_json, "La risposta non contiene il campo 'answer'"

    # Stampa i risultati per verifica manuale (opzionale)
    print("Richiesta autenticata con successo")
    print("Dati ottenuti:", response_json)

if __name__ == '__main__':
    pytest.main()
