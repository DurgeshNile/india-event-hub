
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Provider, ServiceProvider, transformServiceProviderToProvider } from '@/types/provider';

export const useRealtimeProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initial load
    const loadProviders = async () => {
      try {
        const { data, error } = await supabase
          .from('service_providers')
          .select(`
            *,
            service_provider_images(*)
          `)
          .eq('verified', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const transformedProviders = (data || []).map((serviceProvider: ServiceProvider) => 
          transformServiceProviderToProvider(serviceProvider)
        );

        setProviders(transformedProviders);
      } catch (error: any) {
        console.error('Error loading providers:', error);
        toast({
          title: "Error",
          description: "Failed to load service providers",
          variant: "default",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProviders();

    // Set up real-time subscription for service providers
    const channel = supabase
      .channel('providers-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'service_providers'
        },
        (payload) => {
          console.log('New provider added:', payload);
          if (payload.new.verified) {
            const newProvider = transformServiceProviderToProvider(payload.new as ServiceProvider);
            setProviders(prev => [newProvider, ...prev]);
            toast({
              title: "New Service Provider!",
              description: `${payload.new.business_name} has joined the platform.`,
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'service_providers'
        },
        (payload) => {
          console.log('Provider updated:', payload);
          const updatedProvider = transformServiceProviderToProvider(payload.new as ServiceProvider);
          setProviders(prev => prev.map(provider => 
            provider.id === payload.new.id ? updatedProvider : provider
          ));
        }
      )
      .subscribe();

    // Set up real-time subscription for provider images
    const imagesChannel = supabase
      .channel('provider-images-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'service_provider_images'
        },
        (payload) => {
          console.log('Provider image updated:', payload);
          // Reload providers when images change
          loadProviders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(imagesChannel);
    };
  }, [toast]);

  return { providers, loading };
};
