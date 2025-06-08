
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EventRequirement {
  id: string;
  event_type: string;
  event_date: string;
  location: string;
  guest_count: string;
  services: string[];
  budget: number;
  theme: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: string;
  created_at: string;
}

export const useEventRequirements = () => {
  const [requirements, setRequirements] = useState<EventRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadRequirements = async () => {
    try {
      const { data, error } = await supabase
        .from('event_requirements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequirements(data || []);
    } catch (error: any) {
      console.error('Error loading requirements:', error);
      toast({
        title: "Error",
        description: "Failed to load event requirements",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('event_requirements')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setRequirements(prev => 
        prev.map(req => req.id === id ? { ...req, status } : req)
      );

      toast({
        title: "Status Updated",
        description: `Requirement status changed to ${status}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "error",
      });
    }
  };

  useEffect(() => {
    loadRequirements();
  }, []);

  return {
    requirements,
    loading,
    updateStatus,
    refetch: loadRequirements
  };
};
