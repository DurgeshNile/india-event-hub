import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PopularSearch {
  id: string;
  title: string;
  category: string;
  location?: string;
  searchCount: number;
  trend: 'up' | 'stable' | 'down';
}

const popularSearches: PopularSearch[] = [
  {
    id: '1',
    title: 'Wedding Photographers in Mumbai',
    category: 'photography',
    location: 'mumbai',
    searchCount: 2840,
    trend: 'up'
  },
  {
    id: '2',
    title: 'Bridal Makeup Artists in Delhi',
    category: 'makeup',
    location: 'delhi',
    searchCount: 2156,
    trend: 'up'
  },
  {
    id: '3',
    title: 'Wedding Venues in Bangalore',
    category: 'venues',
    location: 'bangalore',
    searchCount: 1923,
    trend: 'stable'
  },
  {
    id: '4',
    title: 'Catering Services in Pune',
    category: 'catering',
    location: 'pune',
    searchCount: 1567,
    trend: 'up'
  },
  {
    id: '5',
    title: 'Wedding Decorators in Chennai',
    category: 'decoration',
    location: 'chennai',
    searchCount: 1234,
    trend: 'stable'
  },
  {
    id: '6',
    title: 'DJ Services in Hyderabad',
    category: 'music',
    location: 'hyderabad',
    searchCount: 987,
    trend: 'up'
  }
];

const trendingCategories = [
  { name: 'Wedding Photography', icon: '📸', growth: '+24%' },
  { name: 'Bridal Makeup', icon: '💄', growth: '+18%' },
  { name: 'Wedding Venues', icon: '🏛️', growth: '+15%' },
  { name: 'Catering Services', icon: '🍽️', growth: '+12%' }
];

const PopularSearches = () => {
  const generateSearchUrl = (search: PopularSearch) => {
    const params = new URLSearchParams();
    params.set('category', search.category);
    if (search.location) params.set('city', search.location);
    return `/search?${params.toString()}`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-pink-500" />
            <h2 className="text-3xl font-bold text-gray-900">Popular Searches</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what others are searching for and find inspiration for your perfect event
          </p>
        </div>

        {/* Trending Categories */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Trending Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {trendingCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-pink-100 hover:border-pink-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h4 className="font-medium text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
                    {category.name}
                  </h4>
                  <span className="text-green-600 text-sm font-medium">
                    {category.growth}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Search Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularSearches.map((search) => (
            <Link key={search.id} to={generateSearchUrl(search)}>
              <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-pink-100 hover:border-pink-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-pink-500" />
                      <span className={`w-2 h-2 rounded-full ${
                        search.trend === 'up' ? 'bg-green-400' : 
                        search.trend === 'stable' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                    </div>
                    <span className="text-xs text-gray-500">
                      {search.searchCount.toLocaleString()} searches
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                    {search.title}
                  </h4>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {search.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="capitalize">{search.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>This week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to="/categories">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;