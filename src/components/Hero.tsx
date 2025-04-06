
import React from 'react';
import { Button } from "@/components/ui/button";
import SearchForm from './SearchForm';
import { Heart, Star, Sparkles, Camera, Music, Utensils } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-pink-100/30 to-white min-h-[90vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-india-yellow/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-[15%] text-pink-400 animate-bounce-slow opacity-30">
          <Camera size={32} />
        </div>
        <div className="absolute top-40 right-[20%] text-india-orange animate-bounce-slow opacity-30" style={{ animationDelay: "1.2s" }}>
          <Music size={28} />
        </div>
        <div className="absolute bottom-32 left-[25%] text-india-yellow animate-bounce-slow opacity-30" style={{ animationDelay: "0.8s" }}>
          <Utensils size={24} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 to-india-yellow/20 blur-xl rounded-full animate-pulse"></div>
            <div className="flex items-center justify-center mb-4 space-x-2 relative">
              <Sparkles className="w-8 h-8 text-india-gold animate-spin-slow" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="text-pink-500">Lets</span>
                <span className="text-india-blue">Eventify</span>
              </h1>
              <Star className="w-8 h-8 text-india-gold animate-spin-slow" />
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-6 font-light italic flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
            <span className="bg-gradient-to-r from-india-orange to-india-red bg-clip-text text-transparent">
              The golden touch to your event
            </span>
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with top photographers, caterers, decorators, and more for your special occasions in any city across India.
          </p>
          
          <div className="max-w-3xl mx-auto mt-8 mb-12 bg-white rounded-xl shadow-xl p-4 md:p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] border border-pink-100">
            <SearchForm />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-india-red text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
            >
              Browse Categories
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-pink-500 text-pink-500 hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
            >
              For Service Providers
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {[
              { count: '10,000+', label: 'Service Providers', icon: <Star className="w-5 h-5" /> },
              { count: '200+', label: 'Cities', icon: <Sparkles className="w-5 h-5" /> },
              { count: '50,000+', label: 'Happy Customers', icon: <Heart className="w-5 h-5" /> }
            ].map(({ count, label, icon }) => (
              <div key={label} className="text-center group transition-all duration-300 hover:scale-110 p-4 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl">
                <div className="text-pink-500 mb-1 flex justify-center">{icon}</div>
                <p className="text-3xl font-bold bg-gradient-to-br from-india-red to-india-orange bg-clip-text text-transparent">{count}</p>
                <p className="text-gray-600 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
