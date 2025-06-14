
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, CalendarDays, Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type EventImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
  icon: React.ReactNode;
  description: string;
};

const eventImages: EventImage[] = [
  {
    id: 1,
    src: "https://cosmopolitanevents.com.au/wp-content/uploads/2021/08/Indian-Wedding.jpg",
    alt: "Traditional Indian Wedding",
    category: "Weddings",
    icon: <Heart className="w-5 h-5" />,
    description: "Experience the richness and grandeur of authentic Indian weddings"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1530735038726-a73fd6e6c31c?ixlib=rb-4.0.3",
    alt: "Colorful Holi Party",
    category: "Parties",
    icon: <PartyPopper className="w-5 h-5" />,
    description: "Celebrate the vibrant festival of colors with traditional enthusiasm"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Corporate Event in Mumbai",
    category: "Corporate",
    icon: <CalendarDays className="w-5 h-5" />,
    description: "Professional corporate events with Indian hospitality and precision"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1610851467855-4ecfc3c975e4?ixlib=rb-4.0.3",
    alt: "Royal Rajasthani Wedding",
    category: "Weddings",
    icon: <Heart className="w-5 h-5" />,
    description: "Royal Rajasthani celebrations with traditional ceremonies and opulent decor"
  },
  {
    id: 5,
    src: "https://im.indiatimes.in/content/2022/Sep/bccl2_632962740b592.jpg?w=725&h=483&cc=1",
    alt: "Diwali Celebration",
    category: "Festivals",
    icon: <PartyPopper className="w-5 h-5" />,
    description: "Illuminate your Diwali celebrations with spectacular traditional arrangements"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1625232736929-a1671d4fe8c7?ixlib=rb-4.0.3",
    alt: "Festival Event",
    category: "Events",
    icon: <CalendarDays className="w-5 h-5" />,
    description: "Cultural festivals showcasing the rich heritage and traditions of India"
  },
];

const EventCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % eventImages.length);
      }, 4000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleManualChange = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % eventImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Full-size background carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {eventImages.map((image, index) => (
            index === activeIndex && (
              <motion.div
                key={image.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/80 to-background z-10"></div>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      {/* Content overlay */}
      <div className="container mx-auto px-4 relative z-10 min-h-screen flex flex-col justify-center items-center">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Celebrate Your Special Moments
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            From traditional Indian weddings to vibrant cultural festivals, we create memories that last a lifetime
          </p>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={eventImages[activeIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                {eventImages[activeIndex].category}: {eventImages[activeIndex].alt}
              </h3>
              <p className="text-gray-200">{eventImages[activeIndex].description}</p>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-4">
            <Button 
              variant="default" 
              className="bg-yellow-500/80 hover:bg-yellow-500 backdrop-blur-sm text-black"
            >
              Explore More
            </Button>
            <Button 
              variant="outline" 
              className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
            >
              Get Started
            </Button>
          </div>
        </motion.div>
        
        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mb-12">
          {eventImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? "bg-yellow-400 w-8" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-yellow-500/20 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-yellow-500/20 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5"></div>
    </section>
  );
};

export default EventCarousel;
