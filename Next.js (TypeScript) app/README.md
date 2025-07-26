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

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd "Fastify (TypeScript) app"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   MONGO_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/trip_planner
   PORT=3001
   ```
   Note: Replace the MongoDB connection string with your own.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start on port 3001 by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
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

## Running Both Applications

For the full application to work, you need to run both the backend and frontend servers:

1. Start the backend server first:
   ```bash
   cd "Fastify (TypeScript) app"
   npm run dev
   ```

2. In a separate terminal, start the frontend server:
   ```bash
   cd "Next.js (TypeScript) app"
   npm run dev
   ```

3. Access the application at `http://localhost:3000`

## Troubleshooting

### Port Already in Use

If you encounter an `EADDRINUSE` error when starting either server, it means the port is already in use. You can:

1. Find and stop the process using that port
2. Change the port in the `.env` file (for backend)
3. For frontend, use: `npm run dev -- -p 3005` to specify a different port

### MongoDB Connection Issues

If you encounter MongoDB connection issues:

1. Verify your MongoDB connection string in the backend `.env` file
2. Ensure your MongoDB instance is running
3. Check if your IP address is whitelisted in MongoDB Atlas (if using cloud)

### API Connection Issues

If the frontend cannot connect to the backend:

1. Ensure the backend server is running
2. Check that the `NEXT_PUBLIC_API_URL` in the frontend `.env` file matches the backend URL
3. Verify that CORS is properly configured in the backend to allow requests from the frontend origin