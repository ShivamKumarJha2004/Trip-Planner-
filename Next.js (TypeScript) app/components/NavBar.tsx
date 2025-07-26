'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            TripPlanner
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          {user ? (
            <>
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                My Trips
              </Link>
              <Link 
                href="/submit" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                Create Trip
              </Link>
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-4 w-4" />
                <span>{user.username}</span>
              </div>
              <button 
                onClick={logout}
                className="text-gray-700 hover:text-red-600 transition-colors flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Trips
                </Link>
                <Link 
                  href="/submit" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md inline-block w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Trip
                </Link>
                <div className="flex items-center space-x-2 text-gray-700 py-2">
                  <User className="h-4 w-4" />
                  <span>{user.username}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-red-600 transition-colors flex items-center space-x-1 py-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}