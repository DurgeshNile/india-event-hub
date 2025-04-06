
import React from 'react';
import { Button } from "@/components/ui/button";
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Find Perfect <span className="text-pink-500">Event Services</span> Across India
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-light italic">
            The golden touch to your event
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with top photographers, caterers, decorators, and more for your special occasions in any city across India.
          </p>
          
          <div className="max-w-3xl mx-auto mt-8 mb-12 bg-white rounded-xl shadow-lg p-4 md:p-6">
            <SearchForm />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
              Browse Categories
            </Button>
            <Button size="lg" variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white">
              For Service Providers
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-600">10,000+</p>
              <p className="text-gray-600">Service Providers</p>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-600">200+</p>
              <p className="text-gray-600">Cities</p>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-600">50,000+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
