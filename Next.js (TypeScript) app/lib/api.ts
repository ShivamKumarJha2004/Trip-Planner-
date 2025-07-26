import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api",
});

export interface Trip {
  _id: string;
  title: string;
  destination: string;
  days: number;
  budget: number;
  createdAt: string;
}

export interface TripFilters {
  destination?: string;
  minBudget?: number;
  maxBudget?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  trips: T[];
  total: number;
}

export const createTrip = async (trip: Omit<Trip, "_id" | "createdAt">) => {
  const response = await api.post("/trips", trip);
  return response.data;
};

export const getTrips = async (filters?: TripFilters): Promise<PaginatedResponse<Trip>> => {
  try {
    // Make a real API call to the backend
    const response = await api.get("/trips", { params: filters });
    
    // If backend doesn't support pagination yet, handle it on the client side
    if (Array.isArray(response.data) && !('trips' in response.data)) {
      let trips = response.data;
      
      // Filter by destination if provided
      if (filters?.destination) {
        const searchTerm = filters.destination.toLowerCase();
        trips = trips.filter((trip: Trip) => 
          trip.destination.toLowerCase().includes(searchTerm)
        );
      }
      
      // Filter by budget if provided
      if (filters?.minBudget) {
        trips = trips.filter((trip: Trip) => trip.budget >= filters.minBudget!);
      }
      
      if (filters?.maxBudget) {
        trips = trips.filter((trip: Trip) => trip.budget <= filters.maxBudget!);
      }
      
      // Get total before pagination
      const total = trips.length;
      
      // Apply pagination
      const page = filters?.page || 1;
      const limit = filters?.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedTrips = trips.slice(start, end);
      
      return {
        trips: paginatedTrips,
        total
      };
    }
    
    // If backend already returns paginated data
    return response.data;
  } catch (error) {
    console.error('Error fetching trips:', error);
    return { trips: [], total: 0 };
  }
};

export const updateTrip = async (id: string, trip: Partial<Trip>) => {
  try {
    console.log(`Making API request to: /trips/${id}`);
    const response = await api.put(`/trips/${id}`, trip);
    return response.data;
  } catch (error: any) {
    console.error('API Error in updateTrip:', error.response?.data || error.message);
    throw error;
  }
};