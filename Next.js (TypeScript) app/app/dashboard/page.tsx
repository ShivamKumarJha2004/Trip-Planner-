"use client";
import TripCard from "../../components/TripCard";
import { getTrips, Trip, TripFilters, PaginatedResponse } from "../../lib/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Plus, MapPin, Loader2, Search, DollarSign } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function Dashboard() {
  const [tripData, setTripData] = useState<PaginatedResponse<Trip>>({ trips: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TripFilters>({
    destination: '',
    minBudget: undefined,
    maxBudget: undefined,
    page: 1,
    limit: 6
  });
  const [maxBudgetValue, setMaxBudgetValue] = useState<number>(50000);
  const [debouncedDestination, setDebouncedDestination] = useState('');

  // Calculate total pages
  const totalPages = Math.ceil(tripData.total / (filters.limit || 6));

  // Handle destination search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, destination: debouncedDestination }));
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedDestination]);

  // Fetch trips when filters change
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await getTrips(filters);
        setTripData(data);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrips();
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "My Trips" }]} />
      
      {/* Header Card */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-none shadow-md overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/globe.svg')] bg-no-repeat bg-contain opacity-5 transform translate-x-1/4 -translate-y-1/4"></div>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">My Trips</CardTitle>
              <CardDescription className="text-slate-600 mt-2">Plan and manage your adventures</CardDescription>
            </div>
            <Link href="/submit">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg group"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                Add New Trip
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Destination Search */}
            <div className="relative">
              <Label htmlFor="destination" className="text-sm font-medium mb-1 block">Destination</Label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="destination"
                  placeholder="Search by destination"
                  className="pl-8"
                  value={debouncedDestination}
                  onChange={(e) => setDebouncedDestination(e.target.value)}
                />
              </div>
            </div>
            
            {/* Budget Range */}
            <div>
              <Label htmlFor="budget" className="text-sm font-medium mb-1 block">Budget (up to ₹{maxBudgetValue.toLocaleString()})</Label>
              <Slider
                id="budget"
                defaultValue={[maxBudgetValue]}
                max={100000}
                step={1000}
                onValueChange={(value) => {
                  setMaxBudgetValue(value[0]);
                  setFilters(prev => ({ ...prev, maxBudget: value[0] }));
                }}
                className="py-4"
              />
            </div>
            
            {/* Reset Filters */}
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  setDebouncedDestination('');
                  setMaxBudgetValue(50000);
                  setFilters({
                    destination: '',
                    minBudget: undefined,
                    maxBudget: undefined,
                    page: 1,
                    limit: 6
                  });
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            <p className="text-slate-600">Loading your trips...</p>
          </div>
        </div>
      ) : tripData.trips.length === 0 ? (
        /* Empty State */
        <Card className="p-8 text-center bg-white/50 border border-dashed border-slate-300 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-blue-50 p-6 rounded-full">
                <MapPin className="h-16 w-16 text-blue-400" />
              </div>
              <h3 className="text-2xl font-medium text-slate-700">No trips planned yet</h3>
              <p className="text-slate-500 max-w-md">Start planning your next adventure by creating your first trip.</p>
              <Link href="/submit">
                <Button 
                  variant="outline"
                  className="mt-4 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300"
                  size="lg"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Trip Grid */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripData.trips.map((trip:Trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (filters.page && filters.page > 1) {
                        setFilters(prev => ({ ...prev, page: (prev.page || 1) - 1 }));
                      }
                    }}
                    className={filters.page === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setFilters(prev => ({ ...prev, page }));
                      }}
                      isActive={page === filters.page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (filters.page && filters.page < totalPages) {
                        setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }));
                      }
                    }}
                    className={filters.page === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
}