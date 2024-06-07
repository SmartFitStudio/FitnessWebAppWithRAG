import unittest
import unittest.mock as mock
import json
from src.answer import *
from src.classes import *

class TestAnswer(unittest.TestCase):
    
    def test_answer_question(self):
        query = "mock query"
        user_data = "mock user_data"
        answer = answer_question(query, user_data)
        self.assertIsInstance(answer, str)
        
    def test_check_for_null_fields_true(self):
        data = '{"key1": "value1", "key2": "value2", "key3": {"key4": "value4", "key5": "value5"}}'
        self.assertTrue(check_for_null_fields(json.loads(data)))     
        
    def test_check_for_null_fields_false1(self):
        data = '{"key1": "value1", "key2": "value2", "key3": {"key4": "value4", "key5": "value5"}, "key6": null}'
        self.assertFalse(check_for_null_fields(json.loads(data)))   
        
    def test_check_for_null_fields_false2(self):
        data = '{"key1": "value1", "key2": "value2", "key3": {"key4": null, "key5": "value5"}, "key6": "value6"}'
        self.assertFalse(check_for_null_fields(json.loads(data))) 
        
    def test_check_for_null_fields_false3(self):
        data = '{"key1": "value1", "key2": "value2", "key3": {"key4": "value4", "key5": "value5"}, "key6": "value6", "key7": [null,"value7"]}'
        self.assertFalse(check_for_null_fields(json.loads(data)))
        
    def test_check_for_null_fields_false4(self):
        data = None
        self.assertFalse(check_for_null_fields(data))
    
    @mock.patch('src.answer.generate_answer', return_value="""
                {
                "lun": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Pane Integrale",
                        "quantita": 50,
                        "calorie": 120
                        },
                        {
                        "nome": "Latte",
                        "quantita": 200,
                        "calorie": 100
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Riso",
                        "quantita": 100,
                        "calorie": 130
                        },
                        {
                        "nome": "Pollo",
                        "quantita": 150,
                        "calorie": 200
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Insalata",
                        "quantita": 150,
                        "calorie": 30
                        },
                        {
                        "nome": "Pesce",
                        "quantita": 200,
                        "calorie": 250
                        }
                    ]
                    }
                },
                "mar": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Yogurt",
                        "quantita": 150,
                        "calorie": 100
                        },
                        {
                        "nome": "Muesli",
                        "quantita": 50,
                        "calorie": 200
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Pasta",
                        "quantita": 100,
                        "calorie": 350
                        },
                        {
                        "nome": "Pomodoro",
                        "quantita": 50,
                        "calorie": 20
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Zuppa",
                        "quantita": 300,
                        "calorie": 150
                        },
                        {
                        "nome": "Pane Integrale",
                        "quantita": 50,
                        "calorie": 120
                        }
                    ]
                    }
                },
                "mer": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Frutta",
                        "quantita": 200,
                        "calorie": 100
                        },
                        {
                        "nome": "Latte di Soia",
                        "quantita": 200,
                        "calorie": 80
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Quinoa",
                        "quantita": 100,
                        "calorie": 120
                        },
                        {
                        "nome": "Tofu",
                        "quantita": 150,
                        "calorie": 150
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Verdure Grigliate",
                        "quantita": 200,
                        "calorie": 50
                        },
                        {
                        "nome": "Riso",
                        "quantita": 100,
                        "calorie": 130
                        }
                    ]
                    }
                },
                "gio": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Cereali",
                        "quantita": 50,
                        "calorie": 200
                        },
                        {
                        "nome": "Latte",
                        "quantita": 200,
                        "calorie": 100
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Pane Integrale",
                        "quantita": 50,
                        "calorie": 120
                        },
                        {
                        "nome": "Prosciutto",
                        "quantita": 50,
                        "calorie": 80
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Frittata",
                        "quantita": 150,
                        "calorie": 200
                        },
                        {
                        "nome": "Spinaci",
                        "quantita": 100,
                        "calorie": 50
                        }
                    ]
                    }
                },
                "ven": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Toast",
                        "quantita": 50,
                        "calorie": 150
                        },
                        {
                        "nome": "Succo d'Arancia",
                        "quantita": 200,
                        "calorie": 80
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Pasta",
                        "quantita": 100,
                        "calorie": 350
                        },
                        {
                        "nome": "Ragù di Carne",
                        "quantita": 100,
                        "calorie": 200
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Insalata",
                        "quantita": 150,
                        "calorie": 30
                        },
                        {
                        "nome": "Pesce",
                        "quantita": 200,
                        "calorie": 250
                        }
                    ]
                    }
                },
                "sab": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Biscotti",
                        "quantita": 50,
                        "calorie": 250
                        },
                        {
                        "nome": "Latte",
                        "quantita": 200,
                        "calorie": 100
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Riso",
                        "quantita": 100,
                        "calorie": 130
                        },
                        {
                        "nome": "Pollo",
                        "quantita": 150,
                        "calorie": 200
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Minestrone",
                        "quantita": 300,
                        "calorie": 150
                        },
                        {
                        "nome": "Pane Integrale",
                        "quantita": 50,
                        "calorie": 120
                        }
                    ]
                    }
                },
                "dom": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Caffè",
                        "quantita": 1,
                        "calorie": 5
                        },
                        {
                        "nome": "Croissant",
                        "quantita": 50,
                        "calorie": 250
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Lasagna",
                        "quantita": 150,
                        "calorie": 400
                        },
                        {
                        "nome": "Insalata",
                        "quantita": 100,
                        "calorie": 20
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Pizza",
                        "quantita": 200,
                        "calorie": 600
                        },
                        {
                        "nome": "Gelato",
                        "quantita": 100,
                        "calorie": 200
                        }
                    ]
                    }
                },
                "motivazioni": "La dieta è stata creata per fornire un equilibrio nutrizionale adeguato, tenendo conto delle esigenze energetiche e delle preferenze alimentari individuali."
                }
    """)
    def test_generate_diet_json_succesful(self, mock_generate_answer):
        diet_data = "mock diet_data"
        user_data = "mock user_data"
        is_successful, response = generate_diet_json(diet_data, user_data)
        mock_generate_answer.assert_called()
        self.assertTrue(is_successful)
        self.assertIsInstance(response, dict)
        parser = JsonOutputParser(pydantic_object=classes.PianoAlimentare)
        self.assertTrue(parser.validate(response))
        
    @mock.patch('src.answer.generate_answer', return_value='invalid answer')
    def test_generate_diet_json_failed(self, mock_generate_answer):
        diet_data = "mock diet_data"
        user_data = "mock user_data"
        is_successful, response = generate_diet_json(diet_data, user_data)
        mock_generate_answer.assert_called()
        self.assertFalse(is_successful)
        self.assertEqual(response, "Non è stato possibile generare il piano alimentare richiesto.\n Si prega di riprovare più tardi.")
        
    @mock.patch('src.answer.generate_answer', return_value="""
                {
                "lun": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Pane Integrale",
                        "quantita": 50,
                        "calorie": 120
                        },
                        {
                        "nome": "Latte",
                        "quantita": 200,
                        "calorie": 100
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Riso",
                        "quantita": 100,
                        "calorie": 130
                        },
                        {
                        "nome": "Pollo",
                        "quantita": 150,
                        "calorie": 200
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Insalata",
                        "quantita": 150,
                        "calorie": 30
                        },
                        {
                        "nome": "Pesce",
                        "quantita": 200,
                        "calorie": 250
                        }
                    ]
                    }
                },
                "mar": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Yogurt",
                        "quantita": 150,
                        "calorie": 100
                        },
                        {
                        "nome": "Muesli",
                        "quantita": 50,
                        "calorie": 200
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Pasta",
                        "quantita": 100,
                        "calorie": 350
                        },
                        {
                        "nome": "Pomodoro",
                        "quantita": 50,
                        "calorie": 20
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Zuppa",
                        "quantita": 300,
                        "calorie": 150
                        },
                        {
                        "nome": "Pane Integrale",
                        "quantita": 50,
                        "calorie": 120
                        }
                    ]
                    }
                },
                "mer": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Frutta",
                        "quantita": 200,
                        "calorie": 100
                        },
                        {
                        "nome": "Latte di Soia",
                        "quantita": 200,
                        "calorie": 80
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Quinoa",
                        "quantita": 100,
                        "calorie": 120
                        },
                        {
                        "nome": "Tofu",
                        "quantita": 150,
                        "calorie": 150
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Verdure Grigliate",
                        "quantita": 200,
                        "calorie": 50
                        },
                        {
                        "nome": "Riso",
                        "quantita": 100,
                        "calorie": 130
                        }
                    ]
                    }
                },
                "gio": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Cereali",
                        "quantita": 50,
                        "calorie": 200
                        },
                        {
                        "nome": "Latte",
                        "quantita": 200,
                        "calorie": 100
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Pane Integrale",
                        "quantita": 50,
                        "calorie": 120
                        },
                        {
                        "nome": "Prosciutto",
                        "quantita": 50,
                        "calorie": 80
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Frittata",
                        "quantita": 150,
                        "calorie": 200
                        },
                        {
                        "nome": "Spinaci",
                        "quantita": 100,
                        "calorie": 50
                        }
                    ]
                    }
                },
                "ven": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Toast",
                        "quantita": 50,
                        "calorie": 150
                        },
                        {
                        "nome": "Succo d'Arancia",
                        "quantita": 200,
                        "calorie": 80
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Pasta",
                        "quantita": 100,
                        "calorie": 350
                        },
                        {
                        "nome": "Ragù di Carne",
                        "quantita": 100,
                        "calorie": 200
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Insalata",
                        "quantita": 150,
                        "calorie": 30
                        },
                        {
                        "nome": "Pesce",
                        "quantita": 200,
                        "calorie": 250
                        }
                    ]
                    }
                },
                "sab": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Biscotti",
                        "quantita": 50,
                        "calorie": 250
                        },
                        {
                        "nome": "Latte",
                        "quantita": 200,
                        "calorie": 100
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Riso",
                        "quantita": 100,
                        "calorie": 130
                        },
                        {
                        "nome": "Pollo",
                        "quantita": 150,
                        "calorie": 200
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Minestrone",
                        "quantita": 300,
                        "calorie": 150
                        },
                        {
                        "nome": "Pane Integrale",
                        "quantita": 50,
                        "calorie": 120
                        }
                    ]
                    }
                },
                "dom": {
                    "colazione": {
                    "alimenti": [
                        {
                        "nome": "Caffè",
                        "quantita": 1,
                        "calorie": 5
                        },
                        {
                        "nome": "Croissant",
                        "quantita": 50,
                        "calorie": 250
                        }
                    ]
                    },
                    "pranzo": {
                    "alimenti": [
                        {
                        "nome": "Lasagna",
                        "quantita": 150,
                        "calorie": 400
                        },
                        {
                        "nome": "Insalata",
                        "quantita": 100,
                        "calorie": 20
                        }
                    ]
                    },
                    "cena": {
                    "alimenti": [
                        {
                        "nome": "Pizza",
                        "quantita": 200,
                        "calorie": 600
                        },
                        {
                        "nome": "Gelato",
                        "quantita": 100,
                        "calorie": 200
                        }
                    ]
                    }
                },
                "motivazioni": null
                }
    """)
    def test_generate_diet_json_failed2(self, mock_generate_answer):
        diet_data = "mock diet_data"
        user_data = "mock user_data"
        is_successful, response = generate_diet_json(diet_data, user_data)
        mock_generate_answer.assert_called()
        self.assertFalse(is_successful)
        self.assertEqual(response, "Non è stato possibile generare il piano alimentare richiesto.\n Si prega di riprovare più tardi.")

    @mock.patch('src.answer.generate_answer', return_value="""
                {
                "esercizi": [
                    {
                    "id": 1,
                    "serie": 3,
                    "ripetizioni": 12,
                    "recupero": 2
                    },
                    {
                    "id": 2,
                    "serie": 4,
                    "ripetizioni": 10,
                    "recupero": 3
                    }
                ]
                }
    """)
    def test_generate_workout_json_successful(self, mock_generate_answer):        
        workout_data = "mock workout_data"
        user_data = "mock user_data"
        available_exercises = "mock available_exercises"
        is_successful, response = generate_workout_json(workout_data, user_data, available_exercises)
        mock_generate_answer.assert_called()
        self.assertTrue(is_successful)
        self.assertIsInstance(response, dict)
        parser = JsonOutputParser(pydantic_object=classes.Allenamento)
        self.assertTrue(parser.validate(response))
        
    @mock.patch('src.answer.generate_answer', return_value='invalid answer')
    def test_generate_workout_json_failed(self, mock_generate_answer):
        workout_data = "mock workout_data"
        user_data = "mock user_data"
        available_exercises = "mock available_exercises"
        is_successful, response = generate_workout_json(workout_data, user_data, available_exercises)
        mock_generate_answer.assert_called()
        self.assertFalse(is_successful)
        self.assertEqual(response, "Non è stato possibile generare l'allenamento richiesto.\n Si prega di riprovare più tardi.")
        
    @mock.patch('src.answer.generate_answer', return_value="""
                {
                "esercizi": [
                    {
                    "id": 1,
                    "serie": 3,
                    "ripetizioni": 12,
                    "recupero": null
                    },
                    {
                    "id": 2,
                    "serie": 4,
                    "ripetizioni": 10,
                    "recupero": 3
                    }
                ]
                }
    """)
    def test_generate_workout_json_failed2(self, mock_generate_answer):
        workout_data = "mock workout_data"
        user_data = "mock user_data"
        available_exercises = "mock available_exercises"
        is_successful, response = generate_workout_json(workout_data, user_data, available_exercises)
        mock_generate_answer.assert_called()
        self.assertFalse(is_successful)
        self.assertEqual(response, "Non è stato possibile generare l'allenamento richiesto.\n Si prega di riprovare più tardi.")