
import React from 'react';
import { Button } from "@/components/ui/button";
import SearchForm from './SearchForm';
import { Heart, Star, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      {/* Decorative Elements with Enhanced Animations */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4 space-x-2">
            <Sparkles className="w-8 h-8 text-pink-500 animate-spin-slow" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Find Perfect <span className="text-gradient text-pink-500">Event Services</span>
            </h1>
            <Star className="w-8 h-8 text-pink-500 animate-spin-slow" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-light italic flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
            The golden touch to your event
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with top photographers, caterers, decorators, and more for your special occasions in any city across India.
          </p>
          
          <div className="max-w-3xl mx-auto mt-8 mb-12 bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-2xl transition-shadow duration-300">
            <SearchForm />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button 
              size="lg" 
              className="bg-pink-500 hover:bg-pink-600 text-white transition-transform hover:scale-105"
            >
              Browse Categories
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-transform hover:scale-105"
            >
              For Service Providers
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8">
            {[
              { count: '10,000+', label: 'Service Providers' },
              { count: '200+', label: 'Cities' },
              { count: '50,000+', label: 'Happy Customers' }
            ].map(({ count, label }) => (
              <div key={label} className="text-center hover:scale-105 transition-transform">
                <p className="text-3xl font-bold text-pink-600 animate-bounce-slow">{count}</p>
                <p className="text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
