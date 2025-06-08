
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  categories: { name: string };
}

export const useRealtimeEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initial load
    const loadEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*, categories(name)')
          .gte('start_date', new Date().toISOString())
          .order('start_date', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (error: any) {
        console.error('Error loading events:', error);
        toast({
          title: "Error",
          description: "Failed to load events",
          variant: "default",
        });
      } finally {
        setLoading(false);
      }
    };

    loadEvents();

    // Set up real-time subscription
    const channel = supabase
      .channel('events-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('New event added:', payload);
          setEvents(prev => [payload.new as Event, ...prev]);
          toast({
            title: "New Event Added!",
            description: "A new event has been posted in your area.",
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('Event updated:', payload);
          setEvents(prev => prev.map(event => 
            event.id === payload.new.id ? { ...event, ...payload.new } as Event : event
          ));
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('Event deleted:', payload);
          setEvents(prev => prev.filter(event => event.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return { events, loading };
};
