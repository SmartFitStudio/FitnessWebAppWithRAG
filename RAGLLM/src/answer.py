import common
import classes

from langchain.prompts import ChatPromptTemplate
from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import JsonOutputParser

MAX_RETRIES = 3

def get_loaded_DB():
    return Chroma(client=common.chroma_client, embedding_function=common.embeddings_model)

def create_context(query):
    # retrieve context - top 10 most relevant (closests) chunks to the query vector 
    # (by default Langchain is using cosine distance metric)
    docs_chroma = get_loaded_DB().similarity_search_with_score(query, k=10)
    # generate an answer based on given user query and retrieved context information
    return "\n\n".join([doc.page_content for doc, _score in docs_chroma]) #context text

def create_prompt_from_template_to_answer(context_text, query, user_data):
    PROMPT_TEMPLATE = """
    I dati dell'utente a cui stai rispondendo sono i seguenti:
    {user_data}
    Rispondi alla sua domanda basandoti principalmente sul seguente contesto:
    {context}
    La domanda a cui devi rispondere basandoti sul contesto è la seguente: 
    {question}
    Fornisci una risposta dettagliata.
    Non giustificare la tua risposta.
    Rispondi in italiano.
    Evita frasi che citino il fatto che tu stia usando un contesto.
    Non inserire note.
    """
    # load retrieved context and user query in the prompt template
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    return prompt_template.format(context=context_text, question=query, user_data=user_data) #prompt

def create_prompt_from_template_to_generate_workout_json(context_text, user_data, workout_data, available_exercises, format_instructions):
    PROMPT_TEMPLATE = """
    I dati dell'utente a cui stai rispondendo sono i seguenti:
    {user_data}
    I dati base dell'allenamento che l'utente ha fornito sono i seguenti:
    {workout_data}
    Gli esercizi tra cui puoi scegliere sono i seguenti:
    {available_exercises}
    Basati sul seguente contesto:
    {context}
    Crea un allenamento che rispetti la seguente struttura:
    {format_instructions}
    """
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    return prompt_template.format(user_data=user_data, workout_data=workout_data, available_exercises=available_exercises, context=context_text, format_instructions=format_instructions) #prompt

def create_prompt_from_template_to_generate_diet_json(context_text, user_data, diet_data, format_instructions):
    PROMPT_TEMPLATE = """
    I dati dell'utente a cui stai rispondendo sono i seguenti:
    {user_data}
    I dati base della dieta che l'utente ha fornito sono i seguenti:
    {diet_data}
    Basati sul seguente contesto:
    {context}
    Crea un piano alimentare che rispetti la seguente struttura:
    {format_instructions}
    """
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    return prompt_template.format(user_data=user_data, diet_data=diet_data, context=context_text, format_instructions=format_instructions) #prompt

def generate_answer(prompt):
    return common.chat_model.invoke(prompt).content #response text

def answer_question(query, user_data):
    context_text = create_context(query)
    prompt = create_prompt_from_template_to_answer(context_text, query, user_data)
    return generate_answer(prompt)

def check_for_null_fields(data):
    print(data)
    if isinstance(data, dict):
        for key, value in data.items():
            if value is None:
                return False
            if isinstance(value, (dict, list)):
                if not check_for_null_fields(value):
                    return False
    elif isinstance(data, list):
        for item in data:
            if item is None or not check_for_null_fields(item):
                return False
    elif data is None:
        return False
    return True

def generate_diet_json(diet_data, user_data):
    context_text = create_context(diet_data)
    parser = JsonOutputParser(pydantic_object=classes.PianoAlimentare)
    prompt = create_prompt_from_template_to_generate_diet_json(context_text, user_data, diet_data, parser.get_format_instructions())
    for attempt in range(MAX_RETRIES):
        try:
            answer = generate_answer(prompt)
            parsed_answer = parser.parse(answer)
            if check_for_null_fields(parsed_answer):
                return True, parsed_answer
            else:
                continue
        except:
            continue
    return False, "Non è stato possibile generare il piano alimentare richiesto.\n Si prega di riprovare più tardi."

def generate_workout_json(workout_data, user_data, available_exercises):
    context_text = create_context(workout_data)
    parser = JsonOutputParser(pydantic_object=classes.Allenamento)
    prompt = create_prompt_from_template_to_generate_workout_json(context_text, user_data, workout_data, available_exercises, parser.get_format_instructions())
    for attempt in range(MAX_RETRIES):
        try:
            answer = generate_answer(prompt)
            parsed_answer = parser.parse(answer)
            if check_for_null_fields(parsed_answer):
                return True, parsed_answer
            else:
                continue
        except:
            continue
    return False, "Non è stato possibile generare l'allenamento richiesto.\n Si prega di riprovare più tardi."