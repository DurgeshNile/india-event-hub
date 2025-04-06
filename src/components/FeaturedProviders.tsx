
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { serviceProviders } from '@/utils/data';
import { Link } from 'react-router-dom';

const ProviderCard = ({ provider }: { provider: any }) => {
  return (
    <Link to={`/provider/${provider.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
        <div className="relative overflow-hidden h-56">
          <img 
            src={provider.image} 
            alt={provider.name} 
            className="w-full h-full object-cover"
          />
          {provider.featured && (
            <Badge className="absolute top-3 left-3 bg-india-yellow text-india-darkblue">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1 flex items-center">
                {provider.name}
                {provider.verified && (
                  <CheckCircle size={16} className="ml-2 text-india-blue" />
                )}
              </h3>
              <p className="text-gray-500 text-sm mb-2">{provider.category}</p>
            </div>
            <div className="flex items-center bg-india-cream px-2 py-1 rounded text-sm">
              <Star className="h-4 w-4 text-india-yellow mr-1" />
              <span className="font-medium">{provider.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({provider.reviewCount})</span>
            </div>
          </div>
          
          <div className="mt-3 flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{provider.location}, {provider.city}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const FeaturedProviders = () => {
  // Filter featured providers
  const featured = serviceProviders.filter(provider => provider.featured);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Service Providers</h2>
          <p className="text-gray-600">
            Discover top-rated professionals across India for your special events
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/providers" className="text-india-blue hover:text-india-darkblue font-medium">
            View All Service Providers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
