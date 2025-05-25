
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle, Phone, Mail, Globe } from "lucide-react";

interface ProviderCardProps {
  provider: {
    id: string;
    name: string;
    category: string;
    location: string;
    city: string;
    rating: number;
    reviewCount: number;
    verified: boolean;
    featured: boolean;
    phone?: string;
    email?: string;
    website?: string;
    description?: string;
    price_range?: string;
    image: string;
  };
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
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
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg mb-1 flex items-center">
              {provider.name}
              {provider.verified && (
                <CheckCircle size={16} className="ml-2 text-india-blue" />
              )}
            </h3>
            <p className="text-gray-500 text-sm">{provider.category}</p>
          </div>
          <div className="flex items-center bg-india-cream px-2 py-1 rounded text-sm">
            <Star className="h-4 w-4 text-india-yellow mr-1" />
            <span className="font-medium">{provider.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({provider.reviewCount})</span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{provider.location}, {provider.city}</span>
        </div>

        {provider.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {provider.description}
          </p>
        )}

        <div className="space-y-2">
          {provider.phone && (
            <div className="flex items-center text-gray-500 text-sm">
              <Phone className="h-4 w-4 mr-2" />
              <span>{provider.phone}</span>
            </div>
          )}
          
          {provider.email && (
            <div className="flex items-center text-gray-500 text-sm">
              <Mail className="h-4 w-4 mr-2" />
              <span className="truncate">{provider.email}</span>
            </div>
          )}
          
          {provider.website && (
            <div className="flex items-center text-gray-500 text-sm">
              <Globe className="h-4 w-4 mr-2" />
              <a 
                href={provider.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline truncate"
              >
                Website
              </a>
            </div>
          )}
        </div>

        {provider.price_range && (
          <div className="mt-3 pt-3 border-t">
            <span className="text-sm font-medium text-green-600">
              {provider.price_range.charAt(0).toUpperCase() + provider.price_range.slice(1)} Range
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
