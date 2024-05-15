from pydantic import BaseModel, Field
from typing import List

class Esercizio(BaseModel):
    nome: str = Field(description="Nome dell'esercizio")
    serie: str = Field(description="Numero di serie")
    ripetizioni: str = Field(description="Numero di ripetizioni")
    recupero: str = Field(description="Tempo di recupero tra le serie")

class Allenamento(BaseModel):
    nome: str = Field(description="Nome dell'allenamento")
    descrizione: str = Field(description="Descrizione dell'allenamento")
    esercizi: List[Esercizio] = Field(description="Elenco degli esercizi")