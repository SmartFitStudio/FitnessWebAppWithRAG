import common
import classes

from langchain.prompts import ChatPromptTemplate
from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import JsonOutputParser

def get_loaded_DB():
    return Chroma(client=common.chroma_client, embedding_function=common.embeddings_model)

def create_context(query):
    # retrieve context - top 5 most relevant (closests) chunks to the query vector 
    # (by default Langchain is using cosine distance metric)
    docs_chroma = get_loaded_DB().similarity_search_with_score(query, k=5)
    # generate an answer based on given user query and retrieved context information
    return "\n\n".join([doc.page_content for doc, _score in docs_chroma]) #context text

def create_prompt_from_template(context_text, query):
    PROMPT_TEMPLATE = """
    Rispondi alla domanda basandoti principalmente sul seguente contesto:
    {context}
    La domanda a cui rispondere basandosi sul contesto è la seguente: 
    {question}
    Fornisci una risposta dettagliata.
    Non giustificare la tua risposta.
    Non fornire informazioni che non sono menzionate nel contesto.
    Rispondi in italiano.
    Evita frasi che citino il fatto che tu stia usando un contesto.
    La risposta deve contenere solo testo.
    Non inserire note.
    """
    # load retrieved context and user query in the prompt template
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    return prompt_template.format(context=context_text, question=query) #prompt

def generate_answer(prompt):
    return common.chat_model.invoke(prompt).content #response text

def answer_question(query):
    context_text = create_context(query)
    prompt = create_prompt_from_template(context_text, query)
    return generate_answer(prompt)

def generate_json():
    PROMPT_TEMPLATE = """
    Crea e popola con dei dati veri una stringa JSON che segua la seguente struttura:
    {format_instructions}
    """
    parser = JsonOutputParser(pydantic_object=classes.Allenamento)
    prompt = ChatPromptTemplate.from_template(PROMPT_TEMPLATE).format(
        format_instructions=parser.get_format_instructions()
    )
    return parser.parse(common.chat_model.invoke(prompt).content) #va gestita l'eccezione