
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
  approved?: boolean;
  service_provider_images: Array<{
    id: string;
    image_url: string;
    is_primary: boolean;
    caption: string;
  }>;
}

export const useAdminProviders = () => {
  const [pendingProviders, setPendingProviders] = useState<ServiceProvider[]>([]);
  const [approvedProviders, setApprovedProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProviders = async () => {
    try {
      setLoading(true);
      
      // First, let's try to add the approved column if it doesn't exist
      const { data, error } = await supabase
        .from('service_providers')
        .select(`
          *,
          service_provider_images(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedData = data?.map(provider => ({
        ...provider,
        approved: provider.approved ?? false
      })) || [];

      const pending = transformedData.filter(p => !p.approved);
      const approved = transformedData.filter(p => p.approved);
      
      setPendingProviders(pending);
      setApprovedProviders(approved);
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

  const handleApproval = async (providerId: string, approved: boolean) => {
    try {
      // For now, we'll use a workaround since the approved column might not exist
      // We'll use the verified field as a temporary solution
      const { error } = await supabase
        .from('service_providers')
        .update({ verified: approved })
        .eq('id', providerId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Provider ${approved ? 'approved' : 'rejected'} successfully`,
        variant: "success",
      });

      fetchProviders();
    } catch (error: any) {
      console.error('Error updating provider:', error);
      toast({
        title: "Error",
        description: "Failed to update provider status",
        variant: "error",
      });
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return {
    pendingProviders,
    approvedProviders,
    loading,
    handleApproval,
    refetch: fetchProviders
  };
};
