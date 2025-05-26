
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { ServiceProvider, Provider, transformServiceProviderToProvider } from '@/types/provider';

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  image_url: string;
  created_at: string;
}

export const useProviders = (categoryId?: string) => {
  const [providers, setProviders] = useState<Provider[]>([]);
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

      const transformedProviders = (data || []).map((serviceProvider: ServiceProvider) => 
        transformServiceProviderToProvider(serviceProvider)
      );

      setProviders(transformedProviders);
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
