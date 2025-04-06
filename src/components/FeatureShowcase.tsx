
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Calendar, MapPin, Search, Shield, Award, Users, Clock } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Easy Discovery",
    description: "Find the perfect service providers for your event with our powerful search filters",
    icon: Search,
    color: "text-india-blue",
    bgColor: "bg-india-blue/10"
  },
  {
    id: 2,
    title: "Verified Professionals",
    description: "Every service provider is verified to ensure quality and reliability",
    icon: Shield,
    color: "text-india-green",
    bgColor: "bg-india-green/10"
  },
  {
    id: 3,
    title: "Transparent Reviews",
    description: "Read authentic reviews from previous customers to make informed decisions",
    icon: Award,
    color: "text-india-yellow",
    bgColor: "bg-india-yellow/10"
  },
  {
    id: 4,
    title: "Community Network",
    description: "Connect with a growing community of event professionals across India",
    icon: Users,
    color: "text-india-purple",
    bgColor: "bg-india-purple/10"
  },
  {
    id: 5,
    title: "Portfolio Showcase",
    description: "Browse through comprehensive portfolios with high-quality images",
    icon: Camera,
    color: "text-india-orange",
    bgColor: "bg-india-orange/10"
  },
  {
    id: 6,
    title: "Real-time Availability",
    description: "Check service provider availability and book instantly",
    icon: Calendar,
    color: "text-india-red",
    bgColor: "bg-india-red/10"
  },
  {
    id: 7,
    title: "Pan-India Coverage",
    description: "Find services in any city or town across India for your event needs",
    icon: MapPin,
    color: "text-india-darkblue",
    bgColor: "bg-india-darkblue/10"
  },
  {
    id: 8,
    title: "Quick Response",
    description: "Get prompt responses from service providers to your inquiries",
    icon: Clock,
    color: "text-india-magenta",
    bgColor: "bg-india-magenta/10"
  }
];

const FeatureShowcase = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-800 text-sm font-medium mb-4">
            Why Choose Us
          </div>
          <h2 className="text-3xl font-bold mb-4">Features That Make Us Special</h2>
          <p className="text-gray-600">
            Discover how LetsEventify transforms the way you plan and organize events
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card 
              key={feature.id} 
              className="border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
