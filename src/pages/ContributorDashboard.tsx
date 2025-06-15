
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventsTab from '@/components/dashboard/EventsTab';
import CreateEventTab from '@/components/dashboard/CreateEventTab';
import RegistrationsTab from '@/components/dashboard/RegistrationsTab';

const ContributorDashboard = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, userType } = useAuth();
  
  useEffect(() => {
    if (userType !== 'contributor' && userType !== 'admin') {
      navigate('/');
      toast({
        title: "Unauthorized Access",
        description: "You need to be a contributor to access this page.",
        variant: "destructive",
      });
    } else {
      fetchEvents();
      fetchCategories();
    }
  }, [userType, navigate]);
  
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('events')
        .select('*, registrations(*)')
        .eq('organizer_id', user.id);
        
      if (error) throw error;
      
      setEvents(data || []);
      
      // Fetch all registrations for the events
      const eventIds = data?.map(event => event.id) || [];
      if (eventIds.length > 0) {
        const { data: regsData, error: regsError } = await supabase
          .from('registrations')
          .select('*, profiles(first_name, last_name)')
          .in('event_id', eventIds);
          
        if (regsError) throw regsError;
        
        setRegistrations(regsData || []);
      }
      
    } catch (error: any) {
      toast({
        title: "Error Fetching Events",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name');
        
      if (error) throw error;
      
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: "Error Fetching Categories",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const handleCreateEvent = async (formData: any, date: Date | undefined, endDate: Date | undefined) => {
    setIsSubmitting(true);
    
    try {
      if (!user) {
        throw new Error("You must be logged in to create an event");
      }
      
      if (!date) {
        throw new Error("Event date is required");
      }
      
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
        
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            category_id: formData.category_id || null,
            venue: formData.venue,
            location: formData.location,
            price: formData.price ? parseFloat(formData.price) : null,
            image_url: formData.image_url,
            start_date: date.toISOString(),
            end_date: endDate ? endDate.toISOString() : null,
            organizer_id: user.id,
            slug,
          }
        ])
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Event Created",
        description: "Your event has been created successfully.",
      });
      
      // Refresh events list
      fetchEvents();
      
    } catch (error: any) {
      toast({
        title: "Error Creating Event",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditEvent = (eventId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit event:', eventId);
  };

  const handleDeleteEvent = (eventId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete event:', eventId);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Contributor Dashboard</h1>
        
        <Tabs defaultValue="events">
          <TabsList className="mb-6 bg-gray-800 border-gray-700">
            <TabsTrigger value="events" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Your Events</TabsTrigger>
            <TabsTrigger value="create" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Create Event</TabsTrigger>
            <TabsTrigger value="registrations" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Registrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            <EventsTab 
              events={events}
              isLoading={isLoading}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </TabsContent>
          
          <TabsContent value="create">
            <CreateEventTab 
              categories={categories}
              onSubmit={handleCreateEvent}
              isSubmitting={isSubmitting}
            />
          </TabsContent>
          
          <TabsContent value="registrations">
            <RegistrationsTab 
              registrations={registrations}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContributorDashboard;
