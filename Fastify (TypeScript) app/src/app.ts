import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fastifyMongodb from "@fastify/mongodb"
import tripRoutes from "./routes/trip-routes";
import fastifyCors from '@fastify/cors'; // Add this import

// Build function for testing
export function build() {
    const app = fastify({
        logger: false // Disable logger in tests
    });
    
    // register zod schemas
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);
    
    
    // register routes
    app.register(async (fastify) => {
        fastify.register(tripRoutes, {prefix: "/api/trips"});
    });
    
    return app;
}

// Main app instance
const app = fastify({
    logger: true
});

app.register(fastifyCors, {
  origin: ['http://localhost:3000'], // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
});

// register zod schemas
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifyMongodb, {
    forceClose: true,
    url: process.env.MONGO_URL
});

// Verify DB connection after registration
app.after(async (err) => {
    if (err) throw err;
    try {
        const db = app.mongo.client.db(); // default db from URL
        // List collections to verify connection
        const collections = await db.listCollections().toArray();
        console.log("MongoDB connected. Collections:", collections.map(c => c.name));
    } catch (e) {
        console.error("MongoDB connection failed:", e);
        process.exit(1);
    }
});

// register routes

app.register(async (fastify)=>{
    fastify.register(tripRoutes,{prefix:"/api/trips"})
});

const start =async()=>{
    try {
        await app.listen({port:Number(process.env.PORT)})
        console.log(`Server is running on port ${process.env.PORT}`)
    } catch (error) {
        app.log.error(error)
        console.error("Error starting server:",error)
        process.exit(1)
    }
}
start()