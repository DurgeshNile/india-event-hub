
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, serviceProviders } from '@/utils/data';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [providers, setProviders] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  
  useEffect(() => {
    if (categoryId) {
      // Find the category
      const categoryData = categories.find(cat => cat.id === parseInt(categoryId));
      setCategory(categoryData);
      
      // Filter providers by category
      const filteredProviders = serviceProviders.filter(
        provider => provider.category === categoryData?.name
      );
      
      // Ensure we have at least 10 providers
      if (filteredProviders.length < 10) {
        // Clone and modify some providers to reach 10
        const extraProviders = [];
        for (let i = 0; filteredProviders.length + extraProviders.length < 10; i++) {
          const baseProvider = filteredProviders[i % filteredProviders.length];
          if (!baseProvider) break;
          
          extraProviders.push({
            ...baseProvider,
            id: baseProvider.id + 100 + i,
            name: `${baseProvider.name} ${i + 1}`,
            location: baseProvider.location,
            rating: (baseProvider.rating - 0.1 * (i % 3)).toFixed(1),
            reviewCount: baseProvider.reviewCount - (i * 5),
          });
        }
        setProviders([...filteredProviders, ...extraProviders]);
      } else {
        setProviders(filteredProviders);
      }
    }
  }, [categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <p>Category not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Link to="/" className="text-india-blue hover:text-india-darkblue mr-2">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ArrowLeft size={16} />
                  Back
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-india-orange/10 rounded-full flex items-center justify-center">
                <Icon className="w-10 h-10 text-india-orange" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
                <p className="text-gray-600 mt-2 max-w-2xl">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Top {category.name} ({providers.length})</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Provider Card Component
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

export default CategoryPage;
