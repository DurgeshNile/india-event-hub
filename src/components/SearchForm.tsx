
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Filter, ArrowRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, cities, states } from '@/utils/data';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    category: "all",
    location: "",
    city: "all",
    priceRange: "all",
    rating: "all"
  });
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search page with parameters
    const params = new URLSearchParams();
    if (searchParams.category !== 'all') params.set('category', searchParams.category);
    if (searchParams.city !== 'all') params.set('city', searchParams.city);
    if (searchParams.location) params.set('location', searchParams.location);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative group">
          <Select 
            value={searchParams.category} 
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger className="w-full bg-white border-pink-200 focus:ring-2 focus:ring-pink-500 group transition-all duration-300 hover:border-pink-400 shadow-sm hover:shadow-md">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-full bg-pink-50 text-pink-500 group-hover:bg-pink-100 transition-colors duration-300">
                  <Search className="w-4 h-4 group-hover:text-pink-600" />
                </div>
                <SelectValue placeholder="Select service" />
              </div>
            </SelectTrigger>
            <SelectContent className="border-pink-200 bg-white shadow-xl">
              <div className="p-2">
                <h3 className="font-semibold text-pink-600 mb-1">Services</h3>
                <p className="text-xs text-gray-500 mb-2">Find the perfect service for your event</p>
              </div>
              <SelectItem value="all" className="hover:bg-pink-50">All Services</SelectItem>
              {categories.map((category) => (
                <SelectItem 
                  key={category.id} 
                  value={category.name.toLowerCase()}
                  className="hover:bg-pink-50"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative group">
          <Select 
            value={searchParams.city} 
            onValueChange={(value) => handleChange('city', value)}
          >
            <SelectTrigger className="w-full bg-white border-pink-200 focus:ring-2 focus:ring-pink-500 group transition-all duration-300 hover:border-pink-400 shadow-sm hover:shadow-md">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-full bg-pink-50 text-pink-500 group-hover:bg-pink-100 transition-colors duration-300">
                  <MapPin className="w-4 h-4 group-hover:text-pink-600" />
                </div>
                <SelectValue placeholder="Select city" />
              </div>
            </SelectTrigger>
            <SelectContent className="border-pink-200 bg-white shadow-xl">
              <div className="p-2">
                <h3 className="font-semibold text-pink-600 mb-1">Cities</h3>
                <p className="text-xs text-gray-500 mb-2">Choose your event location</p>
              </div>
              <SelectItem value="all" className="hover:bg-pink-50">All Cities</SelectItem>
              {cities.map((city, index) => (
                <SelectItem key={index} value={city.toLowerCase()} className="hover:bg-pink-50">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          className="bg-gradient-to-r from-pink-500 to-india-red text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md flex items-center justify-center gap-2"
        >
          Search Services
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
