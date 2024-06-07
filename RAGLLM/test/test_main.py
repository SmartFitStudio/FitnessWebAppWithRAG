import unittest
import unittest.mock as mock
from flask import Flask
from flask_testing import TestCase
import os
import json
from io import BytesIO
from src.main import app

API_KEY = os.getenv('RAG_API_KEY')

class TestMain(TestCase):

    def create_app(self):
        return app

    def setUp(self):
        os.makedirs('uploads', exist_ok=True)

    def tearDown(self):
        for filename in os.listdir('uploads'):
            file_path = os.path.join('uploads', filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
            except Exception as e:
                print(f'Failed to delete {file_path}. Reason: {e}')
                
    def test_unauthorized_request(self):
        response = self.client.post('/upload')
        self.assertEqual(response.status_code, 401)
        self.assertIn('Richiesta non autorizzata', response.json['error'])

    @mock.patch('src.main.upload.upload_knowledge')
    def test_upload_pdf(self, mock_upload_knowledge):
        mock_pdf = BytesIO(b'%PDF-1.4 sample pdf content')
        mock_pdf.name = 'sample.pdf'

        response = self.client.post('/upload', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data={'pdf_file': mock_pdf})

        mock_upload_knowledge.assert_called_once_with('uploads/sample.pdf')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Caricamento eseguito correttamente!', response.json['response'])

    def test_upload_pdf_no_file(self):
        response = self.client.post('/upload', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data={})
        self.assertEqual(response.status_code, 400)
        self.assertIn('File PDF mancante!', response.json['error'])
        
    def test_upload_pdf_no_filename(self):
        mock_pdf = BytesIO(b'%PDF-1.4 sample pdf content')
        mock_pdf.name = ''

        response = self.client.post('/upload', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data={'pdf_file': mock_pdf})

        self.assertEqual(response.status_code, 400)
        self.assertIn('Nome file PDF mancante', response.json['error'])
        
    def test_upload_pdf_wrong_file_extension(self):
        mock_pdf = BytesIO(b'%PDF-1.4 sample pdf content')
        mock_pdf.name = 'sample.txt'

        response = self.client.post('/upload', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data={'pdf_file': mock_pdf})

        self.assertEqual(response.status_code, 400)
        self.assertIn('Formato file non supportato. Si prega di caricare un file PDF', response.json['error'])

    @mock.patch('src.main.answer.answer_question')
    def test_answer_user_question(self, mock_answer_question):
        mock_answer_question.return_value = 'Mocked response'
        
        response = self.client.post('/answer', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'question': 'Sample question',
                                        'user_data': 'Sample user data'
                                    }),
                                    content_type='application/json')
        mock_answer_question.assert_called_once_with('Sample question', 'Sample user data')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['response'], 'Mocked response')
        
    def test_answer_user_question_no_json(self):
        response = self.client.post('/answer', 
                                    headers={'Authorization': f"Bearer {API_KEY}"})
        self.assertEqual(response.status_code, 400)
        self.assertIn('Formato della richiesta non valido', response.json['error'])
        
    def test_answer_user_question_no_question(self):
        response = self.client.post('/answer', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'user_data': 'Sample user data'
                                    }),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Nella richiesta non è presente il campo "question" relativo alla domanda', response.json['error'])
        
    def test_answer_user_question_no_user_data(self):
        response = self.client.post('/answer', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'question': 'Sample question'
                                    }),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Nella richiesta non è presente il campo "user_data" relativo ai dati dell\'utente', response.json['error'])

    @mock.patch('src.main.answer.generate_workout_json')
    def test_generate_workout(self, mock_generate_workout_json):
        mock_generate_workout_json.return_value = (True, {'mocked json response': 'sample'})
        
        response = self.client.post('/generateWorkout', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'workout_data': 'Sample workout data',
                                        'user_data': 'Sample user data',
                                        'available_exercises': 'Sample available exercises'
                                    }),
                                    content_type='application/json')
        mock_generate_workout_json.assert_called_once_with('Sample workout data', 'Sample user data', 'Sample available exercises')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'mocked json response': 'sample'})
        
    @mock.patch('src.main.answer.generate_workout_json')
    def test_generate_workout_failed(self, mock_generate_workout_json):
        mock_generate_workout_json.return_value = (False, 'Mocked error')
        
        response = self.client.post('/generateWorkout', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'workout_data': 'Sample workout data',
                                        'user_data': 'Sample user data',
                                        'available_exercises': 'Sample available exercises'
                                    }),
                                    content_type='application/json')
        mock_generate_workout_json.assert_called_once_with('Sample workout data', 'Sample user data', 'Sample available exercises')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json['error'], 'Mocked error')
        
    def test_generate_workout_no_json(self):
        response = self.client.post('/generateWorkout', 
                                    headers={'Authorization': f"Bearer {API_KEY}"})
        self.assertEqual(response.status_code, 400)
        self.assertIn('Formato della richiesta non valido', response.json['error'])
        
    def test_generate_workout_no_workout_data(self):
        response = self.client.post('/generateWorkout', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'user_data': 'Sample user data',
                                        'available_exercises': 'Sample available exercises'
                                    }),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Nella richiesta non è presente il campo "workout_data" relativo ai dati base dell\'allenamento', response.json['error'])
        
    def test_generate_workout_no_user_data(self):
        response = self.client.post('/generateWorkout', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'workout_data': 'Sample workout data',
                                        'available_exercises': 'Sample available exercises'
                                    }),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Nella richiesta non è presente il campo "user_data" relativo ai dati dell\'utente', response.json['error'])
        
    def test_generate_workout_no_available_exercises(self):
        response = self.client.post('/generateWorkout', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'workout_data': 'Sample workout data',
                                        'user_data': 'Sample user data'
                                    }),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Nella richiesta non è presente il campo "available_exercises" relativo agli esericizi tra cui scegliere per la creazione dell\'allenamento', response.json['error'])
        
    @mock.patch('src.main.answer.generate_diet_json')
    def test_generate_diet(self, mock_generate_diet_json):
        mock_generate_diet_json.return_value = (True, {'mocked json response': 'sample'})
        
        response = self.client.post('/generateDiet', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'diet_data': 'Sample diet data',
                                        'user_data': 'Sample user data'
                                    }),
                                    content_type='application/json')
        mock_generate_diet_json.assert_called_once_with('Sample diet data', 'Sample user data')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'mocked json response': 'sample'})
        
    @mock.patch('src.main.answer.generate_diet_json')
    def test_generate_diet_failed(self, mock_generate_diet_json):
        mock_generate_diet_json.return_value = (False, 'Mocked error')
        
        response = self.client.post('/generateDiet', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'diet_data': 'Sample diet data',
                                        'user_data': 'Sample user data'
                                    }),
                                    content_type='application/json')
        mock_generate_diet_json.assert_called_once_with('Sample diet data', 'Sample user data')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json['error'], 'Mocked error')
        
    def test_generate_diet_no_json(self):
        response = self.client.post('/generateDiet', 
                                    headers={'Authorization': f"Bearer {API_KEY}"})
        self.assertEqual(response.status_code, 400)
        self.assertIn('Formato della richiesta non valido', response.json['error'])
        
    def test_generate_diet_no_diet_data(self):
        response = self.client.post('/generateDiet', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'user_data': 'Sample user data'
                                    }),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Nella richiesta non è presente il campo "diet_data" relativo ai dati base del piano alimentare', response.json['error'])
        
    def test_generate_diet_no_user_data(self):
        response = self.client.post('/generateDiet', 
                                    headers={'Authorization': f"Bearer {API_KEY}"},
                                    data=json.dumps({
                                        'diet_data': 'Sample diet data'
                                    }),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Nella richiesta non è presente il campo "user_data" relativo ai dati dell\'utente', response.json['error'])

if __name__ == '__main__':
    unittest.main()
