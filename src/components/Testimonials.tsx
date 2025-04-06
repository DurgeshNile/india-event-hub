
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Bride",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1",
    rating: 5,
    text: "I found the perfect photographer for my wedding through LetsEventify. The platform made it so easy to compare portfolios and prices. Couldn't be happier with the results!"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Event Manager",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1",
    rating: 5,
    text: "As an event manager, I rely on LetsEventify to find reliable vendors for my corporate clients. The quality of professionals on this platform is outstanding."
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Birthday Celebrant",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1",
    rating: 4,
    text: "Found an amazing decorator for my 30th birthday party. The attention to detail was incredible, and the pricing was transparent. Will definitely use LetsEventify again!"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">
            Read testimonials from satisfied customers who found their perfect event services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-none bg-gradient-to-b from-pink-50/50 to-white shadow-md relative">
              <div className="absolute top-0 right-0 h-20 w-20 bg-india-yellow/10 rounded-full -mt-10 -mr-10"></div>
              <div className="absolute bottom-0 left-0 h-16 w-16 bg-india-blue/10 rounded-full -mb-8 -ml-8"></div>
              
              <CardContent className="p-6 relative">
                <Quote className="h-8 w-8 text-india-orange/20 absolute top-2 right-2" />
                
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4 ring-2 ring-india-orange/20">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "text-india-yellow fill-india-yellow" : "text-gray-300"} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 italic">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="text-india-blue hover:text-india-darkblue underline underline-offset-4">
            Read more testimonials
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
