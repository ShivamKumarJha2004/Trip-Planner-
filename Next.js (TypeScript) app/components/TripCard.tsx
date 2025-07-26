import Link from "next/link";
import { Trip } from "../lib/api";
import { Calendar, MapPin, DollarSign, Clock, Edit, IndianRupee, IndianRupeeIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  // Format the date to show how long ago it was created
  const timeAgo = formatDistanceToNow(new Date(trip.createdAt), { addSuffix: true });
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group">
      {/* Card Header with Destination Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-24 p-4 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center text-white/90 mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{trip.destination}</span>
          </div>
          <h3 className="text-xl font-bold text-white truncate">{trip.title}</h3>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">{trip.days} {trip.days === 1 ? 'day' : 'days'}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <IndianRupeeIcon className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-sm">{trip.budget.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Clock className="h-3 w-3 mr-1" />
          <span>Created {timeAgo}</span>
        </div>
        
        <div className="flex justify-end">
          <Link
            href={`/edit/${trip._id}`}
            className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors shadow-sm group-hover:shadow-md"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Trip
          </Link>
        </div>
      </div>
    </div>
  );
}
