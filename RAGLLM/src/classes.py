from pydantic import BaseModel, Field
from typing import List

class Esercizio(BaseModel):
    id: int = Field(description="Id dell'esercizio")
    serie: int = Field(description="Numero di serie")
    ripetizioni: int = Field(description="Numero di ripetizioni")
    recupero: int = Field(description="Tempo di recupero in minuti")
    
class Allenamento(BaseModel):
    esercizi: List[Esercizio] = Field(description="Elenco degli esercizi")