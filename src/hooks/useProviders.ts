
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Provider {
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
}

export const useProviders = (categoryName: string) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (categoryName) {
      fetchProvidersFromDatabase(categoryName);
    }
  }, [categoryName]);

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

  return { providers, loading };
};
