Trip Planner Backend API
This is the backend API for the Trip Planner application, built with Fastify, TypeScript, and MongoDB.

Features
RESTful API for trip management
MongoDB integration
TypeScript for type safety
Zod for request/response validation
CORS enabled for frontend communication
API Endpoints
GET /api/trips - Get all trips
GET /api/trips/:id - Get a specific trip
POST /api/trips - Create a new trip
PUT /api/trips/:id - Update a trip
DELETE /api/trips/:id - Delete a trip
Setup Instructions
Clone the repository**
   ```bash
   git clone <https://github.com/ShivamKumarJha2004/Trip-Planner-.git>
```
Prerequisites
Node.js (v18+)
MongoDB (local or cloud instance)
npm or yarn
Installation
Install dependencies:

npm install
Create a .env file in the root directory with the following variables:

MONGO_URL=mongodb+srv://jha24978:squTVN2GgRCe440s@cluster0.ys95mbl.mongodb.net/trip_planner
PORT=3001
Note: Replace the MongoDB connection string with your own.

Development
Start the development server with hot reloading:

npm run dev
The server will start on the port specified in your .env file (default: 3001).

Production Build
Build the application:

npm run build
Project Structure
src/index.ts - Entry point
src/app.ts - Fastify application setup
src/routes/ - API route definitions
src/models/ - Data models and database operations
src/utils/ - Utility functions
Dependencies
Fastify - Web framework
@fastify/mongodb - MongoDB plugin for Fastify
@fastify/cors - CORS support
fastify-type-provider-zod - Zod integration for request/response validation
dotenv - Environment variable management
zod - Schema validation
