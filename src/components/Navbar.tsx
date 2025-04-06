
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/63f210e0-ede7-488f-89f1-3c588fe63c17.png" 
                alt="LetsEventify Logo" 
                className="h-10"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-foreground hover:text-pink-500 transition-colors">
              Explore
            </Link>
            <Link to="/categories" className="text-foreground hover:text-pink-500 transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-foreground hover:text-pink-500 transition-colors">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white">
              Log in
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-pink-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-pink-50 hover:text-pink-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-pink-50 hover:text-pink-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-pink-50 hover:text-pink-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-pink-50 hover:text-pink-500"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" className="w-full border-pink-500 text-pink-500">
                Log in
              </Button>
              <Button className="w-full bg-pink-500 hover:bg-pink-600">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
