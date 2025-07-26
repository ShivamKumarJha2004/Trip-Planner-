
## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

## frontend Setup
### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShivamKumarJha2004/Trip-Planner-.git
   cd Trip-Planner-
   cd "Next.js (TypeScript) app"
   npm install

2. Create .env file in root dir in which write this
   ```bash
    NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```
3.npm run dev (frontend stared)

## Backend Sethup
1 Setup
```bash
 cd Trip-Planner-
cd "fastify (typescript) app"
 npm install
```
2.create .env file in root dir in which write this
```bash
MONGO_URL=mongodb+srv://jha24978:squTVN2GgRCe440s@cluster0.ys95mbl.mongodb.net/trip_planner
PORT=3001
```
3. npm run dev (backend server is started)


## API Endpoints

| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | `/api/trips`      | Get all trips                |
| GET    | `/api/trips/:id`  | Get a specific trip          |
| POST   | `/api/trips`      | Create a new trip            |
| PUT    | `/api/trips/:id`  | Update an existing trip      |
| DELETE | `/api/trips/:id`  | Delete a trip                |




   
