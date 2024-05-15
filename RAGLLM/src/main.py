import answer
import upload

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from waitress import serve

app = Flask(__name__)
API_KEY = os.getenv('RAG_API_KEY')
CORS(app, resources={r"/*": {"origins": ["http://localhost:8081"], "methods": ["GET", "POST"], "allowed_headers": ["Content-Type", "Authorization"]}})

@app.before_request
def authorize():
    auth_header = request.headers.get('Authorization')
    if not auth_header or auth_header.split()[0] != 'Bearer' or auth_header.split()[1] != API_KEY:
        return jsonify({'error': 'Unauthorized'}), 401

@app.route('/upload', methods=['POST'])
def upload_PDF():
    if 'pdf_file' not in request.files:
        return 'File PDF mancante', 400
    pdf_file = request.files['pdf_file']
    pdf_file.save(f"uploads/{pdf_file.filename}")
    upload.upload_knowledge(f"uploads/{pdf_file.filename}")
    return "Caricamento eseguito correttamente!", 200

@app.route('/answer', methods=['POST'])
def answer_user_question():
    question = request.form.get("text")
    if not question:
        return 'Domanda mancante!', 400
    return answer.answer_question(question), 200

@app.route('/json', methods=['GET'])
def generate_json():
    return answer.generate_json(), 200

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=5000)
