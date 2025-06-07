
import React, { useState } from 'react';
import { Search, MapPin, Filter, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, cities } from '@/utils/data';

interface LocationSearchFormProps {
  onSearch?: (params: SearchParams) => void;
}

interface SearchParams {
  category: string;
  location: string;
  city: string;
  radius: string;
}

const LocationSearchForm = ({ onSearch }: LocationSearchFormProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    category: "all",
    location: "",
    city: "all",
    radius: "10"
  });

  const handleChange = (name: string, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <SelectItem value="all">All Services</SelectItem>
              {categories.map((category) => (
                <SelectItem 
                  key={category.id} 
                  value={category.name.toLowerCase()}
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
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city, index) => (
                <SelectItem key={index} value={city.toLowerCase()}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative group">
          <Input
            placeholder="Enter location or pincode"
            value={searchParams.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full bg-white border-pink-200 focus:ring-2 focus:ring-pink-500 transition-all duration-300 hover:border-pink-400 shadow-sm hover:shadow-md"
          />
        </div>

        <Button 
          type="submit" 
          className="bg-gradient-to-r from-pink-500 to-india-red text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md flex items-center justify-center gap-2"
        >
          Search Nearby
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Search Radius:</label>
          <Select 
            value={searchParams.radius} 
            onValueChange={(value) => handleChange('radius', value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 km</SelectItem>
              <SelectItem value="10">10 km</SelectItem>
              <SelectItem value="25">25 km</SelectItem>
              <SelectItem value="50">50 km</SelectItem>
              <SelectItem value="100">100 km</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
};

export default LocationSearchForm;
