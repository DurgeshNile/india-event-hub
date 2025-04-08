
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Image, Star, Heart, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3",
    alt: "Luxury wedding celebration",
    category: "Wedding",
    likes: 245
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3",
    alt: "Professional corporate event",
    category: "Corporate",
    likes: 189
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3",
    alt: "Exclusive birthday celebration",
    category: "Birthday",
    likes: 215
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3",
    alt: "Music festival production",
    category: "Festival",
    likes: 278
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3",
    alt: "Premium exhibition setup",
    category: "Exhibition",
    likes: 156
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3",
    alt: "Traditional ceremony",
    category: "Cultural",
    likes: 203
  }
];

const ImageGallery = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-black/90 to-background/90">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-orbitron mb-4 text-gradient">
            Premium Event Galleries
          </h2>
          <p className="text-gray-400">
            Browse through our collection of exquisite event productions from across India
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden group hover:shadow-xl transition-all duration-500 card-hover bg-black/40 backdrop-blur-sm border-gray-800"
              >
                <div className="relative aspect-square overflow-hidden preserve-3d">
                  <motion.img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-accent/80 text-white text-sm rounded-full mb-2 font-syne">
                      {image.category}
                    </span>
                    <div className="flex items-center justify-between text-white">
                      <p className="font-medium">{image.alt}</p>
                      <div className="flex items-center gap-1">
                        <Heart size={16} className="text-accent" />
                        <span className="text-sm">{image.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button className="bg-gradient-to-r from-blue-600 to-accent text-white rounded-full hover:shadow-lg hover:shadow-accent/20 transform transition-all duration-300 flex items-center mx-auto">
            <Image size={18} className="mr-2" />
            View More Gallery Images
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageGallery;
