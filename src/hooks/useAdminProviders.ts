
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Provider {
  id: string;
  business_name: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  verified: boolean;
  created_at: string;
}

export const useAdminProviders = () => {
  const [pendingProviders, setPendingProviders] = useState<Provider[]>([]);
  const [approvedProviders, setApprovedProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadProviders = async () => {
    try {
      const { data: pending, error: pendingError } = await supabase
        .from('service_providers')
        .select('*')
        .eq('verified', false)
        .order('created_at', { ascending: false });

      const { data: approved, error: approvedError } = await supabase
        .from('service_providers')
        .select('*')
        .eq('verified', true)
        .order('created_at', { ascending: false });

      if (pendingError) throw pendingError;
      if (approvedError) throw approvedError;

      setPendingProviders(pending || []);
      setApprovedProviders(approved || []);
    } catch (error: any) {
      console.error('Error loading providers:', error);
      toast({
        title: "Error",
        description: "Failed to load providers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const approveProvider = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_providers')
        .update({ verified: true })
        .eq('id', id);

      if (error) throw error;

      setPendingProviders(prev => prev.filter(p => p.id !== id));
      const approvedProvider = pendingProviders.find(p => p.id === id);
      if (approvedProvider) {
        setApprovedProviders(prev => [{ ...approvedProvider, verified: true }, ...prev]);
      }

      toast({
        title: "Success",
        description: "Provider approved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to approve provider",
        variant: "destructive",
      });
    }
  };

  const rejectProvider = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_providers')
        .update({ verified: false })
        .eq('id', id);

      if (error) throw error;

      setApprovedProviders(prev => prev.filter(p => p.id !== id));
      const rejectedProvider = approvedProviders.find(p => p.id === id);
      if (rejectedProvider) {
        setPendingProviders(prev => [{ ...rejectedProvider, verified: false }, ...prev]);
      }

      toast({
        title: "Success",
        description: "Provider status updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update provider status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadProviders();
  }, []);

  return {
    pendingProviders,
    approvedProviders,
    loading,
    approveProvider,
    rejectProvider,
    refetch: loadProviders
  };
};
