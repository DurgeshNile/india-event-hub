
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
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
    src: "https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-4.0.3",
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
    description: "Celebrate the festival of colors with our vibrant Holi events"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3",
    alt: "Corporate Event in Mumbai",
    category: "Events",
    icon: <CalendarDays className="w-5 h-5" />,
    description: "Professional corporate events with impeccable service and attention to detail"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1610851467855-4ecfc3c975e4?ixlib=rb-4.0.3",
    alt: "Royal Rajasthani Wedding",
    category: "Weddings",
    icon: <Heart className="w-5 h-5" />,
    description: "Royal Rajasthani weddings with traditional ceremonies and opulent decor"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1567504780246-1a829a7008a3?ixlib=rb-4.0.3",
    alt: "Diwali Celebration",
    category: "Parties",
    icon: <PartyPopper className="w-5 h-5" />,
    description: "Illuminate your Diwali celebrations with our spectacular arrangements"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1625232736929-a1671d4fe8c7?ixlib=rb-4.0.3",
    alt: "Festival Event",
    category: "Events",
    icon: <CalendarDays className="w-5 h-5" />,
    description: "Cultural festivals that showcase the heritage and traditions of India"
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
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleManualChange = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-playing after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % eventImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
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
                transition={{ duration: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/80 to-background z-10"></div>
                <motion.img 
                  src={image.src} 
                  alt={image.alt} 
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8 }}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-orbitron mb-4 text-gradient">
            Celebrate Your Special Moments
          </h2>
          <p className="text-xl text-gray-300 mb-8">
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
              <h3 className="text-2xl md:text-3xl font-syne text-accent mb-2">
                {eventImages[activeIndex].category}: {eventImages[activeIndex].alt}
              </h3>
              <p className="text-gray-300">{eventImages[activeIndex].description}</p>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-4">
            <Button 
              variant="default" 
              className="bg-accent/80 hover:bg-accent backdrop-blur-sm"
            >
              Explore More
            </Button>
            <Button 
              variant="outline" 
              className="border-accent/50 text-accent hover:bg-accent/10"
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
                  ? "bg-accent w-8" 
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
            className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-accent/20 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-accent/20 transition-all duration-300"
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
