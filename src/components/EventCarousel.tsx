
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { PartyPopper, CalendarDays, Heart } from "lucide-react";

type EventImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
  icon: React.ReactNode;
};

const eventImages: EventImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3",
    alt: "Elegant Wedding Ceremony",
    category: "Weddings",
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3",
    alt: "Exclusive Birthday Party",
    category: "Parties",
    icon: <PartyPopper className="w-5 h-5" />
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3",
    alt: "Corporate Event",
    category: "Events",
    icon: <CalendarDays className="w-5 h-5" />
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3",
    alt: "Wedding Reception",
    category: "Weddings",
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3",
    alt: "Themed Party",
    category: "Parties",
    icon: <PartyPopper className="w-5 h-5" />
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3",
    alt: "Festival Event",
    category: "Events",
    icon: <CalendarDays className="w-5 h-5" />
  },
];

const EventCarousel = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background/90 to-black/80 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-orbitron mb-4 text-gradient">
            Celebrate Your Special Moments
          </h2>
          <p className="text-gray-400 mb-8">
            From weddings to corporate events, we help you create memories that last a lifetime
          </p>
        </motion.div>
        
        <Carousel 
          opts={{ 
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {eventImages.map((image, index) => (
              <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <div className="preserve-3d group card-3d h-full rounded-xl overflow-hidden relative aspect-[4/3]">
                    <motion.img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover transform transition-all duration-500"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-5 w-full">
                      <div className="flex items-center mb-2 gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center text-accent">
                          {image.icon}
                        </div>
                        <span className="text-white font-syne text-sm tracking-wide">{image.category}</span>
                      </div>
                      <h3 className="font-syne text-white text-xl">{image.alt}</h3>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="relative inset-auto transform-none bg-black/30 border-accent/30 hover:bg-accent/20 text-accent" />
            <CarouselNext className="relative inset-auto transform-none bg-black/30 border-accent/30 hover:bg-accent/20 text-accent" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default EventCarousel;
