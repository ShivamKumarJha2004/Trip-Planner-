import Link from 'next/link';
import { Globe, Mail, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Globe className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-lg font-semibold text-gray-800">TripPlanner</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              My Trips
            </Link>
            <Link 
              href="/submit" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Create Trip
            </Link>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
          
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TripPlanner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}