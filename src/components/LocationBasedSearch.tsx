import React, { useState } from 'react';
import { MapPin, Search, Filter, Users, Star, ArrowRight, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface LocationProvider {
  id: string;
  name: string;
  category: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  price: string;
  image: string;
  availability: string;
}

const mockProviders: LocationProvider[] = [
  {
    id: '1',
    name: 'Pixel Perfect Photography',
    category: 'Wedding Photography',
    location: 'Bandra, Mumbai',
    distance: '2.5 km',
    rating: 4.8,
    reviewCount: 124,
    price: '₹25,000 - ₹50,000',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    availability: 'Available'
  },
  {
    id: '2',
    name: 'Royal Catering Services',
    category: 'Catering',
    location: 'Andheri, Mumbai',
    distance: '4.1 km',
    rating: 4.6,
    reviewCount: 89,
    price: '₹800 - ₹1,500 per plate',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    availability: 'Available'
  },
  {
    id: '3',
    name: 'Elegant Event Decorators',
    category: 'Decoration',
    location: 'Powai, Mumbai',
    distance: '6.8 km',
    rating: 4.7,
    reviewCount: 156,
    price: '₹15,000 - ₹75,000',
    image: 'https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    availability: 'Busy'
  },
  {
    id: '4',
    name: 'Sound & Soul DJ',
    category: 'Music & Entertainment',
    location: 'Juhu, Mumbai',
    distance: '3.2 km',
    rating: 4.9,
    reviewCount: 78,
    price: '₹12,000 - ₹25,000',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    availability: 'Available'
  }
];

const LocationBasedSearch = () => {
  const [location, setLocation] = useState('');
  const [providers, setProviders] = useState<LocationProvider[]>([]);
  const [searching, setSearching] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const navigate = useNavigate();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setSearching(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use reverse geocoding to get the address
          setUserLocation('Mumbai, Maharashtra');
          setLocation('Mumbai, Maharashtra');
          setProviders(mockProviders);
          setSearching(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setSearching(false);
          // Fallback to showing providers anyway
          setProviders(mockProviders);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const searchByLocation = () => {
    if (!location.trim()) return;
    
    setSearching(true);
    // Simulate API call
    setTimeout(() => {
      setProviders(mockProviders);
      setSearching(false);
    }, 1000);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Navigation className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Find Providers Near You</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover trusted service providers in your area. Search by location or use your current location to find the perfect match for your event.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="shadow-lg border-blue-100">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-gray-800">Search by Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <Input
                    type="text"
                    placeholder="Enter your location (e.g., Mumbai, Delhi)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 border-blue-200 focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && searchByLocation()}
                  />
                </div>
                <Button
                  onClick={searchByLocation}
                  disabled={searching}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {searching ? 'Searching...' : 'Search'}
                  <Search className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="text-center">
                <span className="text-gray-500 text-sm">or</span>
              </div>
              
              <Button
                onClick={getCurrentLocation}
                variant="outline"
                disabled={searching}
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Use My Current Location
              </Button>
              
              {userLocation && (
                <p className="text-sm text-green-600 text-center">
                  📍 Current location: {userLocation}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {providers.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-800">
                Service Providers Near You
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{providers.length} providers found</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {providers.map((provider) => (
                <Card key={provider.id} className="hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={provider.image} 
                      alt={provider.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge 
                      className={`absolute top-3 right-3 ${
                        provider.availability === 'Available' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-orange-500 text-white'
                      }`}
                    >
                      {provider.availability}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {provider.name}
                      </h4>
                      <span className="text-sm text-blue-600 font-medium">
                        {provider.distance}
                      </span>
                    </div>
                    
                    <p className="text-purple-600 font-medium mb-2">{provider.category}</p>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{provider.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(provider.rating)}
                      <span className="text-sm text-gray-600">
                        {provider.rating} ({provider.reviewCount} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="font-semibold text-green-600">{provider.price}</p>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => navigate(`/provider/${provider.id}`)}
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                onClick={() => navigate('/search')}
              >
                View All Providers in Area
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        {providers.length === 0 && !searching && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Ready to find providers near you?
            </h3>
            <p className="text-gray-600 mb-6">
              Enter your location above to discover amazing service providers in your area.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationBasedSearch;