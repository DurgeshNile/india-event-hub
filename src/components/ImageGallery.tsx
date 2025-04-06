
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Image, Star, Heart, Eye } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3",
    alt: "Wedding celebration",
    category: "Wedding",
    likes: 245
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1530023367847-a683933f4172?ixlib=rb-4.0.3",
    alt: "Corporate event",
    category: "Corporate",
    likes: 189
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3",
    alt: "Birthday celebration",
    category: "Birthday",
    likes: 215
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3",
    alt: "Music festival",
    category: "Festival",
    likes: 278
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3",
    alt: "Exhibition setup",
    category: "Exhibition",
    likes: 156
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3",
    alt: "Traditional ceremony",
    category: "Cultural",
    likes: 203
  }
];

const ImageGallery = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Stunning Event Galleries</h2>
          <p className="text-gray-600">
            Browse through our collection of beautiful event pictures from across India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <Card 
              key={image.id}
              className="overflow-hidden group hover:shadow-xl transition-all duration-500 card-hover"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-india-orange/80 text-white text-sm rounded-full mb-2">
                    {image.category}
                  </span>
                  <div className="flex items-center justify-between text-white">
                    <p className="font-medium">{image.alt}</p>
                    <div className="flex items-center gap-1">
                      <Heart size={16} className="text-pink-300" />
                      <span className="text-sm">{image.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="px-6 py-3 bg-gradient-to-r from-india-pink to-india-orange text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto">
            <Image size={18} className="mr-2" />
            View More Gallery Images
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
