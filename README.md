# Movie Explorer 
Homework 18 - Movie explorer web app with NestJS REST API, authentication and authorization

## Project Structure
```
├── movie-api/        - NestJS REST API
└── movie-explorer/   - React frontend
```

## Tech Stack

**Frontend**
- React 18 (Vite)
- React Router v6
- CSS Modules

**Backend**
- NestJS
- Prisma
- PostgreSQL (Docker)
- JWT Authentication (bcrypt + @nestjs/jwt)
- Swagger

## Getting Started

### Prerequisites
- Node.js
- Docker Desktop

### 1. Start the database
```bash
cd movie-api
docker compose up -d
```

### 2. Setup the backend
```bash
cd movie-api
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

### 3. Start the frontend
```bash
cd movie-explorer
npm install
npm run dev
```

### URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Swagger docs: http://localhost:3000/api

## API Endpoints

### Auth
- `POST /user/register` — register a new user (returns JWT token)
- `POST /user/login` — login (returns JWT token)

### Movies
- `GET /movies` — get all movies (public)
- `GET /movies/:id` — get single movie (public)
- `POST /movies` — create movie (admin only)
- `PATCH /movies/:id` — update movie (admin only)
- `DELETE /movies/:id` — delete movie (admin only)

### Genres
- `GET /genres` — get all genres
- `POST /genres` — create genre

### Favorites
- `GET /favorites` — get current user's favorites (requires auth)
- `POST /favorites` — add to favorites (requires auth)
- `DELETE /favorites/:id` — remove from favorites (requires auth)

## Authentication

JWT-based authentication. The token is stored in `localStorage` and sent as a `Bearer` token in the `Authorization` header on all protected requests.

Users have two roles:
- **Regular user** — can register, login, and manage their own favorites
- **Admin** — can additionally create, edit and delete movies (set `isAdmin: true` in the database via Prisma Studio)

## Features
- Register and login 
- JWT token stored on the client and sent with all protected requests
- Search by title 
- Filter by genre and sort by title, year or rating
- Add and remove favorites stored in the backend (per user)
- Manage movies page — add, edit and delete movie (admin only)
