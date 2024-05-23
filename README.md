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

Lo scopo principale dello stage è fornire allo studente l’opportunità di acquisire competenze pratiche
nell’implementazione di funzionalità complesse utilizzando Angular per il frontend e Spring per il
backend attraverso l’immersione in un progetto pratico di sviluppo di una web application, focalizzata
sulla creazione di un fitness assistant.

Durante lo stage, lo studente avrà l’opportunità di studiare in dettaglio i concetti fondamentali di An-
gular e Spring, nonché le loro interazioni nell’ambito dello sviluppo di un’applicazione web moderna.

Ciò include la progettazione e l’implementazione di componenti UI dinamici, la gestione delle richie-
ste HTTP, la creazione di API RESTful, l’implementazione di autenticazione e autorizzazione, e altro

ancora.

Al termine dello stage, ci si aspetta che lo studente sia in grado di dimostrare una comprensione ap-
profondita delle tecnologie Angular e Spring, nonché la capacità di applicare queste conoscenze nella

creazione di applicazioni web moderne e funzionali.
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
- Opzionale -> Diete

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
