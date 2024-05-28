[![Java CI with Maven](https://github.com/SmartFitStudio/FitnessWebAppWithRAG/actions/workflows/maven.yml/badge.svg)](https://github.com/SmartFitStudio/FitnessWebAppWithRAG/actions/workflows/maven.yml)
[![codecov](https://codecov.io/gh/SmartFitStudio/FitnessWebAppWithRAG/graph/badge.svg?token=86DN46081Y)](https://codecov.io/gh/SmartFitStudio/FitnessWebAppWithRAG)
# Backend Static analysis
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SmartFitStudio_FitnessWebAppWithRAG&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=SmartFitStudio_FitnessWebAppWithRAG)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=SmartFitStudio_FitnessWebAppWithRAG&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=SmartFitStudio_FitnessWebAppWithRAG)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=SmartFitStudio_FitnessWebAppWithRAG&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=SmartFitStudio_FitnessWebAppWithRAG)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=SmartFitStudio_FitnessWebAppWithRAG&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=SmartFitStudio_FitnessWebAppWithRAG)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=SmartFitStudio_FitnessWebAppWithRAG&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=SmartFitStudio_FitnessWebAppWithRAG)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=SmartFitStudio_FitnessWebAppWithRAG&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=SmartFitStudio_FitnessWebAppWithRAG)
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
