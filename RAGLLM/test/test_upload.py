import unittest
import unittest.mock as mock
import os
from io import BytesIO
from src.upload import *

class TestUpload(unittest.TestCase):
    
    @mock.patch('src.upload.PyPDFLoader')
    def test_load_PDF(self, mock_loader):
        mock_loader_instance = mock_loader.return_value
        mock_loader_instance.load.return_value = ["page1", "page2"]
        doc_path = 'test.pdf'
        pages = load_PDF(doc_path)
        mock_loader.assert_called_with(doc_path)
        mock_loader.return_value.load.assert_called()
        self.assertEqual(pages, ["page1", "page2"])
        
    @mock.patch('src.upload.SemanticChunker')
    def test_make_chuncks(self, mock_chunker):
        mock_chunker_instance = mock_chunker.return_value
        mock_chunker_instance.split_documents.return_value = ["chunk1", "chunk2"]
        pages = ["page1", "page2"]
        chunks = make_chuncks(pages)
        mock_chunker.assert_called_with(common.embeddings_model)
        mock_chunker.return_value.split_documents.assert_called_with(pages)
        self.assertEqual(chunks, ["chunk1", "chunk2"])
        
    @mock.patch('src.upload.Chroma')
    def test_embed_and_load_chunks_into_DB(self, mock_chroma):
        mock_chroma_instance = mock_chroma.from_documents.return_value
        chunks = ["chunk1", "chunk2"]
        chroma_instance = embed_and_load_chunks_into_DB(chunks)
        mock_chroma.from_documents.assert_called_with(documents=chunks, embedding=common.embeddings_model, client=common.chroma_client)
        self.assertEqual(chroma_instance, mock_chroma_instance)
        
    @mock.patch('src.upload.load_PDF')
    @mock.patch('src.upload.make_chuncks')
    @mock.patch('src.upload.embed_and_load_chunks_into_DB')
    def test_upload_knowledge(self, mock_embed, mock_chunks, mock_load):
        doc_path = 'test.pdf'
        mock_load.return_value = ["page1", "page2"]
        mock_chunks.return_value = ["chunk1", "chunk2"]
        mock_embed.return_value = "chroma_instance"
        chroma_instance = upload_knowledge(doc_path)
        mock_load.assert_called_with(doc_path)
        mock_chunks.assert_called_with(["page1", "page2"])
        mock_embed.assert_called_with(["chunk1", "chunk2"])
        self.assertEqual(chroma_instance, "chroma_instance")