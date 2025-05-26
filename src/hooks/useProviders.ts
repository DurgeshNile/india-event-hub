
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface ServiceProvider {
  id: string;
  business_name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  city: string;
  price_range: string;
  category_id: string;
  user_id: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  service_provider_images: Array<{
    id: string;
    image_url: string;
    is_primary: boolean;
    caption: string;
  }>;
}

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  image_url: string;
  created_at: string;
}

export const useProviders = (categoryId?: string) => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProviders = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('service_providers')
        .select(`
          *,
          service_provider_images(*)
        `)
        .eq('verified', true)
        .order('created_at', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setProviders(data || []);
    } catch (error: any) {
      console.error('Error fetching providers:', error);
      toast({
        title: "Error",
        description: "Failed to load service providers",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    if (!categoryId) return;
    
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();

      if (error) throw error;

      setCategory(data);
    } catch (error: any) {
      console.error('Error fetching category:', error);
      toast({
        title: "Error",
        description: "Failed to load category",
        variant: "error",
      });
    }
  };

  useEffect(() => {
    fetchProviders();
    fetchCategory();
  }, [categoryId]);

  return {
    providers,
    category,
    loading,
    refetch: fetchProviders
  };
};
