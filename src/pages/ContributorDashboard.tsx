import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Users, FileText, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuthState } from '@/hooks/useAuthState';
import EventsTab from '@/components/dashboard/EventsTab';
import CreateEventTab from '@/components/dashboard/CreateEventTab';
import RegistrationsTab from '@/components/dashboard/RegistrationsTab';

const ContributorDashboard: React.FC = () => {
  const { user } = useAuthState();
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      setEvents(events.filter(event => event.id !== eventId));
      toast({
        title: "Success",
        description: "Event deleted successfully",
        variant: "error",
      });
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "error",
      });
    }
  };

  const handleCreateEvent = async (eventData: any) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create events",
        variant: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            ...eventData,
            user_id: user.id,
          }
        ])
        .select();

      if (error) throw error;

      if (data) {
        setEvents([...events, ...data]);
        toast({
          title: "Success",
          description: "Event created successfully!",
        });
      }
    } catch (error: any) {
      console.error('Error creating event:', error);
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      if (!user) {
        console.warn('User not logged in.');
        return;
      }

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEvents(data || []);
    } catch (error: any) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      if (!user) {
        console.warn('User not logged in.');
        return;
      }

      // Fetch registrations for events created by the current user
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
        .in('event_id', events.map(event => event.id))
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRegistrations(data || []);
    } catch (error: any) {
      console.error('Error fetching registrations:', error);
      toast({
        title: "Error",
        description: "Failed to load registrations",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  useEffect(() => {
    if (events.length > 0) {
      fetchRegistrations();
    }
  }, [events]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Contributor Dashboard</h1>
          <p className="text-gray-300">Manage your events and track registrations</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{events.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{registrations.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Active Events</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {events.filter(event => new Date(event.start_date) > new Date()).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger value="events" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
              <Calendar className="h-4 w-4 mr-2" />
              My Events
            </TabsTrigger>
            <TabsTrigger value="create" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </TabsTrigger>
            <TabsTrigger value="registrations" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
              <Users className="h-4 w-4 mr-2" />
              Registrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <EventsTab 
              events={events}
              isLoading={loading}
              onDeleteEvent={handleDeleteEvent}
            />
          </TabsContent>

          <TabsContent value="create">
            <CreateEventTab 
              onCreateEvent={handleCreateEvent}
              isLoading={loading}
            />
          </TabsContent>

          <TabsContent value="registrations">
            <RegistrationsTab 
              registrations={registrations}
              isLoading={loading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContributorDashboard;
