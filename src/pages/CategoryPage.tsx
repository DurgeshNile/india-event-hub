import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle, ArrowLeft, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from '@/utils/data';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [providers, setProviders] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    if (categoryId) {
      // Find the category from static data
      const categoryData = categories.find(cat => cat.id === parseInt(categoryId));
      setCategory(categoryData);
      
      if (categoryData) {
        fetchProvidersFromDatabase(categoryData.name);
      }
    }
  }, [categoryId]);

  const fetchProvidersFromDatabase = async (categoryName: string) => {
    try {
      setLoading(true);
      
      // First, try to find the category ID in the database
      const { data: dbCategory, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .ilike('name', `%${categoryName}%`)
        .limit(1)
        .single();

      if (categoryError) {
        console.error('Category not found in database, using fallback data');
        setProviders([]);
        setLoading(false);
        return;
      }

      // Fetch only approved providers for this category
      const { data: dbProviders, error: providersError } = await supabase
        .from('service_providers')
        .select(`
          *,
          service_provider_images!inner(image_url, is_primary)
        `)
        .eq('category_id', dbCategory.id)
        .eq('approved', true); // Only show approved providers

      if (providersError) {
        console.error('Error fetching providers:', providersError);
        setProviders([]);
      } else {
        // Transform the data to match the expected format
        const transformedProviders = dbProviders?.map(provider => ({
          id: provider.id,
          name: provider.business_name,
          category: categoryName,
          location: provider.location,
          city: provider.city,
          rating: provider.rating || 4.5,
          reviewCount: provider.review_count || 0,
          verified: provider.verified,
          featured: provider.featured,
          phone: provider.phone,
          email: provider.email,
          website: provider.website,
          description: provider.description,
          price_range: provider.price_range,
          approved: provider.approved,
          image: provider.service_provider_images?.find(img => img.is_primary)?.image_url || 
                 provider.service_provider_images?.[0]?.image_url ||
                 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        })) || [];

        setProviders(transformedProviders);
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load service providers",
        variant: "destructive",
      });
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {loading ? 'Loading...' : `Approved Service Providers (${providers.length})`}
              </h2>
              <Link to="/register-provider">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Become a Provider
                </Button>
              </Link>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-lg">Loading service providers...</p>
              </div>
            ) : providers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-2">No approved providers found</h3>
                <p className="text-gray-500 mb-4">
                  Be the first to register as a service provider in this category!
                </p>
                <Link to="/register-provider">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Register Now
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {providers.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}
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

export default CategoryPage;
