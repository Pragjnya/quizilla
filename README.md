# QUIZILLA ⚡

## Overview

QUIZILLA is a dynamic and generic quiz application where users can browse and attempt any available quiz.

The application is designed so that quizzes are not hardcoded into the frontend. New quizzes can be added dynamically through REST APIs using an API client, and they automatically become available for users to attempt.

## Features

### User Features
- View all available quizzes
- Select and start any quiz
- Answer questions
- Navigate through quiz questions
- Submit answers
- View quiz results and score

### Admin / Backend Features
- Add new quizzes through REST APIs
- Add questions dynamically
- Retrieve all quizzes
- Retrieve a specific quiz
- Evaluate submitted answers

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Java
- Spring Boot
- Maven

### Database
- To be decided during backend setup

### API Testing
- EchoAPI for VS Code

### Deployment
- Jenkins

## Project Structure

QUIZILLA/
├── frontend/
├── backend/
└── README.md

## Core Concept

The application follows a dynamic quiz architecture:

Admin/API Client
        ↓
REST API
        ↓
Spring Boot Backend
        ↓
Database
        ↓
Frontend
        ↓
User takes quiz

## Future Deployment

The application will first be developed and tested locally.

After the project is fully functional, Jenkins will be used to automate the build and deployment process.