import {z} from "zod"

export const tripSchema=z.object({
    title:z.string().min(1,"Title is required").max(100),
    destination:z.string().min(1,"Destination is required").max(100),
    days:z.number().int().positive("Days must be a positive "),
    budget:z.number().positive("Budget must be positive")
})
export type TripInput=z.infer<typeof tripSchema>