"use client";

import { useRouter } from "next/navigation";
import TripForm from "./TripForm";
import { Trip, updateTrip } from "../lib/api";

interface EditTripFormProps {
  trip: Trip;
  tripId: string;
}

export default function EditTripForm({ trip, tripId }: EditTripFormProps) {
  const router = useRouter();

  const handleSubmit = async (tripData: Omit<Trip, "_id" | "createdAt">) => {
    try {
      console.log('Updating trip with ID:', tripId);
      console.log('Trip data being sent:', tripData);
      const res = await updateTrip(tripId, tripData);
      console.log('Update response:', res);
      if (res) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  return <TripForm initialData={trip} onSubmit={handleSubmit} />;
}