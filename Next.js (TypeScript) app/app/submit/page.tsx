"use client";
import TripForm from "../../components/TripForm";
import { createTrip, Trip } from "../../lib/api";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SubmitTrip() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  
  const handleSubmit = async (tripData: Omit<Trip, "_id" | "createdAt">) => {
    await createTrip(tripData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/map-pattern.svg')] bg-repeat opacity-10 z-0"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-[url('/compass.svg')] bg-no-repeat bg-contain opacity-20 z-0 animate-spin-slow"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-[url('/travel-bg.svg')] bg-no-repeat bg-contain opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumb items={[
            { label: "My Trips", href: "/dashboard" },
            { label: "Create New Trip" }
          ]} />
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-none overflow-hidden rounded-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/window.svg')] bg-no-repeat bg-contain opacity-10 transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl z-0"></div>
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl z-0"></div>
            
            <CardHeader className="relative z-10 pb-0">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Image src="/globe.svg" width={32} height={32} alt="Globe" className="invert" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Create New Trip
              </CardTitle>
              <CardDescription className="text-center text-gray-600 mt-2">
                Fill in the details below to plan your next adventure
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-6">
              <TripForm onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}