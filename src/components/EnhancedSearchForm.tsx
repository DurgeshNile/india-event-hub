import React, { useState } from 'react';
import { Search, MapPin, Filter, ArrowRight, Star, IndianRupee, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { categories, cities } from '@/utils/data';
import { useNavigate } from 'react-router-dom';

interface SearchParams {
  category: string;
  location: string;
  city: string;
  priceRange: string;
  rating: string;
  eventDate: string;
}

const EnhancedSearchForm = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    category: "all",
    location: "",
    city: "all",
    priceRange: "all",
    rating: "all",
    eventDate: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name: keyof SearchParams, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      }
    });
    
    navigate(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchParams({
      category: "all",
      location: "",
      city: "all",
      priceRange: "all",
      rating: "all",
      eventDate: ""
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 border border-pink-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Search Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Service Category */}
          <Select 
            value={searchParams.category} 
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger className="border-pink-200 focus:ring-2 focus:ring-pink-500 hover:border-pink-400">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-pink-500" />
                <SelectValue placeholder="Select service" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name.toLowerCase()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Location Input */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-500" />
            <Input
              type="text"
              placeholder="Enter location..."
              value={searchParams.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="pl-10 border-pink-200 focus:ring-2 focus:ring-pink-500 hover:border-pink-400"
            />
          </div>

          {/* City Selection */}
          <Select 
            value={searchParams.city} 
            onValueChange={(value) => handleChange('city', value)}
          >
            <SelectTrigger className="border-pink-200 focus:ring-2 focus:ring-pink-500 hover:border-pink-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-pink-500" />
                <SelectValue placeholder="Select city" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city, index) => (
                <SelectItem key={index} value={city.toLowerCase()}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Button */}
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 sm:col-span-2 lg:col-span-1"
          >
            Search
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Advanced Filters Row */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>

          {showFilters && (
            <Button
              type="button"
              variant="ghost"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-4 bg-pink-50 rounded-lg border border-pink-100">
            {/* Price Range */}
            <Select 
              value={searchParams.priceRange} 
              onValueChange={(value) => handleChange('priceRange', value)}
            >
              <SelectTrigger className="border-pink-200 focus:ring-2 focus:ring-pink-500">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-4 h-4 text-pink-500" />
                  <SelectValue placeholder="Price range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Budget</SelectItem>
                <SelectItem value="budget">₹10,000 - ₹50,000</SelectItem>
                <SelectItem value="mid">₹50,000 - ₹1,50,000</SelectItem>
                <SelectItem value="premium">₹1,50,000 - ₹5,00,000</SelectItem>
                <SelectItem value="luxury">₹5,00,000+</SelectItem>
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            <Select 
              value={searchParams.rating} 
              onValueChange={(value) => handleChange('rating', value)}
            >
              <SelectTrigger className="border-pink-200 focus:ring-2 focus:ring-pink-500">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-pink-500" />
                  <SelectValue placeholder="Minimum rating" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rating</SelectItem>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                <SelectItem value="5">5 Stars Only</SelectItem>
              </SelectContent>
            </Select>

            {/* Event Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-500" />
              <Input
                type="date"
                value={searchParams.eventDate}
                onChange={(e) => handleChange('eventDate', e.target.value)}
                className="pl-10 border-pink-200 focus:ring-2 focus:ring-pink-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        )}
      </form>

      {/* Quick Search Suggestions */}
      <div className="mt-6 pt-4 border-t border-pink-100">
        <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'Wedding Photographers',
            'Bridal Makeup',
            'Wedding Venues',
            'Catering Services',
            'Wedding Decorators'
          ].map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                handleChange('category', suggestion.toLowerCase().replace(' ', '-'));
                handleSubmit(new Event('submit') as any);
              }}
              className="px-3 py-1 text-sm bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearchForm;