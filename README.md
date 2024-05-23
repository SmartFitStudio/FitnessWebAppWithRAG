[![Java CI with Maven](https://github.com/SmartFitStudio/FitnessWebAppWithRAG/actions/workflows/maven.yml/badge.svg)](https://github.com/SmartFitStudio/FitnessWebAppWithRAG/actions/workflows/maven.yml)
[![codecov](https://codecov.io/gh/SmartFitStudio/FitnessWebAppWithRAG/graph/badge.svg?token=86DN46081Y)](https://codecov.io/gh/SmartFitStudio/FitnessWebAppWithRAG)
# FitnessWebAppRAG
Una fitness web app sviluppata con Spring ed Angular ed integrata con una piattaforma RAG

## Table of Contents

- [Overview](#Overview)
- [Features](#features)
- [Tecnologie utilizzate](#Tecnologie-utilizzate)
    - [Backend ](#backend)
    - [Frontend ](#frontend)



## Overview

L’applicazione da sviluppare, oltre alle funzionalità base di una fitness App come permettere agli utenti
di creare un proprio profilo, pianificare e gestire le proprie schede di allenamento settimanali, tracciare
i propri progressi e ricevere promemoria di allenamento, potrebbe includere la possibilità di ricevere
supporto dalla community e consigli personalizzati tramite l’integrazione di una chat-bot sviluppata
da un progetto di stage parallelo.

## Features

- User Registration
- Email Validation 
- User Authentication 
- Gestione Esercizi 
- Gestione Allenamenti
- Gestione Periodi
- Chat bot RAG LLM
- Store degli esercizi con funzionalità di filtering
- Creazione degli allenamenti tramite modello RAG based
- Notifiche in app
- Calendario degli allenamenti
- Grafico dei progressi

#### Diagramma Spring security 
![Security diagram](ReadmeImages/security.png)

## Tecnologie utilizzate

### Backend

- Spring Boot 3
- Spring Security 6
- JWT Token Authentication
- Spring Data JPA
- JSR-303 and Spring Validation
- OpenAPI and Swagger UI Documentation
- Docker

### Frontend

- Angular
- Component-Based Architecture
- Lazy Loading
- Authentication Guard
- OpenAPI Generator for Angular
- Bootstrap
