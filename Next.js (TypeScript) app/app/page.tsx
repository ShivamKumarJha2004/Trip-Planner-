'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, DollarSign, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Welcome to TripPlanner</h1>
          <p className="text-gray-600 mb-8">Please log in to access your trips and plan new adventures.</p>
          <Link
            href="/login"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center w-full"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/globe.svg')] bg-no-repeat bg-right opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 leading-tight">
              Plan Your Perfect Trip
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Organize your travel itineraries, track budgets, and manage all your
              trips in one beautiful, easy-to-use platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                Create New Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 text-lg font-medium transition-all duration-300 flex items-center justify-center"
              >
                View My Trips
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Use TripPlanner?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-6">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Destinations</h3>
              <p className="text-gray-600">
                Save all your planned destinations in one organized place. Never lose track of where you want to go next.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-6">
                <Calendar className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Plan Itineraries</h3>
              <p className="text-gray-600">
                Create detailed day-by-day plans for your trips. Organize activities, accommodations, and transportation.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-6">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Manage Budgets</h3>
              <p className="text-gray-600">
                Keep track of your travel expenses and stay on budget. Plan ahead and avoid financial surprises.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-200 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of travelers who use TripPlanner to create unforgettable journeys.
          </p>
          <Link
            href="/submit"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 text-lg font-medium inline-block transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
