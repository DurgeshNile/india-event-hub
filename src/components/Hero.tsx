
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import EnhancedSearchForm from './EnhancedSearchForm';
import { Heart, Star, Sparkles, Camera, Music, Utensils, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-[90vh] flex items-center">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        
        {/* 3D Floating Icons */}
        <motion.div 
          className="absolute top-20 left-[15%] text-accent opacity-30"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <Camera size={32} />
        </motion.div>
        
        <motion.div 
          className="absolute top-40 right-[20%] text-blue-400 opacity-30"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        >
          <Music size={28} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-32 left-[25%] text-blue-500 opacity-30"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <Utensils size={24} />
        </motion.div>
      </div>
      
      {/* Light background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/10 z-1"></div>
      
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div 
              className="flex flex-col items-center justify-center mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="mb-4 flex items-center justify-center space-x-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Sparkles className="w-6 h-6 text-pink-500" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                  <span className="text-pink-500">Lets</span>
                  <span className="text-purple-600">Eventify</span>
                </h1>
                <Star className="w-6 h-6 text-purple-500" />
              </motion.div>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-6 font-medium flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Find perfect service providers for your special events</span>
                <Heart className="w-4 h-4 text-pink-500" />
              </motion.p>
            </motion.div>
            
            <motion.p 
              className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Connect with top photographers, caterers, decorators, and more for your special occasions in any city across India.
            </motion.p>
            
            <motion.div 
              className="max-w-4xl mx-auto mt-8 mb-12 bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-pink-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ 
                boxShadow: "0 20px 40px -20px rgba(236, 72, 153, 0.3)",
                translateY: -2
              }}
            >
              <EnhancedSearchForm />
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Browse Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-purple-300 text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                For Service Providers
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              {[
                { count: '10,000+', label: 'Service Providers', icon: <Star className="w-5 h-5" /> },
                { count: '200+', label: 'Cities', icon: <Sparkles className="w-5 h-5" /> },
                { count: '50,000+', label: 'Happy Customers', icon: <Heart className="w-5 h-5" /> }
              ].map(({ count, label, icon }) => (
                <motion.div 
                  key={label} 
                  className="text-center group p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-pink-500 mb-2 flex justify-center">{icon}</div>
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {count}
                  </p>
                  <p className="text-gray-600 font-medium">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
