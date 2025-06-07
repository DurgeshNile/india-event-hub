
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { ServiceProvider, Provider, transformServiceProviderToProvider } from '@/types/provider';

interface SearchParams {
  category: string;
  location: string;
  city: string;
  radius: string;
}

export const useLocationSearch = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchProviders = async (params: SearchParams) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('service_providers')
        .select(`
          *,
          service_provider_images(*)
        `)
        .eq('verified', true);

      // Filter by category if not "all"
      if (params.category !== 'all') {
        query = query.eq('category_id', params.category);
      }

      // Filter by city if not "all"
      if (params.city !== 'all') {
        query = query.ilike('city', `%${params.city}%`);
      }

      // Filter by location if provided
      if (params.location) {
        query = query.or(
          `location.ilike.%${params.location}%,city.ilike.%${params.location}%`
        );
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const transformedProviders = (data || []).map((serviceProvider: ServiceProvider) => 
        transformServiceProviderToProvider(serviceProvider)
      );

      setProviders(transformedProviders);
    } catch (error: any) {
      console.error('Error searching providers:', error);
      toast({
        title: "Error",
        description: "Failed to search service providers",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    providers,
    loading,
    searchProviders
  };
};
