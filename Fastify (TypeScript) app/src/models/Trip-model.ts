import {FastifyMongoObject, ObjectId} from "@fastify/mongodb"
export interface TripPlan{
    _id?:string,
    title:string,
    destination:string,
    days:number,
    budget:number,
    createdAt:Date
}
export class TripModel{
    private colllection;
    constructor(mongo:FastifyMongoObject){
        this.colllection = mongo.db?.collection("trip")
    }
    async create(trip:Omit<TripPlan,"_id" | "createdAt">):Promise<TripPlan>{
       const newTrip={
        ...trip,
        createdAt:new Date(),
       };
       const result=await this.colllection?.insertOne(newTrip);
       return {...newTrip,_id:result?.insertedId.toString()}
    }
    async getAll():Promise<TripPlan[]>
    {
        const trip=await this.colllection?.find().sort({
            createdAt:-1
        }).toArray();
        return trip?.map(trip=>({
            ...trip,_id:trip._id.toString()
        }))||[]
    }
    async update(id:string,trip:Partial<TripPlan>):Promise<TripPlan | null>{
           try {
               console.log("Attempting to update trip with ID:", id);
               const objectId = new ObjectId(id);
               console.log("Created ObjectId:", objectId);
               
               // Check if the document exists first
               const existingTrip = await this.colllection?.findOne({ _id: objectId });
               console.log("Existing trip found:", existingTrip ? "Yes" : "No");
               
               if (!existingTrip) {
                   console.log("Trip not found with ID:", id);
                   return null;
               }
               
               // Update the document directly and get the updated document
               const result = await this.colllection?.findOneAndUpdate(
                 {
                     _id: objectId,
                 },
                 {
                     $set: trip
                 },
                 {
                     returnDocument: "after"
                 }
               );
               
               console.log("Update result:", result);
               
               // Check if result exists
               if (!result) {
                   console.log("Update operation returned null result");
                   return null;
               }
               
               // MongoDB driver might return the document directly or in a value property
               // depending on the version
               if (result.value) {
                   console.log("Returning result.value");
                   return {...result.value, _id: result.value._id.toString()};
               } else if (result._id) {
                   console.log("Returning result directly");
                   return {...result, _id: result._id.toString()};
               }
               
               console.log("No valid result format found");
               return null;
           } catch (error) {
               console.error("Error updating trip:", error);
               return null;
           }
    }
}