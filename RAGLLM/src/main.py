import answer
import upload

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from waitress import serve

app = Flask(__name__)
API_KEY = os.getenv('RAG_API_KEY')
CORS(app, resources={r"/*": {"origins": ["http://localhost:8081"], "methods": ["GET", "POST"]}})

@app.before_request
def authorize():
    auth_header = request.headers.get('Authorization')
    if not auth_header or auth_header.split()[0] != 'Bearer' or auth_header.split()[1] != API_KEY:
        return jsonify({'error': 'Richiesta non autorizzata'}), 401

@app.route('/upload', methods=['POST'])
def upload_PDF():
    if 'pdf_file' not in request.files:
        return jsonify({'error': 'File PDF mancante!'}), 400
    pdf_file = request.files['pdf_file']
    if pdf_file.filename == '':
        return jsonify({'error': 'Nome file PDF mancante'}), 400
    if not pdf_file.filename.endswith('.pdf'):
        return jsonify({'error': 'Formato file non supportato. Si prega di caricare un file PDF'}), 400
    pdf_file.save(f"uploads/{pdf_file.filename}")
    upload.upload_knowledge(f"uploads/{pdf_file.filename}")
    return jsonify({'response': 'Caricamento eseguito correttamente!'}), 200

@app.route('/answer', methods=['POST'])
def answer_user_question():
    try:
        jsonRequest = request.get_json()
    except:
        return jsonify({'error': 'Formato della richiesta non valido'}), 400
    if 'question' not in jsonRequest:
        return jsonify({'error': 'Nella richiesta non è presente il campo "question" relativo alla domanda'}), 400
    if 'user_data' not in jsonRequest:
        return jsonify({'error': 'Nella richiesta non è presente il campo "user_data" relativo ai dati dell\'utente'}), 400
    question = jsonRequest.get("question")
    user_data = jsonRequest.get("user_data")
    return jsonify({'response': answer.answer_question(question, user_data)}), 200

@app.route('/generateWorkout', methods=['POST'])
def generate_workout():
    try:
        jsonRequest = request.get_json()
    except:
        return jsonify({'error': 'Formato della richiesta non valido'}), 400
    if 'workout_data' not in jsonRequest:
        return jsonify({'error': 'Nella richiesta non è presente il campo "workout_data" relativo ai dati base dell\'allenamento'}), 400
    if 'user_data' not in jsonRequest:
        return jsonify({'error': 'Nella richiesta non è presente il campo "user_data" relativo ai dati dell\'utente'}), 400
    if 'available_exercises' not in jsonRequest:
        return jsonify({'error': 'Nella richiesta non è presente il campo "available_exercises" relativo agli esericizi tra cui scegliere per la creazione dell\'allenamento'}), 400
    workout_data = jsonRequest.get("workout_data")
    user_data = jsonRequest.get("user_data")
    available_exercises = jsonRequest.get("available_exercises")
    is_successful, response = answer.generate_workout_json(workout_data, user_data, available_exercises)
    if is_successful:
        return response, 200
    else:
        return jsonify({'error': response}), 500
    
@app.route('/generateDiet', methods=['POST'])
def generate_diet():
    try:
        jsonRequest = request.get_json()
    except:
        return jsonify({'error': 'Formato della richiesta non valido'}), 400
    if 'diet_data' not in jsonRequest:
        return jsonify({'error': 'Nella richiesta non è presente il campo "diet_data" relativo ai dati base del piano alimentare'}), 400
    if 'user_data' not in jsonRequest:
        return jsonify({'error': 'Nella richiesta non è presente il campo "user_data" relativo ai dati dell\'utente'}), 400
    diet_data = jsonRequest.get("diet_data")
    user_data = jsonRequest.get("user_data")
    is_successful, response = answer.generate_diet_json(diet_data, user_data)
    if is_successful:
        return response, 200
    else:
        return jsonify({'error': response}), 500

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=5000)
