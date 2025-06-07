
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocationSearchForm from '@/components/LocationSearchForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, DollarSign, Clock, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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

interface SearchParams {
  category: string;
  location: string;
  city: string;
  radius: string;
}

const NearbyEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const searchEvents = async (params: SearchParams) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('events')
        .select('*, categories(name)')
        .gte('start_date', new Date().toISOString());

      // Filter by location if provided
      if (params.location) {
        query = query.or(
          `location.ilike.%${params.location}%,venue.ilike.%${params.location}%`
        );
      }

      const { data, error } = await query
        .order('start_date', { ascending: true })
        .limit(20);

      if (error) throw error;

      setEvents(data || []);
      setHasSearched(true);
    } catch (error: any) {
      console.error('Error searching events:', error);
      toast({
        title: "Error",
        description: "Failed to search events",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookEvent = async (eventId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book an event",
        variant: "warning",
      });
      return;
    }

    try {
      // Check if user has already registered
      const { data: existingReg, error: checkError } = await supabase
        .from('registrations')
        .select('id')
        .eq('event_id', eventId)
        .eq('user_id', user?.id);
        
      if (checkError) throw checkError;
      
      if (existingReg && existingReg.length > 0) {
        toast({
          title: "Already Registered",
          description: "You have already registered for this event",
          variant: "warning",
        });
        return;
      }
      
      // Create registration
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            event_id: eventId,
            user_id: user?.id,
            status: 'registered'
          }
        ]);
        
      if (error) throw error;
      
      toast({
        title: "Registration Successful",
        description: "You have successfully registered for this event",
        variant: "success",
      });
      
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "error",
      });
    }
  };

  // Load featured events on component mount
  useEffect(() => {
    const loadFeaturedEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*, categories(name)')
          .eq('is_featured', true)
          .gte('start_date', new Date().toISOString())
          .order('start_date', { ascending: true })
          .limit(10);

        if (error) throw error;
        setEvents(data || []);
      } catch (error: any) {
        console.error('Error loading featured events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-4xl font-bold mb-4">Discover Events Near You</h1>
              <p className="text-xl text-purple-100">
                Find exciting events happening in your area - workshops, conferences, festivals, and more
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <LocationSearchForm onSearch={searchEvents} />
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span className="text-lg">Searching for events...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <CalendarIcon className="h-5 w-5 text-purple-600" />
                  <h2 className="text-2xl font-bold">
                    {hasSearched ? `Search Results (${events.length} events found)` : `Featured Events (${events.length})`}
                  </h2>
                </div>
                
                {events.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <div className="max-w-md mx-auto">
                      <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">
                        {hasSearched ? "No events found" : "No events available"}
                      </h3>
                      <p className="text-gray-500 mb-4">
                        {hasSearched 
                          ? "Try adjusting your search criteria or location"
                          : "Check back later for new events"
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        {event.image_url ? (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={event.image_url} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                            <h3 className="text-white text-xl font-bold text-center px-4">{event.title}</h3>
                          </div>
                        )}
                        
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                              {event.categories && (
                                <Badge variant="outline" className="mt-1">
                                  {event.categories.name}
                                </Badge>
                              )}
                              {event.is_featured && (
                                <Badge className="mt-1 ml-2 bg-yellow-500">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            {event.price && (
                              <div className="text-right">
                                <span className="inline-flex items-center text-green-600 font-bold">
                                  <DollarSign className="h-4 w-4" />
                                  {event.price}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <p className="line-clamp-3 text-gray-600">{event.description}</p>
                          
                          <div className="space-y-2">
                            {event.start_date && (
                              <div className="flex items-center text-gray-500">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span className="text-sm">
                                  {format(new Date(event.start_date), 'PPP')}
                                  {event.end_date && event.start_date !== event.end_date && (
                                    <> - {format(new Date(event.end_date), 'PPP')}</>
                                  )}
                                </span>
                              </div>
                            )}
                            
                            {event.venue && (
                              <div className="flex items-center text-gray-500">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span className="text-sm">{event.venue}</span>
                              </div>
                            )}

                            {event.location && event.location !== event.venue && (
                              <div className="flex items-center text-gray-500">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        
                        <CardFooter>
                          <Button 
                            onClick={() => handleBookEvent(event.id)} 
                            className="w-full"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Register for Event
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NearbyEvents;
