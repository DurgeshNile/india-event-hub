
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EventRequirement {
  id: string;
  user_id: string;
  contact_name: string;
  contact_email: string;
  event_type: string;
  event_date: string;
  location: string;
  guest_count: number;
  budget: number;
  description: string;
  status: 'pending' | 'processed';
  created_at: string;
}

export const useEventRequirements = () => {
  const [requirements, setRequirements] = useState<EventRequirement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('event_requirements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequirements((data || []) as EventRequirement[]);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching requirements:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'pending' | 'processed') => {
    try {
      const { error } = await supabase
        .from('event_requirements')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setRequirements(prev =>
        prev.map(req => req.id === id ? { ...req, status } : req)
      );

      toast({
        title: "Success",
        description: "Requirement status updated successfully",
      });
    } catch (err: any) {
      toast({
        title: "Error", 
        description: "Failed to update requirement status",
        variant: "error",
      });
    }
  };

  const addRequirement = async (requirement: Omit<EventRequirement, 'id' | 'created_at' | 'status'>) => {
    try {
      const { data, error } = await supabase
        .from('event_requirements')
        .insert([{ ...requirement, status: 'pending' as const }])
        .select()
        .single();

      if (error) throw error;

      setRequirements(prev => [data as EventRequirement, ...prev]);
      
      toast({
        title: "Success",
        description: "Event requirement submitted successfully",
      });

      return data;
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to submit event requirement",
        variant: "error",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  return {
    requirements,
    loading,
    error,
    updateStatus,
    addRequirement,
    refetch: fetchRequirements
  };
};
