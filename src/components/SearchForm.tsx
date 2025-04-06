
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    // In a real app, this would navigate to search results page with these params
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Select value={searchParams.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger className="w-full bg-white border-pink-200 focus:ring-pink-500">
              <div className="flex items-center">
                <Search className="w-4 h-4 mr-2 text-pink-400" />
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
        </div>

        <div className="flex-1">
          <Select value={searchParams.city} onValueChange={(value) => handleChange('city', value)}>
            <SelectTrigger className="w-full bg-white border-pink-200 focus:ring-pink-500">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-pink-400" />
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

        <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
          Search Services
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
