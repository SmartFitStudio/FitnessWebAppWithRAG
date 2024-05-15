import chromadb
from langchain_google_vertexai import VertexAIEmbeddings, ChatVertexAI
#from langchain_community.embeddings import OllamaEmbeddings
#from langchain_community.chat_models import ChatOllama

embeddings_model = VertexAIEmbeddings(model_name="textembedding-gecko@003")
#embeddings_model = OllamaEmbeddings(model="all-minilm:l6-v2")
chat_model = ChatVertexAI(model_name="gemini-pro")
#chat_model = ChatOllama(model="phi3")
chroma_client = chromadb.HttpClient(host='chromadb', port=8000)