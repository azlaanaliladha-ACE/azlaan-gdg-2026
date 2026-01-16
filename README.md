<div align="center">

# GDG-VIT 2026 Full-Stack Platform

[![API](https://img.shields.io/badge/API-Express.js-brightgreen)](http://localhost:5000) 
[![Auth](https://img.shields.io/badge/Auth-JWT-blue)](https://github.com/azlaanaliladha-ACE/azlaan-gdg-2026) 
[![DB](https://img.shields.io/badge/DB-SQLite-orange)](https://github.com/azlaanaliladha-ACE/azlaan-gdg-2026)

**Live Demo:** http://localhost:5000  
**Repository:** https://github.com/azlaanaliladha-ACE/azlaan-gdg-2026

</div>

## API Endpoints Documentation

| Method | Endpoint | Description | Request Body/Example | Response |
|--------|----------|-------------|---------------------|----------|
| GET | `/api/users` | Get all registered users | None | `[]` or `[{id:1,name:"Azlaan",email:"test@gdg.com"}]` |
| POST | `/api/auth/register` | Register new user | `{"name":"test","email":"test@gdg.com","password":"123456"}` | `201 Created` |
| POST | `/api/auth/login` | Login and get JWT token | `{"email":"test@gdg.com","password":"123456"}` | `{"token":"eyJhbGciOiJIUzI1NiIs..."}` |

## Tech Stack
Backend: Express.js + JWT Authentication + SQLite3 (Port 5000)
Frontend: React/Vue components (app/, cybersecurity/, game/ tracks)
Database: SQLite3
Deployment: Render.com ready


## Project Structure
├── server.js # Express API Server (JWT + SQLite)
├── app/ # Web Application Track
├── cybersecurity/ # Cybersecurity Tools Track
├── game/ # Gaming Platform Track
└── backend/ # Additional Backend Services


## Quick Start & Deployment
```bash
git clone https://github.com/azlaanaliladha-ACE/azlaan-gdg-2026.git
cd azlaan-gdg-2026
npm install
npm start
# API Live: http://localhost:5000/api/users
