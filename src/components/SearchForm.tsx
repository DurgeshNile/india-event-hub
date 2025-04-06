
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, cities, states } from '@/utils/data';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    category: "all",
    location: "",
    city: "all",
  });

  const handleChange = (name: string, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search params:', searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Select 
            value={searchParams.category} 
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger className="w-full bg-white border-pink-200 focus:ring-2 focus:ring-pink-500 group">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-pink-400 group-focus:text-pink-600" />
                <SelectValue placeholder="Select service" />
              </div>
            </SelectTrigger>
            <SelectContent>
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

        <div className="relative">
          <Select 
            value={searchParams.city} 
            onValueChange={(value) => handleChange('city', value)}
          >
            <SelectTrigger className="w-full bg-white border-pink-200 focus:ring-2 focus:ring-pink-500 group">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-pink-400 group-focus:text-pink-600" />
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
        </div>

        <Button 
          type="submit" 
          className="bg-pink-500 hover:bg-pink-600 text-white transition-transform hover:scale-105"
        >
          Search Services
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
