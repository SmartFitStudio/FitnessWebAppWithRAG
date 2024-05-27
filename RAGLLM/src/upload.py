import common

from langchain_community.document_loaders import PyPDFLoader
from langchain_experimental.text_splitter import SemanticChunker
from langchain_community.vectorstores import Chroma

def load_PDF(doc_path):
    loader = PyPDFLoader(doc_path)
    return loader.load() #pages

def make_chuncks(pages):
    text_splitter = SemanticChunker(common.embeddings_model)
    return text_splitter.split_documents(pages) #chunks

def embed_and_load_chunks_into_DB(chunks):
    return Chroma.from_documents(documents=chunks, embedding=common.embeddings_model, client=common.chroma_client) #instance of the Chroma class

def upload_knowledge(doc_path):
    pages = load_PDF(doc_path)
    chunks = make_chuncks(pages)
    return embed_and_load_chunks_into_DB(chunks)