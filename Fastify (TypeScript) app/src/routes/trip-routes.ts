import { FastifyInstance } from "fastify";
import { tripSchema, TripInput } from "../utills/validation";
import { TripModel } from "../models/Trip-model";

export default async function tripRoutes(fastify:FastifyInstance){
    const tripModel=new TripModel(fastify.mongo);
    fastify.post("/",{
        schema:{
            body:tripSchema,
        },
        handler:async(request,reply)=>{
            const tripInput=request.body as TripInput
            const newTrip=await tripModel.create(tripInput);
            return reply.code(201).send(newTrip);
        }
    })
    fastify.get("/",{
        handler:async ()=>{
            return tripModel.getAll()
        }
    })
    fastify.put("/:id",{
        schema:{
            body:tripSchema.partial(),
        },
        handler:async(request,reply)=>{
            try {
                const {id}=request.params as {id:string};
                console.log("Updating trip with ID:", id);
                const tripInput=request.body as TripInput;
                console.log("Trip input data:", tripInput);
                
                // Validate that we have at least one field to update
                if (Object.keys(tripInput).length === 0) {
                    return reply.code(400).send({
                        error: "No update data provided"
                    });
                }
                
                const updatedTrip = await tripModel.update(id, tripInput);
                console.log("Updated Trip:", updatedTrip);
                
                if (!updatedTrip) {
                    return reply.code(404).send({
                        error: "Trip not found or update failed"
                    });
                }
                
                return reply.code(200).send(updatedTrip);
            } catch (error) {
                console.error("Error in update trip route:", error);
                return reply.code(500).send({
                    error: "Internal server error"
                });
            }
        }
    })
}