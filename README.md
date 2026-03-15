# Movie Explorer 

Homework 17 - Movie explorer web app with NestJS REST API

## Project Structure
```
├── movie-api/        - NestJS REST API
└── movie-explorer/   - React frontend
```

## Tech Stack

**Frontend**
- React 18 (Vite)
- React Ruoter v6
- TanStack React Query
- CSS Modules

**Backend**
- NestJS
- Prisma 
- PostgreSQL (Docker)
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

### Movies
- `GET /movies` — get all movies 
- `GET /movies/:id` — get single movie
- `POST /movies` — create movie
- `PATCH /movies/:id` — update movie
- `DELETE /movies/:id` — delete movie

### Genres
- `GET /genres` — get all genres
- `POST /genres` — create genre

### Favorites
- `GET /favorites` — get all favorites
- `POST /favorites` — add to favorites
- `DELETE /favorites/:id` — remove from favorites

## Features

- Search by title with debounced input
- Filter by genre and sort by title, year or rating
- Add and remove favorites stored in the backend
- Loading, error and empty states 
