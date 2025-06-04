import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import SearchForm from './SearchForm';
import { Heart, Star, Sparkles, Camera, Music, Utensils, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background min-h-[90vh] flex items-center">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        {/* 3D Floating Icons */}
        <motion.div 
          className="absolute top-20 left-[15%] text-accent opacity-30 transform-3d"
          animate={{ 
            y: [0, -15, 0],
            rotateY: [0, 180, 360],
            z: [0, 20, 0]
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
          className="absolute top-40 right-[20%] text-blue-400 opacity-30 transform-3d"
          animate={{ 
            y: [0, -15, 0],
            rotateY: [0, 180, 360],
            z: [0, 20, 0]
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
          className="absolute bottom-32 left-[25%] text-blue-500 opacity-30 transform-3d"
          animate={{ 
            y: [0, -15, 0],
            rotateY: [0, 180, 360],
            z: [0, 20, 0]
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
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/80 z-1"></div>
      
      {/* Background images with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 opacity-20"
          initial={{ scale: 1.1 }}
          animate={{ 
            y: [0, -10, 0],
            scale: [1.1, 1.05, 1.1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="/images/hero/event-atmosphere.jpg" 
            alt="Event atmosphere" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
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
                <Sparkles className="w-8 h-8 text-accent animate-float depth-2" />
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-orbitron tracking-wider">
                  <span className="text-accent">Lets</span>
                  <span className="text-blue-400">Eventify</span>
                </h1>
                <Star className="w-8 h-8 text-accent animate-float depth-2" />
              </motion.div>
              
              <motion.p 
                className="text-xl md:text-2xl text-blue-300/80 mb-6 font-light italic flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Heart className="w-5 h-5 text-accent animate-pulse" />
                <span className="bg-gradient-to-r from-blue-400 to-accent bg-clip-text text-transparent font-syne">
                  The professional touch for your premium events
                </span>
                <Heart className="w-5 h-5 text-accent animate-pulse" />
              </motion.p>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300/80 mb-8 max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Connect with top photographers, caterers, decorators, and more for your special occasions in any city across India.
            </motion.p>
            
            <motion.div 
              className="max-w-3xl mx-auto mt-8 mb-12 glass-effect rounded-xl p-4 md:p-6 transition-all duration-300 transform hover:scale-[1.01]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ 
                boxShadow: "0 20px 40px -20px rgba(0, 100, 255, 0.2)",
                translateY: -5
              }}
            >
              <SearchForm />
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-accent/90 to-blue-500/90 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg hover:shadow-accent/20"
              >
                Browse Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
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
                  className="text-center group card-3d p-4 bg-black/30 backdrop-blur-sm rounded-lg"
                  whileHover={{ translateZ: 15, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-accent mb-1 flex justify-center">{icon}</div>
                  <p className="text-3xl font-bold bg-gradient-to-br from-blue-400 to-accent bg-clip-text text-transparent font-orbitron">
                    {count}
                  </p>
                  <p className="text-gray-400 font-medium">{label}</p>
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
