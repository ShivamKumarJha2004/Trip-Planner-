# Trip-Planner-

### Frontend Setup

1. Navigate to the frontend directory:
   ```bas
   cd "Next.js (TypeScript) app"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the frontend directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```
   Note: Make sure this matches the port your backend is running on.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on port 3000 by default.

   ### Backend Setup

   1. Navigate to the Backend directory:
   ```bas
   cd ""Fastify (TypeScript) app""
   ```
  2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/trip_planner
   PORT=3001
   ```
   Note: Replace the MongoDB connection string with your own.
   ## Project Structure

- `src/index.ts` - Entry point
- `src/app.ts` - Fastify application setup
- `src/routes/` - API route definitions
- `src/models/` - Data models and database operations
- `src/utils/` - Utility functions
- ## API Endpoints

- `GET /api/trips` - Get all trips
- `GET /api/trips/:id` - Get a specific trip
- `POST /api/trips` - Create a new trip
- `PUT /api/trips/:id` - Update a trip
- `DELETE /api/trips/:id` - Delete a trip


## Dependencies

- Fastify - Web framework
- @fastify/mongodb - MongoDB plugin for Fastify
- @fastify/cors - CORS support
- fastify-type-provider-zod - Zod integration for request/response validation
- dotenv - Environment variable management
- zod - Schema validation


# Trip Planner Full-Stack Application

A full-stack application for managing trip plans built with Next.js, Fastify, and MongoDB.

## Features

- Create new trip plans
- View all trips on a dashboard
- Edit existing trip plans
- Responsive design with Tailwind CSS
- Form validation with Zod
- Type safety with TypeScript

## Tech Stack

- Frontend: Next.js (App Router) with TypeScript
- Backend: Fastify with TypeScript
- Database: MongoDB
- Styling: Tailwind CSS and Shadcn UI
- Form Management: React Hook Form
- Validation: Zod
- HTTP Client: Axios
- Animation: Framer Motion

## Project Structure

The project is organized into two main directories:

- `Fastify (TypeScript) app/` - Backend API server
- `Next.js (TypeScript) app/` - Frontend application


