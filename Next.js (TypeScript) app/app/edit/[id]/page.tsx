
'use client';

import { getTrips, Trip } from "../../../lib/api";
import { notFound, useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import React, { use, useEffect, useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EditTripForm from "@/components/EditTripForm";

export default function EditTrip({ params }: { params: { id: string } }) {
  // Unwrap params using React.use()
  
  const { id: tripId } = useParams();
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);
  
  // Fetch trip data
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await getTrips();
        const foundTrip = response.trips.find((t) => t._id === tripId);
        setTrip(foundTrip || null);
      } catch (error) {
        console.error('Error fetching trip:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrip();
  }, [tripId]); // Use unwrapped tripId as dependency

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // If user is not logged in, don't render the form
  if (!user) {
    return null; // This will not be shown as the user will be redirected to login
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!trip) {
    return notFound();
  }

  // Server component doesn't need handleSubmit anymore as it's moved to the client component

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: "My Trips", href: "/dashboard" },
        { label: `Edit: ${trip.title}` }
      ]} />
      
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white shadow-md border-none overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/file.svg')] bg-no-repeat bg-contain opacity-5 transform translate-x-1/4 -translate-y-1/4"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Edit Trip: {trip.title}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Update the details of your trip to {trip.destination}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditTripForm trip={trip} tripId={tripId as string} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}