from pydantic import BaseModel, Field
from typing import List

###### ALLENAMENTO ######

class Esercizio(BaseModel):
    id: int = Field(description="Id dell'esercizio")
    serie: int = Field(description="Numero di serie")
    ripetizioni: int = Field(description="Numero di ripetizioni")
    recupero: int = Field(description="Tempo di recupero in minuti")
    
class Allenamento(BaseModel):
    esercizi: List[Esercizio] = Field(description="Elenco degli esercizi")
    
###### DIETA ######

class Alimento(BaseModel):
    nome: str = Field(description="Nome dell'alimento")
    quantita: int = Field(description="Quantità in grammi dell'alimento")
    calorie: int = Field(description="Calorie dell'alimento")

class Pasto(BaseModel):
    alimenti: List[Alimento] = Field(description="Elenco degli alimenti")
    
class DietaGiornaliera(BaseModel):
    colazione: Pasto = Field(description="Pasto della colazione")
    pranzo: Pasto = Field(description="Pasto del pranzo")
    cena: Pasto = Field(description="Pasto della cena")
    
class PianoAlimentare(BaseModel):
    lun: DietaGiornaliera = Field(description="Dieta del lunedì")
    mar: DietaGiornaliera = Field(description="Dieta del martedì")
    mer: DietaGiornaliera = Field(description="Dieta del mercoledì")
    gio: DietaGiornaliera = Field(description="Dieta del giovedì")
    ven: DietaGiornaliera = Field(description="Dieta del venerdì")
    sab: DietaGiornaliera = Field(description="Dieta del sabato")
    dom: DietaGiornaliera = Field(description="Dieta della domenica")
    motivazioni: str = Field(description="Motivazioni per la dieta")